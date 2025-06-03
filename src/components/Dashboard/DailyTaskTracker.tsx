"use client";

import { useState } from "react";

export default function DailyTaskTracker() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Complete 30 minutes workout", category: "Health", completed: true, priority: "high" },
    { id: 2, title: "Solve 3 DSA problems", category: "Learning", completed: false, priority: "high" },
    { id: 3, title: "Write blog post", category: "Content", completed: false, priority: "medium" },
    { id: 4, title: "Send 10 cold emails", category: "Outreach", completed: true, priority: "medium" },
    { id: 5, title: "Read for 1 hour", category: "Learning", completed: false, priority: "low" },
    { id: 6, title: "Update portfolio", category: "Personal", completed: false, priority: "low" }
  ]);

  const [newTask, setNewTask] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Learning");

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, {
        id: Date.now(),
        title: newTask,
        category: selectedCategory,
        completed: false,
        priority: "medium"
      }]);
      setNewTask("");
    }
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const completionRate = Math.round((completedTasks / tasks.length) * 100);

  const categories = ["Learning", "Health", "Content", "Outreach", "Personal"];
  const priorities = { high: "🔴", medium: "🟡", low: "🟢" };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/20">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Today's Tasks</h1>
        <p className="text-gray-600">Track your daily progress and stay focused</p>
        
        {/* Progress Overview */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">Completed</p>
                <p className="text-2xl font-bold text-green-700">{completedTasks}</p>
              </div>
              <div className="text-green-600 text-2xl">✅</div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-4 border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">Remaining</p>
                <p className="text-2xl font-bold text-blue-700">{tasks.length - completedTasks}</p>
              </div>
              <div className="text-blue-600 text-2xl">⏳</div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600 font-medium">Completion Rate</p>
                <p className="text-2xl font-bold text-purple-700">{completionRate}%</p>
              </div>
              <div className="text-purple-600 text-2xl">📊</div>
            </div>
          </div>
        </div>
      </div>

      {/* Add New Task */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/20">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Add New Task</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter new task..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <button
            onClick={addTask}
            className="px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl hover:from-green-700 hover:to-blue-700 transition-all duration-300 font-medium"
          >
            Add Task
          </button>
        </div>
      </div>

      {/* Tasks List */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/20">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Task List</h2>
        
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-center space-x-4 p-4 rounded-2xl border transition-all duration-300 ${
                task.completed
                  ? 'bg-green-50 border-green-200 opacity-75'
                  : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
              }`}
            >
              <button
                onClick={() => toggleTask(task.id)}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  task.completed
                    ? 'bg-green-500 border-green-500 text-white'
                    : 'border-gray-300 hover:border-green-500'
                }`}
              >
                {task.completed && (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
              
              <div className="flex-1">
                <p className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                  {task.title}
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                    {task.category}
                  </span>
                  <span className="text-sm">{priorities[task.priority as keyof typeof priorities]}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
