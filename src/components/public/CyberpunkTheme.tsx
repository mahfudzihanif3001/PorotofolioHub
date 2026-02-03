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
  FaTerminal,
  FaUser,
  FaFolder,
  FaCertificate,
  FaGraduationCap,
  FaBriefcase,
  FaBars,
  FaTimes,
} from "react-icons/fa";

type PageType =
  | "home"
  | "projects"
  | "experience"
  | "education"
  | "certificates";

export default function CyberpunkTheme({ profile, items }: ThemeProps) {
  const [activePage, setActivePage] = useState<PageType>("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Group items by category
  const projects = items.filter((item) => item.category === "PROJECT");
  const experiences = items.filter((item) => item.category === "EXPERIENCE");
  const education = items.filter((item) => item.category === "EDUCATION");
  const certificates = items.filter((item) => item.category === "CERTIFICATE");

  const navItems = [
    { id: "home" as PageType, label: "HOME", icon: FaUser },
    {
      id: "projects" as PageType,
      label: "PROJECTS",
      icon: FaFolder,
      count: projects.length,
    },
    {
      id: "experience" as PageType,
      label: "EXPERIENCE",
      icon: FaBriefcase,
      count: experiences.length,
    },
    {
      id: "education" as PageType,
      label: "EDUCATION",
      icon: FaGraduationCap,
      count: education.length,
    },
    {
      id: "certificates" as PageType,
      label: "CERTIFICATES",
      icon: FaCertificate,
      count: certificates.length,
    },
  ];

  const renderAttachment = (attachment: PortfolioItem["attachments"][0]) => {
    switch (attachment.fileType) {
      case "IMAGE":
        return (
          <div className="relative aspect-video bg-gray-900 rounded overflow-hidden border border-green-500/30">
            <Image
              src={attachment.url}
              alt={attachment.label || "Image"}
              fill
              className="object-cover opacity-90 hover:opacity-100 transition-opacity"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
        );
      case "PDF":
        return (
          <a
            href={attachment.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-pink-400 transition-colors font-mono text-sm"
          >
            <FaFilePdf className="text-pink-500" />
            <span>[{attachment.label || "OPEN_PDF"}]</span>
            <FaExternalLinkAlt className="text-xs" />
          </a>
        );
      case "LINK":
        return (
          <a
            href={attachment.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-pink-400 transition-colors font-mono text-sm"
          >
            <FaGlobe />
            <span>[{attachment.label || "OPEN_LINK"}]</span>
            <FaExternalLinkAlt className="text-xs" />
          </a>
        );
      case "VIDEO":
        return (
          <a
            href={attachment.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-pink-400 transition-colors font-mono text-sm"
          >
            <FaPlay />
            <span>[{attachment.label || "PLAY_VIDEO"}]</span>
            <FaExternalLinkAlt className="text-xs" />
          </a>
        );
      default:
        return null;
    }
  };

  const renderItems = (categoryItems: PortfolioItem[]) => {
    if (categoryItems.length === 0) {
      return (
        <div className="text-center py-12 text-green-400/50 font-mono">
          &gt; NO_DATA_FOUND
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {categoryItems.map((item, index) => (
          <article
            key={item._id}
            className="bg-gray-900 border border-green-500/30 rounded p-6 hover:border-cyan-400/50 hover:shadow-[0_0_25px_rgba(0,255,135,0.15)] transition-all duration-300 hover:-translate-y-1 animate-[fadeIn_0.6s_ease-in-out]"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Item Image */}
            {item.attachments.find((a) => a.fileType === "IMAGE") && (
              <div className="relative aspect-video bg-gray-900 rounded overflow-hidden border border-green-500/30 mb-4">
                <Image
                  src={
                    item.attachments.find((a) => a.fileType === "IMAGE")!.url
                  }
                  alt={item.title}
                  fill
                  className="object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
            )}

            <h4 className="text-lg font-bold text-cyan-400 mb-2 font-mono uppercase">
              &gt; {item.title}
            </h4>

            {/* Date */}
            {(item.startDate || item.endDate) && (
              <p className="text-sm text-green-400/70 mb-3 font-mono">
                [
                {item.startDate &&
                  new Date(item.startDate).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
                {item.startDate && item.endDate && " - "}
                {item.endDate
                  ? new Date(item.endDate).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })
                  : item.startDate && "PRESENT"}
                ]
              </p>
            )}

            {/* Descriptions for Experience/Education */}
            {item.descriptions && item.descriptions.length > 0 ? (
              <ul className="text-green-300 text-sm mb-4 space-y-1 font-mono">
                {item.descriptions.map((desc, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="text-pink-400">▸</span>
                    <span>{desc}</span>
                  </li>
                ))}
              </ul>
            ) : (
              item.description && (
                <p className="text-green-300 text-sm mb-4 font-mono leading-relaxed">
                  {item.description}
                </p>
              )
            )}

            {/* Tech Stack */}
            {item.techStack && item.techStack.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {item.techStack.map((tech, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-green-500/10 text-green-400 border border-green-500/30 text-xs font-mono uppercase"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}

            {/* Attachments (non-image) */}
            <div className="space-y-2">
              {item.attachments
                .filter((a) => a.fileType !== "IMAGE")
                .map((attachment, index) => (
                  <div key={index}>{renderAttachment(attachment)}</div>
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
      <section className="bg-gray-900 border border-green-500/30 rounded p-8 shadow-[0_0_20px_rgba(0,255,135,0.15)] animate-[fadeIn_0.8s_ease-in-out] hover:shadow-[0_0_30px_rgba(0,255,135,0.25)] transition-shadow duration-300">
        <div className="flex flex-col md:flex-row items-start gap-8 animate-[slideUp_0.8s_ease-out]">
          {/* Avatar */}
          {profile.avatarUrl && (
            <div className="relative w-32 h-32 border-2 border-cyan-400 rounded flex-shrink-0 shadow-[0_0_15px_rgba(6,182,212,0.5)]">
              <Image
                src={profile.avatarUrl}
                alt={profile.fullName || profile.username}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Info */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <FaTerminal className="text-pink-400" />
              <h2 className="text-3xl font-bold text-cyan-400 font-mono uppercase">
                {profile.fullName || profile.username}
              </h2>
            </div>
            <p className="text-lg text-pink-400 mb-4 font-mono">
              &gt; {profile.title?.toUpperCase().replace(/ /g, "_")}
            </p>
            {profile.bio && (
              <p className="text-green-300 leading-relaxed max-w-2xl mb-6 font-mono text-sm">
                {profile.bio}
              </p>
            )}

            {/* Contact Info */}
            <div className="flex flex-wrap gap-4 text-green-400 mb-6 font-mono text-sm">
              {profile.location && (
                <span className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-cyan-400" />
                  {profile.location}
                </span>
              )}
              {profile.phone && (
                <span className="flex items-center gap-2">
                  <FaPhone className="text-cyan-400" />
                  {profile.phone}
                </span>
              )}
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {profile.socialLinks?.github && (
                <a
                  href={profile.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 hover:text-cyan-400 transition-colors"
                  title="GitHub"
                >
                  <FaGithub className="text-2xl" />
                </a>
              )}
              {profile.socialLinks?.linkedin && (
                <a
                  href={profile.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 hover:text-cyan-400 transition-colors"
                  title="LinkedIn"
                >
                  <FaLinkedin className="text-2xl" />
                </a>
              )}
              {profile.socialLinks?.twitter && (
                <a
                  href={profile.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 hover:text-cyan-400 transition-colors"
                  title="Twitter"
                >
                  <FaTwitter className="text-2xl" />
                </a>
              )}
              {profile.socialLinks?.instagram && (
                <a
                  href={profile.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 hover:text-cyan-400 transition-colors"
                  title="Instagram"
                >
                  <FaInstagram className="text-2xl" />
                </a>
              )}
              {profile.socialLinks?.website && (
                <a
                  href={profile.socialLinks.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 hover:text-cyan-400 transition-colors"
                  title="Website"
                >
                  <FaGlobe className="text-2xl" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Skills */}
        {profile.skills && profile.skills.length > 0 && (
          <div className="mt-8 pt-8 border-t border-green-500/30">
            <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-wider mb-4 font-mono">
              &gt; SKILLS_LOADED
            </h3>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-green-500/10 text-green-400 border border-green-500/30 font-mono text-sm uppercase"
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
            label: "PROJECTS",
            count: projects.length,
            page: "projects" as PageType,
          },
          {
            label: "EXPERIENCE",
            count: experiences.length,
            page: "experience" as PageType,
          },
          {
            label: "EDUCATION",
            count: education.length,
            page: "education" as PageType,
          },
          {
            label: "CERTIFICATES",
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
            className="bg-gray-900 border border-green-500/30 rounded p-6 text-center hover:border-cyan-400/50 hover:shadow-[0_0_25px_rgba(0,255,135,0.2)] transition-all duration-300 hover:-translate-y-1 animate-[fadeIn_0.6s_ease-in-out]"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="text-4xl font-bold text-cyan-400 mb-2 font-mono">
              {stat.count}
            </div>
            <div className="text-xs text-green-400 uppercase tracking-wide font-mono">
              {stat.label}
            </div>
          </button>
        ))}
      </section>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950 text-green-400 font-mono relative">
      {/* Scanline Effect */}
      <div className="fixed inset-0 pointer-events-none z-50 bg-[repeating-linear-gradient(0deg,rgba(0,255,65,0.03)_0px,rgba(0,255,65,0.03)_1px,transparent_1px,transparent_2px)]" />

      {/* Glowing orbs */}
      <div className="fixed top-20 left-20 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-[float_10s_ease-in-out_infinite]" />
      <div
        className="fixed bottom-20 right-20 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl animate-[float_8s_ease-in-out_infinite]"
        style={{ animationDelay: "3s" }}
      />

      {/* Header */}
      <header className="bg-black border-b border-green-500/30 sticky top-0 z-40 shadow-[0_0_20px_rgba(0,255,135,0.2)]">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FaTerminal className="text-green-400" />
            <h1 className="text-xl font-bold text-cyan-400 uppercase">
              {profile.username}
            </h1>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden text-green-400 hover:text-cyan-400 transition-colors"
          >
            {sidebarOpen ? (
              <FaTimes className="text-2xl" />
            ) : (
              <FaBars className="text-2xl" />
            )}
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed lg:sticky top-[73px] left-0 h-[calc(100vh-73px)] w-64 bg-black border-r border-green-500/30 z-30 transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <nav className="p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActivePage(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-all font-mono text-sm uppercase ${
                    activePage === item.id
                      ? "bg-green-500/20 text-cyan-400 border border-cyan-400/50 shadow-[0_0_10px_rgba(6,182,212,0.3)]"
                      : "text-green-400 hover:bg-green-500/10 hover:text-cyan-400 border border-transparent"
                  }`}
                >
                  <Icon className="text-lg" />
                  <span className="flex-1 text-left">&gt; {item.label}</span>
                  {item.count !== undefined && item.count > 0 && (
                    <span className="px-2 py-0.5 bg-pink-500/20 text-pink-400 border border-pink-400/30 rounded text-xs">
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-6xl mx-auto">
            {activePage === "home" && renderHomePage()}
            {activePage === "projects" && (
              <div>
                <h2 className="text-3xl font-bold text-cyan-400 mb-8 font-mono uppercase">
                  &gt; PROJECTS_LOADED
                </h2>
                {renderItems(projects)}
              </div>
            )}
            {activePage === "experience" && (
              <div>
                <h2 className="text-3xl font-bold text-cyan-400 mb-8 font-mono uppercase">
                  &gt; EXPERIENCE_LOADED
                </h2>
                {renderItems(experiences)}
              </div>
            )}
            {activePage === "education" && (
              <div>
                <h2 className="text-3xl font-bold text-cyan-400 mb-8 font-mono uppercase">
                  &gt; EDUCATION_LOADED
                </h2>
                {renderItems(education)}
              </div>
            )}
            {activePage === "certificates" && (
              <div>
                <h2 className="text-3xl font-bold text-cyan-400 mb-8 font-mono uppercase">
                  &gt; CERTIFICATES_LOADED
                </h2>
                {renderItems(certificates)}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-green-500/30 bg-black py-6 mt-12">
        <div className="max-w-7xl mx-auto px-6 text-center text-green-400/70 font-mono text-sm">
          <p>
            © {new Date().getFullYear()} {profile.fullName || profile.username}{" "}
            | ALL_RIGHTS_RESERVED
          </p>
        </div>
      </footer>
    </div>
  );
}
