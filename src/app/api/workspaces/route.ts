import { NextRequest, NextResponse } from 'next/server';

// Get all workspaces
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type');
    
    // Fetch workspaces logic would go here
    
    return NextResponse.json({
      workspaces: [
        {
          id: 'workspace-1',
          name: 'Personal Projects',
          description: 'My personal development projects',
          type: 'personal',
          createdAt: new Date().toISOString(),
          tasks: ['task-1', 'task-2'],
          goals: ['goal-1']
        },
        {
          id: 'workspace-2',
          name: 'Client Work',
          description: 'Client projects and deadlines',
          type: 'client',
          createdAt: new Date().toISOString(),
          tasks: ['task-3', 'task-4'],
          projects: ['project-1']
        }
      ]
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch workspaces' }, { status: 500 });
  }
}

// Create workspace
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Create workspace logic would go here
    
    return NextResponse.json({
      success: true,
      message: 'Workspace created successfully',
      workspace: {
        id: 'new-workspace-id',
        ...body,
        createdAt: new Date().toISOString()
      }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create workspace' }, { status: 500 });
  }
}
