
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">

          {/* Social Pack */}
          <div className="border border-gray-200 rounded-xl p-8 bg-white w-full flex flex-col h-full">
            <h2 className="text-2xl font-serif font-bold text-center">Social Pack</h2>
            <img src="https://images.unsplash.com/photo-1620755995893-b6058a593383?q=80&w=400&h=400&auto=format&fit=crop" alt="Vorschau Social Media Paket" className="rounded-lg my-4 w-full h-48 object-cover" />
            <p className="text-4xl font-bold text-center my-4"><span className="text-lg font-normal">€</span>3.99</p>
            <ul className="space-y-2 text-gray-700 mb-6 flex-grow">
              <li className="flex items-center"><span className="text-brand-aqua mr-2">✔</span> <strong>Zwei</strong> hochauflösende digitale Kunstwerke</li>
              <li className="flex items-center"><span className="text-brand-aqua mr-2">✔</span> Perfekt für Instagram, Facebook & Co.</li>
              <li className="flex items-center"><span className="text-brand-aqua mr-2">✔</span> Sofortiger Download</li>
              <li className="flex items-center"><span className="text-brand-aqua mr-2">✔</span> Ohne Wasserzeichen</li>
            </ul>
            <button 
              onClick={onStartCreation}
              className="w-full bg-gray-200 text-brand-black font-bold py-3 px-6 rounded-xl hover:bg-gray-300 transition-colors"
            >
              Jetzt erstellen
            </button>
          </div>

          {/* Poster Pack */}
          <div className="border-2 border-brand-aqua rounded-xl p-8 bg-white w-full relative flex flex-col shadow-lg h-full">
            <span className="absolute top-0 right-0 -mt-3 mr-4 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full">Bestseller</span>
            <h2 className="text-2xl font-serif font-bold text-center">Poster Pack</h2>
            <img src="https://images.unsplash.com/photo-1618235219273-e380517565c8?q=80&w=400&h=400&auto=format&fit=crop" alt="Vorschau Poster Paket" className="rounded-lg my-4 w-full h-48 object-cover" />
            <p className="text-4xl font-bold text-center my-4"><span className="text-lg font-normal">€</span>9.99</p>
            <ul className="space-y-2 text-gray-700 mb-6 flex-grow">
              <li className="flex items-center font-bold text-brand-black"><span className="text-brand-aqua mr-2">✔</span> Alles aus dem Social Pack, plus:</li>
              <li className="flex items-center"><span className="text-brand-aqua mr-2">✔</span> Physisches Poster in Museumsqualität</li>
              <li className="flex items-center"><span className="text-brand-aqua mr-2">✔</span> Größe: 50x70 cm, mattes Premiumpapier</li>
              <li className="flex items-center"><span className="text-brand-aqua mr-2">✔</span> Perfekt zum Einrahmen</li>
               <li className="flex items-center"><span className="text-brand-aqua mr-2">✔</span> Weltweiter Versand</li>
            </ul>
            <button 
              onClick={onStartCreation}
              className="w-full bg-brand-pink text-brand-black font-bold py-3 px-6 rounded-xl hover:bg-brand-aqua transition-colors"
            >
              Jetzt erstellen
            </button>
          </div>
          
          {/* Canvas Pack */}
          <div className="border border-gray-200 rounded-xl p-8 bg-white w-full flex flex-col h-full">
            <h2 className="text-2xl font-serif font-bold text-center">Leinwand Pack</h2>
            <img src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=400&h=400&auto=format&fit=crop" alt="Vorschau Leinwand Paket" className="rounded-lg my-4 w-full h-48 object-cover" />
            <p className="text-4xl font-bold text-center my-4"><span className="text-lg font-normal">€</span>29.99</p>
            <ul className="space-y-2 text-gray-700 mb-6 flex-grow">
                <li className="flex items-center font-bold text-brand-black"><span className="text-brand-aqua mr-2">✔</span> Alles aus dem Social Pack, plus:</li>
                <li className="flex items-center"><span className="text-brand-aqua mr-2">✔</span> Edle Künstler-Leinwand</li>
                <li className="flex items-center"><span className="text-brand-aqua mr-2">✔</span> Aufgespannt auf Holz-Keilrahmen</li>
                <li className="flex items-center"><span className="text-brand-aqua mr-2">✔</span> Bereit zum Aufhängen</li>
                <li className="flex items-center"><span className="text-brand-aqua mr-2">✔</span> Weltweiter Versand</li>
            </ul>
            <button 
              onClick={onStartCreation}
              className="w-full bg-gray-200 text-brand-black font-bold py-3 px-6 rounded-xl hover:bg-gray-300 transition-colors"
            >
              Jetzt erstellen
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PricingPage;