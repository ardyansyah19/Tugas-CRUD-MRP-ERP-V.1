<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit;
}

require_once __DIR__ . "/../config/database.php";

function response($success, $message = "", $data = [], $code = 200) {
    http_response_code($code);
    echo json_encode([
        "success" => $success,
        "message" => $message,
        "data" => $data
    ]);
    exit;
}

$method = $_SERVER["REQUEST_METHOD"];

try {
    if ($method === "GET") {
        $stmt = $pdo->query("SELECT id, nbi, nama, jurusan, email, no_hp FROM mahasiswa ORDER BY id DESC");
        response(true, "Data berhasil diambil.", $stmt->fetchAll());
    }

    $input = json_decode(file_get_contents("php://input"), true) ?? [];

    if ($method === "POST") {
        foreach (["nbi", "nama", "jurusan", "email"] as $field) {
            if (empty(trim($input[$field] ?? ""))) {
                response(false, "Field $field wajib diisi.", [], 422);
            }
        }

        $stmt = $pdo->prepare(
            "INSERT INTO mahasiswa (nbi, nama, jurusan, email, no_hp)
             VALUES (:nbi, :nama, :jurusan, :email, :no_hp)"
        );
        $stmt->execute([
            ":nbi" => trim($input["nbi"]),
            ":nama" => trim($input["nama"]),
            ":jurusan" => trim($input["jurusan"]),
            ":email" => trim($input["email"]),
            ":no_hp" => trim($input["no_hp"] ?? "")
        ]);

        response(true, "Data berhasil ditambahkan.", ["id" => $pdo->lastInsertId()], 201);
    }

    $id = filter_input(INPUT_GET, "id", FILTER_VALIDATE_INT);
    if (!$id) response(false, "ID tidak valid.", [], 400);

    if ($method === "PUT") {
        foreach (["nbi", "nama", "jurusan", "email"] as $field) {
            if (empty(trim($input[$field] ?? ""))) {
                response(false, "Field $field wajib diisi.", [], 422);
            }
        }

        $stmt = $pdo->prepare(
            "UPDATE mahasiswa
             SET nbi=:nbi, nama=:nama, jurusan=:jurusan, email=:email, no_hp=:no_hp
             WHERE id=:id"
        );
        $stmt->execute([
            ":nbi" => trim($input["nbi"]),
            ":nama" => trim($input["nama"]),
            ":jurusan" => trim($input["jurusan"]),
            ":email" => trim($input["email"]),
            ":no_hp" => trim($input["no_hp"] ?? ""),
            ":id" => $id
        ]);

        response(true, "Data berhasil diperbarui.");
    }

    if ($method === "DELETE") {
        $stmt = $pdo->prepare("DELETE FROM mahasiswa WHERE id=:id");
        $stmt->execute([":id" => $id]);

        if ($stmt->rowCount() === 0) {
            response(false, "Data tidak ditemukan.", [], 404);
        }
        response(true, "Data berhasil dihapus.");
    }

    response(false, "Method tidak didukung.", [], 405);
} catch (PDOException $e) {
    if ($e->getCode() === "23000") {
        response(false, "NBI atau email sudah digunakan.", [], 409);
    }
    response(false, "Terjadi kesalahan database.", [], 500);
}
