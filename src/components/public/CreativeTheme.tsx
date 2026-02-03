"use client";

import { ThemeProps, PortfolioItem } from "./types";
import { ResponsiveNavigation } from "./ResponsiveNavigation";
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
  FaPalette,
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

export default function CreativeTheme({ profile, items }: ThemeProps) {
  const [activePage, setActivePage] = useState<PageType>("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Group items by category
  const projects = items.filter((item) => item.category === "PROJECT");
  const experiences = items.filter((item) => item.category === "EXPERIENCE");
  const education = items.filter((item) => item.category === "EDUCATION");
  const certificates = items.filter((item) => item.category === "CERTIFICATE");

  const navItems = [
    { id: "home" as PageType, label: "Home", icon: FaUser, color: "purple" },
    {
      id: "projects" as PageType,
      label: "Projects",
      icon: FaFolder,
      count: projects.length,
      color: "blue",
    },
    {
      id: "experience" as PageType,
      label: "Experience",
      icon: FaBriefcase,
      count: experiences.length,
      color: "green",
    },
    {
      id: "education" as PageType,
      label: "Education",
      icon: FaGraduationCap,
      count: education.length,
      color: "yellow",
    },
    {
      id: "certificates" as PageType,
      label: "Certificates",
      icon: FaCertificate,
      count: certificates.length,
      color: "pink",
    },
  ];

  const getColorClasses = (color: string, active: boolean) => {
    const colors = {
      purple: active
        ? "bg-purple-100 text-purple-700 border-purple-500"
        : "hover:bg-purple-50 hover:text-purple-600",
      blue: active
        ? "bg-blue-100 text-blue-700 border-blue-500"
        : "hover:bg-blue-50 hover:text-blue-600",
      green: active
        ? "bg-green-100 text-green-700 border-green-500"
        : "hover:bg-green-50 hover:text-green-600",
      yellow: active
        ? "bg-yellow-100 text-yellow-700 border-yellow-500"
        : "hover:bg-yellow-50 hover:text-yellow-600",
      pink: active
        ? "bg-pink-100 text-pink-700 border-pink-500"
        : "hover:bg-pink-50 hover:text-pink-600",
    };
    return colors[color as keyof typeof colors] || colors.purple;
  };

  const renderAttachment = (attachment: PortfolioItem["attachments"][0]) => {
    switch (attachment.fileType) {
      case "IMAGE":
        return (
          <div className="relative aspect-video bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl overflow-hidden">
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
            className="inline-flex items-center gap-2 text-purple-600 hover:text-pink-600 transition-colors font-medium"
          >
            <FaFilePdf className="text-red-500" />
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
            className="inline-flex items-center gap-2 text-purple-600 hover:text-pink-600 transition-colors font-medium"
          >
            <FaGlobe />
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
            className="inline-flex items-center gap-2 text-purple-600 hover:text-pink-600 transition-colors font-medium"
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
        <div className="text-center py-12 text-gray-400">
          <p className="text-lg">No items to display yet.</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {categoryItems.map((item, index) => {
          const gradients = [
            "from-purple-400 via-pink-400 to-red-400",
            "from-blue-400 via-cyan-400 to-teal-400",
            "from-green-400 via-emerald-400 to-cyan-400",
            "from-yellow-400 via-orange-400 to-red-400",
            "from-pink-400 via-purple-400 to-indigo-400",
          ];
          const gradient = gradients[index % gradients.length];

          return (
            <article
              key={item._id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 overflow-hidden animate-[fadeIn_0.6s_ease-in-out]"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Color Accent */}
              <div className={`h-2 bg-gradient-to-r ${gradient}`} />

              <div className="p-6">
                {/* Item Image */}
                {item.attachments.find((a) => a.fileType === "IMAGE") && (
                  <div className="relative aspect-video bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl overflow-hidden mb-4">
                    <Image
                      src={
                        item.attachments.find((a) => a.fileType === "IMAGE")!
                          .url
                      }
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  {item.title}
                </h4>

                {/* Date */}
                {(item.startDate || item.endDate) && (
                  <p className="text-sm text-gray-500 mb-3">
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
                      : item.startDate && "Present"}
                  </p>
                )}

                {/* Descriptions for Experience/Education */}
                {item.descriptions && item.descriptions.length > 0 ? (
                  <ul className="text-gray-600 text-sm mb-4 space-y-2">
                    {item.descriptions.map((desc, idx) => (
                      <li key={idx} className="flex gap-2">
                        <span
                          className={`text-lg bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}
                        >
                          ●
                        </span>
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  item.description && (
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {item.description}
                    </p>
                  )
                )}

                {/* Tech Stack */}
                {item.techStack && item.techStack.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.techStack.map((tech, techIndex) => {
                      const techGradient =
                        gradients[techIndex % gradients.length];
                      return (
                        <span
                          key={techIndex}
                          className={`px-3 py-1 bg-gradient-to-r ${techGradient} text-white rounded-full text-xs font-semibold shadow-sm`}
                        >
                          {tech}
                        </span>
                      );
                    })}
                  </div>
                )}

                {/* Attachments (non-image) */}
                <div className="space-y-2">
                  {item.attachments
                    .filter((a) => a.fileType !== "IMAGE")
                    .map((attachment, attIndex) => (
                      <div key={attIndex}>{renderAttachment(attachment)}</div>
                    ))}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    );
  };

  const renderHomePage = () => (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="bg-white rounded-2xl shadow-xl p-8 overflow-hidden relative animate-[scaleIn_0.8s_ease-in-out]">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-300 via-pink-300 to-red-300 rounded-full blur-3xl opacity-20 -mr-32 -mt-32 animate-[float_6s_ease-in-out_infinite]" />
        <div
          className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-300 via-cyan-300 to-teal-300 rounded-full blur-3xl opacity-20 -ml-32 -mb-32 animate-[float_8s_ease-in-out_infinite]"
          style={{ animationDelay: "2s" }}
        />

        <div className="relative flex flex-col md:flex-row items-start gap-8">
          {/* Avatar */}
          {profile.avatarUrl && (
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-gradient-to-r from-purple-400 to-pink-400 flex-shrink-0 shadow-xl group">
              <Image
                src={profile.avatarUrl}
                alt={profile.fullName || profile.username}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-125 group-hover:rotate-6"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          )}

          {/* Info */}
          <div className="flex-1">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent mb-2">
              {profile.fullName || profile.username}
            </h2>
            <p className="text-lg text-gray-600 mb-4 font-medium">
              {profile.title}
            </p>
            {profile.bio && (
              <p className="text-gray-700 leading-relaxed max-w-2xl mb-6">
                {profile.bio}
              </p>
            )}

            {/* Contact Info */}
            <div className="flex flex-wrap gap-4 text-gray-600 mb-6">
              {profile.location && (
                <span className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-purple-500" />
                  {profile.location}
                </span>
              )}
              {profile.phone && (
                <span className="flex items-center gap-2">
                  <FaPhone className="text-pink-500" />
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
                  className="text-gray-600 hover:text-purple-600 transition-colors"
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
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                  title="LinkedIn"
                >
                  <FaLinkedin className="text-2xl" />
                </a>
              )}
              {profile.socialLinks?.email && (
                <a
                  href={`mailto:${profile.socialLinks.email}`}
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-cyan-600 transition-colors"
                  title="Email"
                >
                  <FaEnvelope className="text-2xl" />
                </a>
              )}
              {profile.socialLinks?.instagram && (
                <a
                  href={profile.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-pink-600 transition-colors"
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
                  className="text-gray-600 hover:text-purple-600 transition-colors"
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
          <div className="mt-8 pt-8 border-t border-gray-200 relative">
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider mb-4">
              Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill, index) => {
                const gradients = [
                  "from-purple-400 to-pink-400",
                  "from-blue-400 to-cyan-400",
                  "from-green-400 to-emerald-400",
                  "from-yellow-400 to-orange-400",
                  "from-pink-400 to-red-400",
                ];
                const gradient = gradients[index % gradients.length];
                return (
                  <span
                    key={index}
                    className={`px-4 py-2 bg-gradient-to-r ${gradient} text-white rounded-full text-sm font-semibold shadow-md`}
                  >
                    {skill}
                  </span>
                );
              })}
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
            gradient: "from-purple-400 to-pink-400",
          },
          {
            label: "Experience",
            count: experiences.length,
            page: "experience" as PageType,
            gradient: "from-blue-400 to-cyan-400",
          },
          {
            label: "Education",
            count: education.length,
            page: "education" as PageType,
            gradient: "from-green-400 to-emerald-400",
          },
          {
            label: "Certificates",
            count: certificates.length,
            page: "certificates" as PageType,
            gradient: "from-yellow-400 to-orange-400",
          },
        ].map((stat, index) => (
          <button
            key={stat.label}
            onClick={() => {
              setActivePage(stat.page);
              setSidebarOpen(false);
            }}
            className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-2xl transition-all transform hover:-translate-y-2 animate-[scaleIn_0.6s_ease-in-out]"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div
              className={`text-4xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`}
            >
              {stat.count}
            </div>
            <div className="text-sm text-gray-600 font-medium">
              {stat.label}
            </div>
          </button>
        ))}
      </section>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FaPalette className="text-purple-600 text-xl" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {profile.fullName || profile.username}
            </h1>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden text-purple-600 hover:text-pink-600 transition-colors"
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
          className={`fixed lg:sticky top-[73px] left-0 h-[calc(100vh-73px)] w-64 bg-white/80 backdrop-blur-md border-r border-gray-200 z-30 transition-transform duration-300 shadow-lg ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <nav className="p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActivePage(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium border-2 ${
                    isActive
                      ? getColorClasses(item.color, true)
                      : `text-gray-600 border-transparent ${getColorClasses(item.color, false)}`
                  }`}
                >
                  <Icon className="text-lg" />
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.count !== undefined && item.count > 0 && (
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs font-bold">
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
            className="fixed inset-0 bg-black/30 z-20 lg:hidden backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-6xl mx-auto">
            {activePage === "home" && renderHomePage()}
            {activePage === "projects" && (
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-8">
                  Projects
                </h2>
                {renderItems(projects)}
              </div>
            )}
            {activePage === "experience" && (
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-8">
                  Professional Experience
                </h2>
                {renderItems(experiences)}
              </div>
            )}
            {activePage === "education" && (
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-8">
                  Education
                </h2>
                {renderItems(education)}
              </div>
            )}
            {activePage === "certificates" && (
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-8">
                  Certificates & Awards
                </h2>
                {renderItems(certificates)}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-md border-t border-gray-200 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-600 text-sm">
          <p>
            © {new Date().getFullYear()} {profile.fullName || profile.username}.
            All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
