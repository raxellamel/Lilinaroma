# Lilin Aroma - E-Commerce Website

Website e-commerce modern dan responsif untuk **Lilin Aroma**, dirancang untuk menampilkan dan menjual produk lilin aromaterapi. Proyek ini memiliki tema pink/pastel yang estetis, kartu produk interaktif 3D, sistem keranjang belanja fungsional, dan fitur kode voucher.

## ✨ Fitur Utama

- **Multi-Halaman**: Terdiri dari halaman Beranda, Tentang Saya, dan Kontak.
- **Desain Responsif**: Tampilan yang menyesuaikan dengan baik di desktop, tablet, dan ponsel.
- **Antarmuka Interaktif**:
  - **Efek 3D Tilt**: Kartu produk memiliki efek miring 3D menggunakan `vanilla-tilt.js`.
  - **Glassmorphism**: Gaya desain kaca modern pada elemen UI.
  - **Animasi Halus**: Transisi yang mulus untuk hover, modal, dan notifikasi.
- **Sistem Keranjang Belanja**:
  - Tambah produk ke keranjang dengan notifikasi real-time.
  - Perhitungan subtotal dan total otomatis.
  - Manajemen jumlah barang (tambah/kurang).
- **Fitur Checkout Lengkap**:
  - **Kode Voucher**: Mendukung kode diskon untuk potongan 20%.
  - **Notifikasi Kustom**: Notifikasi "Pembayaran Berhasil" yang elegan di tengah layar.
  - **Pilihan Pembayaran**: Simulasi pilihan Bank dan E-Wallet.

## 🎟️ Kode Voucher

Gunakan kode berikut saat checkout untuk mendapatkan diskon **20%**:

| Kode Voucher | Diskon | Keterangan |
| :--- | :---: | :--- |
| `zura` | 20% | Kode Spesial |
| `musgun` | 20% | Kode Spesial |
| `Amell` | 20% | Kode Spesial |
| `ramell` | 20% | Kode Spesial |
| `Lapiww` | 20% | Kode Spesial |
| `kapiww` | 20% | Kode Spesial |
- **Halaman Kontak**: Formulir kontak interaktif dan informasi lokasi/sosial media lengkap.

## 🛠️ Teknologi yang Digunakan

- **HTML5**: Struktur semantik halaman web.
- **Tailwind CSS**: Framework CSS utility-first untuk styling (via CDN).
- **JavaScript (ES6+)**: Logika untuk keranjang, voucher, notifikasi, dan interaksi DOM.
- **Vanilla-tilt.js**: Library untuk efek 3D pada kartu produk.
- **Bootstrap Icons**: Ikon vektor.
- **Google Fonts**: Tipografi (Poppins).

## 🚀 Cara Menjalankan

Karena ini adalah proyek web statis, Anda tidak memerlukan tools build yang rumit.

1.  **Clone repositori**
    ```bash
    git clone https://github.com/username/lilin-aroma.git
    ```

2.  **Buka Proyek**
    Cukup buka file `index.html` di browser web favorit Anda.

    ATAU

    Jika menggunakan VS Code, disarankan menggunakan ekstensi "Live Server" untuk pengalaman terbaik.

## 📂 Struktur Proyek

```
lilin-aroma/
├── assets/
│   ├── css/
│   │   └── style.css     # Custom CSS tambahan
│   ├── img/
│   │   ├── ecommerce/    # Logo marketplace (Tokopedia, dll)
│   │   ├── payment/      # Ikon metode pembayaran
│   │   ├── products/     # Foto produk lilin
│   │   └── web-icon.jpeg # Favicon website
│   └── js/
│       └── main.js       # Logika aplikasi (Cart, Voucher, dll)
├── about.html            # Halaman Tentang Saya
├── contact.html          # Halaman Kontak
├── index.html            # Halaman Utama (Beranda)
└── README.md             # Dokumentasi Proyek
```

## 👤 Penulis

**Lilis Amelia**
- **NIM**: 241010501940
- **Mata Kuliah**: Aplikasi Komputer Bisnis
- **Universitas**: Universitas Pamulang

## 📄 Lisensi

Proyek ini dibuat untuk tujuan pendidikan. Hak cipta dilindungi undang-undang.

## ⚠️ Catatan Penting (Disclaimer)

Website ini adalah **proyek demonstrasi** untuk tugas kuliah.
- **Fitur Pembayaran**: Tidak ada transaksi uang sungguhan yang diproses. Tombol pembayaran hanya menampilkan simulasi sukses.
- **Fitur Kontak**: Formulir "Kirim Pesan" hanya menampilkan notifikasi sukses dan tidak benar-benar mengirim email atau pesan ke server manapun.
- **Data Pengguna**: Data yang dimasukkan (Nama, Email, dll) tidak disimpan ke database.
