import React, { useState } from 'react';
import { Icon } from '../icons';
import { COLORS } from '../constants';

export const PdfExplorer = ({ doc, onClose, showToast }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(100);
  const [uploadedFile, setUploadedFile] = useState(null);
  const totalPages = 3;

  const mockContent = [
    {
      page: 1,
      title: 'SURAT PEMAKAIAN MATERIAL',
      content: [
        { label: 'No. Dokumen', value: doc?.id || 'PMK-XXX' },
        { label: 'No. Reservasi', value: doc?.reservasi || 'RSV-XXX' },
        { label: 'Tanggal', value: doc?.tanggal || '-' },
        { label: 'Gudang', value: doc?.gudang || '-' },
        { label: 'Project', value: doc?.project || '-' },
        { label: 'Pemohon', value: doc?.pemohon || '-' },
        { label: 'Status', value: doc?.status || '-' },
      ],
    },
    {
      page: 2,
      title: 'DETAIL MATERIAL',
      table: [
        { no: 1, kode: 'MTR-001', nama: 'Kabel UTP Cat6', qty: 200, satuan: 'Meter' },
        { no: 2, kode: 'MTR-045', nama: 'Patch Panel 24 Port', qty: 5, satuan: 'Unit' },
        { no: 3, kode: 'MTR-089', nama: 'Switch 24 Port', qty: 3, satuan: 'Unit' },
        { no: 4, kode: 'MTR-112', nama: 'Rack Server 42U', qty: 1, satuan: 'Unit' },
      ],
    },
    {
      page: 3,
      title: 'TANDA TANGAN & PERSETUJUAN',
      signatures: ['Pemohon', 'Kepala Gudang', 'Manager', 'TL Approver'],
    },
  ];

  const page = mockContent[currentPage - 1];

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(15,23,42,0.75)',
      zIndex: 9000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backdropFilter: 'blur(6px)',
    }} onClick={onClose}>
      <div style={{
        background: COLORS.white,
        borderRadius: 16,
        width: '92%',
        maxWidth: 900,
        height: '90vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxShadow: '0 32px 80px rgba(0,0,0,0.35)',
        animation: 'fadeUp 0.25s ease',
      }} onClick={(e) => e.stopPropagation()}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 20px',
          background: COLORS.gray900,
          borderRadius: '16px 16px 0 0',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              background: COLORS.telkomRed,
              borderRadius: 6,
              padding: '5px 10px',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}>
              <Icon name="file" size={14} color="#fff" />
              <span style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>PDF</span>
            </div>
            <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.gray100 }}>{doc?.id || 'Dokumen'} — Surat Pemakaian Material</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <label style={{
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: 8,
              padding: '6px 14px',
              cursor: 'pointer',
              fontSize: 12,
              fontWeight: 600,
              color: COLORS.gray200,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}>
              <Icon name="upload" size={13} color={COLORS.gray300} />
              Upload PDF
              <input type="file" accept=".pdf" style={{ display: 'none' }} onChange={(e) => {
                const f = e.target.files[0];
                if (f) {
                  setUploadedFile(f);
                  showToast(`PDF "${f.name}" berhasil diupload`, 'success');
                }
              }} />
            </label>
            <button onClick={() => showToast('PDF berhasil diunduh', 'success')} style={{
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: 8,
              padding: '6px 14px',
              cursor: 'pointer',
              fontSize: 12,
              fontWeight: 600,
              color: COLORS.gray200,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}>
              <Icon name="download" size={13} color={COLORS.gray300} /> Unduh
            </button>
            <button onClick={() => showToast('Dicetak', 'info')} style={{
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: 8,
              padding: '6px 14px',
              cursor: 'pointer',
              fontSize: 12,
              fontWeight: 600,
              color: COLORS.gray200,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}>
              <Icon name="printer" size={13} color={COLORS.gray300} /> Cetak
            </button>
            <button onClick={onClose} style={{
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              borderRadius: 8,
              width: 34,
              height: 34,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}>
              <Icon name="x" size={16} color={COLORS.gray200} />
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          <div style={{ width: 130, background: COLORS.gray800, overflowY: 'auto', padding: '16px 10px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {mockContent.map((p, i) => (
              <div key={i} onClick={() => setCurrentPage(i + 1)} style={{
                background: currentPage === i + 1 ? COLORS.telkomRed : COLORS.gray700,
                borderRadius: 8,
                padding: 8,
                cursor: 'pointer',
                border: currentPage === i + 1 ? `2px solid ${COLORS.telkomRedLight}` : '2px solid transparent',
                transition: 'all 0.15s',
              }}>
                <div style={{ background: '#fff', borderRadius: 4, padding: '10px 8px', minHeight: 80, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{ height: 6, background: COLORS.gray300, borderRadius: 2, marginBottom: 4 }} />
                  <div style={{ height: 4, background: COLORS.gray200, borderRadius: 2, marginBottom: 3 }} />
                  <div style={{ height: 4, background: COLORS.gray200, borderRadius: 2, marginBottom: 3, width: '70%' }} />
                  <div style={{ height: 4, background: COLORS.gray100, borderRadius: 2, marginBottom: 3 }} />
                  <div style={{ height: 4, background: COLORS.gray100, borderRadius: 2, width: '80%' }} />
                </div>
                <div style={{ textAlign: 'center', fontSize: 10, color: currentPage === i + 1 ? '#fff' : COLORS.gray300, marginTop: 6, fontWeight: 600 }}>Hal {i + 1}</div>
              </div>
            ))}
          </div>

          <div style={{ flex: 1, overflowY: 'auto', background: COLORS.gray700, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 24, gap: 16 }}>
            {uploadedFile ? (
              <div style={{
                background: '#fff',
                borderRadius: 8,
                width: `${zoom}%`,
                maxWidth: 680,
                minHeight: 500,
                boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 40,
              }}>
                <Icon name="file" size={56} color={COLORS.telkomRed} />
                <div style={{ marginTop: 16, fontSize: 15, fontWeight: 700, color: COLORS.gray800 }}>{uploadedFile.name}</div>
                <div style={{ fontSize: 12, color: COLORS.gray400, marginTop: 4 }}>{(uploadedFile.size / 1024).toFixed(1)} KB · PDF</div>
                <div style={{ marginTop: 20, fontSize: 12, color: COLORS.gray500 }}>Preview PDF memerlukan viewer. Klik Unduh untuk membuka.</div>
                <button onClick={() => showToast('PDF berhasil diunduh', 'success')} style={{
                  marginTop: 16,
                  background: COLORS.telkomRed,
                  border: 'none',
                  borderRadius: 8,
                  padding: '10px 24px',
                  color: '#fff',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}>
                  <Icon name="download" size={14} color="#fff" /> Unduh File
                </button>
              </div>
            ) : (
              <div style={{
                background: '#fff',
                borderRadius: 8,
                width: `${Math.min(zoom, 100)}%`,
                maxWidth: 680,
                boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
                padding: '48px 52px',
                transform: `scale(${zoom / 100})`,
                transformOrigin: 'top center',
                transition: 'transform 0.2s',
              }}>
                <div style={{ textAlign: 'center', borderBottom: `3px solid ${COLORS.telkomRed}`, paddingBottom: 16, marginBottom: 24 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 8 }}>
                    <div style={{ width: 44, height: 44, background: COLORS.telkomRed, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: '#fff', fontSize: 20 }}>T</div>
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 800, color: COLORS.gray900 }}>PT TELKOM INDONESIA</div>
                      <div style={{ fontSize: 10, color: COLORS.gray500, letterSpacing: 1 }}>SUPPLY CHAIN MANAGEMENT · ALISTA</div>
                    </div>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: COLORS.telkomRed, letterSpacing: 0.5, marginTop: 10 }}>{page.title}</div>
                </div>

                {page.content && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                    {page.content.map((row) => (
                      <div key={row.label} style={{
                        display: 'grid',
                        gridTemplateColumns: '160px 16px 1fr',
                        padding: '7px 0',
                        borderBottom: `1px solid ${COLORS.gray100}`,
                        alignItems: 'center',
                      }}>
                        <span style={{ fontSize: 12, color: COLORS.gray500, fontWeight: 500 }}>{row.label}</span>
                        <span style={{ fontSize: 12, color: COLORS.gray400 }}>:</span>
                        <span style={{ fontSize: 12, fontWeight: 600, color: COLORS.gray800 }}>{row.value}</span>
                      </div>
                    ))}
                    <div style={{ marginTop: 20, padding: '12px 16px', background: COLORS.gray50, borderRadius: 8, border: `1px solid ${COLORS.gray200}` }}>
                      <div style={{ fontSize: 11, color: COLORS.gray500, fontWeight: 600, marginBottom: 4 }}>CATATAN</div>
                      <div style={{ fontSize: 12, color: COLORS.gray600, lineHeight: 1.7 }}>
                        Dokumen ini diterbitkan secara digital oleh sistem ALISTA. Validitas dokumen dapat diverifikasi melalui portal resmi TelkomAkses.
                      </div>
                    </div>
                  </div>
                )}

                {page.table && (
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                      <thead>
                        <tr style={{ background: COLORS.telkomRed }}>
                          {['No', 'Kode', 'Nama Material', 'Qty', 'Satuan'].map((h) => (
                            <th key={h} style={{ padding: '9px 12px', textAlign: 'left', color: '#fff', fontWeight: 700, fontSize: 11, letterSpacing: 0.4 }}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {page.table.map((row, i) => (
                          <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : COLORS.gray50, borderBottom: `1px solid ${COLORS.gray200}` }}>
                            <td style={{ padding: '9px 12px', color: COLORS.gray500 }}>{row.no}</td>
                            <td style={{ padding: '9px 12px', fontFamily: "'JetBrains Mono', monospace", color: COLORS.telkomRed, fontSize: 11, fontWeight: 700 }}>{row.kode}</td>
                            <td style={{ padding: '9px 12px', color: COLORS.gray800, fontWeight: 500 }}>{row.nama}</td>
                            <td style={{ padding: '9px 12px', color: COLORS.gray800, fontWeight: 700 }}>{row.qty}</td>
                            <td style={{ padding: '9px 12px', color: COLORS.gray600 }}>{row.satuan}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div style={{ marginTop: 16, padding: '12px 16px', background: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: 8 }}>
                      <span style={{ fontSize: 12, color: '#92400E', fontWeight: 600 }}>Total: {page.table.reduce((acc, r) => acc + r.qty, 0)} item material</span>
                    </div>
                  </div>
                )}

                {page.signatures && (
                  <div>
                    <div style={{ fontSize: 12, color: COLORS.gray500, marginBottom: 24 }}>Dokumen ini telah disetujui oleh pihak-pihak berikut:</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                      {page.signatures.map((sig) => (
                        <div key={sig} style={{ textAlign: 'center', padding: 16, border: `1px dashed ${COLORS.gray300}`, borderRadius: 8 }}>
                          <div style={{ height: 48, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', marginBottom: 8 }}>
                            <div style={{ width: '80%', borderBottom: `2px solid ${COLORS.gray400}` }} />
                          </div>
                          <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.gray700 }}>{sig}</div>
                          <div style={{ fontSize: 10, color: COLORS.gray400, marginTop: 2 }}>Tanda Tangan & Cap</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ marginTop: 24, textAlign: 'center', fontSize: 10, color: COLORS.gray400, borderTop: `1px solid ${COLORS.gray100}`, paddingTop: 16 }}>
                      © 2026 PT Telkom Indonesia · ALISTA v2.4.0 · Dokumen ini sah secara digital
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 20px',
          background: COLORS.gray800,
          borderRadius: '0 0 16px 16px',
          borderTop: `1px solid ${COLORS.gray700}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1} style={{
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              borderRadius: 6,
              width: 30,
              height: 30,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              opacity: currentPage === 1 ? 0.4 : 1,
            }}>
              <Icon name="chevronRight" size={14} color={COLORS.gray200} style={{ transform: 'rotate(180deg)' }} />
            </button>
            <span style={{ fontSize: 12, color: COLORS.gray300, fontWeight: 500 }}>Halaman {currentPage} dari {totalPages}</span>
            <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} style={{
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              borderRadius: 6,
              width: 30,
              height: 30,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              opacity: currentPage === totalPages ? 0.4 : 1,
            }}>
              <Icon name="chevronRight" size={14} color={COLORS.gray200} />
            </button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button onClick={() => setZoom((z) => Math.max(50, z - 10))} style={{
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              borderRadius: 6,
              width: 28,
              height: 28,
              cursor: 'pointer',
              color: COLORS.gray200,
              fontSize: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>−</button>
            <span style={{ fontSize: 12, color: COLORS.gray300, minWidth: 44, textAlign: 'center', fontWeight: 600 }}>{zoom}%</span>
            <button onClick={() => setZoom((z) => Math.min(150, z + 10))} style={{
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              borderRadius: 6,
              width: 28,
              height: 28,
              cursor: 'pointer',
              color: COLORS.gray200,
              fontSize: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>+</button>
            <button onClick={() => setZoom(100)} style={{
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              borderRadius: 6,
              padding: '0 10px',
              height: 28,
              cursor: 'pointer',
              color: COLORS.gray400,
              fontSize: 11,
              fontWeight: 600,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}>Reset</button>
          </div>
        </div>
      </div>
    </div>
  );
};
