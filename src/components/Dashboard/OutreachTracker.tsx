"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiPlus, FiMail, FiMessageSquare, FiPhone, FiUsers, FiSend,
  FiCheck, FiX, FiFilter, FiTrendingUp,
  FiDollarSign, FiCalendar, FiTag
} from "react-icons/fi";
import { FaBuilding } from "react-icons/fa";


interface Outreach {
  _id: string;
  type: 'email' | 'dm' | 'call' | 'meeting';
  platform?: string;
  targetName: string;
  targetEmail?: string;
  targetCompany?: string;
  subject: string;
  message?: string;
  status: 'sent' | 'delivered' | 'opened' | 'replied' | 'bounced' | 'no-response';
  sentAt: string;
  openedAt?: string;
  repliedAt?: string;
  response?: string;
  tags: string[];
  leadSource?: string;
  conversionValue?: number;
}

export default function OutreachTracker() {
  const { data: session } = useSession();
  const [outreach, setOutreach] = useState<Outreach[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [filter, setFilter] = useState({ type: 'all', status: 'all' });
  const [newOutreach, setNewOutreach] = useState({
    type: 'email' as Outreach['type'],
    platform: '',
    targetName: '',
    targetEmail: '',
    targetCompany: '',
    subject: '',
    message: '',
    tags: [] as string[],
    tagInput: '',
    leadSource: ''
  });

  useEffect(() => {
    if (session) {
      fetchOutreach();
    }
  }, [session, filter]);

  const fetchOutreach = async () => {
    try {
      const params = new URLSearchParams();
      if (filter.type !== 'all') params.set('type', filter.type);
      if (filter.status !== 'all') params.set('status', filter.status);

      const response = await fetch(`/api/outreach?${params.toString()}`);
      const data = await response.json();
      
      if (response.ok) {
        setOutreach(data.outreach);
      }
    } catch (error) {
      console.error('Failed to fetch outreach:', error);
    } finally {
      setLoading(false);
    }
  };

  const createOutreach = async () => {
    try {
      const { tagInput, ...outreachData } = newOutreach;
      const response = await fetch('/api/outreach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(outreachData)
      });

      if (response.ok) {
        const data = await response.json();
        setOutreach([data.outreach, ...outreach]);
        setNewOutreach({
          type: 'email',
          platform: '',
          targetName: '',
          targetEmail: '',
          targetCompany: '',
          subject: '',
          message: '',
          tags: [],
          tagInput: '',
          leadSource: ''
        });
        setShowAddForm(false);
      }
    } catch (error) {
      console.error('Failed to create outreach:', error);
    }
  };

  const updateStatus = async (id: string, status: Outreach['status']) => {
    try {
      const response = await fetch(`/api/outreach/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });

      if (response.ok) {
        const data = await response.json();
        setOutreach(outreach.map(item => 
          item._id === id ? data.outreach : item
        ));
      }
    } catch (error) {
      console.error('Failed to update outreach:', error);
    }
  };

  const addTag = () => {
    if (newOutreach.tagInput.trim() && !newOutreach.tags.includes(newOutreach.tagInput.trim())) {
      setNewOutreach({
        ...newOutreach,
        tags: [...newOutreach.tags, newOutreach.tagInput.trim()],
        tagInput: ''
      });
    }
  };

  const removeTag = (tagToRemove: string) => {
    setNewOutreach({
      ...newOutreach,
      tags: newOutreach.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-blue-100/80 text-blue-700 border-blue-200';
      case 'delivered': return 'bg-green-100/80 text-green-700 border-green-200';
      case 'opened': return 'bg-purple-100/80 text-purple-700 border-purple-200';
      case 'replied': return 'bg-emerald-100/80 text-emerald-700 border-emerald-200';
      case 'bounced': return 'bg-red-100/80 text-red-700 border-red-200';
      case 'no-response': return 'bg-gray-100/80 text-gray-700 border-gray-200';
      default: return 'bg-gray-100/80 text-gray-700 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email': return <FiMail className="w-5 h-5 text-blue-500" />;
      case 'dm': return <FiMessageSquare className="w-5 h-5 text-purple-500" />;
      case 'call': return <FiPhone className="w-5 h-5 text-green-500" />;
      case 'meeting': return <FiUsers className="w-5 h-5 text-orange-500" />;
      default: return <FiSend className="w-5 h-5 text-gray-500" />;
    }
  };

  const outreachTypes = [
    { value: 'email', label: 'Email', icon: <FiMail className="w-5 h-5" />, color: 'blue' },
    { value: 'dm', label: 'Direct Message', icon: <FiMessageSquare className="w-5 h-5" />, color: 'purple' },
    { value: 'call', label: 'Phone Call', icon: <FiPhone className="w-5 h-5" />, color: 'green' },
    { value: 'meeting', label: 'Meeting', icon: <FiUsers className="w-5 h-5" />, color: 'orange' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        </div>
        
        <div className="relative flex justify-center items-center h-64">
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-2xl">
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
              <p className="text-gray-600 font-medium">Loading your outreach...</p>
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

  const totalOutreach = outreach.length;
  const repliedCount = outreach.filter(o => o.status === 'replied').length;
  const replyRate = totalOutreach > 0 ? Math.round((repliedCount / totalOutreach) * 100) : 0;
  const totalConversion = outreach.reduce((sum, o) => sum + (o.conversionValue || 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-orange-400 rounded-full animate-float"></div>
        <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-red-400 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-pink-400 rounded-full animate-float"></div>
        <div className="absolute top-1/2 right-1/3 w-5 h-5 bg-purple-400 rounded-full animate-float-delayed"></div>
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
                Outreach 
                <span className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent"> Tracker</span>
              </h2>
              <div className="inline-flex items-center px-3 py-1 bg-orange-100/80 backdrop-blur-sm rounded-full text-sm font-medium text-orange-700 border border-orange-200">
                <FiSend className="w-4 h-4 mr-2" />
                Build Connections
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddForm(true)}
              className="group relative bg-gradient-to-r from-orange-600 to-red-600 text-white px-6 py-3 rounded-2xl font-semibold hover:from-orange-700 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <FiPlus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              <span className="hidden sm:inline">Add Outreach</span>
              <span className="sm:hidden">Add</span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            </motion.button>
          </div>

          {/* Stats Grid - Responsive */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
          >
            <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 backdrop-blur-sm p-4 sm:p-6 rounded-2xl border border-blue-200/50">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                  <FiSend className="w-5 h-5 text-white" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-blue-600">{totalOutreach}</div>
              </div>
              <div className="text-sm text-gray-600">Total Outreach</div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100/50 backdrop-blur-sm p-4 sm:p-6 rounded-2xl border border-green-200/50">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                  <FiCheck className="w-5 h-5 text-white" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-green-600">{repliedCount}</div>
              </div>
              <div className="text-sm text-gray-600">Replies</div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 backdrop-blur-sm p-4 sm:p-6 rounded-2xl border border-purple-200/50">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center">
                  <FiTrendingUp className="w-5 h-5 text-white" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-purple-600">{replyRate}%</div>
              </div>
              <div className="text-sm text-gray-600">Reply Rate</div>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100/50 backdrop-blur-sm p-4 sm:p-6 rounded-2xl border border-yellow-200/50">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-yellow-500 rounded-xl flex items-center justify-center">
                  <FiDollarSign className="w-5 h-5 text-white" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-yellow-600">₹{totalConversion.toLocaleString()}</div>
              </div>
              <div className="text-sm text-gray-600">Conversion Value</div>
            </div>
          </motion.div>

          {/* Filters */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 border border-white/30"
          >
            <div className="flex items-center gap-2 mb-4">
              <FiFilter className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-700">Filter Outreach</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select
                  value={filter.type}
                  onChange={(e) => setFilter({...filter, type: e.target.value})}
                  className="w-full bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                >
                  <option value="all">All Types</option>
                  <option value="email">Email</option>
                  <option value="dm">DM</option>
                  <option value="call">Call</option>
                  <option value="meeting">Meeting</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={filter.status}
                  onChange={(e) => setFilter({...filter, status: e.target.value})}
                  className="w-full bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                >
                  <option value="all">All Status</option>
                  <option value="sent">Sent</option>
                  <option value="delivered">Delivered</option>
                  <option value="opened">Opened</option>
                  <option value="replied">Replied</option>
                  <option value="bounced">Bounced</option>
                  <option value="no-response">No Response</option>
                </select>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Outreach List */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="space-y-4"
        >
          {outreach.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -2, scale: 1.01 }}
              className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg border border-white/20 p-6 hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl flex items-center justify-center">
                    {getTypeIcon(item.type)}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-900">{item.targetName}</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      {item.targetCompany && (
                        <div className="flex items-center gap-1">
                          <FaBuilding className="w-4 h-4" />
                          {item.targetCompany}
                        </div>
                      )}
                      {item.platform && (
                        <div className="flex items-center gap-1">
                          <FiTag className="w-4 h-4" />
                          {item.platform}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-gray-500 mt-2">
                    <FiCalendar className="w-3 h-3" />
                    {new Date(item.sentAt).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h5 className="font-semibold text-gray-900 mb-2">{item.subject}</h5>
                {item.message && (
                  <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
                    <p className="text-sm text-gray-600 line-clamp-2">{item.message}</p>
                  </div>
                )}
              </div>

              {item.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.tags.map((tag) => (
                    <span key={tag} className="bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 px-2 py-1 rounded-full text-xs font-medium">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  {item.leadSource && (
                    <span className="bg-white/50 backdrop-blur-sm rounded-xl px-3 py-1 border border-white/30">
                      Source: {item.leadSource}
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <select
                    value={item.status}
                    onChange={(e) => updateStatus(item._id, e.target.value as Outreach['status'])}
                    className="text-sm bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="sent">Sent</option>
                    <option value="delivered">Delivered</option>
                    <option value="opened">Opened</option>
                    <option value="replied">Replied</option>
                    <option value="bounced">Bounced</option>
                    <option value="no-response">No Response</option>
                  </select>
                </div>
              </div>
            </motion.div>
          ))}

          {outreach.length === 0 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg border border-white/20 p-12 text-center"
            >
              <div className="text-6xl mb-4">📬</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Outreach Yet</h3>
              <p className="text-gray-600 mb-6">Start reaching out to potential clients and build connections!</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAddForm(true)}
                className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-3 rounded-2xl font-semibold hover:from-orange-700 hover:to-red-700 transition-all duration-300"
              >
                Start Your First Outreach
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Modal Popup for Add Outreach Form */}
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
                className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-white/30 w-full max-w-3xl max-h-[90vh] overflow-y-auto"
              >
                {/* Modal Header */}
                <div className="sticky top-0 bg-white/80 backdrop-blur-md rounded-t-3xl p-6 border-b border-white/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Add New Outreach</h3>
                      <p className="text-gray-600 mt-1">Connect with potential clients and partners</p>
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
                  {/* Outreach Type Selection */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-6"
                  >
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Outreach Type</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {outreachTypes.map((type) => (
                        <motion.button
                          key={type.value}
                          type="button"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setNewOutreach({...newOutreach, type: type.value as Outreach['type']})}
                          className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                            newOutreach.type === type.value
                              ? `border-${type.color}-500 bg-${type.color}-50 text-${type.color}-700`
                              : 'border-gray-200 bg-white/50 text-gray-600 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex flex-col items-center gap-2">
                            {type.icon}
                            <span className="font-medium text-sm">{type.label}</span>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Platform</label>
                      <input
                        type="text"
                        placeholder="LinkedIn, Twitter, etc."
                        value={newOutreach.platform}
                        onChange={(e) => setNewOutreach({...newOutreach, platform: e.target.value})}
                        className="w-full bg-white/70 backdrop-blur-sm border-2 border-gray-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Target Name *</label>
                      <input
                        type="text"
                        placeholder="Contact person name"
                        value={newOutreach.targetName}
                        onChange={(e) => setNewOutreach({...newOutreach, targetName: e.target.value})}
                        className="w-full bg-white/70 backdrop-blur-sm border-2 border-gray-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300"
                        required
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Target Email</label>
                      <input
                        type="email"
                        placeholder="contact@company.com"
                        value={newOutreach.targetEmail}
                        onChange={(e) => setNewOutreach({...newOutreach, targetEmail: e.target.value})}
                        className="w-full bg-white/70 backdrop-blur-sm border-2 border-gray-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Target Company</label>
                      <input
                        type="text"
                        placeholder="Company name"
                        value={newOutreach.targetCompany}
                        onChange={(e) => setNewOutreach({...newOutreach, targetCompany: e.target.value})}
                        className="w-full bg-white/70 backdrop-blur-sm border-2 border-gray-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                      className="sm:col-span-2"
                    >
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Lead Source</label>
                      <input
                        type="text"
                        placeholder="Where did you find this lead?"
                        value={newOutreach.leadSource}
                        onChange={(e) => setNewOutreach({...newOutreach, leadSource: e.target.value})}
                        className="w-full bg-white/70 backdrop-blur-sm border-2 border-gray-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300"
                      />
                    </motion.div>
                  </div>

                  {/* Subject */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="mb-6"
                  >
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Subject *</label>
                    <input
                      type="text"
                      placeholder="Enter compelling subject line"
                      value={newOutreach.subject}
                      onChange={(e) => setNewOutreach({...newOutreach, subject: e.target.value})}
                      className="w-full bg-white/70 backdrop-blur-sm border-2 border-gray-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300"
                      required
                    />
                  </motion.div>

                  {/* Message */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="mb-6"
                  >
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                    <textarea
                      placeholder="Write your outreach message..."
                      value={newOutreach.message}
                      onChange={(e) => setNewOutreach({...newOutreach, message: e.target.value})}
                      className="w-full bg-white/70 backdrop-blur-sm border-2 border-gray-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300 resize-none"
                      rows={4}
                    />
                  </motion.div>

                  {/* Tags Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="mb-8"
                  >
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Tags</label>
                    <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 border-2 border-gray-200">
                      <div className="flex gap-2 mb-3">
                        <input
                          type="text"
                          placeholder="Add a tag..."
                          value={newOutreach.tagInput}
                          onChange={(e) => setNewOutreach({...newOutreach, tagInput: e.target.value})}
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                          className="flex-1 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-300"
                        />
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          type="button"
                          onClick={addTag}
                          className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 font-medium"
                        >
                          Add
                        </motion.button>
                      </div>
                      <div className="flex flex-wrap gap-2 min-h-[40px]">
                        {newOutreach.tags.length === 0 ? (
                          <p className="text-gray-400 text-sm italic">No tags added yet</p>
                        ) : (
                          newOutreach.tags.map((tag) => (
                            <motion.span
                              key={tag}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              className="bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 px-3 py-1 rounded-full text-sm flex items-center gap-2 backdrop-blur-sm border border-orange-200/50"
                            >
                              #{tag}
                              <motion.button
                                whileHover={{ scale: 1.2 }}
                                onClick={() => removeTag(tag)}
                                className="text-orange-600 hover:text-red-600 transition-colors"
                              >
                                <FiX className="w-3 h-3" />
                              </motion.button>
                            </motion.span>
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
                      onClick={createOutreach}
                      disabled={!newOutreach.targetName || !newOutreach.subject}
                      className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-orange-700 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <FiSend className="w-5 h-5" />
                      Create Outreach
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
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
