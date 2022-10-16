import { render, screen } from "@testing-library/react";
import { SampleRoutes } from "../../interfaces/Routes";
import Sidebar from "../../views/Sidebar";
import { defaultTitle } from "./RouteConditions";

const nationalSpeedLimit = 110;

test("Has Route Data", () => {
  const theRoutes = [...SampleRoutes];
  expect(theRoutes.length).toBeGreaterThan(0);
});

test("Route Conditions Header Text in Sidebar", () => {
  render(<Sidebar />);
  const headerText = screen.getByText(defaultTitle);
  expect(headerText).toBeInTheDocument();
});

test(`Route time & distance don't exceed ${nationalSpeedLimit}kph`, () => {
  const invalidRoutes = SampleRoutes.filter((rte) => {
    const avSpeed = Math.ceil((rte.distance / rte.time) * 60);
    if (avSpeed > nationalSpeedLimit) return true;
  });
  expect(invalidRoutes.length).toEqual(0);
});
