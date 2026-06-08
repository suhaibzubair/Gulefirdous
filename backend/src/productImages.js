const BATCH_SIZE = 4;

const REALISTIC_PHOTO_POOL = [
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
  {
    label: "Ivory boutique bottle",
    url: "https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&w=900&h=700&q=80",
  },
  {
    label: "Champagne mist bottle",
    url: "https://images.pexels.com/photos/4202325/pexels-photo-4202325.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop",
  },
  {
    label: "Onyx studio flacon",
    url: "https://images.pexels.com/photos/18946587/pexels-photo-18946587.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop",
  },
  {
    label: "Blush glass perfume",
    url: "https://images.unsplash.com/photo-1557170331-0e5d046c770f?auto=format&fit=crop&w=900&h=700&q=80",
  },
];

const CROP_WIDTHS = [760, 820, 860, 900, 940];
const CROP_HEIGHTS = [620, 660, 700, 740, 780];

function hashSeed(parts) {
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

function withGenerationToken(url, token) {
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}gen=${token}`;
}

function basePhotoKey(url) {
  return url.split("?")[0];
}

function applyCropVariant(url, variant, generationCount) {
  const width = CROP_WIDTHS[(variant + generationCount) % CROP_WIDTHS.length];
  const height = CROP_HEIGHTS[(variant + generationCount * 2) % CROP_HEIGHTS.length];

  if (/w=\d+/.test(url)) {
    return url.replace(/w=\d+/g, `w=${width}`).replace(/h=\d+/g, `h=${height}`);
  }

  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}w=${width}&h=${height}&fit=crop`;
}

function toImageOption(photo, token, index, labelSuffix = "") {
  return {
    id: `${photo.label}-${token}-${index}`,
    label: labelSuffix ? `${photo.label} · ${labelSuffix}` : photo.label,
    url: withGenerationToken(photo.url, token),
    source: "AI generated",
  };
}

function createRealisticImageOptions(productName, seed = Date.now()) {
  const seenKeys = new Set();
  return createNextImageBatch(productName, 0, seenKeys, seed, BATCH_SIZE).images;
}

function createNextImageBatch(
  productName,
  generationCount,
  seenKeys,
  nonce = Date.now(),
  batchSize = BATCH_SIZE
) {
  const batch = [];
  const poolSize = REALISTIC_PHOTO_POOL.length;
  const productKey = (productName || "gulefirdous-perfume").trim().toLowerCase();
  const startOffset =
    (hashSeed([productKey, generationCount, nonce]) + generationCount * batchSize) % poolSize;

  for (let step = 0; step < poolSize && batch.length < batchSize; step += 1) {
    const photo = REALISTIC_PHOTO_POOL[(startOffset + step) % poolSize];
    const key = basePhotoKey(photo.url);

    if (seenKeys.has(key)) {
      continue;
    }

    const token = `${generationCount}-${nonce}-${step}`;
    batch.push(toImageOption(photo, token, batch.length));
    seenKeys.add(key);
  }

  if (batch.length < batchSize) {
    const variantPass = Math.max(1, Math.floor(seenKeys.size / poolSize));

    for (let step = 0; step < poolSize * 3 && batch.length < batchSize; step += 1) {
      const photo = REALISTIC_PHOTO_POOL[(startOffset + step + generationCount) % poolSize];
      const variantKey = `${basePhotoKey(photo.url)}-variant-${variantPass}-g${generationCount}`;

      if (seenKeys.has(variantKey)) {
        continue;
      }

      const token = `${generationCount}-variant-${variantPass}-${nonce}-${step}`;
      const variantUrl = applyCropVariant(photo.url, variantPass, generationCount);

      batch.push({
        id: `${photo.label}-${token}`,
        label: `${photo.label} · style ${variantPass}`,
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
  };
}

module.exports = {
  REALISTIC_PHOTO_POOL,
  createRealisticImageOptions,
  createNextImageBatch,
  totalPhotoPoolSize: REALISTIC_PHOTO_POOL.length,
};
