import React from 'react';

interface GalleryPageProps {
  onStartCreation: () => void;
}

const GalleryPage: React.FC<GalleryPageProps> = ({ onStartCreation }) => {
  const galleryItems = [
    { src: 'https://picsum.photos/seed/gallery1/600/600', alt: 'Hund im Superhelden-Stil' },
    { src: 'https://picsum.photos/seed/gallery2/600/800', alt: 'Katze als königliches Porträt' },
    { src: 'https://picsum.photos/seed/gallery3/800/600', alt: 'Hase im galaktischen Stil' },
    { src: 'https://picsum.photos/seed/gallery4/600/600', alt: 'Meerschweinchen umgeben von Blumen' },
    { src: 'https://picsum.photos/seed/gallery5/800/600', alt: 'Hund im Street-Art-Stil' },
    { src: 'https://picsum.photos/seed/gallery6/600/800', alt: 'Katze als Buntglasfenster' },
    { src: 'https://picsum.photos/seed/gallery7/600/600', alt: 'Papagei im Pop-Surrealismus-Stil' },
    { src: 'https://picsum.photos/seed/gallery8/600/800', alt: 'Hund als Fabelwesen' },
  ];

  return (
    <div className="bg-white">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-serif font-bold">Unsere Galerie</h1>
          <p className="text-lg text-gray-600 mt-2">
            Lass dich von den Kunstwerken inspirieren, die andere Tierliebhaber erstellt haben.
          </p>
        </div>
        
        {/* Masonry-like grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {galleryItems.map((item, index) => (
            <div key={index} className="break-inside-avoid">
              <img 
                src={item.src} 
                alt={item.alt} 
                className="w-full h-auto rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              />
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <button onClick={onStartCreation} className="bg-brand-pink text-brand-black text-xl font-bold py-4 px-10 rounded-xl hover:bg-brand-aqua transition-colors duration-300 transform hover:scale-105">
            Jetzt dein eigenes Kunstwerk erstellen
          </button>
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;
