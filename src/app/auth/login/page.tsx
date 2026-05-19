"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { Rocket, Eye, EyeOff, ArrowLeft, Mail, Lock, AlertCircle, CheckCircle2 } from "lucide-react";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      await login(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white text-gray-900">
      {/* ── LEFT: Form ── */}
      <div className="flex-1 flex flex-col px-6 sm:px-12 lg:px-20 xl:px-28 py-10 relative">
        {/* Back */}
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-gray-700 transition-colors w-fit mb-12">
          <ArrowLeft className="w-4 h-4" /> Back to home
        </Link>

        <div className="flex-1 flex flex-col justify-center max-w-sm w-full mx-auto">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5 mb-10 group w-fit">
            <div className="w-9 h-9 bg-gray-950 rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <Rocket className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">PortfolioHub</span>
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-black tracking-tight text-gray-950 mb-2">Welcome back</h1>
            <p className="text-gray-500">Sign in to manage your portfolio.</p>
          </div>

          {error && (
            <div className="flex items-start gap-3 bg-red-50 border border-red-100 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Email address</label>
              <div className="relative group">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-violet-600 transition-colors pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 focus:bg-white transition-all"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-gray-700">Password</label>
                <a href="#" className="text-xs font-medium text-violet-600 hover:text-violet-700 transition-colors">Forgot password?</a>
              </div>
              <div className="relative group">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-violet-600 transition-colors pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-12 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 focus:bg-white transition-all"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gray-950 text-white rounded-xl py-3.5 text-sm font-semibold hover:bg-gray-800 disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-lg shadow-gray-950/10 hover:shadow-gray-950/20 hover:-translate-y-0.5"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : "Sign In"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link href="/auth/register" className="font-semibold text-gray-900 hover:text-violet-600 transition-colors">
              Create account
            </Link>
          </p>
        </div>
      </div>

      {/* ── RIGHT: Visual Panel ── */}
      <div className="hidden lg:flex w-[45%] xl:w-1/2 bg-gray-950 relative overflow-hidden items-center justify-center flex-col gap-10 p-16">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
        {/* Glows */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-violet-600 rounded-full filter blur-[120px] opacity-20" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-pink-600 rounded-full filter blur-[120px] opacity-20" />

        <div className="relative z-10 text-center">
          <h2 className="text-3xl font-black text-white mb-4 leading-tight">
            Your career story,<br />beautifully told.
          </h2>
          <p className="text-gray-400 text-base leading-relaxed max-w-xs mx-auto">
            One link. Every project, every achievement, every skill — presented professionally.
          </p>
        </div>

        {/* Floating feature pills */}
        <div className="relative z-10 flex flex-col gap-3 w-full max-w-xs">
          {[
            { icon: CheckCircle2, label: "10+ Professional Themes", color: "text-emerald-400" },
            { icon: CheckCircle2, label: "Custom Public URL Instantly", color: "text-emerald-400" },
            { icon: CheckCircle2, label: "Upload Projects & Certificates", color: "text-emerald-400" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3 backdrop-blur-sm">
                <Icon className={`w-4 h-4 shrink-0 ${item.color}`} />
                <span className="text-sm text-gray-300 font-medium">{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
