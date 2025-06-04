import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Task from "@/lib/Model/Task.Model";
import { getAuthenticatedUser } from "@/middleware/auth";

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const completed = searchParams.get('completed');
    const category = searchParams.get('category');
    const priority = searchParams.get('priority');

    await connectDB();

    let query: any = { userId: user.id };
    if (completed !== null) query.completed = completed === 'true';
    if (category) query.category = category;
    if (priority) query.priority = priority;

    const tasks = await Task.find(query).sort({ createdAt: -1 });

    return NextResponse.json({ tasks }, { status: 200 });
  } catch (error) {
    console.error("Get tasks error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, description, category, priority, dueDate, estimatedTime } = body;

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    await connectDB();

    const task = await Task.create({
      userId: user.id,
      title,
      description,
      category,
      priority,
      dueDate: dueDate ? new Date(dueDate) : null,
      estimatedTime
    });

    return NextResponse.json({ task }, { status: 201 });
  } catch (error) {
    console.error("Create task error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
