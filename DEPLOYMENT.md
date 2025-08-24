# 🚀 Ghid Deployment PipeSan

## Deployment pe Vercel

### 1. Pregătire Repository GitHub

```bash
# Inițializează Git
git init

# Adaugă toate fișierele
git add .

# Primul commit
git commit -m "Initial commit: PipeSan E-commerce Platform"

# Adaugă remote (înlocuiește USERNAME)
git remote add origin https://github.com/USERNAME/pipesan-ecommerce.git

# Push pe GitHub
git push -u origin main
```

### 2. Configurare Vercel

1. Mergi pe [vercel.com](https://vercel.com)
2. Conectează-te cu GitHub
3. Importă repository-ul `pipesan-ecommerce`
4. Vercel detectează automat că e proiect Vite

### 3. Environment Variables în Vercel

În dashboard-ul Vercel, mergi la Settings → Environment Variables:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_CONTACT_EMAIL=contact@pipesan.eu
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/xandwogl
```

### 4. Configurare Domeniu Custom

Pentru `pipesan.eu`:

1. În Vercel: Settings → Domains
2. Adaugă `pipesan.eu`
3. Adaugă `www.pipesan.eu` (redirect)

### 5. DNS Configuration

```
Type: A
Name: @
Value: 76.76.19.61

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 6. SSL Certificate

Vercel configurează automat SSL pentru domeniul custom.

## Deployment pe Netlify (Alternativă)

### 1. Build Settings

```
Build command: npm run build
Publish directory: dist
```

### 2. Environment Variables

Aceleași ca pentru Vercel.

### 3. Redirects

Creează `_redirects` în folderul `public`:

```
/*    /index.html   200
```

## Configurare Supabase

### 1. Creează Proiect Supabase

1. Mergi pe [supabase.com](https://supabase.com)
2. Creează proiect nou
3. Notează URL-ul și Anon Key

### 2. Rulează Migrațiile

```sql
-- Rulează conținutul din supabase/migrations/001_initial_schema.sql
```

### 3. Configurare RLS

Toate tabelele au Row Level Security activat automat.

## Configurare Email (Formspree)

1. Mergi pe [formspree.io](https://formspree.io)
2. Creează cont și formular nou
3. Folosește endpoint-ul în variabilele de mediu

## Monitorizare și Analytics

### Google Analytics (Opțional)

Adaugă în `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## Backup și Securitate

### 1. Backup Bază de Date

Supabase oferă backup automat.

### 2. Securitate

- Toate parolele sunt hash-uite
- RLS activat pe toate tabelele
- Environment variables securizate
- HTTPS forțat

## Troubleshooting

### Build Errors

```bash
# Curăță cache
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Environment Variables

Verifică că toate variabilele sunt setate corect în Vercel/Netlify.

### Database Connection

Verifică că URL-ul și key-ul Supabase sunt corecte.

---

**Succes cu deployment-ul! 🚀**
