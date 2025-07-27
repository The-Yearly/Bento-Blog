"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { ActivityType } from "@/app/utils/types";
export default function EditBitePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const [formData, setFormData] = useState<ActivityType>({
    title: "",
    desc: "",
    fav: false,
    likes: 0,
    image: "",
    uid: 0,
    cont_id: 0,
    content: "Bite",
    tags: [],
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadData = async () => {
      const res = await axios.get(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/getPosts/Bite/" + id,
      );

      setFormData(res.data.data[0]);
      console.log(res.data.data[0]);
      setLoading(false);
    };

    loadData();
  }, [params.id]);

  const handleSubmit =async(e: React.FormEvent) => {
    e.preventDefault();
    console.log("Bite updated:", formData);
    const res=await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL+"/update",formData)
    alert("Bite updated successfully!");
    router.push("/admin");
  };

  return (
    <>
      {!loading ? (
        <div className="p-5 max-w-2xl mx-auto">
          <div className="mb-8">
            <Link href="/admin" className="text-blue-600 no-underline">
              ← Back to Admin
            </Link>
            <h1 className="text-3xl font-bold my-2.5">Edit Bite</h1>
            <p className="text-gray-600 m-0">Update your quick thought</p>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-5">
            <div>
              <label className="block mb-1 font-medium">
                What's on your mind? *
              </label>
              <textarea
                value={formData.desc}
                onChange={(e) =>
                  setFormData({ ...formData, desc: e.target.value })
                }
                required
                rows={4}
                maxLength={120}
                placeholder="Share your thoughts... (max 280 characters)"
                className="w-full p-3 border border-gray-300 rounded text-base resize-y"
              />
              <div className="text-right text-sm text-gray-600 mt-1">
                {formData.desc.length}/120
              </div>
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
                placeholder="thoughts, programming, life"
                className="w-full p-3 border border-gray-300 rounded text-base"
              />
            </div>

            <div className="flex gap-2.5 pt-5">
              <button
                type="submit"
                className="px-6 py-3 bg-emerald-600 text-white border-none rounded text-base cursor-pointer hover:bg-emerald-700"
              >
                Update Bite
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
      ) : (
        <div className="p-5 text-center">
          <p>Loading...</p>
        </div>
      )}
    </>
  );
}
