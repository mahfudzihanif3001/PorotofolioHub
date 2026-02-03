"use client";

import { ThemeProps, PortfolioItem } from "./types";
import { ResponsiveNavigation } from "./ResponsiveNavigation";
import Image from "next/image";
import { useState, useEffect } from "react";
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
  FaGamepad,
} from "react-icons/fa";

type PageType =
  | "home"
  | "projects"
  | "experience"
  | "education"
  | "certificates";

export default function Y2KRetroTheme({ profile, items }: ThemeProps) {
  const [activePage, setActivePage] = useState<PageType>("home");
  const [time, setTime] = useState(new Date());
  const [glitch, setGlitch] = useState(false);

  // Group items by category
  const projects = items.filter((item) => item.category === "PROJECT");
  const experiences = items.filter((item) => item.category === "EXPERIENCE");
  const education = items.filter((item) => item.category === "EDUCATION");
  const certificates = items.filter((item) => item.category === "CERTIFICATE");

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    const glitchTimer = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150);
    }, 5000);
    return () => {
      clearInterval(timer);
      clearInterval(glitchTimer);
    };
  }, []);

  const navItems = [
    { id: "home" as PageType, label: "HOME.exe", icon: FaUser },
    {
      id: "projects" as PageType,
      label: "PROJECTS.exe",
      icon: FaFolder,
      count: projects.length,
    },
    {
      id: "experience" as PageType,
      label: "WORK.exe",
      icon: FaBriefcase,
      count: experiences.length,
    },
    {
      id: "education" as PageType,
      label: "SCHOOL.exe",
      icon: FaGraduationCap,
      count: education.length,
    },
    {
      id: "certificates" as PageType,
      label: "CERTS.exe",
      icon: FaCertificate,
      count: certificates.length,
    },
  ];

  const renderAttachment = (attachment: PortfolioItem["attachments"][0]) => {
    switch (attachment.fileType) {
      case "IMAGE":
        return (
          <div className="relative aspect-video border-2 border-gray-400 overflow-hidden shadow-[inset_-2px_-2px_0_0_#808080,inset_2px_2px_0_0_#fff] bg-teal-900">
            <Image
              src={attachment.url}
              alt={attachment.label || "Image"}
              fill
              className="object-cover"
              style={{ imageRendering: "auto" }}
            />
          </div>
        );
      case "PDF":
        return (
          <a
            href={attachment.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-1 bg-gray-300 border-2 border-gray-400 shadow-[inset_-2px_-2px_0_0_#808080,inset_2px_2px_0_0_#fff] font-mono text-sm hover:bg-gray-400 active:shadow-[inset_2px_2px_0_0_#808080,inset_-2px_-2px_0_0_#fff]"
          >
            <FaFilePdf className="text-red-600" />
            <span>{attachment.label || "Open File"}</span>
            <FaExternalLinkAlt className="text-xs" />
          </a>
        );
      case "LINK":
        return (
          <a
            href={attachment.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-1 bg-gray-300 border-2 border-gray-400 shadow-[inset_-2px_-2px_0_0_#808080,inset_2px_2px_0_0_#fff] font-mono text-sm hover:bg-gray-400 active:shadow-[inset_2px_2px_0_0_#808080,inset_-2px_-2px_0_0_#fff]"
          >
            <FaGlobe className="text-blue-600" />
            <span>{attachment.label || "Open Link"}</span>
            <FaExternalLinkAlt className="text-xs" />
          </a>
        );
      case "VIDEO":
        return (
          <a
            href={attachment.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-1 bg-gray-300 border-2 border-gray-400 shadow-[inset_-2px_-2px_0_0_#808080,inset_2px_2px_0_0_#fff] font-mono text-sm hover:bg-gray-400 active:shadow-[inset_2px_2px_0_0_#808080,inset_-2px_-2px_0_0_#fff]"
          >
            <FaPlay className="text-purple-600" />
            <span>{attachment.label || "Play Video"}</span>
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
        <div className="bg-gray-200 border-2 border-gray-400 shadow-[inset_-2px_-2px_0_0_#808080,inset_2px_2px_0_0_#fff] p-8 text-center font-mono">
          <p className="text-gray-600">📁 This folder is empty</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {categoryItems.map((item, index) => (
          <article
            key={item._id}
            className="bg-gray-200 border-2 border-gray-400 shadow-[inset_-2px_-2px_0_0_#808080,inset_2px_2px_0_0_#fff] animate-[fadeIn_0.5s_ease-out]"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Window Title Bar */}
            <div className="bg-gradient-to-r from-blue-800 to-blue-600 px-2 py-1 flex items-center justify-between">
              <span className="text-white font-bold text-sm flex items-center gap-2">
                📄 {item.title}
              </span>
              <div className="flex gap-1">
                <button className="w-4 h-4 bg-gray-300 border border-gray-400 shadow-[inset_-1px_-1px_0_0_#808080,inset_1px_1px_0_0_#fff] text-xs flex items-center justify-center">
                  _
                </button>
                <button className="w-4 h-4 bg-gray-300 border border-gray-400 shadow-[inset_-1px_-1px_0_0_#808080,inset_1px_1px_0_0_#fff] text-xs flex items-center justify-center">
                  □
                </button>
                <button className="w-4 h-4 bg-gray-300 border border-gray-400 shadow-[inset_-1px_-1px_0_0_#808080,inset_1px_1px_0_0_#fff] text-xs flex items-center justify-center font-bold">
                  ×
                </button>
              </div>
            </div>

            <div className="p-4">
              {/* Item Image */}
              {item.attachments.find((a) => a.fileType === "IMAGE") && (
                <div className="relative aspect-video border-2 border-gray-400 mb-4 shadow-[inset_2px_2px_0_0_#808080,inset_-2px_-2px_0_0_#fff] overflow-hidden">
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

              {/* Date */}
              {(item.startDate || item.endDate) && (
                <p className="text-xs font-mono text-gray-600 mb-2 bg-gray-100 px-2 py-1 inline-block border border-gray-400">
                  📅{" "}
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
                    : item.startDate && "Present"}
                </p>
              )}

              {/* Descriptions */}
              {item.descriptions && item.descriptions.length > 0 ? (
                <ul className="font-mono text-sm text-gray-700 mb-4 space-y-1">
                  {item.descriptions.map((desc, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span>▸</span>
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                item.description && (
                  <p className="font-mono text-sm text-gray-700 mb-4">
                    {item.description}
                  </p>
                )
              )}

              {/* Tech Stack */}
              {item.techStack && item.techStack.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-4">
                  {item.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-teal-600 text-white font-mono text-xs border border-teal-800"
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
            </div>
          </article>
        ))}
      </div>
    );
  };

  const renderHomePage = () => (
    <div className="space-y-4">
      {/* Main Window */}
      <section className="bg-gray-200 border-2 border-gray-400 shadow-[inset_-2px_-2px_0_0_#808080,inset_2px_2px_0_0_#fff] animate-[scaleIn_0.5s_ease-out]">
        {/* Title Bar */}
        <div className="bg-gradient-to-r from-blue-800 to-blue-600 px-2 py-1 flex items-center justify-between">
          <span className="text-white font-bold text-sm flex items-center gap-2">
            👤 About Me - {profile.fullName || profile.username}
          </span>
          <div className="flex gap-1">
            <button className="w-4 h-4 bg-gray-300 border border-gray-400 shadow-[inset_-1px_-1px_0_0_#808080,inset_1px_1px_0_0_#fff] text-xs">
              _
            </button>
            <button className="w-4 h-4 bg-gray-300 border border-gray-400 shadow-[inset_-1px_-1px_0_0_#808080,inset_1px_1px_0_0_#fff] text-xs">
              □
            </button>
            <button className="w-4 h-4 bg-gray-300 border border-gray-400 shadow-[inset_-1px_-1px_0_0_#808080,inset_1px_1px_0_0_#fff] text-xs font-bold">
              ×
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* Avatar */}
            {profile.avatarUrl && (
              <div className="relative w-36 h-36 border-2 border-gray-400 flex-shrink-0 shadow-[inset_2px_2px_0_0_#808080,inset_-2px_-2px_0_0_#fff] overflow-hidden bg-teal-900">
                <Image
                  src={profile.avatarUrl}
                  alt={profile.fullName || profile.username}
                  fill
                  className={`object-cover ${glitch ? "translate-x-1" : ""} transition-transform`}
                />
                {glitch && (
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/30 via-transparent to-cyan-500/30" />
                )}
              </div>
            )}

            {/* Info */}
            <div className="flex-1">
              <h2
                className={`text-3xl font-bold mb-2 font-mono ${glitch ? "text-red-500" : "text-gray-800"}`}
              >
                {profile.fullName || profile.username}
              </h2>
              <p className="text-lg font-mono text-purple-700 mb-4 flex items-center gap-2">
                <FaGamepad className="animate-bounce" />
                {profile.title?.toUpperCase().replace(/ /g, "_") + ".exe"}
              </p>
              {profile.bio && (
                <div className="bg-black text-green-400 p-4 font-mono text-sm mb-4 border-2 border-gray-400 shadow-[inset_2px_2px_0_0_#000]">
                  <p className="typing-effect">
                    C:\Users\{profile.username}&gt; {profile.bio}_
                  </p>
                </div>
              )}

              {/* Contact Info */}
              <div className="flex flex-wrap gap-2 mb-4">
                {profile.location && (
                  <span className="flex items-center gap-2 px-3 py-1 bg-gray-300 border border-gray-400 font-mono text-sm shadow-[inset_-1px_-1px_0_0_#808080,inset_1px_1px_0_0_#fff]">
                    📍 {profile.location}
                  </span>
                )}
                {profile.phone && (
                  <span className="flex items-center gap-2 px-3 py-1 bg-gray-300 border border-gray-400 font-mono text-sm shadow-[inset_-1px_-1px_0_0_#808080,inset_1px_1px_0_0_#fff]">
                    📞 {profile.phone}
                  </span>
                )}
              </div>

              {/* Social Links */}
              <div className="flex gap-2">
                {profile.socialLinks?.github && (
                  <a
                    href={profile.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-300 border-2 border-gray-400 shadow-[inset_-2px_-2px_0_0_#808080,inset_2px_2px_0_0_#fff] flex items-center justify-center text-gray-700 hover:bg-gray-400 active:shadow-[inset_2px_2px_0_0_#808080,inset_-2px_-2px_0_0_#fff]"
                  >
                    <FaGithub className="text-xl" />
                  </a>
                )}
                {profile.socialLinks?.linkedin && (
                  <a
                    href={profile.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-300 border-2 border-gray-400 shadow-[inset_-2px_-2px_0_0_#808080,inset_2px_2px_0_0_#fff] flex items-center justify-center text-blue-600 hover:bg-gray-400 active:shadow-[inset_2px_2px_0_0_#808080,inset_-2px_-2px_0_0_#fff]"
                  >
                    <FaLinkedin className="text-xl" />
                  </a>
                )}
                {profile.socialLinks?.twitter && (
                  <a
                    href={profile.socialLinks.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-300 border-2 border-gray-400 shadow-[inset_-2px_-2px_0_0_#808080,inset_2px_2px_0_0_#fff] flex items-center justify-center text-cyan-500 hover:bg-gray-400 active:shadow-[inset_2px_2px_0_0_#808080,inset_-2px_-2px_0_0_#fff]"
                  >
                    <FaTwitter className="text-xl" />
                  </a>
                )}
                {profile.socialLinks?.instagram && (
                  <a
                    href={profile.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-300 border-2 border-gray-400 shadow-[inset_-2px_-2px_0_0_#808080,inset_2px_2px_0_0_#fff] flex items-center justify-center text-pink-500 hover:bg-gray-400 active:shadow-[inset_2px_2px_0_0_#808080,inset_-2px_-2px_0_0_#fff]"
                  >
                    <FaInstagram className="text-xl" />
                  </a>
                )}
                {profile.socialLinks?.website && (
                  <a
                    href={profile.socialLinks.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-300 border-2 border-gray-400 shadow-[inset_-2px_-2px_0_0_#808080,inset_2px_2px_0_0_#fff] flex items-center justify-center text-green-600 hover:bg-gray-400 active:shadow-[inset_2px_2px_0_0_#808080,inset_-2px_-2px_0_0_#fff]"
                  >
                    <FaGlobe className="text-xl" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Skills */}
          {profile.skills && profile.skills.length > 0 && (
            <div className="mt-6 pt-6 border-t-2 border-gray-400">
              <h3 className="font-mono font-bold text-gray-700 mb-3 flex items-center gap-2">
                💾 SKILLS.dat
              </h3>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-purple-600 text-white font-mono text-sm border-2 border-purple-800 hover:bg-purple-700 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Statistics */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "PROJECTS",
            count: projects.length,
            page: "projects" as PageType,
            emoji: "📁",
          },
          {
            label: "WORK",
            count: experiences.length,
            page: "experience" as PageType,
            emoji: "💼",
          },
          {
            label: "SCHOOL",
            count: education.length,
            page: "education" as PageType,
            emoji: "🎓",
          },
          {
            label: "CERTS",
            count: certificates.length,
            page: "certificates" as PageType,
            emoji: "📜",
          },
        ].map((stat, index) => (
          <button
            key={stat.label}
            onClick={() => setActivePage(stat.page)}
            className="bg-gray-200 border-2 border-gray-400 shadow-[inset_-2px_-2px_0_0_#808080,inset_2px_2px_0_0_#fff] p-4 text-center hover:bg-gray-300 active:shadow-[inset_2px_2px_0_0_#808080,inset_-2px_-2px_0_0_#fff] animate-[scaleIn_0.5s_ease-out]"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="text-3xl mb-1">{stat.emoji}</div>
            <div className="text-2xl font-bold font-mono text-blue-800">
              {stat.count}
            </div>
            <div className="text-xs font-mono text-gray-600">{stat.label}</div>
          </button>
        ))}
      </section>
    </div>
  );

  return (
    <div
      className="min-h-screen bg-teal-700 font-mono"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg width='8' height='8' viewBox='0 0 8 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='4' height='4' fill='%23006666'/%3E%3Crect x='4' y='4' width='4' height='4' fill='%23006666'/%3E%3C/svg%3E\")",
      }}
    >
      {/* Scanlines */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-10 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.3)_2px,rgba(0,0,0,0.3)_4px)]" />

      {/* Taskbar */}
      <header className="bg-gray-300 border-t-2 border-white border-b-2 border-b-gray-500 sticky top-0 z-40">
        <div className="flex items-center justify-between px-1.5 md:px-2 py-0.5 flex-wrap gap-1 md:gap-2">
          {/* Start Menu */}
          <div className="flex items-center gap-2 flex-wrap">
            <button className="px-1.5 md:px-3 py-0.5 bg-gray-300 border border-gray-400 shadow-[inset_-1px_-1px_0_0_#808080,inset_1px_1px_0_0_#fff] font-bold flex items-center gap-0.5 md:gap-1 hover:bg-gray-400 active:shadow-[inset_1px_1px_0_0_#808080,inset_-1px_-1px_0_0_#fff] text-xs md:text-sm">
              <span className="text-base md:text-lg">🪟</span>
              <span className="hidden sm:inline">Start</span>
            </button>

            {/* Quick Launch - Hidden on mobile, shown on tablet+ */}
            <div className="hidden sm:flex border-l border-gray-500 border-r border-white pl-1 gap-0.5 md:gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActivePage(item.id)}
                    className={`px-2 md:px-3 py-1 border-2 border-gray-400 font-mono text-xs md:text-sm flex items-center gap-1 ${
                      activePage === item.id
                        ? "bg-gray-400 shadow-[inset_2px_2px_0_0_#808080,inset_-2px_-2px_0_0_#fff]"
                        : "bg-gray-300 shadow-[inset_-2px_-2px_0_0_#808080,inset_2px_2px_0_0_#fff] hover:bg-gray-400"
                    }`}
                    title={item.label}
                  >
                    <Icon />
                    <span className="hidden md:inline">
                      {item.label.replace(".exe", "")}
                    </span>
                    {item.count !== undefined && item.count > 0 && (
                      <span className="text-xs bg-blue-800 text-white px-1">
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile Menu Toggle - Show on mobile/tablet */}
          <button
            onClick={() => setActivePage(activePage)}
            className="sm:hidden px-2 py-0.5 bg-gray-300 border border-gray-400 shadow-[inset_-1px_-1px_0_0_#808080,inset_1px_1px_0_0_#fff] font-bold text-xs hover:bg-gray-400"
          >
            ≡
          </button>

          {/* System Tray */}
          <div className="flex items-center gap-1 border border-gray-400 shadow-[inset_1px_1px_0_0_#808080,inset_-1px_-1px_0_0_#fff] px-1.5 py-0.5 bg-gray-200">
            <span className="text-sm hidden sm:inline">🔊</span>
            <span className="font-mono text-xs">
              {time.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        </div>

        {/* Mobile Apps Menu - Dropdown untuk mobile/tablet */}
        <div className="sm:hidden bg-gray-300 border-t border-white px-1.5 py-1 flex flex-wrap gap-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`px-2 py-1 border-2 border-gray-400 font-mono text-xs flex items-center gap-1 flex-1 ${
                  activePage === item.id
                    ? "bg-gray-400 shadow-[inset_2px_2px_0_0_#808080,inset_-2px_-2px_0_0_#fff]"
                    : "bg-gray-300 shadow-[inset_-2px_-2px_0_0_#808080,inset_2px_2px_0_0_#fff] hover:bg-gray-400"
                }`}
                title={item.label}
              >
                <Icon />
                <span className="truncate">
                  {item.label.replace(".exe", "")}
                </span>
                {item.count !== undefined && item.count > 0 && (
                  <span className="text-xs bg-blue-800 text-white px-1 ml-auto">
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        {activePage === "home" && renderHomePage()}
        {activePage === "projects" && (
          <div>
            <div className="bg-gray-200 border-2 border-gray-400 shadow-[inset_-2px_-2px_0_0_#808080,inset_2px_2px_0_0_#fff] px-4 py-2 mb-4 inline-block">
              <h2 className="font-bold font-mono text-gray-800 flex items-center gap-2">
                📁 C:\Portfolio\Projects
              </h2>
            </div>
            {renderItems(projects)}
          </div>
        )}
        {activePage === "experience" && (
          <div>
            <div className="bg-gray-200 border-2 border-gray-400 shadow-[inset_-2px_-2px_0_0_#808080,inset_2px_2px_0_0_#fff] px-4 py-2 mb-4 inline-block">
              <h2 className="font-bold font-mono text-gray-800 flex items-center gap-2">
                💼 C:\Portfolio\Experience
              </h2>
            </div>
            {renderItems(experiences)}
          </div>
        )}
        {activePage === "education" && (
          <div>
            <div className="bg-gray-200 border-2 border-gray-400 shadow-[inset_-2px_-2px_0_0_#808080,inset_2px_2px_0_0_#fff] px-4 py-2 mb-4 inline-block">
              <h2 className="font-bold font-mono text-gray-800 flex items-center gap-2">
                🎓 C:\Portfolio\Education
              </h2>
            </div>
            {renderItems(education)}
          </div>
        )}
        {activePage === "certificates" && (
          <div>
            <div className="bg-gray-200 border-2 border-gray-400 shadow-[inset_-2px_-2px_0_0_#808080,inset_2px_2px_0_0_#fff] px-4 py-2 mb-4 inline-block">
              <h2 className="font-bold font-mono text-gray-800 flex items-center gap-2">
                📜 C:\Portfolio\Certificates
              </h2>
            </div>
            {renderItems(certificates)}
          </div>
        )}
      </main>

      {/* Desktop Icons (decorative) */}
      <div className="fixed bottom-20 right-4 flex flex-col gap-4 z-10">
        <div className="flex flex-col items-center cursor-pointer hover:bg-teal-600/50 p-2 rounded">
          <span className="text-4xl">🗑️</span>
          <span className="text-white text-xs font-mono text-shadow">
            Recycle Bin
          </span>
        </div>
        <div className="flex flex-col items-center cursor-pointer hover:bg-teal-600/50 p-2 rounded">
          <span className="text-4xl">💾</span>
          <span className="text-white text-xs font-mono text-shadow">
            My Files
          </span>
        </div>
      </div>
    </div>
  );
}
