# periskop.id — Spesifikasi API Publik (`/api/public/v1`)

> **Tujuan:** kontrak REST read-only yang dikonsumsi frontend Astro (`periskop-frontend`) untuk merender halaman publik. Dibangun di Laravel (`periskop-production`), reuse logika `FrontendController` yang sudah ada — dibungkus jadi JSON, bukan ditulis ulang.
> **Untuk:** developer backend periskop (implementasi) + developer frontend Astro (konsumsi).
> **Versi:** draft v1 · 9 Juli 2026

---

## 0. Konvensi umum

| Aspek | Ketentuan |
|---|---|
| Base URL | `https://api.periskop.id/api/public/v1` (prod) · `http://127.0.0.1:8002/api/public/v1` (lokal) |
| Auth | **Tidak ada** untuk read (publik). Lindungi dengan **rate-limit** (mis. 120 req/menit/IP) + optional header `X-Build-Token` khusus environment **beta/staging** agar tidak bisa di-scrape sebelum rilis. |
| Format | JSON, `Content-Type: application/json`, penamaan field **snake_case** (ikut konvensi Laravel) |
| Waktu | ISO 8601 UTC (`2026-07-09T08:15:00Z`) + sertakan `*_human` bila perlu tampilan ("2 jam lalu") |
| Pagination | `?page=` (1-based). Response membungkus `data[]` + objek `meta` (lihat §1.3) |
| Caching | Kirim `Cache-Control` + `ETag`; TTL ikut cache existing (home 120s, global 600–3600s, dst). Astro/Cloudflare yang cache di edge |
| Error | Bentuk seragam (lihat §6) |
| Versioning | Prefiks `/v1`. Perubahan breaking → `/v2` |

> **Catatan write (komentar, simpan, follow, vote, webpush, UGC):** operasi tulis **tidak** masuk API publik ini. Tetap lewat session/endpoint Laravel yang sudah ada (Astro submit dengan credentials), dibahas terpisah di Fase 2. v1 fokus **render**.

---

## 1. Objek bersama (schema)

### 1.1 `PostCard` — dipakai di semua list/karusel
```json
{
  "id": 1287,
  "title": "Stimulus ekonomi baru diumumkan pemerintah",
  "slug": "stimulus-ekonomi-baru-diumumkan-pemerintah",
  "url": "/ekonomi/20260709/stimulus-ekonomi-baru-diumumkan-pemerintah",
  "excerpt": "Ringkasan singkat 1-2 kalimat…",
  "category": { "name": "Ekonomi", "slug": "ekonomi", "section": "Neraca" },
  "tags": [ { "name": "APBN", "slug": "apbn" } ],
  "author": { "name": "Rangga P.", "username": "rangga" },
  "cover": { "url": "https://cdn.periskop.id/…/cover.jpg", "alt": "…", "width": 1200, "height": 675 },
  "is_video": false,
  "is_breaking": false,
  "is_featured": true,
  "reading_time": 4,
  "views": 12840,
  "published_at": "2026-07-09T08:15:00Z",
  "published_human": "2 jam lalu"
}
```
> `section` diturunkan dari kategori→section (Neraca/SHEroes/HALALive/News) sesuai peta di frontend. Kalau CMS belum punya konsep "section", kirim `null` dan sementara frontend yang memetakan.

### 1.2 `Pagination` (objek `meta`)
```json
{ "current_page": 1, "per_page": 12, "total": 240, "last_page": 20, "has_more": true }
```

### 1.3 Amplop list standar
```json
{ "data": [ /* PostCard[] */ ], "meta": { /* Pagination */ } }
```

### 1.4 `Category` / `Tag` / `Author`
```json
{ "name": "Ekonomi", "slug": "ekonomi", "section": "Neraca",
  "description": "…", "cover": { "url": "…", "alt": "…" },
  "seo": { "title": "…", "description": "…", "canonical": "https://periskop.id/ekonomi" } }
```
```json
{ "name": "Rangga P.", "username": "rangga", "bio": "…",
  "avatar": { "url": "…" }, "post_count": 87,
  "seo": { "title": "…", "description": "…", "canonical": "…" } }
```

---

## 2. Endpoint

### 2.1 `GET /home` — konfigurasi beranda
Satu panggilan mengembalikan semua blok beranda (hemat round-trip). TTL ±120s.
```json
{
  "hero": [ /* PostCard[] (featured/breaking terpilih untuk slider) */ ],
  "highlight": [ /* PostCard[] */ ],
  "latest": { "data": [ /* PostCard[] */ ], "meta": { /* Pagination */ } },
  "custom_sections": [
    { "title": "Neraca", "slug": "neraca", "posts": [ /* PostCard[] */ ] }
  ],
  "ticker": [ { "text": "…", "url": "/…" } ],
  "popular": [ /* PostCard[] (global, fallback) */ ]
}
```

### 2.2 `GET /posts/{category}/{date}/{slug}` — detail artikel
`date` = `YYYYMMDD`. Format URL **identik** dengan situs sekarang (parity SEO wajib).
```json
{
  "post": {
    "id": 1287, "title": "…", "slug": "…", "url": "/ekonomi/20260709/…",
    "content_html": "<p>…</p>",
    "summary_ai": "Ringkasan AI 2-3 kalimat…",
    "category": { "name": "Ekonomi", "slug": "ekonomi", "section": "Neraca" },
    "tags": [ … ], "author": { … },
    "cover": { … }, "is_video": false, "featured_video": null,
    "reading_time": 4, "views": 12840,
    "published_at": "…", "updated_at": "…"
  },
  "breadcrumb": [
    { "label": "Beranda", "url": "/" },
    { "label": "Ekonomi", "url": "/ekonomi" },
    { "label": "Stimulus ekonomi…", "url": "/ekonomi/20260709/…" }
  ],
  "related": [ /* PostCard[] */ ],
  "prev": { "title": "…", "url": "/…" },
  "next": { "title": "…", "url": "/…" },
  "comments": [ /* Comment[] (approved) — lihat §3 */ ],
  "seo": {
    "title": "… — periskop.id",
    "description": "…",
    "canonical": "https://periskop.id/ekonomi/20260709/…",
    "robots": "index,follow",
    "og_image": "https://cdn…/cover.jpg",
    "jsonld": { "@context": "https://schema.org", "@type": "NewsArticle", "...": "…" }
  }
}
```
> `jsonld` dikirim jadi-jadian dari server supaya Astro tinggal cetak `<script type="application/ld+json">` — jaga parity `NewsArticle` yang sekarang.
> Untuk **preview** role tertentu (draft), terima query `?preview_token=` dan kembalikan post belum published bila token valid.

### 2.3 `GET /archive/{categorySlug}` — arsip kategori
Query: `type=all|text|video` (default `all`, ikut logika `featured_video`), `page`.
```json
{ "category": { /* Category */ }, "posts": { "data": [ … ], "meta": { … } } }
```

### 2.4 `GET /tags/{tagSlug}` — arsip tag
Query sama (`type`, `page`).
```json
{ "tag": { /* Tag */ }, "posts": { "data": [ … ], "meta": { … } } }
```

### 2.5 `GET /author/{username}` — halaman penulis
```json
{ "author": { /* Author */ }, "posts": { "data": [ … ], "meta": { … } } }
```

### 2.6 `GET /search` — pencarian
Query: `q` (wajib; kosong → `data: []`, bukan error), `page`.
```json
{ "query": "stimulus", "posts": { "data": [ … ], "meta": { … } } }
```

### 2.7 `GET /popular` — terpopuler kontекstual
Query: `section`, `tag`, `window=24h|7d|30d` (default `7d`), `limit` (default 5).
Agregasi dari tabel `post_views`. Ini yang mengganti hitung `localStorage` di kabar.
```json
{ "window": "7d", "scope": { "section": "Neraca" }, "data": [ /* PostCard[] terurut */ ] }
```

### 2.8 `GET /resolve?path=/{slug}` — resolver catch-all
Meniru route `/{slug}` Laravel (page / post / kategori / redirect). Astro panggil ini untuk path yang tak match rute spesifik.
```json
{ "type": "redirect", "status": 301, "target": "/ekonomi/20260709/…" }
```
`type` ∈ `post` | `page` | `category` | `redirect` | `not_found`. Untuk `page`, sertakan konten page builder (blok/section) agar landing kanal bisa dirender.

### 2.9 `GET /menu` & `GET /settings` — global
```json
// /menu
{ "primary": [ { "label": "Neraca", "url": "/neraca", "children": [ … ] } ],
  "footer": [ { "title": "Perusahaan", "links": [ { "label": "Tentang Kami", "url": "/tentang" } ] } ] }
```
```json
// /settings  (hanya field publik — JANGAN bocorkan secret)
{ "site_title": "periskop.id", "slogan": "Ringkas. Jelas. Tepercaya.",
  "logo_url": "…", "social": { "instagram": "…", "x": "…" },
  "analytics": { "ga_id": "G-XXXX", "clarity_id": "…" },
  "ads": { "billboard": "<script…>", "sidebar": "…", "sticky": "…",
           "before_content": "…", "after_content": "…", "inline_parallax": "…", "top_footer": "…" } }
```
> Slot iklan mengikuti pemetaan di `docs/FRONTEND-ASTRO-MIGRATION.md §A.2` (perlu tambah key `ads_sidebar`, `ads_sticky`, `ads_sky_*` di CMS).

---

## 3. `Comment` (read)
```json
{ "id": 55, "author_name": "Budi", "body": "…",
  "created_at": "…", "created_human": "kemarin",
  "replies": [ { "id": 58, "author_name": "…", "body": "…", "created_at": "…" } ] }
```
Hanya komentar `approved`. Kirim komentar = Fase 2 (session Laravel).

---

## 4. Header caching yang disarankan
| Endpoint | Cache-Control |
|---|---|
| `/home` | `public, max-age=60, s-maxage=120` |
| `/posts/…` | `public, max-age=120, s-maxage=300` |
| `/archive`,`/tags`,`/author`,`/search` | `public, max-age=60, s-maxage=120` |
| `/menu`,`/settings` | `public, max-age=600, s-maxage=3600` |
| `/popular` | `public, max-age=120, s-maxage=300` |
Sertakan `ETag`; hormati `If-None-Match` → `304`.

---

## 5. Invalidasi
Saat post/page/kategori/tag berubah, `PostCacheInvalidator` yang sudah ada juga harus **purge cache edge** untuk path API terkait (`/api/public/v1/posts/…`, `/home`, dst) — tambahkan path API ke daftar purge Cloudflare.

---

## 6. Bentuk error seragam
```json
{ "error": { "code": "not_found", "message": "Post tidak ditemukan", "status": 404 } }
```
Kode: `not_found` (404), `validation` (422, sertakan `fields`), `rate_limited` (429), `server_error` (500).

---

## 7. Checklist implementasi backend
- [ ] Route group `Route::prefix('api/public/v1')->middleware(['throttle:public'])`
- [ ] Laravel **API Resources** untuk `PostCard`, `PostDetail`, `Category`, `Tag`, `Author`, `Comment` (bungkus model existing)
- [ ] Reuse query `FrontendController` (home, singlePost, archive, tag, author, search) → pindahkan ke service bila perlu, jangan duplikasi
- [ ] Endpoint `/popular` = query agregasi `post_views` per window
- [ ] `/resolve` mirror logika `/{slug}` + `post_redirects`
- [ ] `/settings` whitelist field publik (audit jangan sampai bocor `.env`/secret)
- [ ] `jsonld` + `seo` digenerate server-side (parity `NewsArticle`, canonical, robots)
- [ ] Header cache + ETag + integrasi purge Cloudflare
- [ ] Rate-limit + (staging) `X-Build-Token`

## 8. Checklist konsumsi frontend (Astro)
- [ ] `src/lib/api.ts` typed client → base dari `PUBLIC_API_BASE`
- [ ] Type TS diturunkan dari schema §1 (PostCard, PostDetail, dst)
- [ ] Halaman: `index`, `[category]/[date]/[slug]`, `[cat]` (+`/text|/video`), `tags/[slug]`, `author/[username]`, `search`, `[...slug]` (resolve)
- [ ] Cetak `seo.jsonld` + meta dari field `seo`
- [ ] `noindex` bila `NOINDEX=true` (lokal/beta) — override `seo.robots`
