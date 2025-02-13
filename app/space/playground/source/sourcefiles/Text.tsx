import React from "react";

const Text = () => {
  const handleInput = (event: React.FormEvent<HTMLTextAreaElement>) => {
    console.log("Text changed:", event.currentTarget.value);
  };

  return (
    <>
      <div className="h-[10vh] p-2 bg-gray-200 rounded-t-xl flex items-center">
        <h2 className="font-bold px-4">Text</h2>
      </div>
      <div className="rounded-b-xl  border-2 border-gray-200 flex flex-col">
        <textarea
          className="bg-gray-50 border-none rounded-lg p-3 min-h-[250px] text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter text ..."
          onInput={handleInput}
        ></textarea>
      </div>
    </>
  );
};

export default Text;
