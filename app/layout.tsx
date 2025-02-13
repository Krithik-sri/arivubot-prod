import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import SessionProvider from "@/lib/SessionProvider";
import Navbar from "@/components/Navbar";
import Providers from "@/Providers";
import Sidebar from "@/components/Sidebar";
import { UserProvider } from "@/context/userContext";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  variable: "--rochester-font",
});

export const metadata: Metadata = {
  title: "ArivuBot",
  description: `Build a custom GPT, embed it in your website and let it handle
            customer support, lead generation, engage with your users, and more.`,
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={lato.className}>
        <SessionProvider session={session}>
          <UserProvider>
            <Providers>
              <div className="mx-auto text-2xl gap-2 w-full h-full">
                <div className="fixed w-full top-0 z-50 bg-white shadow-md">
                  <Navbar />
                </div>
                {children}
              </div>
            </Providers>
          </UserProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

