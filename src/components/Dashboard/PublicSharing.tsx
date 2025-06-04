"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { 
  FiShare2, FiEye, FiCopy, FiEdit3, FiSend, FiUsers,
  FiTrendingUp, FiDollarSign, FiCode, FiFileText, FiCalendar,
  FiSettings, FiGlobe, FiLock, FiBarChart2, FiZap, FiTarget
} from "react-icons/fi";

interface DashboardStats {
  tasks: {
    total: number;
    completed: number;
    completionRate: number;
  };
  revenue: {
    total: number;
    thisWeek: number;
    thisMonth: number;
  };
  content: {
    total: number;
    published: number;
  };
  outreach: {
    total: number;
    replied: number;
    replyRate: number;
  };
  recentProgress: Array<{
    date: string;
    dailyRevenue: number;
    dsaProblems: number;
  }>;
}

export default function PublicSharing() {
  const { data: session } = useSession();
  const [isPublic, setIsPublic] = useState(true);
  const [shareMessage, setShareMessage] = useState("");
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<any>(null);

  const socialPlatforms = [
    { name: "Twitter", icon: <FiUsers className="w-6 h-6" />, color: "from-blue-400 to-blue-600", enabled: true },
    { name: "LinkedIn", icon: <FiUsers className="w-6 h-6" />, color: "from-blue-600 to-blue-800", enabled: true },
    { name: "Instagram", icon: <FiUsers className="w-6 h-6" />, color: "from-pink-400 to-purple-600", enabled: false },
    { name: "Facebook", icon: <FiUsers className="w-6 h-6" />, color: "from-blue-500 to-indigo-600", enabled: false }
  ];

  useEffect(() => {
    if (session) {
      fetchDashboardStats();
      fetchUserProfile();
    }
  }, [session]);

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch('/api/dashboard/stats');
      const data = await response.json();
      
      if (response.ok) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const response = await fetch('/api/profile');
      const data = await response.json();
      
      if (response.ok) {
        setUserProfile(data.profile);
      }
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
    }
  };

  const updatePublicSetting = async (isPublic: boolean) => {
    try {
      // Update user's public sharing setting
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          availability: {
            ...userProfile?.availability,
            status: isPublic ? 'available' : 'not-available'
          }
        })
      });

      if (response.ok) {
        setIsPublic(isPublic);
      }
    } catch (error) {
      console.error('Failed to update public setting:', error);
    }
  };

  const generateProgressMessage = () => {
    if (!stats || !session?.user) return "";

    const totalDSAProblems = stats.recentProgress.reduce((sum, day) => sum + day.dsaProblems, 0);
    const currentDay = session.user.currentDay || 1;
    const totalDays = 100;
    const percentage = Math.round((currentDay / totalDays) * 100);

    return `🚀 Day ${currentDay}/100 of my coding journey! 

📊 Progress: ${percentage}% complete
💰 Revenue: ₹${stats.revenue.total.toLocaleString()} earned
💻 DSA Problems: ${totalDSAProblems} solved
📝 Content: ${stats.content.published} pieces published
✅ Tasks: ${stats.tasks.completed}/${stats.tasks.total} completed (${stats.tasks.completionRate}%)
📬 Outreach: ${stats.outreach.replyRate}% reply rate

Stay consistent, stay focused! 💪

#100DaysOfCode #CodingJourney #WebDevelopment #Progress`;
  };

  const handleGenerateMessage = () => {
    setShareMessage(generateProgressMessage());
  };

  const handleShare = (platform: string) => {
    // Platform-specific sharing logic
    const message = encodeURIComponent(shareMessage);
    let shareUrl = "";

    switch (platform) {
      case "Twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${message}`;
        break;
      case "LinkedIn":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}&summary=${message}`;
        break;
      case "Facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${message}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        </div>
        
        <div className="relative flex justify-center items-center h-64">
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-2xl">
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600"></div>
              <p className="text-gray-600 font-medium">Loading sharing settings...</p>
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
          .animate-blob { animation: blob 7s infinite; }
          .animation-delay-2000 { animation-delay: 2s; }
        `}</style>
      </div>
    );
  }

  const progressData = stats ? {
    daysCompleted: session?.user?.currentDay || 1,
    totalDays: 100,
    revenue: `₹${stats.revenue.total.toLocaleString()}`,
    dsaProblems: stats.recentProgress.reduce((sum, day) => sum + day.dsaProblems, 0),
    contentPublished: stats.content.published,
    currentStreak: stats.recentProgress.length
  } : {
    daysCompleted: 1,
    totalDays: 100,
    revenue: "₹0",
    dsaProblems: 0,
    contentPublished: 0,
    currentStreak: 0
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-cyan-400 rounded-full animate-float"></div>
        <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-blue-400 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-indigo-400 rounded-full animate-float"></div>
        <div className="absolute top-1/2 right-1/3 w-5 h-5 bg-purple-400 rounded-full animate-float-delayed"></div>
      </div>

      <div className="relative p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-6 sm:p-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center">
              <FiShare2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Public 
                <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent"> Sharing</span>
              </h1>
              <p className="text-gray-600">Share your progress publicly or keep it private</p>
            </div>
          </div>
        </motion.div>

        {/* Privacy Settings */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg border border-white/20 p-6 sm:p-8"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <FiSettings className="w-6 h-6 text-cyan-600" />
            Privacy Settings
          </h2>
          
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="flex items-center justify-between p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/30"
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                isPublic ? 'bg-green-100' : 'bg-gray-100'
              }`}>
                {isPublic ? <FiGlobe className="w-6 h-6 text-green-600" /> : <FiLock className="w-6 h-6 text-gray-600" />}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Public Progress Sharing</h3>
                <p className="text-sm text-gray-600">Allow others to view your progress dashboard</p>
              </div>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => updatePublicSetting(!isPublic)}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-300 ${
                isPublic ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              <motion.span
                animate={{ x: isPublic ? 24 : 4 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="inline-block h-6 w-6 transform rounded-full bg-white shadow-lg"
              />
            </motion.button>
          </motion.div>

          {isPublic && session?.user && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 p-6 bg-green-50/80 backdrop-blur-sm rounded-2xl border border-green-200/50"
            >
              <div className="flex items-center space-x-3 mb-4">
                <FiGlobe className="w-5 h-5 text-green-600" />
                <span className="text-sm font-semibold text-green-700">Public URL:</span>
              </div>
              <div className="flex items-center space-x-3">
                <code className="flex-1 text-sm bg-white/70 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/30">
                  https://cashflowcoders.com/progress/{session.user.name?.toLowerCase().replace(/\s+/g, '-')}
                </code>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigator.clipboard.writeText(
                    `https://cashflowcoders.com/progress/${session.user.name?.toLowerCase().replace(/\s+/g, '-')}`
                  )}
                  className="px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors text-sm font-medium flex items-center gap-2"
                >
                  <FiCopy className="w-4 h-4" />
                  Copy
                </motion.button>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Progress Summary */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg border border-white/20 p-6 sm:p-8"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <FiBarChart2 className="w-6 h-6 text-blue-600" />
            Progress Summary
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100/50 backdrop-blur-sm rounded-2xl border border-green-200/50"
            >
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <FiCalendar className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-green-600">{progressData.daysCompleted}</div>
              <div className="text-sm text-gray-600">Days Completed</div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100/50 backdrop-blur-sm rounded-2xl border border-blue-200/50"
            >
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <FiDollarSign className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-blue-600">{progressData.revenue}</div>
              <div className="text-sm text-gray-600">Revenue</div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100/50 backdrop-blur-sm rounded-2xl border border-purple-200/50"
            >
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <FiCode className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-purple-600">{progressData.dsaProblems}</div>
              <div className="text-sm text-gray-600">DSA Problems</div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100/50 backdrop-blur-sm rounded-2xl border border-orange-200/50"
            >
              <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <FiFileText className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-orange-600">{progressData.contentPublished}</div>
              <div className="text-sm text-gray-600">Content</div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 bg-gradient-to-br from-red-50 to-red-100/50 backdrop-blur-sm rounded-2xl border border-red-200/50"
            >
              <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <FiZap className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-red-600">{progressData.currentStreak}</div>
              <div className="text-sm text-gray-600">Streak</div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 bg-gradient-to-br from-gray-50 to-gray-100/50 backdrop-blur-sm rounded-2xl border border-gray-200/50"
            >
              <div className="w-12 h-12 bg-gray-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <FiTarget className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-600">
                {Math.round((progressData.daysCompleted / progressData.totalDays) * 100)}%
              </div>
              <div className="text-sm text-gray-600">Complete</div>
            </motion.div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGenerateMessage}
            className="w-full p-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-2xl hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 font-semibold flex items-center justify-center gap-3 shadow-lg"
          >
            <FiEdit3 className="w-5 h-5" />
            Generate Progress Update
          </motion.button>
        </motion.div>

        {/* Share Message */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg border border-white/20 p-6 sm:p-8"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <FiEdit3 className="w-6 h-6 text-purple-600" />
            Share Message
          </h2>
          
          <textarea
            value={shareMessage}
            onChange={(e) => setShareMessage(e.target.value)}
            placeholder="Write your progress update message here..."
            rows={8}
            className="w-full px-4 py-4 bg-white/70 backdrop-blur-sm border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 resize-none mb-4 transition-all duration-300"
          />

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 flex items-center gap-2">
              <FiEdit3 className="w-4 h-4" />
              {shareMessage.length}/280 characters
            </span>
            <div className="flex space-x-3">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 text-gray-600 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl hover:bg-white/90 transition-all duration-300"
              >
                <FiEye className="w-4 h-4 mr-2 inline" />
                Preview
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-cyan-600 text-white rounded-xl hover:bg-cyan-700 transition-colors"
              >
                Save Draft
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Social Platforms */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg border border-white/20 p-6 sm:p-8"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <FiSend className="w-6 h-6 text-indigo-600" />
            Share on Social Media
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {socialPlatforms.map((platform, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: platform.enabled ? 1.02 : 1, y: platform.enabled ? -2 : 0 }}
                whileTap={{ scale: platform.enabled ? 0.98 : 1 }}
                onClick={() => platform.enabled && handleShare(platform.name)}
                disabled={!platform.enabled}
                className={`flex items-center space-x-4 p-6 rounded-2xl transition-all duration-300 ${
                  platform.enabled
                    ? 'bg-white/60 hover:bg-white/80 cursor-pointer border border-white/30 hover:shadow-lg'
                    : 'bg-gray-100/50 cursor-not-allowed opacity-50 border border-gray-200/50'
                }`}
              >
                <div className={`w-14 h-14 bg-gradient-to-r ${platform.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                  {platform.icon}
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-semibold text-gray-900">Share on {platform.name}</h3>
                  <p className="text-sm text-gray-600">
                    {platform.enabled ? 'Post your progress update' : 'Coming soon'}
                  </p>
                </div>
                {platform.enabled && (
                  <FiSend className="w-5 h-5 text-gray-400" />
                )}
              </motion.button>
            ))}
          </div>

          <div className="bg-blue-50/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-200/50">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                <FiTrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">Sharing Tips</h4>
                <ul className="text-sm text-blue-700 space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                    Share consistently to build an audience
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                    Include relevant hashtags for better reach
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                    Engage with others in the coding community
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                    Share both wins and challenges for authenticity
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recent Activity */}
        {stats && stats.recentProgress.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg border border-white/20 p-6 sm:p-8"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <FiCalendar className="w-6 h-6 text-green-600" />
              Recent Activity
            </h2>
            <div className="space-y-3">
              {stats.recentProgress.slice(0, 5).map((day, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="flex justify-between items-center p-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/30 hover:shadow-md transition-all duration-300"
                >
                  <div className="text-sm font-medium text-gray-700 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                      <FiCalendar className="w-4 h-4 text-gray-600" />
                    </div>
                    {new Date(day.date).toLocaleDateString()}
                  </div>
                  <div className="flex space-x-4 text-sm">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-lg font-medium">
                      ₹{day.dailyRevenue}
                    </span>
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg font-medium">
                      {day.dsaProblems} DSA
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
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
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-float-delayed { animation: float 3s ease-in-out infinite 1.5s; }
      `}</style>
    </div>
  );
}
