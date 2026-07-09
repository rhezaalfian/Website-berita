# Instruksi Deploy API Publik → `api.periskop.id` (untuk backend)

> Untuk developer backend `periskop-production`. API `/api/public/v1` sudah selesai & lolos test; tinggal commit + deploy supaya frontend Astro (dan `beta.periskop.id`) bisa menyambung. Read-only, **tanpa migration** — risiko rendah.

## 1. Commit hanya berkas API (jangan bawa perubahan worktree lain)

```bash
cd periskop-production
git checkout -b feature/public-api      # atau ikut konvensi tim

git add routes/api.php \
        app/Providers/AppServiceProvider.php \
        app/Http/Controllers/Api/PublicApiController.php \
        app/Http/Resources/PublicApi/ \
        tests/Feature/PublicApiTest.php

git commit -m "Tambah API publik /api/public/v1 untuk frontend Astro"
git push -u origin feature/public-api
```
(Perubahan lain yang sudah ada di worktree biarkan — `git add` di atas selektif.)

## 2. Deploy ke server (pola existing)

`api.periskop.id` dan `periskop.id` **satu aplikasi Laravel** (middleware `RestrictApiSubdomain` memaksa subdomain API hanya melayani `/api/*`). Jadi begitu kode ter-deploy, route `/api/public/v1/*` **otomatis tersedia** di `api.periskop.id` — tak perlu infra baru.

Ikuti pola deploy manual (dari `DEPLOY.md` / `docs/MIGRATION_HISTORY.md`):
```bash
ssh <server>
cd /www/wwwroot/periskop.id
git pull origin feature/public-api      # atau merge ke main dulu lalu pull main
php artisan optimize:clear
# TIDAK ada migration baru (API read-only) → tak perlu php artisan migrate
```

## 3. Verifikasi dari publik (dari mana saja)

```bash
curl -s https://api.periskop.id/api/public/v1/home | head -c 300
curl -s "https://api.periskop.id/api/public/v1/posts/ekonomi/20260709/<slug>" | head -c 300
```
Harus **HTTP 200 + JSON**. Cek juga route terdaftar: `php artisan route:list --path=api/public/v1` (10 route).

## 4. Checklist hal yang mudah kelewat

- [ ] **`RestrictApiSubdomain`** mengizinkan `/api/public/*` di `api.periskop.id` (harusnya ya — semua di bawah `/api/`). Uji: buka URL di atas via subdomain `api.`.
- [ ] **`throttle:public`** aktif (120 req/menit/IP) — sudah dibuat, pastikan kebaca di route group.
- [ ] **`/settings` hanya field publik.** Audit jangan sampai bocor `.env`/secret (API key, token, DB). Hanya kirim: site_title, slogan, logo, sosial, analytics id publik, HTML iklan.
- [ ] **CORS** (`config/cors.php`): tambah untuk panggilan **client-side** nanti (komentar/simpan dari browser). Belum wajib untuk render SSR, tapi siapkan:
  ```php
  'paths' => ['api/public/*'],
  'allowed_methods' => ['GET'],
  'allowed_origins' => ['https://periskop.id', 'https://beta.periskop.id', 'http://localhost:4321'],
  ```
- [ ] **(opsional) Cache-Control + ETag** per spec §4 (home s-maxage=120, post 300, menu/settings 3600) — biar Cloudflare cache di edge.
- [ ] **(opsional) Purge Cloudflare** untuk path `/api/public/*` saat konten berubah — tambahkan ke `PostCacheInvalidator` yang sudah ada.

## 5. Setelah live

Kabari URL final ke tim frontend: **`https://api.periskop.id/api/public/v1`**.
→ Buka sesi porting di repo `periskop-frontend`, set `PUBLIC_API_BASE` ke URL itu, lalu lanjut porting Astro dengan data asli.

> Catatan: API ini menyajikan konten yang **sudah publik** di periskop.id, jadi membukanya read-only aman. Yang tetap terkunci (Cloudflare Access) adalah **frontend beta** `beta.periskop.id`, bukan API-nya.

---

### Bonus: rapikan test yang gagal (opsional)
`tests/Feature/ExampleTest.php` gagal karena test homepage akses tabel `settings` tanpa migrasi (bug lama, tercatat di dokumen arsitektur §6.4 — bukan dari API ini). Perbaikan: tambah `use Illuminate\Foundation\Testing\RefreshDatabase;` pada test itu, atau seed `settings` minimal di `setUp()`.
