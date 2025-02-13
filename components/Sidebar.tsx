"use client";

import { FaCog, FaRegFolderOpen } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiRobot2Line } from "react-icons/ri";
import { PiChats } from "react-icons/pi";
import { CiSearch } from "react-icons/ci";
import { VscDebugDisconnect } from "react-icons/vsc";
import { HiOutlinePaintBrush } from "react-icons/hi2";
import React from "react";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="w-16 h-[85vh] flex flex-col items-center justify-between rounded-full bg-gray-50 shadow-md py-6">
      <div className="flex flex-col mt-20 items-center">
        {[
          { icon: <RiRobot2Line />, href: "/space/playground", label: "Playground" },
          { icon: <PiChats />, href: "/space/playground/activity", label: "Profile" },
          { icon: <CiSearch />, href: "/space/playground/source", label: "Search" },
          { icon: <FaRegFolderOpen />, href: "/space/playground/source", label: "source" },
          { icon: <VscDebugDisconnect />, href: "/space/playground/connect", label: "Connect" },
          { icon: <HiOutlinePaintBrush />, href: "/space/playground/customize", label: "Customize" },
        ].map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={`relative flex items-center justify-center p-2.5 rounded-full transition-all duration-300 ${
              pathname === item.href ? "text-black" : "text-gray-400"
            } hover:text-black`}
            aria-label={item.label}
          >
            {item.icon}
          </Link>
        ))}
      </div>

      {/* Settings Icon at Bottom */}
      <Link
        href="/space/playground/settings"
        className={`flex items-center justify-center p-3 rounded-full transition-all duration-300 ${
          pathname === "/space/playground/settings" ? "text-black" : "text-gray-400"
        } hover:text-black`}
        aria-label="Settings"
      >
        <FaCog className="mb-20" />
      </Link>
    </div>
  );
};

export default Sidebar;
