import React, { useState, useEffect, useCallback } from 'react';
import { CreationStep, ArtStyle, ImageAnalysisResult } from '../types';
import { ART_STYLES } from '../constants';
import { analyzeImageQuality, generatePetArt } from '../services/geminiService';

// Import child components
import ProgressBar from './ProgressBar';
import StyleCard from './StyleCard';
import LoadingSpinner from './LoadingSpinner';
import CameraCapture from './CameraCapture';

// Define a type for the uploaded file state
interface UploadedFile {
  file: File;
  base64: string; // The raw base64 string
  url: string;    // Object URL for preview
  mimeType: string;
}

const CreationFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<CreationStep>(CreationStep.UPLOAD);
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [imageAnalysis, setImageAnalysis] = useState<ImageAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  const [selectedStyle, setSelectedStyle] = useState<ArtStyle | null>(null);
  const [customPrompt, setCustomPrompt] = useState('');
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationError, setGenerationError] = useState<string | null>(null);
  
  const [selectedPreview, setSelectedPreview] = useState<string | null>(null);
  const [otherPreview, setOtherPreview] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState<boolean>(false);

  // --- Purchase State ---
  const [purchaseTab, setPurchaseTab] = useState<'digital' | 'physical'>('physical');
  const [selectedPhysical, setSelectedPhysical] = useState<'poster' | 'canvas'>('poster');
  const [upsellSocial, setUpsellSocial] = useState(false);
  const [upsellPoster, setUpsellPoster] = useState(false);
  const [upsellCanvas, setUpsellCanvas] = useState(false);
  const [purchasedProduct, setPurchasedProduct] = useState('');

  // --- Preview Limiting State ---
  const [remainingPreviews, setRemainingPreviews] = useState(3);

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    const storedData = localStorage.getItem('petVisionPreviews');
    if (storedData) {
      const { date, count } = JSON.parse(storedData);
      if (date === today) {
        setRemainingPreviews(3 - count);
      } else {
        localStorage.setItem('petVisionPreviews', JSON.stringify({ date: today, count: 0 }));
      }
    } else {
      localStorage.setItem('petVisionPreviews', JSON.stringify({ date: today, count: 0 }));
    }
  }, []);

  const usePreview = () => {
    const today = new Date().toISOString().slice(0, 10);
    const storedData = localStorage.getItem('petVisionPreviews') || JSON.stringify({ date: today, count: 0 });
    const { date, count } = JSON.parse(storedData);

    if (date === today) {
      if (count < 3) {
        const newCount = count + 1;
        setRemainingPreviews(3 - newCount);
        localStorage.setItem('petVisionPreviews', JSON.stringify({ date, count: newCount }));
        return true;
      }
      return false;
    } else {
      // New day
      setRemainingPreviews(2);
      localStorage.setItem('petVisionPreviews', JSON.stringify({ date: today, count: 1 }));
      return true;
    }
  };


  // File handling and analysis
  const handleFileChange = async (file: File | null) => {
    if (!file) return;

    if (file.size > 4 * 1024 * 1024) { // 4MB limit for inline data
        setAnalysisError("Die Datei ist zu groß. Bitte wähle ein Bild unter 4MB.");
        return;
    }
    
    setAnalysisError(null);
    setImageAnalysis(null);

    const reader = new FileReader();
    reader.onload = (e) => {
        const result = e.target?.result as string;

        // Create an Image object to check dimensions before AI analysis
        const img = new Image();
        img.onload = async () => {
             // RELAXED CHECK: Reject only if BOTH dimensions are too small.
             if (img.width < 512 && img.height < 512) {
                setAnalysisError(`Das Bild ist zu klein (${img.width}x${img.height}px). Bitte verwende ein Foto, bei dem mindestens eine Seite 512 Pixel groß ist.`);
                setUploadedFile({
                    file,
                    base64: result.split(',')[1],
                    url: URL.createObjectURL(file),
                    mimeType: file.type,
                });
                 // Set a specific analysis result to disable the next step button
                setImageAnalysis({ isSuitable: false, feedback: `Das Bild ist zu klein (${img.width}x${img.height}px).` });
                return;
            }

            // If local check passes, proceed with AI analysis
            const base64 = result.split(',')[1];
            const mimeType = file.type;

            setUploadedFile({
                file,
                base64,
                url: URL.createObjectURL(file),
                mimeType,
            });

            setIsAnalyzing(true);
            try {
                const analysis = await analyzeImageQuality(base64, mimeType);
                setImageAnalysis(analysis);
            } catch (error) {
                console.error(error);
                setAnalysisError("Bei der Bildanalyse ist ein Fehler aufgetreten.");
            } finally {
                setIsAnalyzing(false);
            }
        };
        img.onerror = () => {
            setAnalysisError("Das Bildformat konnte nicht analysiert werden.");
        };
        img.src = result;
    };
    reader.onerror = () => {
        setAnalysisError("Die Datei konnte nicht gelesen werden.");
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
      e.preventDefault();
  };
  
  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
      e.preventDefault();
      const files = e.dataTransfer.files;
      if (files && files.length > 0) {
          handleFileChange(files[0]);
      }
  };
  
  const generateArt = async (prompts: string[]) => {
    if (!uploadedFile || remainingPreviews <= 0) return;

    if (!usePreview()) {
      alert("Du hast dein Limit für kostenlose Vorschauen für heute erreicht.");
      return;
    }

    setCurrentStep(CreationStep.PREVIEW);
    setIsGenerating(true);
    setGenerationError(null);
    setGeneratedImages([]);

    try {
      const results: string[] = [];
      // Generate images sequentially to prevent potential race conditions or API limits.
      for (const prompt of prompts.slice(0, 2)) {
        const imageResult = await generatePetArt(
          uploadedFile.base64,
          uploadedFile.mimeType,
          prompt
        );
        results.push(imageResult);
      }
      setGeneratedImages(results);
    } catch (error) {
      console.error(error);
      setGenerationError(
        "Leider ist bei der Erstellung deines Kunstwerks ein Fehler aufgetreten. Bitte versuche es erneut."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  // Style selection and art generation
  const handleStyleSelect = (style: ArtStyle) => {
    setSelectedStyle(style);
    setCustomPrompt('');
    generateArt(style.prompts);
  };

  const handleCustomPromptSubmit = () => {
    if (!customPrompt.trim()) {
        alert("Bitte beschreibe deinen gewünschten Stil.");
        return;
    }
    setSelectedStyle(null); // Clear selected style
    // Create two variations of the custom prompt
    const prompts = [
        `Ein detailliertes, künstlerisches Porträt eines Haustieres im Stil von: ${customPrompt}`,
        `Eine kreative, alternative Interpretation eines Haustieres im Stil von: ${customPrompt}`
    ];
    generateArt(prompts);
  }

  const handlePreviewSelect = (imageBase64: string, otherImageBase64: string) => {
    setSelectedPreview(imageBase64);
    setOtherPreview(otherImageBase64);
    setCurrentStep(CreationStep.PURCHASE);
  };
  
  const handlePurchase = () => {
    let productDescription = '';
    if (purchaseTab === 'digital') {
        productDescription = 'Social Pack';
    } else {
        if(selectedPhysical === 'poster') productDescription = 'Poster Pack';
        if(selectedPhysical === 'canvas') productDescription = 'Leinwand Pack';
    }
    setPurchasedProduct(productDescription);
    setCurrentStep(CreationStep.CONFIRMATION);
  }

  const resetFlow = () => {
    setCurrentStep(CreationStep.UPLOAD);
    setUploadedFile(null);
    setImageAnalysis(null);
    setIsAnalyzing(false);
    setAnalysisError(null);
    setSelectedStyle(null);
    setGeneratedImages([]);
    setIsGenerating(false);
    setGenerationError(null);
    setSelectedPreview(null);
    setOtherPreview(null);
    setCustomPrompt('');

    // Reset purchase state
    setPurchaseTab('physical');
    setSelectedPhysical('poster');
    setUpsellSocial(false);
    setUpsellPoster(false);
    setUpsellCanvas(false);
  };
  
  // Render functions for each step
  const renderUploadStep = () => (
    <div className="text-center">
        <h2 className="text-3xl font-serif font-bold mb-4">Lade ein Foto deines Haustieres hoch</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">Wähle ein klares, gut beleuchtetes Foto für das beste Ergebnis. Ein Blick direkt in die Kamera ist perfekt!</p>
        
        <div className="max-w-xl mx-auto">
            {!uploadedFile ? (
                <>
                    <label 
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        htmlFor="file-upload" 
                        className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-aqua cursor-pointer"
                    >
                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                        <span className="mt-2 block text-sm font-medium text-gray-900">
                            Foto per Drag & Drop hier ablegen oder klicken, um es auszuwählen
                        </span>
                    </label>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/png, image/jpeg, image/webp" onChange={(e) => handleFileChange(e.target.files ? e.target.files[0] : null)} />
                    { 'mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices && (
                        <>
                        <div className="flex items-center justify-center my-4">
                            <span className="h-px bg-gray-300 w-full"></span>
                            <span className="mx-4 text-gray-500">oder</span>
                            <span className="h-px bg-gray-300 w-full"></span>
                        </div>
                        <button onClick={() => setShowCamera(true)} className="w-full bg-gray-100 text-brand-black font-bold py-3 px-4 rounded-xl hover:bg-gray-200 transition-colors">
                            Mit Kamera aufnehmen
                        </button>
                        </>
                    )}
                </>
            ) : (
                <div className="space-y-4">
                    <img src={uploadedFile.url} alt="Vorschau des Haustierfotos" className="max-h-80 w-auto mx-auto rounded-lg shadow-md" />
                    {isAnalyzing && <div className="text-gray-600 animate-pulse">Analysiere Fotoqualität...</div>}
                    {analysisError && <div className="text-red-600 bg-red-100 p-3 rounded-lg">{analysisError}</div>}
                    {imageAnalysis && imageAnalysis.feedback && (
                        <div className={`p-4 rounded-lg ${imageAnalysis.isSuitable ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            <p className="font-semibold">{imageAnalysis.feedback}</p>
                        </div>
                    )}
                    <div className="flex justify-center gap-4 pt-4">
                        <button onClick={() => {setUploadedFile(null); setImageAnalysis(null); setAnalysisError(null);}} className="bg-gray-200 text-brand-black font-bold py-2 px-6 rounded-xl hover:bg-gray-300 transition-colors">Anderes Foto</button>
                        <button 
                            onClick={() => setCurrentStep(CreationStep.STYLE)} 
                            disabled={!imageAnalysis || !imageAnalysis.isSuitable || isAnalyzing}
                            className="bg-brand-pink text-brand-black font-bold py-2 px-6 rounded-xl hover:bg-brand-aqua transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                           Weiter: Stil wählen
                        </button>
                    </div>
                </div>
            )}
        </div>
        {showCamera && <CameraCapture onCapture={(captured) => { handleFileChange(captured.file); setShowCamera(false); }} onClose={() => setShowCamera(false)} />}
    </div>
  );

  const renderStyleStep = () => (
    <div className="text-center">
      <h2 className="text-3xl font-serif font-bold mb-2">Wähle einen Kunststil</h2>
      <p className="text-gray-600 mb-4 max-w-2xl mx-auto">Klicke auf deinen Lieblingsstil oder beschreibe deine eigene Vision.</p>
       <div className="text-center mb-8 p-2 bg-blue-100 text-blue-800 rounded-lg max-w-md mx-auto">
        Du hast noch <span className="font-bold">{remainingPreviews} von 3</span> kostenlosen Vorschauen für heute.
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {ART_STYLES.map(style => (
          <StyleCard key={style.id} style={style} onSelect={() => handleStyleSelect(style)} />
        ))}
      </div>
      
      {/* Custom Style Input */}
      <div className="mt-12 pt-8 border-t-2 border-dashed">
          <h3 className="text-2xl font-serif font-bold mb-4">...oder erstelle deinen eigenen Stil!</h3>
          <div className="max-w-xl mx-auto">
              <textarea 
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-brand-aqua"
                  rows={3}
                  placeholder="z.B. 'Ein lebhaftes Aquarell meines Haustieres am Strand' oder 'Mein Haustier als Charakter auf einem alten Filmplakat'"
              />
              <button
                  onClick={handleCustomPromptSubmit}
                  disabled={isGenerating || remainingPreviews <= 0}
                  className="mt-4 bg-brand-aqua text-brand-black font-bold py-3 px-8 rounded-xl hover:bg-opacity-80 transition-colors disabled:bg-gray-300"
              >
                  Mit meinem Stil generieren
              </button>
          </div>
      </div>

      <button onClick={() => setCurrentStep(CreationStep.UPLOAD)} className="mt-12 bg-gray-200 text-brand-black font-bold py-2 px-6 rounded-xl hover:bg-gray-300 transition-colors">Zurück zum Upload</button>
    </div>
  );

  const renderPreviewStep = () => (
    <div className="text-center">
      {isGenerating && <LoadingSpinner />}
      {generationError && (
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl font-serif font-bold text-red-600 mb-4">Oh nein!</h2>
          <p className="text-gray-600 mb-6">{generationError}</p>
          <button onClick={() => setCurrentStep(CreationStep.STYLE)} className="bg-brand-pink text-brand-black font-bold py-2 px-6 rounded-xl hover:bg-brand-aqua transition-colors">
            Anderen Stil versuchen
          </button>
        </div>
      )}
      {!isGenerating && generatedImages.length > 0 && (
        <>
          <h2 className="text-3xl font-serif font-bold mb-2">Dein Meisterwerk ist fertig!</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">Wähle deine Lieblingsversion aus, um fortzufahren. Beide sind nach dem Kauf verfügbar.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="cursor-pointer group" onClick={() => handlePreviewSelect(generatedImages[0], generatedImages[1])}>
              <img src={`data:image/jpeg;base64,${generatedImages[0]}`} alt="Generiertes Kunstwerk 1" className="rounded-lg shadow-md group-hover:shadow-2xl group-hover:ring-4 group-hover:ring-brand-aqua transition-all duration-300" />
              <div className="mt-4 bg-brand-pink text-center py-2 font-bold text-brand-black rounded-lg group-hover:bg-brand-aqua transition-colors duration-300">
                Dieses wählen
              </div>
            </div>
            <div className="cursor-pointer group" onClick={() => handlePreviewSelect(generatedImages[1], generatedImages[0])}>
              <img src={`data:image/jpeg;base64,${generatedImages[1]}`} alt="Generiertes Kunstwerk 2" className="rounded-lg shadow-md group-hover:shadow-2xl group-hover:ring-4 group-hover:ring-brand-aqua transition-all duration-300" />
               <div className="mt-4 bg-brand-pink text-center py-2 font-bold text-brand-black rounded-lg group-hover:bg-brand-aqua transition-colors duration-300">
                Dieses wählen
              </div>
            </div>
          </div>
          <button onClick={() => setCurrentStep(CreationStep.STYLE)} className="mt-12 bg-gray-200 text-brand-black font-bold py-2 px-6 rounded-xl hover:bg-gray-300 transition-colors">Anderen Stil wählen</button>
        </>
      )}
    </div>
  );
  
  const renderPurchaseStep = () => {
    const prices = {
      social: 3.99,
      poster: 9.99,
      canvas: 29.99,
      upsellSocial: 2.99,
      upsellPoster: 6.99,
      upsellCanvas: 19.99,
    };

    const socialTotal = prices.social + (upsellSocial ? prices.upsellSocial : 0);
    const posterTotal = prices.poster + (upsellPoster ? prices.upsellPoster : 0);
    const canvasTotal = prices.canvas + (upsellCanvas ? prices.upsellCanvas : 0);
    
    let currentTotal = 0;
    if (purchaseTab === 'digital') {
      currentTotal = socialTotal;
    } else {
      currentTotal = selectedPhysical === 'poster' ? posterTotal : canvasTotal;
    }

    return (
    <div className="text-center">
        <h2 className="text-3xl font-serif font-bold mb-2">Verewige dein Kunstwerk!</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">Du hast ein wundervolles Porträt erschaffen. Wähle jetzt das perfekte Paket für dich.</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
            {/* Preview Image */}
            <div className="lg:col-span-2 flex justify-center items-start">
                {selectedPreview && <img src={`data:image/jpeg;base64,${selectedPreview}`} alt="Ausgewähltes Kunstwerk" className="rounded-lg shadow-xl max-w-full sticky top-28" />}
            </div>

            {/* Purchase Options */}
            <div className="lg:col-span-3 bg-white p-6 rounded-lg shadow-lg text-left">
                <div className="flex border-b mb-6">
                    <button onClick={() => setPurchaseTab('physical')} className={`py-2 px-4 font-semibold text-lg ${purchaseTab === 'physical' ? 'border-b-2 border-brand-pink text-brand-black' : 'text-gray-500'}`}>Druck & Poster</button>
                    <button onClick={() => setPurchaseTab('digital')} className={`py-2 px-4 font-semibold text-lg ${purchaseTab === 'digital' ? 'border-b-2 border-brand-pink text-brand-black' : 'text-gray-500'}`}>Nur Digital</button>
                </div>
                
                {/* Digital Tab */}
                {purchaseTab === 'digital' && (
                    <div>
                        <h3 className="font-serif font-bold text-2xl mb-2">Social Pack</h3>
                        <p className="text-gray-600 mb-4">Ideal, um dein Kunstwerk online mit Freunden und Familie zu teilen.</p>
                        <ul className="space-y-2 text-gray-700 mb-4">
                          <li className="flex items-center"><span className="text-brand-aqua mr-2">✔️</span> <strong>Zwei einzigartige KI-Varianten</strong> als hochauflösende Dateien.</li>
                          <li className="flex items-center"><span className="text-brand-aqua mr-2">✔️</span> Perfektes <strong>quadratisches Format</strong> für Instagram &amp; Facebook.</li>
                          <li className="flex items-center"><span className="text-brand-aqua mr-2">✔️</span> <strong>Sofortiger Download</strong> nach dem Kauf.</li>
                          <li className="flex items-center"><span className="text-brand-aqua mr-2">✔️</span> Ohne Wasserzeichen.</li>
                        </ul>
                         {/* This pack includes both by default, so no upsell needed, we just sell the pack of 2 */}
                    </div>
                )}

                {/* Physical Tab */}
                {purchaseTab === 'physical' && (
                    <div className="space-y-6">
                       <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">⭐ Alle physischen Produkte enthalten automatisch auch das komplette <strong>digitale Social Pack</strong>!</p>
                        {/* Poster */}
                        <div onClick={() => setSelectedPhysical('poster')} className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${selectedPhysical === 'poster' ? 'border-brand-aqua shadow-md' : 'border-gray-200'}`}>
                            <h3 className="font-serif font-bold text-xl">Hochwertiges Galerie-Poster</h3>
                            <p className="text-gray-600 text-sm mb-3">Brillante Farben auf mattem Premiumpapier in Museumsqualität.</p>
                             <p className="text-3xl font-bold">€{prices.poster.toFixed(2)}</p>
                            <div className="mt-3 bg-gray-50 p-3 rounded-md">
                                <label className="flex items-center space-x-3 cursor-pointer text-sm">
                                    <input type="checkbox" checked={upsellPoster} onChange={(e) => { e.stopPropagation(); setUpsellPoster(!upsellPoster)}} className="h-5 w-5 rounded border-gray-300 text-brand-pink focus:ring-brand-pink" />
                                    <span>Füge die <strong>zweite KI-Variante</strong> für nur <strong className="text-brand-pink">+€{prices.upsellPoster.toFixed(2)}</strong> hinzu.</span>
                                </label>
                            </div>
                        </div>
                         {/* Canvas */}
                        <div onClick={() => setSelectedPhysical('canvas')} className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${selectedPhysical === 'canvas' ? 'border-brand-aqua shadow-md' : 'border-gray-200'}`}>
                            <h3 className="font-serif font-bold text-xl">Edle Künstler-Leinwand</h3>
                            <p className="text-gray-600 text-sm mb-3">Dein Kunstwerk auf echter Baumwoll-Leinwand, fertig aufgespannt auf einen Holzrahmen.</p>
                             <p className="text-3xl font-bold">€{prices.canvas.toFixed(2)}</p>
                             <div className="mt-3 bg-gray-50 p-3 rounded-md">
                                <label className="flex items-center space-x-3 cursor-pointer text-sm">
                                    <input type="checkbox" checked={upsellCanvas} onChange={(e) => { e.stopPropagation(); setUpsellCanvas(!upsellCanvas)}} className="h-5 w-5 rounded border-gray-300 text-brand-pink focus:ring-brand-pink" />
                                    <span>Füge die <strong>zweite KI-Variante</strong> für nur <strong className="text-brand-pink">+€{prices.upsellCanvas.toFixed(2)}</strong> hinzu.</span>
                                </label>
                            </div>
                        </div>
                    </div>
                )}
                
                <div className="mt-6 border-t pt-4">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-xl font-bold">Gesamtsumme:</span>
                        <span className="text-3xl font-bold text-brand-pink">€{currentTotal.toFixed(2)}</span>
                    </div>
                     <button onClick={handlePurchase} className="w-full mt-2 bg-brand-pink text-brand-black font-bold py-4 px-6 rounded-xl hover:bg-brand-aqua transition-transform transform hover:scale-105 duration-300">
                        Kauf abschließen (Demo)
                    </button>
                </div>

            </div>
        </div>
        <button onClick={() => setCurrentStep(CreationStep.PREVIEW)} className="mt-8 bg-gray-200 text-brand-black font-bold py-2 px-6 rounded-xl hover:bg-gray-300 transition-colors">Zurück zur Vorschau</button>
    </div>
    )};
  
  const renderConfirmationStep = () => {
    const wasUpsell = (purchaseTab === 'physical' && selectedPhysical === 'poster' && upsellPoster) ||
                    (purchaseTab === 'physical' && selectedPhysical === 'canvas' && upsellCanvas);
                    
    const includesDigital = purchaseTab === 'digital' || purchaseTab === 'physical';

    const shareUrl = "https://petvision.art"; // Placeholder URL
    const shareText = "Ich habe gerade mit PetVision ein unglaubliches Kunstwerk von meinem Haustier erstellt! Schau es dir an!";
    
    return (
        <div className="text-center">
            <div className="text-6xl mb-4">💖</div>
            <h2 className="text-3xl font-serif font-bold mb-2">Vielen Dank für deine Bestellung!</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">Deine {purchasedProduct}-Bestellung ist bestätigt. {includesDigital && "Die digitalen Downloads sind unten verfügbar."}</p>

            {includesDigital && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-10">
                  {selectedPreview && (
                      <div className="text-center">
                          <h3 className="font-bold mb-2">Kunstwerk Variante 1</h3>
                          <img src={`data:image/jpeg;base64,${selectedPreview}`} alt="Gekauftes Kunstwerk 1" className="rounded-lg shadow-xl mb-4" />
                          <a href={`data:image/jpeg;base64,${selectedPreview}`} download="petvision-art-1.jpg" className="inline-block bg-brand-aqua text-brand-black font-bold py-2 px-6 rounded-xl hover:bg-opacity-80 transition-colors">
                              Download
                          </a>
                      </div>
                  )}
                  {otherPreview && (
                       <div className="text-center">
                          <h3 className="font-bold mb-2">Kunstwerk Variante 2</h3>
                          <img src={`data:image/jpeg;base64,${otherPreview}`} alt="Gekauftes Kunstwerk 2" className="rounded-lg shadow-xl mb-4" />
                           <a href={`data:image/jpeg;base64,${otherPreview}`} download="petvision-art-2.jpg" className="inline-block bg-brand-aqua text-brand-black font-bold py-2 px-6 rounded-xl hover:bg-opacity-80 transition-colors">
                              Download
                          </a>
                      </div>
                  )}
              </div>
            )}
            
            {/* Share Section */}
            <div className="max-w-2xl mx-auto mt-12 pt-8 border-t">
                 <h3 className="text-2xl font-serif font-bold mb-4">Teile dein Meisterwerk!</h3>
                 <div className="flex justify-center items-center gap-4">
                     <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">Facebook</a>
                     <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer" className="bg-black text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors">X (Twitter)</a>
                     <button onClick={() => navigator.clipboard.writeText("#MyPetVision")} className="bg-gray-200 text-black font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors">#MyPetVision kopieren</button>
                 </div>
            </div>

            <button onClick={resetFlow} className="mt-12 bg-brand-pink text-brand-black font-bold py-3 px-6 rounded-xl hover:bg-brand-aqua transition-colors">
                Noch eins erstellen
            </button>
        </div>
    );
  }

  const renderContent = () => {
    switch (currentStep) {
      case CreationStep.UPLOAD:
        return renderUploadStep();
      case CreationStep.STYLE:
        return renderStyleStep();
      case CreationStep.PREVIEW:
        return renderPreviewStep();
      case CreationStep.PURCHASE:
          return renderPurchaseStep();
      case CreationStep.CONFIRMATION:
          return renderConfirmationStep();
      default:
        return <div>Unbekannter Schritt</div>;
    }
  };

  const totalSteps = Object.keys(CreationStep).length / 2;
  const stepNumber = currentStep + 1;

  return (
    <div className="bg-gray-50">
      <ProgressBar currentStep={stepNumber} totalSteps={totalSteps} />
      <div className="container mx-auto px-6 py-12 min-h-[60vh]">
        {renderContent()}
      </div>
    </div>
  );
};

export default CreationFlow;