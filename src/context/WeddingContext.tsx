import React, { createContext, useContext, useState, useEffect } from 'react';
import { Guest, Gift, Contribution, GuestPhoto, AnalyticsLog, WeddingSettings, Companion } from '../types';
import {
  INITIAL_WEDDING_SETTINGS,
  INITIAL_GUESTS,
  INITIAL_GIFTS,
  INITIAL_CONTRIBUTIONS,
  INITIAL_PHOTOS,
  INITIAL_ANALYTICS
} from '../data/weddingData';

interface WeddingContextType {
  settings: WeddingSettings;
  allGuests: Guest[];
  allGifts: Gift[];
  allContributions: Contribution[];
  allPhotos: GuestPhoto[];
  analyticsLogs: AnalyticsLog[];
  currentGuest: Guest | null;
  isAdmin: boolean;
  
  loginGuest: (code: string) => { success: boolean; guest?: Guest; error?: string };
  logoutGuest: () => void;
  loginAdmin: (code: string) => boolean;
  logoutAdmin: () => void;
  
  updateRSVP: (
    status: 'confirmed' | 'declined',
    companions: Companion[],
    restrictions: string,
    comment: string
  ) => void;
  
  addContribution: (
    giftId: string,
    amount: number,
    guestName: string,
    message: string,
    paymentMethod: 'pix' | 'card'
  ) => Contribution;
  
  uploadPhoto: (url: string, caption?: string) => void;
  toggleLikePhoto: (photoId: string) => void;
  
  // Admin functions
  addGuest: (code: string, name: string, maxCompanions: number) => { success: boolean; error?: string };
  deleteGuest: (id: string) => void;
  toggleCheckIn: (guestId: string) => void;
  approvePhoto: (photoId: string) => void;
  deletePhoto: (photoId: string) => void;
  updateSettings: (newSettings: WeddingSettings) => void;
  logAnalytics: (action: string, guestName?: string, guestId?: string) => void;
}

const WeddingContext = createContext<WeddingContextType | undefined>(undefined);

export function WeddingProvider({ children }: { children: React.ReactNode }) {
  // Load initial states from localStorage or use defaults
  const [settings, setSettings] = useState<WeddingSettings>(() => {
    const saved = localStorage.getItem('wedding_settings');
    return saved ? JSON.parse(saved) : INITIAL_WEDDING_SETTINGS;
  });

  const [allGuests, setAllGuests] = useState<Guest[]>(() => {
    const saved = localStorage.getItem('wedding_guests');
    return saved ? JSON.parse(saved) : INITIAL_GUESTS;
  });

  const [allGifts, setAllGifts] = useState<Gift[]>(() => {
    const saved = localStorage.getItem('wedding_gifts');
    return saved ? JSON.parse(saved) : INITIAL_GIFTS;
  });

  const [allContributions, setAllContributions] = useState<Contribution[]>(() => {
    const saved = localStorage.getItem('wedding_contributions');
    return saved ? JSON.parse(saved) : INITIAL_CONTRIBUTIONS;
  });

  const [allPhotos, setAllPhotos] = useState<GuestPhoto[]>(() => {
    const saved = localStorage.getItem('wedding_photos');
    return saved ? JSON.parse(saved) : INITIAL_PHOTOS;
  });

  const [analyticsLogs, setAnalyticsLogs] = useState<AnalyticsLog[]>(() => {
    const saved = localStorage.getItem('wedding_analytics');
    return saved ? JSON.parse(saved) : INITIAL_ANALYTICS;
  });

  const [currentGuest, setCurrentGuest] = useState<Guest | null>(() => {
    const saved = localStorage.getItem('wedding_current_guest');
    return saved ? JSON.parse(saved) : null;
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem('wedding_is_admin') === 'true';
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('wedding_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('wedding_guests', JSON.stringify(allGuests));
  }, [allGuests]);

  useEffect(() => {
    localStorage.setItem('wedding_gifts', JSON.stringify(allGifts));
  }, [allGifts]);

  useEffect(() => {
    localStorage.setItem('wedding_contributions', JSON.stringify(allContributions));
  }, [allContributions]);

  useEffect(() => {
    localStorage.setItem('wedding_photos', JSON.stringify(allPhotos));
  }, [allPhotos]);

  useEffect(() => {
    localStorage.setItem('wedding_analytics', JSON.stringify(analyticsLogs));
  }, [analyticsLogs]);

  useEffect(() => {
    if (currentGuest) {
      localStorage.setItem('wedding_current_guest', JSON.stringify(currentGuest));
    } else {
      localStorage.removeItem('wedding_current_guest');
    }
  }, [currentGuest]);

  useEffect(() => {
    localStorage.setItem('wedding_is_admin', isAdmin ? 'true' : 'false');
  }, [isAdmin]);

  // General helper to log analytics
  const logAnalytics = (action: string, guestName: string = 'Visitante Anônimo', guestId?: string) => {
    // Detect simple environment data for rich analytics
    const userAgent = navigator.userAgent;
    let device = 'Desktop';
    if (/android/i.test(userAgent)) device = 'Android';
    else if (/iPad|iPhone|iPod/.test(userAgent)) device = 'iPhone/iPad';

    let browser = 'Chrome';
    if (/safari/i.test(userAgent) && !/chrome/i.test(userAgent)) browser = 'Safari';
    else if (/firefox/i.test(userAgent)) browser = 'Firefox';
    else if (/edg/i.test(userAgent)) browser = 'Edge';

    // Simulate Brazilian regions for visual variance in charts
    const regions = ['Ceará (CE)', 'São Paulo (SP)', 'Rio de Janeiro (RJ)', 'Distrito Federal (DF)', 'Minas Gerais (MG)', 'Pernambuco (PE)', 'Bahia (BA)'];
    const randomRegion = regions[Math.floor(Math.random() * regions.length)];

    const newLog: AnalyticsLog = {
      id: 'log-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
      guestId,
      guestName,
      timestamp: new Date().toISOString(),
      device,
      browser,
      region: guestId ? (guestId === 'g2' ? 'São Paulo (SP)' : guestId === 'g5' ? 'Minas Gerais (MG)' : 'Ceará (CE)') : randomRegion,
      action
    };

    setAnalyticsLogs(prev => [newLog, ...prev]);
  };

  // Guest Login
  const loginGuest = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const guest = allGuests.find(g => g.code.toUpperCase() === cleanCode);

    if (guest) {
      // Update open stats for guest
      const updatedGuests = allGuests.map(g => {
        if (g.id === guest.id) {
          return { ...g, openCount: g.openCount + 1 };
        }
        return g;
      });
      setAllGuests(updatedGuests);

      const updatedGuest = { ...guest, openCount: guest.openCount + 1 };
      setCurrentGuest(updatedGuest);
      setIsAdmin(false);

      logAnalytics('Abriu Convite', updatedGuest.name, updatedGuest.id);
      return { success: true, guest: updatedGuest };
    }

    return { success: false, error: 'Código de convite não encontrado. Verifique se digitou corretamente.' };
  };

  const logoutGuest = () => {
    if (currentGuest) {
      logAnalytics('Saiu do Sistema', currentGuest.name, currentGuest.id);
    }
    setCurrentGuest(null);
  };

  // Admin Login
  const loginAdmin = (code: string) => {
    if (code.trim() === settings.adminCode) {
      setIsAdmin(true);
      setCurrentGuest(null);
      logAnalytics('Painel Admin Acessado', 'Administrador');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
  };

  // Update RSVP (Presence Confirmation)
  const updateRSVP = (
    status: 'confirmed' | 'declined',
    companions: Companion[],
    restrictions: string,
    comment: string
  ) => {
    if (!currentGuest) return;

    const rsvpDate = new Date().toISOString();
    
    const updatedGuests = allGuests.map(g => {
      if (g.id === currentGuest.id) {
        return {
          ...g,
          rsvpStatus: status,
          rsvpDate,
          companions,
          dietaryRestrictions: restrictions,
          comment
        };
      }
      return g;
    });

    setAllGuests(updatedGuests);
    
    const updatedGuest = {
      ...currentGuest,
      rsvpStatus: status,
      rsvpDate,
      companions,
      dietaryRestrictions: restrictions,
      comment
    };
    setCurrentGuest(updatedGuest);

    const actionName = status === 'confirmed' ? 'Confirmou RSVP' : 'Confirmou RSVP (Recusado)';
    logAnalytics(actionName, currentGuest.name, currentGuest.id);
  };

  // Gift Contribution
  const addContribution = (
    giftId: string,
    amount: number,
    guestName: string,
    message: string,
    paymentMethod: 'pix' | 'card'
  ) => {
    const newContribution: Contribution = {
      id: 'contrib-' + Date.now(),
      giftId,
      giftTitle: allGifts.find(g => g.id === giftId)?.title || 'Presente Geral',
      guestName: guestName || currentGuest?.name || 'Amigo Anônimo',
      amount,
      message,
      paymentMethod,
      date: new Date().toISOString()
    };

    // Increment count on gift
    setAllGifts(prev => prev.map(g => {
      if (g.id === giftId) {
        return { ...g, contributionsCount: g.contributionsCount + 1 };
      }
      return g;
    }));

    setAllContributions(prev => [newContribution, ...prev]);
    logAnalytics(`Presenteou: R$ ${amount}`, newContribution.guestName, currentGuest?.id);

    return newContribution;
  };

  // Photo Upload
  const uploadPhoto = (url: string, caption?: string) => {
    const name = currentGuest ? currentGuest.name : 'Visitante';
    const newPhoto: GuestPhoto = {
      id: 'photo-' + Date.now(),
      url,
      guestName: name,
      caption,
      likes: 0,
      approved: false, // requires admin approval to keep wall tidy (premium wedding style!)
      createdAt: new Date().toISOString()
    };

    setAllPhotos(prev => [newPhoto, ...prev]);
    logAnalytics('Enviou Foto', name, currentGuest?.id);
  };

  // Like Photo
  const toggleLikePhoto = (photoId: string) => {
    setAllPhotos(prev => prev.map(p => {
      if (p.id === photoId) {
        return { ...p, likes: p.likes + 1 };
      }
      return p;
    }));
  };

  // Admin: Add Guest Code
  const addGuest = (code: string, name: string, maxCompanions: number) => {
    const cleanCode = code.trim().toUpperCase();
    if (allGuests.some(g => g.code.toUpperCase() === cleanCode)) {
      return { success: false, error: 'Já existe um convidado registrado com este código.' };
    }

    const newGuest: Guest = {
      id: 'guest-' + Date.now(),
      code: cleanCode,
      name: name.trim(),
      maxCompanions,
      rsvpStatus: 'pending',
      checkedIn: false,
      openCount: 0
    };

    setAllGuests(prev => [...prev, newGuest]);
    logAnalytics(`Admin: Criou código ${cleanCode}`, 'Administrador');
    return { success: true };
  };

  // Admin: Delete Guest
  const deleteGuest = (id: string) => {
    const target = allGuests.find(g => g.id === id);
    setAllGuests(prev => prev.filter(g => g.id !== id));
    if (target) {
      logAnalytics(`Admin: Excluiu convidado ${target.name}`, 'Administrador');
    }
  };

  // Admin: Check-in at reception desk (QR Scan simulation)
  const toggleCheckIn = (guestId: string) => {
    setAllGuests(prev => prev.map(g => {
      if (g.id === guestId) {
        const nextState = !g.checkedIn;
        return {
          ...g,
          checkedIn: nextState,
          checkedInAt: nextState ? new Date().toISOString() : undefined
        };
      }
      return g;
    }));

    const target = allGuests.find(g => g.id === guestId);
    if (target) {
      const act = !target.checkedIn ? 'Check-in Realizado' : 'Check-in Desfeito';
      logAnalytics(`Admin: ${act} para ${target.name}`, 'Administrador');
    }
  };

  // Admin: Approve Guest Photo
  const approvePhoto = (photoId: string) => {
    setAllPhotos(prev => prev.map(p => {
      if (p.id === photoId) {
        return { ...p, approved: true };
      }
      return p;
    }));
    logAnalytics('Admin: Aprovou foto', 'Administrador');
  };

  // Admin: Delete Photo
  const deletePhoto = (photoId: string) => {
    setAllPhotos(prev => prev.filter(p => p.id !== photoId));
    logAnalytics('Admin: Deletou foto', 'Administrador');
  };

  // Admin: Update settings
  const updateSettings = (newSettings: WeddingSettings) => {
    setSettings(newSettings);
    logAnalytics('Admin: Atualizou Configurações', 'Administrador');
  };

  return (
    <WeddingContext.Provider value={{
      settings,
      allGuests,
      allGifts,
      allContributions,
      allPhotos,
      analyticsLogs,
      currentGuest,
      isAdmin,
      loginGuest,
      logoutGuest,
      loginAdmin,
      logoutAdmin,
      updateRSVP,
      addContribution,
      uploadPhoto,
      toggleLikePhoto,
      addGuest,
      deleteGuest,
      toggleCheckIn,
      approvePhoto,
      deletePhoto,
      updateSettings,
      logAnalytics
    }}>
      {children}
    </WeddingContext.Provider>
  );
}

export function useWedding() {
  const context = useContext(WeddingContext);
  if (context === undefined) {
    throw new Error('useWedding must be used within a WeddingProvider');
  }
  return context;
}
