"use client";
import { Menu } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { NavItemType } from "../utils/types";
const navItems: NavItemType[] = [
  { name: "Home", link: "/" },
  { name: "Blog", link: "/blog" },
  { name: "Captures", link: "/photos" },
  { name: "Quick Bites", link: "/bites" },
  { name: "Contact", link: "/contact" },
];

export default function NavBar() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  return (
    <div className="w-full mt-10 md:mt-15 flex justify-end md:justify-center ">
      <>
        <ul className="hidden md:flex gap-6 md:gap-10 text-sm md:text-lg text-neutral-500 font-nunito">
          {navItems.map((item, i) => (
            <li key={i}>
              <Link
                href={item.link}
                className="relative px-2 py-1 transition-all duration-400  hover:text-white hover:after:w-full after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-0 after:bg-neutral-300 after:transition-all after:duration-300"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </>
      <Menu
        className="mr-5 block md:hidden"
        onClick={() => setIsSideBarOpen(true)}
      />
      {isSideBarOpen && (
        <div className="fixed z-40 block md:hidden top-0 w-full min-h-screen">
          <div
            className="bg-black/10 inset-0 absolute left-0 backdrop-blur-lg h-full w-full"
            onClick={() => setIsSideBarOpen(false)}
          />
          <div className="fixed bg-black w-64 h-full right-0">
            <ul className="text-lg px-5 mt-10 text-neutral-400 font-nunito space-y-5">
              {navItems.map((item, i) => (
                <li key={i}>
                  <Link href={item.link}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
