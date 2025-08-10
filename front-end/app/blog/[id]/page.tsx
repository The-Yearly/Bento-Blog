"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ActivityType } from "@/app/utils/types";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { BlogCard } from "./components/blogCard";
export default function IndividualBlogPage() {
  const [blog, setBlog] = useState<ActivityType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const router = useRouter();

  const blogId = params?.id;

  useEffect(() => {
    const fetchBlogPost = async () => {
      if (!blogId) {
        setError("Blog ID not found");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/getPosts/Blog/${blogId}`,
        );
        setBlog(res.data.data[0]);
        setError(null);
      } catch (err) {
        console.error("Error fetching blog post:", err);
        setError("Failed to load blog post");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [blogId]);

  const handleGoBack = () => {
    router.back();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading blog post...</div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <div className="text-red-500 text-lg">
          {error || "Blog post not found"}
        </div>
        <button
          onClick={handleGoBack}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Go Back
        </button>
      </div>
    );
  }
  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to posts
            </button>
          </motion.div>
        </motion.div>
        <BlogCard blog={blog} />
      </div>
    </div>
  );
}