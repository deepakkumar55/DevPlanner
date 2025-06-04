import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Outreach from "@/lib/Model/Outreach.Model";
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

    const outreach = await Outreach.find(query).sort({ sentAt: -1 });

    return NextResponse.json({ outreach }, { status: 200 });
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
    const { type, platform, targetName, targetEmail, targetCompany, subject, message, tags, leadSource } = body;

    if (!type || !targetName || !subject) {
      return NextResponse.json({ error: "Type, target name, and subject are required" }, { status: 400 });
    }

    await connectDB();

    const outreach = await Outreach.create({
      userId: user.id,
      type,
      platform,
      targetName,
      targetEmail,
      targetCompany,
      subject,
      message,
      tags,
      leadSource
    });

    return NextResponse.json({ outreach }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
