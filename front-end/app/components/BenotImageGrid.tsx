import Image from "next/image";
import { ActivityType } from "../utils/types";
import { Heart } from "lucide-react";
import { BentoCard } from "./BentoGrid";
const getTime = (date: string) => {
  const datetime = new Date(date);
  const full = new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
  }).format(datetime);
  return full;
};
const BentoImageCard = ({ activity }: { activity: ActivityType }) => {
  try {
    return (
      <>
        {activity.content != "Bite" ? (
          <div className="relative w-full h-full overflow-hidden rounded-lg group cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300">
            <Image
              src={`https://picsum.photos/800/500?random=${activity.cont_id}`}
              alt={activity.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
              width={800}
              height={500}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <div className="font-bold text-lg leading-tight line-clamp-2 mb-1 group-hover:text-white/90 transition-colors duration-200">
                {activity.title}
              </div>
              <div className="flex items-center">
                <p className="text-sm text-white/80 font-medium">
                  {getTime(activity.time)}
                </p>
                <span className="flex ml-2 items-center">
                  <Heart className="w-3 h-3 mx-1 stroke-white hover:stroke-red-400 hover:fill-pink-400 transition-all duration-300" />
                  <p className="text-xs">{activity.likes}</p>
                </span>
              </div>
            </div>
            <div className="absolute inset-0 rounded-lg ring-2 ring-white/0 group-hover:ring-white/20 transition-all duration-300" />
          </div>
        ) : (
          <BentoCard activity={activity} />
        )}
      </>
    );
  } catch {
    return <></>;
  }
};
export default function BentoImageGrid({
  contents,
}: {
  contents: ActivityType[];
}) {
  const safeGetCapture = (index: number) => {
    return index < contents.length ? contents[index] : null;
  };
  const CardVarients = {
    Blog: BentoImageCard,
    Image: BentoImageCard,
    Bite: BentoCard,
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
                      {/* {(() => {
  const SelectedCard = CardVarients[content.content as keyof typeof CardVarients];
  return <SelectedCard activity={content}/>;
})()} */}
                      <BentoImageCard activity={content} />
                    </div>
                    {secondCapture && (
                      <div className="aspect-[10/16]">
                        <BentoImageCard activity={secondCapture} />
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
                        <BentoImageCard activity={content} />
                      </div>
                      {capture1 && (
                        <div className="aspect-[12/10] w-full">
                          <BentoImageCard activity={capture1} />
                        </div>
                      )}
                    </div>
                    {capture4 && (
                      <div className="aspect-[18/15]">
                        <BentoImageCard activity={capture4} />
                      </div>
                    )}
                    {(capture6 || capture7) && (
                      <div className="flex relative gap-x-1">
                        {capture6 && (
                          <div className="absolute aspect-[20/11] w-[60%]">
                            <BentoImageCard activity={capture6} />
                          </div>
                        )}
                        {capture7 && (
                          <div className="md:left-[51%] lg:left-[54%] ml-10 aspect-[20/7] relative w-[98%]">
                            <BentoImageCard activity={capture7} />
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
                        <BentoImageCard activity={content} />
                      </div>
                      {capture4 && (
                        <div className="aspect-[19/14]">
                          <BentoImageCard activity={capture4} />
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
export const MobileBentoBox = ({ contents }: { contents: ActivityType[] }) => {
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
                        <BentoImageCard activity={item} />
                      </div>
                    );
                  })}
                </div>,
              );
            }

            if (capI === 3) {
              elements.push(
                <div key={i} className="w-full z-10 aspect-[60/117]">
                  <BentoImageCard activity={capture} />
                </div>,
              );
            }

            if (capI === 0) {
              elements.push(
                <div key={i} className="col-span-2 aspect-[2/1] max-w-md">
                  <BentoImageCard activity={capture} />
                </div>,
              );
            }

            return elements;
          })}
        </div>
      </div>
    </>
  );
};
