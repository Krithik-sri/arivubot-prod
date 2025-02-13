"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [chatbotId, setChatbotId] = useState(null);
  const [selectedTab, setSelectedTab] = useState("playground");

  useEffect(() => {
    const storedChatbotId = localStorage.getItem("chatbotId");
    const storedSelectedTab = localStorage.getItem("selectedTab");

    if (storedChatbotId) {
      setChatbotId(storedChatbotId);
    }
    if (storedSelectedTab) {
      setSelectedTab(storedSelectedTab);
    }
  }, []);


  const setChatbot = (id) => {
    localStorage.setItem("chatbotId", chatbotId);
    setChatbotId(id);
  };

  const setSelectedValue = (value) => {
    setSelectedTab(value);
  };

  return (
    <UserContext.Provider
      value={{ chatbotId, setChatbot, selectedTab, setSelectedValue }}
    >
      {children}
    </UserContext.Provider>
  );
};
