"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";
import { ActivityType } from "@/app/utils/types";
export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const credsString = Cookies.get("creds");
  const creds = JSON.parse(credsString || "{}");
  const [formData, setFormData] = useState<ActivityType>({
    title: "",
    desc: "",
    fav: false,
    likes: 0,
    image: "",
    time: "",
    uid: creds.session,
    cont_id: 0,
    content: "Bite",
    tags: [],
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadBlogData = async () => {
      const res = await axios.get(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/getPosts/Blog/" + params.id,
      );
      setFormData(res.data.data[0]);
      setLoading(false);
    };

    loadBlogData();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await axios.post(
      process.env.NEXT_PUBLIC_BACKEND_URL + "/update/" + creds.session,
      formData,
    );
    alert("Blog post updated successfully!");
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
    <div className="p-5 max-w-4xl mx-auto">
      <div className="mb-8">
        <Link href="/admin" className="text-blue-600 no-underline">
          ← Back to Admin
        </Link>
        <h1 className="text-3xl font-bold my-2.5">Edit Blog Post</h1>
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
          {formData.image && (
            <div className="mt-2.5">
              <img
                src={formData.image || "/placeholder.svg"}
                alt="Preview"
                className="max-w-xs h-auto rounded border border-gray-200"
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
            Update Blog Post
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
