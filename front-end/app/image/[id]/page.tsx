"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ActivityType } from "@/app/utils/types";
import axios from "axios";
import {
  ArrowLeft,
  X,
  Calendar,
  Heart,
  Tag,
  User,
  ZoomIn,
  ZoomOut,
  Eye,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function IndividualImagePage() {
  const [image, setImage] = useState<ActivityType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const params = useParams();
  const router = useRouter();

  const imageId = params?.id;

  useEffect(() => {
    const fetchImage = async () => {
      if (!imageId) {
        setError("Image ID not found");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/getPosts/Image/${imageId}`,
        );
        setImage(response.data.data[0]);
        setError(null);
      } catch (err) {
        console.error("Error fetching image:", err);
        setError("Failed to load image");
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [imageId]);

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

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading image...</div>
      </div>
    );
  }

  if (error || !image) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
        <div className="text-red-500 text-lg">{error || "Image not found"}</div>
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
      <div className="max-w-6xl mx-auto px-4 py-8">
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
            Back to Captures
          </button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative bg-black/50 backdrop-blur-2xl">
                <motion.img
                  src={image.image || "/placeholder.svg"}
                  alt={image.title}
                  className={`w-full transition-transform duration-300 cursor-pointer ${
                    isZoomed ? "scale-150 origin-center" : "scale-100"
                  }`}
                  style={{
                    maxHeight: isZoomed ? "none" : "70vh",
                    objectFit: "contain",
                  }}
                  onClick={toggleZoom}
                  onLoad={() => setImageLoaded(true)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: imageLoaded ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={toggleZoom}
                    className="p-2 bg-black bg-opacity-50 text-white rounded-lg hover:bg-opacity-70 transition-all"
                    title={isZoomed ? "Zoom out" : "Zoom in"}
                  >
                    {isZoomed ? (
                      <ZoomOut className="w-4 h-4" />
                    ) : (
                      <ZoomIn className="w-4 h-4" />
                    )}
                  </button>
                </div>
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-lg">Loading image...</div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight"
              >
                {image.title}
              </motion.h1>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="space-y-3 text-gray-600"
              >
                {image.time && (
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(image.time)}</span>
                  </div>
                )}

                {image.User && (
                  <div className="flex items-center gap-3">
                    <User className="w-4 h-4" />
                    <span>{image.User.name}</span>
                  </div>
                )}

                {image.likes !== undefined && (
                  <div className="flex items-center gap-3">
                    <Heart className="w-4 h-4" />
                    <span>{image.likes} likes</span>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <Eye className="w-4 h-4" />
                  <span>ID: {image.cont_id}</span>
                </div>
              </motion.div>

              {image.desc && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="border-t pt-6"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Description
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{image.desc}</p>
                </motion.div>
              )}
              {image.tags && image.tags.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="border-t pt-6"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="w-4 h-4 text-gray-600" />
                    <span className="text-lg font-semibold text-gray-900">
                      Tags
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {image.tags.map((tag, index) => (
                      <motion.span
                        key={tag}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.3,
                          delay: 0.6 + index * 0.1,
                        }}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}

              {image.User && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="border-t pt-6"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Author
                  </h3>
                  <div className="flex items-center gap-4">
                    {image.User.image && (
                      <img
                        src={image.User.image || "/placeholder.svg"}
                        alt={image.User.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <div className="font-semibold text-gray-900">
                        {image.User.name}
                      </div>
                      <div className="text-gray-600 text-sm">Photographer</div>
                    </div>
                  </div>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="border-t pt-6 space-y-3"
              >
                <button
                  onClick={toggleZoom}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  {isZoomed ? (
                    <ZoomOut className="w-4 h-4" />
                  ) : (
                    <ZoomIn className="w-4 h-4" />
                  )}
                  {isZoomed ? "Zoom Out" : "Zoom In"}
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/55 bg-opacity-90 flex items-center justify-center p-4"
            onClick={toggleZoom}
          >
            <motion.img
              src={image.image || "/placeholder.svg"}
              alt={image.title}
              className="max-w-full max-h-full object-contain cursor-pointer"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3 }}
            />
            <button
              onClick={toggleZoom}
              className="absolute top-4 right-4 p-2 bg-white bg-opacity-20 text-white rounded-lg hover:bg-opacity-30 transition-all"
            >
              <X className="w-6 h-6 text-neutral-800 hover:scale-60 transition-transform duration-300" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
