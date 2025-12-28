
import { User, SavedOpportunity, Sponsorship, AppNotification } from '../types';

const USER_KEY = 'nuesa_user';
const DATA_KEY = 'nuesa_data';
const SPONSORSHIP_KEY = 'nuesa_sponsorships';
const NOTIFICATIONS_KEY = 'nuesa_notifications';
const RATING_PROMPT_KEY = 'nuesa_rating_prompt_date';

// Mock recently joined students for social proof
const RECENT_STUDENTS = [
  { name: "Olawale J.", img: "https://i.pravatar.cc/150?u=olawale" },
  { name: "Zainab A.", img: "https://i.pravatar.cc/150?u=zainab" },
  { name: "Chidi O.", img: "https://i.pravatar.cc/150?u=chidi" },
  { name: "Fatima B.", img: "https://i.pravatar.cc/150?u=fatima" },
  { name: "Tunde E.", img: "https://i.pravatar.cc/150?u=tunde" },
  { name: "Amaka N.", img: "https://i.pravatar.cc/150?u=amaka" }
];

interface AppData {
  saved: SavedOpportunity[];
}

export const storageService = {
  getUser: (): User | null => {
    const stored = localStorage.getItem(USER_KEY);
    return stored ? JSON.parse(stored) : null;
  },

  getRecentStudents: () => RECENT_STUDENTS,

  login: (email: string, name: string, role: 'student' | 'sponsor' = 'student', title?: string, contactPerson?: string): User => {
    const stored = localStorage.getItem(USER_KEY);
    if (stored) {
        const existing: User = JSON.parse(stored);
        if (existing.email === email) {
            if (role && existing.role !== role) existing.role = role;
            if (title && !existing.title) existing.title = title;
            if (contactPerson) existing.contactPerson = contactPerson;
            if (name && existing.name !== name) existing.name = name;

            localStorage.setItem(USER_KEY, JSON.stringify(existing));
            return existing;
        }
    }

    const user: User = { email, name, role, title, contactPerson };
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    if (!localStorage.getItem(DATA_KEY)) {
      localStorage.setItem(DATA_KEY, JSON.stringify({ saved: [] }));
    }
    return user;
  },

  updateUser: (updatedUser: User) => {
    localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
  },

  logout: () => {
    localStorage.removeItem(USER_KEY);
  },

  getSavedOpportunities: (): SavedOpportunity[] => {
    const data = localStorage.getItem(DATA_KEY);
    return data ? JSON.parse(data).saved : [];
  },

  saveOpportunity: (opportunity: SavedOpportunity) => {
    const data = localStorage.getItem(DATA_KEY);
    const parsed: AppData = data ? JSON.parse(data) : { saved: [] };
    
    if (!parsed.saved.some(o => o.title === opportunity.title)) {
      parsed.saved.unshift(opportunity);
      localStorage.setItem(DATA_KEY, JSON.stringify(parsed));
    }
  },

  updateOpportunityStatus: (id: string, status: 'Applied' | 'Interested' | 'Won') => {
    const data = localStorage.getItem(DATA_KEY);
    if (data) {
        const parsed: AppData = JSON.parse(data);
        const index = parsed.saved.findIndex(o => o.id === id);
        if (index !== -1) {
            parsed.saved[index].status = status;
            localStorage.setItem(DATA_KEY, JSON.stringify(parsed));
        }
    }
  },

  removeOpportunity: (id: string) => {
    const data = localStorage.getItem(DATA_KEY);
    if (data) {
        const parsed: AppData = JSON.parse(data);
        parsed.saved = parsed.saved.filter(o => o.id !== id);
        localStorage.setItem(DATA_KEY, JSON.stringify(parsed));
    }
  },

  createSponsorship: (sponsorship: Sponsorship) => {
    const stored = localStorage.getItem(SPONSORSHIP_KEY);
    const list: Sponsorship[] = stored ? JSON.parse(stored) : [];
    list.unshift(sponsorship);
    localStorage.setItem(SPONSORSHIP_KEY, JSON.stringify(list));
  },

  getSponsorships: (email?: string): Sponsorship[] => {
    const stored = localStorage.getItem(SPONSORSHIP_KEY);
    const list: Sponsorship[] = stored ? JSON.parse(stored) : [];
    if (email) {
      return list.filter(s => s.providerEmail === email);
    }
    return list;
  },

  incrementSponsorshipApplicants: (id: string) => {
      const stored = localStorage.getItem(SPONSORSHIP_KEY);
      if (stored) {
          const list: Sponsorship[] = JSON.parse(stored);
          const index = list.findIndex(s => s.id === id);
          if (index !== -1) {
              // In a real app, this would be a backend property. 
              // We'll simulate tracking by storing it in local storage for now.
              // Note: Sponsorship type doesn't officially have 'applicantCount', 
              // we can just log it or add it if needed.
              console.log(`Applicant tracked for sponsorship: ${id}`);
          }
      }
  },

  getSponsorshipById: (id: string): Sponsorship | undefined => {
    const stored = localStorage.getItem(SPONSORSHIP_KEY);
    const list: Sponsorship[] = stored ? JSON.parse(stored) : [];
    return list.find(s => s.id === id);
  },

  getNotifications: (): AppNotification[] => {
    const stored = localStorage.getItem(NOTIFICATIONS_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  addNotification: (notification: AppNotification) => {
    const stored = localStorage.getItem(NOTIFICATIONS_KEY);
    const list: AppNotification[] = stored ? JSON.parse(stored) : [];
    if (list.length > 50) list.pop();
    list.unshift(notification);
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(list));
  },

  shouldShowRating: (): boolean => {
    const lastPrompt = localStorage.getItem(RATING_PROMPT_KEY);
    if (!lastPrompt) return true;
    
    const oneDay = 24 * 60 * 60 * 1000;
    const now = Date.now();
    return now - parseInt(lastPrompt) > oneDay;
  },

  saveRatingPromptDate: () => {
    localStorage.setItem(RATING_PROMPT_KEY, Date.now().toString());
  }
};
