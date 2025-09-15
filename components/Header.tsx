import React, { useState } from 'react';
import { AppView } from '../types';

interface HeaderProps {
  onNavigate: (view: AppView) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinkClasses = "cursor-pointer text-gray-600 hover:text-brand-black font-medium transition-colors";
  const mobileNavLinkClasses = "block py-2 px-4 text-sm " + navLinkClasses;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center text-2xl font-serif font-bold text-brand-black cursor-pointer" onClick={() => onNavigate(AppView.HOME)}>
          <span>Pet</span>
          <svg className="w-6 h-6 inline-block text-brand-pink mx-0.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 11.55C9.64 9.35 6.48 8 3 8V18C6.48 18 9.64 19.35 12 21.55C14.36 19.35 17.52 18 21 18V8C17.52 8 14.36 9.35 12 11.55ZM12 4C13.1 4 14 3.1 14 2C14 0.9 13.1 0 12 0C10.9 0 10 0.9 10 2C10 3.1 10.9 4 12 4ZM7 9C8.1 9 9 8.1 9 7C9 5.9 8.1 5 7 5C5.9 5 5 5.9 5 7C5 8.1 5.9 9 7 9ZM17 9C18.1 9 19 8.1 19 7C19 5.9 18.1 5 17 5C15.9 5 15 5.9 15 7C15 8.1 15.9 9 17 9Z" />
          </svg>
          <span>Vision</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          <a onClick={() => onNavigate(AppView.HOME)} className={navLinkClasses}>Startseite</a>
          <a onClick={() => onNavigate(AppView.STYLES)} className={navLinkClasses}>Stile</a>
          <a onClick={() => onNavigate(AppView.GALLERY)} className={navLinkClasses}>Galerie</a>
          <a onClick={() => onNavigate(AppView.HOW_IT_WORKS)} className={navLinkClasses}>So funktioniert's</a>
          <a onClick={() => onNavigate(AppView.PRICING)} className={navLinkClasses}>Preise</a>
          <a onClick={() => onNavigate(AppView.FAQ)} className={navLinkClasses}>FAQ</a>
          <button
            onClick={() => onNavigate(AppView.CREATE)}
            className="bg-brand-pink text-brand-black font-bold py-2 px-4 rounded-xl hover:bg-brand-aqua transition-colors duration-300"
          >
            Gestalte deins ❤️
          </button>
        </nav>

        {/* Mobile Nav Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-brand-black focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden" onClick={() => setIsMenuOpen(false)}>
          <nav className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            <a onClick={() => onNavigate(AppView.HOME)} className={mobileNavLinkClasses}>Startseite</a>
            <a onClick={() => onNavigate(AppView.STYLES)} className={mobileNavLinkClasses}>Stile</a>
            <a onClick={() => onNavigate(AppView.GALLERY)} className={mobileNavLinkClasses}>Galerie</a>
            <a onClick={() => onNavigate(AppView.HOW_IT_WORKS)} className={mobileNavLinkClasses}>So funktioniert's</a>
            <a onClick={() => onNavigate(AppView.PRICING)} className={mobileNavLinkClasses}>Preise</a>
            <a onClick={() => onNavigate(AppView.FAQ)} className={mobileNavLinkClasses}>FAQ</a>
            <button
                onClick={() => onNavigate(AppView.CREATE)}
                className="w-full mt-2 bg-brand-pink text-brand-black font-bold py-2 px-4 rounded-xl hover:bg-brand-aqua transition-colors duration-300"
            >
                Gestalte deins ❤️
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;