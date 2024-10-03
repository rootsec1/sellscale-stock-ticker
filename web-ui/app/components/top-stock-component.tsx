import { Card, CardBody } from "@nextui-org/react";
//
import { IStockInfo } from "../interface";

export default function TopStockCard({ stock }: { stock: IStockInfo }) {
  const priceChange = stock.currentPrice - stock.previousClose;
  const changePercentage = ((priceChange / stock.previousClose) * 100).toFixed(
    2
  );
  const changePositive = priceChange >= 0;

  return (
    <Card className="mb-4 w-auto">
      <CardBody>
        <div className="flex justify-between items-center w-full gap-20">
          <div>
            <h3 className="text-lg font-bold">{stock.shortName}</h3>
            <p className="text-sm font-thin">{stock.symbol}</p>
          </div>
          <div className="flex flex-col items-end">
            <p>${stock.currentPrice}</p>
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
