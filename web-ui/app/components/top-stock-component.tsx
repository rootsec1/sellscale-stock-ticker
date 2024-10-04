import { Card, CardBody } from "@nextui-org/react";
import { IStockInfo } from "../interface";

/**
 * TopStockCard component displays a stock's information in a card format.
 * It shows the stock's short name, symbol, current price, and price change percentage.
 *
 * @param {Object} props - The component props.
 * @param {IStockInfo} props.stock - The stock data.
 * @returns {JSX.Element} The rendered TopStockCard component.
 */
export default function TopStockCard({ stock }: { stock: IStockInfo }) {
  // Calculate the price change from the previous close
  const priceChange = stock.currentPrice - stock.previousClose;
  // Calculate the percentage change
  const changePercentage = ((priceChange / stock.previousClose) * 100).toFixed(
    2
  );
  // Determine if the price change is positive
  const changePositive = priceChange >= 0;

  return (
    <Card className="mb-4 w-auto">
      <CardBody>
        <div className="flex justify-between items-center w-full gap-20">
          <div>
            {/* Display the stock's short name and symbol */}
            <h3 className="text-lg font-bold">{stock.shortName}</h3>
            <p className="text-sm font-thin">{stock.symbol}</p>
          </div>
          <div className="flex flex-col items-end">
            {/* Display the current price */}
            <p>${stock.currentPrice}</p>
            {/* Display the price change percentage with appropriate color */}
            <p
              className={`text-sm ${
                changePositive ? "text-green-500" : "text-red-500"
              }`}
            >{`${changePositive ? "+" : ""}${changePercentage}%`}</p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
