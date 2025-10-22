import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function GET() {
  try {
    const quizFile = path.join(process.cwd(), "src/data/quiz.json");
    const data = await fs.readFile(quizFile, "utf-8");
    const quizData = JSON.parse(data);

    return NextResponse.json(quizData);
  } catch (error) {
    console.error("Error reading quiz data:", error);
    return NextResponse.json(
      { error: "Failed to load quiz data" },
      { status: 500 }
    );
  }
}
