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
  FaNewspaper,
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

export default function NewspaperTheme({ profile, items }: ThemeProps) {
  const [activePage, setActivePage] = useState<PageType>("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Group items by category
  const projects = items.filter((item) => item.category === "PROJECT");
  const experiences = items.filter((item) => item.category === "EXPERIENCE");
  const education = items.filter((item) => item.category === "EDUCATION");
  const certificates = items.filter((item) => item.category === "CERTIFICATE");

  const navItems = [
    { id: "home" as PageType, label: "Front Page", icon: FaUser },
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
          <div className="relative aspect-video bg-gray-200 overflow-hidden border border-gray-400">
            <Image
              src={attachment.url}
              alt={attachment.label || "Image"}
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all"
            />
          </div>
        );
      case "PDF":
        return (
          <a
            href={attachment.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-800 hover:text-blue-950 transition-colors font-serif underline"
          >
            <FaFilePdf className="text-red-700" />
            <span>{attachment.label || "View Document"}</span>
            <FaExternalLinkAlt className="text-xs" />
          </a>
        );
      case "LINK":
        return (
          <a
            href={attachment.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-800 hover:text-blue-950 transition-colors font-serif underline"
          >
            <FaGlobe />
            <span>{attachment.label || "Visit Link"}</span>
            <FaExternalLinkAlt className="text-xs" />
          </a>
        );
      case "VIDEO":
        return (
          <a
            href={attachment.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-800 hover:text-blue-950 transition-colors font-serif underline"
          >
            <FaPlay />
            <span>{attachment.label || "Watch Video"}</span>
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
        <div className="text-center py-12 text-gray-600 font-serif italic">
          No articles in this section yet.
        </div>
      );
    }

    return (
      <div className="space-y-8">
        {categoryItems.map((item, index) => (
          <article
            key={item._id}
            className={`border-b-2 border-gray-900 pb-8 bg-white/60 backdrop-blur-sm p-6 hover:bg-white/80 transition-all duration-300 animate-[fadeIn_0.6s_ease-in-out] ${index === 0 ? "border-t-4 pt-8" : ""}`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Item Image */}
              {item.attachments.find((a) => a.fileType === "IMAGE") && (
                <div className="lg:col-span-1">
                  <div className="relative aspect-[4/3] bg-gray-200 overflow-hidden border-2 border-gray-900">
                    <Image
                      src={
                        item.attachments.find((a) => a.fileType === "IMAGE")!
                          .url
                      }
                      alt={item.title}
                      fill
                      className="object-cover grayscale"
                    />
                  </div>
                </div>
              )}

              <div
                className={
                  item.attachments.find((a) => a.fileType === "IMAGE")
                    ? "lg:col-span-2"
                    : "lg:col-span-3"
                }
              >
                <h4 className="text-2xl font-bold text-gray-900 mb-2 font-serif">
                  {item.title}
                </h4>

                {/* Date */}
                {(item.startDate || item.endDate) && (
                  <p className="text-sm text-gray-600 mb-3 font-serif italic">
                    {item.startDate &&
                      new Date(item.startDate).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    {item.startDate && item.endDate && " – "}
                    {item.endDate
                      ? new Date(item.endDate).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })
                      : item.startDate && "Present"}
                  </p>
                )}

                {/* Descriptions for Experience/Education */}
                {item.descriptions && item.descriptions.length > 0 ? (
                  <div className="text-gray-800 mb-4 space-y-3 font-serif leading-relaxed text-justify">
                    {item.descriptions.map((desc, idx) => (
                      <p
                        key={idx}
                        className="first-letter:text-4xl first-letter:font-bold first-letter:mr-1 first-letter:float-left"
                      >
                        {desc}
                      </p>
                    ))}
                  </div>
                ) : (
                  item.description && (
                    <p className="text-gray-800 mb-4 font-serif leading-relaxed text-justify first-letter:text-4xl first-letter:font-bold first-letter:mr-1 first-letter:float-left">
                      {item.description}
                    </p>
                  )
                )}

                {/* Tech Stack */}
                {item.techStack && item.techStack.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.techStack.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-gray-900 text-white text-xs font-mono uppercase tracking-wider"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {/* Attachments (non-image) */}
                <div className="space-y-2 mt-4">
                  {item.attachments
                    .filter((a) => a.fileType !== "IMAGE")
                    .map((attachment, attIndex) => (
                      <div key={attIndex}>{renderAttachment(attachment)}</div>
                    ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    );
  };

  const renderHomePage = () => (
    <div className="space-y-8">
      {/* Masthead */}
      <section className="border-y-4 border-gray-900 py-8 bg-white/80 backdrop-blur-sm animate-[fadeIn_0.8s_ease-in-out]">
        <div className="flex flex-col md:flex-row items-start gap-8 animate-[slideUp_0.8s_ease-out]">
          {/* Avatar */}
          {profile.avatarUrl && (
            <div className="relative w-40 h-40 border-4 border-gray-900 flex-shrink-0 overflow-hidden group">
              <Image
                src={profile.avatarUrl}
                alt={profile.fullName || profile.username}
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
              />
            </div>
          )}

          {/* Info */}
          <div className="flex-1">
            <h2 className="text-5xl font-black text-gray-900 mb-2 font-serif uppercase border-b-2 border-gray-900 pb-2">
              {profile.fullName || profile.username}
            </h2>
            <p className="text-xl text-gray-700 mb-4 font-serif italic">
              {profile.title}
            </p>
            {profile.bio && (
              <p className="text-gray-800 leading-relaxed mb-6 font-serif text-justify first-letter:text-5xl first-letter:font-bold first-letter:mr-2 first-letter:float-left">
                {profile.bio}
              </p>
            )}

            {/* Contact Info */}
            <div className="flex flex-wrap gap-6 text-gray-700 mb-6 font-serif text-sm">
              {profile.location && (
                <span className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-gray-900" />
                  <strong>Location:</strong> {profile.location}
                </span>
              )}
              {profile.phone && (
                <span className="flex items-center gap-2">
                  <FaPhone className="text-gray-900" />
                  <strong>Tel:</strong> {profile.phone}
                </span>
              )}
            </div>

            {/* Social Links */}
            <div className="flex gap-4 border-t border-gray-400 pt-4">
              {profile.socialLinks?.github && (
                <a
                  href={profile.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-800 hover:text-gray-950 transition-colors"
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
                  className="text-gray-800 hover:text-gray-950 transition-colors"
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
                  className="text-gray-800 hover:text-gray-950 transition-colors"
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
                  className="text-gray-800 hover:text-gray-950 transition-colors"
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
                  className="text-gray-800 hover:text-gray-950 transition-colors"
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
          <div className="mt-8 pt-8 border-t-2 border-gray-900">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 font-serif border-b border-gray-400 pb-2">
              Areas of Expertise
            </h3>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gray-900 text-white font-serif text-sm"
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
            className="border-4 border-gray-900 p-6 text-center bg-white hover:bg-gray-900 hover:text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg animate-[scaleIn_0.6s_ease-in-out]"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="text-5xl font-black mb-2 font-serif">
              {stat.count}
            </div>
            <div className="text-sm uppercase tracking-wider font-serif font-bold">
              {stat.label}
            </div>
          </button>
        ))}
      </section>
    </div>
  );

  return (
    <div className="min-h-screen bg-amber-50 relative">
      {/* Vintage paper texture overlay */}
      <div className="fixed inset-0 opacity-5 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuOSIgbnVtT2N0YXZlcz0iNCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZSkiLz48L3N2Zz4=')]" />

      {/* Header */}
      <header className="bg-white border-b-4 border-gray-900 sticky top-0 z-40 relative">
        <div className="px-6 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <FaNewspaper className="text-gray-900 text-2xl" />
              <div>
                <h1 className="text-3xl font-black text-gray-900 font-serif uppercase">
                  The Portfolio Times
                </h1>
                <p className="text-xs text-gray-600 font-serif italic">
                  Est. {new Date().getFullYear()} • Professional Edition
                </p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-gray-900 hover:text-gray-700 transition-colors"
            >
              {sidebarOpen ? (
                <FaTimes className="text-2xl" />
              ) : (
                <FaBars className="text-2xl" />
              )}
            </button>
          </div>
          <div className="text-sm text-gray-700 font-serif text-center">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed lg:sticky top-[145px] left-0 h-[calc(100vh-145px)] w-64 bg-white border-r-4 border-gray-900 z-30 transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="p-4">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 font-serif border-b-2 border-gray-900 pb-2">
              Sections
            </h3>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActivePage(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 transition-colors font-serif ${
                      activePage === item.id
                        ? "bg-gray-900 text-white"
                        : "text-gray-800 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="text-lg" />
                    <span className="flex-1 text-left font-semibold">
                      {item.label}
                    </span>
                    {item.count !== undefined && item.count > 0 && (
                      <span
                        className={`px-2 py-0.5 text-xs font-bold ${
                          activePage === item.id
                            ? "bg-white text-gray-900"
                            : "bg-gray-900 text-white"
                        }`}
                      >
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/30 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-5xl mx-auto">
            {activePage === "home" && renderHomePage()}
            {activePage === "projects" && (
              <div>
                <h2 className="text-4xl font-black text-gray-900 mb-8 font-serif uppercase border-b-4 border-gray-900 pb-4">
                  Projects Section
                </h2>
                {renderItems(projects)}
              </div>
            )}
            {activePage === "experience" && (
              <div>
                <h2 className="text-4xl font-black text-gray-900 mb-8 font-serif uppercase border-b-4 border-gray-900 pb-4">
                  Professional Experience
                </h2>
                {renderItems(experiences)}
              </div>
            )}
            {activePage === "education" && (
              <div>
                <h2 className="text-4xl font-black text-gray-900 mb-8 font-serif uppercase border-b-4 border-gray-900 pb-4">
                  Education
                </h2>
                {renderItems(education)}
              </div>
            )}
            {activePage === "certificates" && (
              <div>
                <h2 className="text-4xl font-black text-gray-900 mb-8 font-serif uppercase border-b-4 border-gray-900 pb-4">
                  Certificates & Awards
                </h2>
                {renderItems(certificates)}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t-4 border-gray-900 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-800 font-serif">
          <p className="font-bold">
            © {new Date().getFullYear()} The Portfolio Times |{" "}
            {profile.fullName || profile.username}
          </p>
          <p className="text-sm text-gray-600 mt-1 italic">
            All rights reserved. Published daily.
          </p>
        </div>
      </footer>
    </div>
  );
}
