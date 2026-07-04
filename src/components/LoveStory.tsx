import { Calendar, Heart, Award, Map, Navigation } from 'lucide-react';

export default function LoveStory() {
  const milestones = [
    {
      year: "2020",
      title: "O Primeiro Olhar",
      description: "Nos conhecemos de forma despretensiosa em uma cafeteria aconchegante no centro de Fortaleza. O que seria apenas um café de negócios se tornou uma conversa de 4 horas sobre a vida, sonhos e viagens.",
      icon: <Calendar className="text-white" size={16} />,
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=600"
    },
    {
      year: "2021",
      title: "O Pedido de Namoro",
      description: "Sob um pôr do sol espetacular nas dunas da Praia do Futuro, Henderson preparou uma surpresa inesquecível com violão e flores. Ali dissemos o primeiro 'sim' e decidimos caminhar lado a lado.",
      icon: <Heart className="text-white fill-current" size={16} />,
      image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=600"
    },
    {
      year: "2023",
      title: "Nossa Primeira Grande Viagem Juntos",
      description: "Explorar o sul do Brasil foi mágico. Gramado e Canela nos proporcionaram momentos inesquecíveis, jantares à luz de velas e a certeza absoluta de que queríamos rodar o mundo juntos.",
      icon: <Map className="text-white" size={16} />,
      image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=600"
    },
    {
      year: "2025",
      title: "O Pedido de Casamento",
      description: "Na acolhedora e fria Serra da Ibiapaba, cercados por montanhas e flores vermelhas, Henderson se ajoelhou e fez a pergunta mais importante da nossa jornada. Alana, tomada por lágrimas de felicidade, disse 'Claro que sim!'.",
      icon: <Award className="text-white" size={16} />,
      image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=600"
    },
    {
      year: "2027",
      title: "O Início do Sempre",
      description: "O dia de celebrar nossa união eterna diante de Deus e dos nossos amigos e familiares mais próximos. O capítulo mais lindo de nossa história começa agora!",
      icon: <Navigation className="text-white" size={16} />,
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=600"
    }
  ];

  return (
    <div className="bg-[#FCFBF7] py-20 px-4 sm:px-6 lg:px-8 text-gray-800 animate-fade-in">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <span className="font-cursive text-5xl text-gold-500 block mb-2">Nossa Linha do Tempo</span>
        <h2 className="font-serif text-3xl sm:text-4xl text-gray-800 tracking-wide font-medium">Como Tudo Começou</h2>
        <div className="h-[1px] w-24 bg-gold-200/60 mx-auto mt-4" />
      </div>

      {/* Timeline Wrapper */}
      <div className="relative max-w-3xl mx-auto">
        {/* Center Vertical Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gold-200/50" />

        {/* Milestone Blocks */}
        <div className="space-y-12">
          {milestones.map((item, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div 
                key={idx} 
                className={`relative flex flex-col md:flex-row items-start md:items-center ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline Marker (Circle with Icon) */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-gold-500 shadow-md border-4 border-[#FCFBF7] z-10">
                  {item.icon}
                </div>

                {/* Content Panel */}
                <div className="w-full md:w-[45%] pl-10 md:pl-0 flex flex-col">
                  <div className="bg-white border border-gold-100 rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    {/* Visual image */}
                    <div className="h-44 w-full bg-gray-100">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Metadata & Description */}
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-serif font-bold text-lg text-gold-600 bg-gold-50 px-2.5 py-0.5 rounded">
                          {item.year}
                        </span>
                        <h4 className="font-serif font-semibold text-lg text-gray-800 truncate">
                          {item.title}
                        </h4>
                      </div>
                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Spacer for structural balancing in desktop */}
                <div className="hidden md:block w-[10%]" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
