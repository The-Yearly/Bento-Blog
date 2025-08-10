"use client";
import { useEffect, useState } from "react";
import { ActivityType } from "../utils/types";
import { BentoBox } from "./BentoGrid";
import axios from "axios";
import{ MobileBentoBox } from "./BenotImageGrid";
export default function RecentActivity() {
  const [recentActivityData, setRecentActivity] = useState<ActivityType[]>([]);
  const [wait, setWait] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 780);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setWait(true);
      const res = await axios.get(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/getRecentActivity",
      );
      setRecentActivity(res.data.data);
      setWait(false);
    };
    fetchData();
  }, []);
  if (!wait && recentActivityData) {
    return (
      <div className="md:mt-5">
        <p className="w-62 relative ml-5 px-3 tracking-widest py-2 text-xl font-mono text-white transition-all duration-300 hover:text-green-400 before:content-['▶'] before:absolute before:-left-8 before:top-1/2 before:-translate-y-1/2 before:text-green-500 before:opacity-0 before:transition-all before:duration-200 hover:before:opacity-60 hover:before:-left-6 after:absolute after:left-3 after:-bottom-0.5 after:h-px after:w-0 after:bg-green-400 after:transition-all after:duration-300 hover:after:w-36 ">
          Recent Activity
        </p>
        {!isMobile ? (
          <BentoBox contents={recentActivityData.slice(0, 10)} />
        ) : (
          <MobileBentoBox contents={recentActivityData.slice(0, 10)} />
        )}
      </div>
    );
  }
}
