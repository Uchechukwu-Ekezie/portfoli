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

// GET - Retrieve all projects
export async function GET() {
  try {
    const data = await readProjectsData();
    return NextResponse.json(data.projects);
  } catch {
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
    const data = await readProjectsData();

    // Generate new ID
    const newId = (Math.max(...data.projects.map((p: Project) => parseInt(p.id)), 0) + 1).toString();
    
    const newProject = {
      id: newId,
      ...projectData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    data.projects.push(newProject);

    const success = await writeProjectsData(data);
    if (!success) {
      return NextResponse.json(
        { error: "Failed to save project" },
        { status: 500 }
      );
    }

    return NextResponse.json(newProject, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}