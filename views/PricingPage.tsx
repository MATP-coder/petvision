
import React from 'react';

interface PricingPageProps {
  onStartCreation: () => void;
}

const PricingPage: React.FC<PricingPageProps> = ({ onStartCreation }) => {
  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold">Einfache, transparente Preise</h1>
          <p className="text-lg text-gray-600 mt-3">Wähle das perfekte Paket für dein Meisterwerk.</p>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-8 max-w-4xl mx-auto">

          {/* Social Pack */}
          <div className="border border-gray-200 rounded-xl p-8 bg-white w-full md:w-1/2 flex flex-col">
            <h2 className="text-2xl font-serif font-bold text-center">Social Pack</h2>
            <img src="https://picsum.photos/seed/socialpack/400/400" alt="Vorschau Social Media Paket" className="rounded-lg my-4 w-full h-48 object-cover" />
            <p className="text-4xl font-bold text-center my-4"><span className="text-lg font-normal">€</span>3.99</p>
            <ul className="space-y-2 text-gray-700 mb-6 flex-grow">
              <li className="flex items-center"><span className="text-brand-aqua mr-2">✔</span> Hochauflösende digitale Dateien</li>
              <li className="flex items-center"><span className="text-brand-aqua mr-2">✔</span> 1x Instagram Post (Quadrat)</li>
              <li className="flex items-center"><span className="text-brand-aqua mr-2">✔</span> 1x Instagram Story (Hochformat)</li>
              <li className="flex items-center"><span className="text-brand-aqua mr-2">✔</span> Sofortiger Download</li>
              <li className="flex items-center"><span className="text-brand-aqua mr-2">✔</span> Ohne Wasserzeichen</li>
            </ul>
            <button 
              onClick={onStartCreation}
              className="w-full bg-gray-200 text-brand-black font-bold py-3 px-6 rounded-xl hover:bg-gray-300 transition-colors"
            >
              Social Pack wählen
            </button>
          </div>

          {/* Poster Pack */}
          <div className="border-2 border-brand-aqua rounded-xl p-8 bg-white w-full md:w-1/2 relative flex flex-col shadow-lg">
            <span className="absolute top-0 right-0 -mt-3 mr-4 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full">Bestseller</span>
            <h2 className="text-2xl font-serif font-bold text-center">Poster Pack</h2>
            <img src="https://picsum.photos/seed/posterpack/400/500" alt="Vorschau Poster Paket" className="rounded-lg my-4 w-full h-48 object-cover" />
            <p className="text-4xl font-bold text-center my-4">ab <span className="text-lg font-normal">€</span>19.99</p>
            <ul className="space-y-2 text-gray-700 mb-6 flex-grow">
              <li className="flex items-center font-bold text-brand-black"><span className="text-brand-aqua mr-2">✔</span> Alles aus dem Social Pack, plus:</li>
              <li className="flex items-center"><span className="text-brand-aqua mr-2">✔</span> Physisches mattes Poster</li>
              <li className="flex items-center"><span className="text-brand-aqua mr-2">✔</span> Hochwertiger 50x70 cm Druck</li>
              <li className="flex items-center"><span className="text-brand-aqua mr-2">✔</span> 300 DPI digitale Datei zum Drucken</li>
               <li className="flex items-center"><span className="text-brand-aqua mr-2">✔</span> Weltweiter Versand</li>
            </ul>
            <button 
              onClick={onStartCreation}
              className="w-full bg-brand-pink text-brand-black font-bold py-3 px-6 rounded-xl hover:bg-brand-aqua transition-colors"
            >
              Poster Pack wählen
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PricingPage;