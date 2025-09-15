import React from 'react';
import { AppView } from '../types';

interface FooterProps {
    onNavigate: (view: AppView) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
    return (
        <footer className="bg-gray-100 text-brand-black">
            <div className="container mx-auto py-8 px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                    <div>
                        <h3 className="text-xl font-serif font-bold mb-2 flex items-center justify-center md:justify-start">
                            <span>Pet</span>
                            <svg className="w-5 h-5 inline-block text-brand-pink mx-0.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M12 11.55C9.64 9.35 6.48 8 3 8V18C6.48 18 9.64 19.35 12 21.55C14.36 19.35 17.52 18 21 18V8C17.52 8 14.36 9.35 12 11.55ZM12 4C13.1 4 14 3.1 14 2C14 0.9 13.1 0 12 0C10.9 0 10 0.9 10 2C10 3.1 10.9 4 12 4ZM7 9C8.1 9 9 8.1 9 7C9 5.9 8.1 5 7 5C5.9 5 5 5.9 5 7C5 8.1 5.9 9 7 9ZM17 9C18.1 9 19 8.1 19 7C19 5.9 18.1 5 17 5C15.9 5 15 5.9 15 7C15 8.1 15.9 9 17 9Z" />
                            </svg>
                            <span>Vision</span>
                        </h3>
                        <p className="text-gray-600">Transforming pet photos into timeless art.</p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-2">Quick Links</h4>
                        <ul className="space-y-1">
                            <li><a onClick={() => onNavigate(AppView.HOME)} className="cursor-pointer hover:text-brand-pink transition-colors">Home</a></li>
                            <li><a onClick={() => onNavigate(AppView.STYLES)} className="cursor-pointer hover:text-brand-pink transition-colors">Styles</a></li>
                            <li><a onClick={() => onNavigate(AppView.HOW_IT_WORKS)} className="cursor-pointer hover:text-brand-pink transition-colors">How It Works</a></li>
                            <li><a onClick={() => onNavigate(AppView.PRICING)} className="cursor-pointer hover:text-brand-pink transition-colors">Pricing</a></li>
                            <li><a onClick={() => onNavigate(AppView.CREATE)} className="cursor-pointer hover:text-brand-pink transition-colors">Create Art</a></li>
                            <li><a onClick={() => onNavigate(AppView.FAQ)} className="cursor-pointer hover:text-brand-pink transition-colors">FAQ</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-2">Follow Us</h4>
                        <div className="flex space-x-4 justify-center md:justify-start">
                            {/* Placeholder icons */}
                            <a href="#" aria-label="Instagram" className="text-gray-600 hover:text-brand-pink">IG</a>
                            <a href="#" aria-label="Facebook" className="text-gray-600 hover:text-brand-pink">FB</a>
                            <a href="#" aria-label="Twitter" className="text-gray-600 hover:text-brand-pink">X</a>
                        </div>
                    </div>
                </div>
                <div className="text-center text-gray-500 mt-8 pt-4 border-t border-gray-200">
                    <p>&copy; 2024 PetVision Shop. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;