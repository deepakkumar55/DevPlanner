"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiPlus, FiVideo, FiFileText, FiPackage, FiEye, FiDollarSign, 
  FiHeart, FiMessageCircle, FiExternalLink, FiX,
  FiFilter, FiTrendingUp, FiBarChart2, FiCalendar
} from "react-icons/fi";

interface Content {
  _id: string;
  type: 'video' | 'blog' | 'product';
  title: string;
  description?: string;
  platform: string;
  url?: string;
  status: 'draft' | 'published' | 'live' | 'archived';
  views?: number;
  revenue?: number;
  tags: string[];
  publishedAt?: string;
  metrics: {
    likes?: number;
    comments?: number;
    shares?: number;
    downloads?: number;
    sales?: number;
  };
}

export default function ContentProductLog() {
  const { data: session } = useSession();
  const [content, setContent] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [filter, setFilter] = useState({ type: 'all', status: 'all' });
  const [newContent, setNewContent] = useState({
    type: 'video' as Content['type'],
    title: '',
    description: '',
    platform: '',
    url: '',
    status: 'draft' as Content['status'],
    tags: [] as string[],
    tagInput: ''
  });

  useEffect(() => {
    if (session) {
      fetchContent();
    }
  }, [session, filter]);

  const fetchContent = async () => {
    try {
      const params = new URLSearchParams();
      if (filter.type !== 'all') params.set('type', filter.type);
      if (filter.status !== 'all') params.set('status', filter.status);

      const response = await fetch(`/api/content?${params.toString()}`);
      const data = await response.json();
      
      if (response.ok) {
        setContent(data.content);
      }
    } catch (error) {
      console.error('Failed to fetch content:', error);
    } finally {
      setLoading(false);
    }
  };

  const createContent = async () => {
    try {
      const { tagInput, ...contentData } = newContent;
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contentData)
      });

      if (response.ok) {
        const data = await response.json();
        setContent([data.content, ...content]);
        setNewContent({
          type: 'video',
          title: '',
          description: '',
          platform: '',
          url: '',
          status: 'draft',
          tags: [],
          tagInput: ''
        });
        setShowAddForm(false);
      }
    } catch (error) {
      console.error('Failed to create content:', error);
    }
  };

  const addTag = () => {
    if (newContent.tagInput.trim() && !newContent.tags.includes(newContent.tagInput.trim())) {
      setNewContent({
        ...newContent,
        tags: [...newContent.tags, newContent.tagInput.trim()],
        tagInput: ''
      });
    }
  };

  const removeTag = (tagToRemove: string) => {
    setNewContent({
      ...newContent,
      tags: newContent.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-gray-100/80 text-gray-700 border-gray-200';
      case 'published': return 'bg-green-100/80 text-green-700 border-green-200';
      case 'live': return 'bg-blue-100/80 text-blue-700 border-blue-200';
      case 'archived': return 'bg-red-100/80 text-red-700 border-red-200';
      default: return 'bg-gray-100/80 text-gray-700 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <FiVideo className="w-5 h-5 text-red-500" />;
      case 'blog': return <FiFileText className="w-5 h-5 text-blue-500" />;
      case 'product': return <FiPackage className="w-5 h-5 text-green-500" />;
      default: return <FiFileText className="w-5 h-5 text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        </div>
        
        <div className="relative flex justify-center items-center h-64">
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-2xl">
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="text-gray-600 font-medium">Loading your content...</p>
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

  const totalRevenue = content.reduce((sum, c) => sum + (c.revenue || 0), 0);
  const totalViews = content.reduce((sum, c) => sum + (c.views || 0), 0);
  const publishedCount = content.filter(c => c.status === 'published' || c.status === 'live').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-blue-400 rounded-full animate-float"></div>
        <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-indigo-400 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-purple-400 rounded-full animate-float"></div>
        <div className="absolute top-1/2 right-1/3 w-5 h-5 bg-pink-400 rounded-full animate-float-delayed"></div>
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
                Content & Product 
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent"> Log</span>
              </h2>
              <div className="inline-flex items-center px-3 py-1 bg-blue-100/80 backdrop-blur-sm rounded-full text-sm font-medium text-blue-700 border border-blue-200">
                <FiBarChart2 className="w-4 h-4 mr-2" />
                Track & Analyze
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddForm(true)
              }
              className="group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <FiPlus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              <span className="hidden sm:inline">Add Content</span>
              <span className="sm:hidden">Add</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            </motion.button>
          </div>

          {/* Stats Grid - Responsive */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
          >
            <div className="bg-gradient-to-br from-green-50 to-green-100/50 backdrop-blur-sm p-4 sm:p-6 rounded-2xl border border-green-200/50">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                  <FiDollarSign className="w-5 h-5 text-white" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-green-600">₹{totalRevenue.toLocaleString()}</div>
              </div>
              <div className="text-sm text-gray-600">Total Revenue</div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 backdrop-blur-sm p-4 sm:p-6 rounded-2xl border border-blue-200/50">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                  <FiEye className="w-5 h-5 text-white" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-blue-600">{totalViews.toLocaleString()}</div>
              </div>
              <div className="text-sm text-gray-600">Total Views</div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 backdrop-blur-sm p-4 sm:p-6 rounded-2xl border border-purple-200/50">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center">
                  <FiTrendingUp className="w-5 h-5 text-white" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-purple-600">{publishedCount}</div>
              </div>
              <div className="text-sm text-gray-600">Published</div>
            </div>
            
            <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 backdrop-blur-sm p-4 sm:p-6 rounded-2xl border border-gray-200/50">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gray-500 rounded-xl flex items-center justify-center">
                  <FiBarChart2 className="w-5 h-5 text-white" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-gray-600">{content.length}</div>
              </div>
              <div className="text-sm text-gray-600">Total Content</div>
            </div>
          </motion.div>

          {/* Filters - Responsive */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 border border-white/30"
          >
            <div className="flex items-center gap-2 mb-4">
              <FiFilter className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-700">Filters</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Content Type</label>
                <select
                  value={filter.type}
                  onChange={(e) => setFilter({...filter, type: e.target.value})}
                  className="w-full bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                >
                  <option value="all">All Types</option>
                  <option value="video">Video</option>
                  <option value="blog">Blog</option>
                  <option value="product">Product</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={filter.status}
                  onChange={(e) => setFilter({...filter, status: e.target.value})}
                  className="w-full bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                >
                  <option value="all">All Status</option>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="live">Live</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Content Grid - Fully Responsive */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {content.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg border border-white/20 p-6 hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center">
                    {getTypeIcon(item.type)}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg line-clamp-1">{item.title}</h4>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <FiCalendar className="w-4 h-4" />
                      {item.platform}
                    </p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(item.status)}`}>
                  {item.status}
                </span>
              </div>

              {item.description && (
                <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">{item.description}</p>
              )}

              <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                <div className="bg-white/50 rounded-xl p-3 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-blue-600 mb-1">
                    <FiEye className="w-4 h-4" />
                    <span className="font-medium">Views</span>
                  </div>
                  <div className="font-bold text-gray-900">{item.views?.toLocaleString() || 0}</div>
                </div>
                <div className="bg-white/50 rounded-xl p-3 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-green-600 mb-1">
                    <FiDollarSign className="w-4 h-4" />
                    <span className="font-medium">Revenue</span>
                  </div>
                  <div className="font-bold text-gray-900">₹{item.revenue?.toLocaleString() || 0}</div>
                </div>
                <div className="bg-white/50 rounded-xl p-3 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-red-500 mb-1">
                    <FiHeart className="w-4 h-4" />
                    <span className="font-medium">Likes</span>
                  </div>
                  <div className="font-bold text-gray-900">{item.metrics.likes || 0}</div>
                </div>
                <div className="bg-white/50 rounded-xl p-3 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-purple-600 mb-1">
                    <FiMessageCircle className="w-4 h-4" />
                    <span className="font-medium">Comments</span>
                  </div>
                  <div className="font-bold text-gray-900">{item.metrics.comments || 0}</div>
                </div>
              </div>

              {item.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                  {item.tags.length > 3 && (
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                      +{item.tags.length - 3} more
                    </span>
                  )}
                </div>
              )}

              {item.url && (
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                >
                  <FiExternalLink className="w-4 h-4" />
                  View Content
                </motion.a>
              )}
            </motion.div>
          ))}

          {content.length === 0 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="col-span-full"
            >
              <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg border border-white/20 p-12 text-center">
                <div className="text-6xl mb-4">🎯</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No Content Yet</h3>
                <p className="text-gray-600 mb-6">Start creating and tracking your amazing content!</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAddForm(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                >
                  Add Your First Content
                </motion.button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Modal Popup for Add Content Form */}
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
                className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-white/30 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              >
                {/* Modal Header */}
                <div className="sticky top-0 bg-white/80 backdrop-blur-md rounded-t-3xl p-6 border-b border-white/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Add New Content</h3>
                      <p className="text-gray-600 mt-1">Create and track your amazing content</p>
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
                  {/* Form Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    {/* Content Type */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                      className="sm:col-span-2"
                    >
                      <label className="block text-sm font-semibold text-gray-700 mb-3">Content Type</label>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          {
                            value: 'video',
                            label: 'Video',
                            icon: <FiVideo className="w-5 h-5" />,
                            color: 'red'
                          },
                          {
                            value: 'blog',
                            label: 'Blog',
                            icon: <FiFileText className="w-5 h-5" />,
                            color: 'blue'
                          },
                        {
                          value: 'product',
                          label: 'Product',
                          icon: <FiPackage className="w-5 h-5" />,
                          color: 'green'
                        }
                      ].map((type) => (
                          <motion.button
                            key={type.value}
                            type="button"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setNewContent({...newContent, type: type.value as Content['type']})}
                            className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                              newContent.type === type.value
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

                    {/* Title */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="sm:col-span-2"
                    >
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Title *</label>
                      <input
                        type="text"
                        placeholder="Enter an engaging title..."
                        value={newContent.title}
                        onChange={(e) => setNewContent({...newContent, title: e.target.value})}
                        className="w-full bg-white/70 backdrop-blur-sm border-2 border-gray-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                        required
                      />
                    </motion.div>

                    {/* Platform */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Platform *</label>
                      <input
                        type="text"
                        placeholder="YouTube, Blog, Instagram..."
                        value={newContent.platform}
                        onChange={(e) => setNewContent({...newContent, platform: e.target.value})}
                        className="w-full bg-white/70 backdrop-blur-sm border-2 border-gray-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                        required
                      />
                    </motion.div>

                    {/* URL */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <label className="block text-sm font-semibold text-gray-700 mb-2">URL</label>
                      <input
                        type="url"
                        placeholder="https://example.com"
                        value={newContent.url}
                        onChange={(e) => setNewContent({...newContent, url: e.target.value})}
                        className="w-full bg-white/70 backdrop-blur-sm border-2 border-gray-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                      />
                    </motion.div>

                    {/* Status */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      className="sm:col-span-2"
                    >
                      <label className="block text-sm font-semibold text-gray-700 mb-3">Status</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {[{
                          value: 'draft',
                          label: 'Draft',
                          emoji: '📝',
                          color: 'gray'
                        },
                        {
                          value: 'published',
                          label: 'Published',
                          emoji: '✅',
                          color: 'green'
                        },
                        {
                          value: 'live',
                          label: 'Live',
                          emoji: '🔴',
                          color: 'red'
                        },
                        {
                          value: 'archived',
                          label: 'Archived',
                          emoji: '📦',
                          color: 'yellow'
                        }
                      ].map((status) => (
                          <motion.button
                            key={status.value}
                            type="button"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setNewContent({...newContent, status: status.value as Content['status']})}
                            className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                              newContent.status === status.value
                                ? `border-${status.color}-500 bg-${status.color}-50`
                                : 'border-gray-200 bg-white/50 hover:border-gray-300'
                            }`}
                          >
                            <div className="text-center">
                              <div className="text-lg mb-1">{status.emoji}</div>
                              <div className="text-xs font-medium">{status.label}</div>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  {/* Description */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mb-6"
                  >
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                    <textarea
                      placeholder="Describe your content in detail..."
                      value={newContent.description}
                      onChange={(e) => setNewContent({...newContent, description: e.target.value})}
                      className="w-full bg-white/70 backdrop-blur-sm border-2 border-gray-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 resize-none"
                      rows={4}
                    />
                  </motion.div>

                  {/* Tags Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="mb-8"
                  >
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Tags</label>
                    <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 border-2 border-gray-200">
                      <div className="flex gap-2 mb-3">
                        <input
                          type="text"
                          placeholder="Add a tag..."
                          value={newContent.tagInput}
                          onChange={(e) => setNewContent({...newContent, tagInput: e.target.value})}
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                          className="flex-1 bg-white/70 backdrop-blur-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                        />
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          type="button"
                          onClick={addTag}
                          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 font-medium"
                        >
                          Add
                        </motion.button>
                      </div>
                      <div className="flex flex-wrap gap-2 min-h-[40px]">
                        {newContent.tags.length === 0 ? (
                          <p className="text-gray-400 text-sm italic">No tags added yet</p>
                        ) : (
                          newContent.tags.map((tag) => (
                            <motion.span
                              key={tag}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2 backdrop-blur-sm border border-blue-200/50"
                            >
                              #{tag}
                              <motion.button
                                whileHover={{ scale: 1.2 }}
                                onClick={() => removeTag(tag)}
                                className="text-blue-600 hover:text-red-600 transition-colors"
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
                      onClick={createContent}
                      disabled={!newContent.title || !newContent.platform}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <FiPlus className="w-5 h-5" />
                      Create Content
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
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
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
