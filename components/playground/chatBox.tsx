"use client"
import * as React from "react";
import { RefreshCcw, Send,ThumbsUp,ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useParams } from "next/navigation";
import currentUser, { getUserId } from "@/app/actions/User";
import { useEffect, useState } from "react";
import { useUserContext } from "@/context/userContext";

type Message = {
  id: number;
  text: string;
  sender: "user" | "bot";
};

export default function ChatBox() {
  const backgroundApi = "https://sr.adrig.co.in/chatlaps";
  const params = useParams();
  const [message, setMessage] = React.useState("");
  const [chatMessages, setChatMessages] = React.useState<Message[]>([
    {
      id: 1,
      text: "Hi! What can I help you with?",
      sender: "bot",
    },
  ]);
  const [isTyping, setIsTyping] = React.useState(false);
  const { chatbotId } = useUserContext();
  const [user, setUser] = useState<any>("");
  const [userid, setUserId] = useState<string>();

  useEffect(() => {
    async function fxxn() {
      try {
        const res = await currentUser();
        if (res?.user) {
          const result = await getUserId(res.user);
          setUser(result?._id);
          setUserId(result?._id);
          console.log(result?._id, "result");
        }
      } catch (e: any) {
        console.log(e);
      }
    }
    fxxn();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() === "") return;

    const newMessage: Message = {
      id: chatMessages.length + 1,
      text: message,
      sender: "user",
    };

    setChatMessages((prev) => [...prev, newMessage]);
    setMessage("");
    simulateBotReply();
  };

  const simulateBotReply = async () => {
    setIsTyping(true);

    const typingMessage: Message = {
      id: chatMessages.length + 2,
      text: "Typing...",
      sender: "bot",
    };

    setChatMessages((prev) => [...prev, typingMessage]);

    try {
      if (userid) {
        const response = await axios.post(
          `${backgroundApi}/chatresponse`,
          {
            question: message,
            userid: userid,
            chatbotid: `${chatbotId}`,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response,"response");

        setChatMessages((prev) =>
          prev.filter((msg) => msg.text !== "Typing...")
        );

        const botReply: Message = {
          id: chatMessages.length + 2,
          text: response.data.data,
          sender: "bot",
        };

        setChatMessages((prev) => [...prev, botReply]);
      }
    } catch (error) {
      console.log("Error fetching bot response:", error);
      setChatMessages((prev) =>
        prev.map((msg) =>
          msg.text === "Typing..."
            ? { ...msg, text: "Error: Unable to fetch response." }
            : msg
        )
      );
    }

    setIsTyping(false);
  };

  const handleRefresh = () => {
    setChatMessages([
      {
        id: 1,
        text: "Hi! What can I help you with?",
        sender: "bot",
      },
    ]);
  };

  return (
    <div className="mx-auto w-full h-full max-w-3xl flex items-center gap-8">
      <Card className="flex flex-col w-full max-w-2xl bg-white  mx-auto h-[70vh]">
        <div className="flex py-3 border-b-2 mx-6">
        <div className="font-semibold text-[18px] text-[#4D4849]">ChatBot</div>
        </div>
    

      <CardContent className="flex flex-col space-y-4 max-h-[400px] overflow-y-auto py-4">
        {chatMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
          >
            <div
              className={`${msg.sender === "bot"
                  ? "bg-blue-100 text-gray-700"
                  : "bg-black text-white"
                } rounded-lg p-4 text-sm max-w-[70%] shadow-sm`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </CardContent>

      <div  className="border-2 mx-3 mb-4 py-2 px-6 flex flex-col mt-auto rounded-full">
        <form onSubmit={handleSubmit} className="flex w-full gap-2">
          <input
            placeholder="Ask anything from here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            
            className="flex-1 border-none  focus:outline-0 focus:ring-none"
          />
          <button type="submit" className="bg-black px-3 rounded-lg">
            <Send size={20} className="text-white" />
            <span className="sr-only">Send message</span>
          </button>
        </form>
      </div>
    </Card>

    <div className="h-52 w-20 bg-white text-gray-500 rounded-lg shadow-md flex flex-col items-center justify-around">
          <button>
          <RefreshCcw size={28} />
          </button>
          <button>
          <ThumbsUp size={28} />
          </button>
        <button>
        <ThumbsDown size={28}  />
        </button>
        
    </div>
    </div>
  );
}
