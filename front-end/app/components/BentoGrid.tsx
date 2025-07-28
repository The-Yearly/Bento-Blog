import { ActivityType } from "../utils/types";
import Image from "next/image";
import { Heart } from "lucide-react";
import Link from "next/link";
const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return "just now";
};
const getBiteBg = (uid: number) => {
  const colors = [
    "bg-gradient-to-br from-purple-500 to-pink-500",
    "bg-gradient-to-br from-blue-500 to-cyan-500",
    "bg-gradient-to-br from-green-500 to-teal-500",
    "bg-gradient-to-br from-orange-500 to-red-500",
    "bg-gradient-to-br from-indigo-500 to-purple-500",
    "bg-gradient-to-br from-yellow-500 to-orange-500",
    "bg-gradient-to-br from-pink-500 to-rose-500",
    "bg-gradient-to-br from-cyan-500 to-blue-500",
  ];
  return colors[uid % colors.length];
};

export const BentoCard = ({ activity }: { activity: ActivityType }) => {
  try {
    if (activity.content !== "Bite") {
      
      return (
        <Link
          href={"/" + activity.content.toLowerCase() + "/" + activity.cont_id}
        >
          <div className="w-full h-full">
            <Image
              src={activity.image || "/placeholder.svg"}
              alt={"Activity Image"}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              width={800}
              height={500}
            />
            <>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="text-md md:text-2xl font-bold line-clamp-2 mb-1">
                  {activity.title}
                </h3>
                <div className="flex flex-col text-md opacity-90">
                  <p>
                    {new Date(activity.time || "").toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <div className="flex items-center">
                    <p className="text-xs">
                      {formatTime(activity?.time || new Date().toISOString())}
                    </p>
                    <span className="flex ml-2 items-center">
                      <Heart className="w-3 h-3 mx-1 stroke-white hover:stroke-red-400 hover:fill-pink-400 transition-all duration-300" />
                      <p className="text-xs">{activity.likes}</p>
                    </span>
                  </div>
                </div>
              </div>
            </>
          </div>
        </Link>
      );
    } else {
      return (
        <Link
          href={"/" + activity.content.toLowerCase() + "/" + activity.cont_id}
        >
          <div
            className={`relative w-full h-full overflow-hidden ${getBiteBg(activity.cont_id || 0)} p-4 flex flex-col justify-between`}
          >
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-semibold">
                <Image alt="user" width={300} height={300} src={activity.User?.image||"/placeholder.svg"} className="w-full h-full rounded-2xl border-0"/>
              </div>
            </div>

            <div className="flex-1 flex items-center">
              <p
                className={`text-white text-sm md:text-lg font-medium leading-relaxed`}
              >
                {activity.desc}
              </p>
            </div>

            <div className="flex items-center justify-between mt-3 text-white/80">
              <div className="flex space-x-4 text-sm">
                <span className="flex items-center">
                  <Heart className="w-4 h-4 mx-1 stroke-white hover:stroke-red-400 hover:fill-pink-400 transition-all duration-300" />
                  {activity.likes}
                </span>
              </div>
            </div>
          </div>
        </Link>
      );
    }
  } catch {
    return <></>;
  }
};

export const BentoBox = ({ contents }: { contents: ActivityType[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-6xl mx-auto p-4">
      {contents.map((content, i) => {
        const elements = [];
        const bento = (i + 1) % 5;
        if (bento === 1) {
          elements.push(
            <div
              key={i}
              className="md:col-span-3 aspect-[18/12] relative group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            >
              <div className="aspect-[18/12] relative overflow-hidden>">
                <BentoCard activity={content} />
              </div>
            </div>,
          );
        } else if (bento === 2) {
          elements.push(
            <div key={i} className="space-y-3">
              {[i, i + 1].map((j) => {
                const item = contents[j];
                return (
                  <div
                    key={j}
                    className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                  >
                    <div className="aspect-square relative overflow-hidden>">
                      <BentoCard activity={item} />
                    </div>
                  </div>
                );
              })}
            </div>,
          );
        } else if (bento === 4) {
          elements.push(
            <div key={i} className="md:col-span-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[i, i + 1].map((j) => {
                  const item = contents[j];
                  return (
                    <div
                      key={j}
                      className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                    >
                      <div className="relative overflow-hidden aspect-[16/9]">
                        <BentoCard activity={item} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>,
          );
        }

        return elements;
      })}
    </div>
  );
};
