import React, { useMemo, useState } from "react";
import "./GulefirdousApp.scss";

type Platform = "facebook" | "instagram";
type PublishStatus = "Ready" | "Published";
type OrderStatus =
  | "Order Placed"
  | "COD Confirmed"
  | "Processing"
  | "Shipped"
  | "Delivered";
type ImageSource = "AI generated" | "Gallery upload";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  description: string;
  link: string;
  sourceCode: string;
  imageUrl: string;
  imageSource: ImageSource;
  imageLabel: string;
}

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

interface ProductImageOption {
  id: string;
  label: string;
  url: string;
  source: ImageSource;
}

const statusOrder: OrderStatus[] = [
  "Order Placed",
  "COD Confirmed",
  "Processing",
  "Shipped",
  "Delivered",
];

const imagePalettes = [
  { name: "Emerald oud", background: "#12372d", accent: "#e7be6f", glow: "#f8e4ad" },
  { name: "Rose gold mist", background: "#6f2d3f", accent: "#f4c2c2", glow: "#fff0d8" },
  { name: "Midnight attar", background: "#172033", accent: "#9fc5e8", glow: "#d7ecff" },
  { name: "Saffron bloom", background: "#8d4f18", accent: "#f6c453", glow: "#fff3c2" },
];

function escapeSvgText(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function createPerfumeImageDataUrl(name: string, palette = imagePalettes[0]) {
  const title = escapeSvgText(name || "Gulefirdous Perfume");
  const subtitle = escapeSvgText(palette.name);
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="900" height="700" viewBox="0 0 900 700">
  <defs>
    <radialGradient id="glow" cx="50%" cy="32%" r="58%">
      <stop offset="0%" stop-color="${palette.glow}" stop-opacity="0.9"/>
      <stop offset="52%" stop-color="${palette.accent}" stop-opacity="0.28"/>
      <stop offset="100%" stop-color="${palette.background}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="bottle" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${palette.accent}" stop-opacity="0.95"/>
      <stop offset="50%" stop-color="#fff8e8" stop-opacity="0.72"/>
      <stop offset="100%" stop-color="${palette.accent}" stop-opacity="0.78"/>
    </linearGradient>
  </defs>
  <rect width="900" height="700" rx="48" fill="${palette.background}"/>
  <circle cx="450" cy="250" r="330" fill="url(#glow)"/>
  <path d="M170 560 C270 460 268 310 170 220 C310 258 340 400 302 560 Z" fill="${palette.accent}" opacity="0.17"/>
  <path d="M730 560 C630 460 632 310 730 220 C590 258 560 400 598 560 Z" fill="${palette.accent}" opacity="0.17"/>
  <rect x="392" y="104" width="116" height="70" rx="18" fill="${palette.accent}"/>
  <rect x="360" y="156" width="180" height="82" rx="26" fill="#fff4d8" opacity="0.95"/>
  <rect x="300" y="218" width="300" height="360" rx="88" fill="url(#bottle)" stroke="#fff7d7" stroke-width="6"/>
  <rect x="352" y="330" width="196" height="142" rx="32" fill="${palette.background}" opacity="0.88" stroke="${palette.accent}" stroke-width="4"/>
  <text x="450" y="395" text-anchor="middle" font-family="Georgia, serif" font-size="54" fill="${palette.accent}" letter-spacing="8">GF</text>
  <text x="450" y="438" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" fill="#fff8e8">${subtitle}</text>
  <text x="450" y="630" text-anchor="middle" font-family="Arial, sans-serif" font-size="34" font-weight="700" fill="#fff8e8">${title}</text>
</svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function createImageOptions(productName: string): ProductImageOption[] {
  return imagePalettes.map((palette, index) => ({
    id: `${palette.name}-${index}`,
    label: palette.name,
    url: createPerfumeImageDataUrl(productName, palette),
    source: "AI generated",
  }));
}

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
    imageUrl: createPerfumeImageDataUrl("Gulefirdous Royal Oud", imagePalettes[0]),
    imageSource: "AI generated",
    imageLabel: imagePalettes[0].name,
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
    imageUrl: createPerfumeImageDataUrl("Gulefirdous Bloom Mist", imagePalettes[1]),
    imageSource: "AI generated",
    imageLabel: imagePalettes[1].name,
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
    imageUrl: createPerfumeImageDataUrl("Heritage Attar Gift Set", imagePalettes[3]),
    imageSource: "AI generated",
    imageLabel: imagePalettes[3].name,
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

function GulefirdousApp() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [selectedProductId, setSelectedProductId] = useState(initialProducts[0].id);
  const [publishStatus, setPublishStatus] = useState<Record<Platform, PublishStatus>>({
    facebook: "Ready",
    instagram: "Ready",
  });
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [engagements, setEngagements] = useState<Engagement[]>(initialEngagement);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    stock: "",
  });
  const [imageOptions, setImageOptions] = useState<ProductImageOption[]>(
    createImageOptions("Gulefirdous Perfume")
  );
  const [selectedImage, setSelectedImage] = useState<ProductImageOption>(imageOptions[0]);

  const selectedProduct = useMemo(
    () => products.find((product) => product.id === selectedProductId) || products[0],
    [products, selectedProductId]
  );
  const latestOrder = orders[0];
  const latestOrderProduct =
    products.find((product) => product.id === latestOrder.productId) || products[0];

  const postCaption = useMemo(() => {
    return `${selectedProduct.name}\n${selectedProduct.description}\nPrice: ${formatPrice(
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

  const addProduct = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newProduct.name || !newProduct.price || !newProduct.stock) {
      return;
    }

    const product: Product = {
      id: Date.now(),
      name: newProduct.name,
      category: "Perfume",
      price: Number(newProduct.price),
      stock: Number(newProduct.stock),
      description: "New fragrance product ready to sync with WooCommerce.",
      link: `https://gulefirdous.com/product/${newProduct.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")}/`,
      sourceCode: newProduct.name.toUpperCase().replace(/[^A-Z0-9]+/g, "-"),
      imageUrl: selectedImage.url,
      imageSource: selectedImage.source,
      imageLabel: selectedImage.label,
    };

    setProducts((current) => [product, ...current]);
    setSelectedProductId(product.id);
    setNewProduct({ name: "", price: "", stock: "" });
    const resetOptions = createImageOptions("Gulefirdous Perfume");
    setImageOptions(resetOptions);
    setSelectedImage(resetOptions[0]);
  };

  const generateImageOptions = () => {
    const options = createImageOptions(newProduct.name || "Gulefirdous Perfume");
    setImageOptions(options);
    setSelectedImage(options[0]);
  };

  const selectGalleryImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
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

          <form className="gf-product-form" onSubmit={addProduct}>
            <label>
              Product name
              <input
                value={newProduct.name}
                onChange={(event) =>
                  setNewProduct((current) => ({ ...current, name: event.target.value }))
                }
                placeholder="Example: Amber Musk Perfume"
              />
            </label>
            <label>
              Price
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
            <button type="submit">Add product draft</button>
          </form>

          <div className="gf-image-tools">
            <div className="gf-panel-title">
              <div>
                <p className="gf-eyebrow">Product pictures</p>
                <h3>Choose AI generated or mobile gallery image</h3>
              </div>
            </div>
            <div className="gf-image-actions">
              <button type="button" onClick={generateImageOptions}>
                Generate AI picture options
              </button>
              <label className="gf-gallery-picker">
                Select from mobile gallery
                <input type="file" accept="image/*" onChange={selectGalleryImage} />
              </label>
            </div>
            <div className="gf-image-options" aria-label="Generated perfume picture options">
              {imageOptions.map((option) => (
                <button
                  type="button"
                  key={option.id}
                  className={selectedImage.id === option.id ? "active" : ""}
                  onClick={() => setSelectedImage(option)}
                  aria-pressed={selectedImage.id === option.id}
                >
                  <img src={option.url} alt={`${option.label} perfume concept`} />
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
            <div className="gf-selected-image">
              <img src={selectedImage.url} alt="Selected perfume product visual" />
              <div>
                <strong>Selected image</strong>
                <p>
                  {selectedImage.source}: {selectedImage.label}. This image will be attached to
                  the next product draft.
                </p>
              </div>
            </div>
          </div>

          <div className="gf-product-list">
            {products.map((product) => (
              <button
                type="button"
                className={product.id === selectedProductId ? "active" : ""}
                key={product.id}
                onClick={() => setSelectedProductId(product.id)}
              >
                <img src={product.imageUrl} alt={`${product.name} thumbnail`} />
                <span>{product.name}</span>
                <small>
                  {formatPrice(product.price)} - {product.stock} in stock
                </small>
                <small>
                  {product.imageSource}: {product.imageLabel}
                </small>
              </button>
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
                <img
                  className="gf-product-image"
                  src={product.imageUrl}
                  alt={`${product.name} product visual`}
                />
                <span>{product.category}</span>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
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
    </main>
  );
}

export default GulefirdousApp;
