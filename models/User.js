"use server";

import mongoose from "mongoose";
import connect from "@/lib/db"; 
connect();


const { Schema } = mongoose;

const userSchema = Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
  },
);

const User =
  mongoose.models.User || mongoose.model("User", userSchema);

// Ensure the export aligns with "use server" rules
export const getUserModel = async () => User;