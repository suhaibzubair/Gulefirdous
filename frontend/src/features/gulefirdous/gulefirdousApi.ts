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
  status?: "publish" | "draft";
  catalog_visibility?: "visible" | "catalog" | "search" | "hidden";
  stock_status?: "instock" | "outofstock" | "onbackorder";
  categories?: Array<{ id: number }>;
  images?: Array<{ src: string }>;
}

export interface WooCreatedProduct {
  id: number;
  name: string;
  permalink: string;
  slug?: string;
  status?: string;
}

export function getPublishableImageUrl(url: string): string | undefined {
  if (!url || url.startsWith("blob:") || !/^https?:\/\//i.test(url)) {
    return undefined;
  }

  if (/pexels\.com/i.test(url)) {
    return url;
  }

  if (/\.(jpe?g|png|webp)(\?|$)/i.test(url)) {
    return url;
  }

  return undefined;
}

export function buildWooProductPayload(input: {
  name: string;
  price: number;
  description: string;
  stock: number;
  categoryWooCommerceId?: number | null;
  imageUrl?: string;
}): WooProductPayload {
  const payload: WooProductPayload = {
    name: input.name,
    price: input.price,
    description: input.description,
    stock_quantity: input.stock,
    status: "publish",
    catalog_visibility: "visible",
    stock_status: input.stock > 0 ? "instock" : "outofstock",
  };

  if (input.categoryWooCommerceId) {
    payload.categories = [{ id: input.categoryWooCommerceId }];
  }

  const imageSrc = input.imageUrl ? getPublishableImageUrl(input.imageUrl) : undefined;
  if (imageSrc) {
    payload.images = [{ src: imageSrc }];
  }

  return payload;
}

export function fetchWooProducts(search?: string, perPage = 100) {
  const params = new URLSearchParams();

  if (search) {
    params.set("search", search);
  }

  if (perPage) {
    params.set("perPage", String(perPage));
  }

  const query = params.toString();
  return request<{ products: WooCreatedProduct[] }>(`/api/products${query ? `?${query}` : ""}`);
}

export function slugifyWooProductName(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function findWooProductMatch(
  localName: string,
  wooProducts: WooCreatedProduct[]
): WooCreatedProduct | undefined {
  const normalized = localName.trim().toLowerCase();
  const localSlug = slugifyWooProductName(localName);

  return wooProducts.find((product) => {
    const nameMatch = product.name.trim().toLowerCase() === normalized;
    const slugMatch = product.slug === localSlug;
    const permalinkMatch = product.permalink?.toLowerCase().includes(`/${localSlug}/`);

    return nameMatch || slugMatch || permalinkMatch;
  });
}

export function mergeProductsWithWooCommerce<
  T extends { name: string; link: string; wooCommerceId?: number },
>(localProducts: T[], wooProducts: WooCreatedProduct[]): T[] {
  return localProducts.map((product) => {
    const match = findWooProductMatch(product.name, wooProducts);

    if (!match) {
      return product;
    }

    return {
      ...product,
      wooCommerceId: match.id,
      link: match.permalink,
    };
  });
}

export function createWooProduct(product: WooProductPayload) {
  return request<{ product: WooCreatedProduct }>("/api/products", {
    method: "POST",
    body: JSON.stringify(product),
  });
}

export function updateWooProduct(productId: number, product: WooProductPayload) {
  return request<{ product: WooCreatedProduct }>(`/api/products/${productId}`, {
    method: "PUT",
    body: JSON.stringify(product),
  });
}

async function publishWooProductPayload(product: WooProductPayload, existingProductId?: number) {
  if (existingProductId) {
    return updateWooProduct(existingProductId, product);
  }

  return createWooProduct(product);
}

export async function publishWooProduct(product: WooProductPayload, existingProductId?: number) {
  try {
    return await publishWooProductPayload(product, existingProductId);
  } catch (error) {
    const message = error instanceof Error ? error.message.toLowerCase() : "";
    if (product.images?.length && message.includes("image")) {
      const { images, ...rest } = product;
      return publishWooProductPayload(rest, existingProductId);
    }

    throw error;
  }
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
