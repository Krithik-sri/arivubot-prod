// import NextAuth, { NextAuthOptions } from "next-auth";
import { Account, User as AuthUser } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { getUserModel } from "@/models/User";
import connect from "@/lib/db";

export const authOptions  = {
    // Configure one or more authentication providers
    providers: [
      CredentialsProvider({
        id: "credentials",
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "text" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials: any) {
          await connect();
          console.log(credentials)
          try {
            const User = await getUserModel();
            const user = await User.findOne({ email: credentials.email });
            if (user) {
              const isPasswordCorrect = await bcrypt.compare(
                credentials.password,
                user.password
              );
              if (isPasswordCorrect) {
                return user;
              }
            }
          } catch (err: any) {
            throw new Error(err);
          }
          return null
        },
      }),
      GithubProvider({
        clientId: process.env.GITHUB_ID ?? "",
        clientSecret: process.env.GITHUB_SECRET ?? "",
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_ID ?? "",
        clientSecret: process.env.GOOGLE_SECRET ?? "",
      }),
      // ...add more providers here
    ],
    callbacks: {
      async signIn({ user, account }: { user: AuthUser; account: Account | null }) {
        if (account?.provider == "credentials") {
          return true;
        }
        if (account?.provider == "github") {
          await connect();
          try {
            const User = await getUserModel();
            const existingUser = await User.findOne({ email: user.email });
            if (!existingUser) {
              const newUser = new User({
                email: user.email,
              });
  
              await newUser.save();
              return true;
            }
            return true;
          } catch (err) {
            console.log("Error saving user", err);
            return false;
          }
        }
  
        if(account?.provider == "google"){
          await connect();
          try {
            const User = await getUserModel();
            const existingUser = await User.findOne({ email: user.email });
            if (!existingUser) {
              const newUser = new User({
                email: user.email,
              });
  
              await newUser.save();
              return true;
            }
            return true;
          } catch (err) {
            console.log("Error saving user", err);
            return false;
          }
        }
        return false
      },
    },
  };