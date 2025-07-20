import { BlogCardType } from "../utils/types";
import Image from "next/image";
export default function Hero() {
  const blogData: BlogCardType[] = [
    {
      title: "Getting Started with React Hooks",
      Image: "https://picsum.photos/400/250?random=1",
      date: new Date("2024-03-15"),
    },
    {
      title: "The Future of Web Development",
      Image: "https://picsum.photos/400/250?random=2",
      date: new Date("2024-03-10"),
    },
    {
      title: "Understanding TypeScript Interfaces",
      Image: "https://picsum.photos/400/250?random=3",
      date: new Date("2024-03-05"),
    },
    {
      title: "CSS Grid vs Flexbox: When to Use What",
      Image: "https://picsum.photos/400/250?random=4",
      date: new Date("2024-02-28"),
    },
    {
      title: "Building Responsive Layouts in 2024",
      Image: "https://picsum.photos/400/250?random=5",
      date: new Date("2024-02-20"),
    },
    {
      title: "JavaScript Performance Optimization Tips",
      Image: "https://picsum.photos/400/250?random=6",
      date: new Date("2024-02-15"),
    },
    {
      title: "Modern API Design Best Practices",
      Image: "https://picsum.photos/400/250?random=7",
      date: new Date("2024-02-10"),
    },
    {
      title: "State Management in Large React Applications",
      Image: "https://picsum.photos/400/250?random=8",
      date: new Date("2024-02-05"),
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-10 max-w-7xl mx-auto p-4">
      <div className="md:col-span-3 relative group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="aspect-square md:aspect-[16/10] relative overflow-hidden">
          <Image
            src={blogData[0].Image}
            alt={blogData[0].title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            width={800}
            height={500}
          />
        </div>
        <div className="absolute hidden md:block inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h2 className="text-sm md:text-3xl font-semibold md:font-bold mb-2 md:line-clamp-2">
            {blogData[0].title}
          </h2>
          <p className="text-sm opacity-90">
            {blogData[0].date.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {blogData.slice(1, 3).map((blog, index) => (
          <div
            key={index}
            className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
          >
            <div className="aspect-square relative overflow-hidden">
              <Image
                src={blog.Image}
                alt={blog.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                width={300}
                height={300}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <h3 className="font-semibold text-sm md:text-base line-clamp-2 mb-1">
                {blog.title}
              </h3>
              <p className="text-xs opacity-80">
                {blog.date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
