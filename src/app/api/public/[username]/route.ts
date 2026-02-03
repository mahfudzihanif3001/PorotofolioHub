import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import PortfolioItem from "@/models/PortfolioItem";

interface RouteParams {
  params: Promise<{ username: string }>;
}

// GET /api/public/[username] - Get public portfolio data
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    await connectDB();

    const { username } = await params;

    // Find user by username (excluding password and sensitive data)
    const user = await User.findOne({
      username: username.toLowerCase(),
    }).select("-password -isSuperAdmin");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get all visible portfolio items for this user
    const items = await PortfolioItem.find({
      userId: user._id,
      isVisible: true,
    }).sort({ order: 1, createdAt: -1 });

    return NextResponse.json({
      profile: {
        username: user.username,
        fullName: user.fullName,
        bio: user.bio,
        title: user.title,
        selectedTheme: user.selectedTheme,
        avatarUrl: user.avatarUrl,
        socialLinks: user.socialLinks,
        phone: user.phone,
        location: user.location,
        skills: user.skills,
      },
      items,
    });
  } catch (error) {
    console.error("Get public portfolio error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
