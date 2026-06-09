import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import App from "../../App";

async function signInAsAdmin(loginId = "suhaibzubair@gmail.com") {
  fireEvent.change(screen.getByPlaceholderText(/Email or mobile number/i), {
    target: { value: loginId },
  });
  fireEvent.click(screen.getByRole("button", { name: /Continue with Google/i }));
  await waitFor(() =>
    expect(screen.getByRole("heading", { name: /Admin dashboard/i })).toBeInTheDocument()
  );
}

async function signInAsClient(loginId = "client@example.com") {
  fireEvent.change(screen.getByPlaceholderText(/Email or mobile number/i), {
    target: { value: loginId },
  });
  fireEvent.click(screen.getByRole("button", { name: /Continue with Google/i }));
  await waitFor(() =>
    expect(screen.getByRole("heading", { name: /Shop perfumes/i })).toBeInTheDocument()
  );
}

function goToSidebarPage(label: string) {
  const sidebar = screen.getByLabelText(/app navigation/i);
  fireEvent.click(
    within(sidebar).getByRole("button", { name: new RegExp(`^${label}`, "i") })
  );
}

test("loads category-specific photos when the product category changes", async () => {
  render(<App />);
  await signInAsAdmin();
  goToSidebarPage("Manage products");

  expect(screen.getByText(/Perfume product photos loaded/i)).toBeInTheDocument();

  fireEvent.change(screen.getByLabelText(/Product category/i), {
    target: { value: "Gift Set" },
  });

  await waitFor(() => {
    expect(screen.getByText(/Gift Set product photos loaded/i)).toBeInTheDocument();
  });
  expect(screen.getAllByText(/Gift Set ·/i).length).toBeGreaterThan(0);
});

test("shows category management and product category picker for admin", async () => {
  render(<App />);
  await signInAsAdmin();
  goToSidebarPage("Categories");

  expect(screen.getAllByRole("heading", { name: /Product categories/i }).length).toBeGreaterThan(0);
  expect(screen.getByPlaceholderText(/Example: Candles, Hair Mist, Room Spray/i)).toBeInTheDocument();
  expect(screen.getAllByText(/Perfume/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/Gift Set/i).length).toBeGreaterThan(0);

  goToSidebarPage("Manage products");
  expect(screen.getByLabelText(/Product category/i)).toBeInTheDocument();
});

test("does not show administrator or client role buttons on login", () => {
  render(<App />);

  fireEvent.change(screen.getByPlaceholderText(/Email or mobile number/i), {
    target: { value: "suhaibzubair@gmail.com" },
  });

  expect(screen.queryByText(/suhaibzubair@gmail.com/i)).not.toBeInTheDocument();
  expect(screen.queryByRole("button", { name: /Administrator/i })).not.toBeInTheDocument();
  expect(screen.queryByRole("button", { name: /Client Order perfumes/i })).not.toBeInTheDocument();
});

test("renders the Gulefirdous MVP dashboard", async () => {
  render(<App />);

  expect(screen.getByAltText(/Gul-e-FIRDOUS Curated Elegance/i)).toBeInTheDocument();

  await signInAsAdmin();

  expect(screen.getByRole("heading", { name: /Admin dashboard/i })).toBeInTheDocument();
  expect(screen.getByText(/Total orders/i)).toBeInTheDocument();
  expect(screen.getByText(/Yearly sales/i)).toBeInTheDocument();
  expect(screen.getByText(/Sales by category/i)).toBeInTheDocument();
  expect(screen.getByText(/Social media users/i)).toBeInTheDocument();

  goToSidebarPage("Social ads");
  expect(screen.getByRole("button", { name: /Post to Facebook/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /Post to Instagram/i })).toBeInTheDocument();
});

test("lets the user edit the social ad description before posting", async () => {
  render(<App />);
  await signInAsAdmin();
  goToSidebarPage("Social ads");

  const caption = screen.getByRole("textbox", { name: /editable social ad description/i });
  expect(caption.textContent || (caption as HTMLTextAreaElement).value).toContain(
    "Gulefirdous Royal Oud"
  );

  fireEvent.change(caption, {
    target: {
      value: "Gulefirdous Royal Oud\nUse coupon REF10 for 10% off your first order.",
    },
  });

  expect((caption as HTMLTextAreaElement).value).toContain("Use coupon REF10");
  fireEvent.click(screen.getByRole("button", { name: /Post to Facebook/i }));
  expect(screen.getByText(/Facebook post published with caption/i)).toBeInTheDocument();
});

test("publishes independently to Facebook and Instagram", async () => {
  render(<App />);
  await signInAsAdmin();
  goToSidebarPage("Social ads");

  fireEvent.click(screen.getByRole("button", { name: /Post to Facebook/i }));
  expect(screen.getByText(/Facebook: Published/i)).toBeInTheDocument();
  expect(screen.getByText(/Instagram: Ready/i)).toBeInTheDocument();

  fireEvent.click(screen.getByRole("button", { name: /Post to Instagram/i }));
  expect(screen.getByText(/Instagram: Published/i)).toBeInTheDocument();
});

test("creates a customer COD order from the app storefront", async () => {
  render(<App />);
  await signInAsClient();
  await waitFor(() => expect(screen.getByText(/Client storefront/i)).toBeInTheDocument());

  const firstProductCard = screen
    .getByRole("heading", { name: /Gulefirdous Royal Oud/i })
    .closest(".gf-product-card") as HTMLElement;
  fireEvent.click(
    within(firstProductCard).getByRole("button", { name: /Order with COD/i })
  );
  await waitFor(() => {
    expect(screen.getByRole("status")).toHaveTextContent(/placed with Cash on Delivery/i);
  });
  goToSidebarPage("My orders");

  await waitFor(() => {
    expect(screen.getByText(/Cash on Delivery/i)).toBeInTheDocument();
  });
  expect(screen.getAllByText(/Client/i).length).toBeGreaterThan(0);
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
  await signInAsAdmin();
  goToSidebarPage("Manage products");

  fillProductDraftForm("Amber Musk Perfume");
  fireEvent.click(screen.getByRole("button", { name: /^Vanilla$/i }));

  fireEvent.click(screen.getByRole("button", { name: /Generate more picture options/i }));
  await waitFor(() =>
    expect(
      screen.getByRole("button", { name: /Generate more picture options/i })
    ).not.toBeDisabled()
  );
  const generatedOptions = within(
    screen.getByLabelText(/Generated perfume picture options/i)
  ).getAllByRole("button", { name: /perfume concept/i });
  fireEvent.click(generatedOptions[1]);
  fireEvent.click(screen.getByRole("button", { name: /Save & publish to WordPress/i }));

  expect(screen.getByRole("img", { name: /Amber Musk Perfume thumbnail/i })).toBeInTheDocument();
  expect(screen.getAllByText(/75 ml · Unisex · Vanilla/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/AI generated:/i).length).toBeGreaterThan(1);
});

test("offers mobile gallery image selection for product pictures", async () => {
  render(<App />);
  await signInAsAdmin();
  goToSidebarPage("Manage products");

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

test("adds a product draft with a selected gallery picture", async () => {
  render(<App />);
  await signInAsAdmin();
  goToSidebarPage("Manage products");

  const createObjectUrl = jest.fn(() => "blob:gallery-upload");

  Object.defineProperty(URL, "createObjectURL", {
    configurable: true,
    value: createObjectUrl,
  });

  fillProductDraftForm("Amber Musk Perfume");
  fireEvent.change(screen.getByLabelText(/Select from mobile gallery/i), {
    target: { files: [new File(["<svg />"], "upload.svg", { type: "image/svg+xml" })] },
  });
  fireEvent.click(screen.getByRole("button", { name: /Save & publish to WordPress/i }));

  expect(screen.getByRole("img", { name: /Amber Musk Perfume thumbnail/i })).toHaveAttribute(
    "src",
    "blob:gallery-upload"
  );
  expect(screen.getAllByText(/Gallery upload: upload.svg/i).length).toBeGreaterThan(1);
});

test("allows the same perfume name when volume, audience, or notes differ", async () => {
  render(<App />);
  await signInAsAdmin();
  goToSidebarPage("Manage products");

  const royalOudCardsBefore = screen.getAllByText(/^Gulefirdous Royal Oud$/i).length;

  fillProductDraftForm("Gulefirdous Royal Oud");
  fireEvent.click(screen.getByRole("button", { name: /Save & publish to WordPress/i }));

  expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  expect(screen.getAllByText(/^Gulefirdous Royal Oud$/i)).toHaveLength(royalOudCardsBefore + 1);
  expect(screen.getAllByText(/75 ml · Unisex/i).length).toBeGreaterThan(0);
});

test("warns when name, volume, audience, and notes all match an existing product", async () => {
  render(<App />);
  await signInAsAdmin();
  goToSidebarPage("Manage products");

  const royalOudCardsBefore = screen.getAllByText(/^Gulefirdous Royal Oud$/i).length;

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
  fireEvent.click(screen.getByRole("button", { name: /Save & publish to WordPress/i }));

  expect(screen.getByRole("alert")).toHaveTextContent(
    /"Gulefirdous Royal Oud" already exists with the same name, volume, audience, and fragrance notes/i
  );
  expect(screen.getAllByText(/^Gulefirdous Royal Oud$/i)).toHaveLength(royalOudCardsBefore);
});

test("keeps adding unique perfume images beyond the first eight", async () => {
  render(<App />);
  await signInAsAdmin();
  goToSidebarPage("Manage products");

  const imageGrid = () =>
    within(screen.getByLabelText(/Generated perfume picture options/i)).getAllByRole("img");

  const srcList = () => imageGrid().map((image) => image.getAttribute("src"));

  const initialCount = imageGrid().length;

  fireEvent.click(screen.getByRole("button", { name: /Generate more picture options/i }));
  await waitFor(() => expect(imageGrid().length).toBe(initialCount + 4));

  const afterFirstClick = srcList();

  fireEvent.click(screen.getByRole("button", { name: /Generate more picture options/i }));
  await waitFor(() => expect(imageGrid().length).toBe(initialCount + 8));

  const afterSecondClick = srcList();
  const newAfterSecondClick = afterSecondClick.filter((src) => !afterFirstClick.includes(src));
  expect(newAfterSecondClick.length).toBeGreaterThanOrEqual(4);

  fireEvent.click(screen.getByRole("button", { name: /Generate more picture options/i }));
  await waitFor(() => expect(imageGrid().length).toBe(initialCount + 12));

  expect(screen.getByText(/Added 4 new unique Perfume photos/i)).toBeInTheDocument();
});

test("opens and closes a full perfume image preview", async () => {
  render(<App />);
  await signInAsAdmin();
  goToSidebarPage("Manage products");

  fireEvent.click(screen.getAllByRole("button", { name: /Preview full image/i })[0]);

  const previewDialog = screen.getByRole("dialog", { name: /full image preview/i });
  expect(previewDialog).toBeInTheDocument();
  expect(within(previewDialog).getByRole("img", { name: /full preview/i })).toBeInTheDocument();

  fireEvent.click(screen.getByRole("button", { name: /Close preview/i }));
  expect(screen.queryByRole("dialog", { name: /full image preview/i })).not.toBeInTheDocument();
});

test("edits an existing product and shows updated details to customers", async () => {
  render(<App />);
  await signInAsAdmin();
  goToSidebarPage("Manage products");

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
