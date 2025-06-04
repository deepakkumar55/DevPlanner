import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Task from "@/lib/Model/Task.Model";
import Progress from "@/lib/Model/Progress.Model";
import Content from "@/lib/Model/Content.Model";
import Client from "@/lib/Model/Client.Model";
import Outreach from "@/lib/Model/Outreach.Model";
import { getAuthenticatedUser } from "@/middleware/auth";

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    // Get current date ranges
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const thisWeekStart = new Date(today);
    thisWeekStart.setDate(today.getDate() - today.getDay());
    
    const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);

    // Tasks stats
    const [
      totalTasks,
      completedTasks,
      todayTasks,
      completedTodayTasks
    ] = await Promise.all([
      Task.countDocuments({ userId: user.id }),
      Task.countDocuments({ userId: user.id, completed: true }),
      Task.countDocuments({ 
        userId: user.id, 
        createdAt: { $gte: today } 
      }),
      Task.countDocuments({ 
        userId: user.id, 
        completed: true,
        completedAt: { $gte: today } 
      })
    ]);

    // Revenue stats from progress
    const revenueStats = await Progress.aggregate([
      { $match: { userId: user.id } },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$dailyRevenue" },
          thisWeekRevenue: {
            $sum: {
              $cond: [
                { $gte: ["$date", thisWeekStart] },
                "$dailyRevenue",
                0
              ]
            }
          },
          thisMonthRevenue: {
            $sum: {
              $cond: [
                { $gte: ["$date", thisMonthStart] },
                "$dailyRevenue",
                0
              ]
            }
          }
        }
      }
    ]);

    // Content stats
    const contentRevenueResult = await Content.aggregate([
      { $match: { userId: user.id } },
      { $group: { _id: null, total: { $sum: { $ifNull: ["$revenue", 0] } } } }
    ]);

    // Client stats  
    const clientRevenueResult = await Client.aggregate([
      { $match: { userId: user.id } },
      { $group: { _id: null, total: { $sum: { $ifNull: ["$paidAmount", 0] } } } }
    ]);

    const stats = {
      tasks: {
        total: totalTasks,
        completed: completedTasks,
        completionRate: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
        today: {
          total: todayTasks,
          completed: completedTodayTasks
        }
      },
      revenue: {
        total: revenueStats[0]?.totalRevenue || 0,
        thisWeek: revenueStats[0]?.thisWeekRevenue || 0,
        thisMonth: revenueStats[0]?.thisMonthRevenue || 0,
        fromContent: contentRevenueResult[0]?.total || 0,
        fromClients: clientRevenueResult[0]?.total || 0
      },
      content: {
        total: totalContent,
        published: publishedContent,
        revenue: contentRevenueResult[0]?.total || 0
      },
      clients: {
        total: totalClients,
        active: activeClients,
        revenue: clientRevenueResult[0]?.total || 0
      },
      outreach: {
        total: totalOutreach,
        replied: repliedOutreach,
        replyRate: totalOutreach > 0 ? Math.round((repliedOutreach / totalOutreach) * 100) : 0,
        thisWeek: thisWeekOutreach
      },
      recentProgress
    };

    return NextResponse.json({ stats }, { status: 200 });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
