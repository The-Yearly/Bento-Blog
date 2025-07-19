import React from 'react';
import { BentoBox } from "../components/BentoGrid";
import { ActivityType, ContentEnum } from "../utils/types";
const generateBites = (): ActivityType[] => [
  {
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop",
    desc: "Just shipped a major feature after weeks of development! The satisfaction of seeing users love what you've built is incredible 🚀",
    uid: 1001,
    content: ContentEnum.Bite,
    title: "Feature Launch Success",
    time: "2 hours ago",
    cont_id: 5001
  },
  {
    image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&h=300&fit=crop",
    desc: "Morning ritual: Coffee ☕️ + Clean IDE + Ambient music = Peak productivity mode activated",
    uid: 1003,
    content: ContentEnum.Bite,
    title: "Perfect Morning Setup",
    time: "4 hours ago",
    cont_id: 5002
  },
  {
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&h=300&fit=crop",
    desc: "Debugging is like being a detective in a crime movie where you're also the murderer, the victim, and somehow the weapon too 🕵️‍♂️",
    uid: 1001,
    content: ContentEnum.Bite,
    title: "Detective Mode: Expert Level",
    time: "6 hours ago",
    cont_id: 5003
  },
  {
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400&h=300&fit=crop",
    desc: "Spent 2 hours perfecting variable names. Code readability > clever one-liners. Future me will definitely appreciate this 😅",
    uid: 1006,
    content: ContentEnum.Bite,
    title: "The Art of Naming Things",
    time: "8 hours ago",
    cont_id: 5004
  },
  {
    image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=300&fit=crop",
    desc: "Code is poetry that computers understand. Every function should tell a story, every variable should have purpose ✨",
    uid: 1002,
    content: ContentEnum.Bite,
    title: "Code as Poetry",
    time: "12 hours ago",
    cont_id: 5005
  },
  {
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop",
    desc: "PSA: Write comments like you're explaining to a confused intern at 3 AM. Trust me, that intern might be future you 💡",
    uid: 1003,
    content: ContentEnum.Bite,
    title: "Comment Wisdom",
    time: "1 day ago",
    cont_id: 5006
  },
  {
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
    desc: "Great programmers don't write perfect code—they write code that other humans can read, understand, and improve 📚",
    uid: 1009,
    content: ContentEnum.Bite,
    title: "Human-Readable Code",
    time: "1 day ago",
    cont_id: 5007
  },
  {
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop",
    desc: "Plot twist: The bug that took 3 hours to find was a missing semicolon. JavaScript, you beautiful, chaotic language 🤦‍♂️",
    uid: 1004,
    content: ContentEnum.Bite,
    title: "The Great Semicolon Hunt",
    time: "2 days ago",
    cont_id: 5008
  },
  {
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop",
    desc: "Famous last words: 'It works perfectly on my machine!' *deploys to production* *everything is on fire* 😰",
    uid: 1007,
    content: ContentEnum.Bite,
    title: "Production Reality Check",
    time: "2 days ago",
    cont_id: 5009
  },
  {
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    desc: "Stack Overflow is down. Time to actually read the documentation and think for myself. What a concept! 🧠💭",
    uid: 1008,
    content: ContentEnum.Bite,
    title: "Brain Mode: Activated",
    time: "3 days ago",
    cont_id: 5010
  },
  {
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop",
    desc: "Changed one character in the code. Entire application implodes. This is why we have version control, folks 🔥",
    uid: 1010,
    content: ContentEnum.Bite,
    title: "Butterfly Effect: Code Edition",
    time: "3 days ago",
    cont_id: 5011
  },
  {
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400&h=300&fit=crop",
    desc: "Writing docs is like doing laundry—nobody enjoys it, but everyone loves having clean, organized code 🧺",
    uid: 1005,
    content: ContentEnum.Bite,
    title: "Documentation Therapy",
    time: "4 days ago",
    cont_id: 5012
  },
  {
    image: "https://images.unsplash.com/photo-1555949963-f7fe82fcdc29?w=400&h=300&fit=crop",
    desc: "CSS: 'I'll center this div for you!' *2 hours later* 'How about I put it in another dimension instead?' ✨",
    uid: 1011,
    content: ContentEnum.Bite,
    title: "CSS: The Trickster",
    time: "5 days ago",
    cont_id: 5013
  },
  {
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop",
    desc: "Git commit evolution: 'fix' → 'actually fix' → 'please work' → 'I'M BEGGING YOU' → 'IT LIVES!' 🎉",
    uid: 1002,
    content: ContentEnum.Bite,
    title: "Git Commit Emotional Journey",
    time: "5 days ago",
    cont_id: 5014
  },
  {
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop",
    desc: "Rubber duck debugging: Where you explain your code to a bath toy and somehow it makes perfect sense 🦆",
    uid: 1012,
    content: ContentEnum.Bite,
    title: "Duck Debugging Therapy",
    time: "6 days ago",
    cont_id: 5015
  },
  {
    image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=400&h=300&fit=crop",
    desc: "Code works on first try. *suspicious Fry squinting* This feels too easy. What horrible bug am I missing? 👀",
    uid: 1013,
    content: ContentEnum.Bite,
    title: "Suspiciously Perfect Code",
    time: "1 week ago",
    cont_id: 5016
  },
  {
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop",
    desc: "JavaScript: 'I'm flexible!' *types anything into anything* Also JS: 'undefined is not a function' 🤯",
    uid: 1014,
    content: ContentEnum.Bite,
    title: "JavaScript's Multiple Personalities",
    time: "1 week ago",
    cont_id: 5017
  },
  {
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop",
    desc: "Product Manager: 'Quick 5-minute fix!' *Developer Vietnam flashbacks* *3 sprints later* 'Almost done!' ⏰",
    uid: 1015,
    content: ContentEnum.Bite,
    title: "The '5-Minute Fix' Saga",
    time: "1 week ago",
    cont_id: 5018
  }
];
export default function DeveloperActivityFeed() {
  const bites = generateBites();

  return (
    <div>
      <div className="mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold text-neutral-500 mb-2">
            Some Quick Bites
          </h2>
        </div>
        <div className="max-w-7xl mx-auto">
          <BentoBox recentActivityData={bites} />
        </div>
      </div>
    </div>
  );
}