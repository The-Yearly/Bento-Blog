"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ActivityType } from "../utils/types";
import axios from "axios";
import Cookies from "js-cookie";
export default function AdminPage() {
  const [activities, setActivities] = useState<ActivityType[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [wait, setWait] = useState(true);
  const credsString = Cookies.get("creds");
  const creds = JSON.parse(credsString || "{}");
  const [model, setModel] = useState(false);
  const [deleteContId, setDeleteContId] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      setWait(true);
      const res = await axios.get(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/getRecentActivity",
      );
      setActivities(res.data.data || []);
      setWait(false);
    };
    fetchData();
  }, []);
  const deleteActivity = async () => {
    if (deleteContId != 0) {
      const res = axios.post(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/delete/" + deleteContId,
        creds,
      );
      setActivities(
        activities.filter((activity) => activity.cont_id !== deleteContId),
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

                    <h3 className="m-0 mb-2 text-neutral-600 text-xl font-semibold line-clamp-2">
                      {activity.title}
                    </h3>
                    {activity.desc && (
                      <div
                        className="m-0 mb-2.5 text-gray-600 leading-relaxed line-clamp-3"
                        dangerouslySetInnerHTML={{ __html: activity.desc }}
                      />
                    )}

                    <div className="flex flex-wrap gap-1 mb-2.5">
                      {activity.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-xl text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                      {activity.tags.length > 3 && (
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded-xl text-xs">
                          +{activity.tags.length - 3} more
                        </span>
                      )}
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
                    onClick={() => {
                      setModel(true);
                      activity.cont_id && setDeleteContId(activity.cont_id);
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
          {model && (
            <div className="bg-black/60 fixed top-0 left-0 min-h-screen w-full z-50 flex items-center justify-center">
              <div className="h-36 w-96 bg-white rounded-lg shadow-lg p-5">
                <h2 className="text-lg text-neutral-600 font-semibold mb-4">
                  Are you sure you want to delete this item?
                </h2>
                <div className="flex justify-end gap-3">
                  <button
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                    onClick={() => setModel(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => {
                      setModel(false);
                      deleteActivity();
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>Loading</div>
      )}
    </>
  );
}
