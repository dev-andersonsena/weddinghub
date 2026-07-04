import React, { useState } from 'react';
import { WeddingProvider, useWedding } from './context/WeddingContext';
import Navigation from './components/Navigation';
import PremiumMusicPlayer from './components/PremiumMusicPlayer';
import InvitationHome from './components/InvitationHome';
import LoveStory from './components/LoveStory';
import BridalParty from './components/BridalParty';
import GiftList from './components/GiftList';
import RSVPForm from './components/RSVPForm';
import PhotoWall from './components/PhotoWall';
import AdminPanel from './components/AdminPanel';
import { Sparkles, Heart, X, Lock } from 'lucide-react';

function WeddingAppContent() {
  const { currentGuest, isAdmin, loginAdmin } = useWedding();
  const [activeSection, setActiveSection] = useState('home');
  const [adminLoginOpen, setAdminLoginOpen] = useState(false);
  const [adminPass, setAdminPass] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleAdminLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const success = loginAdmin(adminPass);
    if (success) {
      setAdminPass('');
      setAdminLoginOpen(false);
      setActiveSection('admin');
    } else {
      setLoginError('Senha administrativa incorreta. Código padrão: 1234');
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return <InvitationHome />;
      case 'story':
        return <LoveStory />;
      case 'padrinhos':
        return <BridalParty />;
      case 'gifts':
        return <GiftList />;
      case 'rsvp':
        return <RSVPForm />;
      case 'photos':
        return <PhotoWall />;
      case 'admin':
        return <AdminPanel />;
      default:
        return <InvitationHome />;
    }
  };

  return (
    <div className="bg-[#FCFBF7] min-h-screen flex flex-col font-sans antialiased text-gray-800 selection:bg-gold-200/50 selection:text-gold-900">
      
      {/* Premium top announcements ticker line */}
      <div className="bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600 text-white text-[10px] sm:text-xs font-sans tracking-[0.2em] py-2 px-4 uppercase font-semibold text-center select-none flex items-center justify-center gap-1">
        <Sparkles size={11} className="animate-spin" style={{ animationDuration: '4s' }} />
        <span>Casamento de Henderson e Alana • 22 de Maio de 2027</span>
        <Sparkles size={11} className="animate-spin" style={{ animationDuration: '4s' }} />
      </div>

      {/* Floating navigation bar */}
      <Navigation
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onOpenAdminLogin={() => {
          setAdminPass('');
          setLoginError('');
          setAdminLoginOpen(true);
        }}
      />

      {/* Main viewport rendering current tab/route */}
      <main className="flex-grow">
        {renderSection()}
      </main>

      {/* Interactive premium floating music player */}
      <PremiumMusicPlayer />

      {/* Elegant Editorial Footer */}
      <footer className="bg-white border-t border-gold-200/30 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="font-cursive text-5xl text-gold-500 block">Henderson & Alana</span>
          
          <div className="flex justify-center items-center gap-3">
            <span className="text-xs uppercase tracking-widest text-gray-400 font-semibold">22.05.2027</span>
            <span className="text-gold-300">|</span>
            <span className="text-xs uppercase tracking-widest text-gray-400 font-semibold">Fortaleza, CE</span>
          </div>

          <p className="text-xs text-gray-400 font-sans leading-relaxed max-w-md mx-auto">
            "O amor é paciente, o amor é bondoso. Não inveja, não se vangloria, não se orgulha. Tudo sofre, tudo crê, tudo espera, tudo suporta." <br />
            <span className="italic mt-1.5 block font-serif">— 1 Coríntios 13:4-7</span>
          </p>

          <div className="h-[1px] w-24 bg-gold-200/40 mx-auto" />

          <div className="flex flex-col items-center gap-1 pt-2">
            <span className="text-[9px] uppercase tracking-widest text-gray-400 font-sans">
              Convite Digital de Casamento Premium
            </span>
            <span className="text-[8px] text-gold-500/60 font-sans">
              Desenvolvido com carinho para Henderson & Alana
            </span>
          </div>
        </div>
      </footer>

      {/* ADMIN PASSCODE OVERLAY MODAL */}
      {adminLoginOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white border border-gold-200 rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden">
            <div className="bg-gold-50/50 border-b border-gold-100 p-5 flex justify-between items-center">
              <span className="font-serif text-base font-semibold text-gray-800 flex items-center gap-1.5">
                <Lock size={15} className="text-gold-500" />
                Área Administrativa
              </span>
              <button
                onClick={() => setAdminLoginOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                id="btn-close-admin-login"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6">
              <form onSubmit={handleAdminLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-gray-500 mb-1.5">
                    Insira a Senha Administrativa
                  </label>
                  <input
                    type="password"
                    required
                    value={adminPass}
                    onChange={(e) => setAdminPass(e.target.value)}
                    placeholder="••••"
                    className="w-full px-4 py-2.5 border border-gold-200/50 rounded-xl focus:outline-none focus:ring-1 focus:ring-gold-500 text-sm font-mono text-center tracking-widest font-bold"
                    id="input-admin-pass-modal"
                  />
                </div>

                {loginError && (
                  <div className="text-xs text-red-600 bg-red-50 border border-red-100 p-2.5 rounded-lg leading-snug">
                    {loginError}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-gold-600 hover:bg-gold-700 text-white font-sans text-xs uppercase tracking-widest py-2.5 rounded-xl font-semibold shadow transition-all"
                  id="btn-admin-login-modal-submit"
                >
                  Entrar no Painel
                </button>
              </form>

              <div className="text-[10px] text-gray-400 text-center mt-4">
                Código de teste padrão dos Noivos: <strong>1234</strong>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <WeddingProvider>
      <WeddingAppContent />
    </WeddingProvider>
  );
}
