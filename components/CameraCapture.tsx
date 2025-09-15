import React, { useRef, useEffect, useCallback, useState } from 'react';

interface UploadedFile {
  file: File;
  base64: string;
}

interface CameraCaptureProps {
  onCapture: (file: UploadedFile) => void;
  onClose: () => void;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const startCamera = async () => {
      // Stop any existing stream before starting a new one
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        setError("Konnte nicht auf die Kamera zugreifen. Bitte überprüfe die Browser-Berechtigungen und versuche es erneut.");
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []); // Re-running this effect doesn't make sense as we have one stream

  const handleCaptureClick = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const context = canvas.getContext('2d');
    if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        canvas.toBlob((blob) => {
            if (blob) {
                const file = new File([blob], 'camera-shot.jpg', { type: 'image/jpeg' });
                const reader = new FileReader();
                reader.onload = (e) => {
                    const result = e.target?.result as string;
                    const base64 = result.split(',')[1];
                    onCapture({ file, base64 });
                };
                reader.onerror = () => {
                    setError("Das aufgenommene Bild konnte nicht verarbeitet werden.");
                };
                reader.readAsDataURL(file);
            }
        }, 'image/jpeg', 0.95);
    }
  }, [onCapture]);
  
  const handleClose = () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      onClose();
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4" role="dialog" aria-modal="true">
        <div className="bg-white p-8 rounded-lg text-center shadow-xl max-w-sm w-full">
          <h3 className="text-xl font-bold text-red-600 mb-2">Kamerafehler</h3>
          <p className="text-gray-700 mb-4">{error}</p>
          <button onClick={handleClose} className="bg-gray-300 text-brand-black font-bold py-2 px-6 rounded-xl hover:bg-gray-400 transition-colors">
            Schließen
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center z-50 p-4" role="dialog" aria-modal="true">
        <video ref={videoRef} autoPlay playsInline muted className="max-w-full max-h-[70vh] rounded-lg shadow-xl aspect-auto"></video>
        <canvas ref={canvasRef} className="hidden" aria-hidden="true"></canvas>
        <div className="mt-6 flex items-center gap-4">
            <button
                onClick={handleClose}
                className="bg-gray-700 bg-opacity-50 text-white font-bold text-lg p-3 rounded-full hover:bg-gray-600 transition-colors"
                aria-label="Abbrechen und Kamera schließen"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <button
                onClick={handleCaptureClick}
                className="bg-white text-brand-pink font-bold p-4 rounded-full hover:scale-110 transition-transform ring-4 ring-white ring-opacity-50"
                aria-label="Foto aufnehmen"
            >
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2H4zm10 4a3 3 0 11-6 0 3 3 0 016 0z" clipRule="evenodd" /></svg>
            </button>
            <div className="w-12 h-12"></div>
        </div>
    </div>
  );
};

export default CameraCapture;