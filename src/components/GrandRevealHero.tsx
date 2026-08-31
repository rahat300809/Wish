import React, { useState } from 'react';
import { TabScene, RomanticTheme } from '../types';
import { ThreeGalaxyScene } from './ThreeGalaxyScene';
import { Heart, Sparkles, Gift, BookHeart, Flame, ArrowRight, Flower2 } from 'lucide-react';
import { audioEngine } from '../audio/RomanticAudioEngine';
import { launchGrandFireworks, launchRoseShower } from '../utils/celebrationEffects';

interface GrandRevealHeroProps {
  theme: RomanticTheme;
  onNavigate: (tab: TabScene) => void;
}

export const GrandRevealHero: React.FC<GrandRevealHeroProps> = ({
  theme,
  onNavigate,
}) => {
  const [pulseCount, setPulseCount] = useState(0);
  const [lastClickedQuote, setLastClickedQuote] = useState(0);

  const loveAffirmations = [
    '"You are the light of my universe, Jemi."',
    '"Every beat of my heart whispers your sweet name."',
    '"With you, forever will never be long enough."',
    '"You are my greatest answered prayer, my queen."',
    '"Rahat loves Jubaida beyond the ends of time."',
  ];

  const handleHeartbeatClick = () => {
    audioEngine.playHeartbeat();
    setPulseCount((prev) => prev + 1);
    setLastClickedQuote((prev) => (prev + 1) % loveAffirmations.length);
    if (pulseCount % 3 === 2) {
      launchRoseShower();
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-between pt-24 pb-12 px-4 sm:px-6 overflow-hidden">
      
      {/* 3D WebGL Three.js Particle Universe Background */}
      <ThreeGalaxyScene
        theme={theme}
        onHeartClick={handleHeartbeatClick}
        interactiveSpeed={1}
      />

      {/* Floating Ambient Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] bg-rose-600/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[360px] h-[360px] bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Top Banner / Salutation Badge */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto mt-2 sm:mt-4 pointer-events-none">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-[#4a3a35]/20 text-[#6d5a54] text-xs sm:text-sm font-medium tracking-wide shadow-sm backdrop-blur-md mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#a65341]" />
          <span className="uppercase tracking-[0.3em] font-sans-clean text-[11px] font-bold text-[#8e7d77]">Forever & Always &bull; 3D Tribute</span>
          <Sparkles className="w-3.5 h-3.5 text-[#a65341]" />
        </div>

        {/* Hero Title with Natural Tones Typography */}
        <div className="mb-2">
          <span className="uppercase tracking-[0.5em] text-[12px] font-sans-clean text-[#8e7d77] block mb-2 font-bold">
            A Tribute to My Dearest
          </span>
          <h1 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight bg-gradient-to-b from-[#4a3a35] to-[#7c635b] bg-clip-text text-transparent leading-[0.95]">
            Jubaida Haque<br />
            <span className="italic font-serif-luxury pl-8 sm:pl-16 text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-[#a65341] drop-shadow-sm">
              Jemi
            </span>
          </h1>
        </div>

        {/* Subtle Natural Tones Divider */}
        <div className="max-w-[550px] h-[1px] bg-gradient-to-r from-transparent via-[#4a3a35]/30 to-transparent w-full my-3"></div>

        <p className="font-sans-clean text-base sm:text-lg tracking-wide max-w-2xl leading-relaxed text-[#6d5a54]">
          &ldquo;In the garden of my life, you are the most radiant blossom. Every heartbeat of mine carries your name. You are my light, my joy, and my entire world.&rdquo;
        </p>

        {/* Natural Tones Devotion Emblems */}
        <div className="mt-6 flex items-center gap-8 sm:gap-14 pointer-events-auto">
          <div className="flex flex-col items-center">
            <span className="text-3xl sm:text-4xl font-light italic font-serif-luxury text-[#4a3a35]">Unlimited</span>
            <span className="uppercase tracking-[0.25em] text-[9px] font-sans-clean font-black text-[#8e7d77]">Devotion</span>
          </div>

          <div 
            onClick={handleHeartbeatClick}
            className="w-14 h-14 rounded-full border border-[#4a3a35] flex items-center justify-center p-1.5 cursor-pointer hover:scale-110 active:scale-95 transition-transform bg-white/50 shadow-sm"
            title="Send Heartbeat to Jemi"
          >
            <div className="w-full h-full rounded-full bg-[#4a3a35] flex items-center justify-center text-white shadow-inner">
              <Heart className="w-5 h-5 fill-white text-white animate-pulse" />
            </div>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-3xl sm:text-4xl font-light italic font-serif-luxury text-[#4a3a35]">Infinite</span>
            <span className="uppercase tracking-[0.25em] text-[9px] font-sans-clean font-black text-[#8e7d77]">Adoration</span>
          </div>
        </div>

        {/* Dynamic Affirmation Pill */}
        <div className="mt-4 px-5 py-1.5 rounded-full bg-white/70 border border-[#4a3a35]/15 text-[#7c635b] text-sm font-serif-luxury italic backdrop-blur-md shadow-sm pointer-events-auto">
          {loveAffirmations[lastClickedQuote]}
        </div>
      </div>

      {/* Center Interactive 3D Heartbeat Callout */}
      <div className="relative z-10 my-6 flex flex-col items-center text-center">
        <button
          id="hero-heartbeat-btn"
          onClick={handleHeartbeatClick}
          className="group relative flex items-center gap-3 px-6 py-3 rounded-full bg-[#4a3a35] hover:bg-[#382b27] border border-[#7c635b]/40 shadow-xl glow-terracotta text-white hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
        >
          <div className="relative">
            <Heart className="w-5 h-5 text-[#fde2e4] fill-[#fde2e4] group-hover:scale-125 transition-transform duration-300" />
            <span className="absolute inset-0 rounded-full bg-white/30 animate-ping" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs sm:text-sm font-bold tracking-wide font-sans-clean">Touch Our 3D Heart</span>
            <span className="text-[10px] text-[#f7e1d7]">
              {pulseCount === 0 ? 'Click or rotate 3D heart above' : `${pulseCount} Loving Heartbeats Sent ♥`}
            </span>
          </div>
          <Flame className="w-4 h-4 text-[#e0a899] animate-pulse" />
        </button>
      </div>

      {/* Bottom Floating Interactive Exploration Deck */}
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
          
          {/* Card 1: Rose for Jemi */}
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
              Rose for Jemi 🌹
            </h2>
            <p className="text-xs text-[#6d5a54] mt-1 line-clamp-2 font-sans-clean leading-relaxed">
              Offer blooming roses, pluck sweet whispers, and dedicate eternal rose wishes.
            </p>
          </div>

          {/* Card 2: Love Letter */}
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
              My Love Letter
            </h2>
            <p className="text-xs text-[#6d5a54] mt-1 line-clamp-2 font-sans-clean leading-relaxed">
              Read Rahat&apos;s heartfelt written vows and love letter sealed exclusively for Jemi.
            </p>
          </div>

          {/* Card 3: Reasons Why */}
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
              Open glowing reasons and memories that make Jemi the most special person.
            </p>
          </div>

          {/* Card 4: Sacred Memories */}
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
              Our sacred milestones celebrating our infinite, timeless love story.
            </p>
          </div>

          {/* Card 5: Surprise Gift Box */}
          <div
            onClick={() => onNavigate('surprise')}
            id="explore-card-surprise"
            className="group p-4 rounded-2xl bg-[#fff7f4] hover:bg-white border border-[#c97b6b]/30 hover:border-[#a65341] shadow-sm hover:shadow-md backdrop-blur-xl cursor-pointer transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="p-2.5 rounded-xl bg-[#c97b6b]/20 text-[#8c4333] group-hover:bg-[#4a3a35] group-hover:text-white transition-colors">
                <Gift className="w-5 h-5 animate-bounce" />
              </div>
              <ArrowRight className="w-4 h-4 text-[#8e7d77] group-hover:text-[#4a3a35] group-hover:translate-x-1 transition-all" />
            </div>
            <h2 className="text-base font-bold text-[#4a3a35] font-serif-luxury group-hover:text-[#a65341] transition-colors">
              Surprise Gift
            </h2>
            <p className="text-xs text-[#6d5a54] mt-1 line-clamp-2 font-sans-clean leading-relaxed">
              Unwrap the glowing surprise package prepared by Rahat!
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
            <span className="font-sans-clean">Launch Celestial Fireworks 🎆</span>
          </button>
        </div>
      </div>

    </div>
  );
};
