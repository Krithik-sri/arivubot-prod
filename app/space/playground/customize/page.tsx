"use client";
import React, { useState, useEffect, useRef } from "react";
import { GetChatbot, UpdateChatbot } from "@/app/actions/Chatbot";
import currentUser from "@/app/actions/User";
import { FiRefreshCcw } from "react-icons/fi";

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
    logoPosition: "bottom-right",
    chatImg: "",
  });
  const [selectedOption, setSelectedOption] = useState("bgColor");

  const [chatbotId, setChatbotId] = useState("");
  useEffect(() => {
    async function fetchChatbot() {
      const usr = await currentUser();
      if (!usr || usr === undefined) {
        console.error("User not found");
        return;
      }

      try {
        const cbot = await GetChatbot(usr.user);
        if (cbot.res && cbot.res.length > 0) {
          const botData = cbot.res[0];

          setChatbotId(botData.chatbotId);

          const updatedTheme = {
            fontSize: botData.fontSize || "text-lg",
            fontColor: botData.fontColor || "#000000",
            fontStyle: botData.fontStyle || "font-sans",
            name: botData.name || "Chat Name",
            desc: botData.desc || "Chat Description",
            headerAlign: botData.headerAlign || "justify-center",
            bgColor: botData.bgColor || "#fff",
            innerButtonColor: botData.innerButtonColor || "#ff992c",
            outerButtonColor: botData.outerButtonColor || "#ff992c",
            userChatBg: botData.userChatBg || "#d1fae5",
            botChatBg: botData.botChatBg || "#f1f0f0",
            logoPosition: botData.logoPosition || "bottom-right",
            chatImg: botData.chatImg || "",
          };

          setTheme(updatedTheme);
          onThemeChange(updatedTheme);
        }
      } catch (error) {
        console.error("Error fetching chatbot:", error);
      }
    }

    fetchChatbot();
  }, []);

  const handleThemeChange = (key: string, value: string) => {
    const newTheme = { ...theme, [key]: value };
    setTheme(newTheme);
    onThemeChange(newTheme);

  };


  const saveThemeChanges = async () => {
    if (!chatbotId) {
      console.error("No chatbot ID found");
      return;
    }

    try {
      await UpdateChatbot(chatbotId, {
        fontSize: theme.fontSize,
        fontColor: theme.fontColor,
        fontStyle: theme.fontStyle,
        name: theme.name,
        desc: theme.desc,
        headerAlign: theme.headerAlign,
        bgColor: theme.bgColor,
        innerButtonColor: theme.innerButtonColor,
        outerButtonColor: theme.outerButtonColor,
        userChatBg: theme.userChatBg,
        botChatBg: theme.botChatBg,
        logoPosition: theme.logoPosition,
        chatImg: theme.chatImg,
      });
      console.log("Theme updated successfully");
    } catch (error) {
      console.error("Error updating chatbot:", error);
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



  const colorInputRef = useRef<HTMLInputElement>(null);
  const handleCircleClick = () => {
    if (colorInputRef.current) {
      colorInputRef.current.click(); 
    }
  };

  const colorInputRefFont = useRef<HTMLInputElement>(null);
  const handleCircleClickFont = () => {
    if (colorInputRefFont.current) {
      colorInputRefFont.current.click();
    }
  };
  
  const LogoUpload = () => {
    const [logo, setLogo] = useState<string | null>(null);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      if (file) {
        try {
          const resizedBase64 = await cropAndResizeImage(file) // Resize to 100x100
          console.log(resizedBase64.toString(), "rb64")
          setLogo(resizedBase64);
          handleThemeChange("chatImg", resizedBase64);
        } catch (err) {
          console.error("error resizing image", err);
        }
      }
    };

    return (
      <div>
        Replace Logo
      <div className="flex items-center  gap-4 p-4">
        <div className="w-16 h-16 overflow-hidden flex items-center justify-center">
          {logo ? (
            <img src={logo} alt="Logo Preview" className="w-full h-full object-cover" />
          ) : (
            <div className="text-gray-400">+</div>
          )}
        </div>
        <label className="px-4 py-2 border text-sm rounded cursor-pointer">
          Upload Logo
          <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
        </label>
      </div>
      </div>
    );
  }

  return (
    
    <div className="w-full max-w-md mx-auto p-6 bg-transparent rounded-md">


      <div className="mb-4">
        <h3 className="text-lg font-semibold">Chat Background</h3>
        <div className="mt-2 flex-col gap-2 w-full">
          <div className=" flex gap-3 mb-3">
            {["#2c68f6", "#007bff", "#00cc99", "#ff3366", "#ffcc00"].map((color) => (
              <button
                key={color}
                className="w-6 h-6 rounded-full border-2"
                style={{ backgroundColor: color, borderColor: theme.bgColor === color ? "black" : "transparent" }}
                onClick={() => handleThemeChange("bgColor", color)}
              />
            ))}
          </div>
          <div className="flex items-center">
            <div className="text-sm text-gray-500">Customize Chat</div>
            <div className="flex items-center ml-2">
              {/* Hidden color input */}
              <input
                type="color"
                ref={colorInputRef}
                value={theme.bgColor}
                onChange={(e) => handleThemeChange("bgColor", e.target.value)}
                className="hidden"
              />
              {/* Display hex code */}
              <span className="ml-2 mr-3 border-gray-600 border-2 p-1 rounded-md bg-gray-10  text-sm text-gray-700">{theme.bgColor}</span>
              {/* Custom circle */}
              <div
                onClick={handleCircleClick}
                className="w-8 h-8 rounded-full border-2 border-white cursor-pointer shadow-md"
                style={{ backgroundColor: theme.bgColor }}
              ></div>

            </div>
          </div>

        </div>
      </div>

      <div className="mb-4">
        <h3 className=" font-semibold mb-2">Font</h3>
        <h3 className="text-sm font-semibold mb-2">Font Style</h3>
        <select
          className="w-full p-2 border rounded-md mb-2"
          value={theme.fontStyle}
          onChange={(e) => handleThemeChange("fontStyle", e.target.value)}
        >
          <option value="Lato">Lato</option>
          <option value="Arial">Arial</option>
          <option value="Roboto">Roboto</option>
        </select>
        <h3 className="text-sm font-semibold">Font Size</h3>
        <select
          className="w-full p-2 border rounded-md mt-2"
          value={theme.fontSize}
          onChange={(e) => handleThemeChange("fontSize", e.target.value)}
        >
          <option value="text-sm">Small</option>
          <option value="">Medium</option>
          <option value="Large">Large</option>
        </select>
        <div className="mt-2 flex-col gap-2">
          <div className=" flex gap-3 mt-3 mb-3">
            {["#2c68f6", "#007bff", "#00cc99", "#ff3366", "#ffcc00"].map((color) => (
              <button
                key={color}
                className="w-6 h-6 rounded-full border-2"
                style={{ backgroundColor: color, borderColor: theme.bgColor === color ? "black" : "transparent" }}
                onClick={() => handleThemeChange("fontColor", color)}
              />
            ))}
          </div>
          <div className="flex items-center">
            <div className="text-sm text-gray-500">Customize Font Color</div>
            <div className="flex items-center ml-2">
              {/* Hidden color input */}
              <input
                type="color"
                ref={colorInputRefFont}
                value={theme.fontColor}
                onChange={(e) => handleThemeChange("fontColor", e.target.value)}
                className="hidden"
              />
              {/* Display hex code */}
              <span className="ml-2 mr-3 border-gray-600 border-2 p-1 rounded-md bg-gray-10  text-sm text-gray-700">{theme.bgColor}</span>
              {/* Custom circle */}
              <div
                onClick={handleCircleClickFont}
                className="w-8 h-8 rounded-full border-2 border-white cursor-pointer shadow-md"
                style={{ backgroundColor: theme.fontColor }}
              ></div>

            </div>
          </div>

        </div>
      </div>

      {/* Replace Logo */}
      {LogoUpload()}

      {/* Customize Welcome Message */}
      {/* <div>
        <h3 className="text-lg font-semibold">Customize Welcome Message</h3>
        <input
          type="text"
          className="w-full p-2 border rounded-md"
          value={welcomeMessage}
          onChange={(e) => setWelcomeMessage(e.target.value)}
        />
      </div> */}

    </div>
  );
}


function CustomizePage() {
  const [theme, setTheme] = useState({
    fontSize: "text-lg",
    fontColor: "#00000",
    fontStyle: "font-sans",
    name: "Chat Name",
    desc: "This is the chat customization panel",
    headerAlign: "justify-center",
    bgColor: "#fff",
    innerButtonColor: "#ff992c",
    outerButtonColor: "#ff992c",
    userChatBg: "#d1fae5",
    botChatBg: "#f1f0f0",
    chatImg: "",
    logoPosition: "bottom-right",
  });

  const getLogoClass = () => {
    switch (theme.logoPosition) {
      case "top":
        return "top-4 right-4";
      case "bottom":
      default:
        return "bottom-4 right-4";
    }
  };

  return (
    <div className="flex flex-col h-screen m-2 rounded-3xl mt-5 bg-gray-50  w-full">
      <div className="w-full flex items-center justify-between px-6 mt-8">
        <h2 className="text-2xl font-bold mb-4">Customize Chat</h2>
        <div className='flex justify-end rounded-xl gap-3 '>
          <button className=' flex justify-center items-center gap-1  px-6 bg-[#1171BB] py-1 rounded-xl font-semibold border-gray-300 text-gray-500'>

            <p className='text-[16px] text-white'>Save</p>
          </button>
          <button className='border-2 py-1 px-3 rounded-xl border-gray-300 text-gray-500'>
            <FiRefreshCcw className='text-[20px]' />
          </button>

        </div>
      </div>
      <div className=" rounded-3xl h-[90%] flex w-full">
        <CustomizationPanel onThemeChange={setTheme} />
        <div className="flex-1 h-full p-4">
          <div className="relative h-full flex flex-col"> {/* Added flex-col */}
            <div
              className="h-[90%] w-full p-4 flex flex-col border-gray border-2 rounded-3xl"
              style={{
                backgroundColor: theme.bgColor,
              }}
            >
              <div
                className={`flex flex-col ${theme.headerAlign} items-center space-y-1.5 pb-4`}
              >
                <h2
                  className={`font-bold text-2xl`}
                  style={{ color: theme.fontColor || "#000" }}
                >
                  {theme.name}
                </h2>
                <p
                  className="text-sm text-[#6b7280]"
                  style={{
                    fontStyle: theme.fontStyle,
                    color: theme.fontColor,
                  }}
                >
                  {theme.desc}
                </p>
              </div>

              {/* Messages section */}
              <div className="overflow-y-auto flex-1 mb-4"> {/* Added flex-1 */}
                <div className="flex justify-end pr-4">
                  <p
                    className={`leading-relaxed max-w-[80%] text-right text-black rounded-lg p-3 ${theme.fontSize}`}
                    style={{
                      backgroundColor: theme.userChatBg,
                      fontStyle: theme.fontStyle,
                      color: theme.fontColor,
                    }}
                  >
                    User message
                  </p>
                </div>
                <div className="flex justify-start gap-2">
                  <p
                    className={`leading-relaxed max-w-[80%] text-right text-black rounded-lg p-3 ${theme.fontSize}`}
                    style={{
                      backgroundColor: theme.botChatBg,
                      fontStyle: theme.fontStyle,
                      color: theme.fontColor,
                    }}
                  >
                    Bot reply
                  </p>
                </div>
              </div>

              {/* Input box - aligned to bottom */}
              <div className="pt-2 mt-auto"> {/* Added mt-auto */}
                <form className="flex items-center space-x-2">
                  <input
                    name="message"
                    className="flex h-10 w-full rounded-md px-3 text-sm border-2"
                    placeholder="Enter your message..."
                  />
                  <button
                    className="inline-flex items-center justify-center rounded-full text-sm font-medium h-12 w-14 pl-1"
                    type="button"
                    style={{ backgroundColor: theme.innerButtonColor }}
                  >
                    <center>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M7 17l9.2-9.2M17 17V7H7" />
                      </svg>
                    </center>
                  </button>
                </form>
              </div>
            </div>

            {/* Chat Popup Icon */}
            <div className="mt-2 justify-items-end">
              <button
                className={`justify w-16 h-16 rounded-full flex ${getLogoClass()}`}
                style={{
                  backgroundColor: theme.outerButtonColor,
                }}
              >
                {theme.chatImg ? (
                  <img
                    src={theme.chatImg}
                    alt="Button Icon"
                    className="w-full h-full rounded-full"
                  />
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="34px" height="34px">
                    <circle cx="17" cy="17" r="15" stroke="white" strokeWidth="2" />
                  </svg>
                )}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomizePage;
