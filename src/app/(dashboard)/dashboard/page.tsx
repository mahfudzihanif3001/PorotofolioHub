'use client';

import { useAuth } from '@/hooks/useAuth';
import { usePortfolio } from '@/hooks/usePortfolio';
import Sidebar from '@/components/dashboard/Sidebar';
import Link from 'next/link';
import { 
  FaFolderOpen, 
  FaPalette, 
  FaEye, 
  FaPlus,
  FaProjectDiagram,
  FaCertificate,
  FaFileAlt,
  FaBriefcase,
  FaGraduationCap
} from 'react-icons/fa';

export default function DashboardPage() {
  const { user } = useAuth();
  const { items, isLoading } = usePortfolio();

  const stats = [
    {
      name: 'Total Items',
      value: items.length,
      icon: FaFolderOpen,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      name: 'Projects',
      value: items.filter((i) => i.category === 'PROJECT').length,
      icon: FaProjectDiagram,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      name: 'Certificates',
      value: items.filter((i) => i.category === 'CERTIFICATE').length,
      icon: FaCertificate,
      color: 'bg-yellow-100 text-yellow-600',
    },
    {
      name: 'Experience',
      value: items.filter((i) => i.category === 'EXPERIENCE').length,
      icon: FaBriefcase,
      color: 'bg-green-100 text-green-600',
    },
  ];

  const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    PROJECT: FaProjectDiagram,
    CERTIFICATE: FaCertificate,
    RESUME: FaFileAlt,
    EXPERIENCE: FaBriefcase,
    EDUCATION: FaGraduationCap,
  };

  const recentItems = items.slice(0, 5);

  return (
    <Sidebar>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Welcome back, {user?.fullName || user?.username}! 👋
          </h1>
          <p className="text-gray-600 mt-1">
            Here's an overview of your portfolio
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.name} className="bg-white rounded-xl p-4 border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-gray-500">{stat.name}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Link
            href="/dashboard/portfolio"
            className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <FaPlus className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">Add New Item</h3>
                <p className="text-sm text-gray-500">Create project, certificate, etc.</p>
              </div>
            </div>
          </Link>

          <Link
            href="/dashboard/themes"
            className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <FaPalette className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">Change Theme</h3>
                <p className="text-sm text-gray-500">Current: {user?.selectedTheme}</p>
              </div>
            </div>
          </Link>

          <Link
            href={`/${user?.username}`}
            target="_blank"
            className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <FaEye className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">View Portfolio</h3>
                <p className="text-sm text-gray-500">/{user?.username}</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Recent Items */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="font-semibold text-lg">Recent Items</h2>
            <Link
              href="/dashboard/portfolio"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              View all →
            </Link>
          </div>

          {isLoading ? (
            <div className="p-6 text-center text-gray-500">Loading...</div>
          ) : recentItems.length === 0 ? (
            <div className="p-12 text-center">
              <FaFolderOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="font-medium text-gray-900 mb-1">No items yet</h3>
              <p className="text-gray-500 mb-4">Start by adding your first portfolio item</p>
              <Link href="/dashboard/portfolio" className="btn btn-primary">
                <FaPlus className="w-4 h-4" />
                Add Item
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {recentItems.map((item) => {
                const Icon = categoryIcons[item.category] || FaFileAlt;
                return (
                  <div key={item._id} className="px-6 py-4 flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{item.title}</h3>
                      <p className="text-sm text-gray-500">{item.category}</p>
                    </div>
                    <span className={`badge ${item.isVisible ? 'badge-success' : 'badge-secondary'}`}>
                      {item.isVisible ? 'Visible' : 'Hidden'}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </Sidebar>
  );
}
