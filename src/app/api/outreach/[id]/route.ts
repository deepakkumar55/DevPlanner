import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Outreach from "@/lib/Model/Outreach.Model";
import { getAuthenticatedUser } from "@/middleware/auth";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getAuthenticatedUser(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const outreach = await Outreach.findOne({ _id: params.id, userId: user.id });

    if (!outreach) {
      return NextResponse.json({ error: "Outreach not found" }, { status: 404 });
    }

    return NextResponse.json({ outreach }, { status: 200 });
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

    // Handle status updates with timestamps
    const updateData = { ...body };
    if (body.status === 'opened' && !body.openedAt) {
      updateData.openedAt = new Date();
    }
    if (body.status === 'replied' && !body.repliedAt) {
      updateData.repliedAt = new Date();
    }

    const outreach = await Outreach.findOneAndUpdate(
      { _id: params.id, userId: user.id },
      updateData,
      { new: true }
    );

    if (!outreach) {
      return NextResponse.json({ error: "Outreach not found" }, { status: 404 });
    }

    return NextResponse.json({ outreach }, { status: 200 });
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
    const outreach = await Outreach.findOneAndDelete({ _id: params.id, userId: user.id });

    if (!outreach) {
      return NextResponse.json({ error: "Outreach not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Outreach deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
