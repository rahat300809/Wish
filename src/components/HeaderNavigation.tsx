import React, { useState } from 'react';
import { TabScene, RomanticTheme } from '../types';
import { 
  Heart, 
  Sparkles, 
  BookHeart, 
  Flower2, 
  Gift, 
  Volume2, 
  VolumeX, 
  Palette, 
  Image as ImageIcon 
} from 'lucide-react';
import { audioEngine } from '../audio/RomanticAudioEngine';
import { launchGrandFireworks, launchRoseShower } from '../utils/celebrationEffects';

interface HeaderNavigationProps {
  currentTab: TabScene;
  onSelectTab: (tab: TabScene) => void;
  currentTheme: RomanticTheme;
  onSelectTheme: (theme: RomanticTheme) => void;
}

export const HeaderNavigation: React.FC<HeaderNavigationProps> = ({
  currentTab,
  onSelectTab,
  currentTheme,
  onSelectTheme,
}) => {
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [showThemePicker, setShowThemePicker] = useState(false);

  const handleToggleMusic = () => {
    const active = audioEngine.toggleMusic();
    setIsPlayingMusic(active);
  };

  const handleTabClick = (tab: TabScene) => {
    audioEngine.playChime(1.0);
    onSelectTab(tab);
  };

  const navItems: Array<{ id: TabScene; label: string; icon: React.ReactNode }> = [
    { id: 'universe', label: '3D Celestial Heart', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'rose', label: 'Rose for Jemi 🌹', icon: <Flower2 className="w-4 h-4 text-[#a65341]" /> },
    { id: 'letter', label: 'Love Letter', icon: <BookHeart className="w-4 h-4" /> },
    { id: 'reasons', label: 'Why I Love You', icon: <Heart className="w-4 h-4" /> },
    { id: 'timeline', label: 'Sacred Memories', icon: <Heart className="w-4 h-4 text-[#a65341]" /> },
    { id: 'surprise', label: 'Surprise Gift', icon: <Gift className="w-4 h-4" /> },
    { id: 'keepsake', label: 'Keepsake Card', icon: <ImageIcon className="w-4 h-4" /> },
  ];

  const themes: Array<{ id: RomanticTheme; name: string; color: string }> = [
    { id: 'natural-linen', name: 'Natural Linen & Espresso', color: 'bg-[#4a3a35]' },
    { id: 'terracotta-clay', name: 'Warm Terracotta & Clay', color: 'bg-[#a65341]' },
    { id: 'rose-blush', name: 'Soft Blush & Dusty Rose', color: 'bg-[#d98e7d]' },
    { id: 'sage-earth', name: 'Sage Botanical & Sand', color: 'bg-[#7c8b74]' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 py-3 sm:px-6">
      <div className="max-w-7xl mx-auto backdrop-blur-xl bg-white/85 border border-[#4a3a35]/15 shadow-lg rounded-2xl px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 transition-all duration-300">
        
        {/* Monogram Brand */}
        <div 
          onClick={() => handleTabClick('universe')}
          className="flex items-center gap-2 cursor-pointer group"
          id="brand-monogram"
        >
          <div className="w-10 h-10 rounded-full bg-[#4a3a35] p-[2px] shadow-md group-hover:scale-105 transition-transform flex items-center justify-center">
            <div className="w-full h-full bg-[#fffaf8] rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5 text-[#a65341] fill-[#a65341] group-hover:scale-110 transition-transform duration-300" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 font-serif-luxury text-base sm:text-lg font-bold text-[#4a3a35]">
              <span>Rahat</span>
              <span className="text-[#a65341] text-xs">♥</span>
              <span className="italic">Jubaida (Jemi)</span>
            </div>
            <span className="text-[10px] text-[#8e7d77] tracking-[0.25em] uppercase font-sans-clean font-bold">
              Eternal Devotion
            </span>
          </div>
        </div>

        {/* Tab Navigation Menu */}
        <nav className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto py-1 max-w-full scrollbar-none">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-tab-${item.id}`}
                onClick={() => handleTabClick(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap select-none ${
                  isActive
                    ? 'bg-[#4a3a35] text-white shadow-md border border-[#382b27]'
                    : 'text-[#6d5a54] hover:text-[#4a3a35] hover:bg-[#f4e8e2]/70 border border-transparent'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Controls: Music, Celebrations, Themes */}
        <div className="flex items-center gap-2">
          {/* Music Ambient Synthesizer Button */}
          <button
            id="audio-synth-toggle"
            onClick={handleToggleMusic}
            title={isPlayingMusic ? 'Mute Ambient Melody' : 'Play Romantic Ambient Melody'}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all duration-300 ${
              isPlayingMusic
                ? 'bg-[#f4e8e2] border-[#c97b6b] text-[#8c4333] shadow-sm'
                : 'bg-[#fffaf8] border-[#e8d7cf] text-[#6d5a54] hover:bg-[#f7ede8] hover:text-[#4a3a35]'
            }`}
          >
            {isPlayingMusic ? (
              <>
                <Volume2 className="w-4 h-4 text-[#a65341] animate-pulse" />
                <span className="hidden md:inline font-sans-clean">Melody On</span>
                {/* Visualizer bars */}
                <div className="flex items-center gap-0.5 h-3">
                  <span className="w-0.5 bg-[#a65341] rounded-full animate-bounce [animation-delay:0ms] h-2"></span>
                  <span className="w-0.5 bg-[#c97b6b] rounded-full animate-bounce [animation-delay:150ms] h-3"></span>
                  <span className="w-0.5 bg-[#d4af37] rounded-full animate-bounce [animation-delay:300ms] h-2.5"></span>
                </div>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-[#8e7d77]" />
                <span className="hidden md:inline font-sans-clean">Play Melody</span>
              </>
            )}
          </button>

          {/* Quick Fireworks / Rose Petals Shower */}
          <button
            id="celebrate-btn-nav"
            onClick={() => {
              launchGrandFireworks();
              launchRoseShower();
            }}
            title="Shower Roses & Confetti for Jemi!"
            className="p-2 rounded-xl bg-[#a65341] text-white shadow-sm hover:bg-[#8c4333] hover:scale-105 active:scale-95 transition-all"
          >
            <Sparkles className="w-4 h-4 text-[#fde2e4]" />
          </button>

          {/* Theme Palette Switcher */}
          <div className="relative">
            <button
              id="theme-picker-toggle"
              onClick={() => setShowThemePicker(!showThemePicker)}
              title="Change Natural Palette"
              className="p-2 rounded-xl bg-[#fffaf8] border border-[#e8d7cf] text-[#6d5a54] hover:text-[#4a3a35] hover:bg-[#f7ede8] transition-colors"
            >
              <Palette className="w-4 h-4" />
            </button>

            {showThemePicker && (
              <div 
                className="absolute right-0 mt-2 w-52 p-2 rounded-xl bg-white border border-[#e8d7cf] shadow-xl z-50 flex flex-col gap-1 backdrop-blur-2xl"
                onMouseLeave={() => setShowThemePicker(false)}
              >
                <div className="px-2 py-1 text-[10px] font-bold text-[#8e7d77] uppercase tracking-[0.2em] font-sans-clean">
                  Natural Harmony
                </div>
                {themes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      onSelectTheme(t.id);
                      setShowThemePicker(false);
                      audioEngine.playChime(1.2);
                    }}
                    className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-left transition-colors ${
                      currentTheme === t.id
                        ? 'bg-[#f4e8e2] text-[#4a3a35] border border-[#d8c5bc]'
                        : 'text-[#6d5a54] hover:bg-[#fbf5f2] hover:text-[#4a3a35]'
                    }`}
                  >
                    <span className={`w-3 h-3 rounded-full shadow-inner ${t.color}`} />
                    <span>{t.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </header>
  );
};
