import { ThemeConfig } from "@/lib/themes";

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  email?: string;
  instagram?: string;
  website?: string;
}

export interface UserProfile {
  username: string;
  fullName: string;
  bio: string;
  title: string;
  selectedTheme: string;
  avatarUrl: string;
  socialLinks: SocialLinks;
  phone?: string;
  location?: string;
  skills: string[];
}

export interface Attachment {
  fileType: "IMAGE" | "PDF" | "LINK" | "VIDEO";
  url: string;
  publicId?: string;
  label?: string;
}

export interface PortfolioItem {
  _id: string;
  userId: string;
  title: string;
  description: string;
  descriptions?: string[]; // Multiple descriptions for experience/education
  category: "PROJECT" | "CERTIFICATE" | "RESUME" | "EXPERIENCE" | "EDUCATION";
  attachments: Attachment[];
  techStack: string[];
  startDate?: string;
  endDate?: string;
  order: number;
  isVisible: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ThemeProps {
  profile: UserProfile;
  items: PortfolioItem[];
  theme: ThemeConfig;
}

export const categoryLabels: Record<PortfolioItem["category"], string> = {
  PROJECT: "Projects",
  CERTIFICATE: "Certificates",
  RESUME: "Resume",
  EXPERIENCE: "Experience",
  EDUCATION: "Education",
};

export const categoryIcons: Record<PortfolioItem["category"], string> = {
  PROJECT: "💼",
  CERTIFICATE: "🏆",
  RESUME: "📄",
  EXPERIENCE: "👔",
  EDUCATION: "🎓",
};
