import type { SyntheticEvent } from "react";

export type ImageSource = "AI generated" | "Gallery upload";

export const PRODUCT_IMAGE_FALLBACK =
  "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&h=700&q=80";

export function handleProductImageError(event: SyntheticEvent<HTMLImageElement>) {
  const image = event.currentTarget;

  if (image.src !== PRODUCT_IMAGE_FALLBACK) {
    image.src = PRODUCT_IMAGE_FALLBACK;
  }
}

export interface ProductImageOption {
  id: string;
  label: string;
  url: string;
  source: ImageSource;
}

type PhotoPoolEntry = { label: string; url: string };

const BATCH_SIZE = 4;

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
    url: "https://images.unsplash.com/photo-1731972206777-d9f796597a60?auto=format&fit=crop&w=900&h=700&q=80",
  },
  {
    label: "Amber studio flacon",
    url: "https://images.unsplash.com/photo-1716978499366-d5a84bf1fe70?auto=format&fit=crop&w=900&h=700&q=80",
  },
  {
    label: "Soft pink perfume",
    url: "https://images.unsplash.com/photo-1595425959632-34f2822322ce?auto=format&fit=crop&w=900&h=700&q=80",
  },
  {
    label: "Classic square flacon",
    url: "https://images.unsplash.com/photo-1739390346134-a9b564de5dfc?auto=format&fit=crop&w=900&h=700&q=80",
  },
  {
    label: "Pearl glass bottle",
    url: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=900&h=700&q=80",
  },
  {
    label: "Blush glass perfume",
    url: "https://images.unsplash.com/photo-1585218334450-afcf929da36e?auto=format&fit=crop&w=900&h=700&q=80",
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
    url: "https://images.unsplash.com/photo-1610113233329-1c73b6f7fe98?auto=format&fit=crop&w=900&h=700&q=80",
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
    url: "https://images.pexels.com/photos/1037989/pexels-photo-1037989.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop",
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
    url: "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop",
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
    url: "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop",
  },
  {
    label: "Champagne mist bottle",
    url: "https://images.pexels.com/photos/4202325/pexels-photo-4202325.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop",
  },
  {
    label: "Minimal clear mist",
    url: "https://images.pexels.com/photos/4467687/pexels-photo-4467687.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop",
  },
  {
    label: "Soft pink body mist",
    url: "https://images.pexels.com/photos/6169656/pexels-photo-6169656.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop",
  },
  {
    label: "Sleek spray flacon",
    url: "https://images.pexels.com/photos/5316920/pexels-photo-5316920.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop",
  },
  {
    label: "Fresh citrus mist",
    url: "https://images.pexels.com/photos/2733918/pexels-photo-2733918.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop",
  },
  {
    label: "Pearl mist bottle",
    url: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=900&h=700&q=80",
  },
  {
    label: "Blush daily mist",
    url: "https://images.pexels.com/photos/2849742/pexels-photo-2849742.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop",
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
    url: "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop",
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
    url: "https://images.pexels.com/photos/5473184/pexels-photo-5473184.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop",
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
