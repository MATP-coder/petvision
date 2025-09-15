import React from 'react';

interface HowItWorksPageProps {
  onStartCreation: () => void;
}

const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ onStartCreation }) => {
  const steps = [
    {
      icon: '📷',
      title: '1. Lade dein Foto hoch',
      description: "Wähle dein Lieblingsfoto deines Haustieres. Klare, von vorne aufgenommene und gut beleuchtete Fotos liefern die beeindruckendsten Ergebnisse!",
    },
    {
      icon: '🎨',
      title: '2. Wähle deinen Stil',
      description: "Durchstöbere unsere Galerie einzigartiger, von Künstlern entworfener Stile. Von 'Königlicher Renaissance' bis 'Galaktischer Glanz' – finde den perfekten Look für die Persönlichkeit deines Haustieres.",
    },
    {
      icon: '🖼️',
      title: '3. Vorschau & Auswahl',
      description: "Unsere KI generiert sofort zwei einzigartige Vorschauen mit Wasserzeichen basierend auf dem von dir gewählten Stil. Wähle die, die du am meisten liebst!",
    },
    {
      icon: '💖',
      title: '4. Kaufen & Genießen',
      description: "Wähle ein digitales 'Social Pack' zum sofortigen Download oder ein physisches 'Poster Pack', das zu dir nach Hause geschickt wird. Es ist das perfekte Geschenk!",
    },
  ];

  return (
    <div className="bg-white">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold">Dein Meisterwerk in 4 einfachen Schritten</h1>
            <p className="text-lg text-gray-600 mt-3">Ein einzigartiges Kunstwerk aus dem Foto deines Haustieres zu erstellen ist einfach und macht Spaß.</p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-12">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="text-5xl flex-shrink-0">{step.icon}</div>
                <div>
                  <h3 className="text-2xl font-serif font-bold mb-1">{step.title}</h3>
                  <p className="text-gray-700">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-16">
          <button onClick={onStartCreation} className="bg-brand-pink text-brand-black text-xl font-bold py-4 px-10 rounded-xl hover:bg-brand-aqua transition-colors duration-300 transform hover:scale-105">
              Erstelle jetzt deine Kunst
          </button>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPage;