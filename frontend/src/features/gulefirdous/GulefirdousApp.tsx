import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  basePhotoKey,
  collectSeenPhotoKeys,
  createNextImageBatch,
  defaultRealisticImageOptions,
  totalPhotoPoolSize,
  type ImageSource,
  type ProductImageOption,
} from "./productImages";
import "./GulefirdousApp.scss";

type Platform = "facebook" | "instagram";
type PublishStatus = "Ready" | "Published";
type OrderStatus =
  | "Order Placed"
  | "COD Confirmed"
  | "Processing"
  | "Shipped"
  | "Delivered";
type ProductAudience = "Men" | "Women" | "Unisex";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  volumeMl: number;
  audience: ProductAudience;
  notes: string[];
  description: string;
  link: string;
  sourceCode: string;
  imageUrl: string;
  imageSource: ImageSource;
  imageLabel: string;
}

const FRAGRANCE_NOTE_OPTIONS = [
  "Floral",
  "Citrus",
  "Vanilla",
  "Oud",
  "Musk",
  "Woody",
  "Amber",
  "Spicy",
  "Fruity",
] as const;

const emptyProductForm = {
  name: "",
  price: "",
  stock: "",
  volumeMl: "50",
  audience: "Unisex" as ProductAudience,
  notes: [] as string[],
};

interface Order {
  id: string;
  customer: string;
  productId: number;
  total: number;
  paymentMethod: "Cash on Delivery";
  source: string;
  status: OrderStatus;
  trackingNumber?: string;
}

interface Engagement {
  id: number;
  platform: "Facebook" | "Instagram";
  product: string;
  type: "Like" | "Comment";
  message: string;
  time: string;
}

const statusOrder: OrderStatus[] = [
  "Order Placed",
  "COD Confirmed",
  "Processing",
  "Shipped",
  "Delivered",
];

const initialProducts: Product[] = [
  {
    id: 1,
    name: "Gulefirdous Royal Oud",
    category: "Perfume",
    price: 5200,
    stock: 28,
    description: "Warm oud, amber, and floral musk perfume for premium gifting.",
    link: "https://gulefirdous.com/product/gulefirdous-royal-oud/",
    sourceCode: "ROYAL-OUD",
    volumeMl: 100,
    audience: "Men",
    notes: ["Oud", "Amber", "Woody"],
    imageUrl: defaultRealisticImageOptions[0].url,
    imageSource: "AI generated",
    imageLabel: defaultRealisticImageOptions[0].label,
  },
  {
    id: 2,
    name: "Gulefirdous Bloom Mist",
    category: "Perfume",
    price: 3800,
    stock: 41,
    description: "Fresh rose, citrus, and soft musk fragrance for daily wear.",
    link: "https://gulefirdous.com/product/gulefirdous-bloom-mist/",
    sourceCode: "BLOOM-MIST",
    volumeMl: 50,
    audience: "Women",
    notes: ["Floral", "Citrus", "Musk"],
    imageUrl: defaultRealisticImageOptions[1].url,
    imageSource: "AI generated",
    imageLabel: defaultRealisticImageOptions[1].label,
  },
  {
    id: 3,
    name: "Heritage Attar Gift Set",
    category: "Gift Set",
    price: 7400,
    stock: 16,
    description: "A luxury attar selection with premium packaging.",
    link: "https://gulefirdous.com/product/heritage-attar-gift-set/",
    sourceCode: "ATTAR-SET",
    volumeMl: 30,
    audience: "Unisex",
    notes: ["Vanilla", "Spicy", "Amber"],
    imageUrl: defaultRealisticImageOptions[3].url,
    imageSource: "AI generated",
    imageLabel: defaultRealisticImageOptions[3].label,
  },
];

const initialOrders: Order[] = [
  {
    id: "GF-1007",
    customer: "Ayesha Khan",
    productId: 1,
    total: 5200,
    paymentMethod: "Cash on Delivery",
    source: "Instagram",
    status: "Processing",
    trackingNumber: "TCS-778811",
  },
  {
    id: "GF-1008",
    customer: "Omar Ali",
    productId: 3,
    total: 7400,
    paymentMethod: "Cash on Delivery",
    source: "Website",
    status: "Order Placed",
  },
];

const initialEngagement: Engagement[] = [
  {
    id: 1,
    platform: "Instagram",
    product: "Gulefirdous Royal Oud",
    type: "Comment",
    message: "Is delivery available through TCS?",
    time: "2 min ago",
  },
  {
    id: 2,
    platform: "Facebook",
    product: "Heritage Attar Gift Set",
    type: "Like",
    message: "New page reaction received",
    time: "11 min ago",
  },
];

function formatPrice(value: number) {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(value);
}

function withSource(product: Product, platform: string) {
  return `${product.link}?utm_source=${platform.toLowerCase()}&utm_campaign=${product.sourceCode.toLowerCase()}`;
}

function normalizeProductName(name: string) {
  return name.trim().toLowerCase();
}

function normalizeFragranceNotes(notes: string[]) {
  return [...notes].sort().join("|");
}

function findDuplicateProduct(
  products: Product[],
  name: string,
  volumeMl: number,
  audience: ProductAudience,
  notes: string[],
  excludeId?: number
) {
  const normalized = normalizeProductName(name);
  const noteKey = normalizeFragranceNotes(notes);

  return products.find(
    (product) =>
      product.id !== excludeId &&
      normalizeProductName(product.name) === normalized &&
      product.volumeMl === volumeMl &&
      product.audience === audience &&
      normalizeFragranceNotes(product.notes) === noteKey
  );
}

function formatDuplicateDetails(product: Product) {
  const noteText = product.notes.length ? product.notes.join(", ") : "no notes selected";

  return `${product.volumeMl} ml, ${product.audience}, notes: ${noteText}`;
}

function buildProductSlug(name: string, volumeMl: number) {
  return `${slugifyProductName(name)}-${volumeMl}ml`;
}

function buildProductDescription(volumeMl: number, audience: ProductAudience, notes: string[]) {
  const noteText = notes.length ? notes.join(", ") : "signature notes";

  return `${volumeMl} ml ${audience.toLowerCase()} fragrance with ${noteText.toLowerCase()} notes.`;
}

function formatProductMeta(product: Product) {
  const noteText = product.notes.length ? product.notes.join(", ") : "Signature blend";

  return `${product.volumeMl} ml · ${product.audience} · ${noteText}`;
}

function slugifyProductName(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function GulefirdousApp() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [selectedProductId, setSelectedProductId] = useState(initialProducts[0].id);
  const [publishStatus, setPublishStatus] = useState<Record<Platform, PublishStatus>>({
    facebook: "Ready",
    instagram: "Ready",
  });
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [engagements, setEngagements] = useState<Engagement[]>(initialEngagement);
  const [newProduct, setNewProduct] = useState({ ...emptyProductForm });
  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [productFormError, setProductFormError] = useState("");
  const [imageOptions, setImageOptions] =
    useState<ProductImageOption[]>(defaultRealisticImageOptions);
  const [selectedImage, setSelectedImage] = useState<ProductImageOption>(
    defaultRealisticImageOptions[0]
  );
  const [isGeneratingImages, setIsGeneratingImages] = useState(false);
  const [imageGenerationNote, setImageGenerationNote] = useState(
    "Glass perfume bottle photos only. Click generate for a fresh flacon set."
  );
  const [imageGenerationCount, setImageGenerationCount] = useState(0);
  const seenPhotoKeysRef = useRef(
    new Set(defaultRealisticImageOptions.map((image) => basePhotoKey(image.url)))
  );
  const seenImageIdsRef = useRef(collectSeenPhotoKeys(defaultRealisticImageOptions));
  const [imagePreview, setImagePreview] = useState<{
    url: string;
    label: string;
    source?: string;
  } | null>(null);

  useEffect(() => {
    if (!imagePreview) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setImagePreview(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [imagePreview]);

  const selectedProduct = useMemo(
    () => products.find((product) => product.id === selectedProductId) || products[0],
    [products, selectedProductId]
  );
  const latestOrder = orders[0];
  const latestOrderProduct =
    products.find((product) => product.id === latestOrder.productId) || products[0];

  const postCaption = useMemo(() => {
    const noteText = selectedProduct.notes.length
      ? selectedProduct.notes.join(", ")
      : "Signature blend";

    return `${selectedProduct.name}\n${selectedProduct.description}\n${selectedProduct.volumeMl} ml · ${selectedProduct.audience} · ${noteText}\nPrice: ${formatPrice(
      selectedProduct.price
    )}\nOrder now: ${withSource(selectedProduct, "facebook")}`;
  }, [selectedProduct]);

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const instagramOrders = orders.filter((order) => order.source === "Instagram").length;
  const facebookOrders = orders.filter((order) => order.source === "Facebook").length;

  const publishPost = (platform: Platform) => {
    setPublishStatus((current) => ({ ...current, [platform]: "Published" }));
    setEngagements((current) => [
      {
        id: Date.now(),
        platform: platform === "facebook" ? "Facebook" : "Instagram",
        product: selectedProduct.name,
        type: "Comment",
        message:
          platform === "facebook"
            ? "Facebook post published. Comments and reactions will appear here."
            : "Instagram post published. Link is included as tracked campaign text.",
        time: "Just now",
      },
      ...current,
    ]);
  };

  const resetProductForm = () => {
    setNewProduct({ ...emptyProductForm });
    setEditingProductId(null);
    setProductFormError("");
  };

  const toggleFragranceNote = (note: string) => {
    setNewProduct((current) => ({
      ...current,
      notes: current.notes.includes(note)
        ? current.notes.filter((item) => item !== note)
        : [...current.notes, note],
    }));
  };

  const startEditingProduct = (product: Product) => {
    setEditingProductId(product.id);
    setSelectedProductId(product.id);
    setProductFormError("");
    setNewProduct({
      name: product.name,
      price: String(product.price),
      stock: String(product.stock),
      volumeMl: String(product.volumeMl),
      audience: product.audience,
      notes: [...product.notes],
    });
    setSelectedImage({
      id: `existing-${product.id}`,
      label: product.imageLabel,
      url: product.imageUrl,
      source: product.imageSource,
    });
  };

  const saveProduct = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setProductFormError("");

    const trimmedName = newProduct.name.trim();

    if (!trimmedName || !newProduct.price || !newProduct.stock || !newProduct.volumeMl) {
      setProductFormError("Product name, price, stock, and volume (ml) are required.");
      return;
    }

    const volumeMl = Number(newProduct.volumeMl);

    if (!Number.isFinite(volumeMl) || volumeMl <= 0) {
      setProductFormError("Enter a valid volume in milliliters (for example 50 or 100).");
      return;
    }

    const duplicate = findDuplicateProduct(
      products,
      trimmedName,
      volumeMl,
      newProduct.audience,
      newProduct.notes,
      editingProductId ?? undefined
    );

    if (duplicate) {
      setProductFormError(
        `"${trimmedName}" already exists with the same name, volume, audience, and fragrance notes (${formatDuplicateDetails(
          duplicate
        )}). Edit that product or change one of these details.`
      );
      return;
    }

    const description = buildProductDescription(volumeMl, newProduct.audience, newProduct.notes);
    const slug = buildProductSlug(trimmedName, volumeMl);

    if (editingProductId) {
      setProducts((current) =>
        current.map((product) =>
          product.id === editingProductId
            ? {
                ...product,
                name: trimmedName,
                price: Number(newProduct.price),
                stock: Number(newProduct.stock),
                volumeMl,
                audience: newProduct.audience,
                notes: [...newProduct.notes],
                description,
                link: `https://gulefirdous.com/product/${slug}/`,
                sourceCode: `${trimmedName.toUpperCase().replace(/[^A-Z0-9]+/g, "-")}-${volumeMl}ML`,
                imageUrl: selectedImage.url,
                imageSource: selectedImage.source,
                imageLabel: selectedImage.label,
              }
            : product
        )
      );
      setSelectedProductId(editingProductId);
      resetProductForm();
      return;
    }

    const product: Product = {
      id: Date.now(),
      name: trimmedName,
      category: "Perfume",
      price: Number(newProduct.price),
      stock: Number(newProduct.stock),
      volumeMl,
      audience: newProduct.audience,
      notes: [...newProduct.notes],
      description,
      link: `https://gulefirdous.com/product/${slug}/`,
      sourceCode: `${trimmedName.toUpperCase().replace(/[^A-Z0-9]+/g, "-")}-${volumeMl}ML`,
      imageUrl: selectedImage.url,
      imageSource: selectedImage.source,
      imageLabel: selectedImage.label,
    };

    setProducts((current) => [product, ...current]);
    setSelectedProductId(product.id);
    resetProductForm();
  };

  const generateImageOptions = () => {
    const productName = newProduct.name || "Gulefirdous Perfume";
    const nextGenerationCount = imageGenerationCount + 1;
    const nonce = Date.now();

    setIsGeneratingImages(true);

    const result = createNextImageBatch(
      productName,
      nextGenerationCount,
      seenPhotoKeysRef.current,
      nonce
    );

    setImageOptions((current) => {
      const freshImages = result.images.filter(
        (image) => !seenImageIdsRef.current.has(image.id)
      );

      freshImages.forEach((image) => {
        seenImageIdsRef.current.add(image.id);
      });

      const mergedImages = [...current, ...freshImages];

      setImageGenerationNote(
        freshImages.length > 0
          ? `Added ${freshImages.length} new unique photos · ${mergedImages.length} total shown (${totalPhotoPoolSize} base bottles in library). Keep clicking for more.`
          : "Could not find new photos. Try again for fresh style variations."
      );

      if (freshImages[0]) {
        setSelectedImage(freshImages[0]);
      }

      return mergedImages;
    });
    setImageGenerationCount(nextGenerationCount);
    setIsGeneratingImages(false);
  };

  const selectGalleryImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (typeof URL !== "undefined" && URL.createObjectURL) {
      setSelectedImage({
        id: `gallery-${file.name}-${Date.now()}`,
        label: file.name,
        url: URL.createObjectURL(file),
        source: "Gallery upload",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const galleryImage: ProductImageOption = {
        id: `gallery-${file.name}-${Date.now()}`,
        label: file.name,
        url: String(reader.result),
        source: "Gallery upload",
      };

      setSelectedImage(galleryImage);
    };
    reader.readAsDataURL(file);
  };

  const placeOrder = (product: Product, source: string) => {
    const order: Order = {
      id: `GF-${Math.floor(1000 + Math.random() * 9000)}`,
      customer: "Demo Customer",
      productId: product.id,
      total: product.price,
      paymentMethod: "Cash on Delivery",
      source,
      status: "Order Placed",
    };

    setOrders((current) => [order, ...current]);
  };

  const openImagePreview = (preview: { url: string; label: string; source?: string }) => {
    setImagePreview(preview);
  };

  const advanceOrder = (orderId: string) => {
    setOrders((current) =>
      current.map((order) => {
        if (order.id !== orderId) {
          return order;
        }

        const currentIndex = statusOrder.indexOf(order.status);
        const nextStatus = statusOrder[Math.min(currentIndex + 1, statusOrder.length - 1)];

        return {
          ...order,
          status: nextStatus,
          trackingNumber:
            nextStatus === "Shipped" && !order.trackingNumber
              ? `TCS-${Math.floor(100000 + Math.random() * 900000)}`
              : order.trackingNumber,
        };
      })
    );
  };

  return (
    <main className="gf-app">
      <section className="gf-hero">
        <div className="gf-brand">
          <div className="gf-logo" aria-label="Gulefirdous perfume logo">
            GF
          </div>
          <div>
            <p className="gf-eyebrow">Fragrance of Humanity</p>
            <h1>Gulefirdous commerce and social publishing app</h1>
            <p>
              Manage WordPress products, publish posts to Facebook and Instagram, receive
              engagement notifications, and process COD orders with TCS tracking.
            </p>
          </div>
        </div>
        <div className="gf-hero-card">
          <span>Version 1 focus</span>
          <strong>WordPress + customer app + admin dashboard</strong>
          <p>WooCommerce is not installed yet, so this build prepares the connection flow.</p>
        </div>
      </section>

      <section className="gf-stats" aria-label="App readiness">
        <article>
          <span>WooCommerce</span>
          <strong>Setup required</strong>
          <p>Install plugin, create API keys, then sync products.</p>
        </article>
        <article>
          <span>Meta channels</span>
          <strong>Facebook + Instagram</strong>
          <p>Separate publish buttons with per-platform status.</p>
        </article>
        <article>
          <span>Payments</span>
          <strong>COD first</strong>
          <p>JazzCash, Easypaisa, and bank gateways can follow.</p>
        </article>
        <article>
          <span>Delivery</span>
          <strong>TCS tracking</strong>
          <p>Admin adds tracking numbers for customer visibility.</p>
        </article>
      </section>

      <section className="gf-grid">
        <article className="gf-panel gf-wide">
          <div className="gf-panel-title">
            <div>
              <p className="gf-eyebrow">Admin</p>
              <h2>WordPress product upload and sync</h2>
            </div>
            <span className="gf-pill">gulefirdous.com</span>
          </div>

          <div className="gf-checklist">
            <div>
              <strong>1. Install WooCommerce</strong>
              <p>Required before the app can create products or read orders.</p>
            </div>
            <div>
              <strong>2. Add COD and TCS shipping rules</strong>
              <p>Pakistan COD first; international checkout needs an online payment option later.</p>
            </div>
            <div>
              <strong>3. Create API credentials</strong>
              <p>Use WooCommerce REST keys to sync catalog, inventory, and orders.</p>
            </div>
          </div>

          <form className="gf-product-form" onSubmit={saveProduct}>
            <div className="gf-product-form-grid">
              <label>
                Product name
                <input
                  value={newProduct.name}
                  onChange={(event) => {
                    setProductFormError("");
                    setNewProduct((current) => ({ ...current, name: event.target.value }));
                  }}
                  placeholder="Example: Amber Musk Perfume"
                />
              </label>
              <label>
                Price (PKR)
                <input
                  value={newProduct.price}
                  onChange={(event) =>
                    setNewProduct((current) => ({ ...current, price: event.target.value }))
                  }
                  inputMode="numeric"
                  placeholder="4500"
                />
              </label>
              <label>
                Stock
                <input
                  value={newProduct.stock}
                  onChange={(event) =>
                    setNewProduct((current) => ({ ...current, stock: event.target.value }))
                  }
                  inputMode="numeric"
                  placeholder="30"
                />
              </label>
              <label>
                Volume (ml)
                <input
                  value={newProduct.volumeMl}
                  onChange={(event) =>
                    setNewProduct((current) => ({ ...current, volumeMl: event.target.value }))
                  }
                  inputMode="numeric"
                  placeholder="50"
                  required
                />
              </label>
              <label>
                For
                <select
                  value={newProduct.audience}
                  onChange={(event) =>
                    setNewProduct((current) => ({
                      ...current,
                      audience: event.target.value as ProductAudience,
                    }))
                  }
                >
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Unisex">Unisex</option>
                </select>
              </label>
            </div>

            <fieldset className="gf-note-picker">
              <legend>Fragrance notes</legend>
              <div className="gf-note-options">
                {FRAGRANCE_NOTE_OPTIONS.map((note) => (
                  <button
                    key={note}
                    type="button"
                    className={newProduct.notes.includes(note) ? "active" : ""}
                    aria-pressed={newProduct.notes.includes(note)}
                    onClick={() => toggleFragranceNote(note)}
                  >
                    {note}
                  </button>
                ))}
              </div>
            </fieldset>

            {productFormError ? (
              <p className="gf-form-alert" role="alert">
                {productFormError}
              </p>
            ) : null}

            <div className="gf-form-actions">
              <button type="submit">
                {editingProductId ? "Save product changes" : "Add product draft"}
              </button>
              {editingProductId ? (
                <button type="button" className="gf-secondary-button" onClick={resetProductForm}>
                  Cancel edit
                </button>
              ) : null}
            </div>
          </form>

          <div className="gf-image-tools">
            <div className="gf-panel-title">
              <div>
                <p className="gf-eyebrow">Product pictures</p>
                <h3>Choose AI generated or mobile gallery image</h3>
              </div>
            </div>
            <p className="gf-image-note">{imageGenerationNote}</p>
            <div className="gf-image-actions">
              <button
                type="button"
                onClick={() => {
                  void generateImageOptions();
                }}
                disabled={isGeneratingImages}
              >
                {isGeneratingImages
                  ? "Generating realistic photos..."
                  : "Generate more picture options"}
              </button>
              <label className="gf-gallery-picker" htmlFor="product-gallery-image">
                Select from mobile gallery
                <input
                  id="product-gallery-image"
                  type="file"
                  accept="image/*"
                  onClick={(event) => {
                    event.currentTarget.value = "";
                  }}
                  onChange={selectGalleryImage}
                />
              </label>
            </div>
            <div className="gf-image-options" aria-label="Generated perfume picture options">
              {imageOptions.map((option) => (
                <article
                  key={option.id}
                  className={`gf-image-option-card ${
                    selectedImage.id === option.id ? "active" : ""
                  }`}
                >
                  <button
                    type="button"
                    className="gf-image-option-select"
                    onClick={() => setSelectedImage(option)}
                    aria-pressed={selectedImage.id === option.id}
                  >
                    <div className="gf-image-frame gf-image-frame-option">
                      <img src={option.url} alt={`${option.label} perfume concept`} />
                    </div>
                    <span>{option.label}</span>
                  </button>
                  <button
                    type="button"
                    className="gf-preview-button"
                    onClick={() =>
                      openImagePreview({
                        url: option.url,
                        label: option.label,
                        source: option.source,
                      })
                    }
                  >
                    Preview
                  </button>
                </article>
              ))}
            </div>
            <div className="gf-selected-image">
              <div className="gf-image-frame gf-image-frame-selected">
                <img src={selectedImage.url} alt="Selected perfume product visual" />
              </div>
              <div>
                <strong>Selected image</strong>
                <p>
                  {selectedImage.source}: {selectedImage.label}. This image will be attached to
                  the next product draft.
                </p>
                <button
                  type="button"
                  className="gf-preview-button"
                  onClick={() =>
                    openImagePreview({
                      url: selectedImage.url,
                      label: selectedImage.label,
                      source: selectedImage.source,
                    })
                  }
                >
                  Preview full image
                </button>
              </div>
            </div>
          </div>

          <div className="gf-product-list">
            {products.map((product) => (
              <article
                className={product.id === selectedProductId ? "active" : ""}
                key={product.id}
              >
                <button
                  type="button"
                  className="gf-product-select"
                  onClick={() => setSelectedProductId(product.id)}
                >
                  <div className="gf-image-frame gf-image-frame-thumb">
                    <img src={product.imageUrl} alt={`${product.name} thumbnail`} />
                  </div>
                  <span>{product.name}</span>
                  <small>{formatProductMeta(product)}</small>
                  <small>
                    {formatPrice(product.price)} - {product.stock} in stock
                  </small>
                  <small>
                    {product.imageSource}: {product.imageLabel}
                  </small>
                </button>
                <div className="gf-product-list-actions">
                  <button
                    type="button"
                    className="gf-preview-button"
                    onClick={() =>
                      openImagePreview({
                        url: product.imageUrl,
                        label: product.name,
                        source: product.imageSource,
                      })
                    }
                  >
                    Preview image
                  </button>
                  <button
                    type="button"
                    className="gf-edit-product"
                    onClick={() => startEditingProduct(product)}
                  >
                    Edit product
                  </button>
                </div>
              </article>
            ))}
          </div>
        </article>

        <article className="gf-panel">
          <div className="gf-panel-title">
            <div>
              <p className="gf-eyebrow">Post builder</p>
              <h2>Auto-filled social ad</h2>
            </div>
          </div>
          <label className="gf-select-label">
            Select product
            <select
              value={selectedProductId}
              onChange={(event) => setSelectedProductId(Number(event.target.value))}
            >
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </label>
          <pre className="gf-caption">{postCaption}</pre>
          <div className="gf-publish-actions">
            <button type="button" onClick={() => publishPost("facebook")}>
              Post to Facebook
            </button>
            <button type="button" onClick={() => publishPost("instagram")}>
              Post to Instagram
            </button>
          </div>
          <div className="gf-platform-status">
            <span>Facebook: {publishStatus.facebook}</span>
            <span>Instagram: {publishStatus.instagram}</span>
          </div>
        </article>

        <article className="gf-panel">
          <div className="gf-panel-title">
            <div>
              <p className="gf-eyebrow">Engagement inbox</p>
              <h2>Likes and comments</h2>
            </div>
          </div>
          <div className="gf-feed">
            {engagements.map((item) => (
              <div key={item.id} className="gf-feed-item">
                <span>{item.platform}</span>
                <strong>{item.type}</strong>
                <p>{item.message}</p>
                <small>
                  {item.product} - {item.time}
                </small>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="gf-grid">
        <article className="gf-panel gf-wide">
          <div className="gf-panel-title">
            <div>
              <p className="gf-eyebrow">Customer app</p>
              <h2>Shop products and place COD orders</h2>
            </div>
            <span className="gf-pill">Android + iPhone ready UX</span>
          </div>
          <div className="gf-shop">
            {products.map((product) => (
              <div className="gf-product-card" key={product.id}>
                <div className="gf-product-image-wrap">
                  <div className="gf-image-frame gf-image-frame-shop">
                    <img
                      className="gf-product-image"
                      src={product.imageUrl}
                      alt={`${product.name} product visual`}
                    />
                  </div>
                  <button
                    type="button"
                    className="gf-preview-button"
                    onClick={() =>
                      openImagePreview({
                        url: product.imageUrl,
                        label: product.name,
                        source: product.imageSource,
                      })
                    }
                  >
                    Preview full image
                  </button>
                </div>
                <span>
                  {product.category} · {product.audience}
                </span>
                <h3>{product.name}</h3>
                <p className="gf-product-meta">{formatProductMeta(product)}</p>
                <p>{product.description}</p>
                {product.notes.length ? (
                  <div className="gf-note-tags">
                    {product.notes.map((note) => (
                      <span key={note}>{note}</span>
                    ))}
                  </div>
                ) : null}
                <strong>{formatPrice(product.price)}</strong>
                <button type="button" onClick={() => placeOrder(product, "App")}>
                  Order with COD
                </button>
              </div>
            ))}
          </div>
          <div className="gf-inline-tracking">
            <div>
              <p className="gf-eyebrow">Latest customer order</p>
              <h3>{latestOrder.id}</h3>
              <p>
                {latestOrder.customer} ordered {latestOrderProduct.name} through{" "}
                {latestOrder.source}.
              </p>
              <strong>{latestOrder.paymentMethod}</strong>
            </div>
            <div className="gf-timeline">
              {statusOrder.map((status, index) => (
                <span
                  key={status}
                  className={index <= statusOrder.indexOf(latestOrder.status) ? "done" : ""}
                >
                  {status}
                </span>
              ))}
            </div>
            <div className="gf-order-actions">
              <span>Tracking: {latestOrder.trackingNumber || "Waiting for shipment"}</span>
              <button type="button" onClick={() => advanceOrder(latestOrder.id)}>
                Move to next status
              </button>
            </div>
          </div>
        </article>

        <article className="gf-panel">
          <div className="gf-panel-title">
            <div>
              <p className="gf-eyebrow">Discounts</p>
              <h2>Referral and source tracking</h2>
            </div>
          </div>
          <div className="gf-coupons">
            <div>
              <strong>REF10</strong>
              <span>10% first order referral discount</span>
            </div>
            <div>
              <strong>INSTA10</strong>
              <span>Instagram source campaign</span>
            </div>
            <div>
              <strong>FB10</strong>
              <span>Facebook source campaign</span>
            </div>
          </div>
          <div className="gf-metrics">
            <span>Total revenue</span>
            <strong>{formatPrice(totalRevenue)}</strong>
            <small>
              Instagram orders: {instagramOrders} | Facebook orders: {facebookOrders}
            </small>
          </div>
        </article>
      </section>

      <section className="gf-panel">
        <div className="gf-panel-title">
          <div>
            <p className="gf-eyebrow">Admin and customer</p>
            <h2>Order management and tracking</h2>
          </div>
          <span className="gf-pill">Courier: TCS</span>
        </div>
        <div className="gf-order-table">
          {orders.map((order) => {
            const product = products.find((item) => item.id === order.productId) || products[0];

            return (
              <article key={order.id} className="gf-order-row">
                <span>{order.id}</span>
                <strong>{product.name}</strong>
                <p>
                  {order.customer} - {order.paymentMethod} - Source: {order.source}
                </p>
                <small>{formatPrice(order.total)}</small>
                <em>{order.status}</em>
                <div>
                  <small>{order.trackingNumber || "Waiting for shipment"}</small>
                  <button type="button" onClick={() => advanceOrder(order.id)}>
                    Next status
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {imagePreview ? (
        <div
          className="gf-image-preview-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={`Full image preview: ${imagePreview.label}`}
          onClick={() => setImagePreview(null)}
        >
          <div
            className="gf-image-preview-panel"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="gf-preview-close"
              onClick={() => setImagePreview(null)}
            >
              Close preview
            </button>
            <div className="gf-image-frame gf-image-frame-preview">
              <img src={imagePreview.url} alt={`${imagePreview.label} full preview`} />
            </div>
            <p className="gf-preview-caption">
              <strong>{imagePreview.label}</strong>
              {imagePreview.source ? <span>{imagePreview.source}</span> : null}
            </p>
          </div>
        </div>
      ) : null}
    </main>
  );
}

export default GulefirdousApp;
