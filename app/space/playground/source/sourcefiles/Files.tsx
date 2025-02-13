import React, { useState } from "react";
import { MdOutlineFileUpload } from "react-icons/md";

const Files: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    setFiles(droppedFiles);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);
      setFiles(selectedFiles);
    }
  };

  return (
    <>
      <div className="h-[10vh] p-2 bg-gray-200 rounded-t-xl flex items-center">
        <h2 className="font-bold px-4">Files</h2>
      </div>

      <div
        className="rounded-b-xl p-6 text-center min-h-[300px] border-2 border-gray-200 flex flex-col justify-center items-center relative"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        {/* File Upload Icon */}
        <MdOutlineFileUpload size={50} className="text-gray-500 mb-2" />

        {/* File Input */}
        <input
          type="file"
          multiple
          className="absolute inset-0 opacity-0 cursor-pointer"
          onChange={handleFileSelect}
        />

        {/* Drag & Drop Text */}
        <span className="text-gray-500 text-sm">
          Drag & drop files here, or <b className="text-blue-600 cursor-pointer">click</b> to select files<br />
          <span className="text-xs text-gray-400">Supported File Types: .pdf, .doc, .docx, .txt</span>
        </span>

        {/* Footer Text - Sticks to Bottom */}
        <p className="text-gray-400 text-xs absolute bottom-2">
          If you are uploading a PDF, make sure you can select/highlight the text.
        </p>
      </div>
    </>
  );
};

export default Files;
