"use client";

import type React from "react";
import { ActivityType } from "@/app/utils/types";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";

export default function EditImagePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const [formData, setFormData] = useState<ActivityType>({
    title: "",
    desc: "",
    fav: false,
    likes: 0,
    image: "",
    time: "",
    uid: 0,
    cont_id: 0,
    content: "Bite",
    tags: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadImageData = async () => {
      const res = await axios.get(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/getPosts/Image/" + id,
      );
      setFormData(res.data.data[0]);
      setLoading(false);
    };

    loadImageData();
  }, [params.id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedImage = {
      cont_id: formData.cont_id,
      title: formData.title,
      desc: "",
      content: "Image",
      time: new Date().toISOString(),
      likes: formData.likes,
      fav: false,
      tags: formData.tags.map((tag) => tag.trim()).filter((tag) => tag),
      image: formData.image,
      uid: formData.uid,
    };

    console.log("Image updated:", updatedImage);
    alert("Image post updated successfully!");
    router.push("/admin");
  };

  if (loading) {
    return (
      <div className="p-5 text-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-5 max-w-2xl mx-auto">
      <div className="mb-8">
        <Link href="/admin" className="text-blue-600 no-underline">
          ← Back to Admin
        </Link>
        <h1 className="text-3xl font-bold my-2.5">Edit Image Post</h1>
        <p className="text-gray-600 m-0">Update your visual content</p>
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
            Update Image Post
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
