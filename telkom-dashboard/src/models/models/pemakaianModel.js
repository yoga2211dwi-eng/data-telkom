let _pemakaianDb = [
  { id: 'PMK-001', tanggal: '2026-04-18', gudang: 'GDG-JKT-01', project: 'PRJ-2026-001', pemohon: 'Budi Santoso', status: 'Approved', material: 3, reservasi: 'RSV-001' },
  // ... data lainnya
];

let _pendingPemakaianDb = [
  { id: 'PMK-006', tanggal: '2026-04-22', gudang: 'GDG-JKT-01', project: 'PRJ-2026-006', pemohon: 'Reza Firmansyah', material: 3, status: 'Pending', reservasi: 'RSV-006' },
];

export const getAllPemakaian = () => [..._pemakaianDb];
export const getPendingPemakaian = () => [..._pendingPemakaianDb];

export const filterPemakaian = (list, { search = '', status = 'Semua' } = {}) =>
  list.filter(row => {
    const matchStatus = status === 'Semua' || row.status === status;
    const q = search.toLowerCase();
    return matchStatus && (!q || row.id.toLowerCase().includes(q) || row.pemohon.toLowerCase().includes(q) || row.project.toLowerCase().includes(q));
  });

export const validatePemakaianForm = (form, materials) => {
  const errors = [];
  if (!form.noReservasi) errors.push('Nomor reservasi wajib diisi.');
  if (!form.tanggal)     errors.push('Tanggal pemakaian wajib diisi.');
  // ... validasi lainnya sama seperti reservasi
  return { valid: errors.length === 0, errors };
};

export const submitPemakaian = async (form, materials) => {
  await new Promise(r => setTimeout(r, 1400));
  const newId = 'PMK-' + Math.floor(Math.random() * 900 + 100);
  _pemakaianDb = [{ id: newId, ...form, status: 'Pending', material: materials.length }, ..._pemakaianDb];
  return { success: true, id: newId };
};