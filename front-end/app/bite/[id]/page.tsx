"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ActivityType } from "@/app/utils/types";
import axios from "axios";
import { ArrowLeft, Calendar, Heart, Tag, User } from "lucide-react";
import { motion } from "framer-motion";

export default function IndividualBitePage() {
  const [bite, setBite] = useState<ActivityType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const getBiteBg = (uid: number) => {
    const colors = [
      "bg-gradient-to-br from-purple-500 to-pink-500",
      "bg-gradient-to-br from-blue-500 to-cyan-500",
      "bg-gradient-to-br from-green-500 to-teal-500",
      "bg-gradient-to-br from-orange-500 to-red-500",
      "bg-gradient-to-br from-indigo-500 to-purple-500",
      "bg-gradient-to-br from-yellow-500 to-orange-500",
      "bg-gradient-to-br from-pink-500 to-rose-500",
      "bg-gradient-to-br from-cyan-500 to-blue-500",
    ];
    console.log(uid % colors.length);
    return colors[uid % colors.length];
  };

  const params = useParams();
  const router = useRouter();

  const biteId = params?.id;

  useEffect(() => {
    const fetchBite = async () => {
      if (!biteId) {
        setError("Bite ID not found");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/getPosts/Bite/${biteId}`,
        );
        setBite(response.data.data[0]);
        setError(null);
      } catch (err) {
        console.error("Error fetching bite:", err);
        setError("Failed to load bite");
      } finally {
        setLoading(false);
      }
    };

    fetchBite();
  }, [biteId]);

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
        <div className="text-lg">Loading bite...</div>
      </div>
    );
  }

  if (error || !bite) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <div className="text-red-500 text-lg">{error || "Bite not found"}</div>
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
            Back to bites
          </button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`${getBiteBg(bite.cont_id || 0)} rounded-xl shadow-lg overflow-hidden`}
        >
          <div className="p-6 md:p-8">
            <div className="flex justify-between items-start mb-6">
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight flex-1 mr-4"
              >
                {bite.title}
              </motion.h1>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center gap-6 mb-6 text-whtie border-b border-gray-200 pb-6"
            >
              {bite.time && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(bite.time)}</span>
                </div>
              )}

              {bite.user && (
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{bite.user.name}</span>
                </div>
              )}

              {bite.likes !== undefined && (
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  <span>{bite.likes} likes</span>
                </div>
              )}
            </motion.div>
            {bite.desc && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mb-8"
              >
                <h2 className="text-xl font-semibold text-white mb-4">
                  Description
                </h2>
                <p className="text-lg text-white leading-relaxed">
                  {bite.desc}
                </p>
              </motion.div>
            )}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mb-8"
            >
              <h2 className="text-xl font-semibold text-white mb-4">Content</h2>
              <div
                className="prose prose-lg max-w-none text-white leading-relaxed"
                dangerouslySetInnerHTML={{ __html: bite.content }}
              />
            </motion.div>
            {bite.tags && bite.tags.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="mb-8 border-t border-gray-200 pt-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="w-5 h-5 text-white" />
                  <span className="text-lg font-semibold text-white">Tags</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {bite.tags.map((tag, index) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.3,
                        delay: 0.7 + index * 0.1,
                      }}
                      className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors cursor-pointer"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}
            {bite.user && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="border-t border-gray-200 pt-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  About the Author
                </h3>
                <div className="flex items-center gap-4">
                  {bite.user.image && (
                    <img
                      src={bite.user.image || "/placeholder.svg"}
                      alt={bite.user.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <div className="text-lg font-semibold text-gray-900">
                      {bite.user.name}
                    </div>
                    <div className="text-gray-600">Content Creator</div>
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
