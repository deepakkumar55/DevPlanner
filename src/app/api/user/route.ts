import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/lib/Model/User.Model";
import { getAuthenticatedUser } from "@/middleware/auth";

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const userInfo = await User.findById(user.id).select('-password');

    if (!userInfo) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user: userInfo }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    await connectDB();

    // Validate input data
    const errors: Record<string, string> = {};
    
    if (body.name && typeof body.name !== 'string') {
      errors.name = 'Name must be a string';
    }
    
    if (body.name && body.name.trim().length === 0) {
      errors.name = 'Name cannot be empty';
    }
    
    if (body.targetRevenue && (typeof body.targetRevenue !== 'number' || body.targetRevenue < 0)) {
      errors.targetRevenue = 'Target revenue must be a positive number';
    }
    
    if (body.currentDay && (typeof body.currentDay !== 'number' || body.currentDay < 1 || body.currentDay > 100)) {
      errors.currentDay = 'Current day must be between 1 and 100';
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    // Remove sensitive fields that shouldn't be updated
    const { _id, email, password, createdAt, updatedAt, ...updateData } = body;

    const updatedUser = await User.findByIdAndUpdate(
      user.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user: updatedUser }, { status: 200 });
  } catch (error) {
    console.error('User update error:', error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
