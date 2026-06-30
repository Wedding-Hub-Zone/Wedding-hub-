import { TimelineEvent, FamilyMember, GalleryItem } from './types';

export const BRIDE_NAME = "Meera Sharma";
export const GROOM_NAME = "Aarav Malhotra";

export const WEDDING_DATE_RAW = "2026-11-21T16:00:00"; // Future target date
export const WEDDING_DATE = "November 21, 2026";
export const WEDDING_DAY = "Saturday";
export const WEDDING_MONTH = "November";
export const WEDDING_YEAR = "2026";
export const WEDDING_TIME = "4:00 PM Onwards";

export const VENUE_NAME = "The Grand Heritage Palace";
export const FULL_ADDRESS = "Udaivilas Road, Haridas Ji Ki Magri, Udaipur, Rajasthan 313001, India";
export const GOOGLE_MAPS_LINK = "https://maps.google.com/?q=The+Oberoi+Udaivilas+Udaipur";

// Contact Info
export const PHONE = "+91 98765 43210";
export const WHATSAPP = "+91 98765 43210";
export const EMAIL = "celebrate@aaravandmeera.wedding";
export const INSTAGRAM = "@aarav_meera_forever";
export const WEBSITE = "https://aaravandmeera.wedding";

export const INTRO_PARAGRAPH = 
  "With the grace of God and the blessings of our ancestors, we request the honor of your presence as we unite our hearts, families, and souls in holy matrimony. Let us share laughter, tears of joy, and create beautiful memories together on this magical day.";

export const FAMILY_MEMBERS: FamilyMember[] = [
  {
    id: "p1",
    name: "Sh. Rajesh & Smt. Sarita Sharma",
    relation: "Bride's Loving Parents",
    familySide: "bride",
    photoUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=300&auto=format&fit=crop"
  },
  {
    id: "p2",
    name: "Sh. Vijay & Smt. Poonam Malhotra",
    relation: "Groom's Loving Parents",
    familySide: "groom",
    photoUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=300&auto=format&fit=crop"
  },
  {
    id: "g1",
    name: "Late Sh. Shanti Prasad & Smt. Kamla Devi",
    relation: "Bride's Grandparents",
    familySide: "bride",
    photoUrl: ""
  },
  {
    id: "g2",
    name: "Sh. Hari Om & Smt. Krishna Malhotra",
    relation: "Groom's Grandparents",
    familySide: "groom",
    photoUrl: ""
  }
];

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: "e1",
    title: "Welcome Cocktail",
    date: "Nov 19, 2026",
    time: "7:00 PM Onwards",
    location: "Lakefront Sunset Lawn",
    description: "An elegant evening of music, gourmet food, and champagne to welcome all our guests under the Udaipur stars.",
    iconName: "GlassWater"
  },
  {
    id: "e2",
    title: "Shubh Haldi & Mehndi",
    date: "Nov 20, 2026",
    time: "11:00 AM",
    location: "Poolside Royal Courtyard",
    description: "A colorful, vibrant celebration of turmeric, traditional henna art, marigold showers, and dhol beats.",
    iconName: "Sparkles"
  },
  {
    id: "e3",
    title: "Sangeet Extravaganza",
    date: "Nov 20, 2026",
    time: "7:30 PM",
    location: "Grand Palace Ballroom",
    description: "Get ready to dance the night away! A premium evening filled with musical performances and royal banquets.",
    iconName: "Music"
  },
  {
    id: "e4",
    title: "Baraat & Wedding",
    date: "Nov 21, 2026",
    time: "4:00 PM",
    location: "Lakeside Palace Mandap",
    description: "Join the groom's grand procession, followed by the sacred pheres and exchange of garlands at sunset.",
    iconName: "Heart"
  },
  {
    id: "e5",
    title: "Royal Reception",
    date: "Nov 21, 2026",
    time: "8:00 PM",
    location: "The Palace Imperial Gardens",
    description: "A formal black-tie banquet celebrating the newlywed Mr. & Mrs. Malhotra with live jazz and royal delicacies.",
    iconName: "Crown"
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g_1",
    url: "https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?q=80&w=800&auto=format&fit=crop",
    caption: "A Journey of Infinite Love"
  },
  {
    id: "g_2",
    url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800&auto=format&fit=crop",
    caption: "The Sacred Vows"
  },
  {
    id: "g_3",
    url: "https://images.unsplash.com/photo-1595878715977-2e8f8df18ea8?q=80&w=800&auto=format&fit=crop",
    caption: "Intricate Henna Details"
  },
  {
    id: "g_4",
    url: "https://images.unsplash.com/photo-1615966689714-f4ec909ccf9f?q=80&w=800&auto=format&fit=crop",
    caption: "Marigold Celebrations"
  },
  {
    id: "g_5",
    url: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop",
    caption: "The Grand Pavilion"
  },
  {
    id: "g_6",
    url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop",
    caption: "Hand in Hand, Forever"
  }
];

// Seed list of default warm blessings
export const DEFAULT_BLESSINGS = [
  {
    id: "b1",
    name: "Aunt Shashi & Uncle Vinod",
    message: "May your lives be showered with endless love, happiness, and prosperity. Udaipur is the perfect backdrop for such a royal couple!",
    relation: "Family",
    createdAt: "2026-06-29T10:15:00Z"
  },
  {
    id: "b2",
    name: "Kabir Malhotra",
    message: "Welcome to the family, Meera! Cheers to the coolest couple. Can't wait for the Sangeet night dance-off!",
    relation: "Brother",
    createdAt: "2026-06-29T14:30:00Z"
  },
  {
    id: "b3",
    name: "Priya Sen",
    message: "So incredibly happy for you, Meera! You are going to make the most gorgeous royal bride. Sending all my love!",
    relation: "Best Friend",
    createdAt: "2026-06-30T01:05:00Z"
  }
];
