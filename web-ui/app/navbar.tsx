"use client";

import {
  Autocomplete,
  AutocompleteItem,
  Avatar,
  Navbar,
  NavbarContent,
  useDisclosure,
} from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import { FaSearch } from "react-icons/fa";
import { SiStockx } from "react-icons/si";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Local imports
import { fetchData, fetchStockDataFromSymbol } from "@/app/util";
import { APP_NAME, DEFAULT_ICON_SIZE } from "./constants";
import BuyModalComponent from "./components/buy-modal-component";
import { IStockInfo } from "./interface";

/**
 * NavbarCustom component renders a custom navigation bar with a stock search feature.
 * It allows users to search for stocks and open a modal to buy the selected stock.
 *
 * @returns {JSX.Element} The rendered NavbarCustom component.
 */
export default function NavbarCustom() {
  const router = useRouter();

  // Destructure the useDisclosure hook to manage the buy modal state
  const {
    isOpen: isOpenBuyModal,
    onOpen: onOpenBuyModal,
    onOpenChange: onOpenChangeBuyModal,
  } = useDisclosure();
  // State to hold the selected stock information for buying
  const [selectedStockInfo, setSelectedStockInfo] = useState<IStockInfo | null>(
    null
  );

  // useAsyncList hook to manage the stock search results
  const stockList = useAsyncList<any>({
    async load({ signal, filterText }) {
      if (!filterText) return { items: [] };

      // Fetch stock data from the API based on the filter text
      const response = (await fetchData(
        `https://dumbstockapi.com/stock?exchanges=NASDAQ&ticker_search=${filterText}`
      )) as any[];
      return {
        items: response.slice(0, 5) ?? [],
      };
    },
  });

  return (
    <div>
      <Navbar maxWidth="full">
        <NavbarContent className="w-full flex justify-between items-center">
          <div className="w-full flex justify-between items-center">
            {/* Logo and App Name */}
            <span className="flex gap-1">
              <SiStockx size={DEFAULT_ICON_SIZE} className="fill-green-600" />
              <p className="text-xl font-bold text-green-600">{APP_NAME}</p>
            </span>

            {/* Autocomplete search input for stocks */}
            <Autocomplete
              className="w-1/3"
              classNames={{
                base: "w-full", // Set max-width for input
              }}
              placeholder="Type to search stock..."
              startContent={<FaSearch size={DEFAULT_ICON_SIZE} />}
              type="search"
              variant="bordered"
              inputValue={stockList.filterText}
              onInputChange={stockList.setFilterText}
              isLoading={stockList.isLoading}
              items={stockList.items}
              aria-label="Search stock"
              onSelectionChange={async (item) => {
                if (item) {
                  // Fetch detailed stock information based on the selected item
                  const stockInfo = await fetchStockDataFromSymbol(
                    item.toString()
                  );
                  setSelectedStockInfo(stockInfo);
                  onOpenBuyModal();
                }
              }}
            >
              {(item) => (
                <AutocompleteItem
                  key={(item as any).ticker}
                  className="capitalize"
                  textValue={(item as any).ticker}
                >
                  <div className="flex flex-col justify-start items-start">
                    <h2 className="text-sm font-bold">{(item as any).name}</h2>
                    <h3 className="text-xs font-thin">
                      {(item as any).ticker}
                    </h3>
                  </div>
                </AutocompleteItem>
              )}
            </Autocomplete>

            {/* User Avatar */}
            <Avatar src="https://asquaregarden.com/wp-content/uploads/2021/01/wsbkid1.gif" />
          </div>
        </NavbarContent>
      </Navbar>

      {/* Buy Modal Component */}
      {selectedStockInfo && (
        <BuyModalComponent
          isOpen={isOpenBuyModal}
          onOpenChange={onOpenChangeBuyModal}
          stockInfo={selectedStockInfo ?? null}
          onBuyModalClose={() => {
            setSelectedStockInfo(null);
            router.refresh();
          }}
        />
      )}
    </div>
  );
}
