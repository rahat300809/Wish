import React, { useState, useEffect } from 'react';
import { TabScene, RomanticTheme } from '../types';
import { Sparkles, Gift, BookHeart, Flame, ArrowRight, Flower2, Cake, Crown, PartyPopper, Heart, Music } from 'lucide-react';
import { audioEngine } from '../audio/RomanticAudioEngine';
import { launchGrandFireworks, launchRoseShower } from '../utils/celebrationEffects';
import { getSavedCouplePhoto } from '../utils/photoStorage';

interface GrandRevealHeroProps {
  theme: RomanticTheme;
  onNavigate: (tab: TabScene) => void;
}

export const GrandRevealHero: React.FC<GrandRevealHeroProps> = ({
  onNavigate,
}) => {
  const [lastClickedQuote, setLastClickedQuote] = useState(0);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  useEffect(() => {
    setPhotoUrl(getSavedCouplePhoto());
    const handlePhotoUpdated = () => setPhotoUrl(getSavedCouplePhoto());
    window.addEventListener('couple_photo_updated', handlePhotoUpdated);
    return () => window.removeEventListener('couple_photo_updated', handlePhotoUpdated);
  }, []);

  const birthdayAffirmations = [
    '"Happy Birthday to my greatest blessing and eternal companion, Jemi."',
    '"Every year with you is a gift I thank Allah for every single day."',
    '"You make this world softer, warmer, and endlessly beautiful."',
    '"May your new year be showered with boundless joy, peace, and health."',
    '"Rahat loves Jubaida Haque Jemi beyond words and time."',
  ];

  const handleNextAffirmation = () => {
    audioEngine.playChime(1.15);
    setLastClickedQuote((prev) => (prev + 1) % birthdayAffirmations.length);
    launchRoseShower();
  };

  const handleCakeShortcut = () => {
    audioEngine.playChime(1.2);
    launchGrandFireworks();
    onNavigate('cake');
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-between pt-24 pb-12 px-4 sm:px-6 overflow-hidden">
      
      {/* Clean Aesthetic Ambient Warmth Backdrop (No distracting 3D spinning animations) */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-b from-[#fceae5] via-[#f9e2db] to-transparent blur-[100px] rounded-full pointer-events-none opacity-80" />
      <div className="absolute bottom-16 right-10 w-[350px] h-[350px] bg-[#f5e6de] blur-[90px] rounded-full pointer-events-none opacity-60" />

      {/* Top Banner / Salutation Badge */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto mt-2 sm:mt-4">
        
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/95 border border-[#a65341]/30 text-[#a65341] text-xs sm:text-sm font-semibold tracking-wide shadow-sm backdrop-blur-md mb-4 animate-fadeIn">
          <Crown className="w-4 h-4 text-[#d4af37]" />
          <span className="uppercase tracking-[0.25em] font-sans-clean text-[11px] font-bold text-[#8e7d77]">
            A Sacred Birthday Tribute &bull; 2024
          </span>
          <Sparkles className="w-4 h-4 text-[#a65341]" />
        </div>

        {/* Hero Title with Dignified Natural Tones Typography */}
        <div className="mb-3">
          <span className="uppercase tracking-[0.4em] text-[12px] sm:text-[13px] font-sans-clean text-[#8e7d77] block mb-2 font-bold">
            Happy Birthday to My Beloved Wife
          </span>
          
          <h1 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight text-[#4a3a35] leading-[1.05]">
            Jubaida Haque<br />
            <span className="italic font-serif-luxury text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-[#a65341] drop-shadow-sm inline-block mt-1">
              Jemi
            </span>
          </h1>
        </div>

        {/* Subtle Natural Tones Divider */}
        <div className="max-w-[500px] h-[1px] bg-gradient-to-r from-transparent via-[#4a3a35]/30 to-transparent w-full my-3"></div>

        <p className="font-serif-luxury text-lg sm:text-2xl text-[#6d5a54] italic max-w-2xl leading-relaxed mx-auto">
          &ldquo;You are the sweetest grace in my life. On your birthday, my soul celebrates the day you came into this world. Happy Birthday, my queen.&rdquo;
        </p>

        {/* Devotion Emblems */}
        <div className="mt-6 flex items-center justify-center gap-8 sm:gap-14">
          <div className="flex flex-col items-center">
            <span className="text-3xl sm:text-4xl font-light italic font-serif-luxury text-[#4a3a35]">Eternal</span>
            <span className="uppercase tracking-[0.25em] text-[9px] font-sans-clean font-black text-[#8e7d77]">Devotion</span>
          </div>

          <div 
            onClick={handleNextAffirmation}
            className="w-14 h-14 rounded-full border border-[#4a3a35]/30 flex items-center justify-center p-1.5 cursor-pointer hover:scale-110 active:scale-95 transition-transform bg-white shadow-sm"
            title="Read Next Birthday Whisper"
          >
            <div className="w-full h-full rounded-full bg-[#4a3a35] flex items-center justify-center text-white shadow-inner">
              <PartyPopper className="w-5 h-5 text-amber-300" />
            </div>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-3xl sm:text-4xl font-light italic font-serif-luxury text-[#4a3a35]">Infinite</span>
            <span className="uppercase tracking-[0.25em] text-[9px] font-sans-clean font-black text-[#8e7d77]">Adoration</span>
          </div>
        </div>

        {/* Dynamic Birthday Affirmation Pill */}
        <div 
          onClick={handleNextAffirmation}
          className="mt-5 px-6 py-2.5 rounded-full bg-white/90 border border-[#4a3a35]/20 text-[#6d5a54] text-sm sm:text-base font-serif-luxury italic backdrop-blur-md shadow-sm hover:border-[#a65341] cursor-pointer transition-all hover:scale-[1.02]"
        >
          {birthdayAffirmations[lastClickedQuote]}
        </div>
      </div>

      {/* Main Birthday Spotlight Card: Cake Cutting & Celebration Gateway */}
      <div className="relative z-10 my-8 w-full max-w-2xl mx-auto p-6 sm:p-8 rounded-3xl bg-white/95 border-2 border-[#e8d7cf] shadow-xl backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-6 text-[#4a3a35]">
        
        {/* Left Side: Photo or Cake Icon */}
        <div className="flex items-center gap-4">
          {photoUrl ? (
            <div className="w-20 h-24 sm:w-24 sm:h-28 rounded-2xl overflow-hidden border-2 border-[#a65341]/60 shadow-md flex-shrink-0 bg-neutral-100">
              <img
                src={photoUrl}
                alt="Rahat and Jemi"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#f4e8e2] border border-[#d8c5bc] flex items-center justify-center flex-shrink-0">
              <Cake className="w-10 h-10 text-[#a65341]" />
            </div>
          )}

          <div className="text-left">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#a65341] font-sans-clean">
              <Sparkles className="w-3 h-3" />
              <span>Special Feature</span>
            </div>
            <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#4a3a35]">
              Birthday Cake Cutting
            </h3>
            <p className="text-xs text-[#6d5a54] font-sans-clean mt-0.5 leading-relaxed">
              Blow out golden sparkler candles, slice the royal cake with Rahat, and make a secret wish.
            </p>
          </div>
        </div>

        {/* Right Side: Direct Action Button */}
        <div className="flex flex-col w-full sm:w-auto gap-2">
          <button
            id="hero-cut-cake-btn"
            onClick={handleCakeShortcut}
            className="px-6 py-3.5 rounded-2xl bg-[#4a3a35] hover:bg-[#382b27] text-white font-bold text-sm shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer font-sans-clean whitespace-nowrap"
          >
            <Cake className="w-4 h-4 text-amber-300" />
            <span>Cut Birthday Cake 🎂</span>
          </button>

          <button
            onClick={() => {
              audioEngine.playHappyBirthdayMelody();
              launchGrandFireworks();
            }}
            className="px-4 py-2 rounded-xl bg-[#fffaf8] hover:bg-[#f4e8e2] border border-[#d8c5bc] text-xs font-semibold text-[#4a3a35] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Music className="w-3.5 h-3.5 text-[#a65341]" />
            <span>Play Birthday Song 🎵</span>
          </button>
        </div>

      </div>

      {/* Bottom Exploration Grid */}
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4">
          
          {/* Card 1: Cake Cutting */}
          <div
            onClick={() => onNavigate('cake')}
            id="explore-card-cake"
            className="group p-4 rounded-2xl bg-[#fff7f4] hover:bg-white border-2 border-[#a65341]/40 hover:border-[#a65341] shadow-sm hover:shadow-md backdrop-blur-xl cursor-pointer transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="p-2.5 rounded-xl bg-[#a65341] text-white">
                <Cake className="w-5 h-5" />
              </div>
              <ArrowRight className="w-4 h-4 text-[#8e7d77] group-hover:text-[#4a3a35] group-hover:translate-x-1 transition-all" />
            </div>
            <h2 className="text-base font-bold text-[#4a3a35] font-serif-luxury group-hover:text-[#a65341] transition-colors">
              Cake Cutting 🎂
            </h2>
            <p className="text-xs text-[#6d5a54] mt-1 line-clamp-2 font-sans-clean leading-relaxed">
              Blow candles &amp; slice your royal birthday confection.
            </p>
          </div>

          {/* Card 2: Rose for Jemi */}
          <div
            onClick={() => onNavigate('rose')}
            id="explore-card-rose"
            className="group p-4 rounded-2xl bg-white/80 hover:bg-white border border-[#4a3a35]/15 hover:border-[#a65341]/40 shadow-sm hover:shadow-md backdrop-blur-xl cursor-pointer transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="p-2.5 rounded-xl bg-[#f7ede8] text-[#a65341] group-hover:bg-[#4a3a35] group-hover:text-white transition-colors">
                <Flower2 className="w-5 h-5" />
              </div>
              <ArrowRight className="w-4 h-4 text-[#8e7d77] group-hover:text-[#4a3a35] group-hover:translate-x-1 transition-all" />
            </div>
            <h2 className="text-base font-bold text-[#4a3a35] font-serif-luxury group-hover:text-[#a65341] transition-colors">
              Rose Sanctuary 🌹
            </h2>
            <p className="text-xs text-[#6d5a54] mt-1 line-clamp-2 font-sans-clean leading-relaxed">
              Offer blooming roses and whisper eternal rose wishes.
            </p>
          </div>

          {/* Card 3: Love Letter */}
          <div
            onClick={() => onNavigate('letter')}
            id="explore-card-letter"
            className="group p-4 rounded-2xl bg-white/80 hover:bg-white border border-[#4a3a35]/15 hover:border-[#a65341]/40 shadow-sm hover:shadow-md backdrop-blur-xl cursor-pointer transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="p-2.5 rounded-xl bg-[#fde2e4]/70 text-[#a65341] group-hover:bg-[#4a3a35] group-hover:text-white transition-colors">
                <BookHeart className="w-5 h-5" />
              </div>
              <ArrowRight className="w-4 h-4 text-[#8e7d77] group-hover:text-[#4a3a35] group-hover:translate-x-1 transition-all" />
            </div>
            <h2 className="text-base font-bold text-[#4a3a35] font-serif-luxury group-hover:text-[#a65341] transition-colors">
              Birthday Letter 📜
            </h2>
            <p className="text-xs text-[#6d5a54] mt-1 line-clamp-2 font-sans-clean leading-relaxed">
              Heartfelt written vows sealed exclusively from Rahat.
            </p>
          </div>

          {/* Card 4: Reasons Why */}
          <div
            onClick={() => onNavigate('reasons')}
            id="explore-card-reasons"
            className="group p-4 rounded-2xl bg-white/80 hover:bg-white border border-[#4a3a35]/15 hover:border-[#a65341]/40 shadow-sm hover:shadow-md backdrop-blur-xl cursor-pointer transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="p-2.5 rounded-xl bg-[#f7e1d7] text-[#a65341] group-hover:bg-[#4a3a35] group-hover:text-white transition-colors">
                <Heart className="w-5 h-5" />
              </div>
              <ArrowRight className="w-4 h-4 text-[#8e7d77] group-hover:text-[#4a3a35] group-hover:translate-x-1 transition-all" />
            </div>
            <h2 className="text-base font-bold text-[#4a3a35] font-serif-luxury group-hover:text-[#a65341] transition-colors">
              Why I Love You
            </h2>
            <p className="text-xs text-[#6d5a54] mt-1 line-clamp-2 font-sans-clean leading-relaxed">
              Glow jar with the reasons Jemi is Rahat&apos;s whole world.
            </p>
          </div>

          {/* Card 5: Sacred Memories */}
          <div
            onClick={() => onNavigate('timeline')}
            id="explore-card-timeline"
            className="group p-4 rounded-2xl bg-white/80 hover:bg-white border border-[#4a3a35]/15 hover:border-[#a65341]/40 shadow-sm hover:shadow-md backdrop-blur-xl cursor-pointer transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="p-2.5 rounded-xl bg-[#fde2e4]/70 text-[#a65341] group-hover:bg-[#4a3a35] group-hover:text-white transition-colors">
                <Sparkles className="w-5 h-5" />
              </div>
              <ArrowRight className="w-4 h-4 text-[#8e7d77] group-hover:text-[#4a3a35] group-hover:translate-x-1 transition-all" />
            </div>
            <h2 className="text-base font-bold text-[#4a3a35] font-serif-luxury group-hover:text-[#a65341] transition-colors">
              Sacred Memories
            </h2>
            <p className="text-xs text-[#6d5a54] mt-1 line-clamp-2 font-sans-clean leading-relaxed">
              Timeless milestones celebrating our eternal love story.
            </p>
          </div>

          {/* Card 6: Surprise Gift Box */}
          <div
            onClick={() => onNavigate('surprise')}
            id="explore-card-surprise"
            className="group p-4 rounded-2xl bg-white/80 hover:bg-white border border-[#c97b6b]/30 hover:border-[#a65341] shadow-sm hover:shadow-md backdrop-blur-xl cursor-pointer transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="p-2.5 rounded-xl bg-[#c97b6b]/20 text-[#8c4333] group-hover:bg-[#4a3a35] group-hover:text-white transition-colors">
                <Gift className="w-5 h-5" />
              </div>
              <ArrowRight className="w-4 h-4 text-[#8e7d77] group-hover:text-[#4a3a35] group-hover:translate-x-1 transition-all" />
            </div>
            <h2 className="text-base font-bold text-[#4a3a35] font-serif-luxury group-hover:text-[#a65341] transition-colors">
              Surprise Gift 🎁
            </h2>
            <p className="text-xs text-[#6d5a54] mt-1 line-clamp-2 font-sans-clean leading-relaxed">
              Unwrap the secret gift package with your couple portrait!
            </p>
          </div>

        </div>

        {/* Grand Action Buttons row */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            id="btn-rose-shower-hero"
            onClick={launchRoseShower}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/90 hover:bg-white border border-[#4a3a35]/20 hover:border-[#a65341] text-[#4a3a35] text-xs sm:text-sm font-medium transition-all shadow-sm cursor-pointer"
          >
            <Flower2 className="w-4 h-4 text-[#a65341]" />
            <span className="font-sans-clean">Shower Velvet Rose Petals 🌹</span>
          </button>

          <button
            id="btn-fireworks-hero"
            onClick={launchGrandFireworks}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#4a3a35] hover:bg-[#382b27] border border-[#4a3a35] text-white text-xs sm:text-sm font-medium transition-all shadow-md cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#fde2e4]" />
            <span className="font-sans-clean">Launch Birthday Fireworks 🎆</span>
          </button>
        </div>
      </div>

    </div>
  );
};
