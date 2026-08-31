import React, { useState } from 'react';
import { TabScene, RomanticTheme } from './types';
import { HeaderNavigation } from './components/HeaderNavigation';
import { GrandRevealHero } from './components/GrandRevealHero';
import { RoseWishSanctuary } from './components/RoseWishSanctuary';
import { LoveLetterSanctuary } from './components/LoveLetterSanctuary';
import { ReasonsWhyJar } from './components/ReasonsWhyJar';
import { LoveStoryCapsule } from './components/LoveStoryCapsule';
import { SurpriseLoveBox } from './components/SurpriseLoveBox';
import { KeepsakeCardMaker } from './components/KeepsakeCardMaker';
import { FloatingParticlesOverlay } from './components/FloatingParticlesOverlay';
import { Heart, Sparkles, Flower2 } from 'lucide-react';
import { launchGrandFireworks, launchRoseShower } from './utils/celebrationEffects';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabScene>('universe');
  const [currentTheme, setCurrentTheme] = useState<RomanticTheme>('natural-linen');

  const getThemeBackground = () => {
    switch (currentTheme) {
      case 'terracotta-clay':
        return 'bg-[#fff6f2]';
      case 'rose-blush':
        return 'bg-[#fff5f6]';
      case 'sage-earth':
        return 'bg-[#f8faf6]';
      default:
        return 'bg-[#fffaf8]';
    }
  };

  return (
    <div className={`min-h-screen text-[#4a3a35] relative transition-colors duration-700 ${getThemeBackground()} overflow-x-hidden font-sans-clean`}>
      
      {/* Natural Tones Ambient Atmosphere Blurs */}
      <div className="fixed top-[-100px] right-[-100px] w-[500px] h-[500px] bg-[#f7e1d7] rounded-full blur-[120px] opacity-60 pointer-events-none z-0"></div>
      <div className="fixed bottom-[-50px] left-[-50px] w-[450px] h-[450px] bg-[#fde2e4] rounded-full blur-[110px] opacity-70 pointer-events-none z-0"></div>
      <div className="fixed top-[40%] right-[5%] w-[350px] h-[350px] bg-[#f5e6de] rounded-full blur-[100px] opacity-50 pointer-events-none z-0"></div>

      {/* Floating Interactive Canvas Rose Petals */}
      <FloatingParticlesOverlay />

      {/* Top Floating Glass Navigation */}
      <HeaderNavigation
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        currentTheme={currentTheme}
        onSelectTheme={setCurrentTheme}
      />

      {/* Main Multi-Scene Router */}
      <main className="relative z-10 w-full min-h-screen">
        {currentTab === 'universe' && (
          <GrandRevealHero
            theme={currentTheme}
            onNavigate={setCurrentTab}
          />
        )}

        {currentTab === 'rose' && (
          <RoseWishSanctuary />
        )}

        {currentTab === 'letter' && (
          <LoveLetterSanctuary />
        )}

        {currentTab === 'reasons' && (
          <ReasonsWhyJar />
        )}

        {currentTab === 'timeline' && (
          <LoveStoryCapsule />
        )}

        {currentTab === 'surprise' && (
          <SurpriseLoveBox />
        )}

        {currentTab === 'keepsake' && (
          <KeepsakeCardMaker />
        )}
      </main>

      {/* Floating Bottom Quick Rose & Love Shower Trigger */}
      <aside aria-label="Celebration controls" className="fixed bottom-4 right-4 z-40 flex items-center gap-2">
        <button
          id="floating-love-burst-btn"
          onClick={() => {
            launchRoseShower();
            launchGrandFireworks();
          }}
          title="Shower Roses & Stardust for Jemi"
          className="group flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#4a3a35] hover:bg-[#382b27] text-white font-bold text-xs sm:text-sm shadow-xl glow-terracotta hover:scale-105 active:scale-95 transition-all cursor-pointer border border-[#8e7d77]/30"
        >
          <Flower2 className="w-4 h-4 text-[#f4dcd6] animate-spin [animation-duration:8s]" />
          <span className="hidden sm:inline font-sans-clean font-medium tracking-wide">Rose Shower</span>
          <Sparkles className="w-4 h-4 text-[#e0a899]" />
        </button>
      </aside>

      {/* Natural Tones Romantic Footer */}
      <footer className="relative z-20 py-8 border-t border-[#4a3a35]/10 text-center text-xs text-[#7c635b] font-serif-luxury bg-white/70 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 flex flex-col items-center gap-2">
          <p className="flex items-center justify-center gap-2 text-sm text-[#4a3a35]">
            <span className="font-sans-clean text-xs uppercase tracking-[0.2em] text-[#8e7d77]">Crafted with deepest devotion by</span>
            <strong className="text-[#a65341] font-cursive text-2xl font-normal">Rahat</strong>
            <span className="font-sans-clean text-xs uppercase tracking-[0.2em] text-[#8e7d77]">for his beloved</span>
            <strong className="text-[#4a3a35] font-cursive text-2xl font-normal">Jubaida Haque Jemi</strong>
          </p>
          <div className="max-w-[300px] h-[1px] bg-gradient-to-r from-transparent via-[#4a3a35]/25 to-transparent w-full my-1"></div>
          <span className="text-[11px] text-[#8e7d77] tracking-[0.3em] uppercase font-sans-clean font-medium">
            Forever &bull; Always &bull; 2024 & Beyond
          </span>
        </div>
      </footer>

    </div>
  );
}

