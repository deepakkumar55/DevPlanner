import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Progress from "@/lib/Model/Progress.Model";
import { getAuthenticatedUser } from "@/middleware/auth";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getAuthenticatedUser(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const progress = await Progress.findOne({ _id: params.id, userId: user.id });

    if (!progress) {
      return NextResponse.json({ error: "Progress entry not found" }, { status: 404 });
    }

    return NextResponse.json({ progress }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getAuthenticatedUser(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    await connectDB();

    const progress = await Progress.findOneAndUpdate(
      { _id: params.id, userId: user.id },
      body,
      { new: true }
    );

    if (!progress) {
      return NextResponse.json({ error: "Progress entry not found" }, { status: 404 });
    }

    return NextResponse.json({ progress }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getAuthenticatedUser(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const progress = await Progress.findOneAndDelete({ _id: params.id, userId: user.id });

    if (!progress) {
      return NextResponse.json({ error: "Progress entry not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Progress entry deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
