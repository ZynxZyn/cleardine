# 🍽️ ClearDine — Prototipe Menu Digital Inklusif

> **Live Demo Web Application:** [https://cleardine.vercel.app](https://cleardine.vercel.app)  
> **Repository GitHub:** [https://github.com/ZynxZyn/cleardine](https://github.com/ZynxZyn/cleardine)

---

## 📌 Gambaran Umum

**ClearDine** adalah prototipe antarmuka menu digital inklusif berbasis **React.js & Vite** yang merombak total pengalaman pemesanan makanan di restoran/food court. Didorong oleh filosofi transparansi dan kesetaraan aksesibilitas, ClearDine menyelesaikan 4 masalah utama menu digital konvensional: *scrolling fatigue*, asimetri informasi porsi & alergen, kurangnya aksesibilitas medis bagi lansia, serta *waiting anxiety* akibat ketidakpastian waktu dapur.

---

## ✨ Fitur Unggulan

1. **🔍 Smart Search Bar & Eksklusi Cerdas**
   - Mendukung pencarian presisi berdasarkan nama menu, bahan utama, hingga pencarian eksklusi (contoh: mengetik `"tanpa kacang"` akan menyaring menu yang mengandung alergen kacang).
2. **🎨 Sistem Klasifikasi Warna Pastel Kesehatan**
   - 🟢 **Aman & Ramah Lansia**: Rendah kalori, tekstur lembut, bebas alergen.
   - 🟠 **Perlu Perhatian**: Gula/natrium tinggi atau tekstur keras.
   - 🔵 **Opsi Diet Khusus**: Pilihan Keto, Vegan, dan Plant-Based.
   - 🔴 **Peringatan Alergen**: Mengandung alergen ganda (Kacang, Seafood, Susu, Gluten, Kedelai).
3. **⚖️ Transparansi Porsi & Allergen Warning**
   - Mencantumkan porsi kuantitatif objektif (berat gramasi & jumlah potong), rincian nutrisi, serta label peringatan alergen medis.
4. **⏱️ Manajemen Waktu Dinamis & Status Dapur (`KitchenLoadBar`)**
   - Menampilkan status kesibukan dapur (*normal / busy*) dan estimasi waktu penyajian yang dikalkulasi secara otomatis berdasarkan antrean kapasitas kompor dapur per tenant.
5. **🪑 Identifikasi Nomor Meja Persisten**
   - Parameter meja (`?table=11`) tersimpan secara konsisten di sepanjang alur navigasi dari pemilihan tenant, menu, hingga konfirmasi pesanan.
6. **☀️ / 🌙 Light & Dark Mode Inklusif**
   - Sakelar tema visual dengan animasi perputaran ikon yang halus (*spin transition*) untuk kenyamanan mata pengguna dalam berbagai situasi pencahayaan.

---

## 🚀 Panduan Setup & Jalankan Lokal (Untuk Dewan Juri & Panitia)

Ikuti langkah-langkah di bawah ini untuk menjalankan aplikasi secara lokal di komputer Anda:

### 📋 Prasyarat Sistem
- **Node.js**: versi `18.0.0` atau yang lebih baru ([Unduh Node.js](https://nodejs.org/))
- **Package Manager**: `npm` (otomatis terinstall bersama Node.js) atau `yarn` / `pnpm`
- **Git**: untuk mengkloning repositori

---

### 📥 1. Kloning Repositori
Buka Terminal / Command Prompt (CMD), lalu jalankan:

```bash
git clone https://github.com/ZynxZyn/cleardine.git
cd cleardine
```

---

### 📦 2. Install Dependensi

Jalankan perintah berikut untuk mengunduh seluruh dependensi proyek:

```bash
npm install
```

---

### 💻 3. Jalankan Development Server

Jalankan server lokal pengembangan:

```bash
npm run dev
```

Setelah perintah di atas berhasil, buka browser Anda dan akses alamat lokal:

```text
http://localhost:5173
```

---

### 🏗️ 4. Build & Preview Production (Opsional)

Jika ingin menguji versi kompilasi produksi (*production bundle*):

```bash
npm run build
npm run preview
```

---

## 📂 Struktur Direktori Proyek

```text
cleardine/
├── public/
│   └── images/              # 24 foto asli makanan/minuman dari Kitchen Avenue
├── src/
│   ├── api/
│   │   ├── api.js           # Fungsi fetch data lokal
│   │   └── data.js          # Data master tenant, menu, alergen & waktu
│   ├── components/          # Komponen UI modular
│   │   ├── Header/
│   │   ├── KitchenLoadBar/
│   │   ├── KitchenStatus/
│   │   ├── MenuCard/
│   │   ├── DetailModal/
│   │   ├── CartDrawer/
│   │   ├── ThemeToggle/
│   │   └── ...
│   ├── context/
│   │   └── CartContext.jsx  # Logika keranjang & akumulasi estimasi waktu antrean
│   ├── pages/               # Halaman utama aplikasi
│   │   ├── LandingPage/     # Halaman Selamat Datang & Pilihan Meja
│   │   ├── HomePage/        # Beranda Edukatif & Legenda Warna
│   │   ├── MenuPage/        # Daftar Menu & Smart Search
│   │   └── OrderConfirmPage/# Halaman Sukses Pesanan
│   ├── App.jsx              # Router aplikasi
│   ├── main.jsx             # Entry point React
│   └── index.css            # Variabel CSS global & sistem warna pastel
├── package.json
├── vite.config.js
└── README.md
```

---

## 🛠️ Teknologi yang Digunakan

- **Core Framework**: [React.js](https://react.dev/) (v18+)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Routing**: [React Router DOM](https://reactrouter.com/) (v6)
- **Styling**: Vanilla CSS3 (Custom CSS Variables, Glassmorphism, Responsive Flex & Grid)
- **Deployment**: [Vercel](https://vercel.com/)

---

## 👥 Tim Penyusun — BUBUYAGA (2026)

- Bimasena Widianto
- Nazihan Wafi Musyafa
- Talita Nailah Arif
- Tristan Renovan
