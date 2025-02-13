"use server";
import { getUserModel } from "@/models/User";
import connect from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request: any) => {
  const { email, password } = await request.json();
  const User = getUserModel();
  await connect();
  console.log(email,password,"jj")
  const existingUser = await (await User).findOne({ email });

  if (existingUser) {
    return new NextResponse("Email is already in use", { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 5);

  // const newUser = new User({
  //   email,
  //   password: hashedPassword,
  // });

  try {
    const newUser = (await User).create({email,
      password: hashedPassword,
    })
    return new NextResponse("user is registered", { status: 200 });
  } catch (err: any) {
    return new NextResponse(err, {
      status: 500,
    });
  }
};