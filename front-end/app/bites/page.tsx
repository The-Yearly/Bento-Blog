"use client";
import React, { useState } from "react";
import { BentoBox } from "../components/BentoGrid";
import { ActivityType } from "../utils/types";
import { useEffect } from "react";
import axios from "axios";
import { MobileBentoBox } from "../components/BenotImageGrid";

export default function DeveloperActivityFeed() {
  const [bites, setBites] = useState<ActivityType[]>([]);
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
        process.env.NEXT_PUBLIC_BACKEND_URL + "/getPosts/Bite",
      );
      setBites(res.data.data);
      console.log(res);
      setWait(false);
    };
    fetchData();
  }, []);
  if (!wait) {
    return (
      <div>
        <div className="mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto">
            {!isMobile ? (
              <BentoBox contents={bites} />
            ) : (
              <MobileBentoBox contents={bites} />
            )}
          </div>
        </div>
      </div>
    );
  }
}
