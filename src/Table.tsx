import React, { useState, useMemo, useEffect } from "react";
import {
  Item,
  SortBy,
  SortIcon,
  getAssetColor,
  getPriceColor,
  sortByColumn,
} from "./utils";

import "./Table.css";
import { exampleData } from "./exampleData";

const Table = () => {
  const [data, setData] = useState<Item[]>([]);
  const [sortBy, setSortBy] = useState<SortBy>("");
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    setTimeout(() => {
      setData(exampleData);
      setIsLoading(false);
    }, 3000);
  };

  useEffect(() => {
    getData();
  }, []);

  const sortedData = useMemo(() => sortByColumn(data, sortBy), [data, sortBy]);

  const handleSort = (column: SortBy) =>
    setSortBy((prevSortBy) => (prevSortBy === column ? "" : column));

  const getSortMessage = () => {
    switch (sortBy) {
      case "assetClass":
        return "Commodities, Equities, Credit";
      case "price":
        return "Price high to low";
      case "ticker":
        return "Ticker A to Z";
      default:
        return "none";
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (!isLoading && data.length === 0) return <p>No data</p>;

  return (
    <>
      <p>Sorted by: {getSortMessage()}</p>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("assetClass")}>
              Asset class
              <SortIcon column="assetClass" sortBy={sortBy} />
            </th>
            <th onClick={() => handleSort("price")}>
              Price
              <SortIcon column="price" sortBy={sortBy} />
            </th>
            <th onClick={() => handleSort("ticker")}>
              Ticker
              <SortIcon column="ticker" sortBy={sortBy} />
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item: Item) => {
            return (
              <tr
                key={item.ticker}
                style={{ backgroundColor: getAssetColor(item.assetClass) }}
              >
                <td>{item.assetClass}</td>
                <td style={{ color: getPriceColor(item.price) }}>
                  {item.price}
                </td>
                <td>{item.ticker}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Table;
