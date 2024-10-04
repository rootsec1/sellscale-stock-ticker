import { useCallback, useEffect, useState } from "react";
import { CircularProgress } from "@nextui-org/react";
// Local imports
import { INews, IStockInfo } from "@/app/interface";
import { alertUser, fetchData } from "@/app/util";
import { API_URL } from "@/app/constants";
import NewsCard from "@/app/components/news-card-component";

/**
 * TodaysNewsSection component fetches and displays today's news articles related to top stocks.
 * It shows a loading spinner while fetching the data and displays the news articles in a list.
 *
 * @returns {JSX.Element} The rendered TodaysNewsSection component.
 */
export default function TodaysNewsSection() {
  // State to hold the list of news articles
  const [newsArticleList, setNewsArticleList] = useState<INews[]>([]);
  // State to manage the loading state
  const [isLoading, setIsLoading] = useState(true);

  /**
   * fetchTopStocksList is an async function that fetches the top stocks list from the API.
   * It extracts the news articles from the top stocks and updates the state with the news articles.
   * It also handles any errors that occur during the fetch.
   */
  const fetchTopStocksList = useCallback(async () => {
    try {
      // Fetch the top stocks data from the API
      const response = await fetchData(`${API_URL}/stock/get_top_stocks/`);
      const data = response.data as IStockInfo[];
      // Extract the first news article from each stock
      let newsArray = data.map((stock) => stock.news[0]);
      // Filter out undefined or null news articles and those without thumbnails
      newsArray = newsArray.filter(
        (news) => news !== undefined && news !== null && news.thumbnail
      );
      // Update the state with the filtered news articles
      setNewsArticleList(newsArray);
    } catch (error) {
      // Handle any errors that occur during the fetch
      alertUser((error as any)?.toString(), "error");
    } finally {
      // Set the loading state to false
      setIsLoading(false);
    }
  }, []);

  // useEffect hook to fetch the top stocks list when the component mounts
  useEffect(() => {
    fetchTopStocksList();
  }, [fetchTopStocksList]);

  return (
    <div className="flex-center-screen">
      <h1 className="text-xl mb-4">Today&apos;s News and Events</h1>
      {/* Display a loading spinner while fetching the data */}
      {isLoading && <CircularProgress className="flex-center-screen mb-4" />}

      <div className="ml-2">
        {/* Display the list of news articles */}
        {newsArticleList.map((newsArticle, idx) => (
          <NewsCard key={idx} news={newsArticle} />
        ))}
      </div>
    </div>
  );
}
