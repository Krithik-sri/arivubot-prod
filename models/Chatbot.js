"use server";

import mongoose from "mongoose";

const chatbotSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  chatbotId: {
    type: String,
    unique: true,
    required: true,
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  fontSize: {
    type: Number,
    default: 12,
  },
  fontColor: {
    type: String,
    default: '#111827',
  },
  fontStyle: {
    type: String,
    default: 'font-sans',
  },
  desc: {
    type: String,
    default: '',
  },
  headerAlign: {
    type: String,
    default: 'justify-center',
  },
  bgColor: {
    type: String,
    default: '#fff',
  },
  innerButtonColor: {
    type: String,
    default: '#000000',
  },
  outerButtonColor: {
    type: String,
    default: '#000000',
  },
  userChatBg: {
    type: String,
    default: '#d1fae5',
  },
  botChatBg: {
    type: String,
    default: '#f1f0f0',
  },
  chatImg: {
    type: String,
    required: false
  },
  logoPosition: {
    type: String,
    default: 'right',
  },
  logoBottomPosition: {
    type: Number,
    default: 20,
  },
}, {
  timestamps: true,
});

const Chatbot =
  mongoose.models.Chatbot || mongoose.model("Chatbot", chatbotSchema);

// Ensure the export aligns with "use server" rules
export const getChatbotModel = async () => Chatbot;
