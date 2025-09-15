import React from 'react';

interface HowItWorksPageProps {
  onStartCreation: () => void;
}

const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ onStartCreation }) => {
  const steps = [
    {
      icon: '📷',
      title: '1. Upload Your Photo',
      description: "Choose your favorite pet photo. Clear, front-facing, well-lit photos give the most stunning results!",
    },
    {
      icon: '🎨',
      title: '2. Choose Your Style',
      description: "Browse our gallery of unique, artist-designed styles. From 'Royal Renaissance' to 'Galactic Glow', find the perfect match for your pet's personality.",
    },
    {
      icon: '🖼️',
      title: '3. Preview & Select',
      description: "Our AI instantly generates two unique, watermarked previews based on your chosen style. Pick the one you love the most!",
    },
    {
      icon: '💖',
      title: '4. Purchase & Enjoy',
      description: "Select a digital 'Social Pack' for instant download or a physical 'Poster Pack' to be shipped to your door. It's the perfect gift!",
    },
  ];

  return (
    <div className="bg-white">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold">Your Masterpiece in 4 Simple Steps</h1>
            <p className="text-lg text-gray-600 mt-3">Creating a unique work of art from your pet's photo is easy and fun.</p>
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
              Create Your Art Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPage;
