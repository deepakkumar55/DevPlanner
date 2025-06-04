"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiCheckSquare, FiBarChart2, FiFileText, FiUsers, FiBook, FiUser,
  FiShare2, FiLogOut, FiX, FiTrendingUp, FiDollarSign, FiZap,
  FiCalendar, FiTarget, FiStar
} from "react-icons/fi";

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

interface DashboardStats {
  tasks: {
    total: number;
    completed: number;
    completionRate: number;
  };
  revenue: {
    total: number;
  };
}

export default function Sidebar({ activeSection, setActiveSection, sidebarOpen, setSidebarOpen }: SidebarProps) {
  const { data: session } = useSession();
  const [stats, setStats] = useState<DashboardStats | null>(null);

  const menuItems = [
    { id: "tasks", name: "Daily Tasks", icon: <FiCheckSquare className="w-5 h-5" />, description: "Track today's goals", color: "from-green-500 to-emerald-600" },
    { id: "progress", name: "Progress Dashboard", icon: <FiBarChart2 className="w-5 h-5" />, description: "View your analytics", color: "from-indigo-500 to-purple-600" },
    { id: "content", name: "Content & Products", icon: <FiFileText className="w-5 h-5" />, description: "Manage your content", color: "from-blue-500 to-cyan-600" },
    { id: "outreach", name: "Outreach & Freelance", icon: <FiUsers className="w-5 h-5" />, description: "Track your outreach", color: "from-orange-500 to-red-600" },
    { id: "journal", name: "Daily Journal", icon: <FiBook className="w-5 h-5" />, description: "Write reflections", color: "from-purple-500 to-pink-600" },
    { id: "profile", name: "Profile", icon: <FiUser className="w-5 h-5" />, description: "Manage your profile", color: "from-gray-500 to-slate-600" },
    { id: "sharing", name: "Public Sharing", icon: <FiShare2 className="w-5 h-5" />, description: "Share your progress", color: "from-cyan-500 to-blue-600" }
  ];

  useEffect(() => {
    if (session) {
      fetchStats();
    }
  }, [session]);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/dashboard/stats');
      const data = await response.json();
      
      if (response.ok) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: '/auth/login' });
  };

  const currentDay = session?.user?.currentDay || 1;
  const totalDays = 100;
  const progressPercentage = Math.round((currentDay / totalDays) * 100);

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-72 bg-white/90 backdrop-blur-xl shadow-2xl border-r border-white/20 z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)'
        }}
      >
        
        {/* Close Button for Mobile */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors z-10"
        >
          <FiX className="w-4 h-4 text-gray-600" />
        </motion.button>

        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 border-b border-white/20"
        >
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">C</span>
            </div>
            <div>
              <h1 className="font-bold text-xl bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                CashflowCoders
              </h1>
              <p className="text-sm text-gray-500">Progress Tracker</p>
            </div>
          </div>
        </motion.div>

        {/* User Info */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-4 border-b border-white/20"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-sm">
                  {session?.user?.name?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">
                  {session?.user?.name || 'User'}
                </p>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <FiCalendar className="w-3 h-3" />
                  Day {currentDay} of {totalDays}
                </div>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleSignOut}
              className="w-8 h-8 bg-red-100 hover:bg-red-200 rounded-lg flex items-center justify-center transition-colors group"
              title="Sign out"
            >
              <FiLogOut className="w-4 h-4 text-red-600 group-hover:text-red-700" />
            </motion.button>
          </div>
        </motion.div>

        {/* Quick Stats */}
        {stats && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-4 border-b border-white/20"
          >
            <div className="grid grid-cols-2 gap-3">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-green-50 to-green-100/50 backdrop-blur-sm p-3 rounded-xl border border-green-200/50"
              >
                <div className="flex items-center gap-2 mb-1">
                  <FiDollarSign className="w-4 h-4 text-green-600" />
                  <div className="text-sm font-bold text-green-600">₹{stats.revenue.total.toLocaleString()}</div>
                </div>
                <div className="text-xs text-gray-600">Revenue</div>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-blue-50 to-blue-100/50 backdrop-blur-sm p-3 rounded-xl border border-blue-200/50"
              >
                <div className="flex items-center gap-2 mb-1">
                  <FiTarget className="w-4 h-4 text-blue-600" />
                  <div className="text-sm font-bold text-blue-600">{stats.tasks.completionRate}%</div>
                </div>
                <div className="text-xs text-gray-600">Tasks</div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Navigation */}
        <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
          {menuItems.map((item, index) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.05 }}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setActiveSection(item.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-4 rounded-2xl transition-all duration-300 text-left relative overflow-hidden ${
                activeSection === item.id
                  ? 'bg-white/80 backdrop-blur-sm shadow-lg border border-white/30'
                  : 'hover:bg-white/50 hover:backdrop-blur-sm text-gray-700 hover:shadow-md'
              }`}
            >
              {/* Active indicator */}
              {activeSection === item.id && (
                <motion.div
                  layoutId="activeIndicator"
                  className={`absolute left-0 top-0 w-1 h-full bg-gradient-to-b ${item.color} rounded-r-full`}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              
              {/* Icon with gradient background */}
              <div className={`w-10 h-10 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center text-white shadow-lg`}>
                {item.icon}
              </div>
              
              <div className="flex-1">
                <p className={`font-semibold ${activeSection === item.id ? 'text-gray-900' : 'text-gray-700'}`}>
                  {item.name}
                </p>
                <p className="text-xs text-gray-500">{item.description}</p>
              </div>

              {/* Active indicator dot */}
              {activeSection === item.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-2 h-2 bg-green-500 rounded-full"
                />
              )}
            </motion.button>
          ))}
        </nav>

        {/* Progress Summary */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="p-4"
        >
          <div className="bg-gradient-to-br from-green-50 to-blue-50 backdrop-blur-sm rounded-2xl p-5 border border-green-200/50 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <FiTrendingUp className="w-5 h-5 text-green-600" />
                <span className="text-sm font-semibold text-gray-700">Overall Progress</span>
              </div>
              <div className="flex items-center gap-1">
                <FiStar className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-bold text-green-600">{progressPercentage}%</span>
              </div>
            </div>
            
            <div className="relative w-full bg-gray-200/50 rounded-full h-3 mb-3 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="bg-gradient-to-r from-green-500 to-blue-600 h-full rounded-full relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
              </motion.div>
            </div>
            
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1 text-gray-600">
                <FiZap className="w-3 h-3" />
                {currentDay} days completed
              </div>
              <span className="text-gray-500">{totalDays - currentDay} to go</span>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
