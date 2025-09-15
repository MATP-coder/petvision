import React from 'react';
import { ART_STYLES } from '../constants';
import StyleCard from '../components/StyleCard';

interface StylesPageProps {
  onStartCreation: () => void;
}

const StylesPage: React.FC<StylesPageProps> = ({ onStartCreation }) => {
  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-10">
            <h1 className="text-4xl font-serif font-bold">Entdecke unsere Kunststile</h1>
            <p className="text-lg text-gray-600 mt-2">Finde den perfekten Look für dein geliebtes Haustier. Klicke auf einen Stil, um zu beginnen!</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {ART_STYLES.map(style => (
                <StyleCard key={style.id} style={style} onSelect={onStartCreation} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default StylesPage;