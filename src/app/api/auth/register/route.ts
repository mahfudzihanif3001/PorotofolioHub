import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/db";
import User from "@/models/User";
import { signToken, setAuthCookie } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { username, email, password } = body;

    // Validation
    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "Username, email, and password are required" },
        { status: 400 },
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 },
      );
    }

    // Check username format
    const usernameRegex = /^[a-z0-9_-]+$/;
    if (!usernameRegex.test(username.toLowerCase())) {
      return NextResponse.json(
        {
          error:
            "Username can only contain lowercase letters, numbers, hyphens, and underscores",
        },
        { status: 400 },
      );
    }

    // Check if user exists
    const existingUser = await User.findOne({
      $or: [
        { email: email.toLowerCase() },
        { username: username.toLowerCase() },
      ],
    });

    if (existingUser) {
      if (existingUser.email === email.toLowerCase()) {
        return NextResponse.json(
          { error: "Email already registered" },
          { status: 400 },
        );
      }
      if (existingUser.username === username.toLowerCase()) {
        return NextResponse.json(
          { error: "Username already taken" },
          { status: 400 },
        );
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await User.create({
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    // Generate token
    const token = signToken({
      userId: user._id.toString(),
      username: user.username,
      email: user.email,
      isSuperAdmin: user.isSuperAdmin,
    });

    // Set cookie
    await setAuthCookie(token);

    return NextResponse.json(
      {
        message: "Registration successful",
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          selectedTheme: user.selectedTheme,
        },
      },
      { status: 201 },
    );
  } catch (error: unknown) {
    console.error("Registration error:", error);

    if (error instanceof Error && error.name === "ValidationError") {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
