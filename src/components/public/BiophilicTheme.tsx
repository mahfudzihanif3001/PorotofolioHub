"use client";

import { ThemeProps, PortfolioItem } from "./types";
import Image from "next/image";
import { useState } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaInstagram,
  FaGlobe,
  FaMapMarkerAlt,
  FaPhone,
  FaExternalLinkAlt,
  FaFilePdf,
  FaPlay,
  FaUser,
  FaBriefcase,
  FaCertificate,
  FaGraduationCap,
  FaFolder,
  FaLeaf,
} from "react-icons/fa";

type PageType =
  | "home"
  | "projects"
  | "experience"
  | "education"
  | "certificates";

export default function BiophilicTheme({ profile, items }: ThemeProps) {
  const [activePage, setActivePage] = useState<PageType>("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Group items by category
  const projects = items.filter((item) => item.category === "PROJECT");
  const experiences = items.filter((item) => item.category === "EXPERIENCE");
  const education = items.filter((item) => item.category === "EDUCATION");
  const certificates = items.filter((item) => item.category === "CERTIFICATE");

  const navItems = [
    { id: "home" as PageType, label: "Home", icon: FaUser },
    {
      id: "projects" as PageType,
      label: "Projects",
      icon: FaFolder,
      count: projects.length,
    },
    {
      id: "experience" as PageType,
      label: "Experience",
      icon: FaBriefcase,
      count: experiences.length,
    },
    {
      id: "education" as PageType,
      label: "Education",
      icon: FaGraduationCap,
      count: education.length,
    },
    {
      id: "certificates" as PageType,
      label: "Certificates",
      icon: FaCertificate,
      count: certificates.length,
    },
  ];

  const renderAttachment = (attachment: PortfolioItem["attachments"][0]) => {
    switch (attachment.fileType) {
      case "IMAGE":
        return (
          <div className="relative aspect-video rounded-lg overflow-hidden border-2 border-stone-300 shadow-md">
            <Image
              src={attachment.url}
              alt={attachment.label || "Image"}
              fill
              className="object-cover sepia-[.15] hover:sepia-0 transition-all duration-500"
            />
          </div>
        );
      case "PDF":
        return (
          <a
            href={attachment.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 border-2 border-stone-400 rounded-lg text-stone-700 font-medium hover:bg-amber-200 transition-colors"
          >
            <FaFilePdf className="text-red-700" />
            <span>{attachment.label || "View Document"}</span>
            <FaExternalLinkAlt className="text-sm" />
          </a>
        );
      case "LINK":
        return (
          <a
            href={attachment.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 border-2 border-stone-400 rounded-lg text-stone-700 font-medium hover:bg-green-200 transition-colors"
          >
            <FaGlobe className="text-green-700" />
            <span>{attachment.label || "Visit Link"}</span>
            <FaExternalLinkAlt className="text-sm" />
          </a>
        );
      case "VIDEO":
        return (
          <a
            href={attachment.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-stone-100 border-2 border-stone-400 rounded-lg text-stone-700 font-medium hover:bg-stone-200 transition-colors"
          >
            <FaPlay className="text-stone-600" />
            <span>{attachment.label || "Watch Video"}</span>
            <FaExternalLinkAlt className="text-sm" />
          </a>
        );
      default:
        return null;
    }
  };

  const renderItems = (categoryItems: PortfolioItem[]) => {
    if (categoryItems.length === 0) {
      return (
        <div className="text-center py-12 bg-amber-50 border-2 border-stone-300 rounded-lg italic text-stone-600">
          No items in this collection yet.
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {categoryItems.map((item, index) => (
          <article
            key={item._id}
            className="bg-amber-50/80 backdrop-blur-sm border-2 border-stone-300 rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1 animate-[fadeIn_0.6s_ease-out]"
            style={{
              animationDelay: `${index * 0.1}s`,
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23a8a29e' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
            }}
          >
            {/* Item Image */}
            {item.attachments.find((a) => a.fileType === "IMAGE") && (
              <div className="relative aspect-video rounded-lg overflow-hidden mb-4 border-2 border-stone-300">
                <Image
                  src={
                    item.attachments.find((a) => a.fileType === "IMAGE")!.url
                  }
                  alt={item.title}
                  fill
                  className="object-cover sepia-[.15] hover:sepia-0 transition-all duration-500"
                />
              </div>
            )}

            <h4 className="text-xl font-serif font-bold text-stone-800 mb-2">
              {item.title}
            </h4>

            {/* Date */}
            {(item.startDate || item.endDate) && (
              <p className="text-sm text-stone-500 mb-3 italic">
                {item.startDate &&
                  new Date(item.startDate).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                {item.startDate && item.endDate && " — "}
                {item.endDate
                  ? new Date(item.endDate).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })
                  : item.startDate && "Present"}
              </p>
            )}

            {/* Descriptions */}
            {item.descriptions && item.descriptions.length > 0 ? (
              <ul className="text-stone-600 text-sm mb-4 space-y-2">
                {item.descriptions.map((desc, idx) => (
                  <li key={idx} className="flex gap-2">
                    <FaLeaf className="text-green-600 mt-1 flex-shrink-0" />
                    <span>{desc}</span>
                  </li>
                ))}
              </ul>
            ) : (
              item.description && (
                <p className="text-stone-600 text-sm mb-4 leading-relaxed">
                  {item.description}
                </p>
              )
            )}

            {/* Tech Stack */}
            {item.techStack && item.techStack.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {item.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-green-100 border border-green-300 rounded-full text-green-800 text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}

            {/* Attachments */}
            <div className="flex flex-wrap gap-2">
              {item.attachments
                .filter((a) => a.fileType !== "IMAGE")
                .map((attachment, idx) => (
                  <div key={idx}>{renderAttachment(attachment)}</div>
                ))}
            </div>
          </article>
        ))}
      </div>
    );
  };

  const renderHomePage = () => (
    <div className="space-y-8">
      {/* Hero Section */}
      <section
        className="bg-amber-50/90 backdrop-blur-sm border-2 border-stone-300 rounded-lg p-8 shadow-lg animate-[fadeIn_0.8s_ease-out]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23a8a29e' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      >
        <div className="flex flex-col md:flex-row items-start gap-8">
          {/* Avatar */}
          {profile.avatarUrl && (
            <div className="relative w-40 h-40 rounded-lg overflow-hidden border-4 border-stone-400 flex-shrink-0 shadow-lg group">
              <Image
                src={profile.avatarUrl}
                alt={profile.fullName || profile.username}
                fill
                className="object-cover sepia-[.2] group-hover:sepia-0 transition-all duration-500"
              />
            </div>
          )}

          {/* Info */}
          <div className="flex-1">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-800 mb-3">
              {profile.fullName || profile.username}
            </h2>
            <p className="text-xl text-green-700 mb-4 font-medium flex items-center gap-2">
              <FaLeaf />
              {profile.title}
            </p>
            {profile.bio && (
              <p className="text-stone-600 leading-relaxed max-w-2xl mb-6 font-serif italic">
                &ldquo;{profile.bio}&rdquo;
              </p>
            )}

            {/* Contact Info */}
            <div className="flex flex-wrap gap-4 mb-6">
              {profile.location && (
                <span className="flex items-center gap-2 text-stone-600 text-sm">
                  <FaMapMarkerAlt className="text-green-600" />
                  {profile.location}
                </span>
              )}
              {profile.phone && (
                <span className="flex items-center gap-2 text-stone-600 text-sm">
                  <FaPhone className="text-green-600" />
                  {profile.phone}
                </span>
              )}
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {profile.socialLinks?.github && (
                <a
                  href={profile.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-lg bg-stone-100 border-2 border-stone-300 flex items-center justify-center text-stone-600 hover:bg-stone-200 hover:text-stone-800 hover:border-stone-400 transition-all duration-300"
                >
                  <FaGithub className="text-xl" />
                </a>
              )}
              {profile.socialLinks?.linkedin && (
                <a
                  href={profile.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-lg bg-stone-100 border-2 border-stone-300 flex items-center justify-center text-blue-600 hover:bg-stone-200 hover:border-stone-400 transition-all duration-300"
                >
                  <FaLinkedin className="text-xl" />
                </a>
              )}
              {profile.socialLinks?.email && (
                <a
                  href={`mailto:${profile.socialLinks.email}`}
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-lg bg-stone-100 border-2 border-stone-300 flex items-center justify-center text-red-500 hover:bg-stone-200 hover:border-stone-400 transition-all duration-300"
                >
                  <FaEnvelope className="text-xl" />
                </a>
              )}
              {profile.socialLinks?.instagram && (
                <a
                  href={profile.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-lg bg-stone-100 border-2 border-stone-300 flex items-center justify-center text-pink-600 hover:bg-stone-200 hover:border-stone-400 transition-all duration-300"
                >
                  <FaInstagram className="text-xl" />
                </a>
              )}
              {profile.socialLinks?.website && (
                <a
                  href={profile.socialLinks.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-lg bg-stone-100 border-2 border-stone-300 flex items-center justify-center text-green-600 hover:bg-stone-200 hover:border-stone-400 transition-all duration-300"
                >
                  <FaGlobe className="text-xl" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Skills */}
        {profile.skills && profile.skills.length > 0 && (
          <div className="mt-8 pt-8 border-t-2 border-stone-300">
            <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-wider mb-4 flex items-center gap-2">
              <FaLeaf className="text-green-600" />
              Expertise
            </h3>
            <div className="flex flex-wrap gap-3">
              {profile.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-green-50 border-2 border-green-200 rounded-lg text-green-800 font-medium text-sm hover:bg-green-100 transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Statistics */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Projects",
            count: projects.length,
            page: "projects" as PageType,
            color: "bg-amber-100",
          },
          {
            label: "Experience",
            count: experiences.length,
            page: "experience" as PageType,
            color: "bg-green-100",
          },
          {
            label: "Education",
            count: education.length,
            page: "education" as PageType,
            color: "bg-stone-100",
          },
          {
            label: "Certificates",
            count: certificates.length,
            page: "certificates" as PageType,
            color: "bg-orange-100",
          },
        ].map((stat, index) => (
          <button
            key={stat.label}
            onClick={() => {
              setActivePage(stat.page);
              setSidebarOpen(false);
            }}
            className={`${stat.color} border-2 border-stone-300 rounded-lg p-6 text-center hover:shadow-lg hover:border-stone-400 transition-all duration-300 hover:-translate-y-1 animate-[scaleIn_0.6s_ease-out]`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="text-4xl font-serif font-bold text-stone-800 mb-2">
              {stat.count}
            </div>
            <div className="text-sm text-stone-600 font-medium">
              {stat.label}
            </div>
          </button>
        ))}
      </section>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-100 via-stone-100 to-green-100 relative">
      {/* Paper Texture Overlay */}
      <div
        className="fixed inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Decorative Leaves */}
      <div className="fixed top-10 left-10 text-green-300 opacity-20 text-9xl pointer-events-none animate-[float_10s_ease-in-out_infinite]">
        🌿
      </div>
      <div
        className="fixed bottom-10 right-10 text-green-300 opacity-20 text-9xl pointer-events-none animate-[float_8s_ease-in-out_infinite]"
        style={{ animationDelay: "3s" }}
      >
        🍃
      </div>

      {/* Header */}
      <header className="bg-amber-50/90 backdrop-blur-sm border-b-2 border-stone-300 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between py-4">
            <h1 className="text-xl font-serif font-bold text-stone-800 flex items-center gap-2">
              <FaLeaf className="text-green-600" />
              {profile.fullName || profile.username}
            </h1>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-stone-600 hover:text-stone-800 transition-colors"
            >
              {sidebarOpen ? "✕" : "☰"}
            </button>
          </div>

          {/* Navigation */}
          <nav className={`pb-4 ${sidebarOpen ? "block" : "hidden lg:block"}`}>
            <div className="flex flex-wrap gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActivePage(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                      activePage === item.id
                        ? "bg-green-200 text-green-800 border-2 border-green-400"
                        : "bg-stone-100 text-stone-600 border-2 border-stone-300 hover:bg-stone-200 hover:text-stone-800"
                    }`}
                  >
                    <Icon />
                    <span>{item.label}</span>
                    {item.count !== undefined && item.count > 0 && (
                      <span className="ml-1 px-2 py-0.5 bg-white/50 rounded-full text-xs">
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        {activePage === "home" && renderHomePage()}
        {activePage === "projects" && (
          <div>
            <h2 className="text-4xl font-serif font-bold text-stone-800 mb-8 flex items-center gap-3">
              <FaLeaf className="text-green-600" />
              Projects
            </h2>
            {renderItems(projects)}
          </div>
        )}
        {activePage === "experience" && (
          <div>
            <h2 className="text-4xl font-serif font-bold text-stone-800 mb-8 flex items-center gap-3">
              <FaLeaf className="text-green-600" />
              Experience
            </h2>
            {renderItems(experiences)}
          </div>
        )}
        {activePage === "education" && (
          <div>
            <h2 className="text-4xl font-serif font-bold text-stone-800 mb-8 flex items-center gap-3">
              <FaLeaf className="text-green-600" />
              Education
            </h2>
            {renderItems(education)}
          </div>
        )}
        {activePage === "certificates" && (
          <div>
            <h2 className="text-4xl font-serif font-bold text-stone-800 mb-8 flex items-center gap-3">
              <FaLeaf className="text-green-600" />
              Certificates
            </h2>
            {renderItems(certificates)}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-stone-200/80 backdrop-blur-sm border-t-2 border-stone-300 py-8 mt-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6 text-center text-stone-600 font-serif">
          <p className="flex items-center justify-center gap-2">
            © {new Date().getFullYear()} {profile.fullName || profile.username}
            <FaLeaf className="text-green-600" />
            Crafted with nature in mind
          </p>
        </div>
      </footer>
    </div>
  );
}
