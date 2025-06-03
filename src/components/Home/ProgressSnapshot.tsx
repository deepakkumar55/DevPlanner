"use client";

import { useEffect, useState } from "react";

export default function ProgressSnapshot() {
  const [counters, setCounters] = useState({
    days: 0,
    goals: 0,
    streak: 0,
    achievements: 0
  });

  const targetValues = {
    days: 35,
    goals: 12,
    streak: 15,
    achievements: 8
  };

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    const timer = setInterval(() => {
      setCounters(prev => ({
        days: Math.min(prev.days + Math.ceil(targetValues.days / steps), targetValues.days),
        goals: Math.min(prev.goals + Math.ceil(targetValues.goals / steps), targetValues.goals),
        streak: Math.min(prev.streak + Math.ceil(targetValues.streak / steps), targetValues.streak),
        achievements: Math.min(prev.achievements + Math.ceil(targetValues.achievements / steps), targetValues.achievements)
      }));
    }, stepDuration);

    return () => clearInterval(timer);
  }, []);

  const metrics = [
    {
      label: "Days Completed",
      value: counters.days,
      total: 100,
      color: "green",
      icon: "📅",
      gradient: "from-green-500 to-emerald-600"
    },
    {
      label: "Goals Achieved",
      value: counters.goals,
      total: 20,
      color: "blue",
      icon: "🎯",
      gradient: "from-blue-500 to-cyan-600"
    },
    {
      label: "Current Streak",
      value: counters.streak,
      total: 30,
      color: "purple",
      icon: "🔥",
      gradient: "from-purple-500 to-pink-600"
    },
    {
      label: "Milestones",
      value: counters.achievements,
      total: 15,
      color: "orange",
      icon: "🏆",
      gradient: "from-orange-500 to-red-600"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-green-100 to-blue-100 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6 animate-fade-in-up">
            Your Progress at a Glance
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
            Track your journey with real-time metrics and visual progress indicators
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <div 
              key={index} 
              className="group bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg border border-white/20 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: `${0.4 + index * 0.1}s`, animationFillMode: 'both' }}
            >
              {/* Icon */}
              <div className="flex items-center justify-between mb-6">
                <div className="text-3xl">{metric.icon}</div>
                <div className={`w-12 h-12 bg-gradient-to-br ${metric.gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <div className="w-6 h-6 bg-white/30 rounded-lg"></div>
                </div>
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-gray-600 mb-3">{metric.label}</h3>
              <div className={`text-4xl font-bold text-${metric.color}-600 mb-6 group-hover:scale-105 transition-transform duration-300`}>
                {metric.value}
                <span className="text-lg text-gray-400 ml-1">/ {metric.total}</span>
              </div>

              {/* Progress Bar */}
              <div className="relative">
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div 
                    className={`bg-gradient-to-r ${metric.gradient} h-3 rounded-full transition-all duration-1000 ease-out relative`}
                    style={{ width: `${(metric.value / metric.total) * 100}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                  </div>
                </div>
                <div className="text-sm text-gray-500 mt-2 text-right">
                  {Math.round((metric.value / metric.total) * 100)}% Complete
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Card */}
        <div className="mt-16 bg-gradient-to-r from-green-50 to-blue-50 rounded-3xl p-8 border border-green-100 animate-fade-in-up animation-delay-800" style={{ animationFillMode: 'both' }}>
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Keep Going Strong! 💪</h3>
            <p className="text-gray-600 text-lg mb-6">
              You're making excellent progress. Stay consistent and watch your goals become reality.
            </p>
            <div className="inline-flex items-center px-6 py-3 bg-white rounded-full shadow-md">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></span>
              <span className="font-semibold text-gray-700">Next milestone: {Math.max(...metrics.map(m => m.total - m.value))} days to go</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out; }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-800 { animation-delay: 0.8s; }
        .animate-shimmer { animation: shimmer 2s infinite; }
      `}</style>
    </section>
  );
}
