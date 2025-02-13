import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { FaPlus } from "react-icons/fa";

const QnA = () => {
  const [qaList, setQaList] = useState([{ id: 1, question: "", answer: "" }]);

  const addQA = () => {
    setQaList([...qaList, { id: Date.now(), question: "", answer: "" }]);
  };

  const deleteQA = (id:Number) => {
    setQaList(qaList.filter((qa) => qa.id !== id));
  };

  const clearAll = () => {
    setQaList([]);
  };

  return (
    <div className="max-w-3xl border border-gray-300 rounded-xl ">


          <div className="bg-gray-200 w-full h-20 mb-4 rounded-t-xl">
          <h2 className="text-xl font-semibold p-4">Q&A</h2>
          </div>
          <div className="flex items-center justify-end space-x-3 px-4   mt-12">
            <button onClick={clearAll} className="text-red-500 text-sm font-bold">
              Delete all
            </button>
            <button
            onClick={addQA}
            className="border rounded-md p-2 shadow-sm text-sm bg-gray-50"
          ><FaPlus /></button>
          </div>
          {qaList.map((qa) => (
            <div key={qa.id} className=" border border-black p-3 space-y-2 m-4 rounded mb-2">
              <div className="text-sm font-bold flex justify-between">
                Question
                <button
                onClick={() => deleteQA(qa.id)}
                className="text-red-500 mt-2 flex items-center gap-1"
              >
                <Trash2 size={16} />
              </button>
              </div>
              <textarea className="w-full min-h-[100px] p-2 border rounded bg-gray-50 shadow-md"></textarea>
              <div className="text-sm font-bold">Answer</div>
              <textarea className="w-full min-h-[140px] p-2 border rounded bg-gray-50 shadow-md"></textarea>
            </div>
          ))}
    </div>
  );
};

export default QnA;
