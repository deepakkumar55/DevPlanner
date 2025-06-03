"use client";

import { useState } from "react";

export default function ContentProductLog() {
  const [activeTab, setActiveTab] = useState("videos");

  const content = {
    videos: [
      { id: 1, title: "React Hooks Complete Guide", platform: "YouTube", views: "15.2K", date: "2024-01-15", status: "published", link: "#" },
      { id: 2, title: "Node.js Authentication Tutorial", platform: "YouTube", views: "8.7K", date: "2024-01-12", status: "published", link: "#" },
      { id: 3, title: "Building REST APIs", platform: "YouTube", views: "Draft", date: "2024-01-16", status: "draft", link: "#" }
    ],
    blogs: [
      { id: 1, title: "Modern JavaScript Best Practices", platform: "Medium", views: "2.1K", date: "2024-01-14", status: "published", link: "#" },
      { id: 2, title: "CSS Grid vs Flexbox", platform: "Dev.to", views: "1.8K", date: "2024-01-10", status: "published", link: "#" }
    ],
    products: [
      { id: 1, title: "React Component Library", platform: "Gumroad", sales: "₹25,000", date: "2024-01-08", status: "live", link: "#" },
      { id: 2, title: "JavaScript Course Bundle", platform: "Gumroad", sales: "₹18,500", date: "2024-01-05", status: "live", link: "#" }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
      case 'live':
        return 'bg-green-100 text-green-700';
      case 'draft':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'YouTube': return '📺';
      case 'Medium': return '📰';
      case 'Dev.to': return '💻';
      case 'Gumroad': return '🛒';
      default: return '📝';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/20">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Content & Product Log</h1>
        <p className="text-gray-600">Track your published content and product releases</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Total Videos</p>
              <p className="text-2xl font-bold text-red-600">{content.videos.length}</p>
            </div>
            <div className="text-2xl">📺</div>
          </div>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Blog Posts</p>
              <p className="text-2xl font-bold text-blue-600">{content.blogs.length}</p>
            </div>
            <div className="text-2xl">📰</div>
          </div>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Products</p>
              <p className="text-2xl font-bold text-green-600">{content.products.length}</p>
            </div>
            <div className="text-2xl">🛒</div>
          </div>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Total Revenue</p>
              <p className="text-2xl font-bold text-purple-600">₹43.5K</p>
            </div>
            <div className="text-2xl">💰</div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-white/20">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'videos', name: 'Videos', icon: '📺' },
              { id: 'blogs', name: 'Blog Posts', icon: '📰' },
              { id: 'products', name: 'Products', icon: '🛒' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {content[activeTab as keyof typeof content].map((item: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">{getPlatformIcon(item.platform)}</div>
                  <div>
                    <h3 className="font-medium text-gray-900">{item.title}</h3>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-sm text-gray-500">{item.platform}</span>
                      <span className="text-sm text-gray-500">{item.date}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-medium text-gray-900">
                      {activeTab === 'products' ? item.sales : `${item.views} views`}
                    </p>
                  </div>
                  <a
                    href={item.link}
                    className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                    title="View content"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Add New Content Button */}
          <div className="mt-6">
            <button className="w-full p-4 border-2 border-dashed border-gray-300 rounded-2xl text-gray-500 hover:border-green-500 hover:text-green-600 transition-colors">
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Add New {activeTab.slice(0, -1)}</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
