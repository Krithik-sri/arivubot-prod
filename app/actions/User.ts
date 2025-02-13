"use server";
import connect from "@/lib/db";
import { getUser } from "@/lib/auth";
import { getUserModel } from "@/models/User";

export const sendUserData = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    connect();
    const newUser = {
      name,
      email,
      password,
      createdAt: new Date(), // Optional: Add a timestamp if needed
    };
    const User = await getUserModel();
    const res = await User.create(newUser);
    return {
      message: "The user has been created successfully",
      success: true,
      user: { ...newUser, _id: res.insertedId },
    };
  } catch (e) {
    return { message: "Error creating user", error: e, success: false };
  }
};

export async function getUserId(email: string | null | undefined) {
  if (email != null && email != undefined) {
    try {
      connect();
      const User = await getUserModel();
      const res = await User.findOne({ email });
      console.log(res,"uid");
      if (res) {
        return res;
      }
    } catch (e) {
      return { message: "Error retrieving user", error: e, success: false };
    }
  }
}

export default async function currentUser() {
  const session = await getUser();
  if (session) {
    return { user: session.user?.email };
  } else {
    return null;
  }
}
