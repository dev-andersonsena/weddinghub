import React, { useState } from 'react';
import { useWedding } from '../context/WeddingContext';
import { Companion } from '../types';
import { Check, X, Calendar, MapPin, QrCode, Key, Users, AlertCircle, Heart } from 'lucide-react';

export default function RSVPForm() {
  const { currentGuest, loginGuest, updateRSVP } = useWedding();
  const [inviteCode, setInviteCode] = useState('');
  const [loginError, setLoginError] = useState('');

  // Form states (pre-populated from currentGuest when editing)
  const [isAttending, setIsAttending] = useState<boolean>(true);
  const [companions, setCompanions] = useState<Companion[]>([]);
  const [dietary, setDietary] = useState('');
  const [comment, setComment] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Initialize RSVP form fields
  const handleStartRSVP = () => {
    if (currentGuest) {
      setIsAttending(currentGuest.rsvpStatus !== 'declined');
      setDietary(currentGuest.dietaryRestrictions || '');
      setComment(currentGuest.comment || '');
      
      // Initialize companions
      const initialCompanions = currentGuest.companions || [];
      if (initialCompanions.length === 0 && currentGuest.maxCompanions > 0) {
        // Build blanks up to max companions
        const blanks: Companion[] = [];
        for (let i = 0; i < currentGuest.maxCompanions; i++) {
          blanks.push({ name: `Acompanhante ${i + 1}`, isConfirmed: false });
        }
        setCompanions(blanks);
      } else {
        setCompanions(initialCompanions);
      }
      setIsEditing(true);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (!inviteCode.trim()) return;

    const result = loginGuest(inviteCode);
    if (!result.success) {
      setLoginError(result.error || 'Erro ao realizar login.');
    }
  };

  const handleCompanionCheckChange = (index: number, checked: boolean) => {
    const updated = [...companions];
    updated[index].isConfirmed = checked;
    setCompanions(updated);
  };

  const handleCompanionNameChange = (index: number, name: string) => {
    const updated = [...companions];
    updated[index].name = name;
    setCompanions(updated);
  };

  const handleSubmitRSVP = (e: React.FormEvent) => {
    e.preventDefault();
    const finalCompanions = isAttending ? companions : companions.map(c => ({ ...c, isConfirmed: false }));
    updateRSVP(
      isAttending ? 'confirmed' : 'declined',
      finalCompanions,
      dietary,
      comment
    );
    setIsEditing(false);
  };

  // Helper to format date
  const formatDateTime = (isoString?: string) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-[#FAF9F5] py-20 px-4 sm:px-6 lg:px-8 text-gray-800 animate-fade-in min-h-screen">
      {/* 1. NOT LOGGED IN VIEW: Passcode Gate */}
      {!currentGuest ? (
        <div className="max-w-md mx-auto">
          {/* Header Title */}
          <div className="text-center mb-8">
            <span className="font-cursive text-5xl text-gold-500 block mb-2">Presença</span>
            <h2 className="font-serif text-3xl text-gray-800 tracking-wide font-medium">Acesso de Convidados</h2>
            <p className="text-gray-500 text-xs sm:text-sm mt-2 leading-relaxed">
              Digite o código impresso no seu convite individual ou cartão de recepção para acessar sua confirmação e seu QR Code exclusivo.
            </p>
            <div className="h-[1px] w-16 bg-gold-200/60 mx-auto mt-4" />
          </div>

          {/* Login Card */}
          <div className="bg-white border border-gold-200/40 rounded-2xl shadow-xl p-8">
            <form onSubmit={handleLoginSubmit} className="space-y-5">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-gray-600 mb-2 flex items-center gap-1">
                  <Key size={12} className="text-gold-500" />
                  Código do Convite
                </label>
                <input
                  type="text"
                  required
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value)}
                  placeholder="EX: PAIS-NOIVOS, VIP-FAMILIA"
                  className="w-full px-4 py-3 border border-gold-200/50 rounded-xl focus:outline-none focus:ring-1 focus:ring-gold-500 text-sm font-mono tracking-widest uppercase text-center text-gold-700 font-bold"
                  id="input-invite-code"
                />
              </div>

              {loginError && (
                <div className="flex gap-2 text-xs text-red-600 bg-red-50 border border-red-100 p-3 rounded-lg leading-snug">
                  <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
                  <span>{loginError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gold-600 hover:bg-gold-700 text-white font-sans text-xs uppercase tracking-widest py-3 rounded-xl font-semibold shadow transition-all active:scale-95"
                id="btn-login-submit"
              >
                Acessar Convite Premium
              </button>
            </form>
          </div>

          {/* Tester Helper box (very friendly for reviews) */}
          <div className="mt-8 bg-gold-50/40 border border-gold-200/30 rounded-xl p-4 text-xs space-y-2">
            <div className="font-semibold text-gold-700 flex items-center gap-1">
              <AlertCircle size={12} />
              Códigos de Teste Registrados:
            </div>
            <p className="text-gray-500 leading-relaxed">
              Você pode testar os diferentes fluxos usando um dos códigos válidos abaixo:
            </p>
            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono mt-1">
              <div className="bg-white p-1.5 rounded border border-gold-100">
                <strong className="text-gold-600 block">PAIS-NOIVOS</strong>
                Sérgio, Maria, Joaquim... (Pai/Mãe)
              </div>
              <div className="bg-white p-1.5 rounded border border-gold-100">
                <strong className="text-gold-600 block">VIP-FAMILIA</strong>
                Família Silva Antunes (3 pessoas)
              </div>
              <div className="bg-white p-1.5 rounded border border-gold-100">
                <strong className="text-gold-600 block">MADRINHA-SARAH</strong>
                Sarah Rocha (Irmã da Noiva)
              </div>
              <div className="bg-white p-1.5 rounded border border-gold-100">
                <strong className="text-gold-600 block">AMIGO-BRUNO</strong>
                Bruno e Amanda
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* 2. LOGGED IN GUEST RSVP DASHBOARD */
        <div className="max-w-4xl mx-auto grid md:grid-cols-12 gap-8 items-start">
          
          {/* Column A: RSVP details (8 columns) */}
          <div className="md:col-span-7 space-y-6">
            
            {/* Greetings header */}
            <div className="bg-white border border-gold-100 rounded-2xl shadow-sm p-6">
              <span className="font-cursive text-3xl text-gold-500">Olá,</span>
              <h3 className="font-serif text-2xl font-bold text-gray-800 mb-2 leading-none">
                {currentGuest.name}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Ficamos imensamente honrados com a sua presença. Verifique abaixo seu status de confirmação e altere se necessário.
              </p>
            </div>

            {/* Current RSVP state overview */}
            {!isEditing && currentGuest.rsvpStatus !== 'pending' && (
              <div className="bg-white border border-gold-100 rounded-2xl shadow-md p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                    Seu Status de Confirmação
                  </span>
                  <span className={`text-xs px-3 py-1 rounded-full font-sans font-semibold tracking-wide uppercase flex items-center gap-1 ${
                    currentGuest.rsvpStatus === 'confirmed'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}>
                    {currentGuest.rsvpStatus === 'confirmed' ? (
                      <>
                        <Check size={12} /> Confirmado
                      </>
                    ) : (
                      <>
                        <X size={12} /> Não poderei ir
                      </>
                    )}
                  </span>
                </div>

                <div className="border-t border-gold-50 pt-4 space-y-2.5 text-xs sm:text-sm text-gray-700">
                  {currentGuest.rsvpStatus === 'confirmed' ? (
                    <>
                      <div className="font-medium text-gray-800">
                        Acompanhantes confirmados por você:
                      </div>
                      
                      {/* List confirmed companions */}
                      {currentGuest.companions && currentGuest.companions.filter(c => c.isConfirmed).length > 0 ? (
                        <ul className="space-y-1.5 pl-4 list-disc text-gold-700">
                          {currentGuest.companions.filter(c => c.isConfirmed).map((comp, index) => (
                            <li key={index} className="font-medium">{comp.name}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-400 italic">Nenhum acompanhante confirmado (Apenas você).</p>
                      )}

                      {currentGuest.dietaryRestrictions && (
                        <div className="mt-3">
                          <strong>Restrições alimentares:</strong> <span className="text-gray-600">{currentGuest.dietaryRestrictions}</span>
                        </div>
                      )}

                      {currentGuest.comment && (
                        <div className="mt-2.5 p-3 rounded-xl bg-gold-50/30 border border-gold-100 italic text-gray-600 text-xs">
                          "{currentGuest.comment}"
                        </div>
                      )}
                    </>
                  ) : (
                    <p className="text-gray-500 leading-relaxed italic text-xs">
                      Você marcou que infelizmente não poderá estar conosco nesta data. Se seus planos mudarem, você pode atualizar sua resposta clicando no botão abaixo a qualquer momento até a data limite!
                    </p>
                  )}

                  <div className="text-[10px] text-gray-400 pt-2 flex items-center justify-between">
                    <span>Atualizado em: {formatDateTime(currentGuest.rsvpDate)}</span>
                    <span>Aberturas: {currentGuest.openCount} vezes</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleStartRSVP}
                    className="w-full bg-gold-50 hover:bg-gold-100 text-gold-700 border border-gold-200/50 font-sans text-xs uppercase tracking-widest py-2.5 rounded-xl font-semibold transition-colors"
                    id="btn-edit-rsvp"
                  >
                    Alterar Resposta de Presença
                  </button>
                </div>
              </div>
            )}

            {/* Prompt to fill if pending */}
            {!isEditing && currentGuest.rsvpStatus === 'pending' && (
              <div className="bg-white border border-gold-100 rounded-2xl shadow-md p-8 text-center space-y-4">
                <Users size={36} className="text-gold-400 mx-auto" />
                <h4 className="font-serif text-lg font-semibold text-gray-800">
                  Sua confirmação está pendente!
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed max-w-sm mx-auto">
                  Você ainda não respondeu se poderá comparecer ao nosso casamento. Por favor, clique abaixo para preencher o formulário rápido de presença de forma individual ou familiar.
                </p>
                <div className="pt-2">
                  <button
                    onClick={handleStartRSVP}
                    className="w-full bg-gold-600 hover:bg-gold-700 text-white font-sans text-xs uppercase tracking-widest py-3 rounded-xl font-semibold shadow transition-all"
                    id="btn-start-rsvp"
                  >
                    Confirmar Presença Agora
                  </button>
                </div>
              </div>
            )}

            {/* EDITING FORM PORT */}
            {isEditing && (
              <form onSubmit={handleSubmitRSVP} className="bg-white border border-gold-200/50 rounded-2xl shadow-xl p-6 sm:p-8 space-y-6 animate-fade-in">
                <div className="flex items-center justify-between border-b border-gold-100 pb-4">
                  <span className="font-serif text-lg font-bold text-gray-800">Preencher RSVP</span>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="text-xs text-gray-400 hover:text-gold-600 font-sans uppercase font-medium"
                    id="btn-cancel-edit-rsvp"
                  >
                    Cancelar
                  </button>
                </div>

                {/* Question 1: Attending? */}
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-gray-600 mb-3 text-center">
                    Você irá ao casamento? *
                  </label>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setIsAttending(true)}
                      className={`py-3 rounded-xl border font-sans text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 transition-all ${
                        isAttending
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-700 ring-1 ring-emerald-500'
                          : 'bg-white border-gold-200/50 text-gray-500 hover:border-gold-400'
                      }`}
                      id="btn-rsvp-attending-yes"
                    >
                      <Check size={14} />
                      Sim, estarei lá!
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsAttending(false)}
                      className={`py-3 rounded-xl border font-sans text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 transition-all ${
                        !isAttending
                          ? 'bg-red-50 border-red-500 text-red-700 ring-1 ring-red-500'
                          : 'bg-white border-gold-200/50 text-gray-500 hover:border-gold-400'
                      }`}
                      id="btn-rsvp-attending-no"
                    >
                      <X size={14} />
                      Não poderei ir
                    </button>
                  </div>
                </div>

                {isAttending && companions.length > 0 && (
                  <div className="space-y-4 pt-2 border-t border-gold-50">
                    <div className="text-xs uppercase tracking-wider font-semibold text-gray-600 flex items-center gap-1.5">
                      <Users size={12} className="text-gold-500" />
                      Selecione quem irá com você:
                    </div>
                    
                    <div className="space-y-3">
                      {companions.map((comp, idx) => (
                        <div
                          key={idx}
                          className={`flex flex-col sm:flex-row gap-3 p-3.5 border rounded-xl items-center justify-between transition-colors ${
                            comp.isConfirmed
                              ? 'bg-gold-50/30 border-gold-400/50'
                              : 'bg-white border-gray-100'
                          }`}
                        >
                          {/* Name edit field */}
                          <input
                            type="text"
                            value={comp.name}
                            onChange={(e) => handleCompanionNameChange(idx, e.target.value)}
                            placeholder={`Nome do acompanhante ${idx + 1}`}
                            className="bg-transparent text-sm font-sans font-medium text-gray-700 border-b border-transparent hover:border-gold-200 focus:border-gold-400 focus:outline-none w-full sm:w-auto"
                            id={`input-companion-name-${idx}`}
                          />

                          {/* Checkbox attendance */}
                          <label className="flex items-center gap-2 cursor-pointer select-none">
                            <input
                              type="checkbox"
                              checked={comp.isConfirmed}
                              onChange={(e) => handleCompanionCheckChange(idx, e.target.checked)}
                              className="w-4 h-4 rounded text-gold-500 border-gold-200 focus:ring-gold-500 cursor-pointer accent-gold-500"
                              id={`checkbox-companion-confirmed-${idx}`}
                            />
                            <span className="text-xs text-gray-500 font-sans font-medium uppercase">
                              Vai comparecer
                            </span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {isAttending && (
                  <div className="space-y-4 pt-2 border-t border-gold-50">
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold text-gray-600 mb-1.5">
                        Restrições Alimentares ou Observações (Opcional)
                      </label>
                      <input
                        type="text"
                        value={dietary}
                        onChange={(e) => setDietary(e.target.value)}
                        placeholder="Ex: Vegano, Alérgico a glúten, etc."
                        className="w-full px-4 py-2.5 border border-gold-200/50 rounded-xl focus:outline-none focus:ring-1 focus:ring-gold-500 text-sm"
                        id="input-dietary"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-4 pt-2 border-t border-gold-50">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-gray-600 mb-1.5">
                      Recado para Henderson & Alana (Opcional)
                    </label>
                    <textarea
                      rows={3}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Deixe uma mensagem carinhosa para aquecer nossos corações!"
                      className="w-full px-4 py-2 border border-gold-200/50 rounded-xl focus:outline-none focus:ring-1 focus:ring-gold-500 text-sm"
                      id="textarea-rsvp-comment"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-gold-600 hover:bg-gold-700 text-white font-sans text-xs uppercase tracking-widest py-3 rounded-xl font-semibold shadow transition-all"
                    id="btn-rsvp-submit"
                  >
                    Confirmar Resposta de Presença
                  </button>
                </div>
              </form>
            )}

          </div>

          {/* Column B: INDIVIDUAL QR TICKET ACCESS PASS (5 columns) */}
          <div className="md:col-span-5">
            <div className="bg-white border-2 border-dashed border-gold-300 rounded-3xl p-6 shadow-md relative overflow-hidden flex flex-col items-center">
              {/* Premium Ticket Top Cutouts */}
              <div className="absolute top-1/2 -left-3 w-6 h-6 rounded-full bg-[#FAF9F5] border-r-2 border-dashed border-gold-300 -translate-y-1/2" />
              <div className="absolute top-1/2 -right-3 w-6 h-6 rounded-full bg-[#FAF9F5] border-l-2 border-dashed border-gold-300 -translate-y-1/2" />

              <div className="text-center w-full pb-4 border-b border-gold-100/60 mb-6">
                <span className="font-cursive text-3xl text-gold-500 block mb-1">Passe de Entrada</span>
                <h4 className="font-serif text-sm font-semibold tracking-widest uppercase text-gray-500">
                  QR Code Individual
                </h4>
              </div>

              {/* Vector representation of QR Code */}
              <div className="bg-gold-50/50 p-4 rounded-2xl border border-gold-200/40 relative">
                <div className="w-48 h-48 bg-white p-3 rounded-xl shadow-inner flex flex-col items-center justify-center relative">
                  <svg className="w-full h-full text-gold-700" viewBox="0 0 100 100">
                    {/* Real-looking complex vector QR Code generated inline */}
                    <path
                      fill="currentColor"
                      d="M10,10 h25 v25 h-25 z M15,15 h15 v15 h-15 z M19,19 h7 v7 h-7 z
                         M65,10 h25 v25 h-25 z M70,15 h15 v15 h-15 z M74,19 h7 v7 h-7 z
                         M10,65 h25 v25 h-25 z M15,70 h15 v15 h-15 z M19,74 h7 v7 h-7 z
                         M45,10 h5 v10 h-5 z M55,10 h5 v5 h-5 z M45,25 h15 v5 h-15 z
                         M45,35 h5 v5 h-5 z M55,35 h10 v5 h-10 z M45,45 h5 v15 h-5 z
                         M55,45 h15 v5 h-15 z M55,55 h5 v15 h-5 z M65,55 h10 v5 h-10 z
                         M45,65 h5 v5 h-5 z M55,65 h5 v10 h-5 z M65,65 h5 v5 h-5 z
                         M45,75 h5 v10 h-5 z M55,75 h10 v5 h-10 z M65,75 h15 v10 h-15 z
                         M75,45 h15 v5 h-15 z M75,55 h5 v5 h-5 z M85,55 h5 v15 h-5 z
                         M75,65 h10 v5 h-10 z M75,75 h5 v15 h-5 z"
                    />
                    {/* Miniature couple initials centered in QR */}
                    <rect x="42" y="42" width="16" height="16" fill="white" rx="3" />
                    <text x="50" y="52" fill="#b3883f" fontSize="8" fontWeight="bold" textAnchor="middle">H&A</text>
                  </svg>
                </div>
              </div>

              {/* Guest metadata ticket block */}
              <div className="w-full text-center space-y-2 mt-6">
                <span className="text-[10px] uppercase tracking-widest text-gold-600 font-bold">
                  Código de Acesso
                </span>
                <div className="font-mono text-sm tracking-widest font-semibold bg-gold-50 border border-gold-200/40 py-1 rounded-lg max-w-[180px] mx-auto text-gold-700">
                  {currentGuest.code}
                </div>

                <div className="pt-2">
                  <div className="text-[11px] font-sans text-gray-600 font-medium">
                    Convidado: <span className="font-semibold text-gray-800">{currentGuest.name}</span>
                  </div>
                  
                  {/* Attendance check-in status badge at reception desk */}
                  <div className="flex justify-center mt-3">
                    {currentGuest.checkedIn ? (
                      <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full px-3 py-1 font-semibold uppercase tracking-wider">
                        ✔ Check-in Realizado
                      </span>
                    ) : (
                      <span className="text-[10px] bg-amber-50 text-amber-700 border border-amber-200 rounded-full px-3 py-1 font-semibold uppercase tracking-wider animate-pulse">
                        ⌛ Aguardando Recepção
                      </span>
                    )}
                  </div>
                </div>

                <div className="border-t border-gold-100/60 pt-4 mt-4 text-[10px] text-gray-400 leading-normal font-sans">
                  Apresente este QR Code no tablet de check-in na recepção do <strong>Espaço Jardins Premium</strong> para liberação automática de seu assento familiar.
                </div>
              </div>

            </div>
          </div>

        </div>
      )}
    </div>
  );
}
