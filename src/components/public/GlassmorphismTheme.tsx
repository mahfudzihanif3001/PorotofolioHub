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
  FaCube,
} from "react-icons/fa";

type PageType =
  | "home"
  | "projects"
  | "experience"
  | "education"
  | "certificates";

export default function GlassmorphismTheme({ profile, items }: ThemeProps) {
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
          <div className="relative aspect-video rounded-2xl overflow-hidden backdrop-blur-sm bg-white/10 border border-white/20">
            <Image
              src={attachment.url}
              alt={attachment.label || "Image"}
              fill
              className="object-cover"
            />
          </div>
        );
      case "PDF":
        return (
          <a
            href={attachment.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white font-medium hover:bg-white/30 transition-all hover:scale-105"
          >
            <FaFilePdf className="text-red-400" />
            <span>{attachment.label || "View PDF"}</span>
            <FaExternalLinkAlt className="text-sm" />
          </a>
        );
      case "LINK":
        return (
          <a
            href={attachment.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white font-medium hover:bg-white/30 transition-all hover:scale-105"
          >
            <FaGlobe />
            <span>{attachment.label || "View Link"}</span>
            <FaExternalLinkAlt className="text-sm" />
          </a>
        );
      case "VIDEO":
        return (
          <a
            href={attachment.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white font-medium hover:bg-white/30 transition-all hover:scale-105"
          >
            <FaPlay />
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
        <div className="text-center py-12 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20">
          <p className="text-white/60 text-lg">No items to display yet.</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {categoryItems.map((item, index) => (
          <article
            key={item._id}
            className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6 hover:bg-white/20 hover:border-white/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(255,255,255,0.1)] animate-[fadeIn_0.6s_ease-out]"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Item Image */}
            {item.attachments.find((a) => a.fileType === "IMAGE") && (
              <div className="relative aspect-video rounded-2xl overflow-hidden mb-4 border border-white/20">
                <Image
                  src={
                    item.attachments.find((a) => a.fileType === "IMAGE")!.url
                  }
                  alt={item.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            )}

            <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>

            {/* Date */}
            {(item.startDate || item.endDate) && (
              <p className="text-sm text-white/60 mb-3">
                {item.startDate &&
                  new Date(item.startDate).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
                {item.startDate && item.endDate && " — "}
                {item.endDate
                  ? new Date(item.endDate).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })
                  : item.startDate && "Present"}
              </p>
            )}

            {/* Descriptions */}
            {item.descriptions && item.descriptions.length > 0 ? (
              <ul className="text-white/80 text-sm mb-4 space-y-2">
                {item.descriptions.map((desc, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="text-purple-400">◆</span>
                    <span>{desc}</span>
                  </li>
                ))}
              </ul>
            ) : (
              item.description && (
                <p className="text-white/80 text-sm mb-4 leading-relaxed">
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
                    className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/90 text-xs font-medium"
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
      <section className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 animate-[scaleIn_0.6s_ease-out] hover:bg-white/15 transition-all duration-500">
        <div className="flex flex-col md:flex-row items-start gap-8">
          {/* Avatar */}
          {profile.avatarUrl && (
            <div className="relative w-36 h-36 rounded-3xl overflow-hidden border-2 border-white/30 flex-shrink-0 shadow-[0_0_40px_rgba(168,85,247,0.4)] group">
              <Image
                src={profile.avatarUrl}
                alt={profile.fullName || profile.username}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-600/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          )}

          {/* Info */}
          <div className="flex-1">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
              {profile.fullName || profile.username}
            </h2>
            <p className="text-xl text-purple-300 mb-4 font-medium flex items-center gap-2">
              <FaCube
                className="animate-spin"
                style={{ animationDuration: "3s" }}
              />
              {profile.title}
            </p>
            {profile.bio && (
              <p className="text-white/80 leading-relaxed max-w-2xl mb-6">
                {profile.bio}
              </p>
            )}

            {/* Contact Info */}
            <div className="flex flex-wrap gap-4 mb-6">
              {profile.location && (
                <span className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white/90 text-sm">
                  <FaMapMarkerAlt className="text-pink-400" />
                  {profile.location}
                </span>
              )}
              {profile.phone && (
                <span className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-white/90 text-sm">
                  <FaPhone className="text-cyan-400" />
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
                  className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/30 hover:scale-110 hover:rotate-6 transition-all duration-300"
                >
                  <FaGithub className="text-xl" />
                </a>
              )}
              {profile.socialLinks?.linkedin && (
                <a
                  href={profile.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-blue-400 hover:bg-white/30 hover:scale-110 hover:rotate-6 transition-all duration-300"
                >
                  <FaLinkedin className="text-xl" />
                </a>
              )}
              {profile.socialLinks?.twitter && (
                <a
                  href={profile.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-cyan-400 hover:bg-white/30 hover:scale-110 hover:rotate-6 transition-all duration-300"
                >
                  <FaTwitter className="text-xl" />
                </a>
              )}
              {profile.socialLinks?.instagram && (
                <a
                  href={profile.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-pink-400 hover:bg-white/30 hover:scale-110 hover:rotate-6 transition-all duration-300"
                >
                  <FaInstagram className="text-xl" />
                </a>
              )}
              {profile.socialLinks?.website && (
                <a
                  href={profile.socialLinks.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-purple-400 hover:bg-white/30 hover:scale-110 hover:rotate-6 transition-all duration-300"
                >
                  <FaGlobe className="text-xl" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Skills */}
        {profile.skills && profile.skills.length > 0 && (
          <div className="mt-8 pt-8 border-t border-white/10">
            <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-3">
              {profile.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-white/20 rounded-2xl text-white font-medium text-sm hover:from-purple-500/40 hover:to-pink-500/40 transition-all hover:scale-105 cursor-default"
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
            gradient: "from-purple-500 to-pink-500",
          },
          {
            label: "Experience",
            count: experiences.length,
            page: "experience" as PageType,
            gradient: "from-cyan-500 to-blue-500",
          },
          {
            label: "Education",
            count: education.length,
            page: "education" as PageType,
            gradient: "from-green-500 to-emerald-500",
          },
          {
            label: "Certificates",
            count: certificates.length,
            page: "certificates" as PageType,
            gradient: "from-orange-500 to-yellow-500",
          },
        ].map((stat, index) => (
          <button
            key={stat.label}
            onClick={() => {
              setActivePage(stat.page);
              setSidebarOpen(false);
            }}
            className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6 text-center hover:bg-white/20 hover:border-white/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(255,255,255,0.15)] animate-[scaleIn_0.6s_ease-out]"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div
              className={`text-4xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`}
            >
              {stat.count}
            </div>
            <div className="text-sm text-white/60 font-medium">
              {stat.label}
            </div>
          </button>
        ))}
      </section>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 relative overflow-hidden">
      {/* Animated Gradient Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-r from-purple-600/40 to-pink-600/40 blur-[100px] animate-[float_10s_ease-in-out_infinite]" />
        <div
          className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-r from-cyan-600/40 to-blue-600/40 blur-[100px] animate-[float_12s_ease-in-out_infinite]"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-[40%] right-[20%] w-[300px] h-[300px] rounded-full bg-gradient-to-r from-pink-600/30 to-orange-600/30 blur-[80px] animate-[float_8s_ease-in-out_infinite]"
          style={{ animationDelay: "4s" }}
        />
      </div>

      {/* Header */}
      <header className="bg-white/10 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between py-4">
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <FaCube className="text-purple-400" />
              {profile.fullName || profile.username}
            </h1>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-white/80 hover:text-white transition-colors"
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
                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm transition-all ${
                      activePage === item.id
                        ? "bg-white/30 text-white border border-white/40"
                        : "bg-white/10 text-white/70 border border-white/10 hover:bg-white/20 hover:text-white"
                    }`}
                  >
                    <Icon />
                    <span>{item.label}</span>
                    {item.count !== undefined && item.count > 0 && (
                      <span className="ml-1 px-2 py-0.5 bg-white/20 rounded-full text-xs">
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
            <h2 className="text-4xl font-bold text-white mb-8">Projects</h2>
            {renderItems(projects)}
          </div>
        )}
        {activePage === "experience" && (
          <div>
            <h2 className="text-4xl font-bold text-white mb-8">Experience</h2>
            {renderItems(experiences)}
          </div>
        )}
        {activePage === "education" && (
          <div>
            <h2 className="text-4xl font-bold text-white mb-8">Education</h2>
            {renderItems(education)}
          </div>
        )}
        {activePage === "certificates" && (
          <div>
            <h2 className="text-4xl font-bold text-white mb-8">Certificates</h2>
            {renderItems(certificates)}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white/5 backdrop-blur-xl border-t border-white/10 py-8 mt-12 relative z-10">
        <div className="max-w-7xl mx-auto px-6 text-center text-white/60">
          <p>
            © {new Date().getFullYear()} {profile.fullName || profile.username}.
            Built with 💜
          </p>
        </div>
      </footer>
    </div>
  );
}
