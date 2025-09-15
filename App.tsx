import React, { useState } from 'react';
import { AppView } from './types';

import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './views/HomePage';
import StylesPage from './views/StylesPage';
import GalleryPage from './views/GalleryPage';
import FaqPage from './views/FaqPage';
import HowItWorksPage from './views/HowItWorksPage';
import CreationFlow from './components/CreationFlow';
import PricingPage from './views/PricingPage';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.HOME);
  
  const handleNavigation = (targetView: AppView) => {
    setView(targetView);
    window.scrollTo(0, 0);
  }

  const renderContent = () => {
    switch (view) {
      case AppView.STYLES:
        return <StylesPage onStartCreation={() => handleNavigation(AppView.CREATE)} />;
      case AppView.GALLERY:
        return <GalleryPage onStartCreation={() => handleNavigation(AppView.CREATE)} />;
      case AppView.HOW_IT_WORKS:
        return <HowItWorksPage onStartCreation={() => handleNavigation(AppView.CREATE)} />;
      case AppView.PRICING:
        return <PricingPage onStartCreation={() => handleNavigation(AppView.CREATE)} />;
      case AppView.FAQ:
        return <FaqPage />;
      case AppView.CREATE:
        return <CreationFlow />;
      case AppView.HOME:
      default:
        return <HomePage onStartCreation={() => handleNavigation(AppView.CREATE)} onNavigate={handleNavigation} />;
    }
  };

  return (
    <div className="bg-white min-h-screen font-sans text-brand-black flex flex-col">
      <Header onNavigate={handleNavigation} />
      <main className="flex-grow">
        {renderContent()}
      </main>
      <Footer onNavigate={handleNavigation} />
    </div>
  );
};

export default App;