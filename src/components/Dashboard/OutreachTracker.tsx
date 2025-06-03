"use client";

import { useState } from "react";

export default function OutreachTracker() {
  const [selectedPeriod, setSelectedPeriod] = useState("week");

  const outreachData = {
    today: {
      coldEmails: 12,
      coldDMs: 8,
      responses: 3,
      meetings: 1
    },
    week: {
      coldEmails: 65,
      coldDMs: 45,
      responses: 18,
      meetings: 5,
      newClients: 2
    },
    month: {
      coldEmails: 280,
      coldDMs: 190,
      responses: 85,
      meetings: 22,
      newClients: 7
    }
  };

  const clients = [
    { id: 1, name: "TechCorp Solutions", project: "E-commerce Website", value: "₹75,000", status: "active", date: "2024-01-10" },
    { id: 2, name: "StartupXYZ", project: "Mobile App Development", value: "₹1,20,000", status: "active", date: "2024-01-08" },
    { id: 3, name: "Digital Agency", project: "Landing Page", value: "₹25,000", status: "completed", date: "2024-01-05" },
    { id: 4, name: "Online Store", project: "Payment Integration", value: "₹40,000", status: "pending", date: "2024-01-12" }
  ];

  const recentOutreach = [
    { id: 1, type: "email", target: "Marketing Director @ TechFlow", subject: "Custom React Components", status: "sent", date: "2 hours ago" },
    { id: 2, type: "dm", target: "CEO @ StartupHub", subject: "Web Development Services", status: "replied", date: "4 hours ago" },
    { id: 3, type: "email", target: "Founder @ EcomBrand", subject: "E-commerce Solutions", status: "opened", date: "6 hours ago" },
    { id: 4, type: "dm", target: "CTO @ FinTech Co", subject: "API Development", status: "sent", date: "1 day ago" }
  ];

  const currentData = outreachData[selectedPeriod as keyof typeof outreachData];
  const responseRate = Math.round((currentData.responses / (currentData.coldEmails + currentData.coldDMs)) * 100);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'completed': return 'bg-blue-100 text-blue-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'replied': return 'bg-green-100 text-green-700';
      case 'opened': return 'bg-blue-100 text-blue-700';
      case 'sent': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/20">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Outreach & Freelance Tracker</h1>
        <p className="text-gray-600">Monitor your outreach efforts and freelance opportunities</p>
      </div>

      {/* Period Selector */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20">
        <div className="flex space-x-2">
          {[
            { id: 'today', name: 'Today' },
            { id: 'week', name: 'This Week' },
            { id: 'month', name: 'This Month' }
          ].map((period) => (
            <button
              key={period.id}
              onClick={() => setSelectedPeriod(period.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedPeriod === period.id
                  ? 'bg-green-100 text-green-700'
                  : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              {period.name}
            </button>
          ))}
        </div>
      </div>

      {/* Outreach Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Cold Emails</p>
              <p className="text-2xl font-bold text-blue-600">{currentData.coldEmails}</p>
            </div>
            <div className="text-2xl">📧</div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Cold DMs</p>
              <p className="text-2xl font-bold text-purple-600">{currentData.coldDMs}</p>
            </div>
            <div className="text-2xl">💬</div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Responses</p>
              <p className="text-2xl font-bold text-green-600">{currentData.responses}</p>
            </div>
            <div className="text-2xl">✉️</div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 font-medium">Response Rate</p>
              <p className="text-2xl font-bold text-orange-600">{responseRate}%</p>
            </div>
            <div className="text-2xl">📊</div>
          </div>
        </div>
      </div>

      {/* Clients & Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/20">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Active Clients & Projects</h3>
          <div className="space-y-4">
            {clients.map((client) => (
              <div key={client.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                <div>
                  <h4 className="font-medium text-gray-900">{client.name}</h4>
                  <p className="text-sm text-gray-600">{client.project}</p>
                  <p className="text-xs text-gray-500 mt-1">{client.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{client.value}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(client.status)}`}>
                    {client.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/20">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Outreach</h3>
          <div className="space-y-4">
            {recentOutreach.map((item) => (
              <div key={item.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-2xl">
                <div className="text-lg">
                  {item.type === 'email' ? '📧' : '💬'}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm">{item.target}</p>
                  <p className="text-sm text-gray-600">{item.subject}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                    <span className="text-xs text-gray-500">{item.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/20">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center space-x-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-2xl transition-colors">
            <span className="text-2xl">📧</span>
            <div className="text-left">
              <p className="font-medium text-blue-700">Send Cold Email</p>
              <p className="text-sm text-blue-600">Reach out to new prospects</p>
            </div>
          </button>
          
          <button className="flex items-center space-x-3 p-4 bg-purple-50 hover:bg-purple-100 rounded-2xl transition-colors">
            <span className="text-2xl">💬</span>
            <div className="text-left">
              <p className="font-medium text-purple-700">Send DM</p>
              <p className="text-sm text-purple-600">Connect on social media</p>
            </div>
          </button>
          
          <button className="flex items-center space-x-3 p-4 bg-green-50 hover:bg-green-100 rounded-2xl transition-colors">
            <span className="text-2xl">👥</span>
            <div className="text-left">
              <p className="font-medium text-green-700">Add Client</p>
              <p className="text-sm text-green-600">Record new opportunity</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
