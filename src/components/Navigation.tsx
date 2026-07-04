import { useWedding } from '../context/WeddingContext';
import { Lock, LogOut, User, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  onOpenAdminLogin: () => void;
}

export default function Navigation({ activeSection, setActiveSection, onOpenAdminLogin }: NavigationProps) {
  const { currentGuest, isAdmin, logoutGuest, logoutAdmin } = useWedding();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'home', label: 'Início' },
    { id: 'story', label: 'Nossa História' },
    { id: 'padrinhos', label: 'Padrinhos' },
    { id: 'gifts', label: 'Lista de Presentes' },
    { id: 'rsvp', label: 'Confirmar Presença' },
    { id: 'photos', label: 'Mural de Fotos' },
  ];

  const handleLogout = () => {
    if (isAdmin) {
      logoutAdmin();
      setActiveSection('home');
    } else {
      logoutGuest();
      setActiveSection('rsvp');
    }
  };

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gold-200/30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Couple Names Branding */}
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => handleNavClick('home')}>
            <span className="font-serif text-2xl tracking-widest text-gold-600 hover:text-gold-700 transition-colors">
              H & A
            </span>
            <div className="hidden sm:block ml-3 pl-3 border-l border-gold-200/50">
              <span className="font-cursive text-2xl text-gold-500">Henderson & Alana</span>
            </div>
          </div>

          {/* Desktop Navigation links */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-3">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-2 text-sm tracking-widest font-sans uppercase transition-all duration-300 border-b-2 hover:text-gold-600 ${
                  activeSection === item.id
                    ? 'border-gold-500 text-gold-600 font-semibold'
                    : 'border-transparent text-gray-500 hover:border-gold-300'
                }`}
                id={`nav-${item.id}`}
              >
                {item.label}
              </button>
            ))}

            {isAdmin && (
              <button
                onClick={() => handleNavClick('admin')}
                className={`px-3 py-2 text-sm tracking-widest font-sans uppercase transition-all duration-300 border-b-2 flex items-center gap-1.5 hover:text-gold-600 ${
                  activeSection === 'admin'
                    ? 'border-gold-500 text-gold-600 font-semibold'
                    : 'border-transparent text-gray-500 hover:border-gold-300'
                }`}
                id="nav-admin"
              >
                <Lock size={12} />
                Painel
              </button>
            )}
          </div>

          {/* Guest Identity & Lock Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {currentGuest ? (
              <div className="flex items-center gap-2 bg-gold-50 border border-gold-200/50 rounded-full py-1.5 px-3">
                <User size={14} className="text-gold-500" />
                <span className="text-xs font-sans font-medium text-gold-700 max-w-[120px] truncate">
                  {currentGuest.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-gray-400 hover:text-red-500 transition-colors ml-1.5"
                  title="Sair do Convite"
                  id="btn-logout"
                >
                  <LogOut size={14} />
                </button>
              </div>
            ) : isAdmin ? (
              <div className="flex items-center gap-2 bg-gray-900 border border-gray-800 rounded-full py-1.5 px-3 text-white">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-gold-400">
                  Admin Logado
                </span>
                <button
                  onClick={handleLogout}
                  className="text-gray-400 hover:text-red-400 transition-colors ml-1.5"
                  title="Sair do Admin"
                  id="btn-logout-admin"
                >
                  <LogOut size={14} />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAdminLogin}
                className="p-2 text-gray-400 hover:text-gold-500 transition-colors"
                title="Área Administrativa"
                id="btn-admin-login-trigger"
              >
                <Lock size={16} />
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-500 hover:text-gold-500 p-2"
              id="btn-mobile-menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gold-200/30 animate-fade-in">
          <div className="px-2 pt-2 pb-4 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-2.5 rounded-md text-sm tracking-widest font-sans uppercase ${
                  activeSection === item.id
                    ? 'bg-gold-50 text-gold-600 font-semibold border-l-4 border-gold-400'
                    : 'text-gray-600 hover:bg-gold-50/50 hover:text-gold-500'
                }`}
                id={`mobile-nav-${item.id}`}
              >
                {item.label}
              </button>
            ))}

            {isAdmin && (
              <button
                onClick={() => handleNavClick('admin')}
                className={`w-full text-left px-4 py-2.5 rounded-md text-sm tracking-widest font-sans uppercase flex items-center gap-1.5 ${
                  activeSection === 'admin'
                    ? 'bg-gold-50 text-gold-600 font-semibold border-l-4 border-gold-400'
                    : 'text-gray-600 hover:bg-gold-50/50 hover:text-gold-500'
                }`}
                id="mobile-nav-admin"
              >
                <Lock size={12} />
                Painel Admin
              </button>
            )}

            {/* Mobile identity block */}
            <div className="pt-4 mt-4 border-t border-gold-100 px-4">
              {currentGuest ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <User size={16} className="text-gold-500" />
                    <span className="text-xs font-sans font-medium text-gray-700">
                      {currentGuest.name}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1.5 text-xs text-red-500 font-medium"
                    id="btn-logout-mobile"
                  >
                    <LogOut size={12} /> Sair
                  </button>
                </div>
              ) : isAdmin ? (
                <div className="flex items-center justify-between">
                  <span className="text-xs font-sans font-semibold text-gold-600">
                    PAINEL ADMIN ATIVO
                  </span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1.5 text-xs text-red-400 font-medium"
                    id="btn-logout-admin-mobile"
                  >
                    <LogOut size={12} /> Desconectar
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    onOpenAdminLogin();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 text-xs text-gold-600 font-sans tracking-wider uppercase"
                  id="btn-admin-login-mobile-trigger"
                >
                  <Lock size={12} /> Acesso Noivos
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
