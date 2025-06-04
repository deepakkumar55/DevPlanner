"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiPlus, FiDollarSign, FiCode, FiClock, FiCheckCircle, FiTrendingUp,
  FiBarChart2, FiCalendar, FiEdit3, FiX, FiBatteryCharging, FiTarget,
  FiAward, FiStar, FiActivity, FiZap
} from "react-icons/fi";

interface Progress {
  _id: string;
  date: string;
  dailyRevenue: number;
  cumulativeRevenue: number;
  dsaProblems: number;
  tasksCompleted: number;
  totalTasks: number;
  workHours: number;
  mood: string;
  energyLevel: number;
  notes?: string;
  achievements: string[];
}

export default function ProgressDashboard() {
  const { data: session } = useSession();
  const [progress, setProgress] = useState<Progress[]>([]);
  const [todayProgress, setTodayProgress] = useState<Partial<Progress>>({
    dailyRevenue: 0,
    dsaProblems: 0,
    tasksCompleted: 0,
    totalTasks: 0,
    workHours: 0,
    mood: "😐",
    energyLevel: 5,
    notes: "",
    achievements: []
  });
  const [loading, setLoading] = useState(true);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  useEffect(() => {
    if (session) {
      fetchProgress();
    }
  }, [session]);

  const fetchProgress = async () => {
    try {
      const response = await fetch("/api/progress?limit=30");
      const data = await response.json();

      if (response.ok) {
        setProgress(data.progress);

        // Check if today's progress exists
        const today = new Date().toISOString().split("T")[0];
        const todayData = data.progress.find((p: Progress) =>
          p.date.split("T")[0] === today
        );

        if (todayData) {
          setTodayProgress(todayData);
        }
      }
    } catch (error) {
      console.error("Failed to fetch progress:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateTodayProgress = async () => {
    try {
      const response = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todayProgress)
      });

      if (response.ok) {
        const data = await response.json();
        setProgress(prev => {
          const filtered = prev.filter(p => p._id !== data.progress._id);
          return [data.progress, ...filtered];
        });
        setShowUpdateForm(false);
      }
    } catch (error) {
      console.error("Failed to update progress:", error);
    }
  };

  const moodOptions = [
    { emoji: "😢", label: "Very Sad", value: "😢" },
    { emoji: "😞", label: "Sad", value: "😞" },
    { emoji: "😐", label: "Neutral", value: "😐" },
    { emoji: "😊", label: "Happy", value: "😊" },
    { emoji: "😁", label: "Very Happy", value: "😁" }
  ];

  const totalRevenue = progress.reduce((sum, p) => sum + p.dailyRevenue, 0);
  const totalDSAProblems = progress.reduce((sum, p) => sum + p.dsaProblems, 0);
  const avgWorkHours =
    progress.length > 0
      ? (progress.reduce((sum, p) => sum + p.workHours, 0) / progress.length).toFixed(1)
      : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        </div>
        
        <div className="relative flex justify-center items-center h-64">
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-2xl">
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              <p className="text-gray-600 font-medium">Loading your progress...</p>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-indigo-400 rounded-full animate-float"></div>
        <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-purple-400 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-pink-400 rounded-full animate-float"></div>
        <div className="absolute top-1/2 right-1/3 w-5 h-5 bg-blue-400 rounded-full animate-float-delayed"></div>
      </div>

      <div className="relative p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Header with Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-6 sm:p-8"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Progress 
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"> Dashboard</span>
              </h2>
              <div className="inline-flex items-center px-3 py-1 bg-indigo-100/80 backdrop-blur-sm rounded-full text-sm font-medium text-indigo-700 border border-indigo-200">
                <FiActivity className="w-4 h-4 mr-2" />
                Track Your Growth
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowUpdateForm(true)
              }
              className="group relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-2xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <FiPlus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              <span className="hidden sm:inline">Update Progress</span>
              <span className="sm:hidden">Update</span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            </motion.button>
          </div>

          {/* Stats Grid - Responsive */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          >
            <div className="bg-gradient-to-br from-green-50 to-green-100/50 backdrop-blur-sm p-4 sm:p-6 rounded-2xl border border-green-200/50">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                  <FiDollarSign className="w-5 h-5 text-white" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-green-600">₹{totalRevenue.toLocaleString()}</div>
              </div>
              <div className="text-sm text-gray-600">Total Revenue</div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 backdrop-blur-sm p-4 sm:p-6 rounded-2xl border border-blue-200/50">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                  <FiCode className="w-5 h-5 text-white" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-blue-600">{totalDSAProblems}</div>
              </div>
              <div className="text-sm text-gray-600">DSA Problems</div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 backdrop-blur-sm p-4 sm:p-6 rounded-2xl border border-purple-200/50">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center">
                  <FiClock className="w-5 h-5 text-white" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-purple-600">{avgWorkHours}h</div>
              </div>
              <div className="text-sm text-gray-600">Avg Work Hours</div>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100/50 backdrop-blur-sm p-4 sm:p-6 rounded-2xl border border-yellow-200/50">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center">
                  <FiBarChart2 className="w-5 h-5 text-white" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-yellow-600">{progress.length}</div>
              </div>
              <div className="text-sm text-gray-600">Days Tracked</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Progress History */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-6 sm:p-8"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <FiTrendingUp className="w-6 h-6 text-indigo-600" />
            Recent Progress
          </h3>
          <div className="space-y-4">
            {progress.slice(0, 10).map((day, index) => (
              <motion.div
                key={day._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -2, scale: 1.01 }}
                className="bg-white/60 backdrop-blur-sm border border-white/30 rounded-2xl p-4 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center">
                      <FiCalendar className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div className="text-sm font-semibold text-gray-900">
                      {new Date(day.date).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{day.mood}</span>
                    <div className="text-xs text-gray-500 bg-white/50 rounded-lg px-2 py-1">
                      Energy: {day.energyLevel}/10
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                  <div className="bg-green-50/80 backdrop-blur-sm rounded-xl p-3 border border-green-200/50">
                    <div className="flex items-center gap-2 text-green-600 mb-1">
                      <FiDollarSign className="w-4 h-4" />
                      <span className="text-xs font-medium">Revenue</span>
                    </div>
                    <div className="font-bold text-gray-900">₹{day.dailyRevenue.toLocaleString()}</div>
                  </div>
                  
                  <div className="bg-blue-50/80 backdrop-blur-sm rounded-xl p-3 border border-blue-200/50">
                    <div className="flex items-center gap-2 text-blue-600 mb-1">
                      <FiCode className="w-4 h-4" />
                      <span className="text-xs font-medium">DSA</span>
                    </div>
                    <div className="font-bold text-gray-900">{day.dsaProblems}</div>
                  </div>
                  
                  <div className="bg-purple-50/80 backdrop-blur-sm rounded-xl p-3 border border-purple-200/50">
                    <div className="flex items-center gap-2 text-purple-600 mb-1">
                      <FiCheckCircle className="w-4 h-4" />
                      <span className="text-xs font-medium">Tasks</span>
                    </div>
                    <div className="font-bold text-gray-900">{day.tasksCompleted}/{day.totalTasks}</div>
                  </div>
                  
                  <div className="bg-orange-50/80 backdrop-blur-sm rounded-xl p-3 border border-orange-200/50">
                    <div className="flex items-center gap-2 text-orange-600 mb-1">
                      <FiClock className="w-4 h-4" />
                      <span className="text-xs font-medium">Hours</span>
                    </div>
                    <div className="font-bold text-gray-900">{day.workHours}h</div>
                  </div>
                </div>

                {day.notes && (
                  <div className="bg-white/50 backdrop-blur-sm rounded-xl p-3 border border-white/30 mb-3">
                    <p className="text-sm text-gray-600 italic">"{day.notes}"</p>
                  </div>
                )}

                {day.achievements.length > 0 && (
                  <div className="bg-yellow-50/80 backdrop-blur-sm rounded-xl p-3 border border-yellow-200/50">
                    <div className="flex items-center gap-2 text-yellow-700 mb-2">
                      <FiAward className="w-4 h-4" />
                      <span className="text-xs font-semibold">Achievements</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {day.achievements.map((achievement, idx) => (
                        <span
                          key={idx}
                          className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full flex items-center gap-1"
                        >
                          <FiStar className="w-3 h-3" />
                          {achievement}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}

            {progress.length === 0 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="text-6xl mb-4">📊</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No Progress Data Yet</h3>
                <p className="text-gray-600 mb-6">Start tracking your daily progress to see insights!</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowUpdateForm(true)}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-2xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
                >
                  Start Tracking Today
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Modal Popup for Update Form */}
      <AnimatePresence>
        {showUpdateForm && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowUpdateForm(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              {/* Modal Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 50 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-white/30 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
              >
                {/* Modal Header */}
                <div className="sticky top-0 bg-white/80 backdrop-blur-md rounded-t-3xl p-6 border-b border-white/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Update Today's Progress</h3>
                      <p className="text-gray-600 mt-1">Track your daily achievements and growth</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setShowUpdateForm(false)}
                      className="w-12 h-12 bg-red-100 hover:bg-red-200 rounded-2xl flex items-center justify-center transition-colors group"
                    >
                      <FiX className="w-6 h-6 text-red-600 group-hover:text-red-700" />
                    </motion.button>
                  </div>
                </div>

                {/* Modal Body */}
                <div className="p-6">
                  {/* Progress Metrics Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <FiDollarSign className="w-4 h-4 text-green-600" />
                        Daily Revenue (₹)
                      </label>
                      <input
                        type="number"
                        value={todayProgress.dailyRevenue || 0}
                        onChange={e =>
                          setTodayProgress({
                            ...todayProgress,
                            dailyRevenue: parseInt(e.target.value) || 0
                          })
                        }
                        className="w-full bg-white/70 backdrop-blur-sm border-2 border-gray-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <FiCode className="w-4 h-4 text-blue-600" />
                        DSA Problems
                      </label>
                      <input
                        type="number"
                        value={todayProgress.dsaProblems || 0}
                        onChange={e =>
                          setTodayProgress({
                            ...todayProgress,
                            dsaProblems: parseInt(e.target.value) || 0
                          })
                        }
                        className="w-full bg-white/70 backdrop-blur-sm border-2 border-gray-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <FiClock className="w-4 h-4 text-purple-600" />
                        Work Hours
                      </label>
                      <input
                        type="number"
                        step="0.5"
                        value={todayProgress.workHours || 0}
                        onChange={e =>
                          setTodayProgress({
                            ...todayProgress,
                            workHours: parseFloat(e.target.value) || 0
                          })
                        }
                        className="w-full bg-white/70 backdrop-blur-sm border-2 border-gray-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <FiCheckCircle className="w-4 h-4 text-green-600" />
                        Tasks Completed
                      </label>
                      <input
                        type="number"
                        value={todayProgress.tasksCompleted || 0}
                        onChange={e =>
                          setTodayProgress({
                            ...todayProgress,
                            tasksCompleted: parseInt(e.target.value) || 0
                          })
                        }
                        className="w-full bg-white/70 backdrop-blur-sm border-2 border-gray-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <FiTarget className="w-4 h-4 text-orange-600" />
                        Total Tasks
                      </label>
                      <input
                        type="number"
                        value={todayProgress.totalTasks || 0}
                        onChange={e =>
                          setTodayProgress({
                            ...todayProgress,
                            totalTasks: parseInt(e.target.value) || 0
                          })
                        }
                        className="w-full bg-white/70 backdrop-blur-sm border-2 border-gray-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                        <FiBatteryCharging className="w-4 h-4 text-pink-600" />
                        Energy Level (1-10)
                      </label>
                      <div className="bg-white/70 backdrop-blur-sm border-2 border-gray-200 rounded-2xl p-4">
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={todayProgress.energyLevel || 5}
                          onChange={e =>
                            setTodayProgress({
                              ...todayProgress,
                              energyLevel: parseInt(e.target.value)
                            })
                          }
                          className="w-full accent-indigo-500"
                        />
                        <div className="text-center text-lg font-bold text-indigo-600 mt-2">
                          {todayProgress.energyLevel}/10
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Mood Selection */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="mb-6"
                  >
                    <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <FiZap className="w-4 h-4 text-yellow-600" />
                      How are you feeling today?
                    </label>
                    <div className="grid grid-cols-5 gap-3">
                      {moodOptions.map((mood) => (
                        <motion.button
                          key={mood.value}
                          type="button"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setTodayProgress({ ...todayProgress, mood: mood.value })}
                          className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                            todayProgress.mood === mood.value
                              ? 'border-indigo-500 bg-indigo-50 scale-105'
                              : 'border-gray-200 bg-white/50 hover:border-gray-300'
                          }`}
                        >
                          <div className="text-center">
                            <div className="text-3xl mb-1">{mood.emoji}</div>
                            <div className="text-xs font-medium text-gray-600">{mood.label}</div>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>

                  {/* Notes */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="mb-8"
                  >
                    <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <FiEdit3 className="w-4 h-4 text-gray-600" />
                      Notes
                    </label>
                    <textarea
                      value={todayProgress.notes || ""}
                      onChange={e => setTodayProgress({ ...todayProgress, notes: e.target.value })}
                      className="w-full bg-white/70 backdrop-blur-sm border-2 border-gray-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 resize-none"
                      rows={4}
                      placeholder="Any notes about today's progress..."
                    />
                  </motion.div>
                </div>

                {/* Modal Footer */}
                <div className="sticky bottom-0 bg-white/80 backdrop-blur-md rounded-b-3xl p-6 border-t border-white/20">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={updateTodayProgress}
                      className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                    >
                      <FiActivity className="w-5 h-5" />
                      Save Progress
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowUpdateForm(false)}
                      className="sm:w-auto w-full bg-gray-200 text-gray-700 px-6 py-4 rounded-2xl font-bold hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

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
