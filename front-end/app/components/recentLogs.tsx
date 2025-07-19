import { ActivityType, ContentEnum } from "../utils/types";
import { BentoBox } from "./BentoGrid";

export default function RecentActivity() {
  const recentActivityData: ActivityType[] = [
  {
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop",
    desc: "Just finished an amazing coding session! The feeling when your code finally works is unmatched 🚀",
    uid: 1001,
    content: ContentEnum.Blog,
    title: "Coding Victory!",
    time: "2 hours ago",
    cont_id: 5001
  },
  {
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop",
    desc: "A comprehensive guide to understanding React hooks and their practical applications in modern web development. Learn useState, useEffect, and custom hooks with real-world examples.",
    uid: 1002,
    content: ContentEnum.Blog,
    title: "Mastering React Hooks: A Complete Guide",
    time: "5 hours ago",
    cont_id: 3001
  },
  {
    image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&h=300&fit=crop",
    desc: "Coffee + Code = Perfect Morning ☕️ What's your coding fuel?",
    uid: 1003,
    content: ContentEnum.Bite,
    title: "Morning Fuel",
    time: "8 hours ago",
    cont_id: 5002
  },
  {
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop",
    desc: "Exploring the latest trends in artificial intelligence and machine learning. From neural networks to transformer models, discover what's shaping the future of AI technology.",
    uid: 1004,
    content: ContentEnum.Blog,
    title: "The Future of AI: Trends and Predictions for 2025",
    time: "1 day ago",
    cont_id: 3002
  },
  {
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&h=300&fit=crop",
    desc: "Debugging is like being a detective in a crime movie where you are also the murderer 🕵️‍♂️",
    uid: 1001,
    content: ContentEnum.Bite,
    title: "Detective Mode: ON",
    time: "1 day ago",
    cont_id: 5003
  },
  {
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop",
    desc: "Best practices for building scalable and maintainable applications. Learn about clean architecture, design patterns, and code organization strategies that will make your projects shine.",
    uid: 1005,
    content: ContentEnum.Blog,
    title: "Building Scalable Applications: Best Practices",
    time: "2 days ago",
    cont_id: 3003
  },
  {
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400&h=300&fit=crop",
    desc: "Today I learned that naming variables is harder than solving the actual problem 😅",
    uid: 1006,
    content: ContentEnum.Bite,
    title: "Variable Naming Struggles",
    time: "2 days ago",
    cont_id: 5004
  },
  {
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop",
    desc: "A deep dive into modern web development tools and frameworks. Compare the latest technologies, understand their use cases, and make informed decisions for your next project.",
    uid: 1007,
    content: ContentEnum.Blog,
    title: "Modern Web Development: Tools and Frameworks in 2025",
    time: "3 days ago",
    cont_id: 3004
  },
  {
    image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=300&fit=crop",
    desc: "Remember: Code is poetry that computers can understand. Make it beautiful! ✨",
    uid: 1002,
    content: ContentEnum.Bite,
    title: "Code Poetry",
    time: "3 days ago",
    cont_id: 5005
  },
  {
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    desc: "Essential cybersecurity practices every developer should know. From secure coding practices to understanding common vulnerabilities and how to prevent them.",
    uid: 1008,
    content: ContentEnum.Blog,
    title: "Cybersecurity for Developers: Essential Practices",
    time: "4 days ago",
    cont_id: 3005
  },
  {
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop",
    desc: "Quick tip: Always comment your code. Future you will thank present you! 💡",
    uid: 1003,
    content: ContentEnum.Bite,
    title: "Future Self Thanks",
    time: "5 days ago",
    cont_id: 5006
  },
  {
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
    desc: "The best programmers are not those who write perfect code, but those who write readable code 📚",
    uid: 1009,
    content: ContentEnum.Bite,
    title: "Readable Code Wisdom",
    time: "6 days ago",
    cont_id: 5007
  },
  {
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop",
    desc: "Understanding database design principles and optimization techniques. Learn about indexing, query optimization, and database architecture for high-performance applications.",
    uid: 1010,
    content: ContentEnum.Blog,
    title: "Database Optimization: Performance and Design",
    time: "1 week ago",
    cont_id: 3006
  },
  {
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400&h=300&fit=crop",
    desc: "Complete guide to DevOps practices and tools. Learn about CI/CD pipelines, containerization, infrastructure as code, and deployment strategies for modern applications.",
    uid: 1005,
    content: ContentEnum.Blog,
    title: "DevOps Essentials: From Development to Deployment",
    time: "1 week ago",
    cont_id: 3007
  },
  {
    image: "https://images.unsplash.com/photo-1555949963-f7fe82fcdc29?w=400&h=300&fit=crop",
    desc: "Mobile app development trends and technologies for 2025. Explore cross-platform development, native performance, and the latest tools for building mobile applications.",
    uid: 1011,
    content: ContentEnum.Blog,
    title: "Mobile Development Trends: What's New in 2025",
    time: "1 week ago",
    cont_id: 3008
  }
];

  return (
      <div className="md:mt-5">
<p className="w-52 relative ml-5 px-3 py-2 text-xl font-mono text-green-400 transition-all duration-300 hover:text-green-300 before:content-['▶'] before:absolute before:-left-8 before:top-1/2 before:-translate-y-1/2 before:text-green-500 before:opacity-0 before:transition-all before:duration-200 hover:before:opacity-60 hover:before:-left-6 after:absolute after:left-3 after:-bottom-0.5 after:h-px after:w-0 after:bg-green-400 after:transition-all after:duration-300 hover:after:w-36 ">
  Recent Activity
</p>


        <BentoBox recentActivityData={recentActivityData}/>
      </div>
  );
}
