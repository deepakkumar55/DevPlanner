import { NextResponse } from 'next/server';

export async function POST() {
  // Logout logic would go here
  return NextResponse.json({
    success: true,
    message: 'Logged out successfully'
  });
}
