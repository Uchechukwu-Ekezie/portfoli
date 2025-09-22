import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import fs from "fs/promises";
import path from "path";

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  status: string;
  slug: string;
  featured: boolean;
  images: string[];
  githubUrl: string;
  liveUrl: string;
  createdAt: string;
  updatedAt: string;
}

interface ProjectsData {
  projects: Project[];
}

const PROJECTS_FILE = path.join(process.cwd(), "src/data/projects.json");

// Helper function to check admin authentication
async function checkAuth() {
  const session = await getServerSession();
  return session?.user?.role === "admin";
}

// Helper function to read projects data
async function readProjectsData(): Promise<ProjectsData> {
  try {
    const data = await fs.readFile(PROJECTS_FILE, "utf-8");
    return JSON.parse(data) as ProjectsData;
  } catch (error) {
    console.error("Error reading projects data:", error);
    return { projects: [] };
  }
}

// Helper function to write projects data
async function writeProjectsData(data: ProjectsData) {
  try {
    await fs.writeFile(PROJECTS_FILE, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error("Error writing projects data:", error);
    return false;
  }
}

// GET - Retrieve a specific project by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await readProjectsData();
    const project = data.projects.find((p: Project) => p.id === params.id);

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(project);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}

// PUT - Update a project
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const isAuth = await checkAuth();
    if (!isAuth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const projectData = await request.json();
    const data = await readProjectsData();

    const projectIndex = data.projects.findIndex((p: Project) => p.id === params.id);
    if (projectIndex === -1) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Update the project
    data.projects[projectIndex] = {
      ...data.projects[projectIndex],
      ...projectData,
      id: params.id, // Ensure ID doesn't change
      updatedAt: new Date().toISOString(),
    };

    const success = await writeProjectsData(data);
    if (!success) {
      return NextResponse.json(
        { error: "Failed to update project" },
        { status: 500 }
      );
    }

    return NextResponse.json(data.projects[projectIndex]);
  } catch {
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}

// DELETE - Delete a project
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const isAuth = await checkAuth();
    if (!isAuth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await readProjectsData();
    const projectIndex = data.projects.findIndex((p: Project) => p.id === params.id);

    if (projectIndex === -1) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Remove the project
    const deletedProject = data.projects.splice(projectIndex, 1)[0];

    const success = await writeProjectsData(data);
    if (!success) {
      return NextResponse.json(
        { error: "Failed to delete project" },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      message: "Project deleted successfully", 
      project: deletedProject 
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}