"use client";
import * as React from "react";
import { Filter, Download } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface Message {
  objectId: string;
  data: {
    user: string;
    bot: string;
  };
}

interface Chat {
  messages: Message[];
}

const fetchChatData = async (slug: string): Promise<Chat[]> => {
  const res = await fetch(
    `https://sr.adrig.co.in/chatlaps/chatactivity?chatbotid=${slug}`
  );
  const data = await res.json();
  return data;
};

const Activity: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();

  const [chatData, setChatData] = React.useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = React.useState<Chat | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchChatData(slug);
        setChatData(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch chat data.");
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  const handleSelectChat = (objectId: string) => {
    const chat = chatData.find((chat) =>
      chat.messages.some((message) => message.objectId === objectId)
    );
    setSelectedChat(chat || null);
  };

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="flex flex-col h-[60%] overflow-hidden w-full">
      <div className="flex justify-between items-center p-4 border-b">
        <h1 className="text-xl font-semibold">Chat Logs</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="default" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-2/5 border-r overflow-y-auto p-4 space-y-4 h-full">
          {chatData.map((chat, index) => (
            <div
              key={index}
              className="bg-gray-100 p-3 rounded-lg cursor-pointer"
              onClick={() => handleSelectChat(chat.messages[0].objectId)}
            >
              <p className="text-sm">{chat.messages[0].objectId}</p>
            </div>
          ))}
        </div>

        <div className="w-3/5 overflow-y-auto p-4 space-y-4 h-[60%]">
          {selectedChat ? (
            selectedChat.messages.map((message, index) => (
              <div key={index}>
                <div className="bg-gray-100 p-3 mb-2 w-fit max-w-96 rounded-r-lg rounded-t-lg">
                  <p className="text-sm">{message.data.user}</p>
                </div>
                <div className="bg-black text-white rounded-l-lg rounded-t-lg p-4 w-fit ml-auto max-w-96">
                  <p className="text-sm">{message.data.bot}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">
              Select a chat to view messages.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Activity;
