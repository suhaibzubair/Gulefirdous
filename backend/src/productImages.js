const REALISTIC_PHOTO_SETS = [
  [
    {
      label: "Emerald oud",
      url: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&h=700&q=80",
    },
    {
      label: "Rose gold mist",
      url: "https://images.unsplash.com/photo-1592945403244-b31f22829c4f?auto=format&fit=crop&w=900&h=700&q=80",
    },
    {
      label: "Midnight attar",
      url: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?auto=format&fit=crop&w=900&h=700&q=80",
    },
    {
      label: "Saffron bloom",
      url: "https://images.unsplash.com/photo-1594035910387-fea47794261b?auto=format&fit=crop&w=900&h=700&q=80",
    },
  ],
  [
    {
      label: "Velvet amber",
      url: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&h=700&q=80",
    },
    {
      label: "Silk musk",
      url: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=900&h=700&q=80",
    },
    {
      label: "Noir oud",
      url: "https://images.unsplash.com/photo-1523293182086-67f61a7be9a3?auto=format&fit=crop&w=900&h=700&q=80",
    },
    {
      label: "Desert rose",
      url: "https://images.unsplash.com/photo-1631214524028-4cbd4b1a8e8e?auto=format&fit=crop&w=900&h=700&q=80",
    },
  ],
];

function pickPhotoSet(seed = Date.now()) {
  const index = Math.abs(seed) % REALISTIC_PHOTO_SETS.length;
  return REALISTIC_PHOTO_SETS[index];
}

function createRealisticImageOptions(productName, seed = Date.now()) {
  const photoSet = pickPhotoSet(seed);

  return photoSet.map((photo, index) => ({
    id: `${photo.label}-${seed}-${index}`,
    label: photo.label,
    url: photo.url,
    source: "AI generated",
  }));
}

module.exports = {
  REALISTIC_PHOTO_SETS,
  createRealisticImageOptions,
  pickPhotoSet,
};
