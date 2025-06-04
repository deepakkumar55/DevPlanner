import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Client from "@/lib/Model/Client.Model";
import { getAuthenticatedUser } from "@/middleware/auth";

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const paymentStatus = searchParams.get('paymentStatus');

    await connectDB();

    let query: any = { userId: user.id };
    if (status) query.status = status;
    if (paymentStatus) query.paymentStatus = paymentStatus;

    const clients = await Client.find(query).sort({ createdAt: -1 });

    return NextResponse.json({ clients }, { status: 200 });
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
    const { name, email, company, projectTitle, projectDescription, budget, deadlineDate, contactInfo, projectDetails } = body;

    if (!name || !projectTitle || !budget) {
      return NextResponse.json({ error: "Name, project title, and budget are required" }, { status: 400 });
    }

    await connectDB();

    const client = await Client.create({
      userId: user.id,
      name,
      email,
      company,
      projectTitle,
      projectDescription,
      budget,
      deadlineDate: deadlineDate ? new Date(deadlineDate) : null,
      contactInfo,
      projectDetails
    });

    return NextResponse.json({ client }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
