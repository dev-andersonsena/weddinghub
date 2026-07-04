import { BRIDAL_PARTY_MEMBERS } from '../data/weddingData';
import { Sparkles, Heart } from 'lucide-react';

export default function BridalParty() {
  return (
    <div className="bg-[#FAF9F5] py-20 px-4 sm:px-6 lg:px-8 text-gray-800 animate-fade-in">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <span className="font-cursive text-5xl text-gold-500 block mb-2">Amigos de Honra</span>
        <h2 className="font-serif text-3xl sm:text-4xl text-gray-800 tracking-wide font-medium">Nossos Padrinhos</h2>
        <p className="text-gray-500 font-sans text-xs sm:text-sm max-w-md mx-auto mt-2">
          Pessoas fundamentais em nossas vidas, escolhidas a dedo para nos abençoar, aconselhar e celebrar ao nosso lado.
        </p>
        <div className="h-[1px] w-24 bg-gold-200/60 mx-auto mt-4" />
      </div>

      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {BRIDAL_PARTY_MEMBERS.map((member, idx) => (
          <div
            key={idx}
            className="bg-white border border-gold-100 rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col"
          >
            {/* Profile image with gold frame styling */}
            <div className="relative h-72 overflow-hidden bg-gray-50">
              <img
                src={member.imageUrl}
                alt={member.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-white text-xs font-serif italic">Henderson & Alana's Wedding</span>
              </div>
            </div>

            {/* Content area */}
            <div className="p-6 text-center flex-grow flex flex-col justify-between">
              <div>
                <h4 className="font-serif text-lg font-semibold text-gray-800 mb-1 flex items-center justify-center gap-1.5">
                  {member.name}
                </h4>
                <div className="inline-flex items-center gap-1 text-[10px] tracking-widest uppercase font-semibold text-gold-600 bg-gold-50 border border-gold-200/40 rounded-full px-3 py-1 mb-4">
                  <Sparkles size={8} />
                  {member.role}
                </div>
              </div>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed italic">
                "{member.description}"
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Heart warming footer callout */}
      <div className="max-w-2xl mx-auto text-center mt-16 bg-white border border-gold-100 rounded-2xl p-8 shadow-sm">
        <Heart className="text-gold-500 fill-current mx-auto mb-4" size={24} />
        <h4 className="font-serif text-xl font-medium text-gray-800 mb-2">Mensagem do Casal aos Padrinhos</h4>
        <p className="text-gray-600 text-sm leading-relaxed">
          "Vocês não são apenas testemunhas deste casamento, são guias para a nossa família. Agradecemos imensamente por todo carinho, amizade e orações dispensadas ao nosso novo lar."
        </p>
      </div>
    </div>
  );
}
