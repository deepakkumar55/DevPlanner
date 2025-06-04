"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu } from "react-icons/fi";
import Sidebar from "@/components/Dashboard/Sidebar";
import DailyTaskTracker from "@/components/Dashboard/DailyTaskTracker";
import ProgressDashboard from "@/components/Dashboard/ProgressDashboard";
import ContentProductLog from "@/components/Dashboard/ContentProductLog";
import OutreachTracker from "@/components/Dashboard/OutreachTracker";
import JournalSection from "@/components/Dashboard/JournalSection";
import PublicSharing from "@/components/Dashboard/PublicSharing";
import Profile from "@/components/Dashboard/Profile";

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("tasks");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderActiveSection = () => {
    const sections = {
      tasks: <DailyTaskTracker />,
      progress: <ProgressDashboard />,
      content: <ContentProductLog />,
      outreach: <OutreachTracker />,
      journal: <JournalSection />,
      sharing: <PublicSharing />,
      profile: <Profile />,
    };

    return sections[activeSection as keyof typeof sections] || <DailyTaskTracker />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/6 w-2 h-2 bg-blue-400/40 rounded-full animate-float"></div>
        <div className="absolute top-1/2 right-1/5 w-3 h-3 bg-purple-400/40 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-pink-400/40 rounded-full animate-float"></div>
        <div className="absolute top-3/4 right-1/3 w-2.5 h-2.5 bg-indigo-400/40 rounded-full animate-float-delayed"></div>
      </div>

      {/* Sidebar */}
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <div className="flex-1 lg:ml-72 relative">
        {/* Mobile Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="lg:hidden bg-white/80 backdrop-blur-xl shadow-lg border-b border-white/20 p-4 relative z-10"
        >
          <div className="flex items-center justify-between">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSidebarOpen(true)}
              className="w-10 h-10 bg-white/70 backdrop-blur-sm rounded-xl hover:bg-white/90 border border-white/30 flex items-center justify-center transition-all duration-300 shadow-md"
            >
              <FiMenu className="w-5 h-5 text-gray-700" />
            </motion.button>

            <div className="text-center">
              <h1 className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Dashboard
              </h1>
              <p className="text-xs text-gray-500 capitalize">
                {activeSection.replace(/([A-Z])/g, " $1")}
              </p>
            </div>

            <div className="w-10 h-10"></div> {/* Spacer for center alignment */}
          </div>
        </motion.div>

        {/* Content Area */}
        <div className="relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{
                duration: 0.4,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="min-h-screen"
            >
              {renderActiveSection()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(-180deg);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite 2s;
        }
      `}</style>
    </div>
  );
}
