"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ActivityType } from "@/app/utils/types";
import axios from "axios";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import { BlogCard } from "@/app/blog/[id]/components/blogCard";
export default function AddBlogPage() {
  const router = useRouter();
  const credsString = Cookies.get("creds");
  const creds = JSON.parse(credsString || "{}");
  const [formData, setFormData] = useState<ActivityType>({
    title: "",
    desc: "",
    fav: false,
    uid: parseInt(creds.uid || "1"),
    likes: 0,
    image: "",
    content: "Blog",
    tags: [],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/post/" + creds.session,
        formData,
      );
      toast.success("Post created successfully!");
      console.log(res.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          toast.error(
            `Error ${error.response.status}: ${error.response.data.message || "Something went wrong"}`,
          );
        } else if (error.request) {
          toast.error("No response from server. Please try again.");
        } else {
          toast.error("Request error: " + error.message);
        }
      } else {
        toast.error("Unexpected error occurred.");
      }
    }
  };

  return (
    <div className="p-5 max-w-4xl mx-auto">
      <ToastContainer />
      <div className="mb-8">
        <Link href="/admin" className="text-blue-600 no-underline">
          ← Back to Admin
        </Link>
        <h1 className="text-3xl font-bold my-2.5">Add New Blog Post</h1>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-5">
        <div>
          <label className="block mb-1 font-medium">Title *</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
            className="w-full p-3 border border-gray-300 rounded text-base"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description *</label>
          <textarea
            value={formData.desc}
            onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
            required
            rows={6}
            className="w-full p-3 border border-gray-300 rounded text-base resize-y"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Cover Image URL</label>
          <input
            type="url"
            value={formData.image}
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.value })
            }
            placeholder="https://example.com/image.jpg"
            className="w-full p-3 border border-gray-300 rounded text-base"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">
            Tags (comma separated)
          </label>
          <input
            type="text"
            value={formData.tags}
            onChange={(e) =>
              setFormData({ ...formData, tags: e.target.value.split(",") })
            }
            placeholder="web-dev, react, nextjs"
            className="w-full p-3 border border-gray-300 rounded text-base"
          />
        </div>

        <div className="flex items-center gap-2.5">
          <input
            type="checkbox"
            id="fav"
            checked={formData.fav}
            onChange={(e) =>
              setFormData({ ...formData, fav: e.target.checked })
            }
            className="w-4 h-4"
          />
          <label htmlFor="fav" className="font-medium">
            Mark as favorite
          </label>
        </div>

        <div className="flex gap-2.5 pt-5">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white border-none rounded text-base cursor-pointer hover:bg-blue-700"
          >
            Create Blog Post
          </button>
          <Link
            href="/admin"
            className="px-6 py-3 bg-gray-100 text-gray-700 no-underline rounded text-base"
          >
            Cancel
          </Link>
        </div>
      </form>
      <div>
        Preview
        <BlogCard blog={formData} />
      </div>
    </div>
  );
}
