import React, { useState } from 'react';

const FaqItem = ({ q, a, isOpen, onClick }: { q: string; a: string, isOpen: boolean, onClick: () => void }) => {
    return (
        <div className="border-b">
            <button
                onClick={onClick}
                className="w-full flex justify-between items-center text-left py-4 font-semibold text-lg"
                aria-expanded={isOpen}
            >
                <span>{q}</span>
                <span className="text-2xl">{isOpen ? '−' : '+'}</span>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
                <div className="pb-4 text-gray-700">
                    <p>{a}</p>
                </div>
            </div>
        </div>
    );
};


const FaqPage: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs = [
        { q: "What kind of photos work best?", a: "For the best results, please use a clear, bright, high-resolution photo where your pet is facing forward. Good lighting makes a huge difference!" },
        { q: "How long does poster shipping take?", a: "Poster printing and processing takes 2-3 business days. Shipping usually takes an additional 5-7 business days, depending on your location. You will receive a tracking number via email." },
        { q: "What is included in the Social Pack?", a: "The Social Pack includes two high-resolution digital files, perfect for sharing online: one square image for Instagram posts and one vertical image for Stories. You can download them instantly after purchase." },
        { q: "What happens to my uploaded photo?", a: "Your privacy is important to us. Your uploaded photo is used only to generate the artwork and is automatically and permanently deleted from our servers after 7 days." },
        { q: "What is your satisfaction guarantee?", a: "We want you to love your pet's portrait. If there's a quality issue with the print, please contact us within 14 days with a photo of the problem, and we will arrange for a reprint." }
    ];

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    }

    return (
        <div className="container mx-auto px-6 py-12">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-serif font-bold">Frequently Asked Questions</h1>
                <p className="text-lg text-gray-600 mt-2">Have questions? We have answers!</p>
            </div>
            <div className="max-w-3xl mx-auto">
                {faqs.map((faq, index) => (
                    <FaqItem 
                        key={index} 
                        q={faq.q} 
                        a={faq.a}
                        isOpen={openIndex === index}
                        onClick={() => handleToggle(index)} 
                    />
                ))}
            </div>
        </div>
    );
};

export default FaqPage;
