import { useState, useCallback } from 'react';
import {
  getAllPemakaian, getPendingPemakaian, filterPemakaian,
  validatePemakaianForm, submitPemakaian,
  approvePemakaian, rejectPemakaian,
} from '../models/pemakaianModel.js';

// Controller untuk List & Filter Pemakaian
export const useListPemakaianController = () => {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('Semua');
  const [selectedRow, setSelectedRow] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [pdfOpen, setPdfOpen] = useState(null);

  const allData = getAllPemakaian();
  const filtered = filterPemakaian(allData, { search, status: filterStatus });

  const openDetail = useCallback((row) => { setSelectedRow(row); setDetailOpen(true); }, []);
  const closeDetail = useCallback(() => setDetailOpen(false), []);
  const openPdf = useCallback((row) => setPdfOpen(row), []);
  const closePdf = useCallback(() => setPdfOpen(null), []);

  return {
    search, setSearch, filterStatus, setFilterStatus, filtered, allData,
    selectedRow, detailOpen, openDetail, closeDetail, pdfOpen, openPdf, closePdf,
  };
};

// Controller untuk Buat Pemakaian Baru
export const useBuatPemakaianController = (showToast) => {
  const EMPTY_FORM = { noReservasi: '', tanggal: '', gudang: '', project: '', lokasi: '', nik: '' };
  const EMPTY_MATERIAL = () => ({ id: Date.now(), kode: '', nama: '', qty: '', satuan: '' });

  const [form, setForm] = useState(EMPTY_FORM);
  const [materials, setMaterials] = useState([EMPTY_MATERIAL()]);
  const [submitting, setSubmitting] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const updateForm = (field, value) => setForm(prev => ({ ...prev, [field]: value }));
  const addMaterial = () => setMaterials(prev => [...prev, EMPTY_MATERIAL()]);
  const removeMaterial = (id) => setMaterials(prev => prev.length > 1 ? prev.filter(m => m.id !== id) : prev);
  const updateMaterial = (id, field, value) => setMaterials(prev => prev.map(m => m.id === id ? { ...m, [field]: value } : m));

  const requestSubmit = () => {
    const { valid, errors } = validatePemakaianForm(form, materials);
    if (!valid) { showToast(errors[0], 'error'); return; }
    setConfirmOpen(true);
  };

  const confirmSubmit = async () => {
    setConfirmOpen(false);
    setSubmitting(true);
    const result = await submitPemakaian(form, materials);
    setSubmitting(false);
    if (result.success) {
      showToast(`Pemakaian berhasil dikirim! ${result.id}`, 'success');
      setForm(EMPTY_FORM);
      setMaterials([EMPTY_MATERIAL()]);
    }
  };

  return { form, updateForm, materials, addMaterial, removeMaterial, updateMaterial, submitting, confirmOpen, setConfirmOpen, requestSubmit, confirmSubmit };
};

// Controller untuk Approval Pemakaian
export const useApprovalPemakaianController = (showToast) => {
  const [data, setData] = useState(getPendingPemakaian);
  const [rejectModal, setRejectModal] = useState(null);
  const [rejectNote, setRejectNote] = useState('');
  const [pdfOpen, setPdfOpen] = useState(null);

  const approve = (id) => {
    approvePemakaian(id);
    setData(prev => prev.filter(r => r.id !== id));
    showToast(`${id} telah disetujui`, 'success');
  };

  const confirmReject = () => {
    rejectPemakaian(rejectModal, rejectNote);
    setData(prev => prev.filter(r => r.id !== rejectModal));
    showToast(`${rejectModal} telah ditolak`, 'error');
    setRejectModal(null);
    setRejectNote('');
  };

  return { 
    data, rejectModal, rejectNote, setRejectNote, approve, 
    openRejectModal: (id) => setRejectModal(id), confirmReject,
    pdfOpen, openPdf: setPdfOpen, closePdf: () => setPdfOpen(null) 
  };
};