"use client";

import { useState, useRef } from "react";
import { ThemeProps, PortfolioItem } from "./types";
import { FaDownload, FaSpinner, FaMapMarkerAlt, FaEnvelope, FaPhone, FaGlobe, FaLinkedin, FaGithub } from "react-icons/fa";

export function PDFExportButton({ profile, items, theme }: ThemeProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const pdfContainerRef = useRef<HTMLDivElement>(null);

  const projects = items.filter((item) => item.category === "PROJECT");
  const experiences = items.filter((item) => item.category === "EXPERIENCE");
  const education = items.filter((item) => item.category === "EDUCATION");
  const certificates = items.filter((item) => item.category === "CERTIFICATE");

  // Chunking with much smaller numbers to prevent overlapping and ensure neatness
  const chunkArray = (arr: any[], size: number) => {
    const chunked = [];
    for (let i = 0; i < arr.length; i += size) {
      chunked.push(arr.slice(i, i + size));
    }
    return chunked;
  };

  const projectPages = chunkArray(projects, 2); // ONLY 2 projects per slide
  const experiencePages = chunkArray(experiences, 2); // ONLY 2 experiences per slide
  const eduCertPages = chunkArray([...education, ...certificates], 3); // 3 edu/certs per slide

  const handleDownload = async () => {
    if (!pdfContainerRef.current) return;
    
    setIsGenerating(true);
    
    try {
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");

      const slides = pdfContainerRef.current.querySelectorAll('.pdf-slide');
      
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [1280, 720]
      });

      for (let i = 0; i < slides.length; i++) {
        const slide = slides[i] as HTMLElement;
        
        const canvas = await html2canvas(slide, {
          scale: 2,
          useCORS: true,
          logging: false,
          width: 1280,
          height: 720,
          windowWidth: 1280,
          windowHeight: 720
        });

        const imgData = canvas.toDataURL("image/jpeg", 0.95);
        
        if (i > 0) {
          pdf.addPage([1280, 720], "landscape");
        }
        
        pdf.addImage(imgData, "JPEG", 0, 0, 1280, 720);
      }

      pdf.save(`${profile.fullName || profile.username}_Portfolio.pdf`);
    } catch (error) {
      console.error("Failed to generate PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Simplified style extraction
  const bgClass = theme.styles.container.split(" ").find(c => c.startsWith("bg-")) || "bg-white";

  return (
    <>
      <button
        onClick={handleDownload}
        disabled={isGenerating}
        className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-6 py-3 rounded-full shadow-2xl font-medium transition-all ${theme.styles.button} ${isGenerating ? 'opacity-70 cursor-not-allowed scale-95' : 'hover:scale-105 hover:shadow-xl'}`}
        style={{
          backgroundColor: theme.colors.primary,
          color: theme.colors.background
        }}
      >
        {isGenerating ? <FaSpinner className="animate-spin w-5 h-5" /> : <FaDownload className="w-5 h-5" />}
        {isGenerating ? "Generating Presentation..." : "Download Presentation"}
      </button>

      {/* Hidden Container for PDF Rendering */}
      <div 
        className="fixed top-0 left-0 -z-50 pointer-events-none opacity-0"
        style={{ transform: "translateX(-20000px)" }}
      >
        <div ref={pdfContainerRef}>
          {/* SLIDE 1: Cover (Very Simple & Clean) */}
          <div 
            className={`pdf-slide w-[1280px] h-[720px] flex items-center justify-center p-20 ${theme.fonts.body || "font-sans"} ${bgClass}`}
            style={{ backgroundColor: theme.colors.background, color: theme.colors.text }}
          >
            <div className="w-full h-full border-[12px] p-16 flex items-center gap-16 rounded-3xl" style={{ borderColor: theme.colors.primary }}>
              {profile.avatarUrl && (
                <div className="w-[350px] h-[350px] rounded-full overflow-hidden shrink-0 shadow-lg border-4" style={{ borderColor: theme.colors.primary }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={profile.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex-1 flex flex-col justify-center">
                <span className="text-2xl tracking-widest uppercase font-bold mb-4" style={{ color: theme.colors.secondary }}>
                  Professional Portfolio
                </span>
                <h1 className={`text-7xl font-extrabold mb-4 ${theme.fonts.heading || ""}`} style={{ color: theme.colors.primary }}>
                  {profile.fullName || profile.username}
                </h1>
                <h2 className="text-4xl font-medium opacity-80 mb-8" style={{ color: theme.colors.text }}>
                  {profile.title}
                </h2>
                <div className="w-32 h-2 mb-8" style={{ backgroundColor: theme.colors.secondary }}></div>
                <p className="text-2xl leading-relaxed opacity-90 line-clamp-5" style={{ color: theme.colors.text }}>
                  {profile.bio}
                </p>
              </div>
            </div>
          </div>

          {/* SLIDE 2: About & Skills (Simple 2 Columns) */}
          <div 
            className={`pdf-slide w-[1280px] h-[720px] flex flex-col p-20 ${theme.fonts.body || "font-sans"} ${bgClass}`}
            style={{ backgroundColor: theme.colors.background, color: theme.colors.text }}
          >
            <h2 className={`text-6xl font-extrabold mb-12 border-b-4 pb-4 inline-block ${theme.fonts.heading || ""}`} style={{ color: theme.colors.primary, borderColor: theme.colors.secondary }}>
              Profile Details
            </h2>

            <div className="flex gap-20 flex-1">
              {/* Left Col: Contact */}
              <div className="w-1/2 space-y-12 border-r-4 pr-16" style={{ borderColor: `${theme.colors.primary}20` }}>
                <div>
                  <h3 className="text-4xl font-bold mb-6" style={{ color: theme.colors.secondary }}>Contact</h3>
                  <div className="space-y-6 text-3xl font-medium opacity-90">
                    {profile.email && <div className="flex items-center gap-6"><FaEnvelope /> <span>{profile.email}</span></div>}
                    {profile.phone && <div className="flex items-center gap-6"><FaPhone /> <span>{profile.phone}</span></div>}
                    {profile.location && <div className="flex items-center gap-6"><FaMapMarkerAlt /> <span>{profile.location}</span></div>}
                  </div>
                </div>

                <div>
                  <h3 className="text-4xl font-bold mb-6" style={{ color: theme.colors.secondary }}>Digital Presence</h3>
                  <div className="space-y-6 text-3xl font-medium">
                    {profile.socialLinks?.linkedin && (
                      <div className="flex items-center gap-6">
                        <FaLinkedin className="text-blue-600" /> 
                        <span className="text-blue-600 underline truncate">{profile.socialLinks.linkedin.replace('https://', '').replace('www.', '')}</span>
                      </div>
                    )}
                    {profile.socialLinks?.github && (
                      <div className="flex items-center gap-6">
                        <FaGithub className="text-gray-600" /> 
                        <span className="text-blue-600 underline truncate">{profile.socialLinks.github.replace('https://', '').replace('www.', '')}</span>
                      </div>
                    )}
                    {profile.socialLinks?.website && (
                      <div className="flex items-center gap-6">
                        <FaGlobe className="text-green-600" /> 
                        <span className="text-blue-600 underline truncate">{profile.socialLinks.website.replace('https://', '').replace('www.', '')}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Col: Skills */}
              <div className="w-1/2">
                <h3 className="text-4xl font-bold mb-8" style={{ color: theme.colors.secondary }}>Core Competencies</h3>
                <div className="flex flex-wrap gap-4">
                  {profile.skills?.map((skill, i) => (
                    <span 
                      key={i} 
                      className="px-6 py-4 rounded-lg text-3xl font-semibold shadow-sm"
                      style={{ 
                        backgroundColor: theme.colors.primary, 
                        color: theme.colors.background 
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* SLIDES 3+: Projects (ONLY 2 PER PAGE) */}
          {projectPages.map((pageProjects, pageIdx) => (
            <div 
              key={`projects-${pageIdx}`}
              className={`pdf-slide w-[1280px] h-[720px] flex flex-col p-20 ${theme.fonts.body || "font-sans"} ${bgClass}`}
              style={{ backgroundColor: theme.colors.background, color: theme.colors.text }}
            >
              <h2 className={`text-6xl font-extrabold mb-12 border-b-4 pb-4 inline-block ${theme.fonts.heading || ""}`} style={{ color: theme.colors.primary, borderColor: theme.colors.secondary }}>
                Featured Projects {projectPages.length > 1 ? `(${pageIdx + 1})` : ''}
              </h2>

              <div className="grid grid-cols-2 gap-12 flex-1">
                {pageProjects.map((project, i) => {
                  const image = project.attachments.find(a => a.fileType === "IMAGE");
                  const link = project.attachments.find(a => a.fileType === "LINK");
                  return (
                    <div key={i} className="flex flex-col h-[480px]">
                      {image && (
                        <div className="w-full h-56 rounded-t-2xl overflow-hidden shrink-0 border-t-4 border-x-4 border-b border-gray-200" style={{ borderColor: theme.colors.primary }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={image.url} alt={project.title} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div className="p-8 flex-1 flex flex-col border-x-4 border-b-4 border-gray-200 rounded-b-2xl shadow-sm" style={{ borderColor: theme.colors.primary }}>
                        <h3 className="text-4xl font-bold mb-3" style={{ color: theme.colors.primary }}>{project.title}</h3>
                        {link && (
                          <div className="text-xl text-blue-600 underline line-clamp-1 mb-4">
                            {link.url.startsWith('http') ? link.url : `https://${link.url}`}
                          </div>
                        )}
                        <p className="text-2xl opacity-90 line-clamp-4 flex-1">{project.description}</p>
                        
                        {project.techStack?.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t-2" style={{ borderColor: `${theme.colors.primary}20` }}>
                            {project.techStack.slice(0, 5).map((tech, ti) => (
                              <span key={ti} className="text-lg font-bold uppercase tracking-wider px-3 py-1 bg-gray-200 rounded" style={{ color: theme.colors.primary }}>
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* SLIDES 4+: Experience (ONLY 2 PER PAGE) */}
          {experiencePages.length > 0 && experiencePages.map((pageExp, pageIdx) => (
            <div 
              key={`exp-${pageIdx}`}
              className={`pdf-slide w-[1280px] h-[720px] flex flex-col p-20 ${theme.fonts.body || "font-sans"} ${bgClass}`}
              style={{ backgroundColor: theme.colors.background, color: theme.colors.text }}
            >
              <h2 className={`text-6xl font-extrabold mb-12 border-b-4 pb-4 inline-block ${theme.fonts.heading || ""}`} style={{ color: theme.colors.primary, borderColor: theme.colors.secondary }}>
                Professional Experience {experiencePages.length > 1 ? `(${pageIdx + 1})` : ''}
              </h2>

              <div className="flex-1 flex flex-col justify-center gap-16">
                {pageExp.map((exp, i) => (
                  <div key={i} className="flex gap-10">
                    {/* Time Column */}
                    <div className="w-1/4 shrink-0 text-right pt-2 border-r-8 pr-10" style={{ borderColor: theme.colors.secondary }}>
                      <span className="text-3xl font-black" style={{ color: theme.colors.primary }}>
                        {exp.startDate ? new Date(exp.startDate).getFullYear() : ""}
                      </span>
                      <span className="text-3xl font-black opacity-50 block" style={{ color: theme.colors.primary }}>
                        to {exp.endDate ? new Date(exp.endDate).getFullYear() : "Present"}
                      </span>
                    </div>
                    {/* Detail Column */}
                    <div className="flex-1">
                      <h3 className="text-4xl font-bold mb-4" style={{ color: theme.colors.primary }}>{exp.title}</h3>
                      {exp.descriptions?.length > 0 ? (
                        <ul className="text-2xl opacity-90 space-y-3 list-disc list-inside leading-relaxed">
                          {exp.descriptions.slice(0, 4).map((desc, di) => (
                            <li key={di}>{desc}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-2xl opacity-90 leading-relaxed line-clamp-4">{exp.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* SLIDES 5+: Education & Certificates (ONLY 3 PER PAGE) */}
          {eduCertPages.length > 0 && eduCertPages.map((pageEdu, pageIdx) => (
            <div 
              key={`edu-${pageIdx}`}
              className={`pdf-slide w-[1280px] h-[720px] flex flex-col p-20 ${theme.fonts.body || "font-sans"} ${bgClass}`}
              style={{ backgroundColor: theme.colors.background, color: theme.colors.text }}
            >
              <h2 className={`text-6xl font-extrabold mb-12 border-b-4 pb-4 inline-block ${theme.fonts.heading || ""}`} style={{ color: theme.colors.primary, borderColor: theme.colors.secondary }}>
                Education & Certifications
              </h2>

              <div className="flex-1 grid grid-cols-1 gap-10">
                {pageEdu.map((item, i) => {
                  const link = item.attachments?.find(a => a.fileType === "LINK" || a.fileType === "PDF");
                  return (
                    <div key={i} className="flex gap-8 items-center bg-white shadow-md p-8 rounded-2xl border-l-8" style={{ borderColor: theme.colors.primary }}>
                      <div className="flex flex-col justify-center items-center w-40 shrink-0 border-r-2 pr-8" style={{ borderColor: `${theme.colors.primary}20` }}>
                        <span className="text-2xl font-bold opacity-60 text-center uppercase tracking-widest">{item.category}</span>
                        <span className="text-3xl font-black mt-2" style={{ color: theme.colors.secondary }}>
                          {item.endDate ? new Date(item.endDate).getFullYear() : (item.startDate ? new Date(item.startDate).getFullYear() : "")}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-4xl font-bold mb-2" style={{ color: theme.colors.primary }}>{item.title}</h3>
                        {link && (
                          <div className="text-xl text-blue-600 underline line-clamp-1 mb-2">
                            {link.url.startsWith('http') ? link.url : `https://${link.url}`}
                          </div>
                        )}
                        <p className="text-2xl opacity-90 line-clamp-2">{item.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

        </div>
      </div>
    </>
  );
}
