import React, { useState } from 'react';
import { useWedding } from '../context/WeddingContext';
import {
  Users,
  DollarSign,
  Heart,
  FileClock,
  Trash2,
  Check,
  X,
  Plus,
  QrCode,
  Smartphone,
  MapPin,
  Sparkles,
  BarChart3,
  Calendar
} from 'lucide-react';

export default function AdminPanel() {
  const {
    settings,
    allGuests,
    allContributions,
    allPhotos,
    analyticsLogs,
    isAdmin,
    loginAdmin,
    addGuest,
    deleteGuest,
    toggleCheckIn,
    approvePhoto,
    deletePhoto,
    updateSettings
  } = useWedding();

  const [adminPassword, setAdminPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [adminTab, setAdminTab] = useState<'stats' | 'guests' | 'analytics' | 'gifts' | 'photos'>('stats');

  // Form states for creating new guests
  const [newCode, setNewCode] = useState('');
  const [newName, setNewName] = useState('');
  const [newMaxCompanions, setNewMaxCompanions] = useState(2);
  const [addGuestError, setAddGuestError] = useState('');
  const [addGuestSuccess, setAddGuestSuccess] = useState(false);

  // Settings update fields
  const [editCeremony, setEditCeremony] = useState(settings.ceremonyLocation);
  const [editReception, setEditReception] = useState(settings.receptionLocation);
  const [editStory, setEditStory] = useState(settings.storyText);
  const [settingsSaved, setSettingsSaved] = useState(false);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const success = loginAdmin(adminPassword);
    if (!success) {
      setLoginError('Senha administrativa incorreta. Use o código padrão: 1234');
    }
  };

  const handleCreateGuestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAddGuestError('');
    setAddGuestSuccess(false);

    if (!newCode.trim() || !newName.trim()) {
      setAddGuestError('Preencha o código do convite e o nome.');
      return;
    }

    const result = addGuest(newCode, newName, newMaxCompanions);
    if (result.success) {
      setAddGuestSuccess(true);
      setNewCode('');
      setNewName('');
      setNewMaxCompanions(2);
      setTimeout(() => setAddGuestSuccess(false), 3000);
    } else {
      setAddGuestError(result.error || 'Erro ao criar convidado.');
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      ...settings,
      ceremonyLocation: editCeremony,
      receptionLocation: editReception,
      storyText: editStory
    });
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  // Calculations for Stats tab
  const totalGuestsCount = allGuests.length;
  const confirmedGuests = allGuests.filter(g => g.rsvpStatus === 'confirmed');
  const declinedGuests = allGuests.filter(g => g.rsvpStatus === 'declined');
  const pendingGuests = allGuests.filter(g => g.rsvpStatus === 'pending');

  // Confirmed companions calculation
  let totalConfirmedAdults = confirmedGuests.length;
  confirmedGuests.forEach(g => {
    if (g.companions) {
      totalConfirmedAdults += g.companions.filter(c => c.isConfirmed).length;
    }
  });

  const totalGiftsValue = allContributions.reduce((sum, c) => sum + c.amount, 0);
  const totalCheckIns = allGuests.filter(g => g.checkedIn).length;

  // Analytics tab calculations
  const totalViews = analyticsLogs.filter(l => l.action === 'Abriu Convite').length;
  const rsvpActionsCount = analyticsLogs.filter(l => l.action.startsWith('Confirmou RSVP')).length;

  // Device calculation
  const mobileCount = analyticsLogs.filter(l => l.device.includes('iPhone') || l.device.includes('Android') || l.device.includes('Smartphone')).length;
  const desktopCount = analyticsLogs.length - mobileCount;

  // State distribution simulator
  const regionCounts: { [key: string]: number } = {};
  analyticsLogs.forEach(log => {
    regionCounts[log.region] = (regionCounts[log.region] || 0) + 1;
  });

  // Photo queue
  const pendingPhotos = allPhotos.filter(p => !p.approved);

  return (
    <div className="bg-[#FAF9F5] py-16 px-4 sm:px-6 lg:px-8 text-gray-800 animate-fade-in min-h-screen">
      
      {/* 1. GATEWAY: ADMIN LOGIN */}
      {!isAdmin ? (
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <span className="font-cursive text-5xl text-gold-500 block mb-2">Controle</span>
            <h2 className="font-serif text-3xl text-gray-800 tracking-wide font-medium">Painel Administrativo</h2>
            <p className="text-gray-500 text-xs sm:text-sm mt-2 leading-relaxed">
              Área restrita aos noivos e assessoria de casamento para gerenciamento de RSVP, relatórios de presentes e monitoramento de acessos.
            </p>
            <div className="h-[1px] w-16 bg-gold-200/60 mx-auto mt-4" />
          </div>

          <div className="bg-white border border-gold-200/40 rounded-2xl shadow-xl p-8">
            <form onSubmit={handleAdminLogin} className="space-y-5">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-gray-600 mb-2">
                  Senha Administrativa dos Noivos
                </label>
                <input
                  type="password"
                  required
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="Ex: ••••"
                  className="w-full px-4 py-3 border border-gold-200/50 rounded-xl focus:outline-none focus:ring-1 focus:ring-gold-500 text-sm font-mono tracking-widest text-center"
                  id="input-admin-password"
                />
              </div>

              {loginError && (
                <div className="text-xs text-red-600 bg-red-50 border border-red-100 p-3 rounded-lg text-center leading-snug">
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gold-600 hover:bg-gold-700 text-white font-sans text-xs uppercase tracking-widest py-3 rounded-xl font-semibold shadow transition-all"
                id="btn-admin-login-submit"
              >
                Acessar Painel Noivos
              </button>
            </form>

            <p className="text-[10px] text-gray-400 text-center mt-4">
              Dica: Digite a senha padrão <strong>1234</strong> para visualizar as demonstrações em tempo real.
            </p>
          </div>
        </div>
      ) : (
        /* 2. ADMIN PORTAL DASHBOARD */
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Header block with admin branding */}
          <div className="bg-white border border-gold-200/40 rounded-2xl shadow-sm p-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <span className="text-[10px] bg-gold-100 border border-gold-200 text-gold-700 font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                Assessoria & Cerimonial
              </span>
              <h2 className="font-serif text-3xl font-semibold text-gray-800 mt-2 leading-none">
                Painel Henderson & Alana
              </h2>
            </div>

            {/* Quick dashboard selectors tabs */}
            <div className="flex flex-wrap gap-1.5 p-1 bg-gold-50/20 border border-gold-200/40 rounded-xl">
              {[
                { id: 'stats', label: 'Resumo Geral' },
                { id: 'guests', label: 'Convidados & QR' },
                { id: 'analytics', label: 'Analytics' },
                { id: 'gifts', label: 'Presentes' },
                { id: 'photos', label: `Fotos (${pendingPhotos.length})` }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setAdminTab(tab.id as any)}
                  className={`px-3 py-2 text-xs uppercase tracking-wider font-sans font-semibold rounded-lg transition-all ${
                    adminTab === tab.id
                      ? 'bg-gold-500 text-white shadow-sm'
                      : 'text-gray-500 hover:text-gold-600'
                  }`}
                  id={`admin-tab-btn-${tab.id}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* TAB 1: GENERAL STATS / SETUP SUMMARY */}
          {adminTab === 'stats' && (
            <div className="space-y-8 animate-fade-in">
              {/* Scorecard grids */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* RSVP card */}
                <div className="bg-white p-6 border border-gold-100 rounded-2xl shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Total RSVP Confirmados</span>
                    <h3 className="font-serif text-3xl font-bold text-emerald-600 mt-1">{totalConfirmedAdults}</h3>
                    <span className="text-xs text-gray-400">{confirmedGuests.length} convites aceitos</span>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Users size={20} />
                  </div>
                </div>

                {/* Gifts cash card */}
                <div className="bg-white p-6 border border-gold-100 rounded-2xl shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Fundo de Lua de Mel</span>
                    <h3 className="font-serif text-3xl font-bold text-gold-600 mt-1">
                      {totalGiftsValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </h3>
                    <span className="text-xs text-gray-400">{allContributions.length} contribuições</span>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-gold-50 text-gold-600 flex items-center justify-center">
                    <DollarSign size={20} />
                  </div>
                </div>

                {/* Check-ins Reception card */}
                <div className="bg-white p-6 border border-gold-100 rounded-2xl shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Check-in Presencial</span>
                    <h3 className="font-serif text-3xl font-bold text-gray-800 mt-1">
                      {totalCheckIns} <span className="text-lg text-gray-400">/ {totalGuestsCount}</span>
                    </h3>
                    <span className="text-xs text-gray-400">Passe QR na recepção</span>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <QrCode size={20} />
                  </div>
                </div>

                {/* Open/views analytics card */}
                <div className="bg-white p-6 border border-gold-100 rounded-2xl shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Visualizações do Convite</span>
                    <h3 className="font-serif text-3xl font-bold text-rose-500 mt-1">{totalViews}</h3>
                    <span className="text-xs text-gray-400">{rsvpActionsCount} respostas dadas</span>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center">
                    <Heart size={20} className="fill-current" />
                  </div>
                </div>
              </div>

              {/* RSVPs status breakdown and Edit details Form */}
              <div className="grid md:grid-cols-3 gap-8">
                
                {/* RSVP breakdown graph card */}
                <div className="bg-white border border-gold-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                  <div>
                    <h4 className="font-serif text-lg font-semibold text-gray-800 mb-4 flex items-center gap-1.5">
                      <BarChart3 size={16} className="text-gold-500" />
                      Status de RSVP (Convites)
                    </h4>
                    
                    <div className="space-y-3.5">
                      {/* Confirmed progress */}
                      <div>
                        <div className="flex justify-between text-xs text-gray-600 font-medium mb-1">
                          <span>Confirmado</span>
                          <span>{confirmedGuests.length} ({Math.round((confirmedGuests.length / totalGuestsCount) * 100 || 0)}%)</span>
                        </div>
                        <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                          <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${(confirmedGuests.length / totalGuestsCount) * 100 || 0}%` }} />
                        </div>
                      </div>

                      {/* Pending progress */}
                      <div>
                        <div className="flex justify-between text-xs text-gray-600 font-medium mb-1">
                          <span>Pendente</span>
                          <span>{pendingGuests.length} ({Math.round((pendingGuests.length / totalGuestsCount) * 100 || 0)}%)</span>
                        </div>
                        <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                          <div className="bg-amber-400 h-full rounded-full" style={{ width: `${(pendingGuests.length / totalGuestsCount) * 100 || 0}%` }} />
                        </div>
                      </div>

                      {/* Declined progress */}
                      <div>
                        <div className="flex justify-between text-xs text-gray-600 font-medium mb-1">
                          <span>Recusado</span>
                          <span>{declinedGuests.length} ({Math.round((declinedGuests.length / totalGuestsCount) * 100 || 0)}%)</span>
                        </div>
                        <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                          <div className="bg-red-400 h-full rounded-full" style={{ width: `${(declinedGuests.length / totalGuestsCount) * 100 || 0}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gold-50 pt-4 mt-6 text-[11px] text-gray-400 leading-relaxed">
                    Total de convites cadastrados: <strong>{totalGuestsCount}</strong>.<br />
                    Para adicionar novos convidados, use a aba <strong>Convidados & QR</strong> acima.
                  </div>
                </div>

                {/* Edit Wedding settings fields */}
                <div className="bg-white border border-gold-100 rounded-2xl p-6 shadow-sm md:col-span-2">
                  <h4 className="font-serif text-lg font-semibold text-gray-800 mb-4 flex items-center gap-1.5">
                    <Calendar size={16} className="text-gold-500" />
                    Atualizar Informações do Casamento (Live Edit)
                  </h4>

                  <form onSubmit={handleSaveSettings} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider font-semibold text-gray-500 mb-1">
                          Local da Cerimônia
                        </label>
                        <input
                          type="text"
                          value={editCeremony}
                          onChange={(e) => setEditCeremony(e.target.value)}
                          className="w-full px-3 py-2 border border-gold-200/50 rounded-xl focus:outline-none focus:ring-1 focus:ring-gold-500 text-xs"
                          id="input-edit-ceremony"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase tracking-wider font-semibold text-gray-500 mb-1">
                          Local da Festa / Recepção
                        </label>
                        <input
                          type="text"
                          value={editReception}
                          onChange={(e) => setEditReception(e.target.value)}
                          className="w-full px-3 py-2 border border-gold-200/50 rounded-xl focus:outline-none focus:ring-1 focus:ring-gold-500 text-xs"
                          id="input-edit-reception"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-semibold text-gray-500 mb-1">
                        Mensagem de Boas-Vindas aos Convidados
                      </label>
                      <textarea
                        rows={4}
                        value={editStory}
                        onChange={(e) => setEditStory(e.target.value)}
                        className="w-full px-3.5 py-2.5 border border-gold-200/50 rounded-xl focus:outline-none focus:ring-1 focus:ring-gold-500 text-xs leading-relaxed"
                        id="textarea-edit-story"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {settingsSaved && (
                        <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                          ✔ Dados salvos com sucesso!
                        </span>
                      )}
                      <button
                        type="submit"
                        className="ml-auto bg-gold-600 hover:bg-gold-700 text-white text-xs uppercase tracking-widest px-4 py-2 rounded-lg font-semibold shadow transition-all"
                        id="btn-save-settings"
                      >
                        Salvar Alterações
                      </button>
                    </div>
                  </form>
                </div>

              </div>
            </div>
          )}

          {/* TAB 2: GUEST MANAGEMENT & CHECK-IN */}
          {adminTab === 'guests' && (
            <div className="space-y-8 animate-fade-in">
              <div className="grid md:grid-cols-3 gap-8 items-start">
                
                {/* Form to add guest code */}
                <div className="bg-white border border-gold-100 rounded-2xl p-6 shadow-sm">
                  <h4 className="font-serif text-base font-semibold text-gray-800 mb-4 flex items-center gap-1.5">
                    <Plus size={16} className="text-gold-500" />
                    Gerar Novo Código de Convite
                  </h4>

                  <form onSubmit={handleCreateGuestSubmit} className="space-y-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-semibold text-gray-500 mb-1">
                        Código do Convite (Código de Login) *
                      </label>
                      <input
                        type="text"
                        required
                        value={newCode}
                        onChange={(e) => setNewCode(e.target.value)}
                        placeholder="Ex: FAMILIA-REIS, AMIGO-MARCOS"
                        className="w-full px-3 py-2 border border-gold-200/50 rounded-xl focus:outline-none focus:ring-1 focus:ring-gold-500 text-xs font-mono tracking-wider uppercase"
                        id="input-new-code"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-semibold text-gray-500 mb-1">
                        Nome de Exibição do Grupo / Casal *
                      </label>
                      <input
                        type="text"
                        required
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        placeholder="Ex: Família Reis, Marcos & Júlia..."
                        className="w-full px-3 py-2 border border-gold-200/50 rounded-xl focus:outline-none focus:ring-1 focus:ring-gold-500 text-xs"
                        id="input-new-name"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider font-semibold text-gray-500 mb-1">
                        Limite de Acompanhantes
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="10"
                        value={newMaxCompanions}
                        onChange={(e) => setNewMaxCompanions(parseInt(e.target.value, 10))}
                        className="w-full px-3 py-2 border border-gold-200/50 rounded-xl focus:outline-none focus:ring-1 focus:ring-gold-500 text-xs"
                        id="input-new-max-companions"
                      />
                    </div>

                    {addGuestError && <div className="text-[11px] text-red-600 font-semibold">{addGuestError}</div>}
                    {addGuestSuccess && <div className="text-[11px] text-emerald-600 font-semibold">✔ Código criado com sucesso!</div>}

                    <button
                      type="submit"
                      className="w-full bg-gold-600 hover:bg-gold-700 text-white text-xs uppercase tracking-widest py-2.5 rounded-lg font-semibold shadow transition-all"
                      id="btn-add-guest-submit"
                    >
                      Cadastrar Convidado
                    </button>
                  </form>
                </div>

                {/* Guests list display */}
                <div className="bg-white border border-gold-100 rounded-2xl shadow-sm md:col-span-2 overflow-hidden">
                  <div className="p-6 border-b border-gold-50 flex justify-between items-center flex-wrap gap-2">
                    <h4 className="font-serif text-lg font-semibold text-gray-800 flex items-center gap-1.5">
                      <Users size={16} className="text-gold-500" />
                      Lista Geral de Convidados
                    </h4>
                    <span className="text-xs bg-gold-50 text-gold-600 font-bold px-2.5 py-1 rounded border border-gold-200/40">
                      {totalGuestsCount} convites ativos
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-gold-50/30 border-b border-gold-100/50 uppercase text-[10px] tracking-wider text-gray-500">
                          <th className="p-4">Convidado / Código</th>
                          <th className="p-4">RSVP Status</th>
                          <th className="p-4">Limite Acompanhantes</th>
                          <th className="p-4 text-center">Check-In Recepção</th>
                          <th className="p-4 text-right">Ação</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {allGuests.map((guest) => (
                          <tr key={guest.id} className="hover:bg-gold-50/10 transition-colors">
                            <td className="p-4">
                              <div className="font-semibold text-gray-800 text-sm">{guest.name}</div>
                              <div className="font-mono text-gold-600 text-[10px] tracking-wider font-bold mt-0.5">{guest.code}</div>
                            </td>
                            <td className="p-4">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${
                                guest.rsvpStatus === 'confirmed'
                                  ? 'bg-emerald-50 text-emerald-700'
                                  : guest.rsvpStatus === 'declined'
                                  ? 'bg-red-50 text-red-700'
                                  : 'bg-amber-50 text-amber-700'
                              }`}>
                                {guest.rsvpStatus === 'confirmed' ? 'Confirmado' : guest.rsvpStatus === 'declined' ? 'Recusado' : 'Pendente'}
                              </span>
                            </td>
                            <td className="p-4 font-sans text-gray-600 font-medium">
                              {guest.maxCompanions} pessoas
                            </td>
                            <td className="p-4 text-center">
                              {/* QR Code Check-in simulation button */}
                              <button
                                onClick={() => toggleCheckIn(guest.id)}
                                className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold shadow-sm transition-all ${
                                  guest.checkedIn
                                    ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                                    : 'bg-white border border-gold-300 text-gold-700 hover:bg-gold-50'
                                }`}
                                id={`btn-checkin-guest-${guest.id}`}
                              >
                                {guest.checkedIn ? '✔ Presente' : '⌛ Fazer Check-In'}
                              </button>
                            </td>
                            <td className="p-4 text-right">
                              <button
                                onClick={() => deleteGuest(guest.id)}
                                className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Excluir código"
                                id={`btn-delete-guest-${guest.id}`}
                              >
                                <Trash2 size={14} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 3: INVITATION OPEN ANALYTICS */}
          {adminTab === 'analytics' && (
            <div className="space-y-8 animate-fade-in">
              {/* Graphic displays */}
              <div className="grid md:grid-cols-3 gap-8">
                
                {/* Device and region cards */}
                <div className="bg-white border border-gold-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                  <div>
                    <h4 className="font-serif text-lg font-semibold text-gray-800 mb-4 flex items-center gap-1.5">
                      <Smartphone size={16} className="text-gold-500" />
                      Acesso por Dispositivos
                    </h4>
                    
                    <div className="flex items-center justify-around py-4">
                      {/* Mobile */}
                      <div className="text-center">
                        <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Smartphone size={20} />
                        </div>
                        <span className="text-xs text-gray-500 font-sans block">Mobile</span>
                        <strong className="text-lg font-serif text-gray-800">{mobileCount} acessos</strong>
                      </div>

                      {/* Desktop */}
                      <div className="text-center">
                        <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-2">
                          <BarChart3 size={20} />
                        </div>
                        <span className="text-xs text-gray-500 font-sans block">Desktop</span>
                        <strong className="text-lg font-serif text-gray-800">{desktopCount} acessos</strong>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gold-50 pt-3 text-[11px] text-gray-400 leading-normal">
                    Celulares representam cerca de <strong>{Math.round((mobileCount / (mobileCount + desktopCount || 1)) * 100)}%</strong> dos acessos de convidados.
                  </div>
                </div>

                {/* Regional distribution */}
                <div className="bg-white border border-gold-100 rounded-2xl p-6 shadow-sm md:col-span-2">
                  <h4 className="font-serif text-lg font-semibold text-gray-800 mb-4 flex items-center gap-1.5">
                    <MapPin size={16} className="text-gold-500" />
                    Distribuição Geográfica de Acessos
                  </h4>

                  <div className="space-y-3">
                    {Object.entries(regionCounts).map(([region, count], idx) => {
                      const maxLogCount = Math.max(...Object.values(regionCounts));
                      const progressPercentage = (count / maxLogCount) * 100;

                      return (
                        <div key={idx} className="flex items-center gap-4 text-xs font-sans">
                          <span className="w-28 text-gray-700 font-medium truncate">{region}</span>
                          <div className="flex-grow bg-gray-100 h-3 rounded-full overflow-hidden">
                            <div className="bg-gold-500 h-full rounded-full" style={{ width: `${progressPercentage}%` }} />
                          </div>
                          <span className="w-12 text-right font-bold text-gray-800">{count} logs</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Real-time analytical scrolling table logs */}
              <div className="bg-white border border-gold-100 rounded-2xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gold-50 flex items-center justify-between">
                  <h4 className="font-serif text-lg font-semibold text-gray-800 flex items-center gap-1.5">
                    <FileClock size={16} className="text-gold-500" />
                    Logs de Abertura do Convite (Tempo Real)
                  </h4>
                  <span className="text-xs bg-gold-50 text-gold-600 font-bold px-2.5 py-1 rounded">
                    {analyticsLogs.length} eventos logados
                  </span>
                </div>

                <div className="max-h-[350px] overflow-y-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-gold-50/30 border-b border-gold-100/50 uppercase text-[9px] tracking-wider text-gray-500 sticky top-0 bg-white">
                      <tr>
                        <th className="p-4">Convidado</th>
                        <th className="p-4">Ação</th>
                        <th className="p-4">Dispositivo / Browser</th>
                        <th className="p-4">Estado / Região</th>
                        <th className="p-4 text-right">Data/Hora</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 font-mono">
                      {analyticsLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-gold-50/10 transition-colors">
                          <td className="p-4 font-sans text-gray-800 font-semibold">{log.guestName}</td>
                          <td className="p-4">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-sans ${
                              log.action.includes('Confirmou RSVP')
                                ? 'bg-emerald-50 text-emerald-700'
                                : log.action.includes('Presenteou')
                                ? 'bg-gold-100 text-gold-800'
                                : 'bg-rose-50 text-rose-700'
                            }`}>
                              {log.action}
                            </span>
                          </td>
                          <td className="p-4 text-gray-600 font-sans">{log.device} • {log.browser}</td>
                          <td className="p-4 text-gray-500 font-sans flex items-center gap-1">
                            <MapPin size={10} className="text-gold-500" />
                            {log.region}
                          </td>
                          <td className="p-4 text-right text-gray-400 font-sans text-[11px]">
                            {new Date(log.timestamp).toLocaleString('pt-BR')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: GUEST GIFT CASH CONTRIBUTIONS */}
          {adminTab === 'gifts' && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-white border border-gold-100 rounded-2xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gold-50 flex items-center justify-between flex-wrap gap-2">
                  <h4 className="font-serif text-lg font-semibold text-gray-800 flex items-center gap-1.5">
                    <DollarSign size={16} className="text-gold-500" />
                    Relatório de Presentes Recebidos (Lua de Mel & Casa)
                  </h4>
                  <div className="flex gap-2">
                    <span className="text-xs bg-gold-50 border border-gold-200 text-gold-700 font-bold px-2.5 py-1 rounded">
                      Saldo Total: {totalGiftsValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </span>
                  </div>
                </div>

                {allContributions.length === 0 ? (
                  <div className="text-center py-12 text-gray-400 italic">
                    Nenhuma contribuição recebida ainda.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-gold-50/30 border-b border-gold-100/50 uppercase text-[10px] tracking-wider text-gray-500">
                          <th className="p-4">Padrinho / Convidado</th>
                          <th className="p-4">Presente / Cota Adquirida</th>
                          <th className="p-4">Mensagem Deixada</th>
                          <th className="p-4">Método de Envio</th>
                          <th className="p-4 text-right">Valor Contribuído</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {allContributions.map((c) => (
                          <tr key={c.id} className="hover:bg-gold-50/10 transition-colors">
                            <td className="p-4">
                              <span className="font-semibold text-gray-800 text-sm">{c.guestName}</span>
                              <div className="text-[9px] text-gray-400 mt-0.5">{new Date(c.date).toLocaleString('pt-BR')}</div>
                            </td>
                            <td className="p-4 font-serif text-gray-700 font-medium">
                              {c.giftTitle}
                            </td>
                            <td className="p-4 max-w-xs truncate italic text-gray-500" title={c.message}>
                              {c.message ? `"${c.message}"` : <span className="text-gray-300">Sem mensagem</span>}
                            </td>
                            <td className="p-4 uppercase font-bold text-gold-600 font-mono tracking-wider">
                              {c.paymentMethod}
                            </td>
                            <td className="p-4 text-right font-serif font-bold text-gold-600 text-sm">
                              {c.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: PHOTOS APPROVAL QUEUE */}
          {adminTab === 'photos' && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-white border border-gold-100 rounded-2xl p-6 shadow-sm">
                <div className="flex justify-between items-center border-b border-gold-50 pb-4 mb-6">
                  <h4 className="font-serif text-lg font-semibold text-gray-800 flex items-center gap-1.5">
                    <Heart size={16} className="text-gold-500" />
                    Fila de Moderação de Fotos
                  </h4>
                  <span className="text-xs bg-amber-50 text-amber-700 border border-amber-200 font-bold px-2.5 py-1 rounded">
                    {pendingPhotos.length} fotos pendentes de aprovação
                  </span>
                </div>

                {pendingPhotos.length === 0 ? (
                  <div className="text-center py-12 text-gray-400 italic">
                    Tudo limpo! Não existem fotos na fila de moderação no momento. Todas as fotos enviadas pelos convidados já estão no mural oficial!
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pendingPhotos.map((photo) => (
                      <div
                        key={photo.id}
                        className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-md p-4 flex flex-col justify-between"
                      >
                        {/* Photo container */}
                        <div className="bg-gray-50 aspect-video rounded-lg overflow-hidden mb-3 border">
                          <img
                            src={photo.url}
                            alt="Moderação de foto"
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        {/* Metadata comments */}
                        <div className="space-y-3">
                          <div className="text-xs">
                            <span className="text-gray-400 block">Enviado por:</span>
                            <strong className="text-gray-800 text-sm">{photo.guestName}</strong>
                          </div>

                          {photo.caption && (
                            <p className="text-xs italic text-gray-500 bg-gold-50/30 p-2.5 rounded-lg border border-gold-100">
                              "{photo.caption}"
                            </p>
                          )}

                          {/* Quick decision buttons */}
                          <div className="grid grid-cols-2 gap-2 pt-2 border-t">
                            <button
                              onClick={() => deletePhoto(photo.id)}
                              className="py-1.5 rounded-lg border border-red-200 hover:bg-red-50 text-red-600 text-xs font-semibold flex items-center justify-center gap-1 transition-all"
                              id={`btn-reject-photo-${photo.id}`}
                            >
                              <X size={12} />
                              Rejeitar / Apagar
                            </button>

                            <button
                              onClick={() => approvePhoto(photo.id)}
                              className="py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold flex items-center justify-center gap-1 shadow-sm transition-all"
                              id={`btn-approve-photo-${photo.id}`}
                            >
                              <Check size={12} />
                              Aprovar no Mural
                            </button>
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
}
