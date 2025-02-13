"use client";

import { useUserContext } from "@/context/userContext";
import React, { useState, useEffect } from "react";
import { ImBin2 } from "react-icons/im";

interface Message {
  sender: "user" | "bot";
  text: string;
}

interface Chat {
  id: string;
  title: string;
  summary: string;
  date: string;
  source: string;
  messages: Message[];
}

const ChatLogs = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [selectedType, setSelectedType] = useState<string>("Junk");
  const [fromDate, setFromDate] = useState<string>("2024-12-01");
  const [toDate, setToDate] = useState<string>("2025-01-07");

  const {chatbotId} = useUserContext();


  useEffect(() => {
    fetch(`https://sr.adrig.co.in/chatlaps/chatactivity?chatbotid=${chatbotId}`)
      .then((res) => res.json())
      .then((data) => {
        const formattedChats = data.map((chat: any, index: number) => {
          const lastMessage = chat.messages[chat.messages.length - 1]?.data.user || "No Title";
          const messages = chat.messages.flatMap((msg: any) => [
            { sender: "user", text: msg.data.user },
            { sender: "bot", text: msg.data.bot },
          ]);

          return {
            id: chat.userId || `chat-${index}`,
            title: lastMessage,
            summary: "Chat Summary",
            date: "2025-01-06",
            source: "Support",
            messages,
          };
        });
        setChats(formattedChats);
        if (formattedChats.length > 0) setSelectedChat(formattedChats[0]);
      })
      .catch((error) => console.error("Error fetching chat data:", error));
  }, [chatbotId]);

  return (
    <div className="flex flex-col bg-gray-100 border-gray-200 border-2 rounded-xl w-full ">
      <div className="bg-gray-200 w-full flex items-center">
        <h3 className="text-xl font-bold text-gray-800 px-6 py-6">Chat Logs</h3>
      </div>
      <div className="w-full flex items-center py-3 px-4 gap-4">
        <div className="flex items-center bg-gray-200 border-2 border-gray-300 rounded-lg">
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="border-0 bg-gray-200"
          />
          <span>~</span>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="border-0 bg-gray-200"
          />
        </div>
        <div>
          <select
            name="type"
            id="typeOfChat"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="border py-2 px-4 rounded-lg bg-gray-200 border-2 border-gray-300"
          >
            <option value="Junk">Junk</option>
            <option value="Inquiry">Inquiry</option>
            <option value="Support">Support</option>
            <option value="Feedback">Feedback</option>
          </select>
        </div>
      </div>
      <div className="flex flex-row border-gray-200 border-2 h-full overflow-hidden">
  {/* Sidebar (Chat List) */}
  <div className="w-1/3 border-r rounded-l-xl p-2 overflow-y-auto h-[calc(100vh-200px)]">
    <ul className="space-y-4">
      {chats.map((chat) => (
        <li
          key={chat.id}
          className={`p-4 rounded-lg cursor-pointer hover:bg-gray-200 ${
            selectedChat?.id === chat.id ? "" : "bg-gray-100 hover:bg-gray-200"
          }`}
          onClick={() => setSelectedChat(chat)}
        >
          <div className="flex flex-row p-1 gap-2">
            <h4 className="text-sm font-semibold text-gray-900 mb-1">{chat.title}</h4>
            <span className="text-xs text-gray-400 whitespace-nowrap mt-1">{chat.date}</span>
          </div>
          <p className="text-sm text-gray-600">{chat.summary}</p>
        </li>
      ))}
    </ul>
  </div>

  {/* Chat Messages Panel */}
  <div className="flex-1 flex flex-col p-4 h-[calc(100vh-200px)]">
    {selectedChat && (
      <>
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-700 text-sm flex gap-1">
            Source: <p className="text-gray-700 font-bold text-sm">{selectedChat.source}</p>
          </span>
          <button className="text-[20px] text-red-500 hover:text-red-600">
            <ImBin2 />
          </button>
        </div>

        {/* Scrollable Chat Content */}
        <div className="flex-1 overflow-y-auto bg-gray-50 rounded-lg p-4">
          {selectedChat.messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 text-xs flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex items-center max-w-md p-3 ${
                  message.sender === "user"
                    ? "bg-blue-500 text-white rounded-tl-lg rounded-tr-lg rounded-bl-lg"
                    : "bg-gray-300 text-gray-800 rounded-tl-lg rounded-tr-lg rounded-br-lg"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>
      </>
    )}
  </div>
</div>

    </div>
  );
};

export default ChatLogs;
