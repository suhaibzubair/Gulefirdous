import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "../../App";

test("renders the Gulefirdous MVP dashboard", () => {
  render(<App />);

  expect(
    screen.getByRole("heading", {
      name: /gulefirdous commerce and social publishing app/i,
    })
  ).toBeInTheDocument();
  expect(screen.getByText(/WooCommerce is not installed yet/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /Post to Facebook/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /Post to Instagram/i })).toBeInTheDocument();
});

test("publishes independently to Facebook and Instagram", () => {
  render(<App />);

  fireEvent.click(screen.getByRole("button", { name: /Post to Facebook/i }));
  expect(screen.getByText(/Facebook: Published/i)).toBeInTheDocument();
  expect(screen.getByText(/Instagram: Ready/i)).toBeInTheDocument();

  fireEvent.click(screen.getByRole("button", { name: /Post to Instagram/i }));
  expect(screen.getByText(/Instagram: Published/i)).toBeInTheDocument();
});

test("creates a customer COD order from the app storefront", () => {
  render(<App />);

  const initialOrders = screen.getAllByText(/Cash on Delivery/i).length;
  fireEvent.click(screen.getAllByRole("button", { name: /Order with COD/i })[0]);

  expect(screen.getAllByText(/Cash on Delivery/i)).toHaveLength(initialOrders + 1);
  expect(screen.getAllByText(/Demo Customer/i).length).toBeGreaterThan(0);
});