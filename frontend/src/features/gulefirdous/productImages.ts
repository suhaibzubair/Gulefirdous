export type ImageSource = "AI generated" | "Gallery upload";

export interface ProductImageOption {
  id: string;
  label: string;
  url: string;
  source: ImageSource;
}

// Curated glass perfume flacon photos only (no skincare tubes or cream jars).
const REALISTIC_PHOTO_SETS: Array<Array<{ label: string; url: string }>> = [
  [
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
  ],
  [
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
  ],
];

function pickPhotoSet(seed = Date.now()) {
  const index = Math.abs(seed) % REALISTIC_PHOTO_SETS.length;
  return REALISTIC_PHOTO_SETS[index];
}

export function createRealisticImageOptions(
  productName: string,
  seed = Date.now()
): ProductImageOption[] {
  const photoSet = pickPhotoSet(seed);

  return photoSet.map((photo, index) => ({
    id: `${photo.label}-${seed}-${index}`,
    label: photo.label,
    url: photo.url,
    source: "AI generated",
  }));
}

export const defaultRealisticImageOptions = createRealisticImageOptions("Gulefirdous Perfume", 1);
