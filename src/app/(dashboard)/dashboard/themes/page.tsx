"use client";

import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import { useAuth } from "@/hooks/useAuth";
import { getAllThemes, ThemeConfig } from "@/lib/themes";
import { FaCheck, FaEye } from "react-icons/fa";

export default function ThemesPage() {
  const { user, updateUser } = useAuth();
  const [selectedTheme, setSelectedTheme] = useState(
    user?.selectedTheme || "minimalist",
  );
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  const themes = getAllThemes();

  const handleSave = async () => {
    setIsSaving(true);
    setMessage("");

    try {
      const res = await fetch("/api/me", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ selectedTheme }),
        credentials: "include",
      });

      if (res.ok) {
        updateUser({ selectedTheme });
        setMessage("Theme updated successfully!");
      } else {
        const data = await res.json();
        setMessage(data.error || "Failed to update theme");
      }
    } catch (error) {
      setMessage("Failed to update theme");
    } finally {
      setIsSaving(false);
    }
  };

  const getThemePreview = (theme: ThemeConfig) => {
    switch (theme.name) {
      case "minimalist":
        return (
          <div className="h-full bg-white p-4">
            <div className="w-full h-3 bg-gray-200 rounded mb-2" />
            <div className="w-3/4 h-3 bg-gray-200 rounded mb-4" />
            <div className="grid grid-cols-2 gap-2">
              <div className="h-12 bg-gray-100 rounded" />
              <div className="h-12 bg-gray-100 rounded" />
            </div>
          </div>
        );
      case "cyberpunk":
        return (
          <div className="h-full bg-gray-900 p-4">
            <div className="w-full h-3 bg-green-500/50 rounded mb-2" />
            <div className="w-3/4 h-3 bg-green-500/30 rounded mb-4" />
            <div className="grid grid-cols-2 gap-2">
              <div className="h-12 bg-green-500/20 rounded border border-green-500/50" />
              <div className="h-12 bg-green-500/20 rounded border border-green-500/50" />
            </div>
          </div>
        );
      case "corporate":
        return (
          <div className="h-full bg-slate-50 p-4">
            <div className="w-full h-6 bg-[#1e3a5f] rounded mb-2" />
            <div className="w-3/4 h-3 bg-slate-300 rounded mb-4" />
            <div className="grid grid-cols-2 gap-2">
              <div className="h-12 bg-white rounded border-l-4 border-[#c9a227] shadow" />
              <div className="h-12 bg-white rounded border-l-4 border-[#c9a227] shadow" />
            </div>
          </div>
        );
      case "creative":
        return (
          <div className="h-full bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 p-4">
            <div className="w-full h-3 bg-purple-300/50 rounded-full mb-2" />
            <div className="w-3/4 h-3 bg-pink-300/50 rounded-full mb-4" />
            <div className="grid grid-cols-2 gap-2">
              <div className="h-12 bg-white/80 rounded-2xl shadow" />
              <div className="h-12 bg-white/80 rounded-2xl shadow" />
            </div>
          </div>
        );
      case "newspaper":
        return (
          <div className="h-full bg-[#f5f5dc] p-4">
            <div className="w-full h-4 bg-gray-900 mb-2" />
            <div className="border-t-2 border-b border-gray-900 py-1 mb-2">
              <div className="w-3/4 h-2 bg-gray-400 rounded" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="h-12 border-b border-gray-400" />
              <div className="h-12 border-b border-gray-400" />
            </div>
          </div>
        );
      case "neobrutalism":
        return (
          <div className="h-full bg-white p-4">
            <div className="w-full h-4 bg-yellow-400 border-2 border-black shadow-[4px_4px_0_0_#000] mb-2" />
            <div className="w-3/4 h-3 bg-pink-400 border-2 border-black shadow-[3px_3px_0_0_#000] mb-3" />
            <div className="grid grid-cols-2 gap-2">
              <div className="h-10 bg-cyan-400 border-2 border-black shadow-[3px_3px_0_0_#000]" />
              <div className="h-10 bg-lime-400 border-2 border-black shadow-[3px_3px_0_0_#000]" />
            </div>
          </div>
        );
      case "glassmorphism":
        return (
          <div className="h-full bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 p-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-12 h-12 bg-purple-500/30 rounded-full blur-xl" />
            <div className="absolute bottom-0 left-0 w-10 h-10 bg-cyan-500/30 rounded-full blur-xl" />
            <div className="w-full h-4 bg-white/20 backdrop-blur rounded-full mb-2" />
            <div className="w-3/4 h-3 bg-white/10 backdrop-blur rounded-full mb-3" />
            <div className="grid grid-cols-2 gap-2">
              <div className="h-10 bg-white/10 backdrop-blur rounded-2xl border border-white/20" />
              <div className="h-10 bg-white/10 backdrop-blur rounded-2xl border border-white/20" />
            </div>
          </div>
        );
      case "biophilic":
        return (
          <div className="h-full bg-gradient-to-b from-amber-100 via-stone-100 to-green-100 p-4">
            <div className="w-full h-4 bg-amber-200 border-2 border-stone-300 rounded mb-2" />
            <div className="w-3/4 h-3 bg-green-200 border border-stone-300 rounded mb-3" />
            <div className="grid grid-cols-2 gap-2">
              <div className="h-10 bg-amber-50 border-2 border-stone-300 rounded" />
              <div className="h-10 bg-green-50 border-2 border-stone-300 rounded" />
            </div>
          </div>
        );
      case "y2kretro":
        return (
          <div className="h-full bg-teal-700 p-2">
            <div className="bg-gray-300 border-t-2 border-white border-b-2 border-b-gray-500 p-1 mb-2">
              <div className="flex gap-1">
                <div className="w-8 h-4 bg-gray-200 border border-gray-400 shadow-[inset_-1px_-1px_0_0_#808080,inset_1px_1px_0_0_#fff]" />
                <div className="w-8 h-4 bg-gray-200 border border-gray-400 shadow-[inset_-1px_-1px_0_0_#808080,inset_1px_1px_0_0_#fff]" />
              </div>
            </div>
            <div className="bg-gray-200 border-2 border-gray-400 shadow-[inset_-2px_-2px_0_0_#808080,inset_2px_2px_0_0_#fff] p-2">
              <div className="bg-blue-800 h-3 mb-1" />
              <div className="h-8 bg-gray-100" />
            </div>
          </div>
        );
      case "luxury":
        return (
          <div className="h-full bg-neutral-50 p-4">
            <div className="w-full h-px bg-amber-600 mb-3" />
            <div className="w-1/2 h-4 bg-neutral-800 mb-2" />
            <div className="w-3/4 h-2 bg-neutral-300 mb-4" />
            <div className="grid grid-cols-2 gap-4">
              <div className="h-10 border border-neutral-300" />
              <div className="h-10 border border-neutral-300" />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Sidebar>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Theme Selection
          </h1>
          <p className="text-gray-600 mt-1">
            Choose a theme that matches your style
          </p>
        </div>

        {message && (
          <div
            className={`mb-6 px-4 py-3 rounded-lg ${
              message.includes("success")
                ? "bg-green-50 text-green-600"
                : "bg-red-50 text-red-600"
            }`}
          >
            {message}
          </div>
        )}

        {/* Theme Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {themes.map((theme) => (
            <button
              key={theme.name}
              onClick={() => setSelectedTheme(theme.name)}
              className={`relative bg-white rounded-xl border-2 overflow-hidden transition-all hover:shadow-lg ${
                selectedTheme === theme.name
                  ? "border-gray-900 ring-2 ring-gray-900 ring-offset-2"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              {/* Selection Badge */}
              {selectedTheme === theme.name && (
                <div className="absolute top-3 right-3 w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center z-10">
                  <FaCheck className="w-3 h-3 text-white" />
                </div>
              )}

              {/* Preview */}
              <div className="h-32 overflow-hidden">
                {getThemePreview(theme)}
              </div>

              {/* Info */}
              <div className="p-4 text-left">
                <h3 className="font-semibold text-gray-900">
                  {theme.displayName}
                </h3>
                <p className="text-sm text-gray-500">{theme.description}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleSave}
            disabled={isSaving || selectedTheme === user?.selectedTheme}
            className="btn btn-primary py-3 px-8 disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save Theme"}
          </button>

          <a
            href={`/${user?.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary py-3 px-8"
          >
            <FaEye className="w-4 h-4" />
            Preview Portfolio
          </a>
        </div>

        {/* Theme Details */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Theme Details</h2>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Theme
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Best For
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Style
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 font-medium">Minimalist</td>
                  <td className="px-6 py-4 text-gray-600">Everyone</td>
                  <td className="px-6 py-4 text-gray-600">
                    Clean, Modern, Sans-serif
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Cyberpunk</td>
                  <td className="px-6 py-4 text-gray-600">
                    Developers, IT Professionals
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    Dark, Neon, Monospace
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Corporate</td>
                  <td className="px-6 py-4 text-gray-600">
                    Business Professionals
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    Professional, Navy, Serif
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Creative</td>
                  <td className="px-6 py-4 text-gray-600">
                    Designers, Artists
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    Colorful, Playful, Rounded
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Newspaper</td>
                  <td className="px-6 py-4 text-gray-600">
                    Writers, Journalists
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    Editorial, Classic, Serif
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Neo-Brutalism</td>
                  <td className="px-6 py-4 text-gray-600">
                    UI/UX Designers, Creative Devs
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    Raw, Bold, High-Contrast, Thick Borders
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Glassmorphism</td>
                  <td className="px-6 py-4 text-gray-600">
                    Web3 Devs, App Developers
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    Frosted Glass, Gradient, 3D Float
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Biophilic</td>
                  <td className="px-6 py-4 text-gray-600">
                    Photographers, Architects
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    Earth Tones, Paper Texture, Natural
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Y2K Retro</td>
                  <td className="px-6 py-4 text-gray-600">
                    Game Devs, Streamers
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    Windows 95, Pixel Art, Nostalgia
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium">Luxury Atelier</td>
                  <td className="px-6 py-4 text-gray-600">
                    Fashion, Consultants
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    Elegant Serif, Gold Accents, Spacious
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Sidebar>
  );
}
