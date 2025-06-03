"use client";

import { useState } from "react";

export default function JournalSection() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [journalEntry, setJournalEntry] = useState("");
  const [keyLearnings, setKeyLearnings] = useState("");
  const [challenges, setChallenges] = useState("");

  const recentEntries = [
    {
      date: "2024-01-15",
      title: "Great progress on React project",
      preview: "Today was productive. Completed the authentication system and started working on the dashboard components...",
      mood: "😊",
      learnings: ["React Context optimization", "JWT implementation"],
      challenges: ["CSS Grid layout issues"]
    },
    {
      date: "2024-01-14",
      title: "Challenging but rewarding day",
      preview: "Faced some difficulties with the API integration but managed to solve them by evening...",
      mood: "😤",
      learnings: ["Error handling patterns", "Debugging techniques"],
      challenges: ["API rate limiting", "CORS issues"]
    },
    {
      date: "2024-01-13",
      title: "Learning new technologies",
      preview: "Spent time exploring Next.js 14 features and TypeScript advanced patterns...",
      mood: "🤓",
      learnings: ["Next.js App Router", "TypeScript generics"],
      challenges: ["Server components migration"]
    }
  ];

  const moods = ["😊", "😐", "😢", "😠", "🤓", "😴", "🤔", "😤"];
  const [selectedMood, setSelectedMood] = useState("😊");

  const handleSave = () => {
    // Save journal entry logic here
    console.log({
      date: selectedDate,
      entry: journalEntry,
      learnings: keyLearnings,
      challenges: challenges,
      mood: selectedMood
    });
    // Reset form or show success message
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/20">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Daily Journal</h1>
        <p className="text-gray-600">Reflect on your progress and document your journey</p>
      </div>

      {/* Journal Entry Form */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Today's Entry</h2>
          <div className="flex items-center space-x-4">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Mood:</span>
              <div className="flex space-x-1">
                {moods.map((mood) => (
                  <button
                    key={mood}
                    onClick={() => setSelectedMood(mood)}
                    className={`text-2xl p-1 rounded-lg transition-all ${
                      selectedMood === mood ? 'bg-green-100 scale-110' : 'hover:bg-gray-100'
                    }`}
                  >
                    {mood}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Daily Reflection
            </label>
            <textarea
              value={journalEntry}
              onChange={(e) => setJournalEntry(e.target.value)}
              placeholder="How was your day? What did you accomplish? How are you feeling?"
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Key Learnings
              </label>
              <textarea
                value={keyLearnings}
                onChange={(e) => setKeyLearnings(e.target.value)}
                placeholder="What new things did you learn today?"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Challenges Faced
              </label>
              <textarea
                value={challenges}
                onChange={(e) => setChallenges(e.target.value)}
                placeholder="What challenges did you encounter?"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl hover:from-green-700 hover:to-blue-700 transition-all duration-300 font-medium"
            >
              Save Entry
            </button>
          </div>
        </div>
      </div>

      {/* Recent Entries */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/20">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Entries</h2>
        
        <div className="space-y-4">
          {recentEntries.map((entry, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{entry.mood}</span>
                  <div>
                    <h3 className="font-medium text-gray-900">{entry.title}</h3>
                    <p className="text-sm text-gray-500">{entry.date}</p>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 mb-3 line-clamp-2">{entry.preview}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {entry.learnings.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-green-700 mb-1">Key Learnings</h4>
                    <ul className="text-sm text-gray-600">
                      {entry.learnings.map((learning, idx) => (
                        <li key={idx} className="flex items-center space-x-1">
                          <span className="text-green-500">•</span>
                          <span>{learning}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {entry.challenges.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-red-700 mb-1">Challenges</h4>
                    <ul className="text-sm text-gray-600">
                      {entry.challenges.map((challenge, idx) => (
                        <li key={idx} className="flex items-center space-x-1">
                          <span className="text-red-500">•</span>
                          <span>{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
