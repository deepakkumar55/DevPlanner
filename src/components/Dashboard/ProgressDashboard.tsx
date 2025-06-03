"use client";

import { useState } from "react";

export default function ProgressDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("30");

  const progressData = {
    daysCompleted: 15,
    totalDays: 100,
    dailyRevenue: 1500,
    cumulativeRevenue: 45000,
    dsaProblems: 75,
    currentStreak: 8
  };

  const weeklyData = [
    { week: "Week 1", progress: 85, revenue: 8500 },
    { week: "Week 2", progress: 92, revenue: 12000 },
    { week: "Week 3", progress: 78, revenue: 15500 }
  ];

  const completionPercentage = Math.round((progressData.daysCompleted / progressData.totalDays) * 100);
  const revenueTarget = 1500000; // 15 Lakh
  const revenuePercentage = Math.round((progressData.cumulativeRevenue / revenueTarget) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/20">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Progress Dashboard</h1>
        <p className="text-gray-600">Visual overview of your journey and achievements</p>
      </div>

      {/* Main Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Days Progress */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Days Completed</h3>
            <span className="text-2xl">📅</span>
          </div>
          <div className="mb-4">
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-bold text-green-600">{progressData.daysCompleted}</span>
              <span className="text-lg text-gray-500">/ {progressData.totalDays}</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">{completionPercentage}% Complete</p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full transition-all duration-1000"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Revenue Tracker */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Revenue Progress</h3>
            <span className="text-2xl">💰</span>
          </div>
          <div className="mb-4">
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-bold text-blue-600">₹{(progressData.cumulativeRevenue / 1000).toFixed(0)}K</span>
              <span className="text-lg text-gray-500">/ ₹15L</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">{revenuePercentage}% of target</p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-500 to-cyan-600 h-3 rounded-full transition-all duration-1000"
              style={{ width: `${revenuePercentage}%` }}
            ></div>
          </div>
        </div>

        {/* DSA Problems */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">DSA Problems</h3>
            <span className="text-2xl">💻</span>
          </div>
          <div className="mb-4">
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-bold text-purple-600">{progressData.dsaProblems}</span>
              <span className="text-lg text-gray-500">solved</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">Target: 200 problems</p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-600 h-3 rounded-full transition-all duration-1000"
              style={{ width: `${(progressData.dsaProblems / 200) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Daily Revenue & Streak */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/20">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Today's Revenue</h3>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <p className="text-3xl font-bold text-green-600">₹{progressData.dailyRevenue.toLocaleString()}</p>
              <p className="text-sm text-gray-500 mt-1">Daily target: ₹1,500</p>
            </div>
            <div className="text-4xl">💵</div>
          </div>
          <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full"
              style={{ width: `${Math.min((progressData.dailyRevenue / 1500) * 100, 100)}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/20">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Current Streak</h3>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <p className="text-3xl font-bold text-orange-600">{progressData.currentStreak}</p>
              <p className="text-sm text-gray-500 mt-1">consecutive days</p>
            </div>
            <div className="text-4xl">🔥</div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-gray-600">Keep going! You're doing great!</p>
          </div>
        </div>
      </div>

      {/* Weekly Breakdown */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/20">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Weekly Breakdown</h3>
          <div className="flex space-x-2">
            <button 
              onClick={() => setSelectedPeriod("7")}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${selectedPeriod === "7" ? 'bg-green-100 text-green-700' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              7 Days
            </button>
            <button 
              onClick={() => setSelectedPeriod("30")}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${selectedPeriod === "30" ? 'bg-green-100 text-green-700' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              30 Days
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {weeklyData.map((week, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-20 text-sm font-medium text-gray-700">{week.week}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">Progress</span>
                  <span className="text-sm font-medium">{week.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-blue-600 h-2 rounded-full"
                    style={{ width: `${week.progress}%` }}
                  ></div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">₹{week.revenue.toLocaleString()}</p>
                <p className="text-xs text-gray-500">revenue</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
