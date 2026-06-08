import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
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

function fillProductDraftForm(name: string) {
  fireEvent.change(screen.getByPlaceholderText(/Example: Amber Musk Perfume/i), {
    target: { value: name },
  });
  fireEvent.change(screen.getByPlaceholderText("4500"), {
    target: { value: "4500" },
  });
  fireEvent.change(screen.getByPlaceholderText("30"), {
    target: { value: "30" },
  });
  fireEvent.change(screen.getByPlaceholderText("50"), {
    target: { value: "75" },
  });
}

test("adds a product draft with perfume details and a selected AI generated picture", async () => {
  render(<App />);

  fillProductDraftForm("Amber Musk Perfume");
  fireEvent.click(screen.getByRole("button", { name: /^Vanilla$/i }));

  fireEvent.click(screen.getByRole("button", { name: /Generate AI picture options/i }));
  await waitFor(() =>
    expect(
      screen.getByRole("button", { name: /Generate AI picture options/i })
    ).not.toBeDisabled()
  );
  const generatedOptions = within(
    screen.getByLabelText(/Generated perfume picture options/i)
  ).getAllByRole("button", { name: /perfume concept/i });
  fireEvent.click(generatedOptions[1]);
  fireEvent.click(screen.getByRole("button", { name: /Add product draft/i }));

  expect(screen.getByRole("img", { name: /Amber Musk Perfume product visual/i })).toBeInTheDocument();
  expect(screen.getAllByText(/75 ml · Unisex · Vanilla/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/AI generated:/i).length).toBeGreaterThan(1);
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

  fillProductDraftForm("Amber Musk Perfume");
  fireEvent.change(screen.getByLabelText(/Select from mobile gallery/i), {
    target: { files: [new File(["<svg />"], "upload.svg", { type: "image/svg+xml" })] },
  });
  fireEvent.click(screen.getByRole("button", { name: /Add product draft/i }));

  expect(screen.getByRole("img", { name: /Amber Musk Perfume product visual/i })).toHaveAttribute(
    "src",
    "blob:gallery-upload"
  );
  expect(screen.getAllByText(/Gallery upload: upload.svg/i).length).toBeGreaterThan(1);
});

test("allows the same perfume name when volume, audience, or notes differ", () => {
  render(<App />);

  const royalOudCardsBefore = screen.getAllByRole("heading", {
    name: /Gulefirdous Royal Oud/i,
  }).length;

  fillProductDraftForm("Gulefirdous Royal Oud");
  fireEvent.click(screen.getByRole("button", { name: /Add product draft/i }));

  expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  expect(
    screen.getAllByRole("heading", { name: /Gulefirdous Royal Oud/i })
  ).toHaveLength(royalOudCardsBefore + 1);
  expect(screen.getAllByText(/75 ml · Unisex/i).length).toBeGreaterThan(0);
});

test("warns when name, volume, audience, and notes all match an existing product", () => {
  render(<App />);

  const royalOudCardsBefore = screen.getAllByRole("heading", {
    name: /Gulefirdous Royal Oud/i,
  }).length;

  fireEvent.change(screen.getByPlaceholderText(/Example: Amber Musk Perfume/i), {
    target: { value: "Gulefirdous Royal Oud" },
  });
  fireEvent.change(screen.getByPlaceholderText("4500"), {
    target: { value: "5200" },
  });
  fireEvent.change(screen.getByPlaceholderText("30"), {
    target: { value: "28" },
  });
  fireEvent.change(screen.getByPlaceholderText("50"), {
    target: { value: "100" },
  });
  fireEvent.change(screen.getByLabelText(/^For$/i), {
    target: { value: "Men" },
  });
  fireEvent.click(screen.getByRole("button", { name: /^Oud$/i }));
  fireEvent.click(screen.getByRole("button", { name: /^Amber$/i }));
  fireEvent.click(screen.getByRole("button", { name: /^Woody$/i }));
  fireEvent.click(screen.getByRole("button", { name: /Add product draft/i }));

  expect(screen.getByRole("alert")).toHaveTextContent(
    /"Gulefirdous Royal Oud" already exists with the same name, volume, audience, and fragrance notes/i
  );
  expect(
    screen.getAllByRole("heading", { name: /Gulefirdous Royal Oud/i })
  ).toHaveLength(royalOudCardsBefore);
});

test("generates a different perfume image set on each click", async () => {
  render(<App />);

  fireEvent.click(screen.getByRole("button", { name: /Generate AI picture options/i }));
  await waitFor(() =>
    expect(
      screen.getByRole("button", { name: /Generate AI picture options/i })
    ).not.toBeDisabled()
  );

  const firstSetNote = screen.getByText(/Fresh set 1:/i).textContent;
  const firstImages = within(screen.getByLabelText(/Generated perfume picture options/i))
    .getAllByRole("img")
    .map((image) => image.getAttribute("src"));

  fireEvent.click(screen.getByRole("button", { name: /Generate AI picture options/i }));
  await waitFor(() =>
    expect(
      screen.getByRole("button", { name: /Generate AI picture options/i })
    ).not.toBeDisabled()
  );

  const secondSetNote = screen.getByText(/Fresh set 2:/i).textContent;
  const secondImages = within(screen.getByLabelText(/Generated perfume picture options/i))
    .getAllByRole("img")
    .map((image) => image.getAttribute("src"));

  expect(firstSetNote).not.toEqual(secondSetNote);
  expect(secondImages.join("|")).not.toEqual(firstImages.join("|"));
});

test("opens and closes a full perfume image preview", () => {
  render(<App />);

  fireEvent.click(screen.getAllByRole("button", { name: /Preview full image/i })[0]);

  const previewDialog = screen.getByRole("dialog", { name: /full image preview/i });
  expect(previewDialog).toBeInTheDocument();
  expect(within(previewDialog).getByRole("img", { name: /full preview/i })).toBeInTheDocument();

  fireEvent.click(screen.getByRole("button", { name: /Close preview/i }));
  expect(screen.queryByRole("dialog", { name: /full image preview/i })).not.toBeInTheDocument();
});

test("edits an existing product and shows updated details to customers", () => {
  render(<App />);

  fireEvent.click(screen.getAllByRole("button", { name: /Edit product/i })[1]);

  expect(screen.getByRole("button", { name: /Save product changes/i })).toBeInTheDocument();

  const nameInput = screen.getByPlaceholderText(/Example: Amber Musk Perfume/i);
  expect(nameInput).toHaveValue("Gulefirdous Bloom Mist");

  fireEvent.change(nameInput, {
    target: { value: "Gulefirdous Bloom Mist Limited" },
  });
  fireEvent.change(screen.getByPlaceholderText("50"), {
    target: { value: "60" },
  });
  fireEvent.click(screen.getByRole("button", { name: /^Citrus$/i }));
  fireEvent.click(screen.getByRole("button", { name: /Save product changes/i }));

  expect(screen.getAllByText(/Gulefirdous Bloom Mist Limited/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/60 ml · Women · Floral, Musk/i).length).toBeGreaterThan(0);
});