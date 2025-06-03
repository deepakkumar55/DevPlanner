"use client";

import { useState } from "react";

export default function PublicSharing() {
  const [isPublic, setIsPublic] = useState(true);
  const [shareMessage, setShareMessage] = useState("");

  const progressData = {
    daysCompleted: 15,
    totalDays: 100,
    revenue: "₹45,000",
    dsaProblems: 75,
    contentPublished: 8,
    currentStreak: 8
  };

  const socialPlatforms = [
    { name: "Twitter", icon: "🐦", color: "bg-blue-500", enabled: true },
    { name: "LinkedIn", icon: "💼", color: "bg-blue-700", enabled: true },
    { name: "Instagram", icon: "📸", color: "bg-pink-500", enabled: false },
    { name: "Facebook", icon: "📘", color: "bg-blue-600", enabled: false }
  ];

  const generateProgressMessage = () => {
    const percentage = Math.round((progressData.daysCompleted / progressData.totalDays) * 100);
    return `🚀 Day ${progressData.daysCompleted}/100 of my coding journey! 

📊 Progress: ${percentage}% complete
💰 Revenue: ${progressData.revenue} earned
💻 DSA Problems: ${progressData.dsaProblems} solved
📝 Content: ${progressData.contentPublished} pieces published
🔥 Current streak: ${progressData.currentStreak} days

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/20">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Public Sharing</h1>
        <p className="text-gray-600">Share your progress publicly or keep it private</p>
      </div>

      {/* Privacy Settings */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/20">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Privacy Settings</h2>
        
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
          <div>
            <h3 className="font-medium text-gray-900">Public Progress Sharing</h3>
            <p className="text-sm text-gray-600">Allow others to view your progress dashboard</p>
          </div>
          <button
            onClick={() => setIsPublic(!isPublic)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              isPublic ? 'bg-green-500' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isPublic ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {isPublic && (
          <div className="mt-4 p-4 bg-green-50 rounded-2xl border border-green-200">
            <div className="flex items-center space-x-2">
              <span className="text-green-600">🔗</span>
              <span className="text-sm font-medium text-green-700">Public URL:</span>
            </div>
            <div className="mt-2 flex items-center space-x-2">
              <code className="flex-1 text-sm bg-white px-3 py-2 rounded border">
                https://cashflowcoders.com/progress/arjun-sharma
              </code>
              <button className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm">
                Copy
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Progress Summary */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/20">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Progress Summary</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-green-50 rounded-2xl">
            <div className="text-2xl font-bold text-green-600">{progressData.daysCompleted}</div>
            <div className="text-sm text-gray-600">Days Completed</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-2xl">
            <div className="text-2xl font-bold text-blue-600">{progressData.revenue}</div>
            <div className="text-sm text-gray-600">Revenue</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-2xl">
            <div className="text-2xl font-bold text-purple-600">{progressData.dsaProblems}</div>
            <div className="text-sm text-gray-600">DSA Problems</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-2xl">
            <div className="text-2xl font-bold text-orange-600">{progressData.contentPublished}</div>
            <div className="text-sm text-gray-600">Content</div>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-2xl">
            <div className="text-2xl font-bold text-red-600">{progressData.currentStreak}</div>
            <div className="text-sm text-gray-600">Streak</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-2xl">
            <div className="text-2xl font-bold text-gray-600">
              {Math.round((progressData.daysCompleted / progressData.totalDays) * 100)}%
            </div>
            <div className="text-sm text-gray-600">Complete</div>
          </div>
        </div>

        <button
          onClick={handleGenerateMessage}
          className="w-full p-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl hover:from-green-700 hover:to-blue-700 transition-all duration-300 font-medium"
        >
          Generate Progress Update
        </button>
      </div>

      {/* Share Message */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/20">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Share Message</h2>
        
        <textarea
          value={shareMessage}
          onChange={(e) => setShareMessage(e.target.value)}
          placeholder="Write your progress update message here..."
          rows={8}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none mb-4"
        />

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            {shareMessage.length}/280 characters
          </span>
          <div className="flex space-x-2">
            <button className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Preview
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Save Draft
            </button>
          </div>
        </div>
      </div>

      {/* Social Platforms */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/20">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Share on Social Media</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {socialPlatforms.map((platform, index) => (
            <button
              key={index}
              onClick={() => platform.enabled && handleShare(platform.name)}
              disabled={!platform.enabled}
              className={`flex items-center space-x-4 p-4 rounded-2xl transition-all ${
                platform.enabled
                  ? 'bg-gray-50 hover:bg-gray-100 cursor-pointer'
                  : 'bg-gray-100 cursor-not-allowed opacity-50'
              }`}
            >
              <div className={`w-12 h-12 ${platform.color} rounded-xl flex items-center justify-center text-white text-xl`}>
                {platform.icon}
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-medium text-gray-900">Share on {platform.name}</h3>
                <p className="text-sm text-gray-600">
                  {platform.enabled ? 'Post your progress update' : 'Coming soon'}
                </p>
              </div>
              {platform.enabled && (
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              )}
            </button>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-2xl border border-blue-200">
          <div className="flex items-start space-x-3">
            <span className="text-blue-600 text-xl">💡</span>
            <div>
              <h4 className="font-medium text-blue-900">Sharing Tips</h4>
              <ul className="text-sm text-blue-700 mt-2 space-y-1">
                <li>• Share consistently to build an audience</li>
                <li>• Include relevant hashtags for better reach</li>
                <li>• Engage with others in the coding community</li>
                <li>• Share both wins and challenges for authenticity</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
