"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiPlus, FiBook, FiEdit3, FiCalendar, FiBarChart2, FiHeart,
  FiTarget, FiSun, FiTrendingUp, FiX, FiAward, FiZap
} from "react-icons/fi";
import { FaBrain } from "react-icons/fa";

interface Journal {
  _id: string;
  date: string;
  title?: string;
  content: string;
  mood: string;
  energyLevel: number;
  keyLearnings: string[];
  challenges: string[];
  wins: string[];
  goals: string[];
  gratitude: string[];
  tomorrowFocus: string[];
  tags: string[];
  wordCount: number;
}

export default function JournalSection() {
  const { data: session } = useSession();
  const [journals, setJournals] = useState<Journal[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({ current: 1, pages: 1, total: 0 });
  const [newJournal, setNewJournal] = useState({
    title: '',
    content: '',
    mood: '😐',
    energyLevel: 5,
    keyLearnings: [] as string[],
    challenges: [] as string[],
    wins: [] as string[],
    goals: [] as string[],
    gratitude: [] as string[],
    tomorrowFocus: [] as string[],
    tags: [] as string[],
    newItem: '',
    activeSection: 'content' as 'content' | 'keyLearnings' | 'challenges' | 'wins' | 'goals' | 'gratitude' | 'tomorrowFocus'
  });

  useEffect(() => {
    if (session) {
      fetchJournals();
    }
  }, [session, currentPage]);

  const fetchJournals = async () => {
    try {
      const response = await fetch(`/api/journal?page=${currentPage}&limit=5`);
      const data = await response.json();
      
      if (response.ok) {
        setJournals(data.journals);
        setPagination(data.pagination);
      }
    } catch (error) {
      console.error('Failed to fetch journals:', error);
    } finally {
      setLoading(false);
    }
  };

  const createJournal = async () => {
    try {
      const { newItem, activeSection, ...journalData } = newJournal;
      const response = await fetch('/api/journal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(journalData)
      });

      if (response.ok) {
        const data = await response.json();
        setJournals([data.journal, ...journals]);
        setNewJournal({
          title: '',
          content: '',
          mood: '😐',
          energyLevel: 5,
          keyLearnings: [],
          challenges: [],
          wins: [],
          goals: [],
          gratitude: [],
          tomorrowFocus: [],
          tags: [],
          newItem: '',
          activeSection: 'content'
        });
        setShowAddForm(false);
      }
    } catch (error) {
      console.error('Failed to create journal:', error);
    }
  };

  const addItemToSection = (section: keyof typeof newJournal) => {
    if (newJournal.newItem.trim() && Array.isArray(newJournal[section])) {
      setNewJournal({
        ...newJournal,
        [section]: [...(newJournal[section] as string[]), newJournal.newItem.trim()],
        newItem: ''
      });
    }
  };

  const removeItemFromSection = (section: keyof typeof newJournal, index: number) => {
    if (Array.isArray(newJournal[section])) {
      const updated = [...(newJournal[section] as string[])];
      updated.splice(index, 1);
      setNewJournal({
        ...newJournal,
        [section]: updated
      });
    }
  };

  const moodOptions = [
    { emoji: '😢', label: 'Very Sad', value: '😢' },
    { emoji: '😞', label: 'Sad', value: '😞' },
    { emoji: '😐', label: 'Neutral', value: '😐' },
    { emoji: '😊', label: 'Happy', value: '😊' },
    { emoji: '😁', label: 'Very Happy', value: '😁' }
  ];

  const sectionConfig = {
    keyLearnings: { icon: <FaBrain className="w-4 h-4" />, label: 'Key Learnings', color: 'blue' },
    challenges: { icon: <FiZap className="w-4 h-4" />, label: 'Challenges', color: 'red' },
    wins: { icon: <FiAward className="w-4 h-4" />, label: 'Wins', color: 'green' },
    goals: { icon: <FiTarget className="w-4 h-4" />, label: 'Goals', color: 'purple' },
    gratitude: { icon: <FiHeart className="w-4 h-4" />, label: 'Gratitude', color: 'pink' },
    tomorrowFocus: { icon: <FiSun className="w-4 h-4" />, label: 'Tomorrow Focus', color: 'yellow' }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        </div>
        
        <div className="relative flex justify-center items-center h-64">
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-2xl">
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
              <p className="text-gray-600 font-medium">Loading your journal...</p>
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

  const totalWords = journals.reduce((sum, j) => sum + j.wordCount, 0);
  const avgWordsPerEntry = journals.length > 0 ? Math.round(totalWords / journals.length) : 0;
  const streakDays = journals.length; // Simplified streak calculation

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-purple-400 rounded-full animate-float"></div>
        <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-pink-400 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-blue-400 rounded-full animate-float"></div>
        <div className="absolute top-1/2 right-1/3 w-5 h-5 bg-indigo-400 rounded-full animate-float-delayed"></div>
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
                Personal 
                <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent"> Journal</span>
              </h2>
              <div className="inline-flex items-center px-3 py-1 bg-purple-100/80 backdrop-blur-sm rounded-full text-sm font-medium text-purple-700 border border-purple-200">
                <FiBook className="w-4 h-4 mr-2" />
                Reflect & Grow
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddForm(true)}
              className="group relative bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-2xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <FiPlus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              <span className="hidden sm:inline">New Entry</span>
              <span className="sm:hidden">Add</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            </motion.button>
          </div>

          {/* Stats Grid - Responsive */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          >
            <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 backdrop-blur-sm p-4 sm:p-6 rounded-2xl border border-purple-200/50">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center">
                  <FiBook className="w-5 h-5 text-white" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-purple-600">{journals.length}</div>
              </div>
              <div className="text-sm text-gray-600">Total Entries</div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 backdrop-blur-sm p-4 sm:p-6 rounded-2xl border border-blue-200/50">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                  <FiEdit3 className="w-5 h-5 text-white" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-blue-600">{totalWords.toLocaleString()}</div>
              </div>
              <div className="text-sm text-gray-600">Total Words</div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100/50 backdrop-blur-sm p-4 sm:p-6 rounded-2xl border border-green-200/50">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                  <FiBarChart2 className="w-5 h-5 text-white" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-green-600">{avgWordsPerEntry}</div>
              </div>
              <div className="text-sm text-gray-600">Avg Words/Entry</div>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100/50 backdrop-blur-sm p-4 sm:p-6 rounded-2xl border border-yellow-200/50">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center">
                  <FiTrendingUp className="w-5 h-5 text-white" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-yellow-600">{streakDays}</div>
              </div>
              <div className="text-sm text-gray-600">Journal Days</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Journal Entries */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="space-y-6"
        >
          {journals.map((entry, index) => (
            <motion.div
              key={entry._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -2, scale: 1.01 }}
              className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg border border-white/20 p-6 hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {entry.title || `Journal Entry`}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <FiCalendar className="w-4 h-4" />
                      {new Date(entry.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <FiEdit3 className="w-4 h-4" />
                      {entry.wordCount} words
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-white/50 backdrop-blur-sm rounded-xl px-3 py-2 border border-white/30">
                    <span className="text-2xl">{entry.mood}</span>
                    <div className="text-sm text-gray-600">
                      <div>Energy</div>
                      <div className="font-bold">{entry.energyLevel}/10</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{entry.content}</p>
                </div>
              </div>

              {/* Sections Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(sectionConfig).map(([key, config]) => {
                  const items = entry[key as keyof Journal] as string[];
                  if (!items || items.length === 0) return null;

                  return (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 border border-white/30"
                    >
                      <h4 className={`font-semibold text-gray-900 mb-3 flex items-center gap-2 text-${config.color}-600`}>
                        {config.icon}
                        {config.label}
                      </h4>
                      <ul className="space-y-2">
                        {items.map((item, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}

          {journals.length === 0 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg border border-white/20 p-12 text-center"
            >
              <div className="text-6xl mb-4">📖</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Journal Entries Yet</h3>
              <p className="text-gray-600 mb-6">Start documenting your journey and thoughts!</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAddForm(true)}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-2xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
              >
                Write Your First Entry
              </motion.button>
            </motion.div>
          )}
        </motion.div>

        {/* Pagination */}
        {pagination.pages > 1 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex justify-center items-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-6 py-3 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/30 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/90 transition-all duration-300"
            >
              Previous
            </motion.button>
            <div className="px-4 py-2 bg-white/50 backdrop-blur-sm rounded-xl border border-white/30">
              Page {pagination.current} of {pagination.pages}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentPage(Math.min(pagination.pages, currentPage + 1))}
              disabled={currentPage === pagination.pages}
              className="px-6 py-3 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/30 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/90 transition-all duration-300"
            >
              Next
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Modal Popup for Add Journal Form */}
      <AnimatePresence>
        {showAddForm && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddForm(false)}
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
                      <h3 className="text-2xl font-bold text-gray-900">New Journal Entry</h3>
                      <p className="text-gray-600 mt-1">Capture your thoughts and reflections</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setShowAddForm(false)}
                      className="w-12 h-12 bg-red-100 hover:bg-red-200 rounded-2xl flex items-center justify-center transition-colors group"
                    >
                      <FiX className="w-6 h-6 text-red-600 group-hover:text-red-700" />
                    </motion.button>
                  </div>
                </div>

                {/* Modal Body */}
                <div className="p-6">
                  {/* Title and Energy */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Title (Optional)</label>
                      <input
                        type="text"
                        placeholder="Give your entry a title..."
                        value={newJournal.title}
                        onChange={(e) => setNewJournal({...newJournal, title: e.target.value})}
                        className="w-full bg-white/70 backdrop-blur-sm border-2 border-gray-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Energy Level</label>
                      <div className="bg-white/70 backdrop-blur-sm border-2 border-gray-200 rounded-2xl p-4">
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={newJournal.energyLevel}
                          onChange={(e) => setNewJournal({...newJournal, energyLevel: parseInt(e.target.value)})}
                          className="w-full accent-purple-500"
                        />
                        <div className="text-center text-lg font-bold text-purple-600 mt-2">
                          {newJournal.energyLevel}/10
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Mood Selection */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-6"
                  >
                    <label className="block text-sm font-semibold text-gray-700 mb-3">How are you feeling?</label>
                    <div className="grid grid-cols-5 gap-3">
                      {moodOptions.map((mood) => (
                        <motion.button
                          key={mood.value}
                          type="button"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setNewJournal({...newJournal, mood: mood.value})}
                          className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                            newJournal.mood === mood.value
                              ? 'border-purple-500 bg-purple-50 scale-105'
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

                  {/* Content */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mb-6"
                  >
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Your Thoughts</label>
                    <textarea
                      value={newJournal.content}
                      onChange={(e) => setNewJournal({...newJournal, content: e.target.value})}
                      className="w-full bg-white/70 backdrop-blur-sm border-2 border-gray-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 resize-none"
                      rows={6}
                      placeholder="Write about your day, thoughts, experiences..."
                    />
                  </motion.div>

                  {/* Section Management */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mb-8"
                  >
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Additional Sections</label>
                    
                    {/* Section Tabs */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {Object.entries(sectionConfig).map(([key, config]) => (
                        <motion.button
                          key={key}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setNewJournal({...newJournal, activeSection: key as any})}
                          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                            newJournal.activeSection === key
                              ? `bg-${config.color}-500 text-white shadow-lg`
                              : 'bg-white/70 text-gray-600 hover:bg-white/90 border border-gray-200'
                          }`}
                        >
                          {config.icon}
                          {config.label}
                        </motion.button>
                      ))}
                    </div>

                    {/* Active Section Input */}
                    <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 border-2 border-gray-200">
                      <div className="flex gap-2 mb-3">
                        <input
                          type="text"
                          placeholder={`Add ${sectionConfig[newJournal.activeSection as keyof typeof sectionConfig]?.label || 'item'}...`}
                          value={newJournal.newItem}
                          onChange={(e) => setNewJournal({...newJournal, newItem: e.target.value})}
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addItemToSection(newJournal.activeSection))}
                          className="flex-1 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                        />
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => addItemToSection(newJournal.activeSection)}
                          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-medium"
                        >
                          Add
                        </motion.button>
                      </div>

                      <div className="space-y-2 max-h-32 overflow-y-auto">
                        {Array.isArray(newJournal[newJournal.activeSection]) && 
                          (newJournal[newJournal.activeSection] as string[]).length === 0 ? (
                          <p className="text-gray-400 text-sm italic text-center py-4">No items added yet</p>
                        ) : (
                          (newJournal[newJournal.activeSection] as string[]).map((item, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              className="flex items-center justify-between bg-white/70 backdrop-blur-sm p-3 rounded-xl border border-white/30"
                            >
                              <span className="text-sm text-gray-700">{item}</span>
                              <motion.button
                                whileHover={{ scale: 1.2 }}
                                onClick={() => removeItemFromSection(newJournal.activeSection, index)}
                                className="text-red-500 hover:text-red-700 transition-colors"
                              >
                                <FiX className="w-4 h-4" />
                              </motion.button>
                            </motion.div>
                          ))
                        )}
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Modal Footer */}
                <div className="sticky bottom-0 bg-white/80 backdrop-blur-md rounded-b-3xl p-6 border-t border-white/20">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={createJournal}
                      disabled={!newJournal.content.trim()}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <FiBook className="w-5 h-5" />
                      Save Entry
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowAddForm(false)}
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
