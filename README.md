# 🍽️ ClearDine — Setup Guide

> **Live Demo:** [https://cleardine.vercel.app](https://cleardine.vercel.app)  
> **Repository:** [https://github.com/ZynxZyn/cleardine](https://github.com/ZynxZyn/cleardine)

---

## 📋 Prasyarat Sistem

Sebelum menjalankan aplikasi, pastikan komputer Anda telah terinstall:
- **Node.js** (versi `18.0.0` atau lebih baru) — [Unduh di sini](https://nodejs.org/)
- **npm** (otomatis terinstall bersama Node.js)
- **Git** — [Unduh di sini](https://git-scm.com/)

---

## ⚙️ Panduan Jalankan Aplikasi di Lokal

### 1. Kloning Repositori
Buka Terminal / Command Prompt (CMD), lalu jalankan:

```bash
git clone https://github.com/ZynxZyn/cleardine.git
cd cleardine
```

### 2. Install Dependensi
Jalankan perintah berikut untuk mengunduh seluruh dependensi:

```bash
npm install
```

### 3. Jalankan Server Lokal (Development)
Jalankan aplikasi di mode lokal:

```bash
npm run dev
```

Buka browser Anda dan akses alamat berikut:

```text
http://localhost:5173
```

---

## 🛠️ Perintah Lainnya (Build & Preview)

- **Uji Kompilasi Produksi (Build):**
  ```bash
  npm run build
  ```

- **Pratinjau Hasil Build (Preview):**
  ```bash
  npm run preview
  ```

---

## 💻 Tech Stack
- **Framework**: React.js (v18+)
- **Build Tool**: Vite
- **Router**: React Router DOM (v6)
- **Styling**: Vanilla CSS (CSS Variables)
- **Deployment**: Vercel
