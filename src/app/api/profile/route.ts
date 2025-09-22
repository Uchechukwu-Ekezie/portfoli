import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import fs from "fs/promises";
import path from "path";

const PROFILE_FILE = path.join(process.cwd(), "src/data/profile.json");

// Helper function to check admin authentication
async function checkAuth() {
  const session = await getServerSession();
  return session?.user?.role === "admin";
}

// Helper function to read profile data
async function readProfileData() {
  try {
    const data = await fs.readFile(PROFILE_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading profile data:", error);
    return {};
  }
}

// Helper function to write profile data
async function writeProfileData(data: Record<string, unknown>) {
  try {
    await fs.writeFile(PROFILE_FILE, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error("Error writing profile data:", error);
    return false;
  }
}

// GET - Retrieve profile data
export async function GET() {
  try {
    const data = await readProfileData();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}

// PUT - Update profile data
export async function PUT(request: NextRequest) {
  try {
    // Check authentication
    const isAuth = await checkAuth();
    if (!isAuth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const profileData = await request.json();
    const currentData = await readProfileData();

    const updatedData = {
      ...currentData,
      ...profileData,
      updatedAt: new Date().toISOString(),
    };

    const success = await writeProfileData(updatedData);
    if (!success) {
      return NextResponse.json(
        { error: "Failed to update profile" },
        { status: 500 }
      );
    }

    return NextResponse.json(updatedData);
  } catch {
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}