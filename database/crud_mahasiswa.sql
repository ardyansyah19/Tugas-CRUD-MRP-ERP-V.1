CREATE DATABASE IF NOT EXISTS crud_mahasiswa
CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE crud_mahasiswa;

CREATE TABLE IF NOT EXISTS mahasiswa (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nbi VARCHAR(30) NOT NULL UNIQUE,
    nama VARCHAR(100) NOT NULL,
    jurusan VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    no_hp VARCHAR(20) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO mahasiswa (nbi, nama, jurusan, email, no_hp) VALUES
('1462400001', 'Contoh Mahasiswa 1', 'Teknik Informatika', 'mahasiswa1@example.com', '081234567890'),
('1462400002', 'Contoh Mahasiswa 2', 'Teknik Informatika', 'mahasiswa2@example.com', '081234567891');
