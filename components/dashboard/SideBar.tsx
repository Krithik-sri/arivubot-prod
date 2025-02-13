"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BsChatDots } from "react-icons/bs";
import { PiChatsCircleFill, PiPaintBrush } from "react-icons/pi";
import { FaArrowTrendUp } from "react-icons/fa6";
import { PiPlugsConnectedFill } from "react-icons/pi";
import { GiSettingsKnobs } from "react-icons/gi";
import { IoMdSettings } from "react-icons/io";
import { useUserContext } from "@/context/userContext";
import { LayoutDashboardIcon, Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import Loho from "./Vector.jpg";
import { useRouter } from "next/navigation";

interface Menu {
  title: string;
  path: string;
  icon: React.ReactNode;
  gap?: boolean;
}

const NewSideBar = (props: any) => {
  const [open, setOpen] = useState(true);
  const { chatbotId, setSelectedValue } = useUserContext();
  const pathname = usePathname(); // Get the current pathname

  const [menu, setMenu] = useState<Menu[]>([]);
  const router = useRouter();

  const PlaygroundMenus: Menu[] = [
    { title: "Play Area", path: "playground", icon: <BsChatDots /> },
    {
      title: "Activity",
      path: "activity",
      icon: <PiChatsCircleFill />,
    },
    // { title: "Leads", path: "/home/playground", icon: <FaArrowTrendUp /> },
    {
      title: "Connect",
      path: "connect",
      icon: <PiPlugsConnectedFill />,
      gap: true,
    },
    {
      title: "Integration",
      path: "/faq",
      icon: <GiSettingsKnobs />,
    },
    {
      title: "Settings",
      path: "settings",
      icon: <IoMdSettings />,
      gap: true,
    },
    // {
    //   title: "Customize",
    //   path: "/space/customize",
    //   icon: <PiPaintBrush />,
    //   gap: true,
    // },
  ];

  const HomeMenus: Menu[] = [
    { title: "Dashboard", path: "/space", icon: <LayoutDashboardIcon /> },
    {
      title: "Settings",
      path: "/space/settings",
      icon: <Settings />,
    },
    {
      title: "Customize",
      path: "/space/customize",
      icon: <PiPaintBrush />,
    },
  ];

  // Update menu based on pathname change
  useEffect(() => {
    if (
      pathname === "/space" ||
      pathname === "/space/settings" ||
      pathname === "/space/create"
    ) {
      setMenu(HomeMenus);
    } else {
      setMenu(PlaygroundMenus);
    }
  }, [pathname]);

  const clickHandler = (value: string) => {
    if (pathname !== "/space") {
      const res = value;
      setSelectedValue(res);
    }
  };

  return (
    <div className="flex z-50">
      <div
        className={`${
          open ? "w-72" : "w-20"
        } h-screen p-5 pt-8 relative duration-300`}
      >
        <img
          src="https://raw.githubusercontent.com/Sridhar-C-25/sidebar_reactTailwind/refs/heads/main/src/assets/control.png"
          className={`absolute cursor-pointer -right-3 top-24 w-7 border-dark-purple border-2 rounded-full ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img
            onClick={() => {
              router.push("/space");
            }}
            src={typeof Loho === "string" ? Loho : Loho.src}
            className={`h-8 ml-0 cursor-pointer duration-500 ${
              open && "rotate-[360deg] ml-2"
            }`}
            alt="Logo"
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            Designer
          </h1>
        </div>
        <ul className="pt-6">
          {menu.map((menu, index) => (
            <li
              key={index}
              className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-sm items-center gap-x-4 ${
                menu.gap ? "border-t pt-6 mt-6" : "mt-2"
              }`}
            >
              <Link
                href={`${
                  pathname === "/space" ||
                  pathname === "/space/settings" ||
                  pathname === "/space/create"
                    ? menu.path
                    : ""
                }`}
                className={`flex items-center gap-x-4 w-full p-1 rounded-md duration-200 text-black`}
                onClick={() => {
                  clickHandler(menu.path);
                }}
              >
                <span className="text-xl">{menu.icon}</span>
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  {menu.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="h-screen flex-1 bg-gray-300 border-l">
        {props.children}
      </div>
    </div>
  );
};

export default NewSideBar;
