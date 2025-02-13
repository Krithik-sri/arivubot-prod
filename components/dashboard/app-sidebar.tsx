"use client";

import React from "react";
import Link from "next/link";
import { Home, Settings, Paintbrush } from "lucide-react";

// Define menu items
const menuItems = [
  { title: "Home", url: "/space", icon: Home },
  { title: "Settings", url: "/home/settings", icon: Settings },
  { title: "Customize", url:"/space/customize", icon: Paintbrush },
];

export default function AppSidebar() {
  return (
    <aside className="zconatiner w-64 h-screen bg-gray-100 shadow-lg border-2">
      {/* Sidebar Header */}
      <div className="flex items-center px-6 py-5 border-b border-gray-300">
        <span className="text-2xl font-semibold text-gray-700 z-100">
          ✷ ChatBot AI
        </span>
      </div>

      {/* Menu Items */}
      <nav className="flex flex-col mt-6">
        {menuItems.map((item) => (
          <Link
            href={item.url}
            key={item.title}
            className="flex items-center gap-4 px-6  py-3 text-gray-700 hover:bg-gray-200"
          >
            <item.icon className="w-5 h-5" />
            <span className="text-lg font-medium">{item.title}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
