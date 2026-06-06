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

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  description: string;
  link: string;
  sourceCode: string;
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
    };

    setProducts((current) => [product, ...current]);
    setSelectedProductId(product.id);
    setNewProduct({ name: "", price: "", stock: "" });
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

          <div className="gf-product-list">
            {products.map((product) => (
              <button
                type="button"
                className={product.id === selectedProductId ? "active" : ""}
                key={product.id}
                onClick={() => setSelectedProductId(product.id)}
              >
                <span>{product.name}</span>
                <small>
                  {formatPrice(product.price)} - {product.stock} in stock
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
                <div className="gf-bottle" />
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
