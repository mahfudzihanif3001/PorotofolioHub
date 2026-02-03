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
  FaUser,
  FaBriefcase,
  FaCertificate,
  FaGraduationCap,
  FaFolder,
  FaBolt,
} from "react-icons/fa";

type PageType =
  | "home"
  | "projects"
  | "experience"
  | "education"
  | "certificates";

export default function NeoBrutalismTheme({ profile, items }: ThemeProps) {
  const [activePage, setActivePage] = useState<PageType>("home");

  // Group items by category
  const projects = items.filter((item) => item.category === "PROJECT");
  const experiences = items.filter((item) => item.category === "EXPERIENCE");
  const education = items.filter((item) => item.category === "EDUCATION");
  const certificates = items.filter((item) => item.category === "CERTIFICATE");

  const navItems = [
    {
      id: "home" as PageType,
      label: "HOME",
      icon: FaUser,
      color: "bg-yellow-400",
    },
    {
      id: "projects" as PageType,
      label: "PROJECTS",
      icon: FaFolder,
      count: projects.length,
      color: "bg-pink-400",
    },
    {
      id: "experience" as PageType,
      label: "EXPERIENCE",
      icon: FaBriefcase,
      count: experiences.length,
      color: "bg-cyan-400",
    },
    {
      id: "education" as PageType,
      label: "EDUCATION",
      icon: FaGraduationCap,
      count: education.length,
      color: "bg-lime-400",
    },
    {
      id: "certificates" as PageType,
      label: "CERTIFICATES",
      icon: FaCertificate,
      count: certificates.length,
      color: "bg-orange-400",
    },
  ];

  const renderAttachment = (attachment: PortfolioItem["attachments"][0]) => {
    switch (attachment.fileType) {
      case "IMAGE":
        return (
          <div className="relative aspect-video bg-black border-4 border-black overflow-hidden">
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
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-400 border-4 border-black font-black uppercase hover:translate-x-1 hover:-translate-y-1 transition-transform shadow-[4px_4px_0_0_#000]"
          >
            <FaFilePdf />
            <span>{attachment.label || "VIEW PDF"}</span>
            <FaExternalLinkAlt className="text-sm" />
          </a>
        );
      case "LINK":
        return (
          <a
            href={attachment.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-400 border-4 border-black font-black uppercase hover:translate-x-1 hover:-translate-y-1 transition-transform shadow-[4px_4px_0_0_#000]"
          >
            <FaGlobe />
            <span>{attachment.label || "VIEW LINK"}</span>
            <FaExternalLinkAlt className="text-sm" />
          </a>
        );
      case "VIDEO":
        return (
          <a
            href={attachment.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-400 border-4 border-black font-black uppercase hover:translate-x-1 hover:-translate-y-1 transition-transform shadow-[4px_4px_0_0_#000]"
          >
            <FaPlay />
            <span>{attachment.label || "WATCH VIDEO"}</span>
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
        <div className="text-center py-12 border-4 border-black bg-gray-100 shadow-[8px_8px_0_0_#000]">
          <p className="text-2xl font-black uppercase">NO ITEMS YET!</p>
        </div>
      );
    }

    const colors = [
      "bg-yellow-400",
      "bg-pink-400",
      "bg-cyan-400",
      "bg-lime-400",
      "bg-orange-400",
      "bg-purple-400",
    ];

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {categoryItems.map((item, index) => (
          <article
            key={item._id}
            className={`${colors[index % colors.length]} border-4 border-black p-6 shadow-[8px_8px_0_0_#000] hover:translate-x-1 hover:-translate-y-1 hover:shadow-[12px_12px_0_0_#000] transition-all animate-[scaleIn_0.5s_ease-out]`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Item Image */}
            {item.attachments.find((a) => a.fileType === "IMAGE") && (
              <div className="relative aspect-video border-4 border-black mb-4 overflow-hidden">
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

            <h4 className="text-2xl font-black uppercase mb-2 border-b-4 border-black pb-2">
              {item.title}
            </h4>

            {/* Date */}
            {(item.startDate || item.endDate) && (
              <p className="text-sm font-bold mb-3 bg-black text-white px-2 py-1 inline-block">
                {item.startDate &&
                  new Date(item.startDate).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
                {item.startDate && item.endDate && " → "}
                {item.endDate
                  ? new Date(item.endDate).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })
                  : item.startDate && "NOW"}
              </p>
            )}

            {/* Descriptions */}
            {item.descriptions && item.descriptions.length > 0 ? (
              <ul className="text-sm font-bold mb-4 space-y-2">
                {item.descriptions.map((desc, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="text-lg">→</span>
                    <span>{desc}</span>
                  </li>
                ))}
              </ul>
            ) : (
              item.description && (
                <p className="font-bold mb-4">{item.description}</p>
              )
            )}

            {/* Tech Stack */}
            {item.techStack && item.techStack.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {item.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-black text-white font-black text-xs uppercase"
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
      <section className="bg-yellow-400 border-4 border-black p-8 shadow-[8px_8px_0_0_#000] animate-[slideUp_0.6s_ease-out]">
        <div className="flex flex-col md:flex-row items-start gap-8">
          {/* Avatar */}
          {profile.avatarUrl && (
            <div className="relative w-40 h-40 border-4 border-black flex-shrink-0 overflow-hidden rotate-3 hover:rotate-0 transition-transform shadow-[6px_6px_0_0_#000]">
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
            <h2 className="text-5xl md:text-6xl font-black uppercase mb-4 leading-none">
              {profile.fullName || profile.username}
            </h2>
            <p className="text-2xl font-black uppercase bg-black text-yellow-400 px-4 py-2 inline-block mb-4">
              ⚡ {profile.title?.toUpperCase()}
            </p>
            {profile.bio && (
              <p className="text-lg font-bold leading-relaxed max-w-2xl mb-6">
                {profile.bio}
              </p>
            )}

            {/* Contact Info */}
            <div className="flex flex-wrap gap-4 font-bold mb-6">
              {profile.location && (
                <span className="flex items-center gap-2 bg-white border-4 border-black px-3 py-1 shadow-[4px_4px_0_0_#000]">
                  <FaMapMarkerAlt />
                  {profile.location}
                </span>
              )}
              {profile.phone && (
                <span className="flex items-center gap-2 bg-white border-4 border-black px-3 py-1 shadow-[4px_4px_0_0_#000]">
                  <FaPhone />
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
                  className="w-12 h-12 bg-black text-white flex items-center justify-center border-4 border-black hover:bg-white hover:text-black transition-colors shadow-[4px_4px_0_0_#000] hover:shadow-[6px_6px_0_0_#000] hover:translate-x-[-2px] hover:translate-y-[-2px]"
                >
                  <FaGithub className="text-2xl" />
                </a>
              )}
              {profile.socialLinks?.linkedin && (
                <a
                  href={profile.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-blue-600 text-white flex items-center justify-center border-4 border-black hover:bg-white hover:text-blue-600 transition-colors shadow-[4px_4px_0_0_#000] hover:shadow-[6px_6px_0_0_#000] hover:translate-x-[-2px] hover:translate-y-[-2px]"
                >
                  <FaLinkedin className="text-2xl" />
                </a>
              )}
              {profile.socialLinks?.email && (
                <a
                  href={`mailto:${profile.socialLinks.email}`}
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-cyan-400 text-black flex items-center justify-center border-4 border-black hover:bg-white transition-colors shadow-[4px_4px_0_0_#000] hover:shadow-[6px_6px_0_0_#000] hover:translate-x-[-2px] hover:translate-y-[-2px]"
                >
                  <FaEnvelope className="text-2xl" />
                </a>
              )}
              {profile.socialLinks?.instagram && (
                <a
                  href={profile.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-pink-500 text-white flex items-center justify-center border-4 border-black hover:bg-white hover:text-pink-500 transition-colors shadow-[4px_4px_0_0_#000] hover:shadow-[6px_6px_0_0_#000] hover:translate-x-[-2px] hover:translate-y-[-2px]"
                >
                  <FaInstagram className="text-2xl" />
                </a>
              )}
              {profile.socialLinks?.website && (
                <a
                  href={profile.socialLinks.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-lime-400 text-black flex items-center justify-center border-4 border-black hover:bg-white transition-colors shadow-[4px_4px_0_0_#000] hover:shadow-[6px_6px_0_0_#000] hover:translate-x-[-2px] hover:translate-y-[-2px]"
                >
                  <FaGlobe className="text-2xl" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Skills */}
        {profile.skills && profile.skills.length > 0 && (
          <div className="mt-8 pt-8 border-t-4 border-black">
            <h3 className="text-xl font-black uppercase mb-4 flex items-center gap-2">
              <FaBolt /> SKILLS
            </h3>
            <div className="flex flex-wrap gap-3">
              {profile.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-white border-4 border-black font-black uppercase text-sm shadow-[4px_4px_0_0_#000] hover:translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#000] transition-all cursor-default"
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
            color: "bg-pink-400",
          },
          {
            label: "EXPERIENCE",
            count: experiences.length,
            page: "experience" as PageType,
            color: "bg-cyan-400",
          },
          {
            label: "EDUCATION",
            count: education.length,
            page: "education" as PageType,
            color: "bg-lime-400",
          },
          {
            label: "CERTIFICATES",
            count: certificates.length,
            page: "certificates" as PageType,
            color: "bg-orange-400",
          },
        ].map((stat, index) => (
          <button
            key={stat.label}
            onClick={() => setActivePage(stat.page)}
            className={`${stat.color} border-4 border-black p-6 text-center shadow-[6px_6px_0_0_#000] hover:translate-x-1 hover:-translate-y-1 hover:shadow-[10px_10px_0_0_#000] transition-all animate-[scaleIn_0.5s_ease-out]`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="text-5xl font-black mb-2">{stat.count}</div>
            <div className="text-sm font-black uppercase">{stat.label}</div>
          </button>
        ))}
      </section>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Responsive Navigation */}
      <ResponsiveNavigation
        items={navItems}
        activePage={activePage}
        onNavigate={setActivePage}
        profileName={profile.fullName || profile.username}
        headerClassName="bg-black text-white sticky top-0 z-50"
        containerClassName="max-w-7xl mx-auto px-4 md:px-6"
        desktopNavClassName="hidden md:flex gap-2 pb-4"
        mobileNavClassName="md:hidden pb-4 border-t-4 border-white"
        buttonActiveClassName="bg-yellow-400 text-black font-black border-4 border-white"
        buttonInactiveClassName="bg-black text-white border-4 border-white hover:bg-white hover:text-black font-black"
        mobileButtonActiveClassName="bg-yellow-400 text-black border-4 border-yellow-400"
        mobileButtonInactiveClassName="bg-black text-white border-4 border-white hover:bg-yellow-400 hover:text-black hover:border-yellow-400"
        headerContent={
          <h1 className="text-lg md:text-2xl font-black uppercase flex items-center gap-2">
            <FaBolt className="text-yellow-400" />
            {profile.fullName || profile.username}
          </h1>
        }
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        {activePage === "home" && renderHomePage()}
        {activePage === "projects" && (
          <div>
            <h2 className="text-4xl font-black uppercase mb-8 bg-pink-400 border-4 border-black p-4 inline-block shadow-[6px_6px_0_0_#000]">
              PROJECTS
            </h2>
            {renderItems(projects)}
          </div>
        )}
        {activePage === "experience" && (
          <div>
            <h2 className="text-4xl font-black uppercase mb-8 bg-cyan-400 border-4 border-black p-4 inline-block shadow-[6px_6px_0_0_#000]">
              EXPERIENCE
            </h2>
            {renderItems(experiences)}
          </div>
        )}
        {activePage === "education" && (
          <div>
            <h2 className="text-4xl font-black uppercase mb-8 bg-lime-400 border-4 border-black p-4 inline-block shadow-[6px_6px_0_0_#000]">
              EDUCATION
            </h2>
            {renderItems(education)}
          </div>
        )}
        {activePage === "certificates" && (
          <div>
            <h2 className="text-4xl font-black uppercase mb-8 bg-orange-400 border-4 border-black p-4 inline-block shadow-[6px_6px_0_0_#000]">
              CERTIFICATES
            </h2>
            {renderItems(certificates)}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-8 mt-12 border-t-4 border-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="font-black uppercase">
            © {new Date().getFullYear()} {profile.fullName || profile.username}{" "}
            — BUILT DIFFERENT ⚡
          </p>
        </div>
      </footer>
    </div>
  );
}
