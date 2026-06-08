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

export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  wooCommerceId?: number | null;
  createdAt?: string;
}

export function fetchCategories() {
  return request<{ categories: ProductCategory[] }>("/api/categories");
}

export function createCategory(name: string, description = "") {
  return request<{ category: ProductCategory }>("/api/categories", {
    method: "POST",
    body: JSON.stringify({ name, description }),
  });
}

export function generateProductImages(
  productName: string,
  options?: {
    seed?: number;
    generationCount?: number;
    previousSetKey?: string;
    category?: string;
  }
) {
  const controller = new AbortController();
  const timeoutId = globalThis.setTimeout(() => controller.abort(), 10000);

  return request<{
    images: GeneratedProductImage[];
    seed?: number;
    setKey?: string;
    mode: string;
    message?: string;
  }>("/api/product-images/generate", {
    method: "POST",
    signal: controller.signal,
    body: JSON.stringify({
      productName,
      category: options?.category,
      seed: options?.seed,
      generationCount: options?.generationCount,
      previousSetKey: options?.previousSetKey,
    }),
  }).finally(() => {
    globalThis.clearTimeout(timeoutId);
  });
}
