"use client";

import { ThemeProps, PortfolioItem } from "./types";
import Image from "next/image";
import { useState } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
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
  FaGem,
} from "react-icons/fa";

type PageType =
  | "home"
  | "projects"
  | "experience"
  | "education"
  | "certificates";

export default function LuxuryTheme({ profile, items }: ThemeProps) {
  const [activePage, setActivePage] = useState<PageType>("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Group items by category
  const projects = items.filter((item) => item.category === "PROJECT");
  const experiences = items.filter((item) => item.category === "EXPERIENCE");
  const education = items.filter((item) => item.category === "EDUCATION");
  const certificates = items.filter((item) => item.category === "CERTIFICATE");

  const navItems = [
    { id: "home" as PageType, label: "Accueil", icon: FaUser },
    {
      id: "projects" as PageType,
      label: "Projets",
      icon: FaFolder,
      count: projects.length,
    },
    {
      id: "experience" as PageType,
      label: "Expérience",
      icon: FaBriefcase,
      count: experiences.length,
    },
    {
      id: "education" as PageType,
      label: "Éducation",
      icon: FaGraduationCap,
      count: education.length,
    },
    {
      id: "certificates" as PageType,
      label: "Certificats",
      icon: FaCertificate,
      count: certificates.length,
    },
  ];

  const renderAttachment = (attachment: PortfolioItem["attachments"][0]) => {
    switch (attachment.fileType) {
      case "IMAGE":
        return (
          <div className="relative aspect-video bg-neutral-100 overflow-hidden">
            <Image
              src={attachment.url}
              alt={attachment.label || "Image"}
              fill
              className="object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-700"
            />
          </div>
        );
      case "PDF":
        return (
          <a
            href={attachment.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-neutral-600 hover:text-amber-700 transition-colors font-light tracking-wide group"
          >
            <FaFilePdf className="text-amber-700" />
            <span className="border-b border-transparent group-hover:border-amber-700 transition-all">
              {attachment.label || "View Document"}
            </span>
            <FaExternalLinkAlt className="text-xs opacity-50" />
          </a>
        );
      case "LINK":
        return (
          <a
            href={attachment.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-neutral-600 hover:text-amber-700 transition-colors font-light tracking-wide group"
          >
            <FaGlobe className="text-amber-700" />
            <span className="border-b border-transparent group-hover:border-amber-700 transition-all">
              {attachment.label || "Visit Link"}
            </span>
            <FaExternalLinkAlt className="text-xs opacity-50" />
          </a>
        );
      case "VIDEO":
        return (
          <a
            href={attachment.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-neutral-600 hover:text-amber-700 transition-colors font-light tracking-wide group"
          >
            <FaPlay className="text-amber-700" />
            <span className="border-b border-transparent group-hover:border-amber-700 transition-all">
              {attachment.label || "Watch Video"}
            </span>
            <FaExternalLinkAlt className="text-xs opacity-50" />
          </a>
        );
      default:
        return null;
    }
  };

  const renderItems = (categoryItems: PortfolioItem[]) => {
    if (categoryItems.length === 0) {
      return (
        <div className="text-center py-16 text-neutral-400 italic font-light tracking-wider">
          Aucun élément à afficher.
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {categoryItems.map((item, index) => (
          <article
            key={item._id}
            className="group animate-[fadeIn_0.8s_ease-out]"
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            {/* Item Image */}
            {item.attachments.find((a) => a.fileType === "IMAGE") && (
              <div className="relative aspect-[4/3] mb-8 overflow-hidden">
                <Image
                  src={
                    item.attachments.find((a) => a.fileType === "IMAGE")!.url
                  }
                  alt={item.title}
                  fill
                  className="object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 border border-amber-600/20" />
              </div>
            )}

            <h4 className="text-2xl font-serif font-light text-neutral-800 mb-3 tracking-wide">
              {item.title}
            </h4>

            {/* Date */}
            {(item.startDate || item.endDate) && (
              <p className="text-sm text-amber-700 mb-4 tracking-widest uppercase font-light">
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
              <ul className="text-neutral-600 text-sm mb-6 space-y-3 font-light leading-relaxed">
                {item.descriptions.map((desc, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="text-amber-600">◇</span>
                    <span>{desc}</span>
                  </li>
                ))}
              </ul>
            ) : (
              item.description && (
                <p className="text-neutral-600 text-sm mb-6 font-light leading-relaxed">
                  {item.description}
                </p>
              )
            )}

            {/* Tech Stack */}
            {item.techStack && item.techStack.length > 0 && (
              <div className="flex flex-wrap gap-3 mb-6">
                {item.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 border border-neutral-300 text-neutral-600 text-xs uppercase tracking-widest font-light hover:border-amber-600 hover:text-amber-700 transition-colors cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}

            {/* Attachments */}
            <div className="flex flex-wrap gap-4 pt-4 border-t border-neutral-200">
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
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="animate-[fadeIn_1s_ease-out]">
        <div className="flex flex-col lg:flex-row items-start gap-16">
          {/* Avatar */}
          {profile.avatarUrl && (
            <div className="relative w-64 h-80 flex-shrink-0 overflow-hidden group">
              <Image
                src={profile.avatarUrl}
                alt={profile.fullName || profile.username}
                fill
                className="object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 border border-amber-600/30" />
              <div className="absolute top-4 left-4 right-4 bottom-4 border border-amber-600/20" />
            </div>
          )}

          {/* Info */}
          <div className="flex-1 pt-8">
            <p className="text-amber-700 text-sm uppercase tracking-[0.3em] mb-4 font-light">
              Portfolio
            </p>
            <h2 className="text-5xl lg:text-6xl font-serif font-light text-neutral-800 mb-6 tracking-wide leading-tight">
              {profile.fullName || profile.username}
            </h2>
            <div className="w-24 h-px bg-amber-600 mb-8" />
            <p className="text-lg text-neutral-500 mb-6 font-light tracking-wide flex items-center gap-3">
              <FaGem className="text-amber-600" />
              {profile.title}
            </p>
            {profile.bio && (
              <p className="text-neutral-600 leading-relaxed max-w-2xl mb-10 font-light text-lg italic">
                &ldquo;{profile.bio}&rdquo;
              </p>
            )}

            {/* Contact Info */}
            <div className="flex flex-wrap gap-8 mb-10 text-sm text-neutral-500 font-light tracking-wide">
              {profile.location && (
                <span className="flex items-center gap-3">
                  <FaMapMarkerAlt className="text-amber-600" />
                  {profile.location}
                </span>
              )}
              {profile.phone && (
                <span className="flex items-center gap-3">
                  <FaPhone className="text-amber-600" />
                  {profile.phone}
                </span>
              )}
            </div>

            {/* Social Links */}
            <div className="flex gap-6">
              {profile.socialLinks?.github && (
                <a
                  href={profile.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-amber-700 transition-colors duration-300"
                >
                  <FaGithub className="text-2xl" />
                </a>
              )}
              {profile.socialLinks?.linkedin && (
                <a
                  href={profile.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-amber-700 transition-colors duration-300"
                >
                  <FaLinkedin className="text-2xl" />
                </a>
              )}
              {profile.socialLinks?.twitter && (
                <a
                  href={profile.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-amber-700 transition-colors duration-300"
                >
                  <FaTwitter className="text-2xl" />
                </a>
              )}
              {profile.socialLinks?.instagram && (
                <a
                  href={profile.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-amber-700 transition-colors duration-300"
                >
                  <FaInstagram className="text-2xl" />
                </a>
              )}
              {profile.socialLinks?.website && (
                <a
                  href={profile.socialLinks.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-amber-700 transition-colors duration-300"
                >
                  <FaGlobe className="text-2xl" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Skills */}
        {profile.skills && profile.skills.length > 0 && (
          <div className="mt-20 pt-16 border-t border-neutral-200">
            <h3 className="text-sm uppercase tracking-[0.3em] text-amber-700 mb-8 font-light">
              Expertise
            </h3>
            <div className="flex flex-wrap gap-4">
              {profile.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-6 py-3 border border-neutral-300 text-neutral-600 text-sm uppercase tracking-widest font-light hover:border-amber-600 hover:text-amber-700 transition-all duration-300 cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Statistics */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-200">
        {[
          {
            label: "Projects",
            count: projects.length,
            page: "projects" as PageType,
          },
          {
            label: "Experience",
            count: experiences.length,
            page: "experience" as PageType,
          },
          {
            label: "Education",
            count: education.length,
            page: "education" as PageType,
          },
          {
            label: "Certificates",
            count: certificates.length,
            page: "certificates" as PageType,
          },
        ].map((stat, index) => (
          <button
            key={stat.label}
            onClick={() => {
              setActivePage(stat.page);
              setSidebarOpen(false);
            }}
            className="bg-white p-12 text-center hover:bg-neutral-50 transition-all duration-500 group animate-[fadeIn_0.8s_ease-out]"
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            <div className="text-5xl font-serif font-light text-neutral-800 mb-3 group-hover:text-amber-700 transition-colors duration-300">
              {stat.count}
            </div>
            <div className="text-xs text-neutral-500 uppercase tracking-[0.2em] font-light">
              {stat.label}
            </div>
          </button>
        ))}
      </section>
    </div>
  );

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <div className="flex items-center justify-between py-6">
            <h1 className="text-xl font-serif font-light text-neutral-800 tracking-wider flex items-center gap-3">
              <FaGem className="text-amber-600 text-sm" />
              {profile.fullName || profile.username}
            </h1>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-neutral-600 hover:text-amber-700 transition-colors"
            >
              {sidebarOpen ? "✕" : "☰"}
            </button>
          </div>

          {/* Navigation */}
          <nav className={`pb-6 ${sidebarOpen ? "block" : "hidden lg:block"}`}>
            <div className="flex flex-wrap gap-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActivePage(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`text-sm uppercase tracking-[0.15em] font-light transition-all duration-300 pb-1 ${
                    activePage === item.id
                      ? "text-amber-700 border-b border-amber-600"
                      : "text-neutral-500 hover:text-neutral-800 border-b border-transparent hover:border-neutral-300"
                  }`}
                >
                  {item.label}
                  {item.count !== undefined && item.count > 0 && (
                    <span className="ml-2 text-xs text-neutral-400">
                      ({item.count})
                    </span>
                  )}
                </button>
              ))}
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 lg:px-16 py-16 lg:py-24">
        {activePage === "home" && renderHomePage()}
        {activePage === "projects" && (
          <div>
            <div className="mb-16">
              <p className="text-amber-700 text-sm uppercase tracking-[0.3em] mb-4 font-light">
                Collection
              </p>
              <h2 className="text-4xl font-serif font-light text-neutral-800 tracking-wide">
                Projets
              </h2>
              <div className="w-16 h-px bg-amber-600 mt-6" />
            </div>
            {renderItems(projects)}
          </div>
        )}
        {activePage === "experience" && (
          <div>
            <div className="mb-16">
              <p className="text-amber-700 text-sm uppercase tracking-[0.3em] mb-4 font-light">
                Parcours
              </p>
              <h2 className="text-4xl font-serif font-light text-neutral-800 tracking-wide">
                Expérience
              </h2>
              <div className="w-16 h-px bg-amber-600 mt-6" />
            </div>
            {renderItems(experiences)}
          </div>
        )}
        {activePage === "education" && (
          <div>
            <div className="mb-16">
              <p className="text-amber-700 text-sm uppercase tracking-[0.3em] mb-4 font-light">
                Formation
              </p>
              <h2 className="text-4xl font-serif font-light text-neutral-800 tracking-wide">
                Éducation
              </h2>
              <div className="w-16 h-px bg-amber-600 mt-6" />
            </div>
            {renderItems(education)}
          </div>
        )}
        {activePage === "certificates" && (
          <div>
            <div className="mb-16">
              <p className="text-amber-700 text-sm uppercase tracking-[0.3em] mb-4 font-light">
                Distinctions
              </p>
              <h2 className="text-4xl font-serif font-light text-neutral-800 tracking-wide">
                Certificats
              </h2>
              <div className="w-16 h-px bg-amber-600 mt-6" />
            </div>
            {renderItems(certificates)}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-neutral-900 text-neutral-400 py-16 mt-24">
        <div className="max-w-7xl mx-auto px-8 lg:px-16 text-center">
          <FaGem className="text-amber-600 text-2xl mx-auto mb-6" />
          <p className="text-sm font-light tracking-[0.2em] uppercase">
            © {new Date().getFullYear()} {profile.fullName || profile.username}
          </p>
          <p className="text-xs text-neutral-600 mt-4 tracking-wider">
            Crafted with elegance
          </p>
        </div>
      </footer>
    </div>
  );
}
