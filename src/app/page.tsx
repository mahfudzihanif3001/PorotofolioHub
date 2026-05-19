"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import {
  Rocket,
  Palette,
  Upload,
  Users,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Layers,
  Globe,
  Star,
  ChevronRight,
  Link2,
  Code2,
  Send,
} from "lucide-react";

export default function HomePage() {
  const { isAuthenticated, isLoading } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      icon: Palette,
      title: "10 Stunning Themes",
      desc: "Choose from curated themes — Minimalist, Cyberpunk, Neo-Brutalism, Glassmorphism & more.",
      color: "text-violet-600",
      bg: "bg-violet-50",
      hover: "group-hover:shadow-violet-100",
    },
    {
      icon: Upload,
      title: "Seamless Uploads",
      desc: "Upload images, PDFs, or add external links. Automatically optimized via Cloudinary.",
      color: "text-blue-600",
      bg: "bg-blue-50",
      hover: "group-hover:shadow-blue-100",
    },
    {
      icon: Users,
      title: "For Every Profession",
      desc: "Engineers, Designers, Marketers or Writers — our platform adapts to your craft.",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      hover: "group-hover:shadow-emerald-100",
    },
    {
      icon: Sparkles,
      title: "Deep Personalization",
      desc: "Customize your bio, highlight competencies, add social links and make it yours.",
      color: "text-amber-600",
      bg: "bg-amber-50",
      hover: "group-hover:shadow-amber-100",
    },
    {
      icon: Layers,
      title: "Structured Sections",
      desc: "Auto-organized into Projects, Certificates, Experience and Education sections.",
      color: "text-pink-600",
      bg: "bg-pink-50",
      hover: "group-hover:shadow-pink-100",
    },
    {
      icon: Globe,
      title: "Custom Public URL",
      desc: "Claim your unique URL (e.g., site.com/username) and share with recruiters.",
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      hover: "group-hover:shadow-indigo-100",
    },
  ];

  const themes = [
    {
      name: "Minimalist",
      desc: "Clean, spacious, typography-focused.",
      preview: (
        <div className="h-44 bg-gradient-to-br from-white to-gray-50 flex items-center justify-center border-b border-gray-100">
          <span className="text-5xl font-light text-gray-200 tracking-widest">Aa</span>
        </div>
      ),
      bg: "bg-white",
      title: "text-gray-900",
    },
    {
      name: "Cyberpunk",
      desc: "High-contrast neon aesthetics.",
      preview: (
        <div className="h-44 bg-black flex items-center justify-center border-b border-gray-800">
          <span className="text-3xl font-mono text-green-400 font-bold tracking-tighter">_SYS.OP</span>
        </div>
      ),
      bg: "bg-gray-900",
      title: "text-green-400",
    },
    {
      name: "Corporate",
      desc: "Executive and highly professional.",
      preview: (
        <div className="h-44 bg-gradient-to-br from-[#1e3a5f] to-[#12243d] flex items-center justify-center">
          <div className="w-14 h-14 border-2 border-[#c9a227] flex items-center justify-center">
            <span className="text-xl font-serif text-[#c9a227]">C</span>
          </div>
        </div>
      ),
      bg: "bg-white",
      title: "text-gray-900",
    },
    {
      name: "Neo-Brutalism",
      desc: "Bold, unapologetic, trendy.",
      preview: (
        <div className="h-44 bg-yellow-300 border-b-2 border-black flex items-center justify-center">
          <span className="text-3xl font-black text-black uppercase">BRUTAL</span>
        </div>
      ),
      bg: "bg-white border-2 border-black",
      title: "text-black",
    },
    {
      name: "Glassmorphism",
      desc: "Frosted elements and vibrant backdrops.",
      preview: (
        <div className="h-44 bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-400 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-6 rounded-2xl backdrop-blur-md bg-white/20 border border-white/40 flex items-center justify-center">
            <span className="text-xl font-light text-white tracking-wider">Glass</span>
          </div>
        </div>
      ),
      bg: "bg-white",
      title: "text-gray-900",
    },
    {
      name: "Y2K Retro",
      desc: "Nostalgic 90s computing aesthetic.",
      preview: (
        <div className="h-44 bg-teal-700 flex items-center justify-center p-4">
          <div className="w-full h-full border-2 border-white border-r-gray-400 border-b-gray-400 bg-teal-800 flex items-center justify-center">
            <span className="text-2xl font-mono text-white">C:\WIN_</span>
          </div>
        </div>
      ),
      bg: "bg-[#c0c0c0]",
      title: "text-black font-mono",
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 antialiased">
      {/* ── NAVBAR ── */}
      <nav className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-xl shadow-sm border-b border-gray-100" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-gray-950 rounded-lg flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <Rocket className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight text-gray-950">PortfolioHub</span>
          </Link>

          <div className="hidden md:flex items-center gap-7 text-sm font-medium text-gray-500">
            <Link href="#features" className="hover:text-gray-900 transition-colors">Features</Link>
            <Link href="#themes" className="hover:text-gray-900 transition-colors">Themes</Link>
            <Link href="#pricing" className="hover:text-gray-900 transition-colors">Pricing</Link>
          </div>

          <div className="flex items-center gap-3">
            {isLoading ? (
              <div className="w-20 h-9 bg-gray-100 rounded-lg animate-pulse" />
            ) : isAuthenticated ? (
              <Link href="/dashboard" className="flex items-center gap-2 bg-gray-950 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-gray-800 transition-colors shadow-sm">
                Dashboard <ChevronRight className="w-4 h-4" />
              </Link>
            ) : (
              <>
                <Link href="/auth/login" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors hidden sm:block">
                  Log in
                </Link>
                <Link href="/auth/register" className="flex items-center gap-1.5 bg-gray-950 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-gray-800 transition-colors shadow-sm">
                  Get Started <ArrowRight className="w-4 h-4" />
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-24 lg:pt-44 lg:pb-32 overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:40px_40px] opacity-40 pointer-events-none" />
        {/* Blobs */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-violet-200 rounded-full mix-blend-multiply filter blur-[80px] opacity-50 animate-blob pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-[80px] opacity-40 animate-blob animation-delay-2000 pointer-events-none" />

        <div className="max-w-5xl mx-auto px-5 sm:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-violet-50 border border-violet-200 rounded-full px-4 py-1.5 mb-8">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500" />
            </span>
            <span className="text-xs font-semibold text-violet-700 uppercase tracking-wider">PortfolioHub 2.0 — Now Live</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-950 mb-6 tracking-tight leading-[1.08]">
            Build your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-pink-600">professional presence</span>
            {" "}in minutes
          </h1>

          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Showcase your projects, skills and experience with beautiful themes. Get a unique public URL instantly — no code required.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/auth/register" className="group flex items-center gap-2.5 bg-gray-950 text-white text-base font-semibold px-8 py-4 rounded-2xl shadow-xl hover:bg-gray-800 hover:-translate-y-0.5 transition-all duration-200">
              Start for free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              No credit card required
            </div>
          </div>

          {/* Stats row */}
          <div className="mt-16 flex flex-wrap justify-center gap-8 sm:gap-12 text-center">
            {[
              { value: "10+", label: "Themes" },
              { value: "Free", label: "Forever" },
              { value: "1 min", label: "Setup Time" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-black text-gray-950">{s.value}</p>
                <p className="text-sm text-gray-500 mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Browser mockup */}
          <div className="mt-16 rounded-2xl border border-gray-200 shadow-2xl overflow-hidden bg-white max-w-4xl mx-auto">
            <div className="h-9 bg-gray-50 border-b border-gray-200 flex items-center px-4 gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
              <div className="ml-3 flex-1 max-w-sm mx-auto bg-white rounded border border-gray-200 text-[10px] text-gray-400 font-mono h-5 flex items-center justify-center">
                porotofolio-hub.vercel.app/hanifmahfudzi
              </div>
            </div>
            <div className="p-6 grid md:grid-cols-4 gap-4 bg-gray-50/50">
              <div className="space-y-3">
                <div className="w-14 h-14 bg-gray-200 rounded-full" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-100 rounded w-1/2" />
                <div className="h-16 bg-white border border-gray-100 rounded-xl shadow-sm mt-4" />
              </div>
              <div className="col-span-3 space-y-3">
                <div className="flex gap-2 mb-4">
                  <div className="h-8 w-20 bg-gray-900 rounded-lg" />
                  <div className="h-8 w-20 bg-white border border-gray-200 rounded-lg" />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-24 bg-white border border-gray-100 rounded-xl shadow-sm" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-24 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs font-bold text-violet-600 tracking-widest uppercase mb-3">Features</p>
            <h2 className="text-4xl font-black text-gray-950 tracking-tight mb-4">Everything you need to stand out</h2>
            <p className="text-gray-500 text-lg">Built for professionals who want a stunning portfolio without the complexity.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className={`group p-7 bg-white rounded-2xl border border-gray-100 hover:shadow-xl ${f.hover} hover:-translate-y-1 transition-all duration-300`}>
                  <div className={`w-12 h-12 ${f.bg} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-6 h-6 ${f.color}`} />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{f.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── THEMES ── */}
      <section id="themes" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <p className="text-xs font-bold text-violet-600 tracking-widest uppercase mb-3">Theme Gallery</p>
              <h2 className="text-4xl font-black text-gray-950 tracking-tight mb-3">Designed to Impress</h2>
              <p className="text-gray-500 text-lg max-w-xl">Switch between world-class designs with one click. Your content adapts automatically.</p>
            </div>
            <Link href="/auth/register" className="flex items-center gap-2 border border-gray-300 text-gray-700 text-sm font-semibold px-5 py-3 rounded-xl hover:border-gray-900 hover:text-gray-900 transition-colors whitespace-nowrap">
              Explore All Themes <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {themes.map((t) => (
              <div key={t.name} className={`group rounded-2xl overflow-hidden ${t.bg} border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer`}>
                {t.preview}
                <div className="p-5 flex items-center justify-between">
                  <div>
                    <h3 className={`font-bold text-base ${t.title}`}>{t.name}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{t.desc}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-24 bg-gray-950 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(124,58,237,0.3),transparent_60%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(236,72,153,0.2),transparent_60%)] pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center px-5 relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-8">
            <Star className="w-3.5 h-3.5 text-yellow-400" />
            <span className="text-xs font-semibold text-white/80">100% Free · No Credit Card Required</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5 tracking-tight leading-tight">
            Ready to accelerate your career?
          </h2>
          <p className="text-lg text-gray-400 mb-10 max-w-xl mx-auto">
            Join professionals who have elevated their online presence with PortfolioHub. Setup takes less than 5 minutes.
          </p>
          <Link href="/auth/register" className="inline-flex items-center gap-3 bg-white text-gray-950 px-8 py-4 rounded-2xl font-bold text-base hover:bg-gray-100 hover:-translate-y-0.5 transition-all shadow-2xl">
            Create Your Free Portfolio
            <Rocket className="w-5 h-5 text-violet-600" />
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
            <div className="lg:col-span-2 space-y-5">
              <Link href="/" className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-gray-950 rounded-lg flex items-center justify-center">
                  <Rocket className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-lg tracking-tight text-gray-950">PortfolioHub</span>
              </Link>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                The premier platform for professionals to showcase work, build their brand, and land better opportunities.
              </p>
              <div className="flex gap-3">
                {[
                  { Icon: Send, href: "#", label: "Twitter" },
                  { Icon: Code2, href: "#", label: "Github" },
                  { Icon: Link2, href: "#", label: "LinkedIn" },
                ].map(({ Icon, href, label }) => (
                  <a key={href} href={href} className="w-9 h-9 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:border-gray-400 transition-all">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {[
              {
                title: "Product",
                links: ["Features", "Themes Gallery", "Pricing", "Changelog"],
              },
              {
                title: "Resources",
                links: ["Documentation", "Blog", "Community", "Help Center"],
              },
              {
                title: "Legal",
                links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Data Security"],
              },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="font-semibold text-gray-900 mb-5 text-sm">{col.title}</h4>
                <ul className="space-y-3">
                  {col.links.map((l) => (
                    <li key={l}>
                      <Link href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                        {l}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-14 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400">© {new Date().getFullYear()} PortfolioHub. All rights reserved.</p>
            <p className="text-sm text-gray-400">Made with ♥ by the PortfolioHub Team</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
