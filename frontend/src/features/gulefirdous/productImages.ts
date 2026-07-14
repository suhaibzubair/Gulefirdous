export type ImageSource = "AI generated" | "Gallery upload";

export interface ProductImageOption {
  id: string;
  label: string;
  url: string;
  source: ImageSource;
  /** Base64 data URL for gallery uploads that must be sent to WordPress media. */
  dataUrl?: string;
}

type PhotoPoolEntry = { label: string; url: string };

const BATCH_SIZE = 4;

const pexelsUrl = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop`;

export const FALLBACK_PRODUCT_IMAGE_URL = pexelsUrl(3785147);

export function handleProductImageError(event: { currentTarget: HTMLImageElement }) {
  const image = event.currentTarget;

  if (image.dataset.fallbackApplied === "true") {
    return;
  }

  image.dataset.fallbackApplied = "true";
  image.src = FALLBACK_PRODUCT_IMAGE_URL;
}

const PERFUME_PHOTOS: PhotoPoolEntry[] = [
  { label: "Emerald glass oud", url: pexelsUrl(2736497) },
  { label: "Rose gold flacon", url: pexelsUrl(4041392) },
  { label: "Crystal amber bottle", url: pexelsUrl(4041391) },
  { label: "Noir glass perfume", url: pexelsUrl(3785147) },
  { label: "Vintage glass parfum", url: pexelsUrl(4465121) },
  { label: "Amber studio flacon", url: pexelsUrl(3059609) },
  { label: "Soft pink perfume", url: pexelsUrl(4938275) },
  { label: "Classic square flacon", url: pexelsUrl(3059644) },
  { label: "Pearl glass bottle", url: pexelsUrl(4050393) },
  { label: "Blush glass perfume", url: pexelsUrl(4050383) },
];

const GIFT_SET_PHOTOS: PhotoPoolEntry[] = [
  { label: "Twin luxury flacons", url: pexelsUrl(965990) },
  { label: "Ribbon gift box set", url: pexelsUrl(4465124) },
  { label: "Gold cap duo set", url: pexelsUrl(3360268) },
  { label: "Boutique gift packaging", url: pexelsUrl(3327412) },
  { label: "Satin rose gift pair", url: pexelsUrl(965991) },
  { label: "Clear luxury duo", url: pexelsUrl(965989) },
  { label: "Ivory presentation set", url: pexelsUrl(5316920) },
  { label: "Premium boxed collection", url: pexelsUrl(18946587) },
];

const ATTAR_PHOTOS: PhotoPoolEntry[] = [
  { label: "Midnight glass attar", url: pexelsUrl(3738345) },
  { label: "Dark oud decanter", url: pexelsUrl(1103905) },
  { label: "Matte black attar", url: pexelsUrl(3738387) },
  { label: "Onyx studio attar", url: pexelsUrl(18946587) },
  { label: "Golden attar vial", url: pexelsUrl(3327412) },
  { label: "Heritage oud bottle", url: pexelsUrl(4041398) },
  { label: "Royal attar flask", url: pexelsUrl(4870707) },
  { label: "Noir oud presentation", url: pexelsUrl(3785147) },
];

const BODY_MIST_PHOTOS: PhotoPoolEntry[] = [
  { label: "Frosted glass mist", url: pexelsUrl(4202325) },
  { label: "Champagne mist bottle", url: pexelsUrl(7246345) },
  { label: "Minimal clear mist", url: pexelsUrl(5316920) },
  { label: "Soft pink body mist", url: pexelsUrl(4938275) },
  { label: "Sleek spray flacon", url: pexelsUrl(8128083) },
  { label: "Fresh citrus mist", url: pexelsUrl(5553534) },
  { label: "Pearl mist bottle", url: pexelsUrl(4050393) },
  { label: "Blush daily mist", url: pexelsUrl(4050383) },
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
