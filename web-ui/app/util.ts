import { enqueueSnackbar } from "notistack";
// Local
import { API_URL } from "./constants";
import { IFetchOptions } from "./interface";

// Utility function to fetch data from an API
export async function fetchData(url: string, options: IFetchOptions = {}) {
  const { method = "GET", headers = {}, body = null } = options;

  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : null,
    });

    // Check if the response status is within the 500 range
    if (response.status >= 500 && response.status < 600) {
      throw new Error(`Server error: ${response.status}`);
    }

    // Check if the response is not ok (other than 500-level errors)
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

export async function fetchStockDataFromSymbol(symbol: string) {
  const response = await fetchData(
    `${API_URL}/stock/lookup_stock/?symbol=${symbol}`
  );
  return response.data;
}

export function alertUser(message: string, variant: any) {
  enqueueSnackbar(message, {
    variant,
    preventDuplicate: true,
    autoHideDuration: 3000,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "right",
    },
  });
}
