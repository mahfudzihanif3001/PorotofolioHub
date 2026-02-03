'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';

interface Attachment {
  fileType: 'IMAGE' | 'PDF' | 'LINK' | 'VIDEO';
  url: string;
  publicId?: string;
  label?: string;
}

interface PortfolioItem {
  _id: string;
  title: string;
  description: string;
  category: 'PROJECT' | 'CERTIFICATE' | 'RESUME' | 'EXPERIENCE' | 'EDUCATION';
  attachments: Attachment[];
  techStack: string[];
  startDate?: string;
  endDate?: string;
  order: number;
  isVisible: boolean;
  createdAt: string;
  updatedAt: string;
}

interface CreateItemData {
  title: string;
  description?: string;
  category: string;
  attachments?: Attachment[];
  techStack?: string[];
  startDate?: string;
  endDate?: string;
}

interface UpdateItemData extends Partial<CreateItemData> {
  order?: number;
  isVisible?: boolean;
}

export function usePortfolio() {
  const { isAuthenticated } = useAuth();
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    if (!isAuthenticated) {
      setItems([]);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const res = await fetch('/api/portfolio', {
        credentials: 'include',
      });

      if (res.ok) {
        const data = await res.json();
        setItems(data.items);
        setError(null);
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to fetch items');
      }
    } catch (err) {
      setError('Failed to fetch portfolio items');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const createItem = async (data: CreateItemData): Promise<PortfolioItem | null> => {
    try {
      const res = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include',
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Failed to create item');
      }

      setItems((prev) => [...prev, result.item]);
      return result.item;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create item');
      throw err;
    }
  };

  const updateItem = async (id: string, data: UpdateItemData): Promise<PortfolioItem | null> => {
    try {
      const res = await fetch(`/api/portfolio/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include',
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Failed to update item');
      }

      setItems((prev) =>
        prev.map((item) => (item._id === id ? result.item : item))
      );
      return result.item;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update item');
      throw err;
    }
  };

  const deleteItem = async (id: string): Promise<void> => {
    try {
      const res = await fetch(`/api/portfolio/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.error || 'Failed to delete item');
      }

      setItems((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete item');
      throw err;
    }
  };

  const getItemsByCategory = (category: string): PortfolioItem[] => {
    return items.filter((item) => item.category === category);
  };

  return {
    items,
    isLoading,
    error,
    fetchItems,
    createItem,
    updateItem,
    deleteItem,
    getItemsByCategory,
  };
}
