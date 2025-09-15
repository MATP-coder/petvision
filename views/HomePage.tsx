import React from 'react';
import { ART_STYLES } from '../constants';
import StyleCard from '../components/StyleCard';
import ImageComparisonSlider from '../components/ImageComparisonSlider';

interface HomePageProps {
  onStartCreation: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onStartCreation }) => {
  const featuredStyles = ART_STYLES.slice(0, 3);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative text-center py-20 px-6 bg-gray-50 overflow-hidden">
        <div className="container mx-auto relative z-10">
          <h1 className="text-4xl md:text-6xl font-serif font-extrabold text-brand-black leading-tight">
            Turn Your Pet Into <span className="text-brand-pink">Pawsitively</span> Perfect Art
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Immortalize your furry friend with a unique, AI-generated masterpiece. Just upload a photo, choose a style, and let the magic happen!
          </p>
          <button
            onClick={onStartCreation}
            className="mt-8 bg-brand-pink text-brand-black text-xl font-bold py-4 px-10 rounded-xl hover:bg-brand-aqua transition-colors duration-300 transform hover:scale-105 shadow-lg"
          >
            Create Your Masterpiece Now ❤️
          </button>
        </div>
        {/* Background blobs */}
        <div className="absolute top-0 -left-1/4 w-full h-full bg-brand-aqua/20 rounded-full blur-3xl filter opacity-50 animate-pulse"></div>
        <div className="absolute bottom-0 -right-1/4 w-full h-full bg-brand-pink/20 rounded-full blur-3xl filter opacity-50 animate-pulse animation-delay-4000"></div>
      </section>

      {/* Comparison Slider Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-black">See the Magical Transformation</h2>
          <p className="mt-2 text-lg text-gray-600">Slide to reveal the art within your pet photo.</p>
          <div className="mt-8">
            <ImageComparisonSlider
              beforeImage="https://picsum.photos/seed/cat-before/800/800"
              afterImage="https://picsum.photos/seed/cat-after/800/800"
              altBefore="A regular photo of a cat"
              altAfter="A superhero-style portrait of a cat"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-black">How It Works in 3 Easy Steps</h2>
            <div className="mt-10 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <div className="p-4">
                    <div className="text-5xl mb-3">📷</div>
                    <h3 className="text-xl font-serif font-bold">1. Upload Photo</h3>
                    <p className="text-gray-600 mt-1">Pick a photo of your pet. A clear, well-lit shot works best!</p>
                </div>
                <div className="p-4">
                    <div className="text-5xl mb-3">🎨</div>
                    <h3 className="text-xl font-serif font-bold">2. Choose Style</h3>
                    <p className="text-gray-600 mt-1">Select from dozens of unique art styles to match their personality.</p>
                </div>
                <div className="p-4">
                    <div className="text-5xl mb-3">🖼️</div>
                    <h3 className="text-xl font-serif font-bold">3. Generate &amp; Love</h3>
                    <p className="text-gray-600 mt-1">Our AI creates your art in seconds. Preview, purchase, and enjoy!</p>
                </div>
            </div>
        </div>
      </section>

       {/* Featured Styles Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-serif font-bold">Explore Popular Styles</h2>
              <p className="text-lg text-gray-600 mt-2">Get inspired by some of our community's favorite looks.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredStyles.map(style => (
                  <StyleCard key={style.id} style={style} onSelect={onStartCreation} />
              ))}
          </div>
        </div>
      </section>
      
       {/* Final CTA Section */}
      <section className="bg-brand-aqua py-16 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-black">Ready to Create a Masterpiece?</h2>
          <p className="mt-3 text-lg text-gray-800 max-w-2xl mx-auto">Your pet deserves to be a work of art. It's fast, fun, and creates a memory that lasts forever.</p>
          <button
            onClick={onStartCreation}
            className="mt-8 bg-brand-pink text-brand-black text-xl font-bold py-4 px-10 rounded-xl hover:bg-white transition-colors duration-300 transform hover:scale-105 shadow-lg"
          >
            Start Creating Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
