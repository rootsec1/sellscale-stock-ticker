import { Button, Card, CardBody, CardFooter } from "@nextui-org/react";
// Local
import { IEnhancedStock } from "@/app/interface";

/**
 * PortfolioStockCard component displays a stock in the user's portfolio.
 * It shows the stock name, ticker, quantity, current value, and profit/loss.
 * It also provides a button to sell the stock if the onSellButtonPress callback is provided.
 *
 * @param {Object} props - The component props.
 * @param {IEnhancedStock} props.enhanced_stock - The stock data.
 * @param {function} [props.onSellButtonPress] - Optional callback to handle the sell button press.
 * @returns {JSX.Element} The rendered PortfolioStockCard component.
 */
export default function PortfolioStockCard({
  enhanced_stock,
  onSellButtonPress = undefined,
}: {
  enhanced_stock: IEnhancedStock;
  onSellButtonPress?: (enhancedStock: IEnhancedStock) => void;
}) {
  // Calculate the total value of the stock holding
  const totalValue = (
    enhanced_stock.current_price * enhanced_stock.quantity
  ).toFixed(2);

  return (
    <Card className="mb-4 w-full">
      <CardBody>
        <div className="flex justify-between items-center w-full gap-20">
          <div>
            {/* Display the stock name and ticker with quantity */}
            <h3 className="text-lg font-bold">{enhanced_stock.name}</h3>
            <p className="text-sm font-thin">
              {enhanced_stock.ticker} ({enhanced_stock.quantity} shares)
            </p>
          </div>
          <div className="flex flex-col items-end">
            {/* Display the total value and profit/loss */}
            <p
              className={`${
                enhanced_stock.profit_loss_percent >= 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              ${totalValue} (
              {enhanced_stock.current_price - enhanced_stock.buy_price})
            </p>
            <p
              className={`text-sm ${
                enhanced_stock.profit_loss_percent >= 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >{`${enhanced_stock.profit_loss_percent >= 0 ? "+" : "-"} ${
              enhanced_stock.profit_loss_percent
            }%`}</p>
          </div>
        </div>
      </CardBody>
      {/* Display the sell button if onSellButtonPress is provided */}
      {onSellButtonPress !== undefined && (
        <CardFooter>
          <Button
            size="sm"
            className="w-full"
            variant="bordered"
            onPress={() => onSellButtonPress(enhanced_stock)}
          >
            Sell
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
