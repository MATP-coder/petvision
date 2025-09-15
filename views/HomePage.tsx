import React from 'react';
import { AppView } from '../types';
import { ART_STYLES } from '../constants';
import ImageComparisonSlider from '../components/ImageComparisonSlider';
import StyleCard from '../components/StyleCard';

interface HomePageProps {
  onStartCreation: () => void;
  onNavigate: (view: AppView) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onStartCreation, onNavigate }) => {
  const featuredStyles = ART_STYLES.slice(0, 3); // Show first 3 styles

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gray-50">
        <div className="container mx-auto px-6 py-12 lg:py-20 flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0 lg:pr-12">
            <h1 className="text-4xl md:text-6xl font-serif font-extrabold text-brand-black leading-tight">
              Verwandle dein Haustier <span className="text-brand-pink">in ein Kunstwerk</span>
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto lg:mx-0">
              Erstelle mit der Kraft der KI in Sekundenschnelle einzigartige, personalisierte Porträts deines geliebten Vierbeiners. Wähle einen Stil und sieh die Magie!
            </p>
            <button
              onClick={onStartCreation}
              className="mt-8 bg-brand-pink text-brand-black text-xl font-bold py-4 px-10 rounded-xl hover:bg-brand-aqua transition-colors duration-300 transform hover:scale-105"
            >
              Gestalte deins ❤️
            </button>
          </div>
          <div className="lg:w-1/2">
            <ImageComparisonSlider
              beforeImage="https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=800&h=800&auto=format&fit=crop"
              afterImage="https://images.unsplash.com/photo-1599819122021-f6f799a45ad1?q=80&w=800&h=800&auto=format&fit=crop"
              altBefore="Normales Foto eines Hundes"
              altAfter="KI-generiertes Kunstwerk eines Hundes als Superheld"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold">In 3 einfachen Schritten zum Meisterwerk</h2>
          <p className="text-lg text-gray-600 mt-2">So einfach geht's.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-5xl mx-auto">
          <div className="flex flex-col items-center">
            <div className="text-5xl mb-4">📷</div>
            <h3 className="text-xl font-serif font-bold mb-2">1. Foto hochladen</h3>
            <p className="text-gray-600">Wähle das beste Foto deines Haustiers.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-5xl mb-4">🎨</div>
            <h3 className="text-xl font-serif font-bold mb-2">2. Stil wählen</h3>
            <p className="text-gray-600">Suche dir einen unserer einzigartigen Stile aus.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-5xl mb-4">🖼️</div>
            <h3 className="text-xl font-serif font-bold mb-2">3. Kunstwerk erhalten</h3>
            <p className="text-gray-600">Erhalte dein Kunstwerk und teile es mit der Welt.</p>
          </div>
        </div>
         <div className="text-center mt-12">
            <a onClick={() => onNavigate(AppView.HOW_IT_WORKS)} className="text-brand-pink font-semibold hover:text-brand-aqua cursor-pointer">
              Erfahre mehr über den Prozess &rarr;
            </a>
        </div>
      </section>
      
      {/* Featured Styles Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold">Beliebte Kunststile</h2>
            <p className="text-lg text-gray-600 mt-2">Werde zum Superhelden, zur Majestät oder zum Weltraum-Entdecker.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredStyles.map(style => (
              <StyleCard key={style.id} style={style} onSelect={() => onNavigate(AppView.CREATE)} />
            ))}
          </div>
          <div className="text-center mt-12">
            <a onClick={() => onNavigate(AppView.STYLES)} className="bg-white border-2 border-brand-black text-brand-black font-bold py-3 px-8 rounded-xl hover:bg-gray-100 transition-colors">
              Alle Stile ansehen
            </a>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-serif font-bold">Bereit, dein Haustier zu verewigen?</h2>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Dein einzigartiges Kunstwerk ist nur wenige Klicks entfernt. Erstelle ein unvergessliches Andenken oder das perfekte Geschenk.
        </p>
        <button
          onClick={onStartCreation}
          className="mt-8 bg-brand-pink text-brand-black text-xl font-bold py-4 px-10 rounded-xl hover:bg-brand-aqua transition-colors duration-300 transform hover:scale-105"
        >
          Jetzt loslegen!
        </button>
      </section>
    </div>
  );
};

export default HomePage;