import React from 'react';

interface GalleryPageProps {
  onStartCreation: () => void;
}

const GalleryPage: React.FC<GalleryPageProps> = ({ onStartCreation }) => {
  const galleryItems = [
    { src: 'https://images.unsplash.com/photo-1599819122021-f6f799a45ad1?q=80&w=600&h=600&auto=format&fit=crop', alt: 'Hund im Superhelden-Stil' },
    { src: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=600&h=800&auto=format&fit=crop', alt: 'Katze als königliches Porträt' },
    { src: 'https://images.unsplash.com/photo-1596815339233-5e95a1f99158?q=80&w=800&h=600&auto=format&fit=crop', alt: 'Katze im galaktischen Stil' },
    { src: 'https://images.unsplash.com/photo-1559591443-158a430635b7?q=80&w=600&h=600&auto=format&fit=crop', alt: 'Hund umgeben von Blumen' },
    { src: 'https://images.unsplash.com/photo-1593382515288-5a8155e40a4b?q=80&w=800&h=600&auto=format&fit=crop', alt: 'Hund im Street-Art-Stil' },
    { src: 'https://images.unsplash.com/photo-1593435715438-a81d11369a12?q=80&w=600&h=800&auto=format&fit=crop', alt: 'Katze als Buntglasfenster' },
    { src: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=600&h=600&auto=format&fit=crop', alt: 'Katze im Pop-Surrealismus-Stil' },
    { src: 'https://images.unsplash.com/photo-1615751072497-5f5169225a1f?q=80&w=600&h=800&auto=format&fit=crop', alt: 'Hund als Fabelwesen' },
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