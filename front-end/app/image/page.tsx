"use client";
import BentoImageGrid, { MobileBentoBox } from "../components/BenotImageGrid";
import { useState, useEffect, useMemo } from "react";
import type { ActivityType } from "../utils/types";
import axios from "axios";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Captures() {
  const [captures, setCaptures] = useState<ActivityType[]>([]);
  const [wait, setWait] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showAllTags, setShowAllTags] = useState(false);

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
        process.env.NEXT_PUBLIC_BACKEND_URL + "/getPosts/Image",
      );
      setCaptures(res.data.data || []);
      setWait(false);
    };
    fetchData();
  }, []);

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    captures.forEach((capture) => {
      if (capture.tags && Array.isArray(capture.tags)) {
        capture.tags.forEach((tag: string) => tagSet.add(tag));
      }
    });
    return Array.from(tagSet);
  }, [captures]);

  const visibleTags = useMemo(() => {
    return showAllTags ? allTags : allTags.slice(0, 5);
  }, [allTags, showAllTags]);

  const hiddenTags = useMemo(() => {
    return allTags.slice(5);
  }, [allTags]);

  const filteredCaptures = useMemo(() => {
    return captures.filter((capture) => {
      const matchesSearch =
        searchTerm === "" ||
        capture.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        capture.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        capture.desc?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesTags =
        selectedTags.length === 0 ||
        (capture.tags &&
          selectedTags.some((tag) => capture.tags.includes(tag)));

      return matchesSearch && matchesTags;
    });
  }, [captures, searchTerm, selectedTags]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedTags([]);
  };

  const toggleShowAllTags = () => {
    setShowAllTags(!showAllTags);
  };

  if (wait) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }
  if (captures.length != 0) {
    return (
      <div className="mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search captures..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <Search />
              </div>
            </div>

            {allTags.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-700">
                    Filter by tags:
                  </h3>
                  {(selectedTags.length > 0 || searchTerm) && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      Clear all filters
                    </button>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {visibleTags.slice(0, 5).map((tag) => (
                      <button
                        key={tag}
                        onClick={() => handleTagToggle(tag)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                          selectedTags.includes(tag)
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                  <AnimatePresence>
                    {showAllTags && hiddenTags.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <motion.div
                          initial={{ y: -10 }}
                          animate={{ y: 0 }}
                          exit={{ y: -10 }}
                          transition={{ duration: 0.2, delay: 0.1 }}
                          className="flex flex-wrap gap-2"
                        >
                          {hiddenTags.map((tag, index) => (
                            <motion.button
                              key={tag}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              transition={{
                                duration: 0.2,
                                delay: index * 0.05,
                                ease: "easeOut",
                              }}
                              onClick={() => handleTagToggle(tag)}
                              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                                selectedTags.includes(tag)
                                  ? "bg-blue-600 text-white"
                                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                              }`}
                            >
                              {tag}
                            </motion.button>
                          ))}
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {allTags.length > 5 && (
                    <motion.button
                      onClick={toggleShowAllTags}
                      className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {showAllTags ? (
                        <>
                          <span>Show less tags</span>
                          <motion.div
                            animate={{ rotate: showAllTags ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronUp className="w-4 h-4" />
                          </motion.div>
                        </>
                      ) : (
                        <>
                          <span>Show {hiddenTags.length} more tags</span>
                          <motion.div
                            animate={{ rotate: showAllTags ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown className="w-4 h-4" />
                          </motion.div>
                        </>
                      )}
                    </motion.button>
                  )}
                </div>
              </div>
            )}

            <div className="text-sm text-gray-600">
              Showing {filteredCaptures.length} of {captures.length} captures
              {(searchTerm || selectedTags.length > 0) && (
                <span className="ml-2">
                  {searchTerm && `matching "${searchTerm}"`}
                  {searchTerm && selectedTags.length > 0 && " and "}
                  {selectedTags.length > 0 &&
                    `tagged with ${selectedTags.join(", ")}`}
                </span>
              )}
            </div>
          </div>

          {filteredCaptures.length > 0 ? (
            !isMobile ? (
              <BentoImageGrid contents={filteredCaptures} />
            ) : (
              <MobileBentoBox contents={filteredCaptures} />
            )
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg mb-2">
                No captures found
              </div>
              <div className="text-gray-400 text-sm">
                Try adjusting your search terms or selected tags
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
