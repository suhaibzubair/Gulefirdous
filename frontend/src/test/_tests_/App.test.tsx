import "@testing-library/jest-dom";
import { fireEvent, render, screen, within } from "@testing-library/react";
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

test("adds a product draft with a selected AI generated picture", () => {
  render(<App />);

  fireEvent.change(screen.getByPlaceholderText(/Example: Amber Musk Perfume/i), {
    target: { value: "Amber Musk Perfume" },
  });
  fireEvent.change(screen.getByPlaceholderText("4500"), {
    target: { value: "4500" },
  });
  fireEvent.change(screen.getByPlaceholderText("30"), {
    target: { value: "30" },
  });

  fireEvent.click(screen.getByRole("button", { name: /Generate AI picture options/i }));
  fireEvent.click(
    within(screen.getByLabelText(/Generated perfume picture options/i)).getByRole("button", {
      name: /Rose gold mist/i,
    })
  );
  fireEvent.click(screen.getByRole("button", { name: /Add product draft/i }));

  expect(screen.getByRole("img", { name: /Amber Musk Perfume product visual/i })).toBeInTheDocument();
  expect(screen.getAllByText(/AI generated: Rose gold mist/i).length).toBeGreaterThan(1);
});

test("offers mobile gallery image selection for product pictures", () => {
  render(<App />);
  const createObjectUrl = jest.fn(() => "blob:gallery-upload");

  Object.defineProperty(URL, "createObjectURL", {
    configurable: true,
    value: createObjectUrl,
  });

  const galleryInput = screen.getByLabelText(/Select from mobile gallery/i);
  const galleryFile = new File(["<svg />"], "upload.svg", { type: "image/svg+xml" });

  expect(galleryInput).toHaveAttribute("type", "file");
  expect(galleryInput).toHaveAttribute("accept", "image/*");

  fireEvent.change(galleryInput, { target: { files: [galleryFile] } });

  expect(createObjectUrl).toHaveBeenCalledWith(galleryFile);
  expect(screen.getByText(/Gallery upload: upload.svg/i)).toBeInTheDocument();
});

test("adds a product draft with a selected gallery picture", () => {
  render(<App />);
  const createObjectUrl = jest.fn(() => "blob:gallery-upload");

  Object.defineProperty(URL, "createObjectURL", {
    configurable: true,
    value: createObjectUrl,
  });

  fireEvent.change(screen.getByPlaceholderText(/Example: Amber Musk Perfume/i), {
    target: { value: "Amber Musk Perfume" },
  });
  fireEvent.change(screen.getByPlaceholderText("4500"), {
    target: { value: "4500" },
  });
  fireEvent.change(screen.getByPlaceholderText("30"), {
    target: { value: "30" },
  });
  fireEvent.change(screen.getByLabelText(/Select from mobile gallery/i), {
    target: { files: [new File(["<svg />"], "upload.svg", { type: "image/svg+xml" })] },
  });
  fireEvent.click(screen.getByRole("button", { name: /Add product draft/i }));

  expect(screen.getByRole("img", { name: /Amber Musk Perfume product visual/i })).toHaveAttribute(
    "src",
    "blob:gallery-upload"
  );
  expect(screen.getByText(/Gallery upload: upload.svg/i)).toBeInTheDocument();
});