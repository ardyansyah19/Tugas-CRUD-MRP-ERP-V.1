const API = "api/mahasiswa.php";

const modal = document.getElementById("modal");
const form = document.getElementById("mahasiswaForm");
const table = document.getElementById("dataTable");
const searchInput = document.getElementById("searchInput");
const alertBox = document.getElementById("alert");

let allData = [];

document.getElementById("btnTambah").addEventListener("click", () => openModal());
document.getElementById("btnClose").addEventListener("click", closeModal);
document.getElementById("btnCancel").addEventListener("click", closeModal);
searchInput.addEventListener("input", renderTable);
form.addEventListener("submit", saveData);

async function loadData() {
  try {
    const response = await fetch(API);
    const result = await response.json();
    if (!result.success) throw new Error(result.message);
    allData = result.data;
    renderTable();
  } catch (error) {
    table.innerHTML = `<tr><td colspan="7" class="empty">${escapeHtml(error.message)}</td></tr>`;
  }
}

function renderTable() {
  const keyword = searchInput.value.toLowerCase().trim();
  const data = allData.filter(item =>
    [item.nbi, item.nama, item.jurusan, item.email, item.no_hp]
      .join(" ").toLowerCase().includes(keyword)
  );

  if (!data.length) {
    table.innerHTML = `<tr><td colspan="7" class="empty">Data tidak ditemukan.</td></tr>`;
    return;
  }

  table.innerHTML = data.map((item, index) => `
    <tr>
      <td>${index + 1}</td>
      <td>${escapeHtml(item.nbi)}</td>
      <td>${escapeHtml(item.nama)}</td>
      <td>${escapeHtml(item.jurusan)}</td>
      <td>${escapeHtml(item.email)}</td>
      <td>${escapeHtml(item.no_hp || "-")}</td>
      <td class="actions">
        <button class="btn btn-warning" onclick="editData(${item.id})">Edit</button>
        <button class="btn btn-danger" onclick="deleteData(${item.id})">Hapus</button>
      </td>
    </tr>
  `).join("");
}

function openModal(item = null) {
  form.reset();
  document.getElementById("id").value = item ? item.id : "";
  document.getElementById("nbi").value = item ? item.nbi : "";
  document.getElementById("nama").value = item ? item.nama : "";
  document.getElementById("jurusan").value = item ? item.jurusan : "";
  document.getElementById("email").value = item ? item.email : "";
  document.getElementById("no_hp").value = item ? item.no_hp : "";
  document.getElementById("modalTitle").textContent = item ? "Edit Mahasiswa" : "Tambah Mahasiswa";
  modal.classList.remove("hidden");
}

function closeModal() {
  modal.classList.add("hidden");
}

async function saveData(event) {
  event.preventDefault();

  const id = document.getElementById("id").value;
  const payload = {
    nbi: document.getElementById("nbi").value.trim(),
    nama: document.getElementById("nama").value.trim(),
    jurusan: document.getElementById("jurusan").value.trim(),
    email: document.getElementById("email").value.trim(),
    no_hp: document.getElementById("no_hp").value.trim()
  };

  try {
    const response = await fetch(id ? `${API}?id=${id}` : API, {
      method: id ? "PUT" : "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(payload)
    });
    const result = await response.json();
    if (!result.success) throw new Error(result.message);

    closeModal();
    showAlert(result.message, "success");
    await loadData();
  } catch (error) {
    showAlert(error.message, "error");
  }
}

window.editData = function(id) {
  const item = allData.find(row => Number(row.id) === Number(id));
  if (item) openModal(item);
};

window.deleteData = async function(id) {
  const item = allData.find(row => Number(row.id) === Number(id));
  if (!item || !confirm(`Hapus data ${item.nama}?`)) return;

  try {
    const response = await fetch(`${API}?id=${id}`, { method: "DELETE" });
    const result = await response.json();
    if (!result.success) throw new Error(result.message);

    showAlert(result.message, "success");
    await loadData();
  } catch (error) {
    showAlert(error.message, "error");
  }
};

function showAlert(message, type) {
  alertBox.innerHTML = `<div class="alert alert-${type}">${escapeHtml(message)}</div>`;
  setTimeout(() => alertBox.innerHTML = "", 3000);
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  }[char]));
}

loadData();
