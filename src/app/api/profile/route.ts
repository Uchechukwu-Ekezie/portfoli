import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

// Force dynamic rendering - don't try to statically generate this API route
export const dynamic = 'force-dynamic';

// Helper function to check admin authentication
async function checkAuth() {
  const session = await getServerSession();
  return session?.user?.role === "admin";
}

// GET - Retrieve profile data
export async function GET() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/profileRoutes`
    );

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`);
    }

    const profile = await response.json();
    return NextResponse.json(profile);
  } catch (error) {
    console.error("Error fetching profile from backend:", error);
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

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/profileRoutes`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      }
    );

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`);
    }

    const updatedProfile = await response.json();
    return NextResponse.json(updatedProfile);
  } catch (error) {
    console.error("Error updating profile in backend:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
