import { NavItem, Product, Testimonial } from '@/types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Beranda', href: '#hero' },
  { label: 'Tentang', href: '#about' },
  { label: 'Produk', href: '#products' },
  { label: 'Manfaat', href: '#benefits' },
  { label: 'Testimoni', href: '#testimonials' },
  { label: 'Kontak', href: '#contact' },
];

export const PRODUCTS: Product[] = [
  {
    id: '1', name: 'Pisang Cavendish Premium', slug: 'cavendish-premium',
    description: 'Pisang cavendish segar pilihan, manis dan lembut. Cocok untuk konsumsi langsung maupun ekspor.',
    price: 35000, unit: 'kg', image: '/images/cavendish.jpg',
    category: 'segar', stock: 500, isFeatured: true,
  },
  {
    id: '2', name: 'Pisang Kepok Organik', slug: 'kepok-organik',
    description: 'Pisang kepok organik tanpa pestisida, ideal untuk olahan dan konsumsi sehat.',
    price: 28000, unit: 'kg', image: '/images/kepok.jpg',
    category: 'segar', stock: 300, isFeatured: true,
  },
  {
    id: '3', name: 'Keripik Pisang Original', slug: 'keripik-original',
    description: 'Keripik pisang renyah dengan cita rasa original, tanpa pengawet buatan.',
    price: 45000, unit: '500gr', image: '/images/keripik.jpg',
    category: 'olahan', stock: 200, isFeatured: true,
  },
  {
    id: '4', name: 'Pisang Raja Ekspor', slug: 'raja-ekspor',
    description: 'Pisang raja grade A siap ekspor, sudah tersertifikasi internasional.',
    price: 55000, unit: 'kg', image: '/images/raja.jpg',
    category: 'ekspor', stock: 1000, isFeatured: false,
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1', name: 'Budi Santoso', role: 'Pemilik Supermarket',
    message: 'Kualitas pisang dari BananaKu selalu konsisten dan pengiriman tepat waktu. Sudah 2 tahun jadi supplier utama kami.',
    rating: 5,
  },
  {
    id: '2', name: 'Siti Rahayu', role: 'Ibu Rumah Tangga',
    message: 'Pisangnya segar banget, anak-anak suka. Pesan online mudah dan cepat sampai!',
    rating: 5,
  },
  {
    id: '3', name: 'Ahmad Fauzi', role: 'Eksportir Buah',
    message: 'Grade ekspor benar-benar terjaga. BananaKu jadi mitra terpercaya untuk bisnis ekspor saya.',
    rating: 5,
  },
];

export const COMPANY_NAME = 'BananaKu';
export const COMPANY_TAGLINE = 'Dari Kebun Terbaik, Untuk Meja Makan Anda';
export const COMPANY_EMAIL = 'hello@bananaku.id';
export const COMPANY_PHONE = '+62 812 3456 7890';
export const COMPANY_ADDRESS = 'Jl. Perkebunan Pisang No. 1, Lampung, Indonesia';
