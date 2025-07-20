"use client";
import React, { useState } from "react";
import { BentoBox } from "../components/BentoGrid";
import { ActivityType } from "../utils/types";
import { useEffect } from "react";
import axios from "axios";
export default function DeveloperActivityFeed() {
  const [blogs, setBlogs] = useState<ActivityType[]>([]);
  const [wait, setWait] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      setWait(true);
      const res = await axios.get(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/getPosts/Blog",
      );
      setBlogs(res.data.data);
      setWait(false);
    };
    fetchData();
  }, []);
  useEffect(() => {
    console.log(blogs);
  }, [blogs]);
  if (!wait) {
    return (
      <div>
        <div className="mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto">
            <BentoBox recentActivityData={blogs} />
          </div>
        </div>
      </div>
    );
  }
}
