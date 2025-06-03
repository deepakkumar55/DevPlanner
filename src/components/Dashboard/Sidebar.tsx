"use client";

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function Sidebar({ activeSection, setActiveSection, sidebarOpen, setSidebarOpen }: SidebarProps) {
  const menuItems = [
    { id: "tasks", name: "Daily Tasks", icon: "✅", description: "Track today's goals" },
    { id: "progress", name: "Progress Dashboard", icon: "📊", description: "View your analytics" },
    { id: "content", name: "Content & Products", icon: "📝", description: "Manage your content" },
    { id: "outreach", name: "Outreach & Freelance", icon: "🤝", description: "Track your outreach" },
    { id: "journal", name: "Daily Journal", icon: "📔", description: "Write reflections" },
    { id: "sharing", name: "Public Sharing", icon: "🚀", description: "Share your progress" }
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-white/95 backdrop-blur-md shadow-xl border-r border-gray-200 z-50 transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <div>
              <h1 className="font-bold text-lg bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                CashflowCoders
              </h1>
              <p className="text-xs text-gray-500">Progress Tracker</p>
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <div>
              <p className="font-medium text-gray-900">Arjun Sharma</p>
              <p className="text-xs text-gray-500">Day 15 of 100</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 text-left ${
                activeSection === item.id
                  ? 'bg-gradient-to-r from-green-100 to-blue-100 text-green-700 border border-green-200'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <div className="flex-1">
                <p className="font-medium">{item.name}</p>
                <p className="text-xs text-gray-500">{item.description}</p>
              </div>
            </button>
          ))}
        </nav>

        {/* Progress Summary */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 border border-green-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Overall Progress</span>
              <span className="text-sm font-bold text-green-600">68%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-green-500 to-blue-600 h-2 rounded-full w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
