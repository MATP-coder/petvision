import React from 'react';
import { AppView } from '../types';

interface FooterProps {
  onNavigate: (view: AppView) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const navLinkClasses = "cursor-pointer text-gray-400 hover:text-white transition-colors";

  return (
    <footer className="bg-brand-black text-white">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center text-2xl font-serif font-bold cursor-pointer" onClick={() => onNavigate(AppView.HOME)}>
              <span>Pet</span>
              <svg className="w-6 h-6 inline-block text-brand-pink mx-0.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 11.55C9.64 9.35 6.48 8 3 8V18C6.48 18 9.64 19.35 12 21.55C14.36 19.35 17.52 18 21 18V8C17.52 8 14.36 9.35 12 11.55ZM12 4C13.1 4 14 3.1 14 2C14 0.9 13.1 0 12 0C10.9 0 10 0.9 10 2C10 3.1 10.9 4 12 4ZM7 9C8.1 9 9 8.1 9 7C9 5.9 8.1 5 7 5C5.9 5 5 5.9 5 7C5 8.1 5.9 9 7 9ZM17 9C18.1 9 19 8.1 19 7C19 5.9 18.1 5 17 5C15.9 5 15 5.9 15 7C15 8.1 15.9 9 17 9Z" />
              </svg>
              <span>Vision</span>
            </div>
            <p className="text-gray-400 mt-2">Dein Haustier als einzigartiges Kunstwerk.</p>
          </div>
          <nav className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2">
            <a onClick={() => onNavigate(AppView.STYLES)} className={navLinkClasses}>Stile</a>
            <a onClick={() => onNavigate(AppView.HOW_IT_WORKS)} className={navLinkClasses}>So funktioniert's</a>
            <a onClick={() => onNavigate(AppView.PRICING)} className={navLinkClasses}>Preise</a>
            <a onClick={() => onNavigate(AppView.FAQ)} className={navLinkClasses}>FAQ</a>
          </nav>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} PetVision. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
