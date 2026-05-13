const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export async function createOrder(data: {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address: string;
  items: { productId: string; productName: string; quantity: number; price: number }[];
  totalPrice: number;
}) {
  const res = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Gagal buat order');
  return res.json();
}
