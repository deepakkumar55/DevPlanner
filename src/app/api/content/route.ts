import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Content from "@/lib/Model/Content.Model";
import { getAuthenticatedUser } from "@/middleware/auth";

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const status = searchParams.get('status');
    const platform = searchParams.get('platform');

    await connectDB();

    let query: any = { userId: user.id };
    if (type) query.type = type;
    if (status) query.status = status;
    if (platform) query.platform = platform;

    const content = await Content.find(query).sort({ createdAt: -1 });

    return NextResponse.json({ content }, { status: 200 });
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
    const { type, title, description, platform, url, status, tags, publishedAt } = body;

    if (!type || !title || !platform) {
      return NextResponse.json({ error: "Type, title, and platform are required" }, { status: 400 });
    }

    await connectDB();

    const content = await Content.create({
      userId: user.id,
      type,
      title,
      description,
      platform,
      url,
      status,
      tags,
      publishedAt: publishedAt ? new Date(publishedAt) : null
    });

    return NextResponse.json({ content }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
