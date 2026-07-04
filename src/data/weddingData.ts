import { Guest, Gift, GuestPhoto, AnalyticsLog, WeddingSettings, Contribution } from '../types';

export const INITIAL_WEDDING_SETTINGS: WeddingSettings = {
  coupleName1: "Henderson",
  coupleName2: "Alana",
  date: "2027-05-22",
  time: "16:00",
  ceremonyLocation: "Catedral Metropolitana de Fortaleza - Centro, Fortaleza - CE",
  receptionLocation: "Espaço Jardins Premium - Eusébio, CE",
  ceremonyMapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3981.350346337169!2d-38.52627448524036!3d-3.7226685972916634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f131!3m3!1m2!1s0x7c7484df7bda93d%3A0xc66fe2fb55fe9bdf!2sCatedral%20Metropolitana%20de%20Fortaleza!5e0!3m2!1spt-BR!2sbr!4v1680000000000!5m2!1spt-BR!2sbr",
  receptionMapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.7431289196906!2d-38.461234!3d-3.882134!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f131!3m3!1m2!1s0x0%3A0x0!2zM8KwNTInNTUuNyJTIDM4wrAyNyc0MC40Ilc!5e0!3m2!1spt-BR!2sbr!4v1680000000001!5m2!1spt-BR!2sbr",
  storyText: "Nossa história começou de forma despretensiosa, com um encontro casual que logo se transformou em uma conexão profunda. Ao longo dos anos, construímos uma vida cheia de risadas, viagens memoráveis, conquistas compartilhadas e muito aprendizado. Agora, estamos prontos para dar o passo mais importante das nossas vidas e celebrar esse amor eterno com as pessoas que mais importam para nós. Preparem seus corações para um dia mágico de muita alegria, emoção e festa!",
  adminCode: "1234"
};

export const INITIAL_GUESTS: Guest[] = [
  {
    id: "g1",
    code: "PAIS-NOIVOS",
    name: "Pais de Henderson e Alana",
    maxCompanions: 4,
    rsvpStatus: "confirmed",
    rsvpDate: "2026-06-15T14:30:00Z",
    companions: [
      { name: "Sérgio Silva (Pai do Noivo)", isConfirmed: true },
      { name: "Maria Silva (Mãe do Noivo)", isConfirmed: true },
      { name: "Joaquim Rocha (Pai da Noiva)", isConfirmed: true },
      { name: "Eliane Rocha (Mãe da Noiva)", isConfirmed: true }
    ],
    dietaryRestrictions: "Nenhuma",
    comment: "Estamos extremamente felizes por esse momento maravilhoso! Que Deus abençoe ricamente a união de vocês.",
    checkedIn: false,
    openCount: 5
  },
  {
    id: "g2",
    code: "VIP-FAMILIA",
    name: "Família Silva Antunes",
    maxCompanions: 3,
    rsvpStatus: "pending",
    companions: [
      { name: "Carlos Antunes", isConfirmed: false },
      { name: "Cláudia Silva Antunes", isConfirmed: false },
      { name: "Luiza Antunes", isConfirmed: false }
    ],
    checkedIn: false,
    openCount: 2
  },
  {
    id: "g3",
    code: "AMIGO-BRUNO",
    name: "Bruno Vasconcelos",
    maxCompanions: 1,
    rsvpStatus: "confirmed",
    rsvpDate: "2026-06-20T19:15:00Z",
    companions: [
      { name: "Amanda Melo", isConfirmed: true }
    ],
    dietaryRestrictions: "Noiva é vegetariana",
    comment: "Não perderia por nada no mundo! Vamos comemorar muitoooo!",
    checkedIn: false,
    openCount: 3
  },
  {
    id: "g4",
    code: "MADRINHA-SARAH",
    name: "Sarah Rocha (Irmã da Noiva)",
    maxCompanions: 1,
    rsvpStatus: "confirmed",
    rsvpDate: "2026-06-10T10:00:00Z",
    companions: [
      { name: "Roberto Ramos", isConfirmed: true }
    ],
    comment: "Minha irmã vai casar! Segura o choro! Amo vocês demais, que dia abençoado!",
    checkedIn: false,
    openCount: 12
  },
  {
    id: "g5",
    code: "AMIGO-LUCAS",
    name: "Lucas & Mariana",
    maxCompanions: 1,
    rsvpStatus: "declined",
    rsvpDate: "2026-06-25T11:45:00Z",
    comment: "Infelizmente estaremos viajando a trabalho nesta data e não poderemos comparecer fisicamente, mas nosso coração estará com vocês! Desejamos toda a felicidade do mundo!",
    checkedIn: false,
    openCount: 1
  },
  {
    id: "g6",
    code: "VIP-SILVA",
    name: "Família Costa Souza",
    maxCompanions: 2,
    rsvpStatus: "pending",
    companions: [
      { name: "Rodrigo Costa", isConfirmed: false },
      { name: "Fernanda Souza Costa", isConfirmed: false }
    ],
    checkedIn: false,
    openCount: 0
  }
];

export const INITIAL_GIFTS: Gift[] = [
  {
    id: "gift1",
    title: "Cota de Lua de Mel: Jantar Romântico em Paris",
    price: 350,
    category: "honeymoon",
    imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=600",
    contributionsCount: 2
  },
  {
    id: "gift2",
    title: "Cota de Lua de Mel: Hospedagem Resort nas Maldivas",
    price: 800,
    category: "honeymoon",
    imageUrl: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=600",
    contributionsCount: 1
  },
  {
    id: "gift3",
    title: "Cota de Lua de Mel: Passeio de Helicóptero",
    price: 600,
    category: "honeymoon",
    imageUrl: "https://images.unsplash.com/photo-1508873696983-2df519f0397e?auto=format&fit=crop&q=80&w=600",
    contributionsCount: 0
  },
  {
    id: "gift4",
    title: "Jogo de Pratos de Cerâmica de Luxo",
    price: 450,
    category: "home",
    imageUrl: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80&w=600",
    contributionsCount: 0
  },
  {
    id: "gift5",
    title: "Cafeteira Espresso Profissional para Casa",
    price: 550,
    category: "home",
    imageUrl: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&q=80&w=600",
    contributionsCount: 1
  },
  {
    id: "gift6",
    title: "Aspirador de Pó Robô Inteligente",
    price: 950,
    category: "home",
    imageUrl: "https://images.unsplash.com/photo-1518133680790-398573e6bd68?auto=format&fit=crop&q=80&w=600",
    contributionsCount: 0
  },
  {
    id: "gift7",
    title: "Adega de Vinhos Climatizada (12 Garrafas)",
    price: 1200,
    category: "home",
    imageUrl: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=600",
    contributionsCount: 0
  },
  {
    id: "gift8",
    title: "Passeio Gourmet & Degustação de Vinhos",
    price: 300,
    category: "experience",
    imageUrl: "https://images.unsplash.com/photo-1516594709406-e8a4511f762c?auto=format&fit=crop&q=80&w=600",
    contributionsCount: 1
  }
];

export const INITIAL_CONTRIBUTIONS: Contribution[] = [
  {
    id: "c1",
    giftId: "gift1",
    giftTitle: "Cota de Lua de Mel: Jantar Romântico em Paris",
    guestName: "Carlos Alberto & Marta",
    amount: 350,
    message: "Queridos noivos, que vocês aproveitem demais essa lua de mel maravilhosa! Que o amor de vocês se renove a cada instante. Um grande beijo!",
    paymentMethod: "pix",
    date: "2026-06-18T16:40:00Z"
  },
  {
    id: "c2",
    giftId: "gift1",
    giftTitle: "Cota de Lua de Mel: Jantar Romântico em Paris",
    guestName: "Juliana Rocha",
    amount: 350,
    message: "Aproveitem um brinde a Paris por mim! Um beijão enorme para esse casal lindo!",
    paymentMethod: "card",
    date: "2026-06-22T21:10:00Z"
  },
  {
    id: "c3",
    giftId: "gift2",
    giftTitle: "Cota de Lua de Mel: Hospedagem Resort nas Maldivas",
    guestName: "Sérgio Silva (Pai do Noivo)",
    amount: 800,
    message: "Filho e Alana, um pequeno presente para começarem essa jornada com o pé direito num lugar paradisíaco. Orgulho imenso de vocês.",
    paymentMethod: "pix",
    date: "2026-06-15T15:00:00Z"
  },
  {
    id: "c4",
    giftId: "gift5",
    giftTitle: "Cafeteira Espresso Profissional para Casa",
    guestName: "Rodrigo Mendonça",
    amount: 550,
    message: "Para animar as manhãs de vocês na casa nova com bastante cafeína! Abraços!",
    paymentMethod: "pix",
    date: "2026-06-24T13:22:00Z"
  }
];

export const INITIAL_PHOTOS: GuestPhoto[] = [
  {
    id: "p1",
    url: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=600",
    guestName: "Sarah Rocha (Irmã)",
    caption: "Lembro desse dia como se fosse ontem! O noivado foi perfeito. Muito amor!",
    likes: 12,
    approved: true,
    createdAt: "2026-06-10T11:20:00Z"
  },
  {
    id: "p2",
    url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600",
    guestName: "Mariana Souza",
    caption: "Minha foto favorita de vocês dois juntos! Irradiam luz e cumplicidade.",
    likes: 8,
    approved: true,
    createdAt: "2026-06-14T17:45:00Z"
  },
  {
    id: "p3",
    url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=600",
    guestName: "Thiago Almeida",
    caption: "Celebrando o amor de vocês no chá bar! Prontos pro grande dia!",
    likes: 5,
    approved: true,
    createdAt: "2026-06-21T23:05:00Z"
  }
];

export const INITIAL_ANALYTICS: AnalyticsLog[] = [
  {
    id: "a1",
    guestId: "g1",
    guestName: "Pais de Henderson e Alana",
    timestamp: "2026-06-15T14:10:00Z",
    device: "Smartphone",
    browser: "Chrome Mobile",
    region: "Ceará (CE)",
    action: "Abriu Convite"
  },
  {
    id: "a2",
    guestId: "g1",
    guestName: "Pais de Henderson e Alana",
    timestamp: "2026-06-15T14:30:00Z",
    device: "Smartphone",
    browser: "Chrome Mobile",
    region: "Ceará (CE)",
    action: "Confirmou RSVP"
  },
  {
    id: "a3",
    guestId: "g4",
    guestName: "Sarah Rocha (Irmã da Noiva)",
    timestamp: "2026-06-10T09:45:00Z",
    device: "iPhone",
    browser: "Safari Mobile",
    region: "Ceará (CE)",
    action: "Abriu Convite"
  },
  {
    id: "a4",
    guestId: "g4",
    guestName: "Sarah Rocha (Irmã da Noiva)",
    timestamp: "2026-06-10T10:00:00Z",
    device: "iPhone",
    browser: "Safari Mobile",
    region: "Ceará (CE)",
    action: "Confirmou RSVP"
  },
  {
    id: "a5",
    guestId: "g2",
    guestName: "Família Silva Antunes",
    timestamp: "2026-06-22T11:02:00Z",
    device: "Desktop",
    browser: "Edge",
    region: "São Paulo (SP)",
    action: "Abriu Convite"
  },
  {
    id: "a6",
    guestId: "g3",
    guestName: "Bruno Vasconcelos",
    timestamp: "2026-06-20T19:00:00Z",
    device: "Smartphone",
    browser: "Samsung Internet",
    region: "Rio de Janeiro (RJ)",
    action: "Abriu Convite"
  },
  {
    id: "a7",
    guestId: "g3",
    guestName: "Bruno Vasconcelos",
    timestamp: "2026-06-20T19:15:00Z",
    device: "Smartphone",
    browser: "Samsung Internet",
    region: "Rio de Janeiro (RJ)",
    action: "Confirmou RSVP"
  },
  {
    id: "a8",
    guestId: "g5",
    guestName: "Lucas & Mariana",
    timestamp: "2026-06-25T11:30:00Z",
    device: "Desktop",
    browser: "Chrome",
    region: "Minas Gerais (MG)",
    action: "Abriu Convite"
  },
  {
    id: "a9",
    guestId: "g5",
    guestName: "Lucas & Mariana",
    timestamp: "2026-06-25T11:45:00Z",
    device: "Desktop",
    browser: "Chrome",
    region: "Minas Gerais (MG)",
    action: "Confirmou RSVP (Recusado)"
  }
];

export const BRIDAL_PARTY_MEMBERS = [
  {
    name: "Sarah Rocha",
    role: "Madrinha de Honra",
    description: "Irmã da noiva, guardiã dos melhores segredos e companheira de uma vida inteira.",
    imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300"
  },
  {
    name: "Marcelo Albuquerque",
    role: "Padrinho de Honra",
    description: "Melhor amigo do noivo desde os tempos de colégio. O irmão que a vida escolheu.",
    imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300"
  },
  {
    name: "Helena & Gustavo",
    role: "Casal de Padrinhos",
    description: "Amigos de longa data que acompanharam de perto o início de toda essa linda história.",
    imageUrl: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=300"
  },
  {
    name: "Sofia & Tiago",
    role: "Casal de Padrinhos",
    description: "Conselheiros, parceiros de viagens épicas e o melhor casal de risada garantida.",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300"
  }
];
