"use client";

import { FaFile, FaKeyboard, FaGlobe, FaQuestionCircle, FaNode, FaAlignRight } from "react-icons/fa";
import { FiRefreshCcw } from "react-icons/fi";
import Files from "./sourcefiles/Files";
import Website from "./sourcefiles/Website";
import Text from "./sourcefiles/Text";
import QnA from "./sourcefiles/QnA";
import Notion from "./sourcefiles/Notion";

import React, { useState } from "react";

const SourcePage: React.FC = () => {
    const [activeTab, setActiveTab] = useState("Files");

    const tabs = [
      { name: "Files", icon: <FaFile className="mr-2" /> },
      { name: "Text", icon: <FaAlignRight className="mr-2" /> },
      { name: "Website", icon: <FaGlobe className="mr-2" /> },
      { name: "Q&A", icon: <FaQuestionCircle className="mr-2" /> },
    ];

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case "Files":
        return (<Files />);
      case "Text":
        return(<Text />);
      case "Website":
        return(<Website />);
      case "Q&A":
        return(<QnA />);
      default:
        return null;
    }
  };

  return (
    <div  className="flex w-full justify-center  h-full px-10">
    <div className="flex rounded-xl  bg-gray-50 flex-col m-2 px-5 py-2 w-full  pb-6 ">
    <div className='flex justify-between items-center pl-4 py-3 mb-2'>
    <h2 className='font-bold text-2xl'>Source</h2>
    </div>
      <div className="flex space-x-6 h-full">
        {/* Sidebar Tabs */}
        <div className="w-[15vw]  pt-10">
        {tabs.map((tab) => (
            <div
              key={tab.name}
              className={` text-[20px] flex items-center px-3 pb-4 cursor-pointer rounded ${
                activeTab === tab.name
                  ? "text-black"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab(tab.name)}
            >
              {tab.icon}
              <p className="text-[18px]">{tab.name}</p>
            </div>
          ))}
        </div>

        {/* Active Tab Content */}
        <div className="flex-1 rounded  pt-10 ">
          {renderActiveTabContent()}
        </div>

        {/* Sources Section */}

        {/* <div className="w-1/3 h-[40vh] rounded p-6">
        <div className="place-items-end p-4 ">
            <div className="border-gray border-2 rounded-lg p-1"><FiRefreshCcw /></div>
            
        </div>
        <div className="border-gray border-2 p-4">
          <div className="text-gray-600 text-sm mb-4 border-gray">Sources</div>
          <p className="text-gray-800 text-sm">
            8 Links (28,345 detected chars)
          </p>
          <p className="text-gray-500 text-sm">Total detected characters</p>
          <p className="text-gray-800 text-lg font-semibold">
            28,345 / 400,000 limit
          </p>
          <button className="w-full mt-4 py-2 bg-blue-600 text-white rounded shadow">
            Retain Chatbot
          </button>
        </div>
        </div> */}
      </div>
    </div>
    </div>
  );
};

export default SourcePage;
