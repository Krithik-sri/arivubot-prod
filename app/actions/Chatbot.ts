"use server";

import { getChatbotModel } from "@/models/Chatbot";
import { getUserModel } from "@/models/User";
import connect from "@/lib/db";
import currentUser from "./User";


export const GetChatbot = async (email:any) => {
  try {
    connect();
    const User = await getUserModel();
    // Fetch the user by email to get their ID
    const user = await User.findOne({ email });
    if (!user) {
      return { message: "User not found", success: false };
    }
    const Chatbot = await getChatbotModel();
    // Fetch chatbots using the user's ID
    const chatbots = await Chatbot.find({ userid: user._id });
    return {
      res: chatbots,
    };
  } catch (e) {
    return { message: "Error", error: e, success: false };
  }
};

export const ChatBotCreation = async (
  name: string,
  chatbotId: string,
  uid: string
) => {
  try {
    connect();
    console.log(uid,"email");
    console.log(name,"name");
    console.log(chatbotId,"chatbotId");
    // Fetch the user by email to get their ID
    const User = await getUserModel();
    const user = await User.findOne( { _id : uid } );
    console.log(user,"user");
    if (!user) {
      return { message: "User not found", success: false };
    }
    
    const Chatbot = await getChatbotModel();

    // Create a new chatbot
    const newChatbot = {
      name: name,
      chatbotId: chatbotId,
      userid: user._id,
    };

    const chatbottemp = await Chatbot.create(newChatbot);
    console.log(chatbottemp,"chatbottemp");
    return {
      message: "The chatbot has been created successfully",
      success: true,
      user: newChatbot,
    };
  } catch (e) {
    return { message: "Error", error: e, success: false };
  }
};
export async function UpdateChatbot(chatbotId: string, theme:any) {
  try {
    if (!chatbotId) {
      throw new Error("Chatbot ID is required");
    }

    const Chatbot = await getChatbotModel();
    console.log(theme.chatImg)
    const res = await Chatbot.findOneAndUpdate({ chatbotId: chatbotId },{
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
    console.log(res," fff ")
    return { success: true, message: "Chatbot theme updated successfully!" };
  } catch (err) {
    console.error("Error updating chatbot:", err);
    return { success: false, message: "Error updating chatbot" };
}
}


export async function updateChatBotDb(chatbotId: string, theme: any) {
  try {
    if (!chatbotId) {
      throw new Error("Chatbot ID is required");
    }

    const Chatbot = await getChatbotModel();
    await Chatbot.findByIdAndUpdate(chatbotId, { theme });
    console.log(Chatbot)
    return { success: true, message: "Chatbot theme updated successfully!" };
  } catch (err) {
    console.error("Error updating chatbot:", err);
    return { success: false, message: "Error updating chatbot" };
  }
}

