"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ActivityType } from "@/app/utils/types";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";
export default function AddBitePage() {
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
    content: "Bite",
    tags: [],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await axios.post(
      process.env.NEXT_PUBLIC_BACKEND_URL + "/post/" + creds.session,
      formData,
    );
    console.log("New bite created:", formData);
    alert("Bite created successfully!");
    router.push("/admin");
  };

  return (
    <div className="p-5 max-w-2xl mx-auto">
      <div className="mb-8">
        <Link href="/admin" className="text-blue-600 no-underline">
          ← Back to Admin
        </Link>
        <h1 className="text-3xl font-bold my-2.5">Add New Bite</h1>
        <p className="text-gray-600 m-0">Share a quick thought or update</p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-5">
        <div>
          <label className="block mb-1 font-medium">
            What's on your mind? *
          </label>
          <textarea
            value={formData.desc}
            onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
            required
            rows={4}
            maxLength={120}
            placeholder="Share your thoughts... (max 120 characters)"
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
            Post Bite
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
