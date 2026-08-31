import React, { useState, useEffect } from 'react';
import { Gift, Heart, Sparkles, Crown, RotateCcw, Image as ImageIcon, Maximize2, X, Check } from 'lucide-react';
import { audioEngine } from '../audio/RomanticAudioEngine';
import { launchGrandFireworks, launchRoseShower } from '../utils/celebrationEffects';
import { getSavedCouplePhoto, saveCouplePhoto } from '../utils/photoStorage';

export const SurpriseLoveBox: React.FC = () => {
  const [stage, setStage] = useState<0 | 1 | 2>(0); // 0: Closed, 1: Untied, 2: Fully Revealed
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [showFullImageModal, setShowFullImageModal] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);

  useEffect(() => {
    const saved = getSavedCouplePhoto();
    if (saved) {
      setPhotoUrl(saved);
    }

    const handlePhotoUpdated = () => {
      setPhotoUrl(getSavedCouplePhoto());
    };

    window.addEventListener('couple_photo_updated', handlePhotoUpdated);
    return () => {
      window.removeEventListener('couple_photo_updated', handlePhotoUpdated);
    };
  }, []);

  const handleUntie = () => {
    audioEngine.playChime(1.1);
    setStage(1);
  };

  const handleOpenLid = () => {
    audioEngine.playHeartbeat();
    setStage(2);
    setTimeout(() => {
      launchGrandFireworks();
      launchRoseShower();
    }, 400);
  };

  const handleReset = () => {
    audioEngine.playChime(0.9);
    setStage(0);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setPhotoUrl(result);
        saveCouplePhoto(result);
        audioEngine.playChime(1.3);
        launchRoseShower();
        setSavedNotice(true);
        setTimeout(() => setSavedNotice(false), 3000);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 max-w-4xl mx-auto flex flex-col items-center justify-center text-center">
      
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/80 border border-[#4a3a35]/20 text-[#6d5a54] text-xs font-semibold uppercase tracking-[0.25em] mb-3 shadow-sm font-sans-clean">
          <Gift className="w-3.5 h-3.5 text-[#a65341]" />
          <span>A Secret Gift From Rahat</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif-luxury text-[#4a3a35] font-medium tracking-tight">
          Surprise Package for Jemi
        </h1>
        <p className="font-serif-luxury text-base sm:text-xl text-[#7c635b] mt-2 italic max-w-lg mx-auto">
          Wrapped with tenderness, sealed with love, and waiting just for you.
        </p>
      </div>

      {/* Stage 0 & 1: The Luxury 3D Gift Box Container */}
      {stage < 2 ? (
        <div className="relative flex flex-col items-center my-8">
          
          {/* Glowing Aura Behind Box */}
          <div className="absolute inset-0 bg-[#f7e1d7]/60 blur-3xl rounded-full scale-125 pointer-events-none" />

          {/* 3D Box Visual */}
          <div 
            onClick={stage === 0 ? handleUntie : handleOpenLid}
            id="surprise-box-interactive"
            className="group relative cursor-pointer select-none transition-transform duration-500 hover:scale-105"
          >
            {/* Box Body */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-3xl bg-[#4a3a35] border-2 border-[#a65341]/40 shadow-2xl p-6 flex flex-col items-center justify-center glow-terracotta">
              
              {/* Ribbon Vertical & Horizontal */}
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-10 bg-[#f4e8e2] shadow-md border-x border-[#d8c5bc]" />
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-10 bg-[#f4e8e2] shadow-md border-y border-[#d8c5bc]" />

              {/* Center Satin Bow / Knot */}
              <div className="relative z-10 w-20 h-20 rounded-full bg-[#f4e8e2] p-[2px] shadow-xl flex items-center justify-center group-hover:scale-110 transition-transform border border-[#d8c5bc]">
                <div className="w-full h-full bg-[#4a3a35] rounded-full flex flex-col items-center justify-center text-[#fde2e4]">
                  <Heart className="w-7 h-7 fill-[#a65341] text-[#a65341] animate-pulse" />
                  <span className="text-[9px] font-bold tracking-tight uppercase font-sans-clean text-[#fde2e4]">
                    FOR JEMI
                  </span>
                </div>
              </div>

              {/* Subtle Tag */}
              <div className="absolute bottom-4 right-4 z-10 px-3 py-1 rounded-lg bg-white/95 border border-[#4a3a35]/20 text-[10px] text-[#4a3a35] font-serif-luxury italic shadow-sm">
                From: Rahat ♥
              </div>
            </div>
          </div>

          {/* Action Prompt */}
          <div className="mt-8">
            {stage === 0 ? (
              <button
                id="untie-ribbon-btn"
                onClick={handleUntie}
                className="px-8 py-3.5 rounded-full bg-[#4a3a35] hover:bg-[#382b27] text-white font-bold text-sm sm:text-base shadow-lg hover:scale-105 active:scale-95 transition-transform flex items-center gap-2 font-sans-clean cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-[#fde2e4]" />
                <span>Untie Linen Ribbon 🎀</span>
              </button>
            ) : (
              <button
                id="open-lid-btn"
                onClick={handleOpenLid}
                className="px-8 py-3.5 rounded-full bg-[#a65341] hover:bg-[#8c4333] text-white font-bold text-sm sm:text-base shadow-xl hover:scale-105 active:scale-95 transition-transform flex items-center gap-2 animate-bounce font-sans-clean cursor-pointer"
              >
                <Gift className="w-5 h-5" />
                <span>Lift the Lid to Reveal Your Gift! ✨</span>
              </button>
            )}
          </div>

        </div>
      ) : (
        /* Stage 2: Grand Unwrapped Emotional Celebration */
        <div className="w-full max-w-2xl p-6 sm:p-10 rounded-3xl bg-white border-2 border-[#e8d7cf] shadow-2xl backdrop-blur-xl animate-scaleUp text-center relative overflow-hidden text-[#4a3a35]">
          
          {/* Subtle Warm Glow Effect */}
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#f7e1d7]/40 blur-3xl rounded-full pointer-events-none" />

          {/* Crown & Monogram */}
          <div className="flex flex-col items-center justify-center mb-4">
            <Crown className="w-10 h-10 sm:w-12 sm:h-12 text-[#a65341] animate-bounce mb-2" />
            <span className="font-sans-clean text-xs uppercase tracking-[0.3em] text-[#8e7d77] font-bold">
              The Queen of My Heart
            </span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#4a3a35] font-medium tracking-tight mb-2">
            Jubaida Haque <span className="italic text-[#a65341]">Jemi</span>
          </h2>

          <p className="font-serif-luxury text-base sm:text-xl text-[#6d5a54] font-light italic leading-relaxed mb-6">
            &ldquo;My love for you cannot be contained in any box, measured by any clock, or dimmed by any storm. You are my forever and my whole world.&rdquo;
          </p>

          {/* Romantic Couple Polaroid / Keepsake Frame */}
          <div className="my-6 p-5 rounded-2xl bg-[#fffaf8] border border-[#e8d7cf] flex flex-col items-center shadow-sm">
            {photoUrl ? (
              <div className="relative flex flex-col items-center">
                {/* Polaroid Frame */}
                <div className="p-3 bg-white border border-[#d8c5bc] rounded-2xl shadow-xl transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                  <div className="relative w-60 h-72 sm:w-72 sm:h-96 rounded-xl overflow-hidden border border-[#e8d7cf] bg-neutral-100">
                    <img
                      src={photoUrl}
                      alt="Rahat and Jemi"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => setShowFullImageModal(true)}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-sm transition-all"
                      title="View full size"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="pt-3 pb-1 text-center">
                    <span className="font-serif-luxury italic text-sm sm:text-base font-bold text-[#4a3a35]">
                      Rahat &amp; Jemi &bull; Bound Together Forever ♥
                    </span>
                  </div>
                </div>

                {savedNotice && (
                  <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-sans-clean font-medium border border-emerald-200 animate-fadeIn">
                    <Check className="w-3.5 h-3.5" />
                    <span>Photo saved &amp; synced across all pages!</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="w-60 h-72 sm:w-72 sm:h-80 rounded-2xl border-2 border-dashed border-[#a65341]/40 flex flex-col items-center justify-center p-6 text-center mb-3 bg-[#fff7f4]">
                <Heart className="w-12 h-12 text-[#a65341] fill-[#a65341] mb-3 animate-pulse" />
                <h3 className="font-serif-luxury text-base font-bold text-[#4a3a35] mb-1">
                  Our Cherished Couple Photo
                </h3>
                <p className="text-xs text-[#6d5a54] font-sans-clean leading-relaxed">
                  Upload the photo of Rahat &amp; Jemi to place it forever inside the gift box &amp; keepsake cards.
                </p>
              </div>
            )}

            <div className="mt-4 flex items-center gap-3">
              <label className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-[#f4e8e2] border border-[#d8c5bc] text-xs sm:text-sm text-[#4a3a35] font-semibold transition-all shadow-sm font-sans-clean hover:scale-105 active:scale-95">
                <ImageIcon className="w-4 h-4 text-[#a65341]" />
                <span>{photoUrl ? 'Replace / Update Photo' : 'Upload Our Photo (IMG_5054.JPG)'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Vow Signature */}
          <div className="pt-4 border-t border-[#4a3a35]/15 flex flex-wrap items-center justify-between gap-4">
            <div className="text-left">
              <span className="text-[10px] text-[#8e7d77] uppercase tracking-[0.2em] font-sans-clean font-bold block">Devoted Husband</span>
              <span className="font-serif-luxury italic text-3xl font-bold text-[#a65341]">Rahat ♥</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  audioEngine.playHeartbeat();
                  launchGrandFireworks();
                  launchRoseShower();
                }}
                className="px-5 py-2.5 rounded-xl bg-[#4a3a35] hover:bg-[#382b27] text-white text-xs sm:text-sm font-bold shadow-md font-sans-clean cursor-pointer"
              >
                More Fireworks! 🎆
              </button>

              <button
                onClick={handleReset}
                title="Wrap surprise box again"
                className="p-2.5 rounded-xl bg-[#f4e8e2] hover:bg-[#ede0d8] text-[#4a3a35] border border-[#d8c5bc] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      )}

      {/* Fullscreen Photo Lightbox Modal */}
      {showFullImageModal && photoUrl && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setShowFullImageModal(false)}
        >
          <div 
            className="relative max-w-lg w-full bg-white p-3 rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowFullImageModal(false)}
              className="absolute -top-3 -right-3 p-2 rounded-full bg-[#4a3a35] text-white shadow-lg hover:scale-110 transition-transform"
            >
              <X className="w-4 h-4" />
            </button>
            <img
              src={photoUrl}
              alt="Rahat and Jemi Full"
              referrerPolicy="no-referrer"
              className="w-full max-h-[75vh] object-contain rounded-xl"
            />
            <p className="mt-2 text-center font-serif-luxury italic text-[#4a3a35] font-bold text-sm">
              Rahat &amp; Jubaida Haque (Jemi) &bull; Eternal Devotion
            </p>
          </div>
        </div>
      )}

    </div>
  );
};
