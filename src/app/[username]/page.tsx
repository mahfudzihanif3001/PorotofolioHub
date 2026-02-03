import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTheme } from "@/lib/themes";
import MinimalistTheme from "@/components/public/MinimalistTheme";
import CyberpunkTheme from "@/components/public/CyberpunkTheme";
import CorporateTheme from "@/components/public/CorporateTheme";
import CreativeTheme from "@/components/public/CreativeTheme";
import NewspaperTheme from "@/components/public/NewspaperTheme";
import NeoBrutalismTheme from "@/components/public/NeoBrutalismTheme";
import GlassmorphismTheme from "@/components/public/GlassmorphismTheme";
import BiophilicTheme from "@/components/public/BiophilicTheme";
import Y2KRetroTheme from "@/components/public/Y2KRetroTheme";
import LuxuryTheme from "@/components/public/LuxuryTheme";

interface PageProps {
  params: Promise<{ username: string }>;
}

// Fetch portfolio data
async function getPortfolioData(username: string) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  try {
    const res = await fetch(`${baseUrl}/api/public/${username}`, {
      next: { revalidate: 60 }, // ISR - revalidate every 60 seconds
    });

    if (!res.ok) {
      if (res.status === 404) {
        return null;
      }
      throw new Error("Failed to fetch portfolio data");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    return null;
  }
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { username } = await params;
  const data = await getPortfolioData(username);

  if (!data) {
    return {
      title: "Portfolio Not Found",
      description: "The requested portfolio could not be found.",
    };
  }

  const { profile } = data;

  return {
    title: `${profile.fullName || profile.username} | Portfolio`,
    description:
      profile.bio ||
      `View ${profile.fullName || profile.username}'s professional portfolio`,
    openGraph: {
      title: `${profile.fullName || profile.username} | Portfolio`,
      description:
        profile.bio ||
        `View ${profile.fullName || profile.username}'s professional portfolio`,
      type: "profile",
      images: profile.avatarUrl ? [{ url: profile.avatarUrl }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${profile.fullName || profile.username} | Portfolio`,
      description:
        profile.bio ||
        `View ${profile.fullName || profile.username}'s professional portfolio`,
      images: profile.avatarUrl ? [profile.avatarUrl] : [],
    },
  };
}

// Theme components mapping
const themeComponents = {
  minimalist: MinimalistTheme,
  cyberpunk: CyberpunkTheme,
  corporate: CorporateTheme,
  creative: CreativeTheme,
  newspaper: NewspaperTheme,
  neobrutalism: NeoBrutalismTheme,
  glassmorphism: GlassmorphismTheme,
  biophilic: BiophilicTheme,
  y2kretro: Y2KRetroTheme,
  luxury: LuxuryTheme,
};

export default async function PublicPortfolioPage({ params }: PageProps) {
  const { username } = await params;
  const data = await getPortfolioData(username);

  if (!data) {
    notFound();
  }

  const { profile, items } = data;
  const themeName = profile.selectedTheme || "minimalist";
  const theme = getTheme(themeName);

  // Get the appropriate theme component
  const ThemeComponent =
    themeComponents[themeName as keyof typeof themeComponents] ||
    MinimalistTheme;

  return <ThemeComponent profile={profile} items={items} theme={theme} />;
}
