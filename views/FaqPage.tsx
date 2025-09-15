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
        { q: "Welche Art von Fotos funktionieren am besten?", a: "Für die besten Ergebnisse verwende bitte ein klares, helles und hochauflösendes Foto, auf dem dein Haustier nach vorne schaut. Gute Beleuchtung macht einen riesigen Unterschied!" },
        { q: "Wie lange dauert der Versand?", a: "Der Druck und die Bearbeitung dauern 2-3 Werktage. Der Versand dauert in der Regel zusätzlich 5-7 Werktage, abhängig von deinem Standort. Du erhältst eine Sendungsverfolgungsnummer per E-Mail." },
        { q: "Was ist im Social Pack enthalten?", a: "Das Social Pack enthält die zwei einzigartigen, hochauflösenden KI-Kunstwerke, die für dich generiert wurden. Sie sind quadratisch und eignen sich perfekt für Instagram, Facebook und andere soziale Netzwerke. Du kannst sie sofort nach dem Kauf herunterladen." },
        { q: "Was passiert mit meinem hochgeladenen Foto?", a: "Deine Privatsphäre ist uns wichtig. Dein hochgeladenes Foto wird nur zur Erstellung des Kunstwerks verwendet und nach 7 Tagen automatisch und dauerhaft von unseren Servern gelöscht." },
        { q: "Was ist eure Zufriedenheitsgarantie?", a: "Wir möchten, dass du das Porträt deines Haustieres liebst. Wenn es ein Qualitätsproblem mit dem Druck gibt, kontaktiere uns bitte innerhalb von 14 Tagen mit einem Foto des Problems, und wir werden einen Neudruck veranlassen." }
    ];

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    }

    return (
        <div className="container mx-auto px-6 py-12">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-serif font-bold">Häufig gestellte Fragen</h1>
                <p className="text-lg text-gray-600 mt-2">Fragen? Wir haben die Antworten!</p>
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