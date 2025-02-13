"use client";
import React, { useState, useContext } from "react";

import currentUser from "@/app/actions/User";
import { useUserContext } from "@/context/userContext";
import { getChatbotModel } from "@/models/Chatbot";
import { GetChatbot } from "@/app/actions/Chatbot";


function CustomizationPanel({ onThemeChange }: { onThemeChange: any }) {

  const [theme, setTheme] = useState({
    fontSize: "text-lg",
    fontColor: "#000000",
    fontStyle: "font-sans",
    name: "Chat Name",
    desc: "Chat Description",
    headerAlign: "justify-center",
    bgColor: "#fff",
    innerButtonColor: "#ff992c",
    outerButtonColor: "#ff992c",
    userChatBg: "#d1fae5",
    botChatBg: "#f1f0f0",
    chatImg: "",
    logoPosition: "bottom-right",
  });
  const { chatbotId } = useUserContext();
  const [selectedOption, setSelectedOption] = useState("bgColor");
 
  
  async function updateChatBot() {
    try {
      if (!chatbotId) {
        console.error("Chatbot ID not found");
        return;
      }
  
      // Update chatbot settings in the database
      const curChatbot = await getChatbotModel();
      await curChatbot.findByIdAndUpdate(chatbotId, {
        theme: theme, // Assuming `theme` holds customization values
      });
  
      console.log("Chatbot updated successfully!");
    } catch (err) {
      console.error("Error updating chatbot:", err);
    }
  }

    
  
    const options = [
      { label: "Chat Background", key: "bgColor" },
      { label: "Font Color", key: "fontColor" },
      { label: "Inner Button Color", key: "innerButtonColor" },
      { label: "Outer Button Color", key: "outerButtonColor" },
      { label: "User Chat Background", key: "userChatBg" },
      { label: "Bot Chat Background", key: "botChatBg" },

    ];
  
    const handleThemeChange = (key: string, value: string) => {
      const newTheme = { ...theme, [key]: value };
      setTheme(newTheme);
      onThemeChange(newTheme);
      
    };

    const cropAndResizeImage = (file: File): Promise<string> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        const reader = new FileReader();
    
        reader.onload = () => {
          img.src = reader.result as string;
        };
    
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
    
          if (!ctx) {
            reject("Failed to get canvas context.");
            return;
          }
    
          // Determine square crop dimensions
          const size = Math.min(img.width, img.height); // Smaller dimension for square crop
          const cropX = (img.width - size) / 2; // Center crop horizontally
          const cropY = (img.height - size) / 2; // Center crop vertically
    
          // Resize canvas to 100x100
          canvas.width = 100;
          canvas.height = 100;
    
          // Draw the cropped region, resizing to 100x100
          ctx.drawImage(
            img,
            cropX,
            cropY,
            size,
            size, // Source: crop square
            0,
            0,
            100,
            100 // Destination: 100x100
          );
    
          // Convert canvas to Base64
          resolve(canvas.toDataURL("image/png"));
        };
    
        img.onerror = reject;
        reader.readAsDataURL(file);
      });
    };

    const [error, setError] = useState<string | null>(null);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      if (file) {
        try{
        const resizedBase64 = await cropAndResizeImage(file) // Resize to 100x100
        handleThemeChange("chatImg", resizedBase64);
        updateChatBot().catch((error)=>{setError(error)});
        } catch(err){
          console.error("error resizing image", err);
      }
    }
    };



  
    return (
      <div className="w-[50%] p-4 bg-gray-50 border-r">
        <h2 className="text-lg font-bold mb-4">Customize Chat</h2>
  
        {/* Dropdown for Selecting Element */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Select Element to Customize
          </label>
          <select
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            className="w-full border rounded-md p-2"
          >
            {options.map((option) => (
              <option key={option.key} value={option.key}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
  
        {/* Single Large Color Picker */}
        <div>
          <label className="block text-sm font-medium mb-1">Pick a Color</label>
          <input
            type="color"
            value={theme[selectedOption as keyof typeof theme]}
            onChange={(e) => handleThemeChange(selectedOption,e.target.value)}
            className="w-16 h-16 cursor-pointer"
            style={{
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          />
        </div>
        <div>
        <label className="block text-sm font-medium mb-1">Font Style</label>
        <select
          value={theme.fontStyle}
          onChange={(e) =>{
            setSelectedOption("fontStyle")
            handleThemeChange(selectedOption,e.target.value)}}
          className="w-full border rounded-md p-2"
        >
          <option value="font-sans">Sans</option>
          <option value="font-serif">Serif</option>
          <option value="font-mono">Monospace</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Font Size</label>
        <select
          value={theme.fontSize}
          onChange={(e) =>{
            setSelectedOption("fontSize")
            handleThemeChange(selectedOption,e.target.value)}}
          className="w-full border rounded-md p-2"
        >
          <option value="text-sm">Small</option>
          <option value="text-base">Medium</option>
          <option value="text-lg">Large</option>
          <option value="text-xl">Extra Large</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Upload Outer Button Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full text-sm"
        />
      </div>



       {/* Logo Position */}
       <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Logo Position</label>
        <select
          value={theme.logoPosition}
          onChange={(e) => handleThemeChange("logoPosition", e.target.value)}
          className="w-full border rounded-md p-2"
        >
          <option value="top">Top</option>
          <option value="bottom">Bottom</option>
        </select>
      </div>
      {error && <p className="text-red-500">{error}</p>}
        <button
          onClick={updateChatBot}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
          Save Changes
        </button>
      </div>  
    );
  }

  export default CustomizationPanel;