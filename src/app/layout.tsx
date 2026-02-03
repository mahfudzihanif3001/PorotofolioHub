import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { AuthProvider } from "@/hooks/useAuth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PortfolioHub - Create Your Professional Portfolio",
  description:
    "A multi-user dynamic portfolio platform. Register, upload projects, choose themes, and share your portfolio with the world.",
  keywords: [
    "portfolio",
    "resume",
    "cv",
    "projects",
    "certificates",
    "professional",
  ],
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
