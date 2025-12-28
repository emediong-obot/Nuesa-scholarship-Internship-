
import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { Bell, Lock, Smartphone, Globe, Moon, Sun, Monitor, LogOut, ChevronRight, ToggleRight, ToggleLeft, Shield, Mail, Trash2, Key, CheckCircle, MailWarning, Timer, ShieldCheck } from 'lucide-react';

interface SettingsProps {
  user: User;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  onLogout: () => void;
  reduceMotion: boolean;
  toggleReduceMotion: () => void;
  highContrast: boolean;
  toggleHighContrast: () => void;
}

const Settings: React.FC<SettingsProps> = ({ 
  user, 
  theme, 
  toggleTheme, 
  onLogout,
  reduceMotion,
  toggleReduceMotion,
  highContrast,
  toggleHighContrast
}) => {
  const [activeTab, setActiveTab] = useState<'notifications' | 'security' | 'display' | 'general'>('notifications');
  const [notifications, setNotifications] = useState({
      email: true,
      push: true,
      newsletters: false,
      sponsorshipAlerts: true
  });
  const [twoFactor, setTwoFactor] = useState(false);
  
  // Password Change State
  const [passwordForm, setPasswordForm] = useState({ new: '', confirm: '', otp: '' });
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [pwMessage, setPwMessage] = useState({ text: '', type: 'error' as 'error' | 'success' });

  useEffect(() => {
    let interval: any;
    if (resendTimer > 0) {
      interval = setInterval(() => setResendTimer(prev => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleNotificationToggle = (key: keyof typeof notifications) => {
      setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleRequestOtp = (e: React.MouseEvent) => {
      e.preventDefault();
      if (!passwordForm.new || passwordForm.new.length < 8) {
          setPwMessage({ text: 'New password must be at least 8 characters.', type: 'error' });
          return;
      }
      if (passwordForm.new !== passwordForm.confirm) {
          setPwMessage({ text: 'Passwords do not match.', type: 'error' });
          return;
      }

      // Simulate sending OTP
      setIsOtpSent(true);
      setResendTimer(60);
      setPwMessage({ text: `A 6-digit verification code has been sent to ${user.email}`, type: 'success' });
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
      e.preventDefault();
      if (!passwordForm.otp || passwordForm.otp.length !== 6) {
          setPwMessage({ text: 'Please enter a valid 6-digit OTP.', type: 'error' });
          return;
      }
      
      // Simulate verification (Accepting demo OTP 123456)
      if (passwordForm.otp !== '123456') {
          setPwMessage({ text: 'Invalid verification code. Use demo code: 123456', type: 'error' });
          return;
      }

      setPwMessage({ text: 'Password successfully updated!', type: 'success' });
      // Reset form
      setTimeout(() => {
          setPasswordForm({ new: '', confirm: '', otp: '' });
          setIsOtpSent(false);
          setPwMessage({ text: '', type: 'success' });
      }, 3000);
  };

  const menuItems = [
      { id: 'notifications', label: 'Notifications', icon: Bell, desc: 'Manage alerts & emails' },
      { id: 'security', label: 'Security', icon: Lock, desc: 'Password & 2FA' },
      { id: 'display', label: 'Display & Appearance', icon: Monitor, desc: 'Theme & accessibility' },
      { id: 'general', label: 'General', icon: Globe, desc: 'Language & Region' },
  ];

  const Toggle = ({ active, onChange }: { active: boolean, onChange: () => void }) => (
      <button onClick={onChange} className={`transition-colors duration-200 ${active ? 'text-green-600 dark:text-green-400' : 'text-gray-300 dark:text-gray-600'}`}>
          {active ? <ToggleRight size={40} className="fill-current" /> : <ToggleLeft size={40} />}
      </button>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 animate-fade-in">
        <div className="mb-8">
            <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">Settings</h1>
            <p className="text-gray-500 dark:text-gray-400">Manage your account preferences and application settings.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar Navigation */}
            <div className="w-full md:w-64 space-y-2">
                {menuItems.map(item => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id as any)}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all ${
                            activeTab === item.id 
                                ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 font-bold' 
                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                    >
                        <item.icon size={20} />
                        <div>
                            <span className="block text-sm">{item.label}</span>
                            <span className="block text-[10px] opacity-70 font-normal">{item.desc}</span>
                        </div>
                    </button>
                ))}
                
                <div className="pt-6 mt-6 border-t border-gray-100 dark:border-gray-800">
                     <button
                        onClick={onLogout}
                        className="w-full flex items-center gap-3 p-3 rounded-xl text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all font-medium"
                    >
                        <LogOut size={20} />
                        <span className="text-sm">Sign Out</span>
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-gray-800">
                
                {/* NOTIFICATIONS SETTINGS */}
                {activeTab === 'notifications' && (
                    <div className="space-y-8 animate-fade-in">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <Bell className="text-orange-500" /> Notification Preferences
                        </h2>
                        
                        <div className="space-y-6">
                            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg">
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 dark:text-white">Email Notifications</h3>
                                        <p className="text-xs text-gray-500">Receive updates about your applications via email.</p>
                                    </div>
                                </div>
                                <Toggle active={notifications.email} onChange={() => handleNotificationToggle('email')} />
                            </div>

                            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-lg">
                                        <Smartphone size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 dark:text-white">Push Notifications</h3>
                                        <p className="text-xs text-gray-500">Get instant alerts on your device.</p>
                                    </div>
                                </div>
                                <Toggle active={notifications.push} onChange={() => handleNotificationToggle('push')} />
                            </div>

                            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-lg">
                                        <Shield size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 dark:text-white">Sponsorship Alerts</h3>
                                        <p className="text-xs text-gray-500">Notify me when new sponsorships match my profile.</p>
                                    </div>
                                </div>
                                <Toggle active={notifications.sponsorshipAlerts} onChange={() => handleNotificationToggle('sponsorshipAlerts')} />
                            </div>
                        </div>
                    </div>
                )}

                {/* SECURITY SETTINGS */}
                {activeTab === 'security' && (
                    <div className="space-y-8 animate-fade-in">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <Lock className="text-orange-500" /> Security Settings
                        </h2>

                        <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-800">
                             <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className="font-bold text-gray-900 dark:text-white text-lg">Two-Factor Authentication</h3>
                                    <p className="text-sm text-gray-500">Add an extra layer of security to your account.</p>
                                </div>
                                <Toggle active={twoFactor} onChange={() => setTwoFactor(!twoFactor)} />
                             </div>
                             {twoFactor && (
                                 <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg text-sm text-green-700 dark:text-green-300 flex items-center gap-2">
                                     <CheckCircle size={16} /> 2FA is currently active.
                                 </div>
                             )}
                        </div>

                        <div className="border-t border-gray-100 dark:border-gray-800 pt-6">
                            <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                                <Key size={18} /> Update Password
                            </h3>
                            <p className="text-sm text-gray-500 mb-6">For your security, changing your password requires email verification.</p>
                            
                            <form onSubmit={handlePasswordUpdate} className="space-y-6 max-w-md">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 ml-1">New Password</label>
                                        <input 
                                            type="password" 
                                            required
                                            disabled={isOtpSent}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-orange-500 outline-none transition-all disabled:opacity-50"
                                            placeholder="Minimum 8 characters"
                                            value={passwordForm.new}
                                            onChange={e => setPasswordForm({...passwordForm, new: e.target.value})}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 ml-1">Confirm Password</label>
                                        <input 
                                            type="password" 
                                            required
                                            disabled={isOtpSent}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-orange-500 outline-none transition-all disabled:opacity-50"
                                            placeholder="Repeat new password"
                                            value={passwordForm.confirm}
                                            onChange={e => setPasswordForm({...passwordForm, confirm: e.target.value})}
                                        />
                                    </div>
                                </div>

                                {isOtpSent ? (
                                    <div className="space-y-4 animate-fade-in bg-orange-50 dark:bg-orange-900/10 p-6 rounded-2xl border border-orange-100 dark:border-orange-900/20">
                                        <div className="flex items-center gap-3 mb-2 text-orange-800 dark:text-orange-300">
                                            <ShieldCheck size={20} />
                                            <span className="font-bold text-sm">Verify Email Identity</span>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-orange-400 uppercase tracking-widest mb-2 ml-1">Verification Code (OTP)</label>
                                            <input 
                                                type="text" 
                                                required
                                                maxLength={6}
                                                className="w-full px-4 py-4 text-center text-3xl font-black tracking-[0.5em] rounded-xl border-2 border-orange-200 dark:border-orange-800 bg-white dark:bg-gray-950 focus:border-orange-500 outline-none transition-all"
                                                placeholder="000000"
                                                value={passwordForm.otp}
                                                onChange={e => setPasswordForm({...passwordForm, otp: e.target.value.replace(/[^0-9]/g, '')})}
                                                autoFocus
                                            />
                                        </div>
                                        <div className="flex justify-between items-center pt-2">
                                            <button 
                                                type="button" 
                                                onClick={() => setIsOtpSent(false)} 
                                                className="text-xs font-bold text-gray-400 hover:text-gray-600 underline"
                                            >
                                                Change Password
                                            </button>
                                            <button 
                                                type="button" 
                                                disabled={resendTimer > 0}
                                                onClick={handleRequestOtp}
                                                className={`text-xs font-bold flex items-center gap-1 ${resendTimer > 0 ? 'text-gray-400' : 'text-orange-600'}`}
                                            >
                                                {resendTimer > 0 ? <><Timer size={14} /> Resend in {resendTimer}s</> : 'Resend Code'}
                                            </button>
                                        </div>
                                        
                                        <button 
                                            type="submit" 
                                            className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-black shadow-lg shadow-orange-500/20 transition-all uppercase tracking-widest text-sm"
                                        >
                                            Verify & Update Password
                                        </button>
                                    </div>
                                ) : (
                                    <button 
                                        type="button" 
                                        onClick={handleRequestOtp}
                                        className="w-full py-4 bg-gray-900 dark:bg-gray-700 text-white rounded-xl hover:bg-gray-800 dark:hover:bg-gray-600 transition-all font-bold flex items-center justify-center gap-2 shadow-xl"
                                    >
                                        <Mail size={18} />
                                        Send OTP to {user.email.split('@')[0].slice(0,3)}***@{user.email.split('@')[1]}
                                    </button>
                                )}

                                {pwMessage.text && (
                                    <div className={`p-4 rounded-xl text-sm font-medium border flex items-start gap-3 animate-fade-in ${pwMessage.type === 'success' ? 'bg-green-50 border-green-100 text-green-700 dark:bg-green-900/20 dark:border-green-800 dark:text-green-300' : 'bg-red-50 border-red-100 text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300'}`}>
                                        {pwMessage.type === 'success' ? <CheckCircle size={18} /> : <MailWarning size={18} />}
                                        <p>{pwMessage.text}</p>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                )}

                {/* DISPLAY SETTINGS */}
                {activeTab === 'display' && (
                    <div className="space-y-8 animate-fade-in">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <Monitor className="text-orange-500" /> Display & Appearance
                        </h2>

                        <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
                             <h3 className="font-bold text-gray-900 dark:text-white mb-4">Theme Preference</h3>
                             <div className="grid grid-cols-2 gap-4 max-w-md">
                                 <button 
                                    onClick={() => theme === 'dark' && toggleTheme()}
                                    className={`p-4 rounded-xl border-2 flex flex-col items-center gap-3 transition-all ${theme === 'light' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300'}`}
                                 >
                                     <Sun size={32} className={theme === 'light' ? 'text-orange-600' : 'text-gray-400'} />
                                     <span className="font-bold text-sm">Light Mode</span>
                                 </button>

                                 <button 
                                    onClick={() => theme === 'light' && toggleTheme()}
                                    className={`p-4 rounded-xl border-2 flex flex-col items-center gap-3 transition-all ${theme === 'dark' ? 'border-blue-500 bg-gray-800' : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300'}`}
                                 >
                                     <Moon size={32} className={theme === 'dark' ? 'text-blue-400' : 'text-gray-400'} />
                                     <span className="font-bold text-sm">Dark Mode</span>
                                 </button>
                             </div>
                        </div>

                        <div>
                            <h3 className="font-bold text-gray-900 dark:text-white mb-2">Accessibility</h3>
                            <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
                                <span>Reduce Motion</span>
                                <Toggle active={reduceMotion} onChange={toggleReduceMotion} />
                            </div>
                            <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
                                <span>High Contrast</span>
                                <Toggle active={highContrast} onChange={toggleHighContrast} />
                            </div>
                        </div>
                    </div>
                )}

                {/* GENERAL SETTINGS */}
                {activeTab === 'general' && (
                    <div className="space-y-8 animate-fade-in">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <Globe className="text-orange-500" /> General Settings
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Language</label>
                                <select className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 outline-none">
                                    <option>English (United Kingdom)</option>
                                    <option>English (United States)</option>
                                    <option>French</option>
                                    <option>Spanish</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Time Zone</label>
                                <select className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 outline-none">
                                    <option>West Africa Time (WAT) - Lagos</option>
                                    <option>Greenwich Mean Time (GMT)</option>
                                    <option>Eastern Standard Time (EST)</option>
                                </select>
                            </div>
                        </div>

                        <div className="pt-8 mt-8 border-t border-gray-100 dark:border-gray-800">
                            <h3 className="text-red-600 font-bold mb-4 flex items-center gap-2">
                                <Trash2 size={18} /> Danger Zone
                            </h3>
                            <div className="p-4 border border-red-200 bg-red-50 dark:bg-red-900/10 rounded-xl flex justify-between items-center">
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white">Delete Account</h4>
                                    <p className="text-sm text-gray-500">Permanently delete your account and all data.</p>
                                </div>
                                <button className="px-4 py-2 bg-white border border-red-200 text-red-600 rounded-lg hover:bg-red-50 font-medium text-sm transition-colors">
                                    Delete Account
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    </div>
  );
};

export default Settings;
