"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import {
  FaRocket,
  FaPalette,
  FaCloudUploadAlt,
  FaUsers,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import {
  HiOutlineSparkles,
  HiOutlineColorSwatch,
  HiOutlineDocumentDuplicate,
} from "react-icons/hi";

export default function HomePage() {
  const { isAuthenticated, user, isLoading } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                <FaRocket className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-xl">PortfolioHub</span>
            </Link>

            <div className="flex items-center gap-4">
              {isLoading ? (
                <div className="w-20 h-8 bg-gray-200 rounded-lg animate-pulse" />
              ) : isAuthenticated ? (
                <Link href="/dashboard" className="btn btn-primary">
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="text-gray-600 hover:text-gray-900 font-medium"
                  >
                    Login
                  </Link>
                  <Link href="/auth/register" className="btn btn-primary">
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 mb-6">
            <HiOutlineSparkles className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium">
              Create your portfolio in minutes
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Build Your Professional
            <br />
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Portfolio Today
            </span>
          </h1>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Create a stunning portfolio to showcase your projects, certificates,
            and experience. Choose from beautiful themes and share with a unique
            URL.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/register"
              className="btn btn-primary text-lg px-8 py-3 rounded-xl"
            >
              Start Building Free
            </Link>
            <Link
              href="#features"
              className="btn btn-secondary text-lg px-8 py-3 rounded-xl"
            >
              See Features
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div>
              <div className="text-4xl font-bold text-gray-900">10</div>
              <div className="text-gray-600">Beautiful Themes</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-900">∞</div>
              <div className="text-gray-600">Projects & Items</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-900">Free</div>
              <div className="text-gray-600">Forever</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-600">
              Powerful features to showcase your work professionally
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <FaPalette className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">10 Stunning Themes</h3>
              <p className="text-gray-600">
                Choose from 10 unique themes including Minimalist, Cyberpunk,
                Neo-Brutalism, Glassmorphism, and more to match your style.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <FaCloudUploadAlt className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Uploads</h3>
              <p className="text-gray-600">
                Upload images, PDFs, or add external links for your projects,
                certificates, and resume.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <FaUsers className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">IT & Non-IT Roles</h3>
              <p className="text-gray-600">
                Tailored experience for both technical and non-technical
                professionals.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-4">
                <HiOutlineColorSwatch className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Custom Profile</h3>
              <p className="text-gray-600">
                Add your bio, skills, social links, and contact information to
                personalize your portfolio.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-4">
                <HiOutlineDocumentDuplicate className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Multiple Categories
              </h3>
              <p className="text-gray-600">
                Organize your work into Projects, Certificates, Resume,
                Experience, and Education.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-6 bg-gray-50 rounded-2xl hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                <FaRocket className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Public URL</h3>
              <p className="text-gray-600">
                Get a unique public URL like domain.com/username to share with
                anyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Themes Preview Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Beautiful Themes
            </h2>
            <p className="text-xl text-gray-600">
              Pick a theme that matches your personality
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Minimalist */}
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="h-40 bg-gradient-to-br from-white to-gray-100 flex items-center justify-center">
                <span className="text-4xl font-light text-gray-400">Aa</span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold">Minimalist</h3>
                <p className="text-sm text-gray-600">Clean and modern design</p>
              </div>
            </div>

            {/* Cyberpunk */}
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="h-40 bg-gray-900 flex items-center justify-center">
                <span className="text-4xl font-mono text-green-400 animate-pulse">
                  _CODE
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold">Cyberpunk</h3>
                <p className="text-sm text-gray-600">Dark with neon accents</p>
              </div>
            </div>

            {/* Corporate */}
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="h-40 bg-gradient-to-br from-[#1e3a5f] to-[#2a4a6f] flex items-center justify-center">
                <span className="text-4xl font-serif text-[#c9a227]">Pro</span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold">Corporate</h3>
                <p className="text-sm text-gray-600">
                  Professional business look
                </p>
              </div>
            </div>

            {/* Creative */}
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="h-40 bg-gradient-to-br from-purple-200 via-pink-200 to-orange-200 flex items-center justify-center">
                <span className="text-4xl font-bold text-purple-600">✨</span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold">Creative</h3>
                <p className="text-sm text-gray-600">Colorful and playful</p>
              </div>
            </div>

            {/* Newspaper */}
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="h-40 bg-[#f5f5dc] flex items-center justify-center">
                <span className="text-3xl font-serif font-black text-gray-900">
                  THE DAILY
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold">Newspaper</h3>
                <p className="text-sm text-gray-600">Classic editorial style</p>
              </div>
            </div>

            {/* Neo-Brutalism */}
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="h-40 bg-yellow-300 border-4 border-black flex items-center justify-center">
                <span className="text-4xl font-black text-black shadow-[4px_4px_0_0_#000]">
                  BOLD
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold">Neo-Brutalism</h3>
                <p className="text-sm text-gray-600">
                  Bold & expressive design
                </p>
              </div>
            </div>

            {/* Glassmorphism */}
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="h-40 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 backdrop-blur-sm bg-white/10"></div>
                <span className="text-4xl font-light text-white relative z-10">
                  Glass
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold">Glassmorphism</h3>
                <p className="text-sm text-gray-600">Frosted glass aesthetic</p>
              </div>
            </div>

            {/* Biophilic */}
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="h-40 bg-gradient-to-br from-amber-100 via-stone-100 to-green-100 flex items-center justify-center">
                <span className="text-4xl">🌿</span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold">Biophilic</h3>
                <p className="text-sm text-gray-600">Nature-inspired design</p>
              </div>
            </div>

            {/* Y2K Retro */}
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="h-40 bg-gray-300 border-2 border-gray-400 flex items-center justify-center">
                <span className="text-3xl font-mono text-teal-700">WIN98</span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold">Y2K Retro</h3>
                <p className="text-sm text-gray-600">Windows 98 nostalgia</p>
              </div>
            </div>

            {/* Luxury */}
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow">
              <div className="h-40 bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
                <span className="text-4xl font-serif text-[#c9a227]">Luxe</span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold">Luxury</h3>
                <p className="text-sm text-gray-600">Elegant & sophisticated</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Showcase Your Work?
          </h2>
          <p className="text-xl text-gray-400 mb-10">
            Join now and create your professional portfolio in minutes.
          </p>
          <Link
            href="/auth/register"
            className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors"
          >
            Create Your Portfolio
            <FaRocket className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                <FaRocket className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-xl">PortfolioHub</span>
            </div>

            <div className="text-gray-600">
              Built with ❤️ using Next.js, MongoDB & Cloudinary
            </div>

            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-gray-600">
                <FaGithub className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-600">
                <FaLinkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
