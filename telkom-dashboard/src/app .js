import React, { useState } from 'react';
import { GLOBAL_STYLE } from './shared/constants.js';

// Controllers & Components
import { useAuthController } from './controllers/authController.js';
import { TopNavbar } from './views/components/TopNavbar.jsx';
import { Sidebar }   from './views/components/Sidebar.jsx';
import { Toast } from './shared/ui/index.jsx';

// Pages
import { LoginPage }             from './views/pages/LoginPage.jsx';
import { HomePage }              from './views/pages/HomePage.jsx';
/* ... import pages lainnya seperti ListReservasiPage, BuatPemakaianPage, dll. */

// Inject Global Styles
if (typeof document !== 'undefined') {
  const el = document.getElementById('alista-global') || document.createElement('style');
  el.id = 'alista-global';
  el.textContent = GLOBAL_STYLE;
  if (!document.getElementById('alista-global')) document.head.appendChild(el);
}

// Router Mapping
const PAGE_MAP = {
  'Home':               (props) => <HomePage {...props} />,
  'Buat Reservasi':     (props) => <BuatReservasiPage {...props} />,
  'List Reservasi':     (props) => <ListReservasiPage {...props} />,
  'Approval Resv':      (props) => <ApprovalReservasiPage title="Approval Reservasi" {...props} />,
  'Approval Resv TL':   (props) => <ApprovalReservasiPage title="Approval Reservasi TL" {...props} />,
  'Buat Pemakaian':     (props) => <BuatPemakaianPage {...props} />,
  'List Pemakaian':     (props) => <ListPemakaianPage {...props} />,
  'Approval Pemakaian': (props) => <ApprovalPemakaianPage {...props} />,
  'Dashboard':          (props) => <DashboardPage {...props} />,
  'Monitoring':         (props) => <MonitoringPage {...props} />,
};

const AlistaPortal = ({ onLogout, username }) => {
  const [activeTab, setActiveTab] = useState('Home');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = 'success') => setToast({ msg, type });
  const PageComponent = PAGE_MAP[activeTab];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <TopNavbar onLogout={onLogout} username={username} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} open={sidebarOpen} />
        <main style={{ flex: 1, overflowY: 'auto', background: '#F8FAFC' }}>
          {PageComponent 
            ? <PageComponent showToast={showToast} setActiveTab={setActiveTab} username={username} />
            : <div style={{ padding: 40, textAlign: 'center' }}>Halaman sedang dikembangkan.</div>
          }
        </main>
      </div>
      {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default function App() {
  const { isAuthenticated, username, error, loading, login, logout } = useAuthController();

  if (!isAuthenticated) {
    return <LoginPage onLogin={login} error={error} loading={loading} />;
  }

  return <AlistaPortal onLogout={logout} username={username} />;
}