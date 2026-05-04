import { useState } from "react";
import Stats from "../components/Stats";
import CreateTask from "../components/CreateTask";
import KanbanBoard from "../components/KanbanBoard";

export default function Dashboard() {
  const [refreshKey, setRefreshKey] = useState(0);
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="min-h-screen bg-gray-100">

      {/* 🔥 HEADER */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-6 shadow-md">
        <div className="flex items-center justify-between">
          
          {/* Left */}
          <div>
            <h1 className="text-3xl font-bold">
              Welcome back, {user?.name} 👋
            </h1>
            <p className="text-blue-100 mt-1">
              Let’s manage your tasks efficiently
            </p>
          </div>

          {/* Right (Avatar) */}
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-xl font-bold">
            {user?.name?.charAt(0)?.toUpperCase()}
          </div>
        </div>
      </div>

      {/* 🔥 CONTENT */}
      <div className="p-6 space-y-6">

        {/* Stats Section */}
        <div className="bg-white p-5 rounded-2xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Overview</h2>
          <Stats key={refreshKey} />
        </div>

        {/* Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Create Task */}
          <div className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition">
            <h2 className="text-lg font-semibold mb-4">Create Task</h2>
            <CreateTask onTaskCreated={() => setRefreshKey(prev => prev + 1)} />
          </div>

          {/* Kanban */}
          <div className="lg:col-span-2 bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition">
            <h2 className="text-lg font-semibold mb-4">Task Board</h2>
            <KanbanBoard key={refreshKey} />
          </div>

        </div>
      </div>
    </div>
  );
}