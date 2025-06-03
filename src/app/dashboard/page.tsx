"use client";

import { useState } from "react";
import Sidebar from "@/components/Dashboard/Sidebar";
import DailyTaskTracker from "@/components/Dashboard/DailyTaskTracker";
import ProgressDashboard from "@/components/Dashboard/ProgressDashboard";
import ContentProductLog from "@/components/Dashboard/ContentProductLog";
import OutreachTracker from "@/components/Dashboard/OutreachTracker";
import JournalSection from "@/components/Dashboard/JournalSection";
import PublicSharing from "@/components/Dashboard/PublicSharing";

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("tasks");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderActiveSection = () => {
    switch (activeSection) {
      case "tasks":
        return <DailyTaskTracker />;
      case "progress":
        return <ProgressDashboard />;
      case "content":
        return <ContentProductLog />;
      case "outreach":
        return <OutreachTracker />;
      case "journal":
        return <JournalSection />;
      case "sharing":
        return <PublicSharing />;
      default:
        return <DailyTaskTracker />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex">
      {/* Sidebar */}
      <Sidebar 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-200 p-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6">
          {renderActiveSection()}
        </div>
      </div>
    </div>
  );
}
