export type ImageSource = "AI generated" | "Gallery upload";

export interface ProductImageOption {
  id: string;
  label: string;
  url: string;
  source: ImageSource;
}

type PhotoPoolEntry = { label: string; url: string };

const BATCH_SIZE = 4;

export const FALLBACK_PRODUCT_IMAGE_URL =
  "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&h=700&q=80";

export function handleProductImageError(event: { currentTarget: HTMLImageElement }) {
  const image = event.currentTarget;

  if (image.dataset.fallbackApplied === "true") {
    return;
  }

  image.dataset.fallbackApplied = "true";
  image.src = FALLBACK_PRODUCT_IMAGE_URL;
}

const PERFUME_PHOTOS: PhotoPoolEntry[] = [
  {
    label: "Emerald glass oud",
    url: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&h=700&q=80",
  },
  {
    label: "Rose gold flacon",
    url: "https://images.unsplash.com/photo-1458538977777-0549b2370168?auto=format&fit=crop&w=900&h=700&q=80",
  },
  {
    label: "Crystal amber bottle",
    url: "https://images.unsplash.com/photo-1543422655-ac1c6ca993ed?auto=format&fit=crop&w=900&h=700&q=80",
  },
  {
    label: "Noir glass perfume",
    url: "https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop",
  },
  {
    label: "Vintage glass parfum",
    url: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=900&h=700&q=80",
  },
  {
    label: "Amber studio flacon",
    url: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=900&h=700&q=80",
  },
  {
    label: "Soft pink perfume",
    url: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=900&h=700&q=80",
  },
  {
    label: "Classic square flacon",
    url: "https://images.unsplash.com/photo-1543422655-ac1c6ca993ed?auto=format&fit=crop&w=900&h=700&q=80",
  },
  {
    label: "Pearl glass bottle",
    url: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=900&h=700&q=80",
  },
  {
    label: "Blush glass perfume",
    url: "https://images.unsplash.com/photo-1458538977777-0549b2370168?auto=format&fit=crop&w=900&h=700&q=80",
  },
];

const GIFT_SET_PHOTOS: PhotoPoolEntry[] = [
  {
    label: "Twin luxury flacons",
    url: "https://images.unsplash.com/photo-1622618991746-fe6004db3a47?auto=format&fit=crop&w=900&h=700&q=80",
  },
  {
    label: "Ribbon gift box set",
    url: "https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&w=900&h=700&q=80",
  },
  {
    label: "Gold cap duo set",
    url: "https://images.pexels.com/photos/3360268/pexels-photo-3360268.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop",
  },
  {
    label: "Boutique gift packaging",
    url: "https://images.pexels.com/photos/3327412/pexels-photo-3327412.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop",
  },
  {
    label: "Satin rose gift pair",
    url: "https://images.unsplash.com/photo-1622618991746-fe6004db3a47?auto=format&fit=crop&w=900&h=700&q=80",
  },
  {
    label: "Clear luxury duo",
    url: "https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop",
  },
  {
    label: "Ivory presentation set",
    url: "https://images.pexels.com/photos/5316920/pexels-photo-5316920.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop",
  },
  {
    label: "Premium boxed collection",
    url: "https://images.pexels.com/photos/18946587/pexels-photo-18946587.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop",
  },
];

const ATTAR_PHOTOS: PhotoPoolEntry[] = [
  {
    label: "Midnight glass attar",
    url: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=900&h=700&q=80",
  },
  {
    label: "Dark oud decanter",
    url: "https://images.pexels.com/photos/1103905/pexels-photo-1103905.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop",
  },
  {
    label: "Matte black attar",
    url: "https://images.pexels.com/photos/1103905/pexels-photo-1103905.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop",
  },
  {
    label: "Onyx studio attar",
    url: "https://images.pexels.com/photos/18946587/pexels-photo-18946587.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop",
  },
  {
    label: "Golden attar vial",
    url: "https://images.pexels.com/photos/3327412/pexels-photo-3327412.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop",
  },
  {
    label: "Heritage oud bottle",
    url: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=900&h=700&q=80",
  },
  {
    label: "Royal attar flask",
    url: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&h=700&q=80",
  },
  {
    label: "Noir oud presentation",
    url: "https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop",
  },
];

const BODY_MIST_PHOTOS: PhotoPoolEntry[] = [
  {
    label: "Frosted glass mist",
    url: "https://images.pexels.com/photos/4202325/pexels-photo-4202325.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop",
  },
  {
    label: "Champagne mist bottle",
    url: "https://images.pexels.com/photos/4202325/pexels-photo-4202325.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop",
  },
  {
    label: "Minimal clear mist",
    url: "https://images.pexels.com/photos/5316920/pexels-photo-5316920.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop",
  },
  {
    label: "Soft pink body mist",
    url: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=900&h=700&q=80",
  },
  {
    label: "Sleek spray flacon",
    url: "https://images.pexels.com/photos/5316920/pexels-photo-5316920.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop",
  },
  {
    label: "Fresh citrus mist",
    url: "https://images.unsplash.com/photo-1622618991746-fe6004db3a47?auto=format&fit=crop&w=900&h=700&q=80",
  },
  {
    label: "Pearl mist bottle",
    url: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=900&h=700&q=80",
  },
  {
    label: "Blush daily mist",
    url: "https://images.unsplash.com/photo-1458538977777-0549b2370168?auto=format&fit=crop&w=900&h=700&q=80",
  },
];

const CANDLE_PHOTOS: PhotoPoolEntry[] = [
  {
    label: "Amber jar candle",
    url: "https://images.pexels.com/photos/6692599/pexels-photo-6692599.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop",
  },
  {
    label: "Luxury scented candle",
    url: "https://images.pexels.com/photos/6551505/pexels-photo-6551505.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop",
  },
  {
    label: "Warm glow candle",
    url: "https://images.pexels.com/photos/6692599/pexels-photo-6692599.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop",
  },
  {
    label: "Spa candle trio",
    url: "https://images.pexels.com/photos/3828896/pexels-photo-3828896.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop",
  },
  {
    label: "Minimal white candle",
    url: "https://images.pexels.com/photos/6063895/pexels-photo-6063895.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop",
  },
  {
    label: "Evening scented candle",
    url: "https://images.pexels.com/photos/3828896/pexels-photo-3828896.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop",
  },
  {
    label: "Rose wax candle",
    url: "https://images.pexels.com/photos/3828896/pexels-photo-3828896.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop",
  },
  {
    label: "Boutique candle jar",
    url: "https://images.pexels.com/photos/6551505/pexels-photo-6551505.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop",
  },
];

const CATEGORY_POOL_MAP: Record<string, PhotoPoolEntry[]> = {
  perfume: PERFUME_PHOTOS,
  "gift-set": GIFT_SET_PHOTOS,
  attar: ATTAR_PHOTOS,
  "body-mist": BODY_MIST_PHOTOS,
  candles: CANDLE_PHOTOS,
};

const CROP_WIDTHS = [760, 820, 860, 900, 940];
const CROP_HEIGHTS = [620, 660, 700, 740, 780];

export function normalizeCategoryKey(category = "") {
  return (
    category
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || "perfume"
  );
}

export function resolvePhotoPoolForCategory(category = "Perfume"): PhotoPoolEntry[] {
  const key = normalizeCategoryKey(category);

  if (CATEGORY_POOL_MAP[key]) {
    return CATEGORY_POOL_MAP[key];
  }

  if (key.includes("gift")) {
    return GIFT_SET_PHOTOS;
  }

  if (key.includes("attar") || key.includes("oud")) {
    return ATTAR_PHOTOS;
  }

  if (key.includes("mist") || key.includes("spray")) {
    return BODY_MIST_PHOTOS;
  }

  if (key.includes("candle")) {
    return CANDLE_PHOTOS;
  }

  return PERFUME_PHOTOS;
}

export function getPhotoPoolSize(category = "Perfume") {
  return resolvePhotoPoolForCategory(category).length;
}

function hashSeed(parts: Array<string | number>) {
  let hash = 2166136261;

  for (const part of parts) {
    const text = String(part);

    for (let index = 0; index < text.length; index += 1) {
      hash ^= text.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
  }

  return Math.abs(hash);
}

function withGenerationToken(url: string, token: string) {
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}gen=${token}`;
}

export function basePhotoKey(url: string) {
  return url.split("?")[0];
}

function applyCropVariant(url: string, variant: number, generationCount: number) {
  const width = CROP_WIDTHS[(variant + generationCount) % CROP_WIDTHS.length];
  const height = CROP_HEIGHTS[(variant + generationCount * 2) % CROP_HEIGHTS.length];

  if (/w=\d+/.test(url)) {
    return url.replace(/w=\d+/g, `w=${width}`).replace(/h=\d+/g, `h=${height}`);
  }

  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}w=${width}&h=${height}&fit=crop`;
}

function toImageOption(
  photo: PhotoPoolEntry,
  token: string,
  index: number,
  category: string,
  labelSuffix = ""
): ProductImageOption {
  const baseLabel = `${category} · ${photo.label}`;

  return {
    id: `${normalizeCategoryKey(category)}-${photo.label}-${token}-${index}`,
    label: labelSuffix ? `${baseLabel} · ${labelSuffix}` : baseLabel,
    url: withGenerationToken(photo.url, token),
    source: "AI generated",
  };
}

export function collectSeenPhotoKeys(images: ProductImageOption[]) {
  return new Set(images.map((image) => image.id));
}

export function createRealisticImageOptions(
  productName: string,
  seed = Date.now(),
  category = "Perfume"
): ProductImageOption[] {
  const seenKeys = new Set<string>();
  return createNextImageBatch(productName, 0, seenKeys, seed, BATCH_SIZE, category).images;
}

export function createNextImageBatch(
  productName: string,
  generationCount: number,
  seenKeys: Set<string>,
  nonce = Date.now(),
  batchSize = BATCH_SIZE,
  category = "Perfume"
) {
  const batch: ProductImageOption[] = [];
  const photoPool = resolvePhotoPoolForCategory(category);
  const poolSize = photoPool.length;
  const productKey = productName.trim().toLowerCase() || "gulefirdous-product";
  const categoryKey = normalizeCategoryKey(category);
  const startOffset =
    (hashSeed([categoryKey, productKey, generationCount, nonce]) + generationCount * batchSize) %
    poolSize;

  for (let step = 0; step < poolSize && batch.length < batchSize; step += 1) {
    const photo = photoPool[(startOffset + step) % poolSize];
    const key = `${categoryKey}-${basePhotoKey(photo.url)}`;

    if (seenKeys.has(key)) {
      continue;
    }

    const token = `${generationCount}-${nonce}-${step}`;
    batch.push(toImageOption(photo, token, batch.length, category));
    seenKeys.add(key);
  }

  if (batch.length < batchSize) {
    const variantPass = Math.max(1, Math.floor(seenKeys.size / poolSize));

    for (let step = 0; step < poolSize * 3 && batch.length < batchSize; step += 1) {
      const photo = photoPool[(startOffset + step + generationCount) % poolSize];
      const variantKey = `${categoryKey}-${basePhotoKey(photo.url)}-variant-${variantPass}-g${generationCount}`;

      if (seenKeys.has(variantKey)) {
        continue;
      }

      const token = `${generationCount}-variant-${variantPass}-${nonce}-${step}`;
      const variantUrl = applyCropVariant(photo.url, variantPass, generationCount);

      batch.push({
        id: `${categoryKey}-${photo.label}-${token}`,
        label: `${category} · ${photo.label} · style ${variantPass}`,
        url: withGenerationToken(variantUrl, token),
        source: "AI generated",
      });
      seenKeys.add(variantKey);
    }
  }

  return {
    images: batch,
    generationCount,
    totalShown: seenKeys.size,
    category,
    poolSize,
  };
}

export const defaultRealisticImageOptions = createRealisticImageOptions(
  "Gulefirdous Perfume",
  1,
  "Perfume"
);

export const totalPhotoPoolSize = PERFUME_PHOTOS.length;
