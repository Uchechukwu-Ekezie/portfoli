import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import projectsData from "@/data/projects.json";

// Force dynamic rendering - don't try to statically generate this API route
export const dynamic = 'force-dynamic';

// Helper function to check admin authentication
async function checkAuth() {
  const session = await getServerSession(authOptions);
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
    
    // If backend returns empty array or no data, fall back to local projects.json
    if (!projects || projects.length === 0) {
      console.log("Backend returned no projects, falling back to local data");
      return NextResponse.json(projectsData.projects);
    }
    
    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error fetching projects from backend, using local fallback:", error);
    // Return local fallback data instead of error
    return NextResponse.json(projectsData.projects);
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
      const errorText = await response.text();
      console.error(`Backend error (${response.status}):`, errorText);
      
      let errorMessage = `Backend error: ${response.status}`;
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.message || errorJson.error || errorMessage;
      } catch {
        errorMessage = errorText || errorMessage;
      }
      
      return NextResponse.json(
        { error: errorMessage },
        { status: response.status }
      );
    }

    const newProject = await response.json();
    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error("Error creating project in backend:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create project" },
      { status: 500 }
    );
  }
}
