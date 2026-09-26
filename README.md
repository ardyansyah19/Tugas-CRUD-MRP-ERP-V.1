# Tugas CRUD ERP MRP
By Ahmad Riko Dyansyah

Aplikasi CRUD (Create, Read, Update, Delete) sederhana untuk data mahasiswa menggunakan:

- HTML5
- CSS3
- JavaScript (Fetch API)
- PHP 8+ / PHP 7.4+
- MySQL / MariaDB
- PDO + Prepared Statement

## 1. Struktur Folder

```text
crud_php_mysql/
├── api/
│   └── mahasiswa.php
├── config/
│   └── database.php
├── css/
│   └── style.css
├── database/
│   └── crud_mahasiswa.sql
├── js/
│   └── script.js
├── index.html
└── README.md
```

## 2. Instalasi XAMPP

1. Install XAMPP.
2. Jalankan **Apache** dan **MySQL**.
3. Salin folder `crud_php_mysql` ke:

```text
C:\xampp\htdocs\
```

4. Import file:

```text
database/crud_mahasiswa.sql
```

Bisa melalui phpMyAdmin atau CMD MySQL.

## 3. Instalasi Laragon

Jika menggunakan Laragon, salin folder ke:

```text
C:\laragon\www\
```

atau sesuai lokasi folder `www` Laragon Anda.

Kemudian jalankan Apache/Nginx dan MySQL dari Laragon.

## 4. Konfigurasi Database

Buka:

```text
config/database.php
```

Konfigurasi default:

```php
$host = "localhost";
$db   = "crud_mahasiswa";
$user = "root";
$pass = "";
```

Jika MySQL Anda menggunakan password, ubah `$pass`.

Contoh:

```php
$pass = "password_mysql_anda";
```

## 5. Membuat Database

### Cara 1 - phpMyAdmin

Import:

```text
database/crud_mahasiswa.sql
```

### Cara 2 - CMD

Masuk ke folder MySQL XAMPP, misalnya:

```bat
cd C:\xampp\mysql\bin
```

Kemudian:

```bat
mysql -u root -p < C:\xampp\htdocs\crud_php_mysql\database\crud_mahasiswa.sql
```

Jika root tidak menggunakan password:

```bat
mysql -u root < C:\xampp\htdocs\crud_php_mysql\database\crud_mahasiswa.sql
```

## 6. Menjalankan Aplikasi

Setelah Apache dan MySQL aktif, buka:

```text
http://localhost/crud_php_mysql/
```

## 7. Fitur

Aplikasi menyediakan:

- Menampilkan seluruh data mahasiswa
- Menambah data
- Mengedit data
- Menghapus data
- Pencarian data
- Validasi field wajib
- Validasi email HTML
- Prepared Statement PDO
- REST-style endpoint menggunakan GET, POST, PUT, DELETE
- Tampilan responsive

## 8. API Endpoint

Base URL:

```text
/api/mahasiswa.php
```

### GET - Menampilkan data

```http
GET /api/mahasiswa.php
```

### POST - Menambah data

```http
POST /api/mahasiswa.php
Content-Type: application/json
```

Body:

```json
{
  "nbi": "1462400003",
  "nama": "Nama Mahasiswa",
  "jurusan": "Teknik Informatika",
  "email": "nama@example.com",
  "no_hp": "081234567890"
}
```

### PUT - Mengubah data

```http
PUT /api/mahasiswa.php?id=1
Content-Type: application/json
```

### DELETE - Menghapus data

```http
DELETE /api/mahasiswa.php?id=1
```

## 9. Jika Muncul Error Koneksi Database

Periksa hal berikut:

1. MySQL/MariaDB sudah berjalan.
2. Nama database adalah `crud_mahasiswa`.
3. Username dan password di `config/database.php` benar.
4. Port MySQL sesuai konfigurasi komputer Anda.
5. Folder project berada di `htdocs` XAMPP atau `www` Laragon.
6. PHP yang digunakan mendukung PDO MySQL.

Jika MySQL menggunakan port selain 3306, DSN dapat diubah menjadi:

```php
$dsn = "mysql:host=$host;port=3307;dbname=$db;charset=$charset";
```

Sesuaikan `3307` dengan port MySQL Anda.

## 10. Catatan Keamanan

Project ini dibuat sebagai template pembelajaran. Untuk deployment production, tambahkan:

- Authentication dan authorization
- CSRF protection
- Rate limiting
- Server-side validation yang lebih ketat
- Environment variables untuk kredensial database
- Logging dan monitoring
- HTTPS
- Pengaturan CORS yang lebih ketat

## Lisensi

Bebas digunakan dan dimodifikasi untuk pembelajaran dan pengembangan project.
