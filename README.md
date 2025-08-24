# PipeSan E-commerce Platform

## 🚀 Deployment pe Vercel

### Pași pentru deployment:

1. **Conectează repository-ul la Vercel:**
   ```bash
   # Dacă nu ai Vercel CLI instalat
   npm i -g vercel
   
   # Login în Vercel
   vercel login
   
   # Deploy proiectul
   vercel --prod
   ```

2. **Configurează domeniul custom în Vercel:**
   - Accesează dashboard-ul Vercel
   - Selectează proiectul PipeSan
   - Mergi la Settings → Domains
   - Adaugă domeniul: `pipesan.eu`
   - Adaugă și: `www.pipesan.eu` (redirect către pipesan.eu)

3. **Configurează variabilele de mediu în Vercel:**
   - Mergi la Settings → Environment Variables
   - Adaugă toate variabilele din `.env.example`

### 📋 DNS Configuration Required:

Pentru domeniul `pipesan.eu`, configurează următoarele înregistrări DNS:

```
Type: A
Name: @
Value: 76.76.19.61

Type: CNAME  
Name: www
Value: cname.vercel-dns.com

Type: TXT
Name: @
Value: "v=spf1 include:_spf.google.com ~all"
```

### 🔧 Environment Variables pentru Vercel:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_APP_URL=https://pipesan.eu
VITE_CONTACT_EMAIL=contact@pipesan.eu
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/xandwogl
```

### �� Features Implemented:

- ✅ Multi-language support (23 languages)
- ✅ Country-specific Amazon links
- ✅ Shopping cart functionality
- ✅ Admin panel with full CRUD
- ✅ Contact form with Formspree integration
- ✅ User authentication system
- ✅ Responsive design with Material-UI
- ✅ SEO optimization

### 🔐 Admin Access:

- Email: `contact@pipesan.eu`
- Password: `Pipesan2022`

### 📞 Contact Information:

- Email: contact@pipesan.eu
- Phone RO: +40 722 140 444
- Phone FR: +33 6 75 11 62 18
- Address: Craiova, România

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📦 Project Structure

```
src/
├── components/          # Reusable components
├── contexts/           # React contexts (Auth, Cart, Country)
├── pages/              # Page components
├── i18n/               # Internationalization
└── theme.js            # Material-UI theme

public/                 # Static assets
vercel.json            # Vercel configuration
```

## �� Supported Countries & Amazon Links:

- ��🇷 France (amazon.fr) - Primary
- 🇧🇪 Belgium (amazon.com.be)
- 🇮🇹 Italy (amazon.it)
- 🇩🇪 Germany (amazon.de)
- 🇪🇸 Spain (amazon.es)
- 🇸🇪 Sweden (amazon.se)
- 🇵🇱 Poland (amazon.pl)
- 🇳🇱 Netherlands (amazon.nl)
- 🇬🇧 United Kingdom (amazon.co.uk)

## 📈 Next Steps:

1. Configure Supabase database
2. Set up email notifications
3. Implement payment processing
4. Add analytics tracking
5. Configure SSL certificates
