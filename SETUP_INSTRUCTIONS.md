# 🚀 Configurare Rapidă PipeSan

## 1. Configurare Supabase (OBLIGATORIU)

### Creează proiect Supabase:
1. Mergi pe [supabase.com](https://supabase.com)
2. Creează cont și proiect nou
3. Notează URL-ul și Anon Key din Settings → API

### Configurează .env:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### Rulează migrațiile:
1. În Supabase Dashboard → SQL Editor
2. Copiază și rulează conținutul din `supabase/migrations/001_initial_schema.sql`

## 2. Rulare Locală

```bash
npm install
npm run dev
```

## 3. Deploy pe GitHub + Vercel

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/USERNAME/pipesan.git
git push -u origin main
```

Apoi conectează la Vercel și adaugă environment variables.

## 4. Acces Admin

După configurarea bazei de date, folosește:
- Email: contact@pipesan.eu  
- Parolă: Pipesan2022

---

**IMPORTANT:** Fără configurarea Supabase, aplicația NU va funcționa!
