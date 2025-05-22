import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    name: 'DevPlanner API',
    version: '1.0.0',
    status: 'healthy',
    documentation: '/api/docs',
    endpoints: [
      '/api/auth',
      '/api/users',
      '/api/tasks',
      '/api/goals',
      '/api/jobs',
      '/api/content',
      '/api/freelance',
      '/api/streaks',
      '/api/teams',
      '/api/workspaces',
      '/api/time',
      '/api/integrations',
      '/api/analytics'
    ]
  });
}
