import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Progress from "@/lib/Model/Progress.Model";
import { getAuthenticatedUser } from "@/middleware/auth";

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const limit = parseInt(searchParams.get('limit') || '30');

    await connectDB();

    let query: any = { userId: user.id };
    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const progress = await Progress.find(query)
      .sort({ date: -1 })
      .limit(limit);

    return NextResponse.json({ progress }, { status: 200 });
  } catch (error) {
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
    await connectDB();

    // Check if progress for today exists
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const existingProgress = await Progress.findOne({
      userId: user.id,
      date: today
    });

    if (existingProgress) {
      // Update existing progress
      Object.assign(existingProgress, body);
      await existingProgress.save();
      return NextResponse.json({ progress: existingProgress }, { status: 200 });
    } else {
      // Create new progress
      const progress = await Progress.create({
        userId: user.id,
        date: today,
        ...body
      });
      return NextResponse.json({ progress }, { status: 201 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
