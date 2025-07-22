"use client";
import BentoImageGrid, { MobileBentoBox } from "../components/BenotImageGrid";
import { useState, useEffect } from "react";
import { ActivityType } from "../utils/types";
import axios from "axios";
export default function Captures() {
  const [captures, setCaptures] = useState<ActivityType[]>([]);
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
    console.log(captures);
  }, [captures]);
  useEffect(() => {
    const fetchData = async () => {
      setWait(true);
      const res = await axios.get(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/getPosts/Image",
      );
      setCaptures(res.data.data);
      setWait(false);
    };
    fetchData();
  }, []);
  if (!wait) {
    return (
      <>
        {!isMobile ? (
          <BentoImageGrid contents={captures} />
        ) : (
          <MobileBentoBox contents={captures} />
        )}
      </>
    );
  }
}
