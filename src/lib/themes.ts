export interface ThemeConfig {
  name: string;
  displayName: string;
  description: string;
  preview: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    accent: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  styles: {
    container: string;
    header: string;
    card: string;
    button: string;
    heading: string;
    text: string;
    link: string;
  };
}

export const themes: Record<string, ThemeConfig> = {
  minimalist: {
    name: "minimalist",
    displayName: "Minimalist",
    description: "Clean, modern design with focus on content",
    preview: "/themes/minimalist.png",
    colors: {
      primary: "#111827",
      secondary: "#6b7280",
      background: "#ffffff",
      text: "#111827",
      accent: "#3b82f6",
    },
    fonts: {
      heading: "font-sans",
      body: "font-sans",
    },
    styles: {
      container: "bg-white text-gray-900",
      header: "bg-white border-b border-gray-200",
      card: "bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow",
      button: "bg-gray-900 text-white hover:bg-gray-800 rounded-md px-4 py-2",
      heading: "text-gray-900 font-semibold",
      text: "text-gray-600",
      link: "text-blue-600 hover:text-blue-800",
    },
  },
  cyberpunk: {
    name: "cyberpunk",
    displayName: "Cyberpunk",
    description: "Dark futuristic design with neon accents",
    preview: "/themes/cyberpunk.png",
    colors: {
      primary: "#00ff41",
      secondary: "#ff00ff",
      background: "#0a0a0a",
      text: "#00ff41",
      accent: "#00d4ff",
    },
    fonts: {
      heading: "font-mono",
      body: "font-mono",
    },
    styles: {
      container: "bg-gray-950 text-green-400",
      header: "bg-black border-b border-green-500/30",
      card: "bg-gray-900 border border-green-500/50 rounded-none hover:border-green-400 transition-colors shadow-lg shadow-green-500/10",
      button:
        "bg-green-500 text-black hover:bg-green-400 font-mono uppercase tracking-wider px-4 py-2",
      heading: "text-green-400 font-mono uppercase tracking-wider",
      text: "text-green-300/80",
      link: "text-cyan-400 hover:text-pink-500",
    },
  },
  corporate: {
    name: "corporate",
    displayName: "Corporate",
    description: "Professional design for business profiles",
    preview: "/themes/corporate.png",
    colors: {
      primary: "#1e3a5f",
      secondary: "#c9a227",
      background: "#f8fafc",
      text: "#1e3a5f",
      accent: "#c9a227",
    },
    fonts: {
      heading: "font-serif",
      body: "font-serif",
    },
    styles: {
      container: "bg-slate-50 text-slate-800",
      header: "bg-[#1e3a5f] text-white",
      card: "bg-white border-l-4 border-[#c9a227] shadow-md hover:shadow-lg transition-shadow",
      button: "bg-[#1e3a5f] text-white hover:bg-[#2a4a6f] px-6 py-2",
      heading: "text-[#1e3a5f] font-serif font-bold",
      text: "text-slate-600 font-serif",
      link: "text-[#c9a227] hover:text-[#1e3a5f]",
    },
  },
  creative: {
    name: "creative",
    displayName: "Creative",
    description: "Colorful, playful design for artists",
    preview: "/themes/creative.png",
    colors: {
      primary: "#8b5cf6",
      secondary: "#ec4899",
      background: "#faf5ff",
      text: "#581c87",
      accent: "#f97316",
    },
    fonts: {
      heading: "font-sans",
      body: "font-sans",
    },
    styles: {
      container:
        "bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 text-purple-900",
      header: "bg-white/80 backdrop-blur-md border-b border-purple-200",
      card: "bg-white/90 backdrop-blur rounded-3xl shadow-xl shadow-purple-500/10 hover:shadow-2xl hover:scale-[1.02] transition-all",
      button:
        "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 rounded-full px-6 py-2",
      heading: "text-purple-800 font-bold",
      text: "text-purple-700/80",
      link: "text-pink-500 hover:text-orange-500",
    },
  },
  newspaper: {
    name: "newspaper",
    displayName: "Newspaper",
    description: "Classic editorial design with columns",
    preview: "/themes/newspaper.png",
    colors: {
      primary: "#1a1a1a",
      secondary: "#4a4a4a",
      background: "#f5f5dc",
      text: "#1a1a1a",
      accent: "#8b0000",
    },
    fonts: {
      heading: "font-serif",
      body: "font-serif",
    },
    styles: {
      container: "bg-[#f5f5dc] text-gray-900",
      header: "bg-[#f5f5dc] border-b-4 border-double border-gray-900",
      card: "bg-[#f5f5dc] border-b border-gray-400 pb-4",
      button: "bg-gray-900 text-[#f5f5dc] hover:bg-gray-800 px-4 py-2",
      heading: "text-gray-900 font-serif font-black uppercase tracking-tight",
      text: "text-gray-800 font-serif leading-relaxed",
      link: "text-[#8b0000] hover:underline",
    },
  },
  neobrutalism: {
    name: "neobrutalism",
    displayName: "Neo-Brutalism",
    description: "Raw, bold design with high contrast and thick borders",
    preview: "/themes/neobrutalism.png",
    colors: {
      primary: "#000000",
      secondary: "#ff6b6b",
      background: "#ffffff",
      text: "#000000",
      accent: "#ffd93d",
    },
    fonts: {
      heading: "font-sans",
      body: "font-sans",
    },
    styles: {
      container: "bg-white text-black",
      header: "bg-black text-white",
      card: "bg-yellow-400 border-4 border-black shadow-[8px_8px_0_0_#000] hover:translate-x-1 hover:-translate-y-1 hover:shadow-[12px_12px_0_0_#000] transition-all",
      button:
        "bg-black text-white border-4 border-black font-black uppercase px-6 py-2 hover:bg-white hover:text-black transition-colors",
      heading: "text-black font-black uppercase",
      text: "text-black font-bold",
      link: "text-blue-600 font-bold underline hover:text-pink-600",
    },
  },
  glassmorphism: {
    name: "glassmorphism",
    displayName: "Glassmorphism",
    description:
      "Frosted glass effect with pastel gradients and 3D floating elements",
    preview: "/themes/glassmorphism.png",
    colors: {
      primary: "#a855f7",
      secondary: "#ec4899",
      background: "#1e1b4b",
      text: "#ffffff",
      accent: "#06b6d4",
    },
    fonts: {
      heading: "font-sans",
      body: "font-sans",
    },
    styles: {
      container:
        "bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 text-white",
      header: "bg-white/10 backdrop-blur-xl border-b border-white/10",
      card: "bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 hover:bg-white/20 transition-all",
      button:
        "bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-full px-6 py-2 hover:bg-white/30 transition-all",
      heading: "text-white font-bold",
      text: "text-white/80",
      link: "text-purple-400 hover:text-pink-400",
    },
  },
  biophilic: {
    name: "biophilic",
    displayName: "Biophilic",
    description: "Earth tones with natural textures and warm aesthetic",
    preview: "/themes/biophilic.png",
    colors: {
      primary: "#365314",
      secondary: "#a16207",
      background: "#fef3c7",
      text: "#1c1917",
      accent: "#15803d",
    },
    fonts: {
      heading: "font-serif",
      body: "font-sans",
    },
    styles: {
      container:
        "bg-gradient-to-b from-amber-100 via-stone-100 to-green-100 text-stone-800",
      header: "bg-amber-50/90 backdrop-blur-sm border-b-2 border-stone-300",
      card: "bg-amber-50/80 backdrop-blur-sm border-2 border-stone-300 rounded-lg shadow-md hover:shadow-xl transition-all",
      button:
        "bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors",
      heading: "text-stone-800 font-serif font-bold",
      text: "text-stone-600",
      link: "text-green-700 hover:text-green-900",
    },
  },
  y2kretro: {
    name: "y2kretro",
    displayName: "Y2K Retro",
    description: "Nostalgic Windows 95 aesthetic with pixel art vibes",
    preview: "/themes/y2kretro.png",
    colors: {
      primary: "#0000aa",
      secondary: "#008080",
      background: "#008080",
      text: "#000000",
      accent: "#ff00ff",
    },
    fonts: {
      heading: "font-mono",
      body: "font-mono",
    },
    styles: {
      container: "bg-teal-700 text-black font-mono",
      header:
        "bg-gray-300 border-t-2 border-white border-b-2 border-b-gray-500",
      card: "bg-gray-200 border-2 border-gray-400 shadow-[inset_-2px_-2px_0_0_#808080,inset_2px_2px_0_0_#fff]",
      button:
        "bg-gray-300 border-2 border-gray-400 shadow-[inset_-2px_-2px_0_0_#808080,inset_2px_2px_0_0_#fff] px-4 py-1 hover:bg-gray-400 active:shadow-[inset_2px_2px_0_0_#808080,inset_-2px_-2px_0_0_#fff]",
      heading: "text-gray-800 font-mono font-bold",
      text: "text-gray-700 font-mono",
      link: "text-blue-800 underline hover:text-purple-800",
    },
  },
  luxury: {
    name: "luxury",
    displayName: "Luxury Atelier",
    description:
      "Elegant serif typography with gold accents and spacious layout",
    preview: "/themes/luxury.png",
    colors: {
      primary: "#1c1917",
      secondary: "#b45309",
      background: "#fafaf9",
      text: "#1c1917",
      accent: "#b45309",
    },
    fonts: {
      heading: "font-serif",
      body: "font-sans",
    },
    styles: {
      container: "bg-neutral-50 text-neutral-800",
      header: "bg-white border-b border-neutral-200",
      card: "bg-white border border-neutral-200 hover:border-amber-600/30 transition-all",
      button:
        "border border-neutral-400 text-neutral-800 px-8 py-3 uppercase tracking-widest text-sm hover:border-amber-600 hover:text-amber-700 transition-all",
      heading: "text-neutral-800 font-serif font-light tracking-wide",
      text: "text-neutral-600 font-light",
      link: "text-amber-700 hover:text-amber-900",
    },
  },
};

export type ThemeName = keyof typeof themes;

export function getTheme(themeName: string): ThemeConfig {
  return themes[themeName] || themes.minimalist;
}

export function getAllThemes(): ThemeConfig[] {
  return Object.values(themes);
}
