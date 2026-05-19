"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { Rocket, Eye, EyeOff, ArrowLeft, Mail, Lock, User, AlertCircle, Sparkles, Globe } from "lucide-react";

export default function RegisterPage() {
  const { register } = useAuth();
  const [formData, setFormData] = useState({ username: "", email: "", password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (formData.password !== formData.confirmPassword) return setError("Passwords do not match");
    if (formData.password.length < 6) return setError("Password must be at least 6 characters");
    if (formData.username.length < 3) return setError("Username must be at least 3 characters");
    if (!/^[a-z0-9_-]+$/.test(formData.username.toLowerCase())) return setError("Username: letters, numbers, - and _ only");
    setIsSubmitting(true);
    try {
      await register(formData.username, formData.email, formData.password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white text-gray-900">
      {/* ── LEFT: Visual Panel ── */}
      <div className="hidden lg:flex w-[45%] xl:w-1/2 bg-gray-950 relative overflow-hidden items-center justify-center flex-col gap-10 p-16">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-blue-600 rounded-full filter blur-[120px] opacity-20" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-violet-600 rounded-full filter blur-[120px] opacity-20" />

        <div className="relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-8">

            <span className="text-xs font-semibold text-white/70">Free to get started</span>
          </div>
          <h2 className="text-3xl font-black text-white mb-4 leading-tight">
            Get your portfolio<br />live in 5 minutes.
          </h2>
          <p className="text-gray-400 text-base leading-relaxed max-w-xs mx-auto">
            Create an account and instantly claim your unique public URL.
          </p>
        </div>

        {/* URL preview card */}
        <div className="relative z-10 w-full max-w-xs bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
          <p className="text-xs text-gray-500 font-medium mb-2 uppercase tracking-wider">Your public URL</p>
          <div className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2.5">
            <Globe className="w-4 h-4 text-violet-400 shrink-0" />
            <span className="text-sm font-mono text-white/80">
              porotofolio-hub.vercel.app/
              <span className="text-violet-400">{formData.username || "username"}</span>
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-3">Ready the moment you sign up.</p>
        </div>
      </div>

      {/* ── RIGHT: Form ── */}
      <div className="flex-1 flex flex-col px-6 sm:px-12 lg:px-20 xl:px-28 py-10 relative">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-gray-700 transition-colors w-fit mb-10">
          <ArrowLeft className="w-4 h-4" /> Back to home
        </Link>

        <div className="flex-1 flex flex-col justify-center max-w-sm w-full mx-auto">
          <Link href="/" className="flex items-center gap-2.5 mb-10 group w-fit">
            <div className="w-9 h-9 bg-gray-950 rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <Rocket className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">PortfolioHub</span>
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-black tracking-tight text-gray-950 mb-2">Create your account</h1>
            <p className="text-gray-500">Start building your professional portfolio today.</p>
          </div>

          {error && (
            <div className="flex items-start gap-3 bg-red-50 border border-red-100 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Username</label>
              <div className="relative group">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-violet-600 transition-colors pointer-events-none" />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 focus:bg-white transition-all"
                  placeholder="johndoe"
                  required
                />
              </div>
              {formData.username && (
                <p className="text-xs text-gray-400 pl-1">
                  URL: <span className="text-violet-600 font-semibold">porotofolio-hub.vercel.app/{formData.username}</span>
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Email address</label>
              <div className="relative group">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-violet-600 transition-colors pointer-events-none" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 focus:bg-white transition-all"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Password</label>
              <div className="relative group">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-violet-600 transition-colors pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-12 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 focus:bg-white transition-all"
                  placeholder="Min. 6 characters"
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Confirm Password</label>
              <div className="relative group">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-violet-600 transition-colors pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500 focus:bg-white transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gray-950 text-white rounded-xl py-3.5 text-sm font-semibold hover:bg-gray-800 disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-lg shadow-gray-950/10 hover:shadow-gray-950/20 hover:-translate-y-0.5 mt-2"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account...
                </span>
              ) : "Create Account — It's Free"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/auth/login" className="font-semibold text-gray-900 hover:text-violet-600 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
