const apiBaseUrl =
  process.env.REACT_APP_GULEFIRDOUS_API_BASE_URL || "http://localhost:4000";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Gulefirdous API request failed");
  }

  return data;
}

export interface WooProductPayload {
  name: string;
  price: number;
  description?: string;
  stock_quantity?: number;
  images?: Array<{ src: string }>;
}

export function fetchWooProducts(search?: string) {
  const query = search ? `?search=${encodeURIComponent(search)}` : "";
  return request<{ products: unknown[] }>(`/api/products${query}`);
}

export function createWooProduct(product: WooProductPayload) {
  return request<{ product: unknown }>("/api/products", {
    method: "POST",
    body: JSON.stringify(product),
  });
}

export function fetchWooOrders(status?: string) {
  const query = status ? `?status=${encodeURIComponent(status)}` : "";
  return request<{ orders: unknown[] }>(`/api/orders${query}`);
}

export function updateWooOrderStatus(orderId: string, status: string) {
  return request<{ order: unknown }>(`/api/orders/${orderId}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

export interface GeneratedProductImage {
  id: string;
  label: string;
  url: string;
  source: "AI generated" | "Gallery upload";
}

export function generateProductImages(productName: string, seed?: number) {
  return request<{
    images: GeneratedProductImage[];
    mode: string;
    message?: string;
  }>("/api/product-images/generate", {
    method: "POST",
    body: JSON.stringify({ productName, seed }),
  });
}
