import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

if (!JWT_SECRET) {
  throw new Error(
    "Please define the JWT_SECRET environment variable inside .env",
  );
}

export interface JWTPayload {
  userId: string;
  username: string;
  email: string;
  isSuperAdmin: boolean;
}

export function signToken(payload: JWTPayload): string {
  return jwt.sign(
    payload,
    JWT_SECRET as string,
    {
      expiresIn: JWT_EXPIRES_IN,
    } as jwt.SignOptions,
  );
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    return null;
  }
}

export async function setAuthCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
}

export async function removeAuthCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("auth_token");
}

export async function getAuthToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token");
  return token?.value || null;
}

export async function getCurrentUser(): Promise<JWTPayload | null> {
  const token = await getAuthToken();
  if (!token) return null;
  return verifyToken(token);
}

export function getTokenFromRequest(request: NextRequest): string | null {
  // Check cookie first
  const cookieToken = request.cookies.get("auth_token")?.value;
  if (cookieToken) return cookieToken;

  // Then check Authorization header
  const authHeader = request.headers.get("Authorization");
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.slice(7);
  }

  return null;
}

export function getUserFromRequest(request: NextRequest): JWTPayload | null {
  const token = getTokenFromRequest(request);
  if (!token) return null;
  return verifyToken(token);
}
