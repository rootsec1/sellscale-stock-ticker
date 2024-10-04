import { useCallback, useEffect, useState } from "react";
import { useDisclosure } from "@nextui-org/react";
import { CircularProgress } from "@nextui-org/react";

// Local imports
import { IEnhancedStock } from "@/app/interface";
import { alertUser, fetchData } from "../util";
import { API_URL } from "../constants";
import PortfolioStockCard from "../components/portfolio-stock-card-component";
import SellModalComponent from "../components/sell-modal-component";

/**
 * PortfolioSection component displays the user's stock portfolio.
 * It fetches the portfolio data, displays it in a list, and allows the user to sell stocks.
 */
export default function PortfolioSection() {
  // Destructure the useDisclosure hook to manage the sell modal state
  const {
    isOpen: isOpenSellModal,
    onOpen: onOpenSellModal,
    onOpenChange: onOpenChangeSellModal,
  } = useDisclosure();

  // State to hold the list of enhanced stocks
  const [enhancedStockList, setEnhancedStockList] = useState<IEnhancedStock[]>(
    []
  );
  // State to hold the selected stock for sale
  const [selectedStockForSale, setSelectedStockForSale] =
    useState<IEnhancedStock | null>(null);
  // State to manage the loading state
  const [isLoading, setIsLoading] = useState(true);

  /**
   * fetchPortfolioCallback is an async function that fetches the portfolio data from the API.
   * It sets the loading state, fetches the data, updates the state with the fetched data,
   * and handles any errors that occur during the fetch.
   */
  const fetchPortfolioCallback = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetchData(`${API_URL}/stock/get_portfolio/`);
      setEnhancedStockList(response.data);
    } catch (error) {
      alertUser((error as string)?.toString(), "error");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // useEffect hook to fetch the portfolio data when the component mounts
  useEffect(() => {
    fetchPortfolioCallback();
  }, []);

  return (
    <div className="flex-center-screen">
      <h1 className="text-xl mb-4">Your Portfolio</h1>
      {isLoading && <CircularProgress className="flex-center-screen mb-4" />}

      <div>
        {enhancedStockList.map((enhanced_stock, idx) => (
          <PortfolioStockCard
            key={idx}
            enhanced_stock={enhanced_stock}
            onSellButtonPress={(selectedEnhancedStock) => {
              setSelectedStockForSale(selectedEnhancedStock);
              onOpenSellModal();
            }}
          />
        ))}
      </div>

      {selectedStockForSale && (
        <SellModalComponent
          isOpen={isOpenSellModal}
          onOpenChange={onOpenChangeSellModal}
          onSellModalClose={() => {
            setSelectedStockForSale(null);
            fetchPortfolioCallback();
          }}
          enhancedStock={selectedStockForSale}
        />
      )}
    </div>
  );
}
