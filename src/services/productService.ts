const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export async function getProducts(category?: string) {
  const url = category && category !== 'semua'
    ? `${API_URL}/products?category=${category}`
    : `${API_URL}/products`;

  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error('Gagal fetch produk');
  return res.json();
}

export async function getFeaturedProducts() {
  const res = await fetch(`${API_URL}/products/featured`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Gagal fetch produk featured');
  return res.json();
}

export async function getProductById(id: string) {
  const res = await fetch(`${API_URL}/products/${id}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Gagal fetch produk');
  return res.json();
}
