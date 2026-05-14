Landing page bisnis pisang premium berbasis **Next.js 16** dengan desain dark luxury dan koneksi ke backend NestJS + Supabase.

## 🌐 Live Demo

[https://bananaku-frontend.vercel.app](https://bananaku-frontend.vercel.app)

---

## 🛠️ Tech Stack

| Teknologi | Keterangan |
|---|---|
| Next.js 16 | React framework dengan App Router |
| TypeScript | Type-safe JavaScript |
| Tailwind CSS v4 | Utility-first CSS framework |
| Framer Motion | Animasi dan transisi |
| Playfair Display | Font heading serif premium |
| Plus Jakarta Sans | Font body modern |
| Vercel | Platform deployment |

---

## 📁 Struktur Folder
frontend/
├── public/
│   ├── hero/           # Background hero section
│   ├── about/          # Background about section
│   ├── gallery/        # Foto galeri (6 foto)
│   └── products/       # Foto produk (12 foto)
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Halaman utama
│   │   ├── not-found.tsx   # Halaman 404
│   │   ├── home/           # Home route group
│   │   └── admin/          # Admin dashboard
│   ├── components/
│   │   ├── layout/         # Navbar, Footer, MobileMenu
│   │   ├── sections/       # Semua section landing page
│   │   ├── common/         # Komponen reusable
│   │   └── ui/             # Komponen UI dasar
│   ├── services/           # API service functions
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   ├── types/              # TypeScript types
│   ├── constants/          # Data statis & konfigurasi
│   └── styles/             # CSS tambahan
---

## 📄 Sections Landing Page

| Section | Deskripsi |
|---|---|
| 🦸 Hero | Banner utama dengan background foto & animasi |
| 📖 About | Profil perusahaan dengan foto & statistik |
| 🍌 Products | Grid produk dinamis dari API + filter kategori |
| 💪 Benefits | Manfaat pisang dengan statistik nutrisi |
| 🖼️ Gallery | Masonry grid foto kebun & produk |
| 💰 Pricing | Paket harga dari database + modal order |
| ⭐ Testimonials | Ulasan pelanggan dari database |
| 📞 Contact | Form kontak tersimpan ke database |
| 🚀 CTA | Call to action & WhatsApp button |

---

## ⚙️ Environment Variables

Buat file `.env.local` di root folder:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
Untuk production di Vercel:
NEXT_PUBLIC_API_URL=https://bananaku-backend.vercel.app/api
🚀 Cara Menjalankan
Prerequisites
Node.js 18+
npm atau yarn
Install & Run
# Clone repository
git clone https://github.com/Shop333/bananaku-frontend.git
cd bananaku-frontend

# Install dependencies
npm install

# Jalankan development server
npx next dev -H 127.0.0.1

# Buka di browser
# http://127.0.0.1:3000
Build Production
npm run build
npm start
🖼️ Format Gambar
Semua gambar menggunakan format .webp untuk performa optimal.
Folder
File
public/hero/
hero-bg.webp
public/about/
about-bg.webp
public/gallery/
kebun.webp, panen.webp, sortir.webp, organik.webp, ekspor.webp, delivery.webp
public/products/
cavendish.webp, kepok.webp, raja.webp, ambon.webp, barangan.webp, mas-kirana.webp, tanduk.webp, cavendish-box.webp, keripik-original.webp, keripik-coklat.webp, keripik-keju.webp, chips-mix.webp
🔗 API Endpoints yang Digunakan
Endpoint
Method
Keterangan
/api/products
GET
Ambil semua produk
/api/products?category=segar
GET
Filter produk by kategori
/api/orders
POST
Buat order produk
/api/pricing/plans
GET
Ambil paket harga
/api/pricing/orders
POST
Buat order pricing
/api/testimonials
GET
Ambil testimoni
/api/contact
POST
Kirim pesan kontak
📦 Deployment
Project ini di-deploy otomatis ke Vercel setiap kali ada push ke branch main.
# Push ke GitHub → auto deploy ke Vercel
git add .
git commit -m "your message"
git push