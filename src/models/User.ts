import mongoose from "mongoose";

export interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  fullName: string;
  title: string;
  bio: string;
  selectedTheme:
    | "minimalist"
    | "cyberpunk"
    | "corporate"
    | "creative"
    | "newspaper"
    | "neobrutalism"
    | "glassmorphism"
    | "biophilic"
    | "y2kretro"
    | "luxury";
  avatarUrl: string;
  isSuperAdmin: boolean;
  // Social Links
  socialLinks: {
    github?: string;
    linkedin?: string;
    email?: string;
    instagram?: string;
    website?: string;
  };
  // Contact
  phone?: string;
  location?: string;
  // Skills (for IT users)
  skills: string[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new mongoose.Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      lowercase: true,
      trim: true,
      minlength: [3, "Username must be at least 3 characters"],
      maxlength: [30, "Username cannot exceed 30 characters"],
      match: [
        /^[a-z0-9_-]+$/,
        "Username can only contain lowercase letters, numbers, hyphens, and underscores",
      ],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    fullName: {
      type: String,
      default: "",
      trim: true,
      maxlength: [100, "Full name cannot exceed 100 characters"],
    },
    title: {
      type: String,
      default: "",
      trim: true,
      maxlength: [100, "Title/Position cannot exceed 100 characters"],
    },
    bio: {
      type: String,
      default: "",
      maxlength: [500, "Bio cannot exceed 500 characters"],
    },
    selectedTheme: {
      type: String,
      enum: [
        "minimalist",
        "cyberpunk",
        "corporate",
        "creative",
        "newspaper",
        "neobrutalism",
        "glassmorphism",
        "biophilic",
        "y2kretro",
        "luxury",
      ],
      default: "minimalist",
    },
    avatarUrl: {
      type: String,
      default: "",
    },
    isSuperAdmin: {
      type: Boolean,
      default: false,
    },
    socialLinks: {
      github: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      email: { type: String, default: "" },
      instagram: { type: String, default: "" },
      website: { type: String, default: "" },
    },
    phone: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
    skills: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  {
    timestamps: true,
  },
);

// Index for faster queries
UserSchema.index({ username: 1 });
UserSchema.index({ email: 1 });

// Delete cached model in development to avoid issues with schema changes
if (process.env.NODE_ENV === "development" && mongoose.models.User) {
  delete mongoose.models.User;
}

export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);
