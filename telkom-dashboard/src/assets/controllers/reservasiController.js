import { useState, useCallback } from 'react';
import { 
  getAllReservasi, getPendingApproval, filterReservasi, 
  validateReservasiForm, submitReservasi, approveReservasi, rejectReservasi 
} from '../models/reservasiModel.js';

// Controller untuk List
export const useListReservasiController = () => {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('Semua');
  const [selectedRow, setSelectedRow] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const allData = getAllReservasi();
  const filtered = filterReservasi(allData, { search, status: filterStatus });

  const openDetail = useCallback((row) => {
    setSelectedRow(row);
    setDetailOpen(true);
  }, []);

  return { search, setSearch, filterStatus, setFilterStatus, filtered, selectedRow, detailOpen, openDetail, closeDetail: () => setDetailOpen(false) };
};

// Controller untuk Form Input
export const useBuatReservasiController = (showToast) => {
  const EMPTY_FORM = { tanggal: '', gudang: '', project: '', lokasi: '', nik: '', wo: '' };
  const EMPTY_MATERIAL = () => ({ id: Date.now(), kode: '', nama: '', qty: '', satuan: '' });

  const [form, setForm] = useState(EMPTY_FORM);
  const [materials, setMaterials] = useState([EMPTY_MATERIAL()]);
  const [submitting, setSubmitting] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const updateForm = (field, value) => setForm(prev => ({ ...prev, [field]: value }));
  
  const requestSubmit = () => {
    const { valid, errors } = validateReservasiForm(form, materials);
    if (!valid) return showToast(errors[0], 'error');
    setConfirmOpen(true);
  };

  const confirmSubmit = async () => {
    setConfirmOpen(false);
    setSubmitting(true);
    const result = await submitReservasi(form, materials);
    setSubmitting(false);
    if (result.success) {
      showToast(`Berhasil! ID: ${result.id}`, 'success');
      setForm(EMPTY_FORM);
      setMaterials([EMPTY_MATERIAL()]);
    }
  };

  return { form, updateForm, materials, submitting, confirmOpen, setConfirmOpen, requestSubmit, confirmSubmit };
};