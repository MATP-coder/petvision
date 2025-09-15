import React from 'react';
import type { ArtStyle } from '../types';

interface StyleCardProps {
  style: ArtStyle;
  onSelect: (style: ArtStyle) => void;
}

const StyleCard: React.FC<StyleCardProps> = ({ style, onSelect }) => {
  return (
    <div 
      className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform hover:-translate-y-2 transition-transform duration-300 group"
      onClick={() => onSelect(style)}
    >
      <img src={style.image} alt={style.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-serif font-bold text-brand-black">{style.title}</h3>
        <p className="text-sm text-gray-600 mt-1">{style.tagline}</p>
      </div>
      <div className="bg-brand-pink text-center py-2 font-bold text-brand-black group-hover:bg-brand-aqua transition-colors duration-300">
        Stil wählen
      </div>
    </div>
  );
};

export default StyleCard;