import { NextRequest, NextResponse } from 'next/server';

// Get all goals
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const timeframe = searchParams.get('timeframe');
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    
    // Fetch goals logic would go here
    
    return NextResponse.json({
      goals: [
        {
          id: 'goal-1',
          title: 'Launch DevPlanner MVP',
          description: 'Complete and launch the initial version',
          timeframe: 'monthly',
          category: 'coding',
          progress: 75,
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'in_progress'
        },
        {
          id: 'goal-2',
          title: 'Learn TypeScript',
          description: 'Master TypeScript fundamentals',
          timeframe: 'weekly',
          category: 'learning',
          progress: 60,
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          status: 'on_track'
        }
      ]
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch goals' }, { status: 500 });
  }
}

// Create goal
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Create goal logic would go here
    
    return NextResponse.json({
      success: true,
      message: 'Goal created successfully',
      goal: {
        id: 'new-goal-id',
        ...body,
        createdAt: new Date().toISOString()
      }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create goal' }, { status: 500 });
  }
}
