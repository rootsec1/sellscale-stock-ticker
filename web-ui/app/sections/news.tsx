import { useCallback, useEffect, useState } from "react";
// Local
import { INews, IStockInfo } from "@/app/interface";
import { fetchData } from "@/app/util";
import { API_URL } from "@/app/constants";
import NewsCard from "@/app/components/news-card-component";

export default function TodaysNewsSection() {
  const [newsArticleList, setNewsArticleList] = useState<INews[]>([]);

  const fetchTopStocksList = useCallback(async () => {
    const response = await fetchData(`${API_URL}/stock/get_top_stocks/`);
    const data = response.data as IStockInfo[];
    const newsArray = data.map((stock) => stock.news[0]);
    setNewsArticleList(newsArray);
  }, []);

  useEffect(() => {
    fetchTopStocksList();
  }, [fetchTopStocksList]);

  return (
    <div className="flex-center-screen">
      <h1 className="text-xl mb-4">Today&apos;s News and Events</h1>

      <div className="ml-2">
        {newsArticleList.map((newsArticle, idx) => (
          <NewsCard key={idx} news={newsArticle} />
        ))}
      </div>
    </div>
  );
}
