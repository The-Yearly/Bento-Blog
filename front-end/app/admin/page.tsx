"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ActivityType } from "../utils/types";
import axios from "axios";

export default function AdminPage() {
  const [activities, setActivities] = useState<ActivityType[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [wait, setWait] = useState(true);
  const [model,setModel]=useState(true)
  useEffect(() => {
    const fetchData = async () => {
      setWait(true);
      const res = await axios.get(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/getRecentActivity",
      );
      setActivities(res.data.data);
      setWait(false);
    };
    fetchData();
  }, []);

  const deleteActivity = (cont_id: number) => {
    if (confirm("Are you sure you want to delete this item?")) {
      setActivities(
        activities.filter((activity) => activity.cont_id !== cont_id),
      );
    }
  };

  const filteredActivities = activities.filter((activity) => {
    const matchesFilter =
      filter === "all" || activity.content.toLowerCase() === filter;
    const matchesSearch =
      searchQuery === "" ||
      (activity?.title &&
        activity.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (activity?.desc &&
        activity.desc.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (Array.isArray(activity?.tags) &&
        activity.tags.some(
          (tag) => tag && tag.toLowerCase().includes(searchQuery.toLowerCase()),
        ));

    return matchesFilter && matchesSearch;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  return (
    <>
      {!wait ? (
        <div className="p-5 max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold m-0">Dashboard</h1>
            <div className="flex gap-2.5">
              <Link
                href="/admin/add/blog"
                className="px-5 py-2.5 bg-blue-600 text-white no-underline rounded text-sm hover:bg-blue-700"
              >
                Add Blog
              </Link>
              <Link
                href="/admin/add/bite"
                className="px-5 py-2.5 bg-emerald-600 text-white no-underline rounded text-sm hover:bg-emerald-700"
              >
                Add Bite
              </Link>
              <Link
                href="/admin/add/image"
                className="px-5 py-2.5 bg-amber-500 text-white no-underline rounded text-sm hover:bg-amber-600"
              >
                Add Image
              </Link>
            </div>
          </div>

          <div className="mb-5">
            <label className="mr-2.5 font-medium">Filter by type:</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-2 bg-neutral-900 border border-gray-300 rounded text-sm"
            >
              <option value="all">All</option>
              <option value="blog">Blog</option>
              <option value="bite">Bite</option>
              <option value="image">Image</option>
            </select>
          </div>

          <div className="mb-5">
            <label className="mr-2.5 font-medium">Search:</label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, description, or tags..."
              className="px-3 py-2 border border-gray-300 rounded text-sm w-80"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="ml-2 px-3 py-2 bg-gray-100 text-gray-600 border border-gray-300 rounded text-sm hover:bg-gray-200"
              >
                Clear
              </button>
            )}
          </div>

          <div className="grid gap-5">
            {filteredActivities.map((activity) => (
              <div
                key={activity.cont_id}
                className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2.5 mb-2">
                      <span
                        className={`px-2 py-1 rounded-xl text-xs font-medium ${
                          activity.content === "Blog"
                            ? "bg-blue-100 text-blue-800"
                            : activity.content === "Bite"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {activity.content}
                      </span>
                      {activity.fav && (
                        <span className="text-amber-500">⭐</span>
                      )}
                    </div>
                    <h3 className="m-0 mb-2 text-neutral-600 text-xl font-semibold">
                      {activity.title}
                    </h3>
                    {activity.desc && (
                      <p className="m-0 mb-2.5 text-gray-600 leading-relaxed">
                        {activity.desc.length > 150
                          ? `${activity.desc.substring(0, 150)}...`
                          : activity.desc}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-1 mb-2.5">
                      {activity.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-xl text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <div className="text-sm text-gray-500">
                      {activity.time && formatDate(activity.time)} •{" "}
                      {activity.likes} likes
                    </div>
                  </div>

                  {activity.image && (
                    <div className="ml-5">
                      <img
                        src={activity.image || "/placeholder.svg"}
                        alt={activity.title}
                        className="w-30 h-20 object-cover rounded"
                      />
                    </div>
                  )}
                </div>

                <div className="flex gap-2.5 pt-4 border-t border-gray-100">
                  <Link
                    href={`/admin/edit/${activity.content.toLowerCase()}/${activity.cont_id}`}
                    className="px-3 py-1.5 bg-gray-100 text-gray-700 no-underline rounded text-sm border-none cursor-pointer hover:bg-gray-200"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() =>{
                      // activity.cont_id && deleteActivity(activity.cont_id)
                      setModel(true)
                    }}
                    className="px-3 py-1.5 bg-red-100 text-red-600 border-none rounded text-sm cursor-pointer hover:bg-red-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredActivities.length === 0 && (
            <div className="text-center py-10 text-gray-600 text-base">
              No {filter === "all" ? "" : filter} posts found
              {searchQuery && ` matching "${searchQuery}"`}.
            </div>
          )}
        </div>
      ) : (
        <div>Loading</div>
      )}
      {model&&
        <div className="bg-black/50 min-h-screen w-full flex items-center justify-center">
          <div className="w-full h-full"/>
          <div className="h-[32vh] w-[48vh] bg-white">

          </div>
        </div>
      }
    </>
  );
}
