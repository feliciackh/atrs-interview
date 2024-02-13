
export interface Item {
  ticker: string;
  price: number;
  assetClass: "Commodities" | "Equities" | "Credit";
}

export type SortBy = "ticker" | "price" | "assetClass" | "";

export const sortByColumn = (data: Item[], column: SortBy) => {
  switch (column) {
    case "assetClass":
      // sort: Commodities, Equities, Credit
      const customOrder = ["Commodities", "Equities", "Credit"];

      const assetClassSorted = [...data].sort((a, b) => {
        const indexA = customOrder.indexOf(a[column]);
        const indexB = customOrder.indexOf(b[column]);

        return indexA - indexB;
      });
      return assetClassSorted;

    case "price":
      // sort: number high to low
      const priceSorted = [...data].sort((a, b) => b[column] - a[column]);

      return priceSorted;

    case "ticker":
      // sort: alphabetical order
      const tickerSorted = [...data].sort((a, b) =>
        a[column].localeCompare(b[column])
      );

      return tickerSorted;

    default:
      return [...data];
  }
};

export const SortIcon = ({
  column,
  sortBy,
}: {
  column: SortBy;
  sortBy: SortBy;
}) => (sortBy === column ? " ↓ " : " ");

export const getPriceColor = (price: number) => (price >= 0 ? "blue" : "red");

export const getAssetColor = (asset: "Commodities" | "Equities" | "Credit") => {
  return asset === "Equities"
    ? "lightblue"
    : asset === "Credit"
    ? "lightgreen"
    : "white";
};
