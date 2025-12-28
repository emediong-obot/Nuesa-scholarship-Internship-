
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './views/Home';
import Finder from './components/Finder';
import Auth from './views/Auth';
import Dashboard from './views/Dashboard';
import Profile from './views/Profile';
import Sponsors from './views/Sponsors';
import Settings from './views/Settings';
import Notifications from './views/Notifications';
import Legal from './views/Legal';
import RatingModal from './components/RatingModal';
import { ViewState, User, ParsedOpportunity, AppNotification, Opportunity, Sponsorship } from './types';
import { storageService } from './services/storage';
import { notificationService } from './services/notificationService';
import { opportunityService } from './services/opportunityService';
import { discoverTrendingOpportunities } from './services/geminiService';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  const [user, setUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [featuredOpportunities, setFeaturedOpportunities] = useState<Opportunity[]>([]);
  const [showRatingModal, setShowRatingModal] = useState(false);
  
  // Ref to track seen notifications to prevent duplicates during live scout
  const seenNotificationTitles = useRef<Set<string>>(new Set());

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved === 'dark' || saved === 'light') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  const [reduceMotion, setReduceMotion] = useState(() => {
      if (typeof window !== 'undefined') {
          return localStorage.getItem('accessibility_reduce_motion') === 'true';
      }
      return false;
  });

  const [highContrast, setHighContrast] = useState(() => {
      if (typeof window !== 'undefined') {
          return localStorage.getItem('accessibility_high_contrast') === 'true';
      }
      return false;
  });

  const loadOpportunities = useCallback(() => {
    const mockOpportunities = opportunityService.getAll();
    const partnerSponsorships = storageService.getSponsorships();
    const mappedPartnerOpportunities: Opportunity[] = partnerSponsorships.map((s: Sponsorship) => ({
        id: s.id,
        title: s.title,
        provider: s.providerName || 'Partner Organization',
        deadline: s.deadline,
        amount: s.amount,
        location: 'Nigeria',
        link: s.link || '#', 
        type: s.type.toLowerCase().includes('internship') ? 'internship' : 'scholarship',
        tags: ['Partner Sponsored', s.type],
        image: s.type.toLowerCase().includes('internship') 
            ? 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=600'
            : 'https://images.unsplash.com/photo-1627556704290-2b1f5853ff78?auto=format&fit=crop&q=80&w=600',
        description: s.criteria,
        requiredDocuments: s.requiredDocuments // Pass through the specific required documents
    }));

    setFeaturedOpportunities([...mappedPartnerOpportunities, ...mockOpportunities]);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    localStorage.setItem('theme', theme);

    if (reduceMotion) root.classList.add('reduce-motion');
    else root.classList.remove('reduce-motion');
    localStorage.setItem('accessibility_reduce_motion', String(reduceMotion));

    if (highContrast) root.classList.add('high-contrast');
    else root.classList.remove('high-contrast');
    localStorage.setItem('accessibility_high_contrast', String(highContrast));
  }, [theme, reduceMotion, highContrast]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');
  const toggleReduceMotion = () => setReduceMotion(prev => !prev);
  const toggleHighContrast = () => setHighContrast(prev => !prev);

  useEffect(() => {
    const loadedUser = storageService.getUser();
    setUser(loadedUser);
    
    if (loadedUser && storageService.shouldShowRating()) {
        setTimeout(() => setShowRatingModal(true), 3000);
    }
    
    const storedNotifications = storageService.getNotifications();
    setNotifications(storedNotifications);
    storedNotifications.forEach(n => seenNotificationTitles.current.add(n.message));
    
    loadOpportunities();

    // Start the Live Notification Scout
    startLiveScout();

    // Global navigation listener for unauthenticated actions
    const handleAuthNav = () => setCurrentView(ViewState.AUTH);
    window.addEventListener('navigate-auth', handleAuthNav);
    return () => window.removeEventListener('navigate-auth', handleAuthNav);
  }, [loadOpportunities]);

  const startLiveScout = () => {
      // 1. Mandatory Data Security & Usage Notification
      setTimeout(() => {
          const secNotif = notificationService.formatDiscoveredNotification("Data Usage & Privacy", "NUESA Compliance", 'system' as any);
          secNotif.title = "Security & Privacy Confirmed";
          secNotif.message = "We confirm that your personal and academic data is secured with industrial-grade encryption and will be used solely for scholarship and internship matching purposes.";
          
          if (!seenNotificationTitles.current.has(secNotif.message)) {
              setNotifications(prev => [secNotif, ...prev]);
              storageService.addNotification(secNotif);
              seenNotificationTitles.current.add(secNotif.message);
              notificationService.triggerSystemNotification(secNotif.title, secNotif.message, 'system');
          }
      }, 5000);

      // 2. Real-World Discovery Loop (The "Real-Life" part)
      const scoutInterval = setInterval(async () => {
          const trending = await discoverTrendingOpportunities();
          
          trending.forEach(opp => {
              const notif = notificationService.formatDiscoveredNotification(opp.title, opp.provider, opp.type, opp.link);
              
              if (!seenNotificationTitles.current.has(notif.message)) {
                  setNotifications(prev => [notif, ...prev]);
                  storageService.addNotification(notif);
                  seenNotificationTitles.current.add(notif.message);
                  
                  // Native OS Notification
                  notificationService.triggerSystemNotification(notif.title, notif.message, notif.type);
              }
          });
      }, 180000); // 3 minutes loop for real-time scanning

      return () => clearInterval(scoutInterval);
  };

  const handleSponsorNotification = (notification: AppNotification) => {
      setNotifications(prev => [notification, ...prev]);
      storageService.addNotification(notification);
      notificationService.triggerSystemNotification(notification.title, notification.message, notification.type);
      // Immediately refresh opportunities when a partner creates one
      loadOpportunities();
  };

  const handleEnableNotifications = async () => {
      const granted = await notificationService.requestPermission();
      if (granted) {
          notificationService.triggerSystemNotification("Notifications Enabled", "Real-time opportunity tracking is now active.", "system");
      } else {
          alert("Enable browser notifications to receive real-time scholarship alerts.");
      }
  };

  const markAsRead = (id: string) => {
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleLogin = (newUser: User) => {
    setUser(newUser);
    if (storageService.shouldShowRating()) setTimeout(() => setShowRatingModal(true), 2000);
    if (newUser.role === 'sponsor') setCurrentView(ViewState.SPONSORS);
    else setCurrentView(ViewState.DASHBOARD);
  };

  const handleUpdateUser = (updatedUser: User) => {
    storageService.updateUser(updatedUser);
    setUser(updatedUser);
  };

  const handleLogout = () => {
    storageService.logout();
    setUser(null);
    setCurrentView(ViewState.HOME);
  };

  const handleSaveOpportunity = (opp: ParsedOpportunity, type: 'scholarship' | 'internship', status: 'Applied' | 'Interested' | 'Won' = 'Applied', requiredDocuments?: string[]) => {
    if (!user) {
        alert("Please sign in to track applications.");
        setCurrentView(ViewState.AUTH);
        return;
    }
    storageService.saveOpportunity({
        ...opp,
        id: crypto.randomUUID(),
        dateSaved: new Date().toISOString(),
        status,
        type,
        requiredDocuments
    });
  };

  const renderView = () => {
    switch (currentView) {
      case ViewState.HOME: return <Home onNavigate={setCurrentView} />;
      case ViewState.SCHOLARSHIPS: return <Finder type="scholarship" onSave={(opp, status, docs) => handleSaveOpportunity(opp, 'scholarship', status, docs)} user={user} featuredOpportunities={featuredOpportunities.filter(o => o.type === 'scholarship')} />;
      case ViewState.INTERNSHIPS: return <Finder type="internship" onSave={(opp, status, docs) => handleSaveOpportunity(opp, 'internship', status, docs)} user={user} featuredOpportunities={featuredOpportunities.filter(o => o.type === 'internship')} />;
      case ViewState.AUTH: return <Auth onLogin={handleLogin} />;
      case ViewState.SPONSORS: return <Sponsors onLogin={handleLogin} user={user && user.role === 'sponsor' ? user : null} onNewNotification={handleSponsorNotification} />;
      case ViewState.DASHBOARD: return user ? <Dashboard user={user} /> : null;
      case ViewState.PROFILE: return user ? <Profile user={user} onUpdate={handleUpdateUser} /> : null;
      case ViewState.SETTINGS: return user ? <Settings user={user} theme={theme} toggleTheme={toggleTheme} onLogout={handleLogout} reduceMotion={reduceMotion} toggleReduceMotion={toggleReduceMotion} highContrast={highContrast} toggleHighContrast={toggleHighContrast} /> : null;
      case ViewState.NOTIFICATIONS: return <Notifications notifications={notifications} user={user} onMarkRead={markAsRead} onMarkAllRead={markAllAsRead} />;
      case ViewState.LEGAL: return <Legal />;
      default: return <Home onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950 font-sans text-slate-900 dark:text-gray-100 transition-colors">
      <Navbar 
        currentView={currentView} 
        onNavigate={setCurrentView} 
        user={user} 
        onLogout={handleLogout}
        theme={theme}
        toggleTheme={toggleTheme}
        notifications={notifications}
        onEnableNotifications={handleEnableNotifications}
        onMarkRead={markAsRead}
        onMarkAllRead={markAllAsRead}
      />
      
      <main className="flex-grow w-full md:pr-80 transition-all duration-300">
        {renderView()}
      </main>

      <div className="md:pr-80 transition-all duration-300">
         <Footer onNavigate={setCurrentView} onRate={() => setShowRatingModal(true)} />
      </div>
      
      <RatingModal isOpen={showRatingModal} onClose={() => setShowRatingModal(false)} />
    </div>
  );
};

export default App;