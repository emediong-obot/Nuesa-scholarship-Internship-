
import React from 'react';
import { Opportunity, User } from '../types';
import { X, Calendar, MapPin, Building, DollarSign, CheckCircle2, ShieldCheck, ExternalLink, ArrowRight, Bookmark, LogIn, FileWarning, Check, UserCheck, ScrollText, ListChecks } from 'lucide-react';

interface OpportunityModalProps {
  opportunity: Opportunity;
  onClose: () => void;
  onApply: (opp: Opportunity) => void;
  user: User | null;
}

const OpportunityModal: React.FC<OpportunityModalProps> = ({ opportunity, onClose, onApply, user }) => {
  const hasRequiredDocs = opportunity.requiredDocuments && opportunity.requiredDocuments.length > 0;
  const isStudent = user?.role === 'student';
  const isSponsor = user?.role === 'sponsor';
  const isPartnerPost = opportunity.tags?.includes('Partner Sponsored');

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-gray-900 w-full max-w-5xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800 relative flex flex-col md:flex-row max-h-[90vh] animate-scale-in">
        
        {/* Left Side: Detailed Information */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 md:p-12">
            <button 
                onClick={onClose}
                className="md:hidden absolute top-4 right-4 p-2 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
                <X size={20} />
            </button>

            <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center text-orange-600">
                        <Building size={24} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Provider</p>
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white">{opportunity.provider}</h4>
                    </div>
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white leading-tight">
                    {opportunity.title}
                </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl border border-gray-100 dark:border-gray-800">
                    <div className="text-orange-500 mb-1"><DollarSign size={18} /></div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Amount</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{opportunity.amount || 'Not Specified'}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl border border-gray-100 dark:border-gray-800">
                    <div className="text-green-500 mb-1"><Calendar size={18} /></div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Deadline</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{opportunity.deadline || 'Ongoing'}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl border border-gray-100 dark:border-gray-800">
                    <div className="text-blue-500 mb-1"><MapPin size={18} /></div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Location</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{opportunity.location || 'Remote/Nigeria'}</p>
                </div>
            </div>

            <div className="space-y-10">
                {/* Eligibility Criteria Section */}
                <div className="relative">
                    <div className="flex items-center gap-3 mb-4 text-gray-900 dark:text-white">
                        <ScrollText className="text-orange-500" size={22} />
                        <h3 className="text-xl font-bold">{isPartnerPost ? 'Eligibility Criteria' : 'Program Details'}</h3>
                    </div>
                    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 shadow-sm">
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base whitespace-pre-line">
                            {opportunity.description}
                        </p>
                    </div>
                </div>

                {/* Required Documents Section */}
                {hasRequiredDocs && (
                    <div className="relative">
                        <div className="flex items-center gap-3 mb-4 text-gray-900 dark:text-white">
                            <ListChecks className="text-green-500" size={22} />
                            <h3 className="text-xl font-bold">Required Documents</h3>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-3">
                            {opportunity.requiredDocuments?.map((doc, idx) => {
                                const isProvided = user?.documents?.[doc];
                                return (
                                    <div key={idx} className={`flex items-center justify-between p-4 rounded-xl border transition-all ${isProvided ? 'bg-green-50 dark:bg-green-900/10 border-green-100 dark:border-green-900/30' : 'bg-gray-50 dark:bg-gray-800/50 border-gray-100 dark:border-gray-800'}`}>
                                        <span className={`text-sm font-bold ${isProvided ? 'text-green-800 dark:text-green-300' : 'text-gray-600 dark:text-gray-400'}`}>{doc}</span>
                                        {isProvided ? (
                                            <div className="bg-green-500 text-white rounded-full p-1" title="Document present in your profile">
                                                <Check size={12} strokeWidth={4} />
                                            </div>
                                        ) : (
                                            <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600" title="Missing from profile"></div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                        {!isStudent && !isSponsor && (
                            <p className="mt-4 text-xs text-gray-500 italic">Sign in as a student to see if your documents match these requirements.</p>
                        )}
                        {isStudent && opportunity.requiredDocuments?.some(doc => !user?.documents?.[doc]) && (
                            <div className="mt-4 flex items-center gap-2 text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-xl border border-amber-100 dark:border-amber-900/30">
                                <FileWarning size={16} />
                                <span className="text-xs font-medium">You have missing documents. You can still apply and upload them later in your Profile.</span>
                            </div>
                        )}
                    </div>
                )}

                {/* Automatic Verification Notice */}
                <div className="p-6 bg-blue-50 dark:bg-blue-900/10 rounded-3xl border border-blue-100 dark:border-blue-900/30 flex gap-4">
                    <ShieldCheck className="text-blue-600 dark:text-blue-400 shrink-0" size={24} />
                    <div>
                        <h4 className="text-sm font-bold text-blue-900 dark:text-blue-300 mb-1">NUESA Smart Verification</h4>
                        <p className="text-xs text-blue-700 dark:text-blue-400 leading-relaxed">
                            Once you click "Transmit Application", your NUESA Verified ID and current academic standing will be instantly shared with {opportunity.provider}. No manual document uploads are needed during this stage.
                        </p>
                    </div>
                </div>
            </div>
        </div>

        {/* Right Side: Fixed Action Panel */}
        <div className="w-full md:w-[380px] bg-gray-50 dark:bg-gray-800/80 p-8 md:p-12 border-l border-gray-100 dark:border-gray-800 flex flex-col justify-between">
            <button 
                onClick={onClose}
                className="hidden md:flex self-end p-3 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-2xl text-gray-500 transition-colors mb-12"
            >
                <X size={24} />
            </button>

            <div>
                <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-xl mb-8 border border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white">
                            <Bookmark size={20} className="fill-current" />
                        </div>
                        <h4 className="font-black text-gray-900 dark:text-white">{isStudent ? 'Instant Apply' : 'Secure Entry'}</h4>
                    </div>
                    
                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
                        {isStudent 
                           ? "Apply instantly using your pre-vetted academic profile. Your data will be transmitted securely to the provider."
                           : isSponsor 
                             ? "Application is restricted to verified student accounts. Partners can only manage schemes and scout talent."
                             : "You must be signed in to your NUESA student account to use the one-click application system."
                        }
                    </p>

                    {isStudent ? (
                        <button 
                            onClick={() => onApply(opportunity)}
                            className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-black rounded-2xl transition-all shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 group"
                        >
                            <span>Transmit Application</span>
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    ) : isSponsor ? (
                        <div className="w-full py-4 bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 font-bold rounded-2xl flex items-center justify-center gap-2 cursor-not-allowed">
                            <UserCheck size={18} />
                            <span>Student Access Required</span>
                        </div>
                    ) : (
                        <button 
                            onClick={() => {
                                onClose();
                                window.dispatchEvent(new CustomEvent('navigate-auth'));
                            }}
                            className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-black rounded-2xl transition-all shadow-lg shadow-green-500/30 flex items-center justify-center gap-2 group"
                        >
                            <LogIn size={18} />
                            <span>Sign In to Apply</span>
                        </button>
                    )}
                </div>

                <div className="space-y-4">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Research Tools</p>
                    <a 
                        href={opportunity.link && opportunity.link !== '#' ? opportunity.link : `https://www.google.com/search?q=${encodeURIComponent(opportunity.title + ' ' + opportunity.provider)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 font-bold rounded-2xl border border-gray-200 dark:border-gray-700 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors text-sm shadow-sm"
                    >
                        Visit Provider Website
                        <ExternalLink size={16} />
                    </a>
                </div>
            </div>

            <div className="mt-12 text-center">
                {!user ? (
                    <p className="text-xs text-red-500 font-bold bg-red-50 dark:bg-red-900/20 p-3 rounded-xl border border-red-100 dark:border-red-900/30 flex items-center justify-center gap-2">
                        <ShieldCheck size={14} /> Authentication Required
                    </p>
                ) : isStudent ? (
                    <p className="text-xs text-gray-400 flex items-center justify-center gap-2">
                        <CheckCircle2 size={14} className="text-green-500" /> Student Profile Synced
                    </p>
                ) : (
                    <p className="text-xs text-orange-500 flex items-center justify-center gap-2">
                        <UserCheck size={14} /> Sponsor Mode Active
                    </p>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default OpportunityModal;
