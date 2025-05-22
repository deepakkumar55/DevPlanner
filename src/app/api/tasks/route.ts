import { NextRequest, NextResponse } from 'next/server';

// Get all tasks
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const priority = searchParams.get('priority');
    const status = searchParams.get('status');
    
    // Fetch tasks logic would go here
    
    return NextResponse.json({
      tasks: [
        {
          id: 'task-1',
          title: 'Implement API routes',
          description: 'Create RESTful API routes for DevPlanner',
          dueDate: new Date().toISOString(),
          priority: 'high',
          category: 'coding',
          isCompleted: false
        },
        {
          id: 'task-2',
          title: 'Design dashboard UI',
          description: 'Create wireframes for the main dashboard',
          dueDate: new Date().toISOString(),
          priority: 'medium',
          category: 'design',
          isCompleted: true
        }
      ]
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 });
  }
}

// Create task
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Create task logic would go here
    
    return NextResponse.json({
      success: true,
      message: 'Task created successfully',
      task: {
        id: 'new-task-id',
        ...body,
        createdAt: new Date().toISOString()
      }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create task' }, { status: 500 });
  }
}
