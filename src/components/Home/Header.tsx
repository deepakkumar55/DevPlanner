"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Mock authentication state - replace with your actual auth logic
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({ name: "Deepak Kumar", avatar: "Dk" });

  const handleLogin = () => {
    // Mock login - replace with your actual login logic
    setIsAuthenticated(true);
  };

  const handleProfileClick = () => {
    // Redirect to dashboard
    window.location.href = "/dashboard";
  };

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                <span className="text-white font-bold text-xl">C</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  CashflowCoders
                </h1>
                <p className="text-xs text-gray-500 -mt-1">by TheCampusCoders</p>
              </div>
            </Link>
          </div>

          {/* Auth Section */}
          <div className="flex items-center">
            {!isAuthenticated ? (
              <button
                onClick={handleLogin}
                className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-2 rounded-xl font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Login
              </button>
            ) : (
              <button
                onClick={handleProfileClick}
                className="flex items-center space-x-3 bg-gradient-to-r from-green-50 to-blue-50 px-4 py-2 rounded-xl border border-green-200 hover:from-green-100 hover:to-blue-100 transition-all duration-300 transform hover:scale-105 shadow-md group"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                  {user.avatar}
                </div>
                <span className="font-medium text-gray-700 group-hover:text-green-600 transition-colors">
                  {user.name}
                </span>
                <svg className="w-4 h-4 text-gray-400 group-hover:text-green-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
