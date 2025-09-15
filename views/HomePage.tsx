import React from 'react';
import { AppView } from '../types';
import ImageComparisonSlider from '../components/ImageComparisonSlider';

interface HomePageProps {
  onStartCreation: () => void;
  onNavigate: (view: AppView) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onStartCreation, onNavigate }) => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16 md:py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight">
          Verwandle dein Haustier <br /> in ein <span className="text-brand-pink">unvergessliches Kunstwerk</span>
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          Lade ein Foto hoch, wähle einen Kunststil und lass unsere KI Magie wirken. Erstelle in wenigen Minuten ein einzigartiges Porträt, das die Persönlichkeit deines Lieblings einfängt.
        </p>
        <button
          onClick={onStartCreation}
          className="mt-8 bg-brand-pink text-brand-black text-xl font-bold py-4 px-10 rounded-xl hover:bg-brand-aqua transition-colors duration-300 transform hover:scale-105"
        >
          Jetzt dein Kunstwerk erstellen
        </button>
      </div>

      {/* Image Comparison Section */}
      <div className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-serif font-bold">Vom Foto zum Meisterwerk</h2>
            <p className="text-lg text-gray-600 mt-2">Sieh die unglaubliche Verwandlung mit eigenen Augen.</p>
          </div>
          <ImageComparisonSlider
            beforeImage="https://picsum.photos/seed/petphoto/800/800"
            afterImage="https://picsum.photos/seed/superhero/800/800"
            altBefore="Originales Haustierfoto"
            altAfter="Generiertes Kunstwerk"
          />
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-6">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-serif font-bold">Warum PetVision?</h2>
                <p className="text-lg text-gray-600 mt-2">Wir verbinden Technologie mit Liebe zum Detail.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 text-center max-w-5xl mx-auto">
                <div className="p-4">
                    <div className="text-5xl mb-4">🚀</div>
                    <h3 className="text-xl font-serif font-bold mb-2">In Sekunden fertig</h3>
                    <p className="text-gray-600">Erhalte deine KI-generierte Vorschau in weniger als einer Minute.</p>
                </div>
                <div className="p-4">
                    <div className="text-5xl mb-4">🖼️</div>
                    <h3 className="text-xl font-serif font-bold mb-2">Wandfertige Kunstwerke</h3>
                    <p className="text-gray-600">Von digitalen Dateien bis hin zu hochwertigen Postern für dein Zuhause.</p>
                </div>
                <div className="p-4">
                    <div className="text-5xl mb-4">🎁</div>
                    <h3 className="text-xl font-serif font-bold mb-2">Das perfekte Geschenk</h3>
                    <p className="text-gray-600">Überrasche einen Tierliebhaber mit einem einzigartigen und persönlichen Geschenk.</p>
                </div>
            </div>
        </div>
      </div>

      {/* Gallery Preview Section */}
      <div className="bg-gray-50 py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-serif font-bold">Lass dich inspirieren</h2>
            <p className="text-lg text-gray-600 mt-2">Sieh, was andere mit ihren tierischen Freunden erstellt haben.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <img src="https://picsum.photos/seed/gallery1/600/600" alt="Galeriebeispiel 1" className="rounded-lg shadow-md aspect-square object-cover" />
            <img src="https://picsum.photos/seed/gallery2/600/800" alt="Galeriebeispiel 2" className="rounded-lg shadow-md aspect-square object-cover" />
            <img src="https://picsum.photos/seed/gallery3/800/600" alt="Galeriebeispiel 3" className="rounded-lg shadow-md aspect-square object-cover" />
            <img src="https://picsum.photos/seed/gallery4/600/600" alt="Galeriebeispiel 4" className="rounded-lg shadow-md aspect-square object-cover" />
          </div>
          <div className="text-center mt-12">
            <button
              onClick={() => onNavigate(AppView.GALLERY)}
              className="bg-white text-brand-black text-lg font-bold py-3 px-8 rounded-xl border border-gray-300 hover:bg-gray-100 transition-colors duration-300"
            >
              Zur vollständigen Galerie
            </button>
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="bg-brand-pink">
          <div className="container mx-auto px-6 py-16 text-center">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-black">Bereit, dein Meisterwerk zu schaffen?</h2>
              <p className="mt-4 text-lg text-brand-black max-w-2xl mx-auto">Dein tierischer Begleiter wartet darauf, verewigt zu werden. Der Prozess ist einfach, schnell und macht Spaß!</p>
              <button
                onClick={onStartCreation}
                className="mt-8 bg-white text-brand-black text-xl font-bold py-4 px-10 rounded-xl hover:bg-brand-aqua transition-colors duration-300 transform hover:scale-105"
              >
                Jetzt starten
              </button>
          </div>
      </div>
      
    </div>
  );
};

export default HomePage;