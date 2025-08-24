# 📑 Status Implementare Cerințe PipeSan.eu

## 1. Situația Actuală ✅

### ✅ IMPLEMENTAT - Site structurat pe categorii
- [x] Categorii de produse funcționale
- [x] Navigare între categorii
- [x] Filtrare produse după categorie

### ✅ IMPLEMENTAT - Secțiuni "Despre noi" și "Contact"
- [x] Pagina About completă cu informații despre companie
- [x] Pagina Contact cu formular funcțional
- [x] Integrare Formspree pentru mesaje (https://formspree.io/f/xandwogl)

### ✅ IMPLEMENTAT - Înregistrare cu tip cont
- [x] Opțiune persoană fizică / companie
- [x] Câmpuri specifice pentru companii (CUI, TVA, etc.)
- [x] Validare VIES pentru coduri TVA

### ✅ IMPLEMENTAT - Selecție țară la înregistrare
- [x] Dropdown cu toate țările europene suportate
- [x] Auto-detectare țară utilizator
- [x] Salvare preferință țară în profil

---

## 2. Funcționalități Noi de Implementat

### 🔹 2.1. Link-uri Amazon pe fiecare țară

#### ❌ PARȚIAL IMPLEMENTAT - Formularul de creare produs
**Status actual:**
- [x] Există câmpuri pentru link-uri Amazon în admin
- [x] Sunt configurate pentru 9 țări: FR, BE, IT, DE, ES, SE, PL, NL, UK
- [x] Câmpurile sunt etichetate cu steaguri și nume țări

**❌ LIPSEȘTE:**
- [ ] Câmpuri pentru "Bullet points" în formularul de creare
- [ ] Structurare clară a câmpurilor (Titlu, Bullet Points, Descriere, Link-uri)
- [ ] Validare că link-urile Amazon sunt corecte

#### ✅ IMPLEMENTAT - Redirecționare automată
- [x] Funcția `getAmazonLink()` redirecționează către țara utilizatorului
- [x] Fallback către Germania pentru "Altă țară"
- [x] Buton "Cumpără pe Amazon" funcțional

### 🔹 2.2. Funcționalitate coș + transport

#### ✅ IMPLEMENTAT - Coș de cumpărături
- [x] Adăugare produse în coș
- [x] Modificare cantități
- [x] Ștergere produse
- [x] Calcul total coș
- [x] Persistență coș în localStorage

#### ❌ COMPLET NEIMPLEMENTAT - Reguli transport
**❌ LIPSEȘTE COMPLET:**
- [ ] Verificare valoare coș ≥ 100 EUR → transport gratuit
- [ ] Mesaj "Transport gratuit" când coșul ≥ 100 EUR
- [ ] Câmp "Preț transport estimativ" în formularul de creare produs
- [ ] Opțiuni transport în checkout:
  - [ ] Transport estimativ (dacă < 100 EUR)
  - [ ] Solicitare deviz personalizat
- [ ] Notificare automată la contact@pipesan.eu pentru deviz
- [ ] Interfață checkout completă cu opțiuni transport

---

## 3. Prioritizare Implementare

### 🚨 URGENT - Lipsește complet
1. **Reguli transport și checkout** (2.2) - 0% implementat
2. **Câmpuri bullet points în admin** (2.1) - 20% implementat

### ⚡ RAPID - Îmbunătățiri minore
1. **Validare link-uri Amazon** (2.1) - 80% implementat
2. **Structurare formulare admin** (2.1) - 90% implementat

---

## 4. Plan de Implementare

### Faza 1: Completare Admin Panel
- [ ] Adăugare câmpuri bullet points
- [ ] Adăugare câmp preț transport estimativ
- [ ] Îmbunătățire layout formulare admin

### Faza 2: Sistem Transport
- [ ] Logică verificare transport gratuit (≥100 EUR)
- [ ] Interfață checkout cu opțiuni transport
- [ ] Integrare notificări email pentru devize

### Faza 3: Finalizare și Testare
- [ ] Validări complete
- [ ] Testare fluxuri complete
- [ ] Optimizări UX

---

## 5. Estimare Timp Implementare

- **Faza 1:** ~2-3 ore
- **Faza 2:** ~4-5 ore  
- **Faza 3:** ~1-2 ore

**TOTAL:** ~7-10 ore pentru implementare completă

---

## 6. Dependințe Externe

- ✅ Formspree configurat pentru notificări
- ✅ Toate țările Amazon configurate
- ✅ Sistem de autentificare funcțional
- ✅ Baza de date produse existentă
