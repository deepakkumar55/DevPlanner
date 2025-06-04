import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Journal from "@/lib/Model/Journal.Model";
import { getAuthenticatedUser } from "@/middleware/auth";

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    await connectDB();

    const journals = await Journal.find({ userId: user.id })
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Journal.countDocuments({ userId: user.id });

    return NextResponse.json({ 
      journals, 
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total
      }
    }, { status: 200 });
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
    const { content, title, mood, energyLevel, keyLearnings, challenges, wins, goals, gratitude, tomorrowFocus, tags } = body;

    if (!content) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 });
    }

    await connectDB();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if journal for today exists
    const existingJournal = await Journal.findOne({
      userId: user.id,
      date: today
    });

    if (existingJournal) {
      return NextResponse.json({ error: "Journal entry for today already exists" }, { status: 409 });
    }

    const journal = await Journal.create({
      userId: user.id,
      date: today,
      content,
      title,
      mood,
      energyLevel,
      keyLearnings,
      challenges,
      wins,
      goals,
      gratitude,
      tomorrowFocus,
      tags
    });

    return NextResponse.json({ journal }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
