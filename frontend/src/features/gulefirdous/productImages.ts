export type ImageSource = "AI generated" | "Gallery upload";

export interface ProductImageOption {
  id: string;
  label: string;
  url: string;
  source: ImageSource;
}

const OPTION_COUNT = 4;

// Curated glass perfume flacon photos only (no skincare tubes or cream jars).
const REALISTIC_PHOTO_POOL: Array<{ label: string; url: string }> = [
  {
    label: "Emerald glass oud",
    url: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&h=700&q=80",
  },
  {
    label: "Rose gold flacon",
    url: "https://images.unsplash.com/photo-1458538977777-0549b2370168?auto=format&fit=crop&w=900&h=700&q=80",
  },
  {
    label: "Midnight glass attar",
    url: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=900&h=700&q=80",
  },
  {
    label: "Crystal amber bottle",
    url: "https://images.unsplash.com/photo-1543422655-ac1c6ca993ed?auto=format&fit=crop&w=900&h=700&q=80",
  },
  {
    label: "Twin glass flacons",
    url: "https://images.unsplash.com/photo-1622618991746-fe6004db3a47?auto=format&fit=crop&w=900&h=700&q=80",
  },
  {
    label: "Clear luxury bottle",
    url: "https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop",
  },
  {
    label: "Golden cap flacon",
    url: "https://images.pexels.com/photos/3360268/pexels-photo-3360268.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop",
  },
  {
    label: "Noir glass perfume",
    url: "https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop",
  },
  {
    label: "Satin rose bottle",
    url: "https://images.unsplash.com/photo-1592945403240-b6ae04040493?auto=format&fit=crop&w=900&h=700&q=80",
  },
  {
    label: "Vintage glass parfum",
    url: "https://images.unsplash.com/photo-1615634260167-c8cdede0be93?auto=format&fit=crop&w=900&h=700&q=80",
  },
  {
    label: "Amber studio flacon",
    url: "https://images.unsplash.com/photo-1619994407353-a7934441ba96?auto=format&fit=crop&w=900&h=700&q=80",
  },
  {
    label: "Soft pink perfume",
    url: "https://images.unsplash.com/photo-1594035910387-fea477ed73fe?auto=format&fit=crop&w=900&h=700&q=80",
  },
  {
    label: "Minimal clear bottle",
    url: "https://images.unsplash.com/photo-1563170351-82e2fdf2495a?auto=format&fit=crop&w=900&h=700&q=80",
  },
  {
    label: "Dark oud decanter",
    url: "https://images.unsplash.com/photo-1588400133328-18562b372bf1?auto=format&fit=crop&w=900&h=700&q=80",
  },
  {
    label: "Classic square flacon",
    url: "https://images.unsplash.com/photo-1523293182086-82c8e283b531?auto=format&fit=crop&w=900&h=700&q=80",
  },
  {
    label: "Pearl glass bottle",
    url: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=900&h=700&q=80",
  },
  {
    label: "Matte black perfume",
    url: "https://images.pexels.com/photos/1103905/pexels-photo-1103905.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop",
  },
  {
    label: "Frosted glass mist",
    url: "https://images.pexels.com/photos/2982287/pexels-photo-2982287.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop",
  },
  {
    label: "Gold accent bottle",
    url: "https://images.pexels.com/photos/3327412/pexels-photo-3327412.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop",
  },
  {
    label: "Sleek noir flacon",
    url: "https://images.pexels.com/photos/5316920/pexels-photo-5316920.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop",
  },
];

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

function mulberry32(seed: number) {
  let state = seed;

  return function random() {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffleWithSeed<T>(items: T[], seed: number) {
  const random = mulberry32(seed);
  const copy = [...items];

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }

  return copy;
}

function withGenerationToken(url: string, token: string) {
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}gen=${token}`;
}

export function buildGenerationSeed(
  productName: string,
  timestamp = Date.now(),
  generationCount = 0
) {
  return hashSeed([
    productName.trim().toLowerCase() || "gulefirdous-perfume",
    timestamp,
    generationCount,
    Math.floor(Math.random() * 1_000_000),
  ]);
}

export function createRealisticImageOptions(
  productName: string,
  seed = Date.now()
): ProductImageOption[] {
  const normalizedSeed = hashSeed([seed, productName.trim().toLowerCase() || "gulefirdous-perfume"]);
  const shuffled = shuffleWithSeed(REALISTIC_PHOTO_POOL, normalizedSeed);

  return shuffled.slice(0, OPTION_COUNT).map((photo, index) => ({
    id: `${photo.label}-${normalizedSeed}-${index}`,
    label: photo.label,
    url: withGenerationToken(photo.url, `${normalizedSeed}-${index}`),
    source: "AI generated",
  }));
}

export function imageSetKey(images: ProductImageOption[]) {
  return images
    .map((image) => image.url)
    .sort()
    .join("|");
}

export function createUniqueRealisticImageOptions(
  productName: string,
  seed: number,
  previousSetKey = ""
) {
  let attempt = 0;
  let nextSeed = seed;
  let images = createRealisticImageOptions(productName, nextSeed);
  let setKey = imageSetKey(images);

  while (setKey === previousSetKey && attempt < 12) {
    attempt += 1;
    nextSeed = hashSeed([seed, attempt, productName]);
    images = createRealisticImageOptions(productName, nextSeed);
    setKey = imageSetKey(images);
  }

  return { images, setKey, seed: nextSeed };
}

export const defaultRealisticImageOptions = createRealisticImageOptions("Gulefirdous Perfume", 1);
