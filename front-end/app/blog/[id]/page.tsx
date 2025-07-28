"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ActivityType } from "@/app/utils/types";
import axios from "axios";
import { ArrowLeft, Calendar, Heart, Tag, User } from "lucide-react";
import { motion } from "framer-motion";

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

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
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
          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to posts
          </button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="w-full h-64 md:h-80 lg:h-96 overflow-hidden">
            <img
              src={blog.image || "/placeholder.svg"}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-6 md:p-8 lg:p-12">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight"
            >
              {blog.title}
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-6 mb-8 text-gray-600"
            >
              {blog.time && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(blog.time)}</span>
                </div>
              )}

              {blog.User && (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{blog.User.name}</span>
                </div>
              )}

              {blog.likes !== undefined && (
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  <p>{blog.likes} likes</p>
                </div>
              )}
            </motion.div>

            {blog.tags && blog.tags.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mb-8"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-600">
                    Tags
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag, i) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.3,
                        delay: 0.5 + i * 0.1,
                      }}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="prose prose-lg max-w-none"
            >
              <div
                className="text-gray-800 text-xl leading-relaxed"
                dangerouslySetInnerHTML={{ __html: blog.desc }}
              />
            </motion.div>
            {blog.User && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="mt-12 pt-8 border-t border-gray-200"
              >
                <div className="flex items-center gap-4">
                  {blog.User.image && (
                    <img
                      src={blog.User.image || "/placeholder.svg"}
                      alt={blog.User.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <div className="font-semibold text-gray-900">
                      {blog.User.name}
                    </div>
                    <div className="text-gray-600 text-sm">Author</div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
