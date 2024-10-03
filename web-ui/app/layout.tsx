import { NextUIProvider } from "@nextui-org/react";
import { Poppins } from "next/font/google";
// Local
import "./globals.css";
import NavbarCustom from "./navbar";

const poppins = Poppins({
  weight: "400",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <NextUIProvider>
          <NavbarCustom />
          {children}
        </NextUIProvider>
      </body>
    </html>
  );
}
