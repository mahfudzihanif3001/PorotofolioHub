'use client';

import { useAuth } from '@/hooks/useAuth';
import { usePortfolio } from '@/hooks/usePortfolio';
import Sidebar from '@/components/dashboard/Sidebar';
import Link from 'next/link';
import { 
  FolderOpen, 
  Palette, 
  Eye, 
  Plus,
  Layers,
  Award,
  FileText,
  Briefcase,
  GraduationCap,
  ArrowRight,
  TrendingUp,
  ExternalLink,
  Clock
} from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();
  const { items, isLoading } = usePortfolio();

  const stats = [
    {
      name: 'Total Items',
      value: items.length,
      icon: Layers,
      gradient: 'from-violet-500 to-purple-600',
      shadow: 'shadow-violet-500/25',
    },
    {
      name: 'Projects',
      value: items.filter((i) => i.category === 'PROJECT').length,
      icon: Briefcase,
      gradient: 'from-blue-500 to-cyan-500',
      shadow: 'shadow-blue-500/25',
    },
    {
      name: 'Certificates',
      value: items.filter((i) => i.category === 'CERTIFICATE').length,
      icon: Award,
      gradient: 'from-amber-500 to-orange-500',
      shadow: 'shadow-amber-500/25',
    },
    {
      name: 'Experience',
      value: items.filter((i) => i.category === 'EXPERIENCE').length,
      icon: TrendingUp,
      gradient: 'from-emerald-500 to-teal-500',
      shadow: 'shadow-emerald-500/25',
    },
  ];

  const categoryIcons: Record<string, any> = {
    PROJECT: Briefcase,
    CERTIFICATE: Award,
    RESUME: FileText,
    EXPERIENCE: TrendingUp,
    EDUCATION: GraduationCap,
  };

  const categoryColors: Record<string, string> = {
    PROJECT: 'bg-blue-50 text-blue-600 border-blue-100',
    CERTIFICATE: 'bg-amber-50 text-amber-600 border-amber-100',
    RESUME: 'bg-gray-50 text-gray-600 border-gray-100',
    EXPERIENCE: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    EDUCATION: 'bg-violet-50 text-violet-600 border-violet-100',
  };

  const recentItems = items.slice(0, 5);

  return (
    <Sidebar>
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* ── HEADER ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 flex flex-col md:flex-row md:items-center gap-5 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-violet-50 to-transparent pointer-events-none" />
          <div className="flex-1 relative z-10">
            <p className="text-sm text-gray-500 font-medium mb-1">Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'},</p>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-950 tracking-tight">
              {user?.fullName?.split(' ')[0] || user?.username} 
            </h1>
            <p className="text-gray-500 mt-1 text-sm">Here's an overview of your portfolio.</p>
          </div>
          <Link
            href={`/${user?.username}`}
            target="_blank"
            className="flex items-center gap-2 bg-gray-950 text-white text-sm font-semibold px-5 py-3 rounded-xl hover:bg-gray-800 transition-colors shadow-sm whitespace-nowrap relative z-10"
          >
            <Eye className="w-4 h-4" />
            View Live Portfolio
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* ── STATS ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.name} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md hover:-translate-y-0.5 transition-all group">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-4 shadow-lg ${stat.shadow} group-hover:scale-110 transition-transform`}>
                  <Icon className="w-5.5 h-5.5 w-[22px] h-[22px] text-white" />
                </div>
                <p className="text-3xl font-black text-gray-950 leading-none mb-1">{stat.value}</p>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{stat.name}</p>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* ── QUICK ACTIONS ── */}
          <div className="space-y-4">
            <h2 className="font-bold text-gray-900 text-base px-1">Quick Actions</h2>
            
            <Link href="/dashboard/portfolio" className="flex items-center gap-4 bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-lg hover:border-violet-100 hover:-translate-y-0.5 transition-all group shadow-sm">
              <div className="w-12 h-12 bg-violet-50 border border-violet-100 rounded-xl flex items-center justify-center group-hover:bg-violet-600 group-hover:border-violet-600 transition-all shrink-0">
                <Plus className="w-5 h-5 text-violet-600 group-hover:text-white transition-colors" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">Add New Item</p>
                <p className="text-xs text-gray-500 mt-0.5">Project, certificate, or experience</p>
              </div>
            </Link>

            <Link href="/dashboard/themes" className="flex items-center gap-4 bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-lg hover:border-pink-100 hover:-translate-y-0.5 transition-all group shadow-sm">
              <div className="w-12 h-12 bg-pink-50 border border-pink-100 rounded-xl flex items-center justify-center group-hover:bg-pink-600 group-hover:border-pink-600 transition-all shrink-0">
                <Palette className="w-5 h-5 text-pink-600 group-hover:text-white transition-colors" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">Change Theme</p>
                <p className="text-xs text-gray-500 mt-0.5 capitalize">{user?.selectedTheme || 'Minimalist'} active</p>
              </div>
            </Link>

            <Link href="/dashboard/profile" className="flex items-center gap-4 bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-lg hover:border-blue-100 hover:-translate-y-0.5 transition-all group shadow-sm">
              <div className="w-12 h-12 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-600 transition-all shrink-0">
                <FolderOpen className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">Edit Profile</p>
                <p className="text-xs text-gray-500 mt-0.5">Bio, skills & social links</p>
              </div>
            </Link>
          </div>

          {/* ── RECENT ITEMS ── */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <h2 className="font-bold text-gray-900 text-sm">Recent Updates</h2>
              </div>
              <Link href="/dashboard/portfolio" className="flex items-center gap-1 text-xs font-semibold text-violet-600 hover:text-violet-700 transition-colors group">
                View all
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            <div className="flex-1">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center p-12 gap-3">
                  <div className="w-7 h-7 border-2 border-gray-200 border-t-violet-600 rounded-full animate-spin" />
                  <p className="text-sm text-gray-400">Loading items...</p>
                </div>
              ) : recentItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-14 text-center">
                  <div className="w-16 h-16 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center mb-5">
                    <FolderOpen className="w-7 h-7 text-gray-300" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Portfolio is empty</h3>
                  <p className="text-gray-500 text-sm mb-6 max-w-xs">Start building your professional presence by adding your first item.</p>
                  <Link href="/dashboard/portfolio" className="flex items-center gap-2 bg-violet-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-violet-700 transition-colors shadow-lg shadow-violet-600/20">
                    <Plus className="w-4 h-4" />
                    Add First Item
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-gray-50">
                  {recentItems.map((item) => {
                    const Icon = categoryIcons[item.category] || FileText;
                    const colorClass = categoryColors[item.category] || 'bg-gray-50 text-gray-600 border-gray-100';
                    return (
                      <div key={item._id} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50/50 transition-colors">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${colorClass} shrink-0`}>
                          <Icon className="w-4.5 h-4.5 w-[18px] h-[18px]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm text-gray-900 truncate">{item.title}</p>
                          <p className="text-xs text-gray-500 capitalize mt-0.5">{item.category.toLowerCase()}</p>
                        </div>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold shrink-0 ${
                          item.isVisible
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                            : 'bg-gray-100 text-gray-500 border border-gray-200'
                        }`}>
                          {item.isVisible ? 'Public' : 'Hidden'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
}
