'use client';

import { useState } from 'react';

interface UploadResult {
  url: string;
  publicId: string;
  fileType: 'IMAGE' | 'PDF' | 'VIDEO';
}

interface CloudinaryResponse {
  secure_url: string;
  public_id: string;
  resource_type: string;
  format: string;
}

export function useCloudinary() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const getSignature = async (): Promise<{
    signature: string;
    timestamp: number;
    cloudName: string;
    apiKey: string;
    folder: string;
  }> => {
    const res = await fetch('/api/upload/sign', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
      credentials: 'include',
    });

    if (!res.ok) {
      throw new Error('Failed to get upload signature');
    }

    return res.json();
  };

  const uploadFile = async (file: File): Promise<UploadResult> => {
    try {
      setIsUploading(true);
      setUploadProgress(0);
      setError(null);

      // Get signature from server
      const signatureData = await getSignature();

      // Create form data
      const formData = new FormData();
      formData.append('file', file);
      formData.append('api_key', signatureData.apiKey);
      formData.append('timestamp', signatureData.timestamp.toString());
      formData.append('signature', signatureData.signature);
      formData.append('folder', signatureData.folder);

      // Determine resource type based on file type
      let resourceType = 'auto';
      if (file.type.startsWith('image/')) {
        resourceType = 'image';
      } else if (file.type === 'application/pdf') {
        resourceType = 'raw';
      } else if (file.type.startsWith('video/')) {
        resourceType = 'video';
      }

      // Upload to Cloudinary
      const uploadUrl = `https://api.cloudinary.com/v1_1/${signatureData.cloudName}/${resourceType}/upload`;

      const xhr = new XMLHttpRequest();
      
      const uploadPromise = new Promise<CloudinaryResponse>((resolve, reject) => {
        xhr.upload.addEventListener('progress', (e) => {
          if (e.lengthComputable) {
            const progress = Math.round((e.loaded / e.total) * 100);
            setUploadProgress(progress);
          }
        });

        xhr.addEventListener('load', () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            reject(new Error('Upload failed'));
          }
        });

        xhr.addEventListener('error', () => {
          reject(new Error('Upload failed'));
        });

        xhr.open('POST', uploadUrl);
        xhr.send(formData);
      });

      const result = await uploadPromise;

      // Determine file type for our database
      let fileType: 'IMAGE' | 'PDF' | 'VIDEO' = 'IMAGE';
      if (file.type === 'application/pdf') {
        fileType = 'PDF';
      } else if (file.type.startsWith('video/')) {
        fileType = 'VIDEO';
      }

      return {
        url: result.secure_url,
        publicId: result.public_id,
        fileType,
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Upload failed';
      setError(message);
      throw err;
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const uploadMultiple = async (files: File[]): Promise<UploadResult[]> => {
    const results: UploadResult[] = [];

    for (const file of files) {
      const result = await uploadFile(file);
      results.push(result);
    }

    return results;
  };

  return {
    uploadFile,
    uploadMultiple,
    isUploading,
    uploadProgress,
    error,
  };
}
