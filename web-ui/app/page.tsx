"use client";

// Local
import TodaysNewsSection from "./sections/news";
import PortfolioSection from "./sections/portfolio";
import TopStockSection from "./sections/top-stocks";

export default function HomePage() {
  return (
    <div className="flex w-full items-stretch mt-2">
      <div className="w-1/3">
        <PortfolioSection />
      </div>
      <div className="w-1/3">
        <TopStockSection />
      </div>
      <div className="w-1/3">
        <TodaysNewsSection />
      </div>
    </div>
  );
}
