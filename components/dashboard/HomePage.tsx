"use client";

import { GetChatbot } from "@/app/actions/Chatbot";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ChatBotCard from "./ChatbotCard";
import currentUser, { getUserId } from "@/app/actions/User";

type ChatbotData = {
  name: string;
  chatbotId: string;
};



export default function UserPage() {
  const [user, setUser] = useState<any>("");
  const router = useRouter();
  const [data, setData] = useState<ChatbotData[]>([]);
  useEffect(() => {
    async function fxxn() {
      try {
        const res = await currentUser();
        if (res?.user) {
          const result = await getUserId(res.user);
          setUser(result);
          if (result != undefined) {
            const cbot = await GetChatbot(result?.email);
            const result2 = Array.isArray(cbot.res) ? cbot.res : [cbot.res];
            setData(result2);
          }
        }
      } catch (e: any) {
        console.log(e);
      }
    }
    fxxn();
  }, []);




  const buttonClickHandler = () => {
    router.push("/space/create-chatbot");
  };

  return (
    <>
      <div className="mt-[100px]  flex justify-between">
        <h1 className=" text-4xl font-bold">ChatBots</h1>
        <Button onClick={buttonClickHandler}>New Chatbot</Button>
      </div>
      <div>
        {data.length === 0 ? (
          <div className="mt-20 flex justify-center">
            There are No ChatBot Created Please create Some!
          </div>
        ) : (
          <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-10">
            {data.map((e: ChatbotData, index: number) => (
              <div key={index} className="flex">
                <ChatBotCard name={e.name} chatbotId={e.chatbotId} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
