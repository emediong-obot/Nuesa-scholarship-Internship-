
import React from 'react';
import { Opportunity } from '../types';
import { Calendar, MapPin, ExternalLink, Clock, ChevronRight } from 'lucide-react';

interface FeaturedCardProps {
  opportunity: Opportunity;
  colorTheme: 'orange' | 'green';
  onClick?: (opportunity: Opportunity) => void;
}

const FeaturedCard: React.FC<FeaturedCardProps> = ({ opportunity, colorTheme, onClick }) => {
  const isGreen = colorTheme === 'green';
  const accentClass = isGreen ? 'text-green-600' : 'text-orange-500';
  const bgClass = isGreen ? 'bg-green-600' : 'bg-orange-500';

  return (
    <div 
      onClick={() => onClick?.(opportunity)}
      className="flex flex-col bg-white dark:bg-gray-800 rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden h-full group cursor-pointer"
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={opportunity.image || 'https://images.unsplash.com/photo-1523240715632-d984bb4bc95f?auto=format&fit=crop&q=80&w=600'} 
          alt={opportunity.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3">
             <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase text-white shadow-lg ${bgClass}`}>
                {opportunity.provider}
             </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
            <span className="text-white text-xs font-bold flex items-center gap-1">
                <MapPin size={12} /> {opportunity.location || 'Global'}
            </span>
            <div className="bg-white/20 backdrop-blur-md px-2 py-1 rounded-lg border border-white/20 text-[10px] text-white font-bold uppercase">
                {opportunity.tags?.[0] || 'Exclusive'}
            </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3 leading-tight line-clamp-2 group-hover:text-orange-500 transition-colors">
          {opportunity.title}
        </h3>
        
        <div className="flex flex-wrap gap-4 text-xs text-gray-500 dark:text-gray-400 mb-4 font-medium">
             {opportunity.deadline && (
                <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-gray-900 px-2 py-1 rounded-md">
                    <Clock size={12} className={accentClass} />
                    <span>Closes: {new Date(opportunity.deadline).toLocaleDateString()}</span>
                </div>
             )}
             {opportunity.amount && (
                 <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-gray-900 px-2 py-1 rounded-md">
                    <span className={accentClass}>●</span>
                    <span>{opportunity.amount}</span>
                </div>
             )}
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 line-clamp-3 leading-relaxed">
            {opportunity.description}
        </p>

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50 dark:border-gray-700">
            <span className={`text-xs font-bold uppercase tracking-wider ${accentClass}`}>View Details</span>
            <div className={`p-2 rounded-xl bg-gray-100 dark:bg-gray-700 group-hover:${bgClass} group-hover:text-white transition-all`}>
                <ChevronRight size={18} />
            </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCard;
