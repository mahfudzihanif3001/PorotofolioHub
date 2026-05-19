'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { 
  Rocket, 
  LayoutDashboard, 
  FolderOpen, 
  Palette, 
  UserCircle, 
  LogOut,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';

interface SidebarProps {
  children: React.ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Portfolio Items', href: '/dashboard/portfolio', icon: FolderOpen },
    { name: 'Themes', href: '/dashboard/themes', icon: Palette },
    { name: 'Profile', href: '/dashboard/profile', icon: UserCircle },
  ];

  if (user?.isSuperAdmin) {
    navItems.push({ name: 'Admin Panel', href: '/dashboard/admin', icon: ShieldCheck });
  }

  const isActive = (href: string) =>
    href === '/dashboard' ? pathname === '/dashboard' : pathname.startsWith(href);

  const SidebarContent = () => (
    <div className="h-full flex flex-col">
      {/* Logo */}
      <div className="px-6 h-16 flex items-center border-b border-white/5 shrink-0">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-violet-500/30 group-hover:scale-105 transition-transform">
            <Rocket className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-base text-white tracking-tight">PortfolioHub</span>
        </Link>
      </div>

      {/* User Card */}
      <div className="px-4 py-5 shrink-0">
        <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
          <div className="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden border-2 border-white/10 shrink-0">
            {user?.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={user.avatarUrl} alt="" className="w-full h-full object-cover" />
            ) : (
              <UserCircle className="w-5 h-5 text-gray-400" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">{user?.fullName || user?.username}</p>
            <p className="text-xs text-gray-500 truncate">@{user?.username}</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto pb-4">
        <p className="px-3 mb-2 text-[10px] font-bold text-gray-600 uppercase tracking-widest">Menu</p>
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsMobileOpen(false)}
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                active
                  ? 'bg-violet-600 text-white shadow-lg shadow-violet-900/30'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4.5 h-4.5 w-[18px] h-[18px]" />
                {item.name}
              </div>
              {active && <div className="w-1.5 h-1.5 rounded-full bg-white/60" />}
            </Link>
          );
        })}

        <div className="pt-4">
          <p className="px-3 mb-2 text-[10px] font-bold text-gray-600 uppercase tracking-widest">Quick Access</p>
          <Link
            href={`/${user?.username}`}
            target="_blank"
            className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all group"
          >
            <div className="flex items-center gap-3">
              <ExternalLink className="w-[18px] h-[18px]" />
              View Public Profile
            </div>
            <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        </div>
      </nav>

      {/* Logout */}
      <div className="px-3 pb-5 shrink-0 border-t border-white/5 pt-4">
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
        >
          <LogOut className="w-[18px] h-[18px]" />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 inset-x-0 z-50 h-14 bg-gray-950 border-b border-white/5 flex items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-violet-600 rounded-lg flex items-center justify-center">
            <Rocket className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-white text-sm">PortfolioHub</span>
        </Link>
        <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="text-gray-400 hover:text-white transition-colors p-1">
          {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40" onClick={() => setIsMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-gray-950 border-r border-white/5 z-50 transition-transform duration-300 ease-in-out lg:translate-x-0 ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <SidebarContent />
      </aside>

      {/* Main */}
      <main className="flex-1 lg:ml-64 min-h-screen pt-14 lg:pt-0">
        <div className="p-5 sm:p-8 lg:p-10">{children}</div>
      </main>
    </div>
  );
}
