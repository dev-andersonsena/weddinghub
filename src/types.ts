export type RSVPStatus = 'pending' | 'confirmed' | 'declined';

export interface Companion {
  name: string;
  isConfirmed: boolean;
}

export interface Guest {
  id: string;
  code: string; // Login code (e.g., "VIP-FAMILY", "AMIGO-PEDRO")
  name: string; // Display name
  maxCompanions: number;
  rsvpStatus: RSVPStatus;
  rsvpDate?: string;
  companions?: Companion[];
  dietaryRestrictions?: string;
  comment?: string;
  checkedIn: boolean;
  checkedInAt?: string;
  openCount: number;
}

export interface Gift {
  id: string;
  title: string;
  price: number;
  category: 'honeymoon' | 'home' | 'experience';
  imageUrl: string;
  contributionsCount: number;
}

export interface Contribution {
  id: string;
  giftId: string;
  giftTitle: string;
  guestName: string;
  amount: number;
  message?: string;
  paymentMethod: 'pix' | 'card';
  date: string;
}

export interface GuestPhoto {
  id: string;
  url: string; // Base64 or placeholder URL
  guestName: string;
  caption?: string;
  likes: number;
  approved: boolean;
  createdAt: string;
}

export interface AnalyticsLog {
  id: string;
  guestId?: string;
  guestName: string;
  timestamp: string;
  device: string;
  browser: string;
  region: string;
  action: string; // e.g., "Opened Invitation", "Viewed Gift List", "RSVP Confirmed"
}

export interface WeddingSettings {
  coupleName1: string;
  coupleName2: string;
  date: string; // e.g., "2027-05-22"
  time: string; // e.g., "16:00"
  ceremonyLocation: string;
  receptionLocation: string;
  ceremonyMapUrl: string;
  receptionMapUrl: string;
  storyText: string;
  adminCode: string;
}
