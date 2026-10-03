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
