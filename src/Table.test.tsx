import { Item, sortByColumn } from "./utils";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Table from "./Table";
import * as React from "react";
import { exampleData } from "./exampleData";

const sampleData: Item[] = [
  { ticker: "XYZ", price: 90, assetClass: "Equities" },
  { ticker: "ABC", price: 52, assetClass: "Commodities" },
  { ticker: "DEF", price: 75, assetClass: "Commodities" },
  { ticker: "GHI", price: -13, assetClass: "Credit" },
  { ticker: "JKL", price: 34, assetClass: "Credit" },
  { ticker: "MNO", price: 67, assetClass: "Equities" },
];

describe("GIVEN financial instruments table", () => {
  describe("WHEN sorting function is given data and column to be sorted", () => {
    it("THEN should sort by assetClass in custom order, commodities, equities then credit", () => {
      const result = sortByColumn(sampleData, "assetClass");
      expect(result).toEqual([
        { ticker: "ABC", price: 52, assetClass: "Commodities" },
        { ticker: "DEF", price: 75, assetClass: "Commodities" },
        { ticker: "XYZ", price: 90, assetClass: "Equities" },
        { ticker: "MNO", price: 67, assetClass: "Equities" },
        { ticker: "GHI", price: -13, assetClass: "Credit" },
        { ticker: "JKL", price: 34, assetClass: "Credit" },
      ]);
    });

    it("THEN should sort by price in descending order", () => {
      const result = sortByColumn(sampleData, "price");
      expect(result).toEqual([
        { ticker: "XYZ", price: 90, assetClass: "Equities" },
        { ticker: "DEF", price: 75, assetClass: "Commodities" },
        { ticker: "MNO", price: 67, assetClass: "Equities" },
        { ticker: "ABC", price: 52, assetClass: "Commodities" },
        { ticker: "JKL", price: 34, assetClass: "Credit" },
        { ticker: "GHI", price: -13, assetClass: "Credit" },
      ]);
    });

    it("THEN should sort by ticker in alphabetical order", () => {
      const result = sortByColumn(sampleData, "ticker");
      expect(result).toEqual([
        { ticker: "ABC", price: 52, assetClass: "Commodities" },
        { ticker: "DEF", price: 75, assetClass: "Commodities" },
        { ticker: "GHI", price: -13, assetClass: "Credit" },
        { ticker: "JKL", price: 34, assetClass: "Credit" },
        { ticker: "MNO", price: 67, assetClass: "Equities" },
        { ticker: "XYZ", price: 90, assetClass: "Equities" },
      ]);
    });
  });

  describe("WHEN sorting is not applied", () => {
    it("THEN should return original data", async () => {
      render(<Table />);

      expect(screen.getByText("Loading...")).toBeInTheDocument();

      await waitFor(
        () => {
          expect(screen.queryByText("Loading...")).toBeNull();

          exampleData.forEach((item) => {
            expect(screen.getByText(item.ticker)).toBeInTheDocument();
          });
        },
        { timeout: 4000 },
      );
    });
  });

  describe("WHEN given presentation rules", () => {
    it("THEN should render rows color coded correctly based on asset class", async () => {
      const { getAllByText } = render(<Table />);

      expect(screen.getByText("Loading...")).toBeInTheDocument();

      await waitFor(
        () => {
          const equitiesRow = getAllByText("Equities")[0].closest("tr");
          const commoditiesRow = getAllByText("Commodities")[0].closest("tr");
          const creditRow = getAllByText("Credit")[0].closest("tr");

          expect(equitiesRow).toHaveStyle("background-color: lightblue");
          expect(commoditiesRow).toHaveStyle("background-color: white");
          expect(creditRow).toHaveStyle("background-color: lightgreen");
        },
        { timeout: 4000 },
      );
    });

    it("THEN should render positive prices in blue and negative prices in red", async () => {
      const { getByText } = render(<Table />);

      expect(screen.getByText("Loading...")).toBeInTheDocument();

      await waitFor(
        () => {
          const positiveCell = getByText("2458.76");
          expect(positiveCell).toHaveStyle("color: blue");

          const negativeCell = getByText("-42.1");
          expect(negativeCell).toHaveStyle("color: red");
        },
        { timeout: 4000 },
      );
    });
  });
});
