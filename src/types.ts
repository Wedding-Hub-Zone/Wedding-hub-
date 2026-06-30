export interface TimelineEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  iconName: string; // lucide icon name
}

export interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  familySide: 'bride' | 'groom';
  photoUrl: string;
}

export interface RSVPData {
  id: string;
  name: string;
  phone: string;
  guestsCount: number;
  attending: string;
  message: string;
  submittedAt: string;
}

export interface Blessing {
  id: string;
  name: string;
  message: string;
  relation?: string;
  createdAt: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  caption: string;
}
