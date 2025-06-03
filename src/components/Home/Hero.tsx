"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Hero() {
  const [animatedCount, setAnimatedCount] = useState(0);

  const scrollToHowItWorks = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimatedCount(prev => (prev < 100 ? prev + 1 : 100));
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-20 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-green-400 rounded-full animate-float"></div>
        <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-blue-400 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-purple-400 rounded-full animate-float"></div>
        <div className="absolute top-1/2 right-1/3 w-5 h-5 bg-yellow-400 rounded-full animate-float-delayed"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-green-700 border border-green-200 mb-8 animate-fade-in-up">
          <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
          Track Your Personal Progress
        </div>

        {/* Main Heading with Animation */}
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 animate-fade-in-up animation-delay-200">
          Master Your{" "}
          <span className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent animate-gradient-x">
            {animatedCount}-Day Challenge
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in-up animation-delay-400">
          Set your goals, track daily progress, build consistency, and achieve your personal milestones with precision.
        </p>

        {/* Enhanced CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-fade-in-up animation-delay-600">
          <Link
            href="/dashboard"
            className="group relative bg-gradient-to-r from-green-600 to-green-700 text-white px-10 py-5 rounded-2xl text-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
          >
            <span className="relative z-10">Start Your Journey</span>
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
          </Link>
          <button
            onClick={scrollToHowItWorks}
            className="group relative border-2 border-green-600 text-green-600 px-10 py-5 rounded-2xl text-lg font-semibold hover:bg-green-600 hover:text-white transition-all duration-300 transform hover:scale-105 backdrop-blur-sm bg-white/50"
          >
            <span className="relative z-10 flex items-center gap-2">
              See How It Works
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fade-in-up animation-delay-800">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/80 transition-all duration-300 transform hover:scale-105">
            <div className="text-3xl font-bold text-green-600 mb-2">Daily</div>
            <div className="text-gray-600">Progress Tracking</div>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/80 transition-all duration-300 transform hover:scale-105">
            <div className="text-3xl font-bold text-blue-600 mb-2">Goals</div>
            <div className="text-gray-600">Achievement System</div>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/80 transition-all duration-300 transform hover:scale-105">
            <div className="text-3xl font-bold text-purple-600 mb-2">Analytics</div>
            <div className="text-gray-600">Performance Insights</div>
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
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes gradient-x {
          0%, 100% { background-size: 200% 200%; background-position: left center; }
          50% { background-size: 200% 200%; background-position: right center; }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-float-delayed { animation: float 3s ease-in-out infinite 1.5s; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out; }
        .animation-delay-200 { animation-delay: 0.2s; animation-fill-mode: both; }
        .animation-delay-400 { animation-delay: 0.4s; animation-fill-mode: both; }
        .animation-delay-600 { animation-delay: 0.6s; animation-fill-mode: both; }
        .animation-delay-800 { animation-delay: 0.8s; animation-fill-mode: both; }
        .animate-gradient-x { animation: gradient-x 3s ease infinite; }
      `}</style>
    </section>
  );
}
