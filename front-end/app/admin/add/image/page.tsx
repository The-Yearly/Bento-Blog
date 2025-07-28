"use client";

import type React from "react";
import { ActivityType } from "@/app/utils/types";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";
export default function AddImagePage() {
  const router = useRouter();
  const credsString = Cookies.get("creds");
  const creds = JSON.parse(credsString || "{}");
  const [formData, setFormData] = useState<ActivityType>({
    title: "",
    desc: "",
    fav: false,
    likes: 0,
    image: "",
    uid: parseInt(creds.uid || "1"),
    content: "Image",
    tags: [],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await axios.post(
      process.env.NEXT_PUBLIC_BACKEND_URL + "/post/" + creds.session,
      formData,
    );
    console.log("New image created:", formData);
    alert("Image post created successfully!");
    router.push("/admin");
  };

  return (
    <div className="p-5 max-w-2xl mx-auto">
      <div className="mb-8">
        <Link href="/admin" className="text-blue-600 no-underline">
          ← Back to Admin
        </Link>
        <h1 className="text-3xl font-bold my-2.5">Add New Image</h1>
        <p className="text-gray-600 m-0">Share a photo or visual content</p>
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
            placeholder="Give your image a title"
            className="w-full p-3 border border-gray-300 rounded text-base"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Image URL *</label>
          <input
            type="url"
            value={formData.image}
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.value })
            }
            required
            placeholder="https://example.com/image.jpg"
            className="w-full p-3 border border-gray-300 rounded text-base"
          />
          {formData.image && (
            <div className="mt-2.5">
              <img
                src={formData.image || "/placeholder.svg"}
                alt="Preview"
                className="max-w-full h-auto rounded border border-gray-200"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
          )}
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
            placeholder="photography, nature, art"
            className="w-full p-3 border border-gray-300 rounded text-base"
          />
        </div>

        <div className="flex gap-2.5 pt-5">
          <button
            type="submit"
            className="px-6 py-3 bg-amber-500 text-white border-none rounded text-base cursor-pointer hover:bg-amber-600"
          >
            Post Image
          </button>
          <Link
            href="/admin"
            className="px-6 py-3 bg-gray-100 text-gray-700 no-underline rounded text-base"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
