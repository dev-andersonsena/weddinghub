import React, { useState } from 'react';
import { useWedding } from '../context/WeddingContext';
import { Gift } from '../types';
import { Heart, Sparkles, X, Copy, CreditCard, QrCode, CheckCircle2, DollarSign } from 'lucide-react';

export default function GiftList() {
  const { allGifts, addContribution, currentGuest } = useWedding();
  const [activeCategory, setActiveCategory] = useState<'all' | 'honeymoon' | 'home' | 'experience'>('all');
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);
  const [checkoutStep, setCheckoutStep] = useState<'form' | 'payment' | 'success'>('form');
  
  // Checkout Form State
  const [donorName, setDonorName] = useState('');
  const [donorMessage, setDonorMessage] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card'>('pix');
  const [customValue, setCustomValue] = useState<string>('');
  
  // Credit Card Form State
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  
  // Feedback states
  const [copied, setCopied] = useState(false);
  const [processing, setProcessing] = useState(false);

  // Initialize donor name if guest logged in
  const handleOpenGift = (gift: Gift) => {
    setSelectedGift(gift);
    setDonorName(currentGuest ? currentGuest.name : '');
    setCustomValue(gift.price.toString());
    setDonorMessage('');
    setPaymentMethod('pix');
    setCheckoutStep('form');
  };

  const handleCloseCheckout = () => {
    setSelectedGift(null);
    setDonorName('');
    setDonorMessage('');
    setCustomValue('');
    setCardNumber('');
    setCardName('');
    setCardExpiry('');
    setCardCvv('');
    setCopied(false);
  };

  const filteredGifts = activeCategory === 'all'
    ? allGifts
    : allGifts.filter(g => g.category === activeCategory);

  const formatBRL = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  // Simulated Pix Copy-and-Paste Key
  const simulatedPixKey = "00020101021226870014br.gov.bcb.pix2565pix-wedding-henderson-alana@casamento.com.br5204000053039865406350.005802BR5924Henderson Alana Wedding6009Fortaleza62070503Wedding***";

  const handleCopyPix = () => {
    navigator.clipboard.writeText(simulatedPixKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorName.trim()) return;
    setCheckoutStep('payment');
  };

  const handleConfirmPayment = () => {
    if (!selectedGift) return;
    setProcessing(true);

    // Simulate short loader for a premium gateway experience
    setTimeout(() => {
      const finalAmount = parseFloat(customValue) || selectedGift.price;
      addContribution(
        selectedGift.id,
        finalAmount,
        donorName,
        donorMessage,
        paymentMethod
      );
      setProcessing(false);
      setCheckoutStep('success');
    }, 1500);
  };

  return (
    <div className="bg-[#FCFBF7] py-20 px-4 sm:px-6 lg:px-8 text-gray-800 animate-fade-in min-h-screen">
      {/* Introduction */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <span className="font-cursive text-5xl text-gold-500 block mb-2">Lista de Presentes</span>
        <h2 className="font-serif text-3xl sm:text-4xl text-gray-800 tracking-wide font-medium">Presentes Virtuais</h2>
        <p className="text-gray-500 font-sans text-xs sm:text-sm max-w-xl mx-auto mt-2">
          Queridos convidados, a presença de vocês é o nosso maior presente. Mas, se desejarem nos presentear, criamos uma lista com cotas de lua de mel e itens simbólicos para nos ajudar a mobiliar nosso futuro lar! Todas as contribuições serão revertidas em saldo de viagem e projetos para nossa vida juntos.
        </p>
        <div className="h-[1px] w-24 bg-gold-200/60 mx-auto mt-4" />
      </div>

      {/* Categories filters */}
      <div className="max-w-3xl mx-auto flex flex-wrap justify-center gap-2 mb-12">
        {[
          { id: 'all', label: 'Todos os Presentes' },
          { id: 'honeymoon', label: 'Lua de Mel' },
          { id: 'home', label: 'Casa Nova' },
          { id: 'experience', label: 'Experiências' }
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id as any)}
            className={`px-4 py-2 text-xs uppercase tracking-widest font-sans rounded-full border transition-all duration-300 ${
              activeCategory === cat.id
                ? 'bg-gold-500 border-gold-500 text-white shadow-md font-semibold'
                : 'bg-white border-gold-200/40 text-gray-600 hover:border-gold-400'
            }`}
            id={`filter-gifts-${cat.id}`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Gifts Grid */}
      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredGifts.map((gift) => (
          <div
            key={gift.id}
            className="bg-white border border-gold-100 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full group"
          >
            {/* Image container */}
            <div className="relative h-48 overflow-hidden bg-gray-100">
              <img
                src={gift.imageUrl}
                alt={gift.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm border border-gold-200/40 text-[9px] uppercase tracking-widest font-semibold text-gold-700 px-2.5 py-1 rounded-full shadow-sm">
                {gift.category === 'honeymoon' ? '✈ Lua de Mel' : gift.category === 'home' ? '🏠 Casa Nova' : '✨ Experiência'}
              </span>
            </div>

            {/* Content info */}
            <div className="p-5 flex-grow flex flex-col justify-between">
              <div>
                <h4 className="font-serif text-base font-semibold text-gray-800 line-clamp-2 h-12 leading-snug">
                  {gift.title}
                </h4>
                
                <div className="mt-4 flex items-baseline justify-between">
                  <span className="text-lg font-serif font-bold text-gold-600">
                    {formatBRL(gift.price)}
                  </span>
                  
                  {gift.contributionsCount > 0 && (
                    <span className="text-[10px] text-gray-400 font-sans italic flex items-center gap-1">
                      <Heart size={10} className="text-rose-400 fill-current" />
                      {gift.contributionsCount} {gift.contributionsCount === 1 ? 'presente dado' : 'presentes dados'}
                    </span>
                  )}
                </div>
              </div>

              <button
                onClick={() => handleOpenGift(gift)}
                className="w-full mt-5 bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-500 hover:to-gold-600 text-white font-sans text-xs uppercase tracking-widest py-2.5 rounded-xl font-semibold shadow transition-all active:scale-95"
                id={`btn-gift-${gift.id}`}
              >
                Presentear Noivos
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Premium Checkout Overlay Modal */}
      {selectedGift && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white border border-gold-200 rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gold-50/50 border-b border-gold-100 p-5 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Heart size={18} className="text-gold-500 fill-current" />
                <span className="font-serif text-lg font-semibold text-gray-800">Presentear o Casal</span>
              </div>
              <button
                onClick={handleCloseCheckout}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                id="btn-close-checkout"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body depending on Step */}
            <div className="p-6">
              {/* Top Gift Details block */}
              {checkoutStep !== 'success' && (
                <div className="flex gap-4 bg-gold-50/20 border border-gold-100 p-3.5 rounded-xl mb-6">
                  <img
                    src={selectedGift.imageUrl}
                    alt={selectedGift.title}
                    className="w-16 h-16 object-cover rounded-lg"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex flex-col justify-center">
                    <span className="text-[10px] uppercase tracking-widest text-gold-600 font-semibold mb-0.5">
                      Cota Selecionada
                    </span>
                    <h5 className="font-serif text-sm font-semibold text-gray-800 leading-tight">
                      {selectedGift.title}
                    </h5>
                    <span className="text-sm font-serif font-bold text-gold-600 mt-1">
                      {formatBRL(selectedGift.price)}
                    </span>
                  </div>
                </div>
              )}

              {/* STEP 1: Basic Form details */}
              {checkoutStep === 'form' && (
                <form onSubmit={handleSubmitForm} className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-gray-600 mb-1.5">
                      Seu Nome (Para o cartão de agradecimento) *
                    </label>
                    <input
                      type="text"
                      required
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      placeholder="Ex: Carlos e Eliane, Família Souza..."
                      className="w-full px-4 py-2.5 border border-gold-200/50 rounded-xl focus:outline-none focus:ring-1 focus:ring-gold-500 text-sm"
                      id="input-donor-name"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-gray-600 mb-1.5">
                      Deseja alterar o valor do presente? (Opcional)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-400 text-sm">R$</span>
                      </div>
                      <input
                        type="number"
                        min="10"
                        value={customValue}
                        onChange={(e) => setCustomValue(e.target.value)}
                        placeholder="Insira um valor personalizado"
                        className="w-full pl-9 pr-4 py-2.5 border border-gold-200/50 rounded-xl focus:outline-none focus:ring-1 focus:ring-gold-500 text-sm"
                        id="input-custom-value"
                      />
                    </div>
                    <span className="text-[10px] text-gray-400 mt-1 block leading-tight">
                      Você pode aumentar ou ajustar o valor da cota livremente.
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-gray-600 mb-1.5">
                      Uma Mensagem Carinhosa para os Noivos (Opcional)
                    </label>
                    <textarea
                      rows={3}
                      value={donorMessage}
                      onChange={(e) => setDonorMessage(e.target.value)}
                      placeholder="Escreva algo especial... Sua mensagem será enviada direto para o painel deles!"
                      className="w-full px-4 py-2 border border-gold-200/50 rounded-xl focus:outline-none focus:ring-1 focus:ring-gold-500 text-sm"
                      id="textarea-donor-message"
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full bg-gold-600 hover:bg-gold-700 text-white font-sans text-xs uppercase tracking-widest py-3 rounded-xl font-semibold shadow transition-all flex items-center justify-center gap-1.5"
                      id="btn-checkout-proceed"
                    >
                      Avançar para Pagamento
                    </button>
                  </div>
                </form>
              )}

              {/* STEP 2: Payment options */}
              {checkoutStep === 'payment' && (
                <div className="space-y-6 animate-fade-in">
                  {/* Selectors tabs */}
                  <div className="flex border border-gold-200/50 rounded-xl overflow-hidden p-1 bg-gold-50/20">
                    <button
                      onClick={() => setPaymentMethod('pix')}
                      className={`flex-1 py-2 text-xs uppercase tracking-wider font-sans font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                        paymentMethod === 'pix'
                          ? 'bg-gold-500 text-white rounded-lg shadow-sm'
                          : 'text-gray-500 hover:text-gold-600'
                      }`}
                      id="btn-paymethod-pix"
                    >
                      <QrCode size={14} />
                      Via PIX
                    </button>
                    <button
                      onClick={() => setPaymentMethod('card')}
                      className={`flex-1 py-2 text-xs uppercase tracking-wider font-sans font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                        paymentMethod === 'card'
                          ? 'bg-gold-500 text-white rounded-lg shadow-sm'
                          : 'text-gray-500 hover:text-gold-600'
                      }`}
                      id="btn-paymethod-card"
                    >
                      <CreditCard size={14} />
                      Cartão de Crédito
                    </button>
                  </div>

                  {/* PIX GATEWAY SIMULATION */}
                  {paymentMethod === 'pix' && (
                    <div className="text-center space-y-4 animate-fade-in">
                      <p className="text-xs text-gray-500 leading-relaxed max-w-sm mx-auto">
                        A forma mais prática e instantânea de presentear! Escaneie o QR Code ou copie o código PIX Copia e Cola abaixo para fazer sua transferência de <strong>{formatBRL(parseFloat(customValue) || selectedGift.price)}</strong>.
                      </p>

                      {/* Mock QR Code frame */}
                      <div className="mx-auto w-40 h-40 border border-gold-200/50 rounded-xl p-2.5 bg-white shadow flex flex-col justify-center items-center">
                        <svg className="w-full h-full text-gold-600" viewBox="0 0 100 100">
                          {/* Beautiful QR Code Pattern simulated with path */}
                          <path
                            fill="currentColor"
                            d="M10,10 h25 v25 h-25 z M15,15 h15 v15 h-15 z M19,19 h7 v7 h-7 z
                               M65,10 h25 v25 h-25 z M70,15 h15 v15 h-15 z M74,19 h7 v7 h-7 z
                               M10,65 h25 v25 h-25 z M15,70 h15 v15 h-15 z M19,74 h7 v7 h-7 z
                               M45,45 h10 v10 h-10 z M42,10 h6 v15 h-6 z M52,25 h8 v6 h-8 z
                               M45,70 h12 v20 h-12 z M70,45 h20 v12 h-20 z M80,80 h10 v10 h-10 z"
                          />
                        </svg>
                      </div>

                      <div className="bg-gold-50/50 border border-gold-200/40 rounded-xl p-3 flex items-center justify-between text-left max-w-sm mx-auto">
                        <div className="truncate text-xs font-mono text-gray-500 w-64">
                          {simulatedPixKey}
                        </div>
                        <button
                          onClick={handleCopyPix}
                          className="p-1.5 rounded-lg bg-gold-100 hover:bg-gold-200/80 text-gold-700 transition-colors flex-shrink-0"
                          title="Copiar Código PIX"
                          id="btn-copy-pix-key"
                        >
                          {copied ? <CheckCircle2 size={16} className="text-emerald-600" /> : <Copy size={16} />}
                        </button>
                      </div>
                      {copied && <span className="text-[10px] text-emerald-600 font-sans font-semibold">Código copiado para a área de transferência!</span>}

                      <div className="pt-4">
                        <button
                          onClick={handleConfirmPayment}
                          disabled={processing}
                          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-sans text-xs uppercase tracking-widest py-3 rounded-xl font-semibold shadow transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
                          id="btn-confirm-pix-payment"
                        >
                          {processing ? (
                            <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <>
                              <CheckCircle2 size={14} />
                              Confirmar que enviei o PIX
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* CREDIT CARD GATEWAY SIMULATION */}
                  {paymentMethod === 'card' && (
                    <div className="space-y-4 animate-fade-in">
                      {/* Interactive Premium Credit Card Visual representation */}
                      <div className="bg-gradient-to-br from-gold-600 to-gold-800 text-white rounded-2xl p-5 shadow-lg relative overflow-hidden flex flex-col justify-between h-40">
                        <div className="absolute right-0 bottom-0 top-0 left-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.08)_0%,transparent_60%)] pointer-events-none" />
                        
                        <div className="flex justify-between items-start">
                          <DollarSign size={24} className="text-gold-200" />
                          <span className="font-serif italic text-sm text-gold-100">Henderson & Alana</span>
                        </div>

                        <div>
                          <div className="font-mono text-base tracking-[0.2em] mb-3">
                            {cardNumber || "•••• •••• •••• ••••"}
                          </div>
                          
                          <div className="flex justify-between text-[10px] uppercase tracking-wider text-gold-100/85 font-mono">
                            <div>
                              <div>Nome do Titular</div>
                              <div className="font-semibold truncate w-36 uppercase mt-0.5">{cardName || "TITULAR DO CARTÃO"}</div>
                            </div>
                            <div>
                              <div>Validade</div>
                              <div className="font-semibold mt-0.5">{cardExpiry || "MM/AA"}</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Input fields */}
                      <div className="grid grid-cols-2 gap-3.5 pt-2">
                        <div className="col-span-2">
                          <label className="block text-[10px] uppercase tracking-wider font-semibold text-gray-500 mb-1">
                            Número do Cartão
                          </label>
                          <input
                            type="text"
                            maxLength={19}
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            placeholder="4000 1234 5678 9010"
                            className="w-full px-3.5 py-2 border border-gold-200/50 rounded-xl focus:outline-none focus:ring-1 focus:ring-gold-500 text-sm font-mono"
                            id="input-card-number"
                          />
                        </div>

                        <div className="col-span-2">
                          <label className="block text-[10px] uppercase tracking-wider font-semibold text-gray-500 mb-1">
                            Nome Completo (Como no cartão)
                          </label>
                          <input
                            type="text"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                            placeholder="MARIA DA SILVA COSTA"
                            className="w-full px-3.5 py-2 border border-gold-200/50 rounded-xl focus:outline-none focus:ring-1 focus:ring-gold-500 text-sm uppercase font-mono"
                            id="input-card-name"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase tracking-wider font-semibold text-gray-500 mb-1">
                            Validade (MM/AA)
                          </label>
                          <input
                            type="text"
                            maxLength={5}
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            placeholder="12/29"
                            className="w-full px-3.5 py-2 border border-gold-200/50 rounded-xl focus:outline-none focus:ring-1 focus:ring-gold-500 text-sm font-mono"
                            id="input-card-expiry"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase tracking-wider font-semibold text-gray-500 mb-1">
                            Código CVV
                          </label>
                          <input
                            type="text"
                            maxLength={3}
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            placeholder="123"
                            className="w-full px-3.5 py-2 border border-gold-200/50 rounded-xl focus:outline-none focus:ring-1 focus:ring-gold-500 text-sm font-mono"
                            id="input-card-cvv"
                          />
                        </div>
                      </div>

                      <div className="pt-4">
                        <button
                          onClick={handleConfirmPayment}
                          disabled={processing || !cardName || !cardNumber || !cardExpiry || !cardCvv}
                          className="w-full bg-gold-600 hover:bg-gold-700 text-white font-sans text-xs uppercase tracking-widest py-3 rounded-xl font-semibold shadow transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
                          id="btn-confirm-card-payment"
                        >
                          {processing ? (
                            <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <>
                              <CreditCard size={14} />
                              Efetuar Pagamento de {formatBRL(parseFloat(customValue) || selectedGift.price)}
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Back button */}
                  <div className="text-center pt-2">
                    <button
                      onClick={() => setCheckoutStep('form')}
                      className="text-xs text-gray-400 hover:text-gold-600 transition-colors"
                      id="btn-back-to-form"
                    >
                      ← Voltar para dados do cartão
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: SUCCESS CONGRATS VIEW */}
              {checkoutStep === 'success' && (
                <div className="text-center space-y-5 py-6 animate-fade-in">
                  <div className="w-14 h-14 bg-emerald-50 rounded-full border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 size={32} />
                  </div>
                  
                  <div className="space-y-2">
                    <span className="font-cursive text-3xl text-gold-500 block">Muito Obrigado!</span>
                    <h4 className="font-serif text-xl font-semibold text-gray-800">Seu Presente foi Enviado!</h4>
                    <p className="text-xs text-gray-500 leading-relaxed max-w-sm mx-auto">
                      Querido(a) <strong>{donorName}</strong>, sua generosa contribuição de <strong>{formatBRL(parseFloat(customValue) || selectedGift.price)}</strong> para <strong>{selectedGift.title}</strong> foi registrada com sucesso! Seu carinho e sua mensagem foram salvos e enchem nosso coração de gratidão.
                    </p>
                  </div>

                  <div className="pt-4 max-w-xs mx-auto">
                    <button
                      onClick={handleCloseCheckout}
                      className="w-full bg-gold-600 hover:bg-gold-700 text-white font-sans text-xs uppercase tracking-widest py-2.5 rounded-xl font-semibold shadow transition-all"
                      id="btn-success-close"
                    >
                      Voltar para a Lista
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
