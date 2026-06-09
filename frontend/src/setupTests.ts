// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

process.env.REACT_APP_AUTH_MODE = 'mock';

const fallbackCategories = [
  { id: 1, name: 'Perfume', slug: 'perfume', description: 'Premium perfumes for men and women' },
  { id: 2, name: 'Gift Set', slug: 'gift-set', description: 'Curated fragrance gift boxes' },
  { id: 3, name: 'Attar', slug: 'attar', description: 'Traditional attars and oils' },
  { id: 4, name: 'Body Mist', slug: 'body-mist', description: 'Light daily body mists' },
];

const originalFetch = global.fetch;

beforeEach(() => {
  global.fetch = jest.fn(async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof input === 'string' ? input : input.toString();

    if (url.includes('/api/categories')) {
      return {
        ok: true,
        json: async () => ({ categories: fallbackCategories }),
      } as Response;
    }

    if (url.includes('/api/products')) {
      if (init?.method === 'POST') {
        const body = JSON.parse(String(init.body || '{}')) as { name?: string };
        const slug = String(body.name || 'demo-product')
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '');

        return {
          ok: true,
          json: async () => ({
            product: {
              id: 9001,
              name: body.name || 'Demo product',
              permalink: `https://gulefirdous.com/product/${slug}/`,
            },
          }),
        } as Response;
      }

      return {
        ok: true,
        json: async () => ({
          products: [
            {
              id: 6127,
              name: 'Gulefirdous Bloom Mist',
              slug: 'gulefirdous-bloom-mist',
              permalink: 'https://gulefirdous.com/product/gulefirdous-bloom-mist/',
            },
            {
              id: 6126,
              name: 'Gulefirdous Royal Oud',
              slug: 'gulefirdous-royal-oud',
              permalink: 'https://gulefirdous.com/product/gulefirdous-royal-oud/',
            },
          ],
        }),
      } as Response;
    }

    if (typeof originalFetch === 'function') {
      return originalFetch(input, init);
    }

    return {
      ok: false,
      json: async () => ({ error: 'Unhandled fetch in tests' }),
    } as Response;
  }) as typeof fetch;
});

afterEach(() => {
  global.fetch = originalFetch;
});
