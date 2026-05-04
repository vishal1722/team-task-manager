import { useNavigate, useLocation } from "react-router-dom";
import { isAdmin } from "../utils/auth";
import { LayoutDashboard, FolderKanban, Shield, LogOut } from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  const menu = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Projects", path: "/projects", icon: FolderKanban },
  ];

  if (isAdmin()) {
    menu.push({ name: "Admin Panel", path: "/admin", icon: Shield });
  }

  return (
    <div className="w-64 h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col p-5">

      {/* Logo */}
      <h1 className="text-2xl font-bold mb-10 tracking-wide">
        🚀 TaskPro
      </h1>

      {/* Menu */}
      <div className="flex-1 space-y-2">
        {menu.map((item, i) => {
          const Icon = item.icon;
          const active = location.pathname === item.path;

          return (
            <div
              key={i}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200
                ${active 
                  ? "bg-blue-600 shadow-md" 
                  : "hover:bg-gray-800 hover:translate-x-1"
                }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </div>
          );
        })}
      </div>

      {/* User Info */}
      <div className="bg-white/10 border border-white/10 rounded-xl p-3 mb-4">
        <p className="text-sm text-gray-300">Logged in as</p>
        <p className="font-semibold">{user?.name}</p>
      </div>

      {/* Logout */}
      <button
        onClick={() => {
          localStorage.clear();
          navigate("/");
        }}
        className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 p-2 rounded-lg transition active:scale-95"
      >
        <LogOut className="w-4 h-4" />
        Logout
      </button>
    </div>
  );
}