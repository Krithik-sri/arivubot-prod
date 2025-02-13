// app/space/layout.tsx
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import React from 'react';

export default function SpaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col w-full ">
      <div className="flex w-full  pt-16"> {/* pt-16 to prevent overlap with navbar */}
        {/* Fixed Sidebar */}
        <div className="w-18 ml-8 h-full fixed top-16 left-0   z-40 my-8">
          <Sidebar />
        </div>

        {/* Scrollable Content */}
        <div className="ml-24 flex-1   p-6 ">
          {children}
        </div>
      </div>
    </div>
  );
}
