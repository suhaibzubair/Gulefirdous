const fs = require("node:fs");
const path = require("node:path");

const DEFAULT_CATEGORIES = [
  {
    id: 1,
    name: "Perfume",
    slug: "perfume",
    description: "Premium perfumes for men and women",
    wooCommerceId: null,
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: 2,
    name: "Gift Set",
    slug: "gift-set",
    description: "Curated fragrance gift boxes",
    wooCommerceId: null,
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: 3,
    name: "Attar",
    slug: "attar",
    description: "Traditional attars and oils",
    wooCommerceId: null,
    createdAt: "2026-01-01T00:00:00.000Z",
  },
  {
    id: 4,
    name: "Body Mist",
    slug: "body-mist",
    description: "Light daily body mists",
    wooCommerceId: null,
    createdAt: "2026-01-01T00:00:00.000Z",
  },
];

function slugifyCategoryName(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function createCategoryStore(dataFile = path.join(__dirname, "../data/categories.json")) {
  function ensureFile() {
    const directory = path.dirname(dataFile);

    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }

    if (!fs.existsSync(dataFile)) {
      fs.writeFileSync(dataFile, `${JSON.stringify(DEFAULT_CATEGORIES, null, 2)}\n`, "utf8");
    }
  }

  function readCategories() {
    ensureFile();
    return JSON.parse(fs.readFileSync(dataFile, "utf8"));
  }

  function writeCategories(categories) {
    ensureFile();
    fs.writeFileSync(dataFile, `${JSON.stringify(categories, null, 2)}\n`, "utf8");
  }

  return {
    listCategories() {
      return readCategories();
    },

    createCategory({ name, description = "", wooCommerceId = null }) {
      const trimmedName = String(name || "").trim();

      if (!trimmedName) {
        const error = new Error("Category name is required");
        error.status = 400;
        throw error;
      }

      const categories = readCategories();
      const duplicate = categories.find(
        (category) => category.name.toLowerCase() === trimmedName.toLowerCase()
      );

      if (duplicate) {
        const error = new Error(`Category "${trimmedName}" already exists`);
        error.status = 409;
        throw error;
      }

      const category = {
        id: Date.now(),
        name: trimmedName,
        slug: slugifyCategoryName(trimmedName),
        description: String(description || "").trim(),
        wooCommerceId,
        createdAt: new Date().toISOString(),
      };

      categories.push(category);
      writeCategories(categories);

      return category;
    },
  };
}

module.exports = {
  createCategoryStore,
  slugifyCategoryName,
  DEFAULT_CATEGORIES,
};
