"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import { useAuth } from "@/hooks/useAuth";
import { useCloudinary } from "@/hooks/useCloudinary";
import {
  FaUser,
  FaCamera,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaGlobe,
  FaLaptopCode,
  FaBriefcase,
  FaTimes,
} from "react-icons/fa";

export default function ProfilePage() {
  const { user, updateUser, refreshUser } = useAuth();
  const { uploadFile, isUploading } = useCloudinary();

  const [formData, setFormData] = useState({
    fullName: "",
    bio: "",
    title: "",
    phone: "",
    location: "",
    skills: [] as string[],
    socialLinks: {
      github: "",
      linkedin: "",
      twitter: "",
      instagram: "",
      website: "",
    },
  });
  const [skillInput, setSkillInput] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        bio: user.bio || "",
        title: user.title || "",
        phone: user.phone || "",
        location: user.location || "",
        skills: user.skills || [],
        socialLinks: {
          github: user.socialLinks?.github || "",
          linkedin: user.socialLinks?.linkedin || "",
          twitter: user.socialLinks?.twitter || "",
          instagram: user.socialLinks?.instagram || "",
          website: user.socialLinks?.website || "",
        },
      });
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSocialChange = (platform: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [platform]: value },
    }));
  };

  const addSkill = () => {
    if (!skillInput.trim()) return;
    if (!formData.skills.includes(skillInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()],
      }));
    }
    setSkillInput("");
  };

  const removeSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }));
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const result = await uploadFile(file);

      // Save to database
      const res = await fetch("/api/me", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ avatarUrl: result.url }),
        credentials: "include",
      });

      if (res.ok) {
        updateUser({ avatarUrl: result.url });
        setMessage("Avatar updated successfully!");
      }
    } catch (error) {
      setMessage("Failed to upload avatar");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage("");

    try {
      const res = await fetch("/api/me", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (res.ok) {
        await refreshUser();
        setMessage("Profile updated successfully!");
      } else {
        const data = await res.json();
        setMessage(data.error || "Failed to update profile");
      }
    } catch (error) {
      setMessage("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Sidebar>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Profile Settings
          </h1>
          <p className="text-gray-600 mt-1">Manage your personal information</p>
        </div>

        {message && (
          <div
            className={`mb-6 px-4 py-3 rounded-lg ${
              message.includes("success")
                ? "bg-green-50 text-green-600"
                : "bg-red-50 text-red-600"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Avatar Section */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Profile Photo</h2>
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                  {user?.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt={user.fullName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FaUser className="w-10 h-10 text-gray-400" />
                  )}
                </div>
                <label className="absolute bottom-0 right-0 w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-800">
                  <FaCamera className="w-4 h-4 text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                    disabled={isUploading}
                  />
                </label>
              </div>
              <div>
                <p className="font-medium">
                  {user?.fullName || user?.username}
                </p>
                <p className="text-sm text-gray-500">@{user?.username}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {isUploading
                    ? "Uploading..."
                    : "Click camera icon to change photo"}
                </p>
              </div>
            </div>
          </div>

          {/* Basic Info */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <label className="label">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="input"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="label">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="input min-h-[100px]"
                  placeholder="Tell us about yourself..."
                  maxLength={500}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.bio.length}/500 characters
                </p>
              </div>

              <div>
                <label className="label">Title / Position</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  placeholder="e.g. Full Stack Developer, Product Designer, etc."
                  className="input input-bordered w-full"
                  maxLength={100}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.title.length}/100 characters
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="label">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="input"
                    placeholder="+62 812 3456 7890"
                  />
                </div>
                <div>
                  <label className="label">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="input"
                    placeholder="Jakarta, Indonesia"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Skills</h2>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addSkill())
                }
                className="input flex-1"
                placeholder="e.g., JavaScript, Project Management"
              />
              <button
                type="button"
                onClick={addSkill}
                className="btn btn-secondary"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.skills.map((skill) => (
                <span
                  key={skill}
                  className="badge badge-primary flex items-center gap-1 py-1.5 px-3"
                >
                  {skill}
                  <button type="button" onClick={() => removeSkill(skill)}>
                    <FaTimes className="w-3 h-3" />
                  </button>
                </span>
              ))}
              {formData.skills.length === 0 && (
                <p className="text-sm text-gray-500">No skills added yet</p>
              )}
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Social Links</h2>
            <div className="space-y-4">
              <div>
                <label className="label flex items-center gap-2">
                  <FaGithub className="w-4 h-4" /> GitHub
                </label>
                <input
                  type="url"
                  value={formData.socialLinks.github}
                  onChange={(e) => handleSocialChange("github", e.target.value)}
                  className="input"
                  placeholder="https://github.com/username"
                />
              </div>
              <div>
                <label className="label flex items-center gap-2">
                  <FaLinkedin className="w-4 h-4" /> LinkedIn
                </label>
                <input
                  type="url"
                  value={formData.socialLinks.linkedin}
                  onChange={(e) =>
                    handleSocialChange("linkedin", e.target.value)
                  }
                  className="input"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
              <div>
                <label className="label flex items-center gap-2">
                  <FaTwitter className="w-4 h-4" /> Twitter
                </label>
                <input
                  type="url"
                  value={formData.socialLinks.twitter}
                  onChange={(e) =>
                    handleSocialChange("twitter", e.target.value)
                  }
                  className="input"
                  placeholder="https://twitter.com/username"
                />
              </div>
              <div>
                <label className="label flex items-center gap-2">
                  <FaInstagram className="w-4 h-4" /> Instagram
                </label>
                <input
                  type="url"
                  value={formData.socialLinks.instagram}
                  onChange={(e) =>
                    handleSocialChange("instagram", e.target.value)
                  }
                  className="input"
                  placeholder="https://instagram.com/username"
                />
              </div>
              <div>
                <label className="label flex items-center gap-2">
                  <FaGlobe className="w-4 h-4" /> Website
                </label>
                <input
                  type="url"
                  value={formData.socialLinks.website}
                  onChange={(e) =>
                    handleSocialChange("website", e.target.value)
                  }
                  className="input"
                  placeholder="https://yourwebsite.com"
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="btn btn-primary py-3 px-8 disabled:opacity-50"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </Sidebar>
  );
}
