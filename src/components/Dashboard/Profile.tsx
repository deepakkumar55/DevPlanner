"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiUser, FiMail, FiCalendar, FiTarget, FiDollarSign, FiSettings,
  FiEdit3, FiSave, FiX, FiCamera, FiEye, FiEyeOff, FiGithub,
  FiTwitter, FiLinkedin, FiYoutube, FiInstagram, FiGlobe, FiTrendingUp,
  FiZap, FiAward, FiBell, FiMail as FiMailIcon, FiShare2, FiLock
} from "react-icons/fi";

interface UserProfile {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  profileImage?: string;
  joinDate: string;
  currentDay: number;
  totalDays: number;
  isPublicProfile: boolean;
  publicSlug?: string;
  targetRevenue: number;
  currentRevenue: number;
  streakCount: number;
  lastActiveDate: string;
  settings: {
    notifications: boolean;
    emailUpdates: boolean;
    publicSharing: boolean;
  };
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    youtube?: string;
    instagram?: string;
  };
  completionPercentage: number;
  revenuePercentage: number;
}

export default function Profile() {
  const { data: session, update } = useSession();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<Partial<UserProfile>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const tabs = [
    { id: "general", name: "General", icon: <FiUser className="w-5 h-5" /> },
    { id: "progress", name: "Progress", icon: <FiTrendingUp className="w-5 h-5" /> },
    { id: "social", name: "Social Links", icon: <FiGlobe className="w-5 h-5" /> },
    { id: "settings", name: "Settings", icon: <FiSettings className="w-5 h-5" /> },
  ];

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/user');
      const data = await response.json();
      
      if (response.ok) {
        const userProfile = {
          ...data.user,
          completionPercentage: Math.round((data.user.currentDay / data.user.totalDays) * 100),
          revenuePercentage: Math.round((data.user.currentRevenue / data.user.targetRevenue) * 100)
        };
        setProfile(userProfile);
        setFormData(userProfile);
      }
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setErrors({});
    
    try {
      const response = await fetch('/api/user', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        setProfile(data.user);
        setEditMode(false);
        await update(); // Update the session
      } else {
        const errorData = await response.json();
        setErrors(errorData.errors || { general: 'Failed to update profile' });
      }
    } catch (error) {
      setErrors({ general: 'Network error occurred' });
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData(profile || {});
    setEditMode(false);
    setErrors({});
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name?.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (formData.targetRevenue && formData.targetRevenue < 0) {
      newErrors.targetRevenue = 'Target revenue must be positive';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        </div>
        
        <div className="relative flex justify-center items-center h-64">
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-2xl">
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="text-gray-600 font-medium">Loading your profile...</p>
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

  if (!profile) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-6 sm:p-8"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-xl">
                  {profile.profileImage ? (
                    <img 
                      src={profile.profileImage} 
                      alt={profile.name}
                      className="w-full h-full rounded-3xl object-cover"
                    />
                  ) : (
                    <span className="text-white font-bold text-2xl">
                      {profile.avatar || profile.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                {editMode && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 rounded-xl flex items-center justify-center text-white shadow-lg"
                  >
                    <FiCamera className="w-4 h-4" />
                  </motion.button>
                )}
              </div>
              
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {profile.name}
                </h1>
                <p className="text-gray-600 flex items-center gap-2 mt-1">
                  <FiMail className="w-4 h-4" />
                  {profile.email}
                </p>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <FiCalendar className="w-4 h-4" />
                    Joined {new Date(profile.joinDate).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiZap className="w-4 h-4" />
                    {profile.streakCount} day streak
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {editMode ? (
                <>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-2xl font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <FiSave className="w-4 h-4" />
                    {saving ? 'Saving...' : 'Save'}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCancel}
                    className="bg-gray-200 text-gray-700 px-6 py-3 rounded-2xl font-semibold flex items-center gap-2 hover:bg-gray-300 transition-colors"
                  >
                    <FiX className="w-4 h-4" />
                    Cancel
                  </motion.button>
                </>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setEditMode(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-2xl font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <FiEdit3 className="w-4 h-4" />
                  Edit Profile
                </motion.button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                <FiCalendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">{profile.currentDay}</div>
                <div className="text-sm text-gray-600">Current Day</div>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                <FiTarget className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">{profile.completionPercentage}%</div>
                <div className="text-sm text-gray-600">Progress</div>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center">
                <FiDollarSign className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">₹{profile.currentRevenue.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Revenue</div>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
                <FiAward className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">{profile.streakCount}</div>
                <div className="text-sm text-gray-600">Streak</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg border border-white/20 overflow-hidden"
        >
          {/* Tab Headers */}
          <div className="flex border-b border-white/20 bg-white/30">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-6 py-4 flex items-center justify-center gap-2 font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'text-blue-600 bg-white/50 border-b-2 border-blue-500'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/30'
                }`}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.name}</span>
              </motion.button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {activeTab === "general" && (
                <motion.div
                  key="general"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name
                      </label>
                      {editMode ? (
                        <input
                          type="text"
                          value={formData.name || ''}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full bg-white/70 backdrop-blur-sm border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                        />
                      ) : (
                        <div className="bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-3">
                          {profile.name}
                        </div>
                      )}
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="bg-gray-100/70 backdrop-blur-sm border border-gray-300 rounded-xl px-4 py-3 text-gray-600">
                        {profile.email} <span className="text-xs">(Cannot be changed)</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Public Slug
                      </label>
                      {editMode ? (
                        <div className="flex items-center">
                          <span className="bg-gray-100 px-3 py-3 rounded-l-xl text-gray-600 border border-r-0 border-gray-300">
                            cashflowcoders.com/
                          </span>
                          <input
                            type="text"
                            value={formData.publicSlug || ''}
                            onChange={(e) => setFormData({...formData, publicSlug: e.target.value})}
                            className="flex-1 bg-white/70 backdrop-blur-sm border-2 border-l-0 border-gray-200 rounded-r-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                          />
                        </div>
                      ) : (
                        <div className="bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-3">
                          cashflowcoders.com/{profile.publicSlug}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Profile Visibility
                      </label>
                      <div className="flex items-center gap-3">
                        {editMode ? (
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setFormData({...formData, isPublicProfile: !formData.isPublicProfile})}
                            className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-300 ${
                              formData.isPublicProfile ? 'bg-green-500' : 'bg-gray-300'
                            }`}
                          >
                            <motion.span
                              animate={{ x: formData.isPublicProfile ? 24 : 4 }}
                              transition={{ type: "spring", stiffness: 500, damping: 30 }}
                              className="inline-block h-6 w-6 transform rounded-full bg-white shadow-lg"
                            />
                          </motion.button>
                        ) : (
                          <div className={`inline-flex h-8 w-14 items-center rounded-full ${
                            profile.isPublicProfile ? 'bg-green-500' : 'bg-gray-300'
                          }`}>
                            <span className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform ${
                              profile.isPublicProfile ? 'translate-x-6' : 'translate-x-1'
                            }`} />
                          </div>
                        )}
                        <span className="text-sm text-gray-600">
                          {(editMode ? formData.isPublicProfile : profile.isPublicProfile) ? 'Public' : 'Private'}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "progress" && (
                <motion.div
                  key="progress"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Current Day
                      </label>
                      {editMode ? (
                        <input
                          type="number"
                          min="1"
                          max={formData.totalDays || 100}
                          value={formData.currentDay || 1}
                          onChange={(e) => setFormData({...formData, currentDay: parseInt(e.target.value) || 1})}
                          className="w-full bg-white/70 backdrop-blur-sm border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                        />
                      ) : (
                        <div className="bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-3">
                          {profile.currentDay} / {profile.totalDays}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Target Revenue (₹)
                      </label>
                      {editMode ? (
                        <input
                          type="number"
                          min="0"
                          value={formData.targetRevenue || 0}
                          onChange={(e) => setFormData({...formData, targetRevenue: parseInt(e.target.value) || 0})}
                          className="w-full bg-white/70 backdrop-blur-sm border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                        />
                      ) : (
                        <div className="bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-3">
                          ₹{profile.targetRevenue.toLocaleString()}
                        </div>
                      )}
                      {errors.targetRevenue && <p className="text-red-500 text-sm mt-1">{errors.targetRevenue}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Current Revenue (₹)
                      </label>
                      <div className="bg-gray-100/70 backdrop-blur-sm border border-gray-300 rounded-xl px-4 py-3 text-gray-600">
                        ₹{profile.currentRevenue.toLocaleString()} <span className="text-xs">(Auto-calculated)</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Streak Count
                      </label>
                      <div className="bg-gray-100/70 backdrop-blur-sm border border-gray-300 rounded-xl px-4 py-3 text-gray-600">
                        {profile.streakCount} days <span className="text-xs">(Auto-calculated)</span>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bars */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Journey Progress</span>
                        <span className="text-sm font-bold text-blue-600">{profile.completionPercentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${profile.completionPercentage}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Revenue Progress</span>
                        <span className="text-sm font-bold text-green-600">{profile.revenuePercentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(profile.revenuePercentage, 100)}%` }}
                          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                          className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "social" && (
                <motion.div
                  key="social"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 gap-6">
                    {[
                      { key: 'twitter', icon: <FiTwitter className="w-5 h-5" />, label: 'Twitter', placeholder: 'https://twitter.com/username' },
                      { key: 'linkedin', icon: <FiLinkedin className="w-5 h-5" />, label: 'LinkedIn', placeholder: 'https://linkedin.com/in/username' },
                      { key: 'github', icon: <FiGithub className="w-5 h-5" />, label: 'GitHub', placeholder: 'https://github.com/username' },
                      { key: 'youtube', icon: <FiYoutube className="w-5 h-5" />, label: 'YouTube', placeholder: 'https://youtube.com/@username' },
                      { key: 'instagram', icon: <FiInstagram className="w-5 h-5" />, label: 'Instagram', placeholder: 'https://instagram.com/username' }
                    ].map((social) => (
                      <div key={social.key}>
                        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                          {social.icon}
                          {social.label}
                        </label>
                        {editMode ? (
                          <input
                            type="url"
                            value={formData.socialLinks?.[social.key as keyof typeof formData.socialLinks] || ''}
                            onChange={(e) => setFormData({
                              ...formData,
                              socialLinks: {
                                ...formData.socialLinks,
                                [social.key]: e.target.value
                              }
                            })}
                            placeholder={social.placeholder}
                            className="w-full bg-white/70 backdrop-blur-sm border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                          />
                        ) : (
                          <div className="bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-3">
                            {profile.socialLinks?.[social.key as keyof typeof profile.socialLinks] || 'Not set'}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === "settings" && (
                <motion.div
                  key="settings"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <div className="space-y-4">
                    {[
                      { key: 'notifications', icon: <FiBell className="w-5 h-5" />, label: 'Push Notifications', description: 'Receive notifications for important updates' },
                      { key: 'emailUpdates', icon: <FiMailIcon className="w-5 h-5" />, label: 'Email Updates', description: 'Get weekly progress reports via email' },
                      { key: 'publicSharing', icon: <FiShare2 className="w-5 h-5" />, label: 'Public Sharing', description: 'Allow others to see your progress' }
                    ].map((setting) => (
                      <div key={setting.key} className="flex items-center justify-between p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-white/30">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                            {setting.icon}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{setting.label}</h3>
                            <p className="text-sm text-gray-600">{setting.description}</p>
                          </div>
                        </div>
                        
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            if (editMode) {
                              setFormData({
                                ...formData,
                                settings: {
                                  ...formData.settings,
                                  [setting.key]: !formData.settings?.[setting.key as keyof typeof formData.settings]
                                }
                              });
                            }
                          }}
                          disabled={!editMode}
                          className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-300 ${
                            (editMode ? formData.settings?.[setting.key as keyof typeof formData.settings] : profile.settings[setting.key as keyof typeof profile.settings])
                              ? 'bg-green-500' : 'bg-gray-300'
                          } ${!editMode ? 'cursor-not-allowed opacity-60' : ''}`}
                        >
                          <motion.span
                            animate={{ 
                              x: (editMode ? formData.settings?.[setting.key as keyof typeof formData.settings] : profile.settings[setting.key as keyof typeof profile.settings]) ? 24 : 4 
                            }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            className="inline-block h-6 w-6 transform rounded-full bg-white shadow-lg"
                          />
                        </motion.button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
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
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
}
