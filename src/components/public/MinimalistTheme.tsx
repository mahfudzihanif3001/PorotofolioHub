"use client";

import { ThemeProps, categoryLabels, PortfolioItem } from "./types";
import { ResponsiveNavigation } from "./ResponsiveNavigation";
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
} from "react-icons/fa";

type PageType =
  | "home"
  | "projects"
  | "experience"
  | "education"
  | "certificates";

export default function MinimalistTheme({ profile, items }: ThemeProps) {
  const [activePage, setActivePage] = useState<PageType>("home");

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
          <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
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
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
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
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
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
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
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
        <div className="text-center py-12 text-gray-500">
          No items to display yet.
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categoryItems.map((item, index) => (
          <article
            key={item._id}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg hover:border-blue-300 transition-all duration-300 hover:-translate-y-1 animate-[fadeIn_0.6s_ease-in-out]"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Item Image */}
            {item.attachments.find((a) => a.fileType === "IMAGE") && (
              <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden mb-4">
                <Image
                  src={
                    item.attachments.find((a) => a.fileType === "IMAGE")!.url
                  }
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              {item.title}
            </h4>

            {/* Date */}
            {(item.startDate || item.endDate) && (
              <p className="text-sm text-gray-500 mb-2">
                {item.startDate &&
                  new Date(item.startDate).toLocaleDateString("id-ID", {
                    month: "short",
                    year: "numeric",
                  })}
                {item.startDate && item.endDate && " - "}
                {item.endDate
                  ? new Date(item.endDate).toLocaleDateString("id-ID", {
                      month: "short",
                      year: "numeric",
                    })
                  : item.startDate && "Present"}
              </p>
            )}

            {/* Descriptions for Experience/Education */}
            {item.descriptions && item.descriptions.length > 0 ? (
              <ul className="text-gray-600 text-sm mb-4 space-y-1 list-disc list-inside">
                {item.descriptions.map((desc, idx) => (
                  <li key={idx}>{desc}</li>
                ))}
              </ul>
            ) : (
              item.description && (
                <p className="text-gray-600 text-sm mb-4">{item.description}</p>
              )
            )}

            {/* Tech Stack */}
            {item.techStack && item.techStack.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-4">
                {item.techStack.map((tech, index) => (
                  <span
                    key={index}
                    className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-xs font-medium"
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
    <div className="space-y-12 animate-[fadeIn_0.8s_ease-in-out]">
      {/* Hero Section */}
      <section className="animate-[slideUp_0.8s_ease-out]">
        <div className="flex flex-col md:flex-row items-start gap-8">
          {/* Avatar */}
          {profile.avatarUrl && (
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-gray-200 flex-shrink-0 group">
              <Image
                src={profile.avatarUrl}
                alt={profile.fullName || profile.username}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          )}

          {/* Info */}
          <div className="flex-1">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              {profile.fullName || profile.username}
            </h2>
            <p className="text-lg text-gray-500 mb-4">{profile.title}</p>
            {profile.bio && (
              <p className="text-gray-600 leading-relaxed max-w-2xl mb-6">
                {profile.bio}
              </p>
            )}

            {/* Contact Info */}
            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
              {profile.location && (
                <span className="flex items-center gap-1">
                  <FaMapMarkerAlt className="text-gray-400" />
                  {profile.location}
                </span>
              )}
              {profile.phone && (
                <span className="flex items-center gap-1">
                  <FaPhone className="text-gray-400" />
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
                  className="text-gray-600 hover:text-gray-900 transition-colors"
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
              {profile.socialLinks?.twitter && (
                <a
                  href={profile.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-400 transition-colors"
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
                  className="text-gray-600 hover:text-pink-500 transition-colors"
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
                  className="text-gray-600 hover:text-gray-900 transition-colors"
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
          <div className="mt-8">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
              Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Quick Overview */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
            onClick={() => setActivePage(stat.page)}
            className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:shadow-lg hover:border-blue-300 transition-all duration-300 hover:-translate-y-1 animate-[scaleIn_0.6s_ease-in-out]"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="text-3xl font-bold text-gray-900">{stat.count}</div>
            <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
          </button>
        ))}
      </section>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 relative">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30 animate-[float_8s_ease-in-out_infinite]" />
      <div
        className="absolute bottom-0 left-0 w-72 h-72 bg-gray-100 rounded-full blur-3xl opacity-40 animate-[float_6s_ease-in-out_infinite]"
        style={{ animationDelay: "2s" }}
      />

      {/* Header with Navigation */}
      <ResponsiveNavigation
        items={navItems}
        activePage={activePage}
        onNavigate={setActivePage}
        profileName={profile.fullName || profile.username}
      />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8 relative z-10">
        {activePage === "home" && renderHomePage()}
        {activePage === "projects" && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Projects</h2>
            {renderItems(projects)}
          </div>
        )}
        {activePage === "experience" && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Experience
            </h2>
            {renderItems(experiences)}
          </div>
        )}
        {activePage === "education" && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Education</h2>
            {renderItems(education)}
          </div>
        )}
        {activePage === "certificates" && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Certificates
            </h2>
            {renderItems(certificates)}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-6 text-center text-gray-500 text-sm">
          <p>
            © {new Date().getFullYear()} {profile.fullName || profile.username}.
            All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
