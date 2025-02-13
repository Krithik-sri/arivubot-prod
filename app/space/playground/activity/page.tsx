import React from 'react';
import ChatLogs from '@/components/ActivityPage';
import { ImDrawer } from "react-icons/im";
import { FiRefreshCcw } from "react-icons/fi";
import { IoOptionsOutline,IoPersonAddSharp  } from "react-icons/io5";

const Activity = () => {
  return (
    <div  className="flex w-full justify-center  h-full px-10 ">
    <div className="flex rounded-xl  bg-gray-50 flex-col m-2 px-5 py-2 w-full">
            <div className='flex justify-between items-center pl-6 py-3 mb-2'>
                <h2 className='font-bold text-2xl'>Activity</h2>
                <div className='flex justify-end rounded-xl gap-3 '>
                    <button className='border-2 py-1 px-3 rounded-xl border-gray-300 text-gray-500'>
                        <FiRefreshCcw className='text-[20px]'/>
                    </button>
                    <button className=' flex justify-center items-center gap-1 border-2 px-2 py-1 rounded-xl font-semibold border-gray-300 text-gray-500'>
                        <IoOptionsOutline className='text-[20px]'/>
                        <p className='text-[16px]'>Filter</p>
                    </button>
                </div>
            </div>
            <div className='flex  w-full '>
                <div className='px-6 w-72 '>
                    <button className='w-full flex gap-4 py-2 mb-1 text-black flex'>
                        <ImDrawer />
                        <div className='text-[16px]  whitespace-nowrap'>Chat Logs</div>
                    </button>
                    <button className='w-full py-2 flex gap-4 text-black flex'>
                        <IoPersonAddSharp  />
                        <div className='text-[16px] whitespace-nowrap'>Leads</div>
                    </button>
                </div>
                <div className="flex-1 h-full overflow-y-auto bg-white rounded-xl ">
              <ChatLogs />
            </div>
            </div>
    </div>
    </div>
  )
}

export default Activity