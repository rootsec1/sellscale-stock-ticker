import { useCallback, useEffect, useState } from "react";
import { CircularProgress, useDisclosure } from "@nextui-org/react";
// Local imports
import { alertUser, fetchData } from "@/app/util";
import { API_URL } from "@/app/constants";
import { IStockInfo } from "@/app/interface";
import TopStockCard from "@/app/components/top-stock-component";
import BuyModalComponent from "@/app/components/buy-modal-component";

/**
 * TopStockSection component fetches and displays a list of top stocks.
 * It shows a loading spinner while fetching the data and displays the stocks in a list.
 * Users can click on a stock to open a modal for buying the stock.
 *
 * @returns {JSX.Element} The rendered TopStockSection component.
 */
export default function TopStockSection() {
  // Destructure the useDisclosure hook to manage the buy modal state
  const { isOpen: isOpenBuyModal, onOpenChange: onOpenChangeBuyModal } =
    useDisclosure();
  // State to hold the list of top stocks
  const [topStocksList, setTopStocksList] = useState<IStockInfo[]>([]);
  // State to hold the selected stock information for buying
  const [selectedStockInfo, setSelectedStockInfo] = useState<IStockInfo | null>(
    null
  );
  // State to manage the loading state
  const [isLoading, setIsLoading] = useState(true);

  /**
   * fetchTopStocksList is an async function that fetches the top stocks list from the API.
   * It updates the state with the fetched data and handles any errors that occur during the fetch.
   */
  const fetchTopStocksList = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetchData(`${API_URL}/stock/get_top_stocks/`);
      const data = response.data as IStockInfo[];
      setTopStocksList(data);
    } catch (error) {
      alertUser((error as any)?.toString(), "error");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // useEffect hook to fetch the top stocks list when the component mounts
  useEffect(() => {
    fetchTopStocksList();
  }, [fetchTopStocksList]);

  return (
    <div className="flex-center-screen">
      <h1 className="text-xl mb-4">Top Stocks</h1>
      {/* Display a loading spinner while fetching the data */}
      {isLoading && <CircularProgress className="flex-center-screen mb-4" />}
      <div>
        {/* Display the list of top stocks */}
        {topStocksList.map((stock) => (
          <div
            key={stock.symbol}
            onClick={() => {
              setSelectedStockInfo(stock);
              onOpenChangeBuyModal();
            }}
            className="hover:cursor-pointer"
          >
            <TopStockCard stock={stock} />
          </div>
        ))}
      </div>

      {/* Display the buy modal if a stock is selected */}
      {selectedStockInfo && (
        <BuyModalComponent
          isOpen={isOpenBuyModal}
          onOpenChange={onOpenChangeBuyModal}
          stockInfo={selectedStockInfo}
          onBuyModalClose={() => {
            setSelectedStockInfo(null);
            fetchTopStocksList();
          }}
        />
      )}
    </div>
  );
}
