# 🚀 Încărcare PipeSan pe GitHub

## Pași pentru încărcarea pe GitHub:

### 1. Creează un repository nou pe GitHub
1. Mergi pe [github.com](https://github.com) și loghează-te
2. Click pe "New repository" (butonul verde)
3. Nume repository: `pipesan-ecommerce`
4. Descriere: `PipeSan - Platformă E-commerce pentru Produse Sanitare Premium`
5. Setează ca **Public** (sau Private dacă preferi)
6. **NU** bifa "Add a README file" (avem deja unul)
7. **NU** bifa "Add .gitignore" (am creat unul custom)
8. Click "Create repository"

### 2. Inițializează Git local (în terminal/command prompt)

```bash
# Navighează în folderul proiectului
cd path/to/your/pipesan-project

# Inițializează Git
git init

# Adaugă toate fișierele
git add .

# Creează primul commit
git commit -m "Initial commit: PipeSan E-commerce Platform

- Complete React + Material-UI application
- Multi-language support (6 languages)
- Admin panel with full CRUD operations
- Shopping cart functionality
- Country-specific Amazon links
- Contact form with Formspree integration
- User authentication system
- Responsive design
- SEO optimization"

# Adaugă remote origin (înlocuiește USERNAME cu username-ul tău GitHub)
git remote add origin https://github.com/USERNAME/pipesan-ecommerce.git

# Setează branch-ul principal
git branch -M main

# Încarcă pe GitHub
git push -u origin main
```

### 3. Configurare Environment Variables pe GitHub

După încărcare, pentru deployment automat:

1. Mergi în repository pe GitHub
2. Click pe "Settings" tab
3. În sidebar, click "Secrets and variables" → "Actions"
4. Adaugă următoarele secrets:

```
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 4. Deployment automat cu Vercel

1. Conectează repository-ul la [vercel.com](https://vercel.com)
2. Importă proiectul de pe GitHub
3. Vercel va detecta automat că e un proiect Vite
4. Adaugă environment variables în Vercel dashboard
5. Deploy automat la fiecare push pe main branch

### 5. Comenzi Git utile pentru viitor

```bash
# Verifică statusul
git status

# Adaugă modificări
git add .

# Commit cu mesaj
git commit -m "Descrierea modificărilor"

# Încarcă modificările
git push

# Trage ultimele modificări
git pull

# Creează branch nou pentru features
git checkout -b feature/nume-feature

# Schimbă înapoi pe main
git checkout main
```

###