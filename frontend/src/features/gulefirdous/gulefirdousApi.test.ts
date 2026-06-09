import {
  fetchWooProducts,
  findWooProductMatch,
  mergeProductsWithWooCommerce,
  slugifyWooProductName,
} from "./gulefirdousApi";

describe("WooCommerce product sync helpers", () => {
  const wooProducts = [
    {
      id: 6127,
      name: "Gulefirdous Bloom Mist",
      slug: "gulefirdous-bloom-mist",
      permalink: "https://gulefirdous.com/product/gulefirdous-bloom-mist/",
    },
    {
      id: 6126,
      name: "Gulefirdous Royal Oud",
      slug: "gulefirdous-royal-oud",
      permalink: "https://gulefirdous.com/product/gulefirdous-royal-oud/",
    },
  ];

  test("slugifyWooProductName normalizes product names", () => {
    expect(slugifyWooProductName("Heritage Attar Gift Set")).toBe("heritage-attar-gift-set");
  });

  test("findWooProductMatch matches by product name", () => {
    expect(findWooProductMatch("Gulefirdous Bloom Mist", wooProducts)?.id).toBe(6127);
  });

  test("mergeProductsWithWooCommerce applies WooCommerce ids and permalinks", () => {
    const merged = mergeProductsWithWooCommerce(
      [
        {
          id: 1,
          name: "Gulefirdous Bloom Mist",
          link: "https://gulefirdous.com/product/old-link/",
        },
        {
          id: 2,
          name: "Heritage Attar Gift Set",
          link: "https://gulefirdous.com/product/heritage-attar-gift-set/",
          wooCommerceId: undefined,
        },
      ],
      wooProducts
    );

    expect(merged[0]).toMatchObject({
      wooCommerceId: 6127,
      link: "https://gulefirdous.com/product/gulefirdous-bloom-mist/",
    });
    expect(merged[1]).toMatchObject({
      name: "Heritage Attar Gift Set",
      link: "https://gulefirdous.com/product/heritage-attar-gift-set/",
    });
    expect(findWooProductMatch("Heritage Attar Gift Set", wooProducts)).toBeUndefined();
  });

  test("fetchWooProducts reads the WooCommerce catalog from the backend API", async () => {
    const { products } = await fetchWooProducts();
    expect(products).toHaveLength(2);
    expect(products[0].permalink).toContain("gulefirdous-bloom-mist");
  });
});
