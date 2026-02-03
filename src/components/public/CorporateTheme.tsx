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
  FaBriefcase,
  FaUser,
  FaFolder,
  FaCertificate,
  FaGraduationCap,
} from "react-icons/fa";

type PageType =
  | "home"
  | "projects"
  | "experience"
  | "education"
  | "certificates";

export default function CorporateTheme({ profile, items }: ThemeProps) {
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
          <div className="relative aspect-video bg-slate-100 overflow-hidden">
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
            className="inline-flex items-center gap-2 text-[#c9a227] hover:text-[#1e3a5f] transition-colors"
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
            className="inline-flex items-center gap-2 text-[#c9a227] hover:text-[#1e3a5f] transition-colors"
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
            className="inline-flex items-center gap-2 text-[#c9a227] hover:text-[#1e3a5f] transition-colors"
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
        <div className="text-center py-12 text-slate-500 font-serif">
          No items to display yet.
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {categoryItems.map((item, index) => (
          <article
            key={item._id}
            className="bg-white border-l-4 border-[#c9a227] shadow-md hover:shadow-xl transition-all duration-300 p-6 hover:-translate-y-1 animate-[fadeIn_0.6s_ease-in-out]"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Item Image */}
            {item.attachments.find((a) => a.fileType === "IMAGE") && (
              <div className="relative aspect-video bg-slate-100 mb-4">
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

            <h4 className="text-xl font-bold text-[#1e3a5f] mb-2 font-serif">
              {item.title}
            </h4>

            {/* Date */}
            {(item.startDate || item.endDate) && (
              <p className="text-sm text-slate-500 mb-3 font-sans">
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
              <ul className="text-slate-600 mb-4 font-sans leading-relaxed space-y-2 list-disc list-inside">
                {item.descriptions.map((desc, idx) => (
                  <li key={idx}>{desc}</li>
                ))}
              </ul>
            ) : (
              item.description && (
                <p className="text-slate-600 mb-4 font-sans leading-relaxed">
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
                    className="px-3 py-1 bg-[#1e3a5f] text-white text-xs font-semibold tracking-normal uppercase"
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
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="bg-white border-l-4 border-[#c9a227] shadow-md p-8 animate-[fadeIn_0.8s_ease-in-out] hover:shadow-2xl transition-shadow duration-300">
        <div className="flex flex-col md:flex-row items-start gap-8 animate-[slideUp_0.8s_ease-out]">
          {/* Avatar */}
          {profile.avatarUrl && (
            <div className="relative w-40 h-40 border-4 border-[#c9a227] flex-shrink-0 overflow-hidden group">
              <Image
                src={profile.avatarUrl}
                alt={profile.fullName || profile.username}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a5f]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          )}

          {/* Info */}
          <div className="flex-1">
            <h2 className="text-4xl font-bold text-[#1e3a5f] mb-2 font-serif">
              {profile.fullName || profile.username}
            </h2>
            <p className="text-xl text-[#c9a227] mb-4 font-serif font-semibold">
              {profile.title}
            </p>
            {profile.bio && (
              <p className="text-slate-700 leading-relaxed max-w-2xl mb-6 font-sans">
                {profile.bio}
              </p>
            )}

            {/* Contact Info */}
            <div className="flex flex-wrap gap-4 text-slate-600 mb-6 font-sans">
              {profile.location && (
                <span className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-[#c9a227]" />
                  {profile.location}
                </span>
              )}
              {profile.phone && (
                <span className="flex items-center gap-2">
                  <FaPhone className="text-[#c9a227]" />
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
                  className="text-slate-600 hover:text-[#c9a227] transition-colors"
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
                  className="text-slate-600 hover:text-[#c9a227] transition-colors"
                  title="LinkedIn"
                >
                  <FaLinkedin className="text-2xl" />
                </a>
              )}
              {profile.socialLinks?.email && (
                <a
                  href={`mailto:${profile.socialLinks.email}`}
                  rel="noopener noreferrer"
                  className="text-slate-600 hover:text-[#c9a227] transition-colors"
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
                  className="text-slate-600 hover:text-[#c9a227] transition-colors"
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
                  className="text-slate-600 hover:text-[#c9a227] transition-colors"
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
          <div className="mt-8 pt-8 border-t border-slate-200">
            <h3 className="text-sm font-bold text-[#1e3a5f] uppercase tracking-normal mb-4 font-sans">
              Professional Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold text-sm font-sans"
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
            onClick={() => setActivePage(stat.page)}
            className="bg-white border-l-4 border-[#c9a227] shadow-md p-6 text-center hover:shadow-xl hover:border-[#1e3a5f] transition-all duration-300 hover:-translate-y-2 animate-[fadeIn_0.8s_ease-in-out]"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="text-4xl font-bold text-[#1e3a5f] mb-2">
              {stat.count}
            </div>
            <div className="text-sm text-slate-600 uppercase tracking-normal font-sans font-semibold">
              {stat.label}
            </div>
          </button>
        ))}
      </section>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 relative overflow-hidden">
      {/* Animated Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#c9a227]/10 rounded-full blur-3xl animate-[float_6s_ease-in-out_infinite]" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-[#1e3a5f]/10 rounded-full blur-3xl animate-[float_8s_ease-in-out_infinite]"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Header with Navigation */}
      <ResponsiveNavigation
        items={navItems}
        activePage={activePage}
        onNavigate={setActivePage}
        profileName={profile.fullName || profile.username}
        headerClassName="bg-[#1e3a5f] text-white sticky top-0 z-50 shadow-lg relative"
        containerClassName="max-w-7xl mx-auto px-4 md:px-6"
        desktopNavClassName="hidden md:flex gap-2 -mb-px"
        mobileNavClassName="md:hidden pb-4 border-t border-[#0f2438]"
        buttonActiveClassName="border-[#c9a227] bg-[#1e3a5f]/50 text-white font-serif font-semibold"
        buttonInactiveClassName="border-transparent text-gray-300 hover:border-white/30 hover:bg-[#1e3a5f]/30 font-serif"
        mobileButtonActiveClassName="bg-[#c9a227] text-[#1e3a5f] font-medium font-serif"
        mobileButtonInactiveClassName="text-gray-300 hover:bg-[#0f2438] font-serif"
        headerContent={
          <div className="flex items-center gap-3">
            <FaBriefcase className="text-[#c9a227] text-2xl" />
            <h1 className="text-lg md:text-2xl font-bold tracking-normal font-sans text-white">
              {profile.fullName || profile.username}
            </h1>
          </div>
        }
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        {activePage === "home" && renderHomePage()}
        {activePage === "projects" && (
          <div>
            <h2 className="text-4xl font-bold text-[#1e3a5f] mb-8 font-sans border-l-4 border-[#c9a227] pl-4">
              Projects
            </h2>
            {renderItems(projects)}
          </div>
        )}
        {activePage === "experience" && (
          <div>
            <h2 className="text-4xl font-bold text-[#1e3a5f] mb-8 font-sans border-l-4 border-[#c9a227] pl-4">
              Professional Experience
            </h2>
            {renderItems(experiences)}
          </div>
        )}
        {activePage === "education" && (
          <div>
            <h2 className="text-4xl font-bold text-[#1e3a5f] mb-8 font-sans border-l-4 border-[#c9a227] pl-4">
              Education
            </h2>
            {renderItems(education)}
          </div>
        )}
        {activePage === "certificates" && (
          <div>
            <h2 className="text-4xl font-bold text-[#1e3a5f] mb-8 font-sans border-l-4 border-[#c9a227] pl-4">
              Certificates & Awards
            </h2>
            {renderItems(certificates)}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#1e3a5f] text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="font-serif">
            © {new Date().getFullYear()} {profile.fullName || profile.username}.
            All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
