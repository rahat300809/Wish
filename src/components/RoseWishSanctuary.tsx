import React, { useState } from 'react';
import { Sparkles, Heart, Flower2, Send, Check, RefreshCw, BookHeart, Gift } from 'lucide-react';
import { RoseWish } from '../types';
import { audioEngine } from '../audio/RomanticAudioEngine';
import { launchRoseShower, launchGrandFireworks } from '../utils/celebrationEffects';

interface RoseTypeOption {
  id: 'crimson' | 'blush' | 'sunset' | 'white' | 'terracotta';
  name: string;
  colorName: string;
  hex: string;
  accent: string;
  bgGrad: string;
  meaning: string;
  devotionNote: string;
}

const ROSE_VARIETIES: RoseTypeOption[] = [
  {
    id: 'crimson',
    name: 'Velvet Crimson Devotion',
    colorName: 'Royal Velvet Red',
    hex: '#a62639',
    accent: '#e63946',
    bgGrad: 'from-[#a62639] via-[#801323] to-[#4a0d17]',
    meaning: 'Eternal, Unstoppable Love & Sacred Devotion',
    devotionNote: 'My dearest Jemi, this crimson rose represents every beat of my heart that belongs only to you. In this lifetime and every lifetime after, I choose you over and over.',
  },
  {
    id: 'blush',
    name: 'Blush Petal Tenderness',
    colorName: 'Soft Dusty Blush',
    hex: '#e29578',
    accent: '#ffb5a7',
    bgGrad: 'from-[#e29578] via-[#c67d64] to-[#8d4f3b]',
    meaning: 'Gentle Grace, Sweetness & Unconditional Warmth',
    devotionNote: 'Your smile is the gentlest dawn in my universe. Thank you for filling my days with warmth, quiet comfort, and unmatched beauty, my darling wife.',
  },
  {
    id: 'sunset',
    name: 'Golden Stardust Bloom',
    colorName: 'Radiant Gold & Amber',
    hex: '#d4af37',
    accent: '#f3c642',
    bgGrad: 'from-[#d4af37] via-[#aa820a] to-[#594405]',
    meaning: 'Celestial Rarity & Eternal Fortune',
    devotionNote: 'You are the rarest star in all galaxies, Jemi. Having you as my wife is the greatest blessing I will ever know.',
  },
  {
    id: 'terracotta',
    name: 'Warm Terracotta Passion',
    colorName: 'Earthy Terracotta Clay',
    hex: '#a65341',
    accent: '#c97361',
    bgGrad: 'from-[#a65341] via-[#7d3728] to-[#421b13]',
    meaning: 'Steadfast Loyalty & Deep Rooted Love',
    devotionNote: 'Our love is strong, grounded, and unwavering. With you, I am home in every sense of the word.',
  },
  {
    id: 'white',
    name: 'Linen Pearl Serenity',
    colorName: 'Pure Pearl & Linen',
    hex: '#f4edea',
    accent: '#ffffff',
    bgGrad: 'from-[#ded2cc] via-[#b8a79f] to-[#6d5e56]',
    meaning: 'Pure Soul, Deep Peace & Holy Union',
    devotionNote: 'A pure rose for the purest soul I know. You bring harmony to my thoughts and profound peace to my soul.',
  },
];

const INITIAL_ROSE_WISHES: RoseWish[] = [
  {
    id: '1',
    roseType: 'crimson',
    roseName: 'Velvet Crimson Devotion',
    recipient: 'Jubaida Haque (Jemi)',
    sender: 'Rahat',
    message: 'To my queen Jemi: I offer you this blooming crimson rose as a vow that my love will never wither, my loyalty will never waver, and my heart will always beat in harmony with yours.',
    meaning: 'Eternal Love & Holy Devotion',
    date: 'Forever & Always',
  },
  {
    id: '2',
    roseType: 'sunset',
    roseName: 'Golden Stardust Bloom',
    recipient: 'My Sweetest Jemi',
    sender: 'Rahat',
    message: 'Every petal carries a whisper of gratitude for the light you bring into my life. You make ordinary moments feel like magic.',
    meaning: 'Endless Radiance',
    date: 'With All My Soul',
  },
  {
    id: '3',
    roseType: 'blush',
    roseName: 'Blush Petal Tenderness',
    recipient: 'Jemi',
    sender: 'Rahat',
    message: 'Wishing you all the joy, sweetness, and tender peace in the world. You are my most precious treasure.',
    meaning: 'Sweet Harmony',
    date: 'Eternally Yours',
  },
];

const PETAL_WHISPERS = [
  'You are my greatest blessing in this life.',
  'Your voice is my favorite melody in the universe.',
  'Every dream I build has you right at the center.',
  'I will hold your hand through every season of life.',
  'Loving you is as natural as breathing.',
  'You are my peace, my home, and my sanctuary.',
];

export const RoseWishSanctuary: React.FC = () => {
  const [selectedRose, setSelectedRose] = useState<RoseTypeOption>(ROSE_VARIETIES[0]);
  const [isBloomed, setIsBloomed] = useState(false);
  const [petalsPlucked, setPetalsPlucked] = useState<number>(0);
  const [currentWhisper, setCurrentWhisper] = useState<string | null>(null);
  
  // Custom wish creation
  const [wishes, setWishes] = useState<RoseWish[]>(INITIAL_ROSE_WISHES);
  const [showAddForm, setShowAddForm] = useState(false);
  const [customMsg, setCustomMsg] = useState('');
  const [customRecipient, setCustomRecipient] = useState('Jubaida Haque Jemi');

  const handleBloomRose = () => {
    setIsBloomed(true);
    audioEngine.playChime(1.2);
    launchRoseShower();
    launchGrandFireworks();
  };

  const handlePluckPetal = () => {
    const nextCount = petalsPlucked + 1;
    setPetalsPlucked(nextCount);
    const whisper = PETAL_WHISPERS[(nextCount - 1) % PETAL_WHISPERS.length];
    setCurrentWhisper(whisper);
    audioEngine.playChime(1.4);
    launchRoseShower();
  };

  const handleAddCustomWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMsg.trim()) return;

    const newWish: RoseWish = {
      id: Date.now().toString(),
      roseType: selectedRose.id,
      roseName: selectedRose.name,
      recipient: customRecipient.trim() || 'Jemi',
      sender: 'Rahat',
      message: customMsg.trim(),
      meaning: selectedRose.meaning,
      date: 'Today & Forever',
    };

    setWishes([newWish, ...wishes]);
    setCustomMsg('');
    setShowAddForm(false);
    audioEngine.playChime(1.3);
    launchRoseShower();
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 max-w-6xl mx-auto flex flex-col items-center">
      
      {/* Header Banner */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-[#4a3a35]/20 text-[#6d5a54] text-xs font-semibold uppercase tracking-[0.25em] mb-3 shadow-sm font-sans-clean">
          <Flower2 className="w-4 h-4 text-[#a65341]" />
          <span>A Blooming Gift from Rahat</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif-luxury text-[#4a3a35] font-medium tracking-tight">
          A Sacred Rose for Jemi
        </h1>
        <p className="font-serif-luxury text-base sm:text-xl text-[#7c635b] mt-2 italic max-w-2xl mx-auto">
          &ldquo;If I had a rose for every time I thought of you, I could walk through an eternal garden forever.&rdquo;
        </p>
      </div>

      {/* Main Interactive Rose Altar */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        
        {/* Left Side: Interactive Blooming Rose Stage (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-10 rounded-3xl bg-white/90 border border-[#e8d7cf] shadow-xl backdrop-blur-xl flex flex-col items-center justify-between relative overflow-hidden text-[#4a3a35]">
          
          {/* Subtle Ambient Glow */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-3xl opacity-30 pointer-events-none transition-colors duration-700"
            style={{ backgroundColor: selectedRose.hex }}
          />

          {/* Rose Variety Picker Badges */}
          <div className="w-full flex items-center justify-center gap-2 flex-wrap mb-6 relative z-10">
            {ROSE_VARIETIES.map((r) => (
              <button
                key={r.id}
                onClick={() => {
                  setSelectedRose(r);
                  setIsBloomed(false);
                  audioEngine.playChime(1.0);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedRose.id === r.id
                    ? 'bg-[#4a3a35] text-white shadow-md scale-105'
                    : 'bg-[#fffaf8] border border-[#d8c5bc] text-[#6d5a54] hover:bg-white'
                }`}
              >
                <span 
                  className="w-3 h-3 rounded-full shadow-inner border border-white/40"
                  style={{ backgroundColor: r.hex }}
                />
                <span className="font-sans-clean">{r.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>

          {/* Visual Blooming Rose Display */}
          <div className="relative my-4 flex flex-col items-center justify-center select-none group cursor-pointer" onClick={handleBloomRose}>
            
            {/* Soft Radiant Halo */}
            <div className={`absolute w-64 h-64 rounded-full transition-all duration-1000 ${isBloomed ? 'scale-125 opacity-70 animate-pulse' : 'scale-90 opacity-30'}`}
                 style={{ background: `radial-gradient(circle, ${selectedRose.accent}33 0%, transparent 70%)` }} 
            />

            {/* Botanical SVG Rose Art */}
            <div className={`relative transition-all duration-1000 transform ${isBloomed ? 'scale-110 rotate-0' : 'scale-95 hover:scale-100'}`}>
              <svg width="220" height="220" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-2xl">
                {/* Stem & Leaves */}
                <path d="M100 130 C100 160 110 185 100 195" stroke="#4a5d4e" strokeWidth="4" strokeLinecap="round" />
                <path d="M102 145 C120 140 135 145 140 155 C125 160 110 155 102 145 Z" fill="#5f7363" stroke="#4a5d4e" strokeWidth="1" />
                <path d="M98 160 C80 155 65 160 60 170 C75 175 90 170 98 160 Z" fill="#5f7363" stroke="#4a5d4e" strokeWidth="1" />

                {/* Outer Petals */}
                <path 
                  d="M100 50 C60 50 45 85 70 120 C100 145 100 145 130 120 C155 85 140 50 100 50 Z" 
                  fill={selectedRose.hex}
                  opacity="0.9"
                />
                
                {/* Mid Petals Layers with Dynamic Bloom Expand */}
                <path 
                  d={isBloomed 
                    ? "M100 60 C70 60 58 90 78 115 C100 135 100 135 122 115 C142 90 130 60 100 60 Z"
                    : "M100 65 C78 65 68 90 82 110 C100 125 100 125 118 110 C132 90 122 65 100 65 Z"
                  } 
                  fill={selectedRose.accent}
                  opacity="0.85"
                  className="transition-all duration-700"
                />

                {/* Petal Inner Twirls */}
                <path 
                  d="M85 85 C80 70 100 60 115 70 C125 80 120 95 110 105 C95 115 80 100 85 85 Z" 
                  fill="#ffffff" 
                  fillOpacity="0.2" 
                />
                
                {/* Center Sacred Bud */}
                <ellipse cx="100" cy="90" rx={isBloomed ? "22" : "16"} ry={isBloomed ? "26" : "20"} fill={selectedRose.hex} className="transition-all duration-700" />
                <path 
                  d="M93 85 C93 78 107 78 107 85 C107 95 93 95 93 85 Z" 
                  fill={selectedRose.accent} 
                />

                {/* Sparkle Dewdrops */}
                {isBloomed && (
                  <>
                    <circle cx="85" cy="75" r="2.5" fill="#ffffff" opacity="0.9" className="animate-ping" />
                    <circle cx="118" cy="95" r="2" fill="#ffffff" opacity="0.8" />
                    <circle cx="95" cy="115" r="2" fill="#ffffff" opacity="0.8" />
                  </>
                )}
              </svg>
            </div>

            {/* Click to Bloom or Pluck Text */}
            <div className="mt-4 flex flex-col items-center">
              <span className="font-serif-luxury text-xl font-bold text-[#4a3a35]">
                {selectedRose.name}
              </span>
              <span className="text-xs text-[#8e7d77] uppercase tracking-[0.2em] font-sans-clean font-semibold mt-0.5">
                {selectedRose.meaning}
              </span>
            </div>
          </div>

          {/* Action Triggers */}
          <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-3 mt-6 pt-6 border-t border-[#4a3a35]/10 relative z-10">
            <button
              id="offer-rose-btn"
              onClick={handleBloomRose}
              className="w-full sm:w-auto px-7 py-3 rounded-2xl bg-[#4a3a35] hover:bg-[#382b27] text-white font-bold text-xs sm:text-sm shadow-lg flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all font-sans-clean cursor-pointer"
            >
              <Flower2 className="w-4 h-4 text-[#f4dcd6]" />
              <span>{isBloomed ? 'Bloom Again with Rose Shower 🌹' : 'Offer Blooming Rose to Jemi ✨'}</span>
            </button>

            <button
              id="pluck-petal-btn"
              onClick={handlePluckPetal}
              className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-[#f4e8e2] hover:bg-[#ebd9d0] border border-[#d8c5bc] text-[#4a3a35] font-semibold text-xs sm:text-sm shadow-sm flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all font-sans-clean cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#a65341]" />
              <span>Pluck a Petal for a Whisper</span>
            </button>
          </div>

          {/* Plucked Petal Secret Whisper Box */}
          {currentWhisper && (
            <div className="w-full mt-4 p-4 rounded-2xl bg-[#fffaf8] border border-[#a65341]/30 shadow-sm flex items-center gap-3 animate-fadeIn">
              <div className="w-8 h-8 rounded-full bg-[#a65341] text-white flex items-center justify-center flex-shrink-0">
                <Heart className="w-4 h-4 fill-white" />
              </div>
              <div className="flex-1">
                <span className="text-[10px] text-[#8e7d77] uppercase tracking-[0.2em] font-sans-clean font-bold block">
                  Whisper for Jemi (#{petalsPlucked})
                </span>
                <p className="text-xs sm:text-sm font-serif-luxury italic text-[#4a3a35]">
                  &ldquo;{currentWhisper}&rdquo;
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Right Side: Rahat's Rose Wish Parchment (5 cols) */}
        <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-white/90 border border-[#e8d7cf] shadow-xl backdrop-blur-xl flex flex-col justify-between text-[#4a3a35]">
          
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BookHeart className="w-5 h-5 text-[#a65341]" />
                <h3 className="font-serif-luxury text-lg font-bold text-[#4a3a35]">
                  Vow of the Rose
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#f4e8e2] border border-[#d8c5bc] text-[10px] font-sans-clean font-semibold uppercase tracking-wider text-[#6d5a54]">
                To Jemi
              </span>
            </div>

            {/* Parchment Box */}
            <div className="p-6 rounded-2xl bg-[#fffcf9] border border-[#d8c5bc] shadow-sm relative overflow-hidden">
              <div className="absolute top-2 right-2 opacity-10">
                <Flower2 className="w-24 h-24 text-[#a65341]" />
              </div>

              <span className="text-xs uppercase tracking-[0.2em] font-sans-clean text-[#8e7d77] block mb-2 font-semibold">
                Devotion for Jubaida (Jemi)
              </span>

              <p className="font-serif-luxury text-sm sm:text-base text-[#4a3a35] leading-relaxed italic mb-6">
                &ldquo;{selectedRose.devotionNote}&rdquo;
              </p>

              <div className="pt-4 border-t border-[#4a3a35]/15 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#8e7d77] uppercase tracking-[0.15em] block font-sans-clean">Offered By</span>
                  <span className="font-cursive text-2xl text-[#a65341]">Rahat &hearts;</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#8e7d77] uppercase tracking-[0.15em] block font-sans-clean">For His Love</span>
                  <span className="font-serif-luxury text-xs text-[#4a3a35] font-bold">Jemi</span>
                </div>
              </div>
            </div>
          </div>

          {/* Add a New Personal Rose Wish Trigger */}
          <div className="mt-6">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="w-full py-3 rounded-2xl bg-[#fffaf8] hover:bg-white border border-[#d8c5bc] text-[#4a3a35] font-semibold text-xs sm:text-sm shadow-sm flex items-center justify-center gap-2 transition-all font-sans-clean cursor-pointer"
            >
              <Send className="w-4 h-4 text-[#a65341]" />
              <span>{showAddForm ? 'Close Wish Form' : 'Write a Custom Rose Wish'}</span>
            </button>
          </div>

        </div>

      </div>

      {/* Custom Rose Wish Form Modal */}
      {showAddForm && (
        <form
          onSubmit={handleAddCustomWish}
          className="w-full max-w-2xl mb-12 p-6 sm:p-8 rounded-3xl bg-white border border-[#e8d7cf] shadow-xl flex flex-col gap-4 animate-fadeIn text-[#4a3a35]"
        >
          <h3 className="font-serif-luxury text-lg font-bold text-[#4a3a35] flex items-center gap-2">
            <Flower2 className="w-5 h-5 text-[#a65341]" />
            <span>Dedicate a Rose Wish to Jemi</span>
          </h3>

          <div>
            <label className="text-xs text-[#6d5a54] font-medium block mb-1">Recipient Name</label>
            <input
              type="text"
              value={customRecipient}
              onChange={(e) => setCustomRecipient(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#fffaf8] border border-[#d8c5bc] text-[#4a3a35] text-sm focus:outline-none focus:border-[#a65341]"
              required
            />
          </div>

          <div>
            <label className="text-xs text-[#6d5a54] font-medium block mb-1">Your Devotion Message / Wish</label>
            <textarea
              rows={3}
              value={customMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
              placeholder="Write a sweet promise, romantic prayer, or devotion to Jemi..."
              className="w-full px-4 py-2.5 rounded-xl bg-[#fffaf8] border border-[#d8c5bc] text-[#4a3a35] text-sm focus:outline-none focus:border-[#a65341]"
              required
            />
          </div>

          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#6d5a54] hover:bg-[#f4e8e2]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#4a3a35] hover:bg-[#382b27] text-white text-xs sm:text-sm font-bold shadow-md flex items-center gap-1.5 font-sans-clean cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Plant Wish in Rose Sanctuary</span>
            </button>
          </div>
        </form>
      )}

      {/* Eternal Rose Garden Gallery */}
      <div className="w-full">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-[#a65341]" />
            <h2 className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#4a3a35]">
              Garden of Eternal Rose Wishes
            </h2>
          </div>
          <span className="text-xs text-[#8e7d77] font-sans-clean font-semibold uppercase tracking-wider">
            {wishes.length} Eternal Roses
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {wishes.map((w) => (
            <div
              key={w.id}
              className="p-6 rounded-3xl bg-white/85 hover:bg-white border border-[#4a3a35]/15 hover:border-[#a65341]/40 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f4e8e2] border border-[#d8c5bc] text-[#a65341] text-[10px] font-bold uppercase tracking-wider font-sans-clean">
                    <Flower2 className="w-3 h-3" />
                    <span>{w.meaning}</span>
                  </span>
                  <span className="text-[10px] text-[#8e7d77] font-serif-luxury italic">
                    {w.date}
                  </span>
                </div>

                <h4 className="font-serif-luxury text-lg font-bold text-[#4a3a35] group-hover:text-[#a65341] transition-colors mb-2">
                  {w.roseName}
                </h4>

                <p className="font-serif-luxury text-xs sm:text-sm text-[#6d5a54] leading-relaxed italic">
                  &ldquo;{w.message}&rdquo;
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#4a3a35]/10 flex items-center justify-between">
                <span className="font-cursive text-xl text-[#a65341]">{w.sender} ♥</span>
                <span className="text-[10px] text-[#8e7d77] font-sans-clean uppercase tracking-wider">For {w.recipient}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
