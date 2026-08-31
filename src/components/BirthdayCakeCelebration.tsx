import React, { useState, useEffect } from 'react';
import { 
  Cake, 
  Sparkles, 
  Heart, 
  Flame, 
  Gift, 
  RotateCcw, 
  Music, 
  Utensils, 
  Check, 
  Crown, 
  Volume2, 
  PartyPopper 
} from 'lucide-react';
import { audioEngine } from '../audio/RomanticAudioEngine';
import { launchGrandFireworks, launchRoseShower } from '../utils/celebrationEffects';
import { getSavedCouplePhoto } from '../utils/photoStorage';

interface CakeFlavor {
  id: string;
  name: string;
  frosting: string;
  baseColor: string;
  accentColor: string;
  layerColor: string;
  description: string;
  topper: string;
}

const CAKE_FLAVORS: CakeFlavor[] = [
  {
    id: 'velvet-rose',
    name: 'Royal Velvet & Rose Cream',
    frosting: 'from-[#e8a598] via-[#f7d6ce] to-[#fae8e0]',
    baseColor: 'bg-[#913d31]',
    accentColor: '#a65341',
    layerColor: '#7d2e23',
    description: 'Infused with organic rosewater cream, crimson velvet sponge, and edible 24k gold leaf flakes.',
    topper: '🌹',
  },
  {
    id: 'chocolate-belgian',
    name: 'Belgian Chocolate & Espresso Royale',
    frosting: 'from-[#4a342c] via-[#5c4033] to-[#3a2822]',
    baseColor: 'bg-[#3b2820]',
    accentColor: '#d4af37',
    layerColor: '#2b1b14',
    description: 'Layers of 70% dark Belgian ganache, hazelnut praline crunch, and velvety cocoa mousse.',
    topper: '👑',
  },
  {
    id: 'vanilla-berry',
    name: 'Madagascar Vanilla & Fresh Berries',
    frosting: 'from-[#fff5ea] via-[#faebd7] to-[#f4deb3]',
    baseColor: 'bg-[#f0e2cc]',
    accentColor: '#d64550',
    layerColor: '#e0c9a6',
    description: 'Pure vanilla bean sponge garnished with fresh hand-picked raspberries, blackberries, and spun sugar.',
    topper: '🍓',
  },
  {
    id: 'terracotta-caramel',
    name: 'Warm Caramel & Roasted Pistachio',
    frosting: 'from-[#e3a857] via-[#c68642] to-[#b37030]',
    baseColor: 'bg-[#8c5025]',
    accentColor: '#5c715e',
    layerColor: '#703e19',
    description: 'Salted butter caramel drizzle over crushed Sicilian pistachios and honeyed sponge.',
    topper: '✨',
  },
];

export const BirthdayCakeCelebration: React.FC = () => {
  const [selectedFlavor, setSelectedFlavor] = useState<CakeFlavor>(CAKE_FLAVORS[0]);
  const [candlesLit, setCandlesLit] = useState(true);
  const [isBlownOut, setIsBlownOut] = useState(false);
  const [cakeCutStage, setCakeCutStage] = useState<0 | 1 | 2>(0); // 0: Uncut, 1: Sliced, 2: Slice served/tasted
  const [candleCount, setCandleCount] = useState<number>(3);
  const [wishedText, setWishedText] = useState('');
  const [wishMade, setWishMade] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [playedSong, setPlayedSong] = useState(false);

  useEffect(() => {
    setPhotoUrl(getSavedCouplePhoto());
    const handlePhotoUpdated = () => setPhotoUrl(getSavedCouplePhoto());
    window.addEventListener('couple_photo_updated', handlePhotoUpdated);
    return () => window.removeEventListener('couple_photo_updated', handlePhotoUpdated);
  }, []);

  // Handle blowing out candles
  const handleBlowCandles = () => {
    if (!candlesLit) return;
    setCandlesLit(false);
    setIsBlownOut(true);
    audioEngine.playChime(1.4);
    audioEngine.playHappyBirthdayMelody();
    setPlayedSong(true);
    launchRoseShower();
    launchGrandFireworks();
  };

  // Relight candles
  const handleRelightCandles = () => {
    setCandlesLit(true);
    setIsBlownOut(false);
    audioEngine.playChime(1.1);
  };

  // Cut Cake Action
  const handleCutCake = () => {
    setCakeCutStage(1);
    audioEngine.playChime(1.2);
    launchGrandFireworks();
    launchRoseShower();
  };

  // Feed Slice Action
  const handleFeedSlice = () => {
    setCakeCutStage(2);
    audioEngine.playHeartbeat();
    launchRoseShower();
  };

  // Reset Cake
  const handleResetCake = () => {
    setCakeCutStage(0);
    setCandlesLit(true);
    setIsBlownOut(false);
    audioEngine.playChime(0.9);
  };

  // Play Birthday Tune
  const handlePlayBirthdayTune = () => {
    audioEngine.playHappyBirthdayMelody();
    launchGrandFireworks();
    setPlayedSong(true);
  };

  const handleMakeWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishedText.trim()) return;
    setWishMade(true);
    audioEngine.playChime(1.3);
    launchRoseShower();
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 max-w-6xl mx-auto flex flex-col items-center">
      
      {/* Header Banner */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/90 border border-[#a65341]/30 text-[#a65341] text-xs font-semibold uppercase tracking-[0.25em] mb-3 shadow-sm font-sans-clean">
          <PartyPopper className="w-3.5 h-3.5" />
          <span>Sacred Birthday Celebration</span>
          <Crown className="w-3.5 h-3.5 text-[#d4af37]" />
        </div>
        
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif-luxury text-[#4a3a35] font-medium tracking-tight">
          Happy Birthday, My Beloved <span className="text-[#a65341] italic">Jemi</span>
        </h1>
        
        <p className="font-serif-luxury text-base sm:text-xl text-[#7c635b] mt-2 italic max-w-2xl mx-auto leading-relaxed">
          &ldquo;Today the universe celebrates the birth of the most beautiful soul. Blow your candles, make your wish, and cut your birthday cake, my queen.&rdquo;
        </p>
      </div>

      {/* Flavor Selector Bar */}
      <div className="w-full max-w-3xl mb-8 p-3 rounded-2xl bg-white/80 border border-[#e8d7cf] backdrop-blur-md shadow-sm">
        <div className="flex items-center justify-between px-2 mb-2">
          <span className="text-xs uppercase tracking-[0.2em] font-sans-clean font-bold text-[#8e7d77] flex items-center gap-1.5">
            <Cake className="w-3.5 h-3.5 text-[#a65341]" />
            Choose Birthday Cake Confection
          </span>
          <span className="text-xs text-[#a65341] font-serif-luxury italic font-semibold">
            {selectedFlavor.name}
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {CAKE_FLAVORS.map((flavor) => {
            const isSelected = selectedFlavor.id === flavor.id;
            return (
              <button
                key={flavor.id}
                onClick={() => {
                  setSelectedFlavor(flavor);
                  audioEngine.playChime(1.05);
                }}
                className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#f4e8e2] border-[#a65341] shadow-sm text-[#4a3a35]'
                    : 'bg-white/60 border-[#e8d7cf] text-[#6d5a54] hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-base">{flavor.topper}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#a65341]" />}
                </div>
                <span className="font-sans-clean text-xs font-bold leading-snug mt-1 truncate">
                  {flavor.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Cake Stage & Table Showcase */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: The 3D Interactive Cake & Cutting Area (7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-center">
          
          <div className="relative w-full max-w-lg p-6 sm:p-10 rounded-3xl bg-white border-2 border-[#e8d7cf] shadow-xl backdrop-blur-xl flex flex-col items-center text-center overflow-hidden">
            
            {/* Ambient Warm Candle Aura */}
            <div className={`absolute -top-10 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full blur-3xl pointer-events-none transition-opacity duration-700 ${
              candlesLit ? 'bg-amber-300/30 opacity-100' : 'bg-rose-300/10 opacity-30'
            }`} />

            {/* Cake Status Banner */}
            <div className="mb-4 z-10">
              <span className="font-serif-luxury italic text-xs uppercase tracking-[0.25em] text-[#8e7d77] block mb-0.5">
                Handcrafted Specially For Jemi
              </span>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fbf5f2] border border-[#e8d7cf] text-[#4a3a35] text-xs font-bold">
                <span>{selectedFlavor.topper}</span>
                <span>{selectedFlavor.name}</span>
              </div>
            </div>

            {/* Visual 3D Tiered Birthday Cake */}
            <div className="relative my-6 flex flex-col items-center select-none">
              
              {/* Gold Plated Cake Topper */}
              <div className="relative z-30 mb-2 flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f7e1a0] to-[#c59b27] text-[#3a2c00] font-serif-luxury font-bold text-xs shadow-md border border-[#ecd27e] animate-pulse">
                <Crown className="w-3.5 h-3.5" />
                <span>Happy Birthday Jemi ♥</span>
                <Crown className="w-3.5 h-3.5" />
              </div>

              {/* Candles Array */}
              <div className="relative z-20 flex items-end justify-center gap-4 sm:gap-6 mb-1 h-14">
                {Array.from({ length: candleCount }).map((_, idx) => (
                  <div key={idx} className="relative flex flex-col items-center">
                    
                    {/* Flame with flickering animation */}
                    {candlesLit ? (
                      <div className="relative mb-0.5 flex flex-col items-center animate-bounce [animation-duration:1.8s]">
                        {/* Glow halo */}
                        <div className="absolute -top-1 w-6 h-6 bg-amber-400/40 rounded-full blur-sm animate-ping [animation-duration:2.5s]" />
                        {/* Flame Teardrop */}
                        <div className="w-3.5 h-5 bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-200 rounded-full rounded-b-none shadow-md" />
                        <div className="w-1 h-2 bg-blue-400 rounded-full -mt-1 opacity-70" />
                      </div>
                    ) : (
                      <div className="relative mb-1 flex flex-col items-center h-5 justify-end">
                        {/* Wisp of smoke */}
                        <div className="w-1 h-3 bg-neutral-400/60 rounded-full animate-pulse blur-[0.5px]" />
                      </div>
                    )}

                    {/* Candle Wick */}
                    <div className="w-0.5 h-2 bg-neutral-800" />

                    {/* Candle Stick */}
                    <div className="w-3.5 h-8 sm:h-10 rounded-sm bg-gradient-to-b from-[#fceade] via-[#e8a598] to-[#d98270] border-x border-[#c9715e] shadow-sm flex flex-col justify-between py-1">
                      <div className="w-full h-0.5 bg-white/70" />
                      <div className="w-full h-0.5 bg-[#a65341]" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Tier 1 (Top Small Tier) */}
              <div className={`relative z-10 w-44 sm:w-52 h-14 rounded-t-2xl bg-gradient-to-r ${selectedFlavor.frosting} border-2 border-white/60 shadow-md flex items-center justify-center overflow-hidden`}>
                {/* Frosting Drips / Cream Rosettes */}
                <div className="absolute top-0 left-0 right-0 h-3 bg-white/50 flex justify-around">
                  <span className="w-2.5 h-3 bg-white rounded-full"></span>
                  <span className="w-2.5 h-4 bg-white rounded-full"></span>
                  <span className="w-2.5 h-3 bg-white rounded-full"></span>
                  <span className="w-2.5 h-4 bg-white rounded-full"></span>
                  <span className="w-2.5 h-3 bg-white rounded-full"></span>
                </div>
                <span className="font-serif-luxury italic text-xs font-bold text-[#4a3a35] opacity-80 pt-2">
                  Jemi &hearts; 2024
                </span>
              </div>

              {/* Tier 2 (Bottom Large Main Tier) */}
              <div className={`relative w-64 sm:w-76 h-20 rounded-t-2xl bg-gradient-to-r ${selectedFlavor.frosting} border-2 border-white/70 shadow-lg flex items-center justify-center overflow-hidden`}>
                
                {/* Visual Cake Cut Slice Divider Effect */}
                {cakeCutStage > 0 && (
                  <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-8 bg-[#4a3a35]/15 border-x-2 border-dashed border-[#a65341] flex flex-col justify-around py-1 animate-pulse">
                    <span className="text-[10px] text-center font-bold text-[#a65341]">✦</span>
                    <span className="text-[10px] text-center font-bold text-[#a65341]">✦</span>
                  </div>
                )}

                {/* Decorative Pearl Garland */}
                <div className="absolute bottom-1 left-2 right-2 flex justify-between px-2">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="w-2 h-2 rounded-full bg-white/90 shadow-sm border border-neutral-300" />
                  ))}
                </div>

                <span className="font-serif-luxury text-sm font-semibold text-[#4a3a35] tracking-widest uppercase">
                  Rahat &bull; Forever Devoted
                </span>
              </div>

              {/* Silver/Gold Platter Base */}
              <div className="w-72 sm:w-88 h-4 rounded-full bg-gradient-to-r from-[#d8c5bc] via-[#f7eee9] to-[#c2ada3] border border-[#a8958c] shadow-xl mt-[-2px] flex items-center justify-center">
                <div className="w-3/4 h-[1px] bg-white/60"></div>
              </div>

            </div>

            {/* Stage-based Interactive Actions */}
            <div className="w-full flex flex-col items-center gap-3 mt-2 z-10">
              
              {/* Action 1: Blow out Candles */}
              {candlesLit ? (
                <button
                  id="blow-candles-btn"
                  onClick={handleBlowCandles}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#a65341] to-[#8c4333] hover:from-[#8c4333] hover:to-[#733527] text-white font-bold text-sm sm:text-base shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer font-sans-clean animate-pulse"
                >
                  <Flame className="w-5 h-5 text-amber-300 fill-amber-300" />
                  <span>Blow Out the Candles &amp; Make a Wish! 🕯️💨</span>
                </button>
              ) : (
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <button
                    onClick={handleRelightCandles}
                    className="px-4 py-2 rounded-xl bg-[#fffaf8] hover:bg-[#f4e8e2] border border-[#d8c5bc] text-xs font-semibold text-[#4a3a35] flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Flame className="w-3.5 h-3.5 text-[#a65341]" />
                    <span>Relight Candles</span>
                  </button>

                  <button
                    onClick={handlePlayBirthdayTune}
                    className="px-4 py-2 rounded-xl bg-[#f4e8e2] hover:bg-[#ede0d8] border border-[#c97b6b] text-xs font-bold text-[#8c4333] flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Music className="w-3.5 h-3.5 text-[#a65341]" />
                    <span>Play Birthday Melody 🎵</span>
                  </button>
                </div>
              )}

              {/* Action 2: Cut the Cake with Golden Knife */}
              {cakeCutStage === 0 ? (
                <button
                  id="cut-cake-btn"
                  onClick={handleCutCake}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#4a3a35] hover:bg-[#382b27] text-white font-bold text-sm sm:text-base shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer font-sans-clean"
                >
                  <Utensils className="w-5 h-5 text-[#fde2e4]" />
                  <span>Take the Golden Knife &amp; Cut Birthday Cake! 🔪🎂</span>
                </button>
              ) : cakeCutStage === 1 ? (
                <div className="w-full flex flex-col items-center gap-2 animate-fadeIn">
                  <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium max-w-sm">
                    ✨ The birthday cake is sliced! The first sweet slice belongs to Jemi.
                  </div>
                  
                  <button
                    id="feed-slice-btn"
                    onClick={handleFeedSlice}
                    className="px-8 py-3 rounded-full bg-[#a65341] hover:bg-[#8c4333] text-white font-bold text-sm shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer font-sans-clean"
                  >
                    <Heart className="w-4 h-4 fill-white" />
                    <span>Feed a Sweet Slice to Jemi ♥ 🍰</span>
                  </button>
                </div>
              ) : (
                /* Cake Taste Complete & Fed */
                <div className="w-full flex flex-col items-center gap-2 animate-fadeIn">
                  <div className="p-4 rounded-2xl bg-[#fbf5f2] border border-[#d8c5bc] text-[#4a3a35] text-xs font-serif-luxury italic text-center max-w-sm">
                    &ldquo;Sweetness sweeter than any confection. May your life always be filled with joy, health, and Rahat&apos;s unending love.&rdquo;
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        audioEngine.playHeartbeat();
                        launchGrandFireworks();
                        launchRoseShower();
                      }}
                      className="px-5 py-2.5 rounded-xl bg-[#4a3a35] text-white font-bold text-xs hover:bg-[#382b27] shadow-sm cursor-pointer"
                    >
                      More Fireworks &amp; Roses! 🎆🌹
                    </button>

                    <button
                      onClick={handleResetCake}
                      title="Reset birthday cake"
                      className="p-2.5 rounded-xl bg-[#f4e8e2] hover:bg-[#ede0d8] border border-[#d8c5bc] text-[#4a3a35] transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Candle count switcher */}
              <div className="mt-2 flex items-center gap-2 text-xs text-[#8e7d77]">
                <span>Candles:</span>
                {[1, 3, 5, 7].map((num) => (
                  <button
                    key={num}
                    onClick={() => {
                      setCandleCount(num);
                      audioEngine.playChime(1.1);
                    }}
                    className={`w-6 h-6 rounded-full border text-[11px] font-bold flex items-center justify-center ${
                      candleCount === num
                        ? 'bg-[#4a3a35] text-white border-[#4a3a35]'
                        : 'bg-white text-[#6d5a54] border-[#d8c5bc] hover:bg-[#f4e8e2]'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>

            </div>

          </div>

        </div>

        {/* Right Column: Rahat's Birthday Vow & Wishes (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Couple Portrait Card on the Birthday Table */}
          <div className="p-6 rounded-3xl bg-white border border-[#e8d7cf] shadow-md backdrop-blur-xl flex flex-col items-center text-center text-[#4a3a35]">
            <div className="inline-flex items-center gap-1.5 text-xs font-sans-clean font-bold uppercase tracking-[0.2em] text-[#8e7d77] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#a65341]" />
              <span>Celebrating Together</span>
            </div>

            {photoUrl ? (
              <div className="p-2 bg-[#fffaf8] rounded-2xl border border-[#d8c5bc] shadow-sm mb-3">
                <div className="w-40 h-48 rounded-xl overflow-hidden border border-[#e8d7cf]">
                  <img
                    src={photoUrl}
                    alt="Rahat and Jemi Birthday"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="pt-2">
                  <span className="font-serif-luxury italic text-xs font-bold text-[#4a3a35]">
                    Rahat &amp; Jemi &bull; Birthday 2024 ♥
                  </span>
                </div>
              </div>
            ) : (
              <div className="w-40 h-48 rounded-2xl border-2 border-dashed border-[#a65341]/40 flex flex-col items-center justify-center p-4 bg-[#fffaf8] mb-3">
                <Heart className="w-8 h-8 text-[#a65341] fill-[#a65341] mb-2 animate-pulse" />
                <span className="text-xs font-serif-luxury text-[#4a3a35] italic font-semibold">
                  Rahat &amp; Jemi&apos;s Photo
                </span>
                <span className="text-[10px] text-[#8e7d77] mt-1">
                  Synced across your keepsake box
                </span>
              </div>
            )}

            <h3 className="font-serif-luxury text-xl font-bold text-[#4a3a35]">
              Jubaida Haque (Jemi)
            </h3>
            <p className="text-xs text-[#6d5a54] font-serif-luxury italic mt-1">
              &ldquo;The queen of Rahat&apos;s heart, today and forever.&rdquo;
            </p>
          </div>

          {/* Rahat's Sacred Birthday Letter to Jemi */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#e8d7cf] shadow-md backdrop-blur-xl flex flex-col gap-3 text-[#4a3a35] relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-[#e8d7cf] pb-3">
              <span className="text-xs uppercase tracking-[0.2em] font-sans-clean font-bold text-[#8e7d77]">
                Birthday Letter From Rahat
              </span>
              <span className="font-serif-luxury text-xs text-[#a65341] italic font-bold">
                August 31st &bull; Forever
              </span>
            </div>

            <div className="font-serif-luxury text-sm sm:text-base italic leading-relaxed text-[#5c4a45] space-y-3 pt-1">
              <p>
                <strong>My Dearest Jemi,</strong>
              </p>
              <p>
                Happy Birthday, my darling. On this blessed day that brought you into this world, my heart is overflowing with gratitude. You are the gentle light in every morning and the calm in every storm.
              </p>
              <p>
                My prayer for you today is a lifetime of boundless laughter, sound health, gentle peace, and every dream in your pure heart fulfilled. As long as I draw breath, I promise to cherish, respect, protect, and love you unconditionally.
              </p>
            </div>

            <div className="pt-3 border-t border-[#e8d7cf] flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] font-sans-clean font-bold text-[#8e7d77] block">Forever Devoted Husband</span>
                <span className="font-serif-luxury italic text-2xl font-bold text-[#a65341]">Rahat ♥</span>
              </div>

              <button
                onClick={() => {
                  audioEngine.playChime(1.3);
                  launchRoseShower();
                }}
                className="px-4 py-2 rounded-xl bg-[#fffaf8] hover:bg-[#f4e8e2] border border-[#d8c5bc] text-xs font-bold text-[#4a3a35] flex items-center gap-1.5 shadow-sm transition-transform hover:scale-105 cursor-pointer"
              >
                <span>🌹 Send Rose Petals</span>
              </button>
            </div>
          </div>

          {/* Birthday Wish Capsule */}
          <div className="p-6 rounded-3xl bg-white border border-[#e8d7cf] shadow-md backdrop-blur-xl flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Gift className="w-4 h-4 text-[#a65341]" />
              <h3 className="font-serif-luxury text-base font-bold text-[#4a3a35]">
                Jemi&apos;s Secret Birthday Wish Box
              </h3>
            </div>
            
            {wishMade ? (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-sans-clean flex flex-col gap-1.5 animate-fadeIn">
                <div className="flex items-center gap-1.5 font-bold">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Birthday Wish Sealed &amp; Whispered to the Stars! ✨</span>
                </div>
                <p className="italic text-emerald-800">
                  &ldquo;{wishedText}&rdquo;
                </p>
                <button
                  onClick={() => {
                    setWishMade(false);
                    setWishedText('');
                  }}
                  className="text-[11px] underline text-emerald-700 mt-1 text-left cursor-pointer"
                >
                  Write another birthday wish
                </button>
              </div>
            ) : (
              <form onSubmit={handleMakeWish} className="flex flex-col gap-2.5">
                <p className="text-xs text-[#6d5a54] font-sans-clean leading-relaxed">
                  Whisper a wish for this new year of your life, dearest Jemi:
                </p>
                <textarea
                  rows={2}
                  value={wishedText}
                  onChange={(e) => setWishedText(e.target.value)}
                  placeholder="e.g. May our home be filled with endless joy, peace, and love..."
                  className="w-full px-3.5 py-2 rounded-xl bg-[#fffaf8] border border-[#d8c5bc] text-[#4a3a35] text-xs focus:outline-none focus:border-[#a65341]"
                />
                <button
                  type="submit"
                  disabled={!wishedText.trim()}
                  className="py-2.5 rounded-xl bg-[#4a3a35] hover:bg-[#382b27] disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#fde2e4]" />
                  <span>Lock Wish in Birthday Vault</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
