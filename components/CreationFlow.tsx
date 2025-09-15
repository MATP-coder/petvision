import React, { useState, useCallback } from 'react';
import { CreationStep } from '../types';
import type { ArtStyle } from '../types';
import { ART_STYLES } from '../constants';
import { generatePetArt } from '../services/geminiService';

import ProgressBar from './ProgressBar';
import StyleCard from './StyleCard';
import LoadingSpinner from './LoadingSpinner';

// Helper to convert file to base64
const fileToBase64 = (file: File): Promise<{base64: string, mimeType: string}> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      const [header, base64] = result.split(',');
      const mimeType = header.match(/:(.*?);/)?.[1];
      if (mimeType) {
         resolve({ base64, mimeType });
      } else {
         reject(new Error("Could not parse MIME type from data URL."));
      }
    };
    reader.onerror = (error) => reject(error);
  });
};


const CreationFlow: React.FC = () => {
  const [step, setStep] = useState<CreationStep>(CreationStep.UPLOAD);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedFilePreview, setUploadedFilePreview] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<ArtStyle | null>(null);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [selectedPreview, setSelectedPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [purchaseOption, setPurchaseOption] = useState<'social' | 'poster'>('poster');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setUploadedFilePreview(URL.createObjectURL(file));
      setError(null);
    }
  };
  
  const proceedToStyleSelection = () => {
      if(uploadedFile){
          setStep(CreationStep.STYLE)
      } else {
          setError("Please upload a photo first.");
      }
  }

  const handleStyleSelect = useCallback(async (style: ArtStyle) => {
    if (!uploadedFile) {
        setError("Something went wrong, no file found. Please go back.");
        return;
    }
    
    setSelectedStyle(style);
    setStep(CreationStep.PREVIEW);
    setIsLoading(true);
    setError(null);
    setGeneratedImages([]);

    try {
        const { base64, mimeType } = await fileToBase64(uploadedFile);
        
        const promises = [
            generatePetArt(base64, mimeType, style.prompts[0]),
            generatePetArt(base64, mimeType, style.prompts[1])
        ];
        
        const results = await Promise.all(promises);
        setGeneratedImages(results.map(imgBase64 => `data:image/png;base64,${imgBase64}`));

    } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
        setIsLoading(false);
    }
  }, [uploadedFile]);

  const handlePurchase = () => {
    setStep(CreationStep.CONFIRMATION);
  }

  const handleSocialPackDownload = async (base64Image: string) => {
    const img = new Image();
    img.src = base64Image;
    img.onload = () => {
      const triggerDownload = (dataUrl: string, filename: string) => {
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      };

      const canvasPost = document.createElement('canvas');
      const ctxPost = canvasPost.getContext('2d');
      if (ctxPost) {
        const size = Math.min(img.width, img.height);
        canvasPost.width = 1080; // Standard Instagram post size
        canvasPost.height = 1080;
        const startX = (img.width - size) / 2;
        const startY = (img.height - size) / 2;
        ctxPost.drawImage(img, startX, startY, size, size, 0, 0, 1080, 1080);
        triggerDownload(canvasPost.toDataURL('image/png'), 'petvision_post.png');
      }

      const canvasStory = document.createElement('canvas');
      const ctxStory = canvasStory.getContext('2d');
      if (ctxStory) {
        const targetAspectRatio = 9 / 16;
        let newWidth, newHeight, startX, startY;
        if(img.width / img.height > targetAspectRatio){ // wider than target
            newHeight = img.height;
            newWidth = newHeight * targetAspectRatio;
            startX = (img.width - newWidth) / 2;
            startY = 0;
        } else { // taller or same aspect ratio
            newWidth = img.width;
            newHeight = newWidth / targetAspectRatio;
            startX = 0;
            startY = (img.height - newHeight) / 2;
        }
        canvasStory.width = 1080;
        canvasStory.height = 1920;
        ctxStory.drawImage(img, startX, startY, newWidth, newHeight, 0, 0, 1080, 1920);
        
        setTimeout(() => {
           triggerDownload(canvasStory.toDataURL('image/png'), 'petvision_story.png');
        }, 500);
      }
    };
  };
  
  const resetFlow = () => {
      setStep(CreationStep.UPLOAD);
      setUploadedFile(null);
      setUploadedFilePreview(null);
      setSelectedStyle(null);
      setGeneratedImages([]);
      setSelectedPreview(null);
      setIsLoading(false);
      setError(null);
  }

  const renderUploadStep = () => (
    <div className="container mx-auto px-6 py-8 text-center">
        <ProgressBar currentStep={1} totalSteps={3} />
        <h2 className="text-3xl font-serif font-bold mt-8">Upload Your Pet's Photo</h2>
        <div className="mt-6 max-w-lg mx-auto p-8 border-2 border-dashed border-gray-300 rounded-xl">
            <input type="file" id="file-upload" className="hidden" accept="image/*" onChange={handleFileChange} />
            <label htmlFor="file-upload" className="cursor-pointer bg-brand-pink text-brand-black font-bold py-3 px-6 rounded-xl hover:bg-brand-aqua transition-colors">
                Choose a Photo
            </label>
            {uploadedFilePreview && (
                <div className="mt-6">
                    <img src={uploadedFilePreview} alt="Pet preview" className="max-w-full h-auto max-h-64 mx-auto rounded-lg shadow-md" />
                </div>
            )}
            <p className="text-sm text-gray-500 mt-4">💡 Tip: Best results with bright, frontal pet portraits.</p>
        </div>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        <div className="mt-8 sticky bottom-0 bg-white py-4 px-6 md:static">
             <button onClick={proceedToStyleSelection} disabled={!uploadedFile} className="w-full bg-brand-pink text-brand-black text-xl font-bold py-4 px-8 rounded-xl hover:bg-brand-aqua transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed">
                Next: Choose a Style
            </button>
        </div>
    </div>
  );

  const renderStyleStep = () => (
      <div className="container mx-auto px-6 py-8">
          <ProgressBar currentStep={2} totalSteps={3} />
          <h2 className="text-3xl font-serif font-bold text-center mt-8 mb-6">Choose an Artistic Style</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {ART_STYLES.map(style => (
                  <StyleCard key={style.id} style={style} onSelect={handleStyleSelect} />
              ))}
          </div>
      </div>
  );

    const renderPreviewStep = () => (
        <div className="container mx-auto px-6 py-8">
            <ProgressBar currentStep={3} totalSteps={3} />
            <h2 className="text-3xl font-serif font-bold text-center mt-8 mb-6">
                {isLoading ? "Generating Your Masterpiece" : "Choose Your Favorite"}
            </h2>
            {isLoading && <LoadingSpinner />}
            {error && <p className="text-red-500 text-center p-4 bg-red-100 rounded-lg">{error}</p>}
            {!isLoading && generatedImages.length > 0 && (
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {generatedImages.map((imgSrc, index) => (
                            <div key={index} onClick={() => setSelectedPreview(imgSrc)} className={`relative group cursor-pointer rounded-xl overflow-hidden border-4 transition-all duration-300 ${selectedPreview === imgSrc ? 'border-brand-aqua shadow-2xl' : 'border-transparent hover:border-brand-pink'}`}>
                                <img src={imgSrc} alt={`Generated art ${index + 1}`} className="w-full h-auto" />
                                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-10 pointer-events-none">
                                    <span className="text-white text-3xl font-bold opacity-50 transform -rotate-45 select-none">PetVision Preview</span>
                                </div>
                                <div className={`text-center font-bold p-2 text-white ${selectedPreview === imgSrc ? 'bg-brand-aqua' : 'bg-brand-pink'}`}>
                                    {selectedPreview === imgSrc ? 'Selected!' : 'Click to Select'}
                                </div>
                            </div>
                        ))}
                    </div>
                     {selectedPreview && (
                        <div className="mt-10 p-6 bg-gray-50 rounded-xl shadow-inner">
                            <h3 className="text-2xl font-serif font-bold text-center mb-4">Purchase Options</h3>
                            <div className="space-y-4 max-w-lg mx-auto">
                                <div onClick={() => setPurchaseOption('social')} className={`p-4 border-2 rounded-xl cursor-pointer ${purchaseOption === 'social' ? 'border-brand-aqua bg-teal-50' : 'border-gray-300'}`}>
                                    <h4 className="font-bold text-lg">Social Pack - 5.90 €</h4>
                                    <p className="text-sm">High-res digital files (Post & Story). Instant download.</p>
                                </div>
                                 <div onClick={() => setPurchaseOption('poster')} className={`relative p-4 border-2 rounded-xl cursor-pointer ${purchaseOption === 'poster' ? 'border-brand-aqua bg-teal-50' : 'border-gray-300'}`}>
                                     <span className="absolute top-0 right-0 -mt-3 mr-3 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full">Bestseller</span>
                                    <h4 className="font-bold text-lg">Poster Pack - from 29.90 €</h4>
                                    <p className="text-sm">Physical 50x70cm matte poster + all digital files.</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
            {!isLoading && selectedPreview && (
                 <div className="mt-8 sticky bottom-0 bg-white py-4 px-6 md:static">
                    <button onClick={handlePurchase} className="w-full bg-brand-pink text-brand-black text-xl font-bold py-4 px-8 rounded-xl hover:bg-brand-aqua transition-colors animate-pulse">
                        Buy Now
                    </button>
                    <div className="text-center mt-2 text-sm text-gray-500">
                      ✔️ Secure Payment. Your photo will be deleted after 7 days.
                    </div>
                </div>
            )}
        </div>
    );
    
    const renderConfirmationStep = () => (
        <div className="container mx-auto px-6 py-12 text-center">
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
                <span className="text-6xl" role="img" aria-label="party popper">🎉</span>
                <h2 className="text-4xl font-serif font-bold mt-4">Thank You!</h2>
                <p className="text-lg text-gray-700 mt-2">Your order is confirmed.</p>
                {purchaseOption === 'social' && selectedPreview && (
                    <div className="mt-6 p-4 bg-teal-50 rounded-lg">
                        <h3 className="font-bold">Your Social Pack is ready!</h3>
                        <button onClick={() => handleSocialPackDownload(selectedPreview)} className="mt-2 inline-block bg-brand-aqua text-brand-black font-bold py-3 px-6 rounded-xl hover:bg-brand-pink transition-colors">
                           Download Social Pack (2 Files)
                        </button>
                    </div>
                )}
                 {purchaseOption === 'poster' && (
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                        <h3 className="font-bold">Your Poster Pack is on its way!</h3>
                        <p className="mt-1">Estimated delivery: 5-7 business days. You'll receive a tracking link via email.</p>
                         <a href={selectedPreview || '#'} download="petvision_art_hires.png" className="mt-4 inline-block bg-brand-aqua text-brand-black font-bold py-3 px-6 rounded-xl hover:bg-brand-pink transition-colors">
                           Download Digital File
                        </a>
                    </div>
                )}
                 <div className="mt-8 border-t pt-6 space-y-4">
                     <button onClick={resetFlow} className="w-full bg-gray-200 text-brand-black font-bold py-3 px-6 rounded-xl hover:bg-gray-300">
                        Try Another Style
                    </button>
                    <p>Share on Instagram with #MyPetVision</p>
                 </div>
            </div>
        </div>
    );


  switch (step) {
    case CreationStep.STYLE:
      return renderStyleStep();
    case CreationStep.PREVIEW:
      return renderPreviewStep();
    case CreationStep.CONFIRMATION:
        return renderConfirmationStep();
    case CreationStep.UPLOAD:
    default:
      return renderUploadStep();
  }
};

export default CreationFlow;
