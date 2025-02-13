"use client";

import React from "react";
import { useState } from "react";

const ChatInterface = () => {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column" as const,
      justifyContent: "space-between",
      alignItems: "center",
      height: "100vh",
      width: "100%",
      maxWidth: "600px",
      margin: "0 auto",
      backgroundColor: "#f8f9fa",
      border: "1px solid #dee2e6",
      borderRadius: "10px",
      overflow: "hidden",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    },
    chatWindow: {
      flex: 1,
      width: "100%",
      overflowY: "auto" as const,
      padding: "20px",
    },
    message: {
      backgroundColor: "#e9ecef",
      padding: "10px 15px",
      borderRadius: "10px",
      marginBottom: "10px",
      maxWidth: "70%",
      alignSelf: "flex-start",
    },
    inputContainer: {
      display: "flex",
      width: "100%",
      padding: "10px",
      borderTop: "1px solid #dee2e6",
      backgroundColor: "#fff",
    },
    input: {
      flex: 1,
      padding: "10px",
      border: "1px solid #ced4da",
      borderRadius: "5px",
      marginRight: "10px",
      fontSize: "16px",
    },
    sendButton: {
      backgroundColor: "#007bff",
    }
  }

  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");

  const handleSend = () => {
    if (input.trim() === "") return;
    setMessages((prev) => [...prev, input]);
    setInput(""); // Clear input after sending
  };

  return (
    <div style={styles.container}>
      <div style={styles.chatWindow}>
        {messages.map((message, index) => (
          <div key={index} style={styles.message}>
            <p>{message}</p>
          </div>
        ))}
      </div>
      <div style={styles.inputContainer}>
        <input
          type="text"
          style={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything from here"
        />
        <button style={styles.sendButton} onClick={handleSend}>
          &#9658;
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;