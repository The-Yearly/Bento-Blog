import { ActivityType } from "../utils/types";
import Image from "next/image";
import { Heart } from "lucide-react";
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

const BentoCard = ({
  activity,
  aspectClass,
  textSize,
}: {
  activity: ActivityType;
  aspectClass: string;
  textSize: string;
}) => {
  try {
    if (activity.content === "Blog") {
      console.log(activity.content, "as");
      return (
        <div className={`${aspectClass} relative overflow-hidden`}>
          <Image
            src={`https://picsum.photos/800/500?random=${activity.cont_id}`}
            alt={"Activity Image"}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            width={800}
            height={500}
          />
          {aspectClass.includes("aspect-[18/12]") ? (
            <>
              <div className="absolute hidden md:block inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h2 className="text-sm md:text-3xl font-semibold md:font-bold mb-2 md:line-clamp-2">
                  {activity.title}
                </h2>
                <p className="text-sm opacity-90">
                  {formatTime(activity?.time || new Date().toISOString())}
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="font-semibold text-sm md:text-base line-clamp-2 mb-1">
                  {activity.title}
                </h3>
                <p className="text-xs opacity-80">
                  {formatTime(activity.time)}
                </p>
              </div>
            </>
          )}
        </div>
      );
    } else {
      console.log("HHE", activity.content);
      return (
        <div
          className={`${aspectClass} relative overflow-hidden ${getBiteBg(activity.uid)} p-4 flex flex-col justify-between`}
        >
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-semibold">
              {activity.uid}
            </div>
          </div>

          <div className="flex-1 flex items-center">
            <p className={`text-white ${textSize} font-medium leading-relaxed`}>
              {activity.desc}
            </p>
          </div>

          <div className="flex items-center justify-between mt-3 text-white/80">
            <div className="flex space-x-4 text-sm">
              <span className="flex items-center">
                <Heart className="w-4 h-4 mx-1 stroke-white hover:stroke-pink-300 hover:fill-pink-300 transition-all duration-300" />
                12
              </span>
            </div>
          </div>
        </div>
      );
    }
  } catch {
    return <></>;
  }
};

export const BentoBox = ({
  recentActivityData,
}: {
  recentActivityData: ActivityType[];
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-6xl mx-auto p-4">
      {recentActivityData.map((activity, i) => {
        const elements = [];
        const bento = (i + 1) % 5;
        if (bento === 1) {
          elements.push(
            <div
              key={i}
              className="md:col-span-3 relative group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            >
              <BentoCard
                activity={activity}
                aspectClass="aspect-square md:aspect-[18/12]"
                textSize="text-sm md:text-xl"
              />
            </div>,
          );
        } else if (bento === 2) {
          elements.push(
            <div key="group-2-3" className="space-y-3">
              {[i, i + 1].map((j) => {
                const item = recentActivityData[j];
                return (
                  <div
                    key={j}
                    className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                  >
                    <BentoCard
                      activity={item}
                      aspectClass="aspect-square"
                      textSize="text-xs md:text-sm"
                    />
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
                  const item = recentActivityData[j];
                  return (
                    <div
                      key={j}
                      className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                    >
                      <BentoCard
                        activity={item}
                        aspectClass="aspect-[16/9]"
                        textSize="text-sm md:text-base"
                      />
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
