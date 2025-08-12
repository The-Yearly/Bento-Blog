"use client";
import { Menu } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { UserCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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
        <AnimatePresence>
          <div className="fixed z-40 block md:hidden top-0 w-full min-h-screen">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-black/20 inset-0 absolute left-0 backdrop-blur-sm h-full w-full"
              onClick={() => setIsSideBarOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 0.4,
              }}
              className="fixed bg-gradient-to-b from-gray-900 via-black to-gray-900 w-72 h-full right-0 shadow-2xl border-l border-gray-800"
            >
              <motion.button
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                onClick={() => setIsSideBarOpen(false)}
                className="absolute top-4 right-5 p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
              ></motion.button>
              <ul className="text-lg px-6 mt-16 text-neutral-300 font-nunito space-y-1">
                {navItems.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.1 + i * 0.1,
                      duration: 0.4,
                      ease: "easeOut",
                    }}
                    whileHover={{ x: 8 }}
                    className="group"
                  >
                    <Link
                      href={item}
                      className="block py-3 px-4 rounded-lg transition-all duration-300 group-hover:bg-gray-800/30 group-hover:text-white relative overflow-hidden"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-lg"
                        initial={{ scaleX: 0, originX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                      />

                      <motion.span
                        className="relative z-10 flex items-center"
                        whileHover={{ scale: 1.02 }}
                      >
                        <span className="w-2 h-2 rounded-full bg-blue-500 mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        {navDic[item as keyof typeof navDic]}
                      </motion.span>
                    </Link>
                  </motion.li>
                ))}

                <motion.li
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.1 + navItems.length * 0.1,
                    duration: 0.4,
                  }}
                  className="pt-6 mt-6 border-t border-gray-800"
                >
                  <Link href="/admin">
                    <motion.div
                      onClick={() => setSelected("admin")}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-gray-800/50 to-gray-700/50 hover:from-gray-700/50 hover:to-gray-600/50 transition-all duration-300 border border-gray-700/50"
                    >
                      <UserCircle
                        strokeWidth={1.1}
                        className="w-8 h-8 text-gray-400"
                      />
                      <span className="text-gray-300 font-medium">
                        Admin Panel
                      </span>
                    </motion.div>
                  </Link>
                </motion.li>
              </ul>
            </motion.div>
          </div>
        </AnimatePresence>
      )}
    </div>
  );
}
