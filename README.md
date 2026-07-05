# kabar — Portal Berita

Portal berita statis satu file (SPA) yang responsif, dibangun dengan HTML, CSS, dan JavaScript murni tanpa dependency. Menggabungkan feed ringkas ala kumparan dengan tipografi editorial, plus fitur interaktif.

## ✨ Fitur

- **Beranda**: hero editorial, carousel "Berita utama" (kartu ala Google News), dan feed "Terbaru".
- **Kategori & pencarian**: filter per kategori dan cari judul/ringkasan.
- **Halaman artikel**: progress bar baca, tombol berbagi, **"Baca Juga" inline**, **TL;DR "Baca cepat"**, dan **dengarkan artikel (text-to-speech)**.
- **URL ala portal berita** (mirip periskop): artikel `#/{kanal}/{tanggal}/{slug}`, tag `#/tags/{slug}` — bisa deep-link, back/forward jalan, plus **title/meta/canonical dinamis** dan **JSON-LD** (NewsArticle, Person/Organization) untuk SEO.
- **Halaman tag pintar**: nama orang/lembaga tampil sebagai **kartu mini-wiki** dengan entitas ter-link otomatis di body; tag topik menampilkan **kronologi** peristiwa.
- **Fitur Gen Z / milenial**: Stories, reaksi emoji, kartu kutipan yang bisa dibagikan, ikuti topik, riwayat baca & badge.
- **Kuis berskor**: halaman khusus **dan** pop-up otomatis setelah selesai membaca artikel.
- **Simpan / Baca-nanti** (bookmark) + halaman **Tersimpan**, tersimpan di `localStorage`.
- **Login Google** (UI demo — lihat catatan di bawah).
- **Dark mode**, tombol kembali ke atas, dan transisi halus.
- **Responsif penuh** 320px–1280px (feed "Terbaru" di mobile bergaya Flash News).

> Jajak pendapat (polling) tersedia di kode tapi disembunyikan (`SHOW_POLL=false`); set `true` untuk memunculkan lagi.

## 🚀 Menjalankan

Situs ini satu file mandiri. Buka `index.html` langsung, atau lewat server lokal:

```bash
python3 -m http.server 8000
# lalu buka http://localhost:8000
```

## 🌐 Publikasi via GitHub Pages

1. Buka repo di GitHub → **Settings** → **Pages**.
2. Bagian **Build and deployment** → Source: **Deploy from a branch**.
3. Pilih branch (mis. `main` setelah merge, atau `claude/news-website-rorjvu`) dan folder **/ (root)** → **Save**.
4. Tunggu ±1 menit, URL publik muncul di halaman itu (mis. `https://<username>.github.io/website-berita/`).

## 🔐 Mengaktifkan Login Google Asli

Login saat ini adalah **UI demo** (sesi disimpan di `localStorage`, belum terhubung ke Google). Untuk versi asli tanpa backend, gunakan **Google Identity Services**:

1. Buat **OAuth 2.0 Client ID** (tipe Web) di [Google Cloud Console](https://console.cloud.google.com/) dan daftarkan domain GitHub Pages kamu sebagai *authorized origin*.
2. Muat skrip GIS di `<head>`:
   ```html
   <script src="https://accounts.google.com/gsi/client" async></script>
   ```
3. Ganti pemicu tombol "Masuk" agar memanggil `google.accounts.id`, lalu pada callback panggil fungsi `login({ name, email })` yang sudah ada (decode dari JWT credential).

> Catatan: skrip Google diblokir di lingkungan pratinjau ber-CSP, tapi berjalan normal di situs yang di-deploy.

## 🛠️ Mengganti Data Berita

Semua data ada di array `RAW` di dalam `index.html`. Setiap item: `[judul, kategori, penulis, tanggal, unggulan, breaking, ringkasan, [paragraf...]]`. Kata kunci/entitas per artikel diatur di objek `KW`, dan profil entitas (orang/lembaga) di `ENTITIES`. Gambar dibuat otomatis sebagai SVG (tanpa perlu koneksi internet) — ganti fungsi `img()` bila ingin memakai foto asli.
