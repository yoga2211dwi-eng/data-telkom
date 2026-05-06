// Simulasi database lokal
let _reservasiDb = [
  { id: 'RSV-001', tanggal: '2026-04-18', gudang: 'GDG-JKT-01', project: 'PRJ-2026-001', pemohon: 'Budi Santoso',    status: 'Approved',    material: 3 },
  { id: 'RSV-002', tanggal: '2026-04-19', gudang: 'GDG-BDG-02', project: 'PRJ-2026-002', pemohon: 'Siti Rahma',      status: 'Approved',    material: 5 },
  { id: 'RSV-003', tanggal: '2026-04-20', gudang: 'GDG-SBY-01', project: 'PRJ-2026-003', pemohon: 'Ahmad Fauzi',     status: 'Rejected',    material: 2 },
  { id: 'RSV-004', tanggal: '2026-04-21', gudang: 'GDG-JKT-01', project: 'PRJ-2026-004', pemohon: 'Yoga Pratama',    status: 'Pending',     material: 4 },
  { id: 'RSV-005', tanggal: '2026-04-22', gudang: 'GDG-MKS-01', project: 'PRJ-2026-005', pemohon: 'Dewi Lestari',    status: 'In Progress', material: 7 },
];

let _pendingApprovalDb = [
  { id: 'RSV-006', tanggal: '2026-04-22', gudang: 'GDG-JKT-01', project: 'PRJ-2026-006', pemohon: 'Reza Firmansyah', material: 3, status: 'Pending' },
  { id: 'RSV-007', tanggal: '2026-04-22', gudang: 'GDG-BDG-02', project: 'PRJ-2026-007', pemohon: 'Nurul Hidayah',   material: 6, status: 'Pending' },
];

export const getAllReservasi = () => [..._reservasiDb];
export const getPendingApproval = () => [..._pendingApprovalDb];

export const filterReservasi = (list, { search = '', status = 'Semua' } = {}) => {
  return list.filter(row => {
    const matchStatus = status === 'Semua' || row.status === status;
    const q = search.toLowerCase();
    const matchSearch = !q || row.id.toLowerCase().includes(q) || row.pemohon.toLowerCase().includes(q) || row.project.toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });
};

export const generateReservasiId = () => 'RSV-' + String(Math.floor(Math.random() * 900) + 100);

export const validateReservasiForm = (form, materials) => {
  const errors = [];
  if (!form.tanggal) errors.push('Tanggal pengambilan wajib diisi.');
  if (!form.gudang)  errors.push('Gudang wajib diisi.');
  if (!form.project) errors.push('Project ID wajib diisi.');
  if (!form.lokasi)  errors.push('Lokasi project wajib diisi.');
  if (!form.nik)     errors.push('NIK pemakai wajib diisi.');
  const emptyMat = materials.some(m => !m.kode || !m.nama || !m.qty || !m.satuan);
  if (emptyMat)      errors.push('Semua baris material wajib dilengkapi.');
  return { valid: errors.length === 0, errors };
};

export const submitReservasi = async (form, materials) => {
  await new Promise(r => setTimeout(r, 1400));
  const newId = generateReservasiId();
  _reservasiDb = [{ id: newId, ...form, status: 'Pending', material: materials.length }, ..._reservasiDb];
  return { success: true, id: newId };
};

export const approveReservasi = (id) => {
  _pendingApprovalDb = _pendingApprovalDb.filter(r => r.id !== id);
  return { success: true };
};

export const rejectReservasi = (id, _reason) => {
  _pendingApprovalDb = _pendingApprovalDb.filter(r => r.id !== id);
  return { success: true };
};

export const getReservasiStats = () => ({
  total: _reservasiDb.length,
  pending: _reservasiDb.filter(r => r.status === 'Pending').length,
  approved: _reservasiDb.filter(r => r.status === 'Approved').length,
  rejected: _reservasiDb.filter(r => r.status === 'Rejected').length,
});