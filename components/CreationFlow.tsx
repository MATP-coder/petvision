import React, { useState } from 'react';
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
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationError, setGenerationError] = useState<string | null>(null);
  
  const [selectedPreview, setSelectedPreview] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState<boolean>(false);

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

  // Style selection and art generation
  const handleStyleSelect = async (style: ArtStyle) => {
    if (!uploadedFile) return;
    
    setSelectedStyle(style);
    setCurrentStep(CreationStep.PREVIEW);
    setIsGenerating(true);
    setGenerationError(null);
    setGeneratedImages([]);

    try {
      // Generate two images in parallel using the style's prompts
      const imagePromises = style.prompts.slice(0, 2).map(prompt => 
        generatePetArt(uploadedFile.base64, uploadedFile.mimeType, prompt)
      );
      const results = await Promise.all(imagePromises);
      setGeneratedImages(results);
    } catch (error) {
      console.error(error);
      setGenerationError("Leider ist bei der Erstellung deines Kunstwerks ein Fehler aufgetreten. Bitte versuche es erneut.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePreviewSelect = (imageBase64: string) => {
    setSelectedPreview(imageBase64);
    setCurrentStep(CreationStep.PURCHASE);
  };

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
                    <div className="flex items-center justify-center my-4">
                        <span className="h-px bg-gray-300 w-full"></span>
                        <span className="mx-4 text-gray-500">oder</span>
                        <span className="h-px bg-gray-300 w-full"></span>
                    </div>
                    <button onClick={() => setShowCamera(true)} className="w-full bg-gray-100 text-brand-black font-bold py-3 px-4 rounded-xl hover:bg-gray-200 transition-colors">
                        Mit Kamera aufnehmen
                    </button>
                </>
            ) : (
                <div className="space-y-4">
                    <img src={uploadedFile.url} alt="Vorschau des Haustierfotos" className="max-h-80 w-auto mx-auto rounded-lg shadow-md" />
                    {isAnalyzing && <div className="text-gray-600 animate-pulse">Analysiere Fotoqualität...</div>}
                    {analysisError && <div className="text-red-600 bg-red-100 p-3 rounded-lg">{analysisError}</div>}
                    {imageAnalysis && imageAnalysis.feedback && (
                        <div className={`p-4 rounded-lg ${imageAnalysis.isSuitable ? 'bg-green-100' : 'bg-yellow-100'}`}>
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
                            Stil wählen
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
      <p className="text-gray-600 mb-8 max-w-2xl mx-auto">Klicke auf deinen Lieblingsstil, um die Magie zu starten.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {ART_STYLES.map(style => (
          <StyleCard key={style.id} style={style} onSelect={() => handleStyleSelect(style)} />
        ))}
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
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">Wähle deine Lieblingsversion aus, um fortzufahren.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {generatedImages.map((img, index) => (
              <div key={index} className="cursor-pointer group" onClick={() => handlePreviewSelect(img)}>
                <img src={`data:image/jpeg;base64,${img}`} alt={`Generiertes Kunstwerk ${index + 1}`} className="rounded-lg shadow-md group-hover:shadow-2xl group-hover:ring-4 group-hover:ring-brand-aqua transition-all duration-300" />
                <div className="mt-4 bg-brand-pink text-center py-2 font-bold text-brand-black rounded-lg group-hover:bg-brand-aqua transition-colors duration-300">
                  Dieses wählen
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => setCurrentStep(CreationStep.STYLE)} className="mt-12 bg-gray-200 text-brand-black font-bold py-2 px-6 rounded-xl hover:bg-gray-300 transition-colors">Anderen Stil wählen</button>
        </>
      )}
    </div>
  );
  
  const renderPurchaseStep = () => (
    <div className="text-center">
        <h2 className="text-3xl font-serif font-bold mb-2">Fast geschafft!</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">Du hast ein wundervolles Kunstwerk geschaffen.</p>
        <div className="max-w-md mx-auto">
            {selectedPreview && <img src={`data:image/jpeg;base64,${selectedPreview}`} alt="Ausgewähltes Kunstwerk" className="rounded-lg shadow-xl mb-8" />}
            {/* Placeholder for purchase options */}
            <div className="bg-gray-100 p-8 rounded-lg text-left space-y-4">
                <h3 className="text-xl font-bold text-center">Kaufe dein Kunstwerk</h3>
                <p className="text-center text-gray-600">Dies ist eine Demo. Die Kaufabwicklung ist nicht implementiert.</p>
                <button onClick={() => setCurrentStep(CreationStep.CONFIRMATION)} className="w-full mt-4 bg-brand-pink text-brand-black font-bold py-3 px-6 rounded-xl hover:bg-brand-aqua transition-colors">
                    Kauf abschließen (Demo)
                </button>
            </div>
            <button onClick={() => setCurrentStep(CreationStep.PREVIEW)} className="mt-8 bg-gray-200 text-brand-black font-bold py-2 px-6 rounded-xl hover:bg-gray-300 transition-colors">Zurück zur Vorschau</button>
        </div>
    </div>
  );
  
  const renderConfirmationStep = () => (
    <div className="text-center">
        <div className="text-6xl mb-4">💖</div>
        <h2 className="text-3xl font-serif font-bold mb-2">Vielen Dank!</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">Dein Kunstwerk ist auf dem Weg (im Geiste!). Wir hoffen, du hattest Spaß beim Erstellen.</p>
        <button onClick={resetFlow} className="bg-brand-pink text-brand-black font-bold py-3 px-6 rounded-xl hover:bg-brand-aqua transition-colors">
            Noch eins erstellen
        </button>
    </div>
  );

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