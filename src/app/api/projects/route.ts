import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

// Helper function to check admin authentication
async function checkAuth() {
  const session = await getServerSession();
  return session?.user?.role === "admin";
}

// GET - Retrieve all projects
export async function GET() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projectRoutes`
    );

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`);
    }

    const projects = await response.json();
    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error fetching projects from backend:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

// POST - Create a new project
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const isAuth = await checkAuth();
    if (!isAuth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const projectData = await request.json();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projectRoutes`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      }
    );

    if (!response.ok) {
      throw new Error(`Backend responded with status: ${response.status}`);
    }

    const newProject = await response.json();
    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error("Error creating project in backend:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
