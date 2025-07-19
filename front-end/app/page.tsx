import Hero from "./components/hero";
import RecentActivity from "./components/recentLogs";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <div className="max-w-6xl ">
        <Hero />
        <RecentActivity />
      </div>
    </div>
  );
}
