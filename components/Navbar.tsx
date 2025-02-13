"use client";
import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { FaBars } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import Image from "next/image";

const Navbar = () => {
  const { data: session }: any = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Dashboard", href: "/space" },
  ];

  return (
    <>
    <header className="bg-white px-4">
      <nav
        className="flex items-center justify-between px-6 py-4 bg-white border-b shadow-sm  mx-auto "
        aria-label="Global"
      >
        <div className="flex items-center gap-x-6">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Adrig</span>
            <Image src="/nlogo.png" width={50} height={50} alt="star logo" />
          </Link>
          
        </div>

        <div className="hidden lg:flex lg:gap-x-12">
        {session ? (
              <>
              <button
                onClick={() => {
                  signOut();
                }}
                className="ml-auto rounded-md bg-black border border-gray-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Log out
              </button>
            </>
            ) : (
              <>
              <Link
                href="/login"
                className=" rounded-md bg-white border border-gray-700 px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Login
              </Link>
              <Link
                href="/register"
                className=" rounded-md bg-black border border-gray-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </Link></>
            )}
        </div>
  
        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <FaBars className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </nav>

      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center gap-x-6">
           
            
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <FaXmark className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
            {!session ? (
            <>
              <Link
                href="/login"
                className="hidden lg:block lg:text-sm lg:font-semibold lg:leading-6 lg:text-gray-900"
              >
                Log in
              </Link>
              <Link
                href="/register"
                className="rounded-md bg-black px-3 py-2 border border-gray-500 text-sm font-semibold text-white shadow-sm hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </Link>
            </>
          ) : (
            <>
              <span className="text-sm">{session.user?.email}</span>
              <button
                onClick={() => {
                  signOut();
                }}
                className="hidden lg:block lg:text-sm lg:font-semibold lg:leading-6 lg:text-gray-900"
              >
                Log out
              </button>
            </>
          )}
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  </>
  );
};

export default Navbar;
