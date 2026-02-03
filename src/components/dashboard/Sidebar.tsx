'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { 
  FaRocket, 
  FaHome, 
  FaFolderOpen, 
  FaPalette, 
  FaUser, 
  FaCog, 
  FaSignOutAlt,
  FaExternalLinkAlt,
  FaUserShield
} from 'react-icons/fa';
import { HiOutlineMenuAlt2, HiX } from 'react-icons/hi';
import { useState } from 'react';

interface SidebarProps {
  children: React.ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Overview', href: '/dashboard', icon: FaHome },
    { name: 'Portfolio', href: '/dashboard/portfolio', icon: FaFolderOpen },
    { name: 'Themes', href: '/dashboard/themes', icon: FaPalette },
    { name: 'Profile', href: '/dashboard/profile', icon: FaUser },
  ];

  if (user?.isSuperAdmin) {
    navigation.push({ name: 'Admin Panel', href: '/dashboard/admin', icon: FaUserShield });
  }

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard';
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
            <FaRocket className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg">PortfolioHub</span>
        </Link>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          {isMobileMenuOpen ? (
            <HiX className="w-6 h-6" />
          ) : (
            <HiOutlineMenuAlt2 className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-50 transform transition-transform duration-300 lg:translate-x-0 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center gap-2 px-4 border-b border-gray-200">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
              <FaRocket className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg">PortfolioHub</span>
          </Link>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
              {user?.avatarUrl ? (
                <img src={user.avatarUrl} alt={user.fullName || user.username} className="w-full h-full object-cover" />
              ) : (
                <FaUser className="w-5 h-5 text-gray-500" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{user?.fullName || user?.username}</p>
              <p className="text-sm text-gray-500 truncate">@{user?.username}</p>
            </div>
          </div>
          <Link
            href={`/${user?.username}`}
            target="_blank"
            className="mt-3 flex items-center justify-center gap-2 w-full px-3 py-2 bg-gray-100 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            <FaExternalLinkAlt className="w-3 h-3" />
            View Public Profile
          </Link>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${
                  active
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <FaSignOutAlt className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen">
        <div className="p-4 sm:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
