import { Avatar, Input, Navbar, NavbarContent } from "@nextui-org/react";
import { FaSearch } from "react-icons/fa";
import { SiStockx } from "react-icons/si";

// Local
import { APP_NAME, DEFAULT_ICON_SIZE } from "./constants";

export default function NavbarCustom() {
  return (
    <div>
      <Navbar maxWidth="full">
        <NavbarContent className="w-full flex justify-between items-center">
          <div className="w-full flex justify-between items-center">
            <span className="flex gap-1">
              <SiStockx size={DEFAULT_ICON_SIZE} className="fill-green-600" />
              <p className="text-xl font-bold text-green-600">{APP_NAME}</p>
            </span>

            <Input
              className="w-1/3"
              classNames={{
                base: "w-full", // Set max-width for input
                mainWrapper: "h-full",
                input: "text-small",
                inputWrapper:
                  "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
              }}
              placeholder="Type to search stock..."
              startContent={<FaSearch size={DEFAULT_ICON_SIZE} />}
              type="search"
            />

            <Avatar src="https://asquaregarden.com/wp-content/uploads/2021/01/wsbkid1.gif" />
          </div>
        </NavbarContent>
      </Navbar>
    </div>
  );
}
