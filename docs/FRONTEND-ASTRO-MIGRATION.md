# kabar (frontend baru) ↔ periskop.id (CMS) — Analisis Kecocokan & Rencana Migrasi ke Astro

> **Tujuan dokumen:** (A) menilai apakah fitur CMS `periskop.id` masih pas dengan desain frontend baru ("kabar"), dan (B) menyiapkan langkah migrasi frontend ke **Astro** dengan **staging lokal + URL beta** lebih dulu.
> **Sumber:** dokumen arsitektur `periskop.id` (audit Codex 2026-07-06) + prototipe frontend `index.html` (repo ini).
> **Status:** draft kerja · 9 Juli 2026

---

## Ringkasan Eksekutif

- **Inti editorial sudah cocok.** Posts, kategori/tag, komentar, pencarian, halaman penulis, SEO/sitemap/RSS, iklan, web push, follow taxonomy, view tracking, scheduled publish, login sosial, dan **dashboard penulis (UGC)** semuanya sudah ada di CMS dan langsung memetakan ke fitur kabar.
- **Yang jadi celah (gap) adalah "tipe konten majalah" baru** di kabar yang belum punya model di CMS: **Agenda/Event, Video vertikal (9:16), Esai Foto, Cek Fakta, dan Stories**. Ini butuh tabel/field baru + CRUD di admin.
- **Beberapa fitur engagement** (reaksi emoji, newsletter, simpan/bookmark server-side, affiliate) juga belum ada backing-nya — sekarang di kabar masih `localStorage`/simulasi.
- **Arah migrasi:** jadikan `periskop.id` **headless** — Laravel tetap pegang CMS + database, tambah **API publik read-only**, lalu **Astro** jadi frontend publik yang konsumsi API itu. Admin (`/admin`) & API (`/api`) tetap di Laravel; Cloudflare yang membagi rute.
- **Staging dulu:** jalankan Astro + Laravel lokal, lalu deploy Astro ke **`beta.periskop.id`** (di-`noindex`) yang membaca konten asli dari API produksi (read-only) untuk QA sebelum cutover.

---

## Bagian A — Kecocokan Fitur CMS ↔ Frontend kabar

Legenda: ✅ sudah didukung CMS · 🟡 sebagian (perlu endpoint/field tambahan) · ❌ belum ada di CMS (celah)

### A.1 Fitur yang sudah cocok (✅)

| Fitur kabar (frontend) | Backing di CMS periskop | Catatan |
|---|---|---|
| Homepage: featured / highlight / latest / custom | `posts` + `settings` + cache homepage | kabar punya lebih banyak jenis blok (lihat gap di A.3) |
| Baca artikel `/{kategori}/{tgl}/{slug}` + related + prev/next + view count + schema | `FrontendController::singlePost`, `RecordPostView`, JSON-LD `NewsArticle` | Format URL kabar **sama persis** dengan CMS — bagus untuk parity |
| Arsip kategori & tag (all/text/video) | route `/{slug}/text|video`, `/tags/...` via `featured_video` | Filter video/text sudah ada |
| Pencarian | search weighted REGEXP/LIKE + cache | Rekomendasi CMS: pertimbangkan full-text/engine (lihat rekomendasi arsitektur) |
| Halaman penulis | `/author/{username}` | |
| Komentar (kirim, moderasi) | tabel `comments`, moderasi admin | kabar: "harus login dulu untuk kirim" — cocok dgn session auth |
| Login Google/Facebook | Laravel Socialite | kabar sekarang simulasi; tinggal sambung |
| Follow kategori/tag | `category_follows`, `tag_follows` | |
| Web push | `push_subscriptions` + webpush channel | |
| RSS / Sitemap / feed | `SitemapController`, `/rss`, `/feed` | Bisa tetap digenerate Laravel (lihat B.6) |
| Iklan | Ad Space settings (Billboard, Home 1-3, Before/After/Inline/Top Footer) | **Posisi perlu dipetakan ulang** ke slot kabar (lihat A.2) |
| **UGC "Tulisan kamu" (review → tayang)** | `/dashboard/my-*` create/edit/delete + status draft→published | **Sudah ada.** "Sedang diverifikasi → tayang" = alur draft→published/moderasi |
| Ringkasan artikel (Q&A/excerpt) | `summary_ai` (OpenAI) | Bisa memberi makan blok "Rangkuman Tanya-Jawab" |
| Scheduled publish, redirect legacy, error log, analytics | scheduler, `post_redirects`, `error_logs`, Google dashboard | Backend/tak terlihat — tetap jalan di balik Astro |

### A.2 Pemetaan slot iklan (perlu disepakati)

| Slot di kabar | Kandidat setting CMS | Aksi |
|---|---|---|
| Billboard atas (970×250) | `ads_billboard` / `ads_home_1` | Petakan langsung |
| Sidebar 300×250 | *belum ada* | Tambah key `ads_sidebar` |
| Sticky bottom | *belum ada* | Tambah key `ads_sticky` |
| Skyscraper kiri/kanan 160×600 | *belum ada* | Tambah key `ads_sky_left/right` |
| In-feed (Terbaru) | `ads_home_2/3` | Petakan |
| Before/After/Inline artikel | `ads_before_content`, `ads_after_content`, `ads_inline_parallax` | Sudah cocok |

> Skema setting CMS generic key/value, jadi menambah slot = menambah key + input di tab Advertiser. Tidak perlu migration baru.

### A.3 Celah — tipe konten baru yang belum ada di CMS (❌/🟡)

| Fitur kabar | Status | Yang dibutuhkan di CMS |
|---|---|---|
| **Agenda / Event** (Hari Ini + Akan Datang, status berlangsung/akan datang/selesai, link ke topik) | ❌ | Tabel `events` (title, starts_at, ends_at, status, topic/tag_id) + CRUD admin + endpoint publik |
| **Video vertikal 9:16** (poster, urutan shelf, share) | 🟡 | Posts sudah punya `featured_video`, tapi format short-form perlu: flag `is_vertical` + poster portrait + urutan. Alternatif: tipe konten `videos` sendiri |
| **Esai Foto** (galeri foto berurut + caption + cover) | ❌ | Tabel `photo_essays` + `photo_essay_items` (mirip pola page_sections), atau post subtype "gallery" |
| **Cek Fakta** (verdikt Hoaks/Keliru/Menyesatkan, klaim, sumber, stempel) | ❌ | Field pada post (`factcheck_verdict`, `claim`, `source`) atau tabel `fact_checks` |
| **Stories** (lingkaran ephemeral di atas beranda) | ❌ | Tabel `stories` (image, caption, link, expires_at) + CRUD |
| **Terpopuler kontекstual per section/tag (rolling window)** | 🟡 | Data ada (`post_views`), butuh endpoint agregasi `/popular?section=&tag=&window=&limit=` |
| **Reaksi emoji** di artikel | ❌ | Tabel `reactions` (post_id, type, count) atau kolom counter |
| **Newsletter signup** | ❌ | Tabel `subscribers` atau integrasi eksternal (Mailchimp/Sendy) |
| **Simpan / bookmark server-side** | ❌ | Tabel `saved_posts` (user_id, post_id). Kini kabar pakai `localStorage` |
| **Affiliate "Lagi Diskon"** | ❌ | Tabel `affiliate_products` atau pakai custom-HTML widget/ad |
| **Kuis "Uji ingatanmu"** | ❌/🟡 | Bisa AI-generated (pola `summary_ai`) atau tabel `quizzes` manual |
| **Channel tools** (Kalkulator KPR, dll) | ✅ frontend-only | Tak perlu CMS; opsional config rate dari settings |
| **Bio penulis di profil** | 🟡 | Tambah kolom `bio` di `users` |
| Tema terang/gelap, TTS "Dengarkan" | ✅ frontend-only | Murni klien (localStorage / SpeechSynthesis) |

### A.4 Fitur CMS yang belum dipakai frontend kabar

Page Builder (widget builder), Poll management penuh, multi-role editorial (reporter/visual), Google Search Console dashboard. **Rekomendasi:** Page Builder bisa jadi mesin untuk **landing kanal** (Neraca/SHEroes/HALALive) supaya blok bisa diatur non-teknis, alih-alih blok hardcode di kabar.

### A.5 Kesimpulan Bagian A

Kecocokan **inti berita ~80%**. Yang harus dibangun sebelum kabar bisa jalan di atas CMS asli adalah **5 tipe konten majalah** (Agenda, Video vertikal, Esai Foto, Cek Fakta, Stories) + **4 fitur engagement** (reaksi, newsletter, saved server-side, affiliate). Semuanya aditif — tidak membongkar skema yang ada.

---

## Bagian B — Rencana Migrasi Frontend ke Astro (staging lokal → beta)

### B.1 Arsitektur target: periskop headless + Astro

```
                 ┌─────────────── Cloudflare (edge/routing) ───────────────┐
   Pembaca  ───▶ │  /admin/*, /api/*, /dashboard/*  ──▶  Laravel (CMS+API)  │
                 │  selain itu (halaman publik)     ──▶  Astro (SSR)        │
                 └──────────────────────────────────────────────────────────┘
                                   Astro  ──HTTP──▶  Laravel /api/public/*  ──▶  MySQL
```

- **Laravel tetap** jadi CMS, database, auth admin, aggregator API, sitemap/RSS, scheduler.
- **Astro** menggantikan **Blade publik** saja. Konsumsi **API publik baru** (read-only).
- Cloudflare (sudah dipakai) membagi rute → migrasi bisa **bertahap**, bukan big-bang.

**Kenapa SSR, bukan SSG murni?** Situs berita berubah tiap menit; SSG penuh butuh rebuild terus. Pakai **Astro `output: 'server'` (adapter Node/Cloudflare)** + cache edge Cloudflare (persis pola sekarang). Evergreen (halaman statis "Tentang", dll) boleh prerender.

### B.2 Prasyarat di sisi Laravel: API publik

Tambah grup route baru `routes/api.php` → `/api/public/*` (tanpa `X-Api-Token`, cukup rate-limit + cache; atau token build-time untuk staging):

| Endpoint | Isi |
|---|---|
| `GET /api/public/home` | Konfigurasi beranda: featured, highlight, latest, custom, ticker, menu |
| `GET /api/public/posts/{cat}/{date}/{slug}` | Detail artikel + related + prev/next + komentar approved + schema |
| `GET /api/public/archive/{slug}` (+`/text|/video`) | Arsip kategori |
| `GET /api/public/tags/{slug}` | Arsip tag |
| `GET /api/public/author/{username}` | Profil + artikel penulis |
| `GET /api/public/search?q=` | Hasil pencarian |
| `GET /api/public/popular?section=&tag=&window=&limit=` | Terpopuler (agregasi `post_views`) |
| `GET /api/public/menu`, `/settings-public` | Menu nav + setting publik (logo, iklan, sosial) |

> Reuse logika `FrontendController` yang sudah ada — bungkus jadi JSON resource (Laravel API Resources), jangan tulis ulang query.

### B.3 Scaffold Astro (lokal)

```bash
# di folder terpisah (mono-repo periskop, atau repo frontend sendiri)
npm create astro@latest astro-frontend -- --template minimal --typescript strict
cd astro-frontend
npx astro add node        # adapter SSR (atau: astro add cloudflare)
npm i                     # (Tailwind opsional: astro add tailwind)
```

`astro.config.mjs`:
```js
export default defineConfig({
  output: 'server',
  adapter: node({ mode: 'standalone' }),
});
```

Struktur:
```
src/
  lib/api.ts            # client fetch ke PUBLIC_API_BASE
  layouts/Base.astro    # <head>, meta, JSON-LD, tema, boot script
  components/           # Hero, Rail, AgendaBlock, VideoShelf, FactCheck, Footer …
  components/islands/   # HeroSlider, KprCalc, Comments, SaveButton, Quiz, ThemeToggle (client:*)
  pages/
    index.astro
    [category]/[date]/[slug].astro
    tags/[slug].astro
    author/[username].astro
    search.astro
    [slug].astro        # resolver page/kategori (paling akhir)
```

### B.4 Konfigurasi environment (kunci untuk "staging lokal + beta")

`.env` Astro:
```
# Lokal — baca CMS lokal
PUBLIC_API_BASE=http://127.0.0.1:8002/api/public
# Beta — baca API produksi read-only
# PUBLIC_API_BASE=https://api.periskop.id/api/public
SITE_URL=http://localhost:4321
NOINDEX=true   # true di lokal & beta, false di produksi
```

`src/lib/api.ts`:
```ts
const BASE = import.meta.env.PUBLIC_API_BASE;
export async function api<T>(path: string): Promise<T> {
  const r = await fetch(`${BASE}${path}`, { headers: { Accept: 'application/json' } });
  if (!r.ok) throw new Error(`${r.status} ${path}`);
  return r.json();
}
```

### B.5 Jalankan staging LOKAL (dua service)

**Terminal 1 — CMS Laravel (periskop):**
```bash
cd periskop-production
composer run dev          # serve :8002 + queue + vite
php artisan migrate --seed # DB lokal berisi contoh konten
```
**Terminal 2 — Astro:**
```bash
cd astro-frontend
npm run dev               # http://localhost:4321
```
Astro `:4321` menarik data dari CMS `:8002`. Ini "staging lokal" penuh: konten nyata dari DB lokal, frontend Astro baru. Uji dgn `docs/QA-TEST-PLAN.md`.

> Opsi rapi: `docker-compose` dengan service `laravel`, `mysql`, `astro` supaya satu perintah `docker compose up`.

### B.6 URL beta (`beta.periskop.id`)

1. **Build & deploy Astro** ke host Node (atau Cloudflare Pages/Workers dgn adapter cloudflare).
2. **DNS/Cloudflare:** buat subdomain `beta.periskop.id` → Astro. `PUBLIC_API_BASE=https://api.periskop.id/api/public` (read-only, konten produksi asli).
3. **Cegah terindeks:** `NOINDEX=true` → render `<meta name="robots" content="noindex,nofollow">` + `robots.txt` disallow all + (opsional) **Cloudflare Access**/basic-auth supaya hanya tim yang buka.
4. **QA di beta:** jalankan 61 kasus `docs/QA-TEST-PLAN.md` di beta dengan data asli. Bandingkan SEO (meta, JSON-LD, canonical) vs Blade lama.
5. **Sitemap/RSS:** tahap beta biarkan tetap dari Laravel; saat cutover putuskan generate di Astro atau tetap Laravel.

### B.7 Cutover bertahap (setelah beta hijau)

1. Di Cloudflare, arahkan **rute publik** `periskop.id/*` ke Astro, **kecuali** `/admin/*`, `/api/*`, `/dashboard/*` tetap ke Laravel.
2. Set `NOINDEX=false` di Astro produksi; pasang canonical benar.
3. **Pastikan parity URL** — format `/{kategori}/{tgl}/{slug}`, `/tags/...`, `/author/...` identik agar tidak ada URL lama yang putus (redirect CMS tetap berlaku).
4. Pantau `error_logs` 404 + Search Console beberapa hari.
5. Rollback = kembalikan routing Cloudflare ke Laravel (Blade lama masih ada).

### B.8 Urutan pengerjaan yang disarankan

1. **API publik Laravel** (`/api/public/home` + `/posts/...` dulu) → bisa dites dgn `curl`.
2. **Scaffold Astro + Base layout + Hero + artikel** (pola end-to-end 1 halaman).
3. Port komponen sisanya + island interaktif (KPR, komentar, simpan, kuis, tema).
4. **Bangun 5 tipe konten gap** (Agenda, Video vertikal, Esai Foto, Cek Fakta, Stories) di CMS + endpoint + komponen Astro — sesuai prioritas editorial.
5. SEO parity (meta, JSON-LD, sitemap, RSS).
6. Deploy **beta** + QA + cutover.

---

## Lampiran — Keputusan yang perlu ditetapkan tim

- [ ] Astro **SSR (Node)** vs **Cloudflare Pages/Workers** — mana host beta & produksi?
- [ ] Mono-repo (Astro di dalam repo periskop) atau repo frontend terpisah?
- [ ] Prioritas 5 tipe konten baru — mana rilis pertama (mis. Cek Fakta & Video dulu)?
- [ ] Simpan/bookmark & reaksi: server-side sekarang atau tetap `localStorage` di v1?
- [ ] Newsletter: tabel sendiri atau layanan eksternal?
- [ ] Sitemap/RSS: tetap Laravel atau pindah generate ke Astro saat cutover?
