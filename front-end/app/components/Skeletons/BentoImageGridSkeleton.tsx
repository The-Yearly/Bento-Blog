import Image from "next/image";
import { ActivityType } from "@/app/utils/types";
import { Heart } from "lucide-react";
import Link from "next/link";

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

export const SkeletonBentoCard = ({ activity }: { activity: ActivityType }) => {
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
                    <p className="text-xs">00-00-0000</p>
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
                <Image
                  alt="user"
                  width={300}
                  height={300}
                  src={activity.User?.image || "/placeholder.svg"}
                  className="w-full h-full rounded-2xl border-0"
                />
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

const getTime = (date: string) => {
  const datetime = new Date(date);
  const full = new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
  }).format(datetime);
  return full;
};
const SkeletonBentoImageCard = () => {
  try {
    return (
      <>
        <div className="relative w-full h-full overflow-hidden rounded-lg group cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300">
          <Image
            src={"/placeholder.svg"}
            alt={"skeleton"}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
            width={800}
            height={500}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <div className="font-bold text-lg leading-tight line-clamp-2 mb-1 group-hover:text-white/90 transition-colors duration-200"></div>
            <div className="flex items-center">
              <p className="text-sm text-white/80 font-medium"></p>
              <span className="flex ml-2 items-center">
                <Heart className="w-3 h-3 mx-1 stroke-white hover:stroke-red-400 hover:fill-pink-400 transition-all duration-300" />
                <p className="text-xs"></p>
              </span>
            </div>
          </div>
          <div className="absolute inset-0 rounded-lg ring-2 ring-white/0 group-hover:ring-white/20 transition-all duration-300" />
        </div>
      </>
    );
  } catch {
    return <></>;
  }
};

export default function SkeletonBentoImageGrid({
  contents,
}: {
  contents: number[];
}) {
  const safeGetCapture = (index: number) => {
    return index < contents.length ? contents[index] : null;
  };
  return (
    <div>
      <div className="mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto overflow-hidden rounded-xl">
          <div className="grid mt-2 grid-cols-1 gap-x-1 md:grid-cols-4">
            {contents.map((content, i) => {
              const bite = (i + 1) % 9;
              const elements = [];
              if (bite === 1) {
                const secondCapture = safeGetCapture(i + 4);
                elements.push(
                  <div
                    className="flex mt-2 gap-y-2 flex-col col-span-1"
                    key={`bite-${i}`}
                  >
                    <div className="aspect-[10/16]">
                      <SkeletonBentoImageCard />
                    </div>
                    {secondCapture && (
                      <div className="aspect-[10/16]">
                        <SkeletonBentoImageCard />
                      </div>
                    )}
                  </div>,
                );
              } else if (bite === 2) {
                const capture1 = safeGetCapture(i + 1);
                const capture4 = safeGetCapture(i + 4);
                const capture6 = safeGetCapture(i + 6);
                const capture7 = safeGetCapture(i + 7);
                elements.push(
                  <div
                    className="col-span-2 mt-2 flex gap-y-2 flex-col"
                    key={`bite-${i}`}
                  >
                    <div className="flex gap-x-1">
                      <div className="aspect-[12/10] w-full">
                        <SkeletonBentoImageCard />
                      </div>
                      {capture1 && (
                        <div className="aspect-[12/10] w-full">
                          <SkeletonBentoImageCard />
                        </div>
                      )}
                    </div>
                    {capture4 && (
                      <div className="aspect-[18/15]">
                        <SkeletonBentoImageCard />
                      </div>
                    )}
                    {(capture6 || capture7) && (
                      <div className="flex relative gap-x-1">
                        {capture6 && (
                          <div className="absolute aspect-[20/11] w-[60%]">
                            <SkeletonBentoImageCard />
                          </div>
                        )}
                        {capture7 && (
                          <div className="md:left-[51%] lg:left-[54%] ml-10 aspect-[20/7] relative w-[98%]">
                            <SkeletonBentoImageCard />
                          </div>
                        )}
                      </div>
                    )}
                  </div>,
                );
              } else if (bite === 4) {
                const capture4 = safeGetCapture(i + 4);
                elements.push(
                  <div className="col-span-1 mt-2" key={`bite-${i}`}>
                    <div className="flex flex-col gap-y-2">
                      <div className="aspect-[9/16]">
                        <SkeletonBentoImageCard />
                      </div>
                      {capture4 && (
                        <div className="aspect-[19/14]">
                          <SkeletonBentoImageCard />
                        </div>
                      )}
                    </div>
                  </div>,
                );
              }

              return elements;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
export const SkeletonMobileBentoBox = ({
  contents,
}: {
  contents: ActivityType[];
}) => {
  if (contents) {
    return (
      <>
        <div className="min-h-screen w-full flex justify-center p-4">
          <div className="grid grid-cols-2 gap-2 w-full max-w-md overflow-hidden items-stretch">
            {contents.map((capture, i) => {
              const capI = (i + 1) % 4;
              const elements = [];

              if (capI === 1) {
                elements.push(
                  <div key={i} className="flex flex-col w-full h-full gap-y-2">
                    {[i, i + 1].map((j) => {
                      const item = contents[j];
                      if (!item) return null;

                      return (
                        <div key={j} className="aspect-square flex-1">
                          <SkeletonBentoImageCard />
                        </div>
                      );
                    })}
                  </div>,
                );
              }

              if (capI === 3) {
                elements.push(
                  <div key={i} className="w-full z-10 aspect-[60/117]">
                    <SkeletonBentoImageCard />
                  </div>,
                );
              }

              if (capI === 0) {
                elements.push(
                  <div
                    key={i}
                    className="col-span-2 aspect-[2/1] max-w-md"
                  ></div>,
                );
              }

              return elements;
            })}
          </div>
        </div>
      </>
    );
  }
};
