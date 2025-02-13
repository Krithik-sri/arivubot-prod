import React from "react";
import ChatBox from "@/components/playground/chatBox";

export default function Playground() {
  return (
    <div className="flex w-full justify-center h-[85vh] px-10 ">
      <div className="flex rounded-xl  bg-gray-50 flex-col m-2 px-5 py-2 w-full">
        <ChatBox />
      </div>
    </div>
  );
}
