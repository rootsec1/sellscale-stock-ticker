import { useCallback, useEffect, useState } from "react";
// Local
import { fetchData } from "@/app/util";
import { API_URL } from "@/app/constants";
import { IStockInfo } from "@/app/interface";
import TopStockCard from "@/app/components/top-stock-component";

export default function TopStockSection() {
  const [topStocksList, setTopStocksList] = useState<IStockInfo[]>([]);

  const fetchTopStocksList = useCallback(async () => {
    const response = await fetchData(`${API_URL}/stock/get_top_stocks/`);
    const data = response.data as IStockInfo[];
    setTopStocksList(data);
  }, []);

  useEffect(() => {
    fetchTopStocksList();
  }, [fetchTopStocksList]);

  return (
    <div className="flex-center-screen">
      <h1 className="text-xl mb-4">Top Stocks</h1>
      <div>
        {topStocksList.map((stock) => (
          <TopStockCard key={stock.symbol} stock={stock} />
        ))}
      </div>
    </div>
  );
}
