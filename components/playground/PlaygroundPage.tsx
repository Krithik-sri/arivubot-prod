"use client";

import * as React from "react";
import { Lightbulb } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChatBox from "./chatBox";
import Activity from "./activity";
import ChatBotSettings from "./settings";
import Connect from "./Connect";
import { useEffect } from "react";
import { useUserContext } from "@/context/userContext";

export default function PlaygroundPage() {
  const [message, setMessage] = React.useState("");

  const backgroundApi = "https://sr.adrig.co.in/chatlaps";

  const selectedTab = useUserContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
  };

  useEffect(() => {}, [selectedTab]);

  return (
    <div className="flex flex-col px-10">
      <Tabs
        value={selectedTab}
        onValueChange={(newValue) => console.log(newValue)}
      >
        <header className="border-b ">
          <div className="container flex items-center justify-between py-4">
            <h1 className="text-2xl font-bold">Playground</h1>
            <TabsList className="hidden">
              <TabsTrigger value="playground">Playground</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="connect">Connect</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <div className="flex items-center space-x-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Lightbulb className="h-4 w-4" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <ul className="p-3 w-[300px]">
                      <li>1. Keep your questions clear for better responses</li>
                      <li>
                        2. Need help? Try asking specific questions or use
                        keywords
                      </li>
                      <li>3. Use quick reply buttons to get faster answers</li>
                    </ul>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </header>
        <TabsContent value="playground" className="flex-1 py-8">
          <ChatBox />
        </TabsContent>
        <TabsContent value="activity" className="flex-1 py-8">
          <Activity />
        </TabsContent>
        <TabsContent value="settings" className="flex-1 py-8">
          <ChatBotSettings />
        </TabsContent>
        <TabsContent value="connect" className="flex-1 py-8">
          <Connect />
        </TabsContent>
      </Tabs>
    </div>
  );
}
