# BeritaKini — Website Berita

Portal berita statis yang responsif, dibangun dengan HTML, CSS, dan JavaScript murni (tanpa framework/dependency). Cocok sebagai starter template portal berita.

## ✨ Fitur

- **Halaman beranda** dengan *hero* berita utama, grid berita terbaru, dan sidebar.
- **Halaman kategori** — filter berita per kategori (Ekonomi, Olahraga, Teknologi, Hiburan, Kesehatan).
- **Halaman detail artikel** dengan breadcrumb, estimasi waktu baca, tombol berbagi (Facebook, X, WhatsApp), dan berita terkait.
- **Pencarian** berita berdasarkan judul, ringkasan, atau kategori.
- **Breaking news ticker** berjalan otomatis.
- **Sidebar** berisi berita terpopuler, topik, dan form newsletter.
- **Desain responsif** — tampil baik di desktop maupun mobile (menu hamburger).
- Tanggal & tahun otomatis mengikuti waktu perangkat.

## 📁 Struktur Proyek

```
Website-berita/
├── index.html          # Halaman beranda
├── category.html       # Halaman kategori & hasil pencarian
├── article.html        # Halaman detail artikel
├── css/
│   └── style.css       # Seluruh gaya tampilan
├── js/
│   └── main.js         # Logika render & interaksi
└── data/
    └── news.js         # Sumber data berita (contoh)
```

## 🚀 Cara Menjalankan

Karena ini situs statis, cukup buka `index.html` di browser. Namun agar navigasi
antar-halaman berjalan optimal, disarankan menjalankan lewat server lokal:

```bash
# Python 3
python3 -m http.server 8000

# atau Node.js
npx serve
```

Lalu buka `http://localhost:8000` di browser.

## 🛠️ Menambah Berita

Edit file `data/news.js` dan tambahkan objek baru ke dalam array `NEWS_DATA`:

```js
{
  id: 13,
  title: "Judul berita",
  category: "Teknologi",        // harus salah satu dari CATEGORIES
  author: "Nama Penulis",
  date: "2026-07-02",
  image: "https://.../gambar.jpg",
  excerpt: "Ringkasan singkat berita.",
  featured: false,               // true untuk tampil di hero beranda
  content: ["Paragraf 1", "Paragraf 2"]
}
```

## 📝 Catatan

Gambar menggunakan layanan placeholder [picsum.photos](https://picsum.photos)
sehingga membutuhkan koneksi internet untuk menampilkannya.
