import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Load environment variables
import * as dotenv from "dotenv";
dotenv.config();

// User Schema (inline to avoid import issues)
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    fullName: { type: String, default: "" },
    roleType: { type: String, enum: ["IT", "NON_IT"], default: "IT" },
    bio: { type: String, default: "" },
    selectedTheme: {
      type: String,
      enum: ["minimalist", "cyberpunk", "corporate", "creative", "newspaper"],
      default: "minimalist",
    },
    avatarUrl: { type: String, default: "" },
    isSuperAdmin: { type: Boolean, default: false },
    socialLinks: {
      github: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      twitter: { type: String, default: "" },
      instagram: { type: String, default: "" },
      website: { type: String, default: "" },
    },
    phone: { type: String, default: "" },
    location: { type: String, default: "" },
    skills: [{ type: String }],
  },
  { timestamps: true },
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

async function seedAdmin() {
  const mongoUri = process.env.MONGODB_URI;
  const adminEmail = process.env.SUPER_ADMIN_EMAIL || "admin@portfoliohub.com";
  const adminPassword = process.env.SUPER_ADMIN_PASSWORD || "securepassword123";
  const adminUsername = process.env.SUPER_ADMIN_USERNAME || "superadmin";

  if (!mongoUri) {
    console.error("❌ MONGODB_URI is not defined in environment variables");
    process.exit(1);
  }

  try {
    console.log("🔗 Connecting to MongoDB...");
    await mongoose.connect(mongoUri);
    console.log("✅ Connected to MongoDB");

    // Check if admin already exists
    const existingAdmin = await User.findOne({
      $or: [{ email: adminEmail }, { username: adminUsername }],
    });

    if (existingAdmin) {
      console.log("⚠️  Super Admin already exists:");
      console.log(`   Email: ${existingAdmin.email}`);
      console.log(`   Username: ${existingAdmin.username}`);
      console.log("   Skipping creation...");
      await mongoose.disconnect();
      process.exit(0);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(adminPassword, 12);

    // Create Super Admin
    const admin = await User.create({
      username: adminUsername,
      email: adminEmail,
      password: hashedPassword,
      fullName: "Super Admin",
      roleType: "IT",
      bio: "Platform Administrator",
      selectedTheme: "minimalist",
      isSuperAdmin: true,
    });

    console.log("✅ Super Admin created successfully!");
    console.log("   📧 Email:", admin.email);
    console.log("   👤 Username:", admin.username);
    console.log("   🔑 Password:", adminPassword);
    console.log("");
    console.log("⚠️  Please change the password after first login!");

    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding admin:", error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

seedAdmin();
