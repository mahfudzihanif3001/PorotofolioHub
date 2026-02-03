'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import { useAuth } from '@/hooks/useAuth';
import { 
  FaUsers, 
  FaTrash, 
  FaSearch,
  FaUserShield,
  FaLaptopCode,
  FaBriefcase
} from 'react-icons/fa';

interface UserData {
  _id: string;
  username: string;
  email: string;
  fullName: string;
  roleType: 'IT' | 'NON_IT';
  selectedTheme: string;
  avatarUrl: string;
  portfolioItemCount: number;
  createdAt: string;
}

export default function AdminPage() {
  const { user } = useAuth();
  const [users, setUsers] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/users', {
        credentials: 'include',
      });

      if (res.ok) {
        const data = await res.json();
        setUsers(data.users);
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (userId: string, username: string) => {
    if (!confirm(`Are you sure you want to delete user "${username}" and all their data? This action cannot be undone.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/users?userId=${userId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (res.ok) {
        setUsers(prev => prev.filter(u => u._id !== userId));
        setMessage(`User "${username}" deleted successfully`);
      } else {
        const data = await res.json();
        setMessage(data.error || 'Failed to delete user');
      }
    } catch (error) {
      setMessage('Failed to delete user');
    }
  };

  const filteredUsers = users.filter(u => 
    u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!user?.isSuperAdmin) {
    return (
      <Sidebar>
        <div className="max-w-4xl mx-auto text-center py-20">
          <FaUserShield className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600">You don't have permission to access this page.</p>
        </div>
      </Sidebar>
    );
  }

  return (
    <Sidebar>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <FaUserShield className="w-5 h-5 text-red-600" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Admin Panel</h1>
          </div>
          <p className="text-gray-600">Manage all registered users</p>
        </div>

        {message && (
          <div className={`mb-6 px-4 py-3 rounded-lg ${
            message.includes('success') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
          }`}>
            {message}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <FaUsers className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{users.length}</p>
                <p className="text-sm text-gray-500">Total Users</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <FaLaptopCode className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{users.filter(u => u.roleType === 'IT').length}</p>
                <p className="text-sm text-gray-500">IT Users</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <FaBriefcase className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{users.filter(u => u.roleType === 'NON_IT').length}</p>
                <p className="text-sm text-gray-500">Non-IT Users</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <FaUsers className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{users.reduce((acc, u) => acc + u.portfolioItemCount, 0)}</p>
                <p className="text-sm text-gray-500">Total Items</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input pl-12"
            placeholder="Search users by username, email, or name..."
          />
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {isLoading ? (
            <div className="p-12 text-center">
              <div className="w-8 h-8 spinner border-gray-900 mx-auto" />
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="p-12 text-center">
              <FaUsers className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No users found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Theme</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredUsers.map((userData) => (
                    <tr key={userData._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                            {userData.avatarUrl ? (
                              <img src={userData.avatarUrl} alt={userData.fullName} className="w-full h-full object-cover" />
                            ) : (
                              <FaUsers className="w-5 h-5 text-gray-500" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{userData.fullName || userData.username}</p>
                            <p className="text-sm text-gray-500">@{userData.username}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{userData.email}</td>
                      <td className="px-6 py-4">
                        <span className={`badge ${userData.roleType === 'IT' ? 'badge-primary' : 'badge-secondary'}`}>
                          {userData.roleType}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600 capitalize">{userData.selectedTheme}</td>
                      <td className="px-6 py-4 text-gray-600">{userData.portfolioItemCount}</td>
                      <td className="px-6 py-4 text-gray-600">
                        {new Date(userData.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <a
                            href={`/${userData.username}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-secondary py-1.5 px-3 text-sm"
                          >
                            View
                          </a>
                          <button
                            onClick={() => handleDelete(userData._id, userData.username)}
                            className="btn btn-danger py-1.5 px-3 text-sm"
                          >
                            <FaTrash className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Sidebar>
  );
}
