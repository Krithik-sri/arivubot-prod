import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import UserPage from "@/components/dashboard/HomePage"


const Dashboard = async () => {
  const session = await getServerSession();
  console.log(session,"msession")
  if (!session) {
    redirect("/space");
  }
  return(
    // <div className="h-full w-full flex justify-center items-center ">
      <div className="flex-1 fixed rounded-3xl bg-gray-50 p-6 h-full w-full px-24">
    <UserPage />
    </div>
    // </div>
  )
};

export default Dashboard;


