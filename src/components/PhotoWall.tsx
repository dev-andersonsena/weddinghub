import React, { useState, useRef } from 'react';
import { useWedding } from '../context/WeddingContext';
import { Heart, Camera, Upload, X, Check, Image as ImageIcon } from 'lucide-react';

export default function PhotoWall() {
  const { allPhotos, uploadPhoto, toggleLikePhoto, currentGuest } = useWedding();
  const [uploadOpen, setUploadOpen] = useState(false);
  const [caption, setCaption] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Filter approved photos to display to general guests
  const approvedPhotos = allPhotos.filter(p => p.approved);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecione apenas arquivos de imagem.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleTriggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedImage) return;

    uploadPhoto(selectedImage, caption);
    setUploadSuccess(true);
    setCaption('');
    setSelectedImage(null);

    setTimeout(() => {
      setUploadSuccess(false);
      setUploadOpen(false);
    }, 2500);
  };

  // Helper to format ISO time in Brazilian format
  const formatTimeAgo = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="bg-[#FAF9F5] py-20 px-4 sm:px-6 lg:px-8 text-gray-800 animate-fade-in min-h-screen">
      {/* Intro header */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <span className="font-cursive text-5xl text-gold-500 block mb-2">Compartilhe Momentos</span>
        <h2 className="font-serif text-3xl sm:text-4xl text-gray-800 tracking-wide font-medium">Mural de Fotos</h2>
        <p className="text-gray-500 font-sans text-xs sm:text-sm max-w-xl mx-auto mt-2">
          Queremos guardar cada pedacinho desse dia! Compartilhe aqui as fotos que você tirou conosco no chá bar, noivado ou até mesmo selfies prontas para o casamento. Participe do nosso álbum digital!
        </p>
        <div className="h-[1px] w-24 bg-gold-200/60 mx-auto mt-4" />
      </div>

      {/* Action triggers (Floating button or Top section) */}
      <div className="max-w-5xl mx-auto flex justify-center mb-16">
        <button
          onClick={() => setUploadOpen(true)}
          className="bg-gold-600 hover:bg-gold-700 text-white font-sans text-xs uppercase tracking-widest px-6 py-3.5 rounded-full font-bold shadow-lg transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
          id="btn-trigger-photo-upload"
        >
          <Camera size={16} />
          Enviar Minha Foto
        </button>
      </div>

      {/* Polaroid Gallery Grid */}
      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {approvedPhotos.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-400 italic bg-white border border-dashed border-gold-200/40 rounded-2xl">
            <ImageIcon size={40} className="mx-auto mb-3 text-gold-300" />
            Nenhuma foto aprovada no mural ainda. Seja o primeiro a compartilhar um momento especial!
          </div>
        ) : (
          approvedPhotos.map((photo, index) => {
            // Apply slight random angles for that nostalgic Polaroid feel
            const angles = ['-rotate-1', 'rotate-1', '-rotate-2', 'rotate-2', 'rotate-0'];
            const angleClass = angles[index % angles.length];

            return (
              <div
                key={photo.id}
                className={`bg-white border border-gray-100 rounded shadow-md p-4 transition-all duration-300 hover:shadow-xl hover:scale-102 hover:rotate-0 flex flex-col justify-between ${angleClass}`}
              >
                {/* Visual Image container */}
                <div className="bg-gray-100 aspect-square overflow-hidden border border-gray-50 mb-4 rounded-sm relative">
                  <img
                    src={photo.url}
                    alt={photo.caption || 'Foto de Casamento'}
                    className="w-full h-full object-cover select-none"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Polaroid Bottom strip (Handwritten styling vibe) */}
                <div className="space-y-3">
                  {photo.caption && (
                    <p className="font-sans text-sm text-gray-700 leading-snug font-medium italic min-h-[40px]">
                      "{photo.caption}"
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between border-t border-gray-50 pt-3">
                    <div className="text-left">
                      <span className="text-xs font-cursive text-gold-600 text-base block font-bold leading-none">
                        De: {photo.guestName}
                      </span>
                      <span className="text-[9px] text-gray-400 font-mono">
                        {formatTimeAgo(photo.createdAt)}
                      </span>
                    </div>

                    <button
                      onClick={() => toggleLikePhoto(photo.id)}
                      className="flex items-center gap-1.5 text-xs text-rose-500 hover:text-rose-600 font-bold hover:scale-110 active:scale-95 transition-all group/like"
                      id={`btn-like-photo-${photo.id}`}
                    >
                      <Heart size={14} className="fill-rose-50 group-hover/like:fill-rose-500 transition-colors" />
                      <span>{photo.likes}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Upload photo Modal */}
      {uploadOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white border border-gold-200 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
            
            {/* Header */}
            <div className="bg-gold-50/50 border-b border-gold-100 p-5 flex justify-between items-center">
              <span className="font-serif text-lg font-semibold text-gray-800 flex items-center gap-1.5">
                <Camera size={16} className="text-gold-500" />
                Compartilhar Lembrança
              </span>
              <button
                onClick={() => setUploadOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                id="btn-close-photo-upload"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6">
              {uploadSuccess ? (
                <div className="text-center py-8 space-y-4 animate-fade-in">
                  <div className="w-12 h-12 bg-emerald-50 rounded-full border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                    <Check size={24} />
                  </div>
                  <h4 className="font-serif text-lg font-semibold text-gray-800">Sua foto foi enviada!</h4>
                  <p className="text-xs text-gray-500 leading-relaxed max-w-xs mx-auto">
                    Que carinho maravilhoso! Sua foto foi enviada com sucesso e está na fila de aprovação do casal. Logo mais ela aparecerá no mural para todos os convidados verem!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleUploadSubmit} className="space-y-4">
                  
                  {/* Drag and Drop Zone */}
                  {!selectedImage ? (
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={handleTriggerFileInput}
                      className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[160px] ${
                        dragging
                          ? 'border-gold-500 bg-gold-50/20'
                          : 'border-gold-200/50 hover:border-gold-400 bg-gold-50/5'
                      }`}
                    >
                      <Upload size={32} className="text-gold-500 mb-2.5 animate-pulse" />
                      <span className="text-xs font-semibold text-gray-700 block mb-1">
                        Arraste e solte sua foto aqui
                      </span>
                      <span className="text-[10px] text-gray-400 font-sans block mb-3">
                        ou clique para selecionar do dispositivo
                      </span>
                      <button
                        type="button"
                        className="bg-gold-50 border border-gold-200 text-gold-700 px-3 py-1.5 rounded-lg text-[10px] uppercase font-bold tracking-wider"
                      >
                        Procurar Arquivo
                      </button>
                      
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                      />
                    </div>
                  ) : (
                    /* Preview Selected Photo */
                    <div className="relative border border-gold-100 rounded-xl overflow-hidden bg-gray-50 max-h-60 aspect-video flex justify-center items-center">
                      <img
                        src={selectedImage}
                        alt="Preview upload"
                        className="h-full w-full object-contain"
                      />
                      <button
                        type="button"
                        onClick={() => setSelectedImage(null)}
                        className="absolute top-2.5 right-2.5 p-1.5 bg-black/60 hover:bg-black/80 rounded-full text-white transition-colors"
                        title="Remover foto"
                        id="btn-remove-selected-photo"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}

                  {/* Caption comment */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-semibold text-gray-500 mb-1">
                      Legenda / Recado especial (Opcional)
                    </label>
                    <input
                      type="text"
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                      placeholder="Ex: Que dia inesquecível! Muito amor para vocês!"
                      className="w-full px-4 py-2 border border-gold-200/50 rounded-xl focus:outline-none focus:ring-1 focus:ring-gold-500 text-sm"
                      id="input-photo-caption"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={!selectedImage}
                      className="w-full bg-gold-600 hover:bg-gold-700 text-white font-sans text-xs uppercase tracking-widest py-3 rounded-xl font-semibold shadow transition-all disabled:opacity-50"
                      id="btn-photo-upload-submit"
                    >
                      Enviar para o Álbum dos Noivos
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
