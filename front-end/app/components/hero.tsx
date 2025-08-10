"use client";
import { ActivityType } from "../utils/types";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { BentoBox } from "./BentoGrid";
import { MobileBentoBox } from "./BenotImageGrid";
export default function Hero() {
  const [featured, setFeatured] = useState<ActivityType[]>([]);
  const [wait, setWait] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 780);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      setWait(true);
      const res = await axios.get(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/getTop3Feat",
      );
      setFeatured(res.data.data);
      setWait(false);
    };
    fetchData();
  }, []);
  return (
    <>
      {!wait && (
        <div className="mt-5 max-w-7xl mr-5">
          <div className="flex items-center">
            <p className="text-2xl tracking-widest xl pl-5 pr-3">Featured</p>
            <Star className="fill-yellow-400 hover:scale-125 transition-transform duration-400 stroke-yellow-400" />
          </div>
          {!isMobile ? (
            <BentoBox contents={featured || []} />
          ) : (
            <MobileBentoBox contents={featured || []} />
          )}
        </div>
      )}
    </>
  );
}
