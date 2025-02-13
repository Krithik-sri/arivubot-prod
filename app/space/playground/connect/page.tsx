"use client";
import React, { useState } from "react";
import { FiCopy } from "react-icons/fi";
import { useUserContext } from "@/context/userContext";
import { CiShare1 } from "react-icons/ci";
import { GoLink } from "react-icons/go";
import { IoIosGlobe } from "react-icons/io";
import { TiTick } from "react-icons/ti";
import { LuUnplug, LuRefreshCcw } from "react-icons/lu";

interface EmbedSectionProps {
  chatbotId: string | null;
  handleCopy: () => void;
  copied: boolean;
  scriptTag: string;
}



const EmbedSection: React.FC<EmbedSectionProps>  = ({ chatbotId, handleCopy, copied, scriptTag }) => (
  <div>
    <div className="p-4 rounded-b-xl w-full">
      <div className="p-5 border-t border-l border-r border-gray-300 rounded-t-xl bg-gray-300 w-full">
        <h2 className="font-semibold pl-2 pt-2 mb-2">Embed</h2>
      </div>

      <div className="p-4 border-b  border-l border-r border-gray-300 rounded-b-xl bg-gray-100 w-full">
        <p className="text-gray-700 text-base ">
          Add the following script tag to your website to connect the chatbot.
        </p>
        <div className="bg-white border border-gray-300 p-4 rounded-lg mt-2">
          <pre className="text-sm text-gray-800 whitespace-pre-wrap">
            {scriptTag}
          </pre>
        </div>
        <div className="flex flex-col items-end p-1">
          <button
            className={`mt-4 px-6 py-2 text-sm rounded-lg text-white font-semibold flex max-w-[100px] items-center ${
              copied ? "bg-green-500" : "bg-blue-500"
            } hover:opacity-90 transition self-end`}
            onClick={handleCopy}
          >
            <FiCopy className="mr-2" />
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  </div>
);

const ShareSection = () => (
  <div>
    <div className="p-4 rounded-b-xl w-full">
      <div className="p-5 border rounded-t-xl bg-gray-300 w-full">
        <h2 className="font-semibold pl-2 pt-2 mb-2">Share</h2>
      </div>

      <div className="p-4 border rounded-b-xl bg-gray-100 flex flex-col w-full">
        <p className="text-gray-700 text-base">
          Chatbot is private, to share the chatbot change the visibility to
          public.
        </p>
        <div className="flex flex-col items-end">
          <button
            className={`mt-4 px-6 py-2 text-sm rounded-lg text-white bg-blue-500 justify-items-end max-w-[30%]`}
          >
            Make public
          </button>
        </div>
      </div>
    </div>
  </div>
);



const IntegrationsSection = () => (
    <div className="mt-4 flex flex-col gap-5 p-4 rounded-lg bg-gray-100">
        <div className="flex flex-col items-center">
        <p className="text-base font-bold">Welcome to Arivubot,</p>
        <p className="text-base font-bold"> your new collaborative automation platform !</p>
        </div>

        <div className="mt-4 space-y-4">
            {[{ name: "Whatsapp", status: "Done", connecting: "Connecting, Takes up to 2min", color: "bg-green-500", icon: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" },
              { name: "Instagram", status: "Connect", connecting: "Learn more", color: "bg-blue-500", icon: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" },
              { name: "Slack", status: "Connect", connecting: "Learn more", color: "bg-blue-500", icon: "https://upload.wikimedia.org/wikipedia/commons/7/76/Slack_Icon.png" }].map((integration, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-300 rounded-lg">
                    <div className="flex items-center space-x-4">
                        <img src={integration.icon} alt={integration.name} className="w-8 h-8" />   
                        <span className="font-semibold text-base">{integration.name}</span>
                    </div>
                    <div className="flex items-center gap-32 space-x-4">
                        <span className="text-gray-600 text-sm">{integration.connecting}</span>
                        <button className={`px-4 py-2 text-sm rounded-lg text-white font-semibold ${integration.color}`}>
                            <div className="flex items-center gap-1">
                            {integration.status === "Done" ? <TiTick /> : <LuUnplug />}       
                            {integration.status} 
                            </div>
                    
                            </button>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const Connect = () => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("embed");
  const { chatbotId } = useUserContext();
  const scriptTag =
    chatbotId &&
    `<script 
    src="https://arivubot-widget.vercel.app/arivubot.min.js?apiKey=${chatbotId}"> 
    </script>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(scriptTag);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 5000);
  };

  return (
    <div  className="flex w-full justify-center  h-full px-10 ">
      <div className="flex rounded-xl  bg-gray-50 flex-col m-2 px-5 py-2 w-full">
        <div className=" flex justify-between">
        <div className='flex justify-between items-center pl-6 py-3 mb-2'>
        <h2 className='font-bold text-2xl'>Connect</h2>
        </div>
          <div className="mt-4 mr-5 border border-gray-300 rounded-lg p-2">
            <LuRefreshCcw className="text-gray-500" />
          </div>
          
        </div>
        <div className="flex flex-row">
          <div className="w-1/4 ml-5 p-4 flex flex-col space-y-4">
            <button
              className={`text-left font-semibold text-base flex flex-row ${
                activeTab === "embed" ? "text-black" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("embed")}
            >
                <CiShare1 className="mt-1 mr-1" />
              Embed
            </button>
            <button
              className={`text-left font-semibold text-base flex flex-row ${
                activeTab === "share" ? "text-black" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("share")}
            >
                <GoLink className="mt-1 mr-1" />
              Share
            </button>
            <button
              className={`text-left font-semibold text-base flex flex-row  ${
                activeTab === "integrations" ? "text-black" : "text-gray-500"
              }`}
              onClick={() => setActiveTab("integrations")}
            >
                <IoIosGlobe className="mt-1 mr-1" />
                Integrations  
            </button>
          </div>
          <div className="w-3/4 p-4 ">
            {activeTab === "embed" && (
              <EmbedSection
                chatbotId={chatbotId}
                handleCopy={handleCopy}
                copied={copied}
                scriptTag={scriptTag}
              />
            )}
            {activeTab === "share" && <ShareSection />}
            {activeTab === "integrations" && <IntegrationsSection />}
          </div>
        </div>
        </div>
      </div>
  );
};

export default Connect;
