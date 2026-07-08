# kabar — Rencana Uji QA (Quality Assurance)

Panduan uji fungsional & UI untuk tim QA sebelum rilis. Versi checklist interaktif (bisa dicentang) tersedia sebagai halaman: **https://claude.ai/code/artifact/a6131a1d-230e-4e21-8c76-92b11a906968**

| | |
|---|---|
| **Produk** | kabar — portal berita (SPA satu berkas) |
| **Jenis build** | Demo front-end · tanpa backend |
| **Branch** | `claude/news-website-rorjvu` |
| **Berkas uji** | `index.html` |
| **Versi dok.** | v1.0 · 8 Juli 2026 |

## Cara mengakses build

1. Buka **Artifact** (versi hidup) aplikasi: https://claude.ai/code/artifact/acc74e88-fa74-47a9-afba-9259c270b5e4
2. Atau ambil dari repo, buka `index.html` langsung di browser — tidak perlu *build* atau server (semua aset menyatu di satu berkas).
3. Uji di jendela normal **dan** mode penyamaran (incognito) untuk memastikan alur "belum login" dan "tersimpan di perangkat" bekerja bersih.

> **Ruang lingkup demo.** Ini build front-end: data berita, gambar, iklan, login Google, dan kirim komentar bersifat **simulasi** (placeholder). Yang diuji adalah **perilaku antarmuka**, bukan koneksi ke server nyata. Tombol berbagi/iklan/login menampilkan notifikasi "(demo)" — itu perilaku yang diharapkan.

## Lingkungan yang perlu dicakup

- **Desktop:** Chrome, Firefox, Safari, Edge (terbaru)
- **Mobile:** Chrome Android, Safari iOS
- **Lebar uji:** ≤400 · 768 · 1024 · ≥1400 px
- **Tema:** Terang (default) & Gelap

Uji tiap suite minimal pada satu peramban desktop dan satu perangkat mobile. Item bertanda **[Mobile]** menyasar layar kecil secara khusus.

---

## Kasus Uji

### AKS — Navigasi & Umum
- [ ] **AKS-1** Bilah Breaking News tampil di atas; ✕ menutupnya → tak muncul lagi selama sesi.
- [ ] **AKS-2** Klik logo "kabar." → kembali ke Beranda dari halaman mana pun.
- [ ] **AKS-3** Menu kanal & tombol ☰ → mega-menu berisi kanal, topik, pencarian, pintasan.
- [ ] **AKS-4** Bilah topik tren (🔥) → chip bisa diklik dan membuka halaman topik.
- [ ] **AKS-5** Pencarian → hasil relevan; kata kunci kosong tidak error.
- [ ] **AKS-6** Tombol "Ke atas" (↑) muncul setelah menggulir → menggulir mulus ke atas.

### HERO — Beranda: Slider Hero
- [ ] **HERO-1** Hero berganti otomatis & lewat panah ‹ › → transisi mulus, tidak bocor/terpotong.
- [ ] **HERO-2** Klik titik indikator → loncat ke slide; titik aktif memanjang.
- [ ] **HERO-3** [Mobile] Titik indikator berada **di bawah** byline, tidak saling menimpa.
- [ ] **HERO-4** Klik judul/foto hero → membuka artikel.

### UTAMA — Beranda: Berita Utama & Karusel
- [ ] **UTAMA-1** Geser karusel "Berita utama" → mulus; tak ada scroll horizontal halaman.
- [ ] **UTAMA-2** Klik label "Geser →" → karusel bergeser sendiri; kembali ke awal saat mentok.
- [ ] **UTAMA-3** Hover karusel (desktop) → panah transparan muncul; sembunyi bila isi sudah muat.

### AGD — Beranda: Agenda
- [ ] **AGD-1** Dua kolom (Hari Ini & Akan Datang) di bawah Berita utama; tampilan bersih; hanya 'Berlangsung' bertitik merah.
- [ ] **AGD-2** Geser tiap kolom (label/panah/usap) → kartu bergeser horizontal.
- [ ] **AGD-3** Klik chevron di kanan judul → kolom menciut/mengembang; default mengembang.
- [ ] **AGD-4** Klik judul acara → daftar berita untuk topik acara.
- [ ] **AGD-5** [Mobile] Dua kolom menumpuk; kartu tidak menempel ke tepi kiri.

### VID — Beranda: Video Vertikal
- [ ] **VID-1** Blok Video = kartu poster 9:16 bertema (tidak polos), teks terbaca, bisa digeser.
- [ ] **VID-2** Klik kartu → pemutar layar penuh naik dari bawah; poster dulu, main saat diklik.
- [ ] **VID-3** Navigasi ‹ › / usap atas-bawah → pindah video; tombol nonaktif di ujung.
- [ ] **VID-4** [Mobile] Tombol bagikan di kanan-bawah pemutar (zona jempol) → sheet berbagi (WA/X/FB/TG/salin).
- [ ] **VID-5** Tutup (✕/Esc/klik latar); jika sheet terbuka, Esc menutup sheet dulu.

### FOTO — Beranda: Esai Foto
- [ ] **FOTO-1** [Mobile] Blok Esai Foto; kartu tak menempel ke kiri.
- [ ] **FOTO-2** Panah geser (desktop) & "Lihat galeri" → panah transparan saat hover; galeri terbuka.

### CF — Beranda: Cek Fakta
- [ ] **CF-1** Blok tampil dengan ribbon verdikt (Hoaks/Keliru/Menyesatkan); warna & ikon sesuai.
- [ ] **CF-2** Klik kartu → kartu **ringkasan** (stempel, klaim, verdikt), bukan langsung artikel.
- [ ] **CF-3** "Baca selengkapnya" → artikel klarifikasi penuh.
- [ ] **CF-4** [Mobile] Kartu tak menempel ke kiri; sejajar intro blok.

### RAIL — Sidebar: Terpopuler, Affiliate, Newsletter
- [ ] **RAIL-1** Daftar "Terpopuler" bernomor → klik membuka artikel.
- [ ] **RAIL-2** Affiliate "Lagi Diskon" — geser & panah transparan; 'Beli' → notifikasi demo.
- [ ] **RAIL-3** "Ringkasan pagi" — kirim email → tombol "Sip! ✓" lalu kembali.

### IKL — Penempatan Iklan
- [ ] **IKL-1** Billboard atas → "Sembunyikan ▴/Tampilkan iklan ▾" menciutkan/membentangkan (bukan tutup total).
- [ ] **IKL-2** Sticky bawah → collapse/expand; status ingat per sesi.
- [ ] **IKL-3** Skyscraper 160×600 kiri-kanan (≥1400px) → center gutter; sembunyi saat footer terlihat, muncul lagi saat naik.
- [ ] **IKL-4** In-feed di feed Terbaru & di atas "Ukuran teks" pada artikel → ukuran konsisten.

### ART — Halaman Artikel
- [ ] **ART-1** Breadcrumb benar (tak ada "undefined"); tiap tautan berfungsi.
- [ ] **ART-2** "Ukuran teks" (A−/A+) → badan artikel berubah & label update.
- [ ] **ART-3** Tautan internal entitas hanya **sekali** (kemunculan pertama), tidak berulang.
- [ ] **ART-4** "🔊 Dengarkan" → memutar/menghentikan (demo TTS).
- [ ] **ART-5** Bilah reaksi & zona berbagi → notifikasi berbagi.
- [ ] **ART-6** Rekomendasi & komentar tampil; karusel rekomendasi bergeser.

### LOGIN — Login & Aksi Terkunci
- [ ] **LOGIN-1** "Simpan" saat belum login → modal Masuk dulu; setelah login otomatis "Tersimpan".
- [ ] **LOGIN-2** Ketik komentar lalu "Kirim" saat belum login → diminta login; setelah login komentar otomatis terkirim.
- [ ] **LOGIN-3** Login via akun demo / "Gunakan akun lain" → avatar & menu akun update.
- [ ] **LOGIN-4** Modal login muncul **di atas** modal lain (mis. dari Rangkuman).

### FAQ — Rangkuman Tanya-Jawab & Kuis
- [ ] **FAQ-1** Pop-up "Rangkuman Tanya-Jawab" tersedia; 3 pertanyaan bisa dibuka.
- [ ] **FAQ-2** [Mobile] Buka pertanyaan ketiga, tunggu jeda → ajakan berbagi muncul & otomatis tergeser ke tampilan.
- [ ] **FAQ-3** Blok ajakan: berbagi, "Simpan artikel", "Jadikan sumber pilihan di Google" berfungsi (Simpan butuh login).
- [ ] **FAQ-4** "Uji ingatanmu →" → kuis 3 soal terkait berita; skor tampil di akhir.

### TEMA — Tema Terang/Gelap
- [ ] **TEMA-1** Buka pertama kali (bahkan bila OS gelap) → default **terang**.
- [ ] **TEMA-2** Aktifkan mode gelap → seluruh halaman gelap; label menu berubah.
- [ ] **TEMA-3** Muat ulang setelah pilih tema → pilihan tetap (tersimpan).

### SIMP — Tersimpan / Bookmark
- [ ] **SIMP-1** Simpan beberapa artikel → halaman "Tersimpan" sesuai; badge update.
- [ ] **SIMP-2** Hapus satu / "Bersihkan" → item hilang; keadaan kosong rapi.

### FOOT — Footer
- [ ] **FOOT-1** Baris "Ikuti" & baris sosial media → keduanya **rata tengah**.
- [ ] **FOOT-2** Kolom Kanal/Perusahaan/Bantuan & alamat → tautan kanal berfungsi; tautan demo beri notifikasi.
- [ ] **FOOT-3** "Ke atas ↑" → menggulir ke atas.

### RESP — Responsif & Umum
- [ ] **RESP-1** Ubah lebar desktop→mobile → tak pernah ada scroll horizontal halaman.
- [ ] **RESP-2** Stories (lingkaran di atas beranda) → cerita berpindah; progres berjalan; bisa ditutup.
- [ ] **RESP-3** Navigasi keyboard & fokus terlihat; hormati 'reduce motion'.

---

## Format Laporan Bug

Satu bug = satu baris di isu/spreadsheet tim.

| Field | Isi |
|---|---|
| **Judul** | Ringkas & spesifik — mis. "Dot slide hero menimpa byline di iPhone SE" |
| **ID Kasus** | Kode dari dok ini, mis. `HERO-3` |
| **Lingkungan** | Peramban + versi, perangkat/OS, lebar layar, tema |
| **Langkah** | 1) … 2) … 3) … (bisa diulang orang lain) |
| **Hasil aktual** | Apa yang terjadi |
| **Hasil diharapkan** | Apa yang seharusnya terjadi |
| **Severity** | Kritis (memblokir) / Mayor (mengganggu) / Minor (kosmetik) |
| **Bukti** | Tangkapan layar / rekaman / tautan |
