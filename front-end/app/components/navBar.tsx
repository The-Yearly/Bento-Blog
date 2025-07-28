"use client";
import { Menu } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { UserCircle } from "lucide-react";
import { usePathname } from "next/navigation";
const navDic = {
  "/": "Home",
  "/blog": "Blog",
  "/image": "Captures",
  "/bite": "Quick Bites",
  "/contact": "Contact",
};
const navItems = Object.keys(navDic);
export default function NavBar() {
  const pathName = usePathname();
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [selected, setSelected] = useState(
    navDic[pathName as keyof typeof navDic],
  );

  return (
    <div className="w-full mt-10 md:mt-15 flex justify-between ">
      <Link
        href={"/"}
        onClick={() => setSelected("Home")}
        className="text-xl ml-5 outline-none text-slate-800 dark:text-white hover:text-neutral-600 transition-all duration-300 tracking-widest uppercase hover:tracking-wide"
      >
        Bento Blog
      </Link>
      <div>
        <ul className="hidden md:flex gap-6 md:gap-10 text-sm md:text-lg text-neutral-500 font-nunito">
          {navItems.map((item, i) => (
            <li key={i}>
              <Link
                onClick={() => setSelected(navDic[item as keyof typeof navDic])}
                href={item}
                className={`relative outline-none px-2 py-1 transition-all duration-400 hover:text-white 
    after:absolute after:left-0  hover:tracking-widest after:-bottom-0.5 after:h-0.5 after:bg-neutral-300 after:transition-all after:duration-300
    ${
      selected === navDic[item as keyof typeof navDic]
        ? "after:w-full text-white tracking-widest"
        : "after:w-0 tracking-normal hover:after:w-full"
    }`}
              >
                {navDic[item as keyof typeof navDic]}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <Link href={"/admin"}>
        <UserCircle
          onClick={() => setSelected("admin")}
          strokeWidth={1.1}
          className="hidden w-10 h-10 mr-5 md:block"
        />
      </Link>
      <Menu
        className="mr-5 block md:hidden"
        onClick={() => setIsSideBarOpen(true)}
      />
      {isSideBarOpen && (
        <div className="fixed z-40 block md:hidden top-0 w-full min-h-screen">
          <div
            className="bg-black/10 inset-0 absolute left-0 backdrop-blur h-full w-full"
            onClick={() => setIsSideBarOpen(false)}
          />
          <div className="fixed bg-black w-64 h-full right-0">
            <ul className="text-lg px-5 mt-10 text-neutral-400 font-nunito space-y-5">
              {navItems.map((item, i) => (
                <li key={i}>
                  <Link href={item}>{navDic[item as keyof typeof navDic]}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
