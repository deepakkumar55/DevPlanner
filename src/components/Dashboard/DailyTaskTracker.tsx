"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiPlus, FiClock, FiTrash2, FiTarget, FiTrendingUp, 
  FiBookOpen, FiHeart, FiFileText, FiUsers, FiUser, FiX,
  FiFilter, FiCalendar, FiBarChart2, FiCheckCircle
} from "react-icons/fi";

interface Task {
  _id: string;
  title: string;
  description?: string;
  category: 'Learning' | 'Health' | 'Content' | 'Outreach' | 'Personal';
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  dueDate?: string;
  estimatedTime?: number;
}

export default function DailyTaskTracker() {
  const { data: session } = useSession();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [filter, setFilter] = useState<string>('all');
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    category: 'Learning' as Task['category'],
    priority: 'medium' as Task['priority'],
    dueDate: '',
    estimatedTime: 0
  });

  useEffect(() => {
    if (session) {
      fetchTasks();
    }
  }, [session, filter]);

  const fetchTasks = async () => {
    try {
      const params = new URLSearchParams();
      if (filter !== 'all') {
        if (filter === 'completed') params.set('completed', 'true');
        if (filter === 'pending') params.set('completed', 'false');
      }

      const response = await fetch(`/api/tasks?${params.toString()}`);
      const data = await response.json();
      
      if (response.ok) {
        setTasks(data.tasks);
      }
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async () => {
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask)
      });

      if (response.ok) {
        const data = await response.json();
        setTasks([data.task, ...tasks]);
        setNewTask({
          title: '',
          description: '',
          category: 'Learning',
          priority: 'medium',
          dueDate: '',
          estimatedTime: 0
        });
        setShowAddForm(false);
      }
    } catch (error) {
      console.error('Failed to create task:', error);
    }
  };

  const toggleTask = async (taskId: string, completed: boolean) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !completed })
      });

      if (response.ok) {
        const data = await response.json();
        setTasks(tasks.map(task => 
          task._id === taskId ? data.task : task
        ));
      }
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setTasks(tasks.filter(task => task._id !== taskId));
      }
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100/80 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100/80 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100/80 text-green-700 border-green-200';
      default: return 'bg-gray-100/80 text-gray-700 border-gray-200';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Learning': return 'bg-blue-100/80 text-blue-700 border-blue-200';
      case 'Health': return 'bg-green-100/80 text-green-700 border-green-200';
      case 'Content': return 'bg-purple-100/80 text-purple-700 border-purple-200';
      case 'Outreach': return 'bg-orange-100/80 text-orange-700 border-orange-200';
      case 'Personal': return 'bg-pink-100/80 text-pink-700 border-pink-200';
      default: return 'bg-gray-100/80 text-gray-700 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Learning': return <FiBookOpen className="w-4 h-4" />;
      case 'Health': return <FiHeart className="w-4 h-4" />;
      case 'Content': return <FiFileText className="w-4 h-4" />;
      case 'Outreach': return <FiUsers className="w-4 h-4" />;
      case 'Personal': return <FiUser className="w-4 h-4" />;
      default: return <FiTarget className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        </div>
        
        <div className="relative flex justify-center items-center h-64">
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-2xl">
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
              <p className="text-gray-600 font-medium">Loading your tasks...</p>
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

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-green-400 rounded-full animate-float"></div>
        <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-blue-400 rounded-full animate-float-delayed"></div>
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
                Daily Task 
                <span className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent"> Tracker</span>
              </h2>
              <div className="inline-flex items-center px-3 py-1 bg-green-100/80 backdrop-blur-sm rounded-full text-sm font-medium text-green-700 border border-green-200">
                <FiTarget className="w-4 h-4 mr-2" />
                Stay Productive
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddForm(true)}
              className="group relative bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-2xl font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <FiPlus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              <span className="hidden sm:inline">Add Task</span>
              <span className="sm:hidden">Add</span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            </motion.button>
          </div>

          {/* Stats Grid - Responsive */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6"
          >
            <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 backdrop-blur-sm p-4 sm:p-6 rounded-2xl border border-blue-200/50">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                  <FiCheckCircle className="w-5 h-5 text-white" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-blue-600">{completedTasks}</div>
              </div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
            
            <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 backdrop-blur-sm p-4 sm:p-6 rounded-2xl border border-gray-200/50">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gray-500 rounded-xl flex items-center justify-center">
                  <FiBarChart2 className="w-5 h-5 text-white" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-gray-600">{totalTasks}</div>
              </div>
              <div className="text-sm text-gray-600">Total Tasks</div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100/50 backdrop-blur-sm p-4 sm:p-6 rounded-2xl border border-green-200/50">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                  <FiTrendingUp className="w-5 h-5 text-white" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-green-600">{completionRate}%</div>
              </div>
              <div className="text-sm text-gray-600">Completion Rate</div>
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
              <span className="font-medium text-gray-700">Filter Tasks</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {['all', 'pending', 'completed'].map((filterOption) => (
                <motion.button
                  key={filterOption}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilter(filterOption)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all duration-300 ${
                    filter === filterOption
                      ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg'
                      : 'bg-white/70 text-gray-600 hover:bg-white/90 border border-gray-200'
                  }`}
                >
                  {filterOption}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Tasks List */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="space-y-4"
        >
          {tasks.map((task, index) => (
            <motion.div
              key={task._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -2, scale: 1.01 }}
              className={`bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg border border-white/20 p-6 hover:shadow-2xl transition-all duration-300 ${
                task.completed ? 'opacity-70' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task._id, task.completed)}
                      className="w-6 h-6 text-green-600 bg-white/70 border-2 border-gray-300 rounded-lg focus:ring-green-500 focus:ring-2"
                    />
                  </motion.div>
                  <div className="flex-1">
                    <h4 className={`font-bold text-lg ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                      {task.title}
                    </h4>
                    {task.description && (
                      <p className="text-gray-600 mt-1 leading-relaxed">{task.description}</p>
                    )}
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm flex items-center gap-1 ${getCategoryColor(task.category)}`}>
                        {getCategoryIcon(task.category)}
                        {task.category}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm ${getPriorityColor(task.priority)}`}>
                        {task.priority} priority
                      </span>
                      {task.estimatedTime && (
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100/80 text-gray-700 border border-gray-200 backdrop-blur-sm flex items-center gap-1">
                          <FiClock className="w-3 h-3" />
                          {task.estimatedTime}min
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => deleteTask(task._id)}
                  className="w-10 h-10 bg-red-100 hover:bg-red-200 rounded-2xl flex items-center justify-center text-red-600 hover:text-red-700 transition-colors group"
                >
                  <FiTrash2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </motion.button>
              </div>
            </motion.div>
          ))}

          {tasks.length === 0 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg border border-white/20 p-12 text-center"
            >
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Tasks Yet</h3>
              <p className="text-gray-600 mb-6">Create your first task to get started on your productive day!</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAddForm(true)}
                className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-3 rounded-2xl font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-300"
              >
                Add Your First Task
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Modal Popup for Add Task Form */}
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
                      <h3 className="text-2xl font-bold text-gray-900">Add New Task</h3>
                      <p className="text-gray-600 mt-1">Create a task to boost your productivity</p>
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
                  {/* Task Title */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-6"
                  >
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Task Title *</label>
                    <input
                      type="text"
                      placeholder="What do you want to accomplish?"
                      value={newTask.title}
                      onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                      className="w-full bg-white/70 backdrop-blur-sm border-2 border-gray-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
                      required
                    />
                  </motion.div>

                  {/* Category Selection */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-6"
                  >
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Category</label>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                      {[
                        { value: 'Learning', icon: <FiBookOpen className="w-5 h-5" />, color: 'blue' },
                        { value: 'Health', icon: <FiHeart className="w-5 h-5" />, color: 'green' },
                        { value: 'Content', icon: <FiFileText className="w-5 h-5" />, color: 'purple' },
                        { value: 'Outreach', icon: <FiUsers className="w-5 h-5" />, color: 'orange' },
                        { value: 'Personal', icon: <FiUser className="w-5 h-5" />, color: 'pink' }
                      ].map((category) => (
                        <motion.button
                          key={category.value}
                          type="button"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setNewTask({...newTask, category: category.value as Task['category']})}
                          className={`p-3 rounded-2xl border-2 transition-all duration-300 ${
                            newTask.category === category.value
                              ? `border-${category.color}-500 bg-${category.color}-50 text-${category.color}-700`
                              : 'border-gray-200 bg-white/50 text-gray-600 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex flex-col items-center gap-2">
                            {category.icon}
                            <span className="font-medium text-xs">{category.value}</span>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>

                  {/* Priority Selection */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-6"
                  >
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Priority</label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { value: 'high', label: 'High', color: 'red' },
                        { value: 'medium', label: 'Medium', color: 'yellow' },
                        { value: 'low', label: 'Low', color: 'green' }
                      ].map((priority) => (
                        <motion.button
                          key={priority.value}
                          type="button"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setNewTask({...newTask, priority: priority.value as Task['priority']})}
                          className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                            newTask.priority === priority.value
                              ? `border-${priority.color}-500 bg-${priority.color}-50`
                              : 'border-gray-200 bg-white/50 hover:border-gray-300'
                          }`}
                        >
                          <div className="text-center font-medium">{priority.label}</div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>

                  {/* Estimated Time */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mb-6"
                  >
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Estimated Time (minutes)</label>
                    <input
                      type="number"
                      placeholder="How long will this take?"
                      value={newTask.estimatedTime}
                      onChange={(e) => setNewTask({...newTask, estimatedTime: parseInt(e.target.value) || 0})}
                      className="w-full bg-white/70 backdrop-blur-sm border-2 border-gray-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
                    />
                  </motion.div>

                  {/* Description */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mb-8"
                  >
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                    <textarea
                      placeholder="Add more details about your task..."
                      value={newTask.description}
                      onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                      className="w-full bg-white/70 backdrop-blur-sm border-2 border-gray-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 resize-none"
                      rows={4}
                    />
                  </motion.div>
                </div>

                {/* Modal Footer */}
                <div className="sticky bottom-0 bg-white/80 backdrop-blur-md rounded-b-3xl p-6 border-t border-white/20">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={createTask}
                      disabled={!newTask.title}
                      className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:from-green-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <FiPlus className="w-5 h-5" />
                      Create Task
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
