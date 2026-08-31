import React, { useState } from 'react';
import { LOVE_LETTER_PRESETS } from '../data/romanticContent';
import { LoveLetterPreset } from '../types';
import { Heart, Sparkles, Copy, Check, Feather, RefreshCw, Volume2 } from 'lucide-react';
import { audioEngine } from '../audio/RomanticAudioEngine';
import { launchRoseShower } from '../utils/celebrationEffects';

export const LoveLetterSanctuary: React.FC = () => {
  const [selectedPreset, setSelectedPreset] = useState<LoveLetterPreset>(LOVE_LETTER_PRESETS[0]);
  const [isSealBroken, setIsSealBroken] = useState(true);
  const [copied, setCopied] = useState(false);
  const [customLetterMode, setCustomLetterMode] = useState(false);
  const [customText, setCustomText] = useState(selectedPreset.text);
  const [customSalutation, setCustomSalutation] = useState(selectedPreset.salutation);
  const [customSignature, setCustomSignature] = useState(selectedPreset.signature);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [poemCategory, setPoemCategory] = useState<'eternal' | 'beauty' | 'destiny' | 'gratitude'>('eternal');

  const handleBreakSeal = () => {
    audioEngine.playChime(1.1);
    setIsSealBroken(true);
    launchRoseShower();
  };

  const handleCopy = () => {
    const fullText = `${customSalutation}\n\n${customText}\n\n${customSignature}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    audioEngine.playChime(1.3);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSelectPreset = (preset: LoveLetterPreset) => {
    setSelectedPreset(preset);
    setCustomSalutation(preset.salutation);
    setCustomText(preset.text);
    setCustomSignature(preset.signature);
    audioEngine.playChime(1.0);
  };

  // AI & Romantic Generator
  const handleGenerateRomanticVerse = async () => {
    setAiGenerating(true);
    audioEngine.playChime(1.2);

    try {
      // Try to call server API if available, else fall back to rich romantic poet templates
      const res = await fetch('/api/romantic-poem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipient: 'Jubaida Haque Jemi',
          sender: 'Rahat',
          category: poemCategory,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.poem) {
          setCustomText(data.poem);
          setAiGenerating(false);
          launchRoseShower();
          return;
        }
      }
    } catch {
      // Fallback generator
    }

    // High quality romantic fallbacks crafted specifically for Jubaida & Rahat
    setTimeout(() => {
      const generatedVerses: Record<string, string> = {
        eternal: `In the quiet sanctuary of my soul, your name echoes like a sacred prayer, Jubaida.\n\nEvery star in the night sky is but a tiny reflection of the boundless love I hold for you in my chest. You are my home, my anchor, and the sweetest warmth my life has ever known.\n\nI promise to love you across every lifetime, every universe, and every tomorrow.`,
        beauty: `The blossoms of spring turn shy when you smile, my dearest Jemi.\n\nYour grace is softer than the morning dew, your eyes hold the mystery of the cosmos, and your laugh is my heart’s favorite song. Thank you for filling my world with such celestial beauty and kindness.`,
        destiny: `Out of eight billion souls, the universe guided my footsteps straight into your embrace.\n\nMeeting you was destiny, marrying you was my life’s greatest victory, and loving you forever is my eternal vow. Rahat is entirely and irrevocably yours, my queen.`,
        gratitude: `My sweet Jemi, having you as my wife is the greatest blessing I could ever receive.\n\nThank you for every cup of tea we share, every gentle laugh, every supportive whisper in the dark, and every ray of sunshine you bring into our lives. You make my existence complete.`,
      };

      setCustomText(generatedVerses[poemCategory] || generatedVerses.eternal);
      setAiGenerating(false);
      launchRoseShower();
    }, 800);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 max-w-5xl mx-auto flex flex-col items-center">
      
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/80 border border-[#4a3a35]/20 text-[#6d5a54] text-xs font-semibold uppercase tracking-[0.25em] mb-3 shadow-sm font-sans-clean">
          <Feather className="w-3.5 h-3.5 text-[#a65341]" />
          <span>Sanctuary of Devotion</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif-luxury text-[#4a3a35] font-medium tracking-tight">
          Letters of Eternal Love
        </h1>
        <p className="font-serif-luxury text-base sm:text-xl text-[#7c635b] mt-2 italic">
          Every word written from the purest depth of Rahat&apos;s heart for his wife, Jubaida Haque Jemi.
        </p>
      </div>

      {/* Preset Selectors */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {LOVE_LETTER_PRESETS.map((preset) => (
          <button
            key={preset.id}
            id={`preset-btn-${preset.id}`}
            onClick={() => handleSelectPreset(preset)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
              selectedPreset.id === preset.id && !customLetterMode
                ? 'bg-[#4a3a35] text-white shadow-md border border-[#382b27]'
                : 'bg-white/80 text-[#6d5a54] hover:text-[#4a3a35] border border-[#4a3a35]/15 hover:bg-white'
            }`}
          >
            {preset.title} ({preset.mood})
          </button>
        ))}
        <button
          id="custom-letter-toggle-btn"
          onClick={() => setCustomLetterMode(!customLetterMode)}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
            customLetterMode
              ? 'bg-[#a65341] text-white font-bold shadow-md border border-[#8c4333]'
              : 'bg-white/80 text-[#a65341] hover:text-[#8c4333] border border-[#a65341]/40 hover:bg-white'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{customLetterMode ? 'Close Poet Studio' : 'AI Romantic Poet Studio'}</span>
        </button>
      </div>

      {/* AI Romantic Verse Generator Bar (if opened) */}
      {customLetterMode && (
        <div className="w-full mb-8 p-5 rounded-2xl bg-white/90 border border-[#a65341]/30 shadow-md backdrop-blur-xl animate-fadeIn">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2 text-[#4a3a35] font-serif-luxury text-lg font-bold">
              <Sparkles className="w-5 h-5 text-[#a65341] animate-spin [animation-duration:6s]" />
              <span>Compose a New Romantic Verse for Jemi</span>
            </div>
            <div className="flex items-center gap-2">
              {(['eternal', 'beauty', 'destiny', 'gratitude'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setPoemCategory(cat)}
                  className={`px-3 py-1 rounded-lg text-xs capitalize transition-colors ${
                    poemCategory === cat
                      ? 'bg-[#4a3a35] text-white font-bold'
                      : 'bg-[#f4e8e2] text-[#6d5a54] hover:bg-[#ede0d8] hover:text-[#4a3a35]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              id="ai-generate-poem-btn"
              onClick={handleGenerateRomanticVerse}
              disabled={aiGenerating}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#4a3a35] hover:bg-[#382b27] text-white font-bold text-xs sm:text-sm shadow-md transition-transform active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              {aiGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                  <span>Weaving Poetic Words...</span>
                </>
              ) : (
                <>
                  <Feather className="w-4 h-4" />
                  <span>Generate Romantic Poetry for Jemi</span>
                </>
              )}
            </button>
            <span className="text-xs text-[#8e7d77] font-sans-clean">
              Personalized verses celebrating Rahat &amp; Jubaida&apos;s love.
            </span>
          </div>
        </div>
      )}

      {/* Main Parchment Letter Container */}
      <div className="relative w-full max-w-3xl perspective-1000">
        
        {/* Decorative Natural Warm Corner Accents */}
        <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-[#a65341]/70 rounded-tl-lg pointer-events-none z-20" />
        <div className="absolute -top-3 -right-3 w-8 h-8 border-t-2 border-r-2 border-[#a65341]/70 rounded-tr-lg pointer-events-none z-20" />
        <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b-2 border-l-2 border-[#a65341]/70 rounded-bl-lg pointer-events-none z-20" />
        <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-[#a65341]/70 rounded-br-lg pointer-events-none z-20" />

        <div className="relative overflow-hidden rounded-3xl bg-[#fffcf9] border border-[#e8d7cf] shadow-xl p-6 sm:p-10 md:p-12 text-[#4a3a35]">
          
          {/* Subtle Watermark Monogram */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none select-none">
            <span className="font-cursive text-9xl text-[#4a3a35]">R ♥ J</span>
          </div>

          {/* Letter Top Controls */}
          <div className="flex items-center justify-between border-b border-[#4a3a35]/15 pb-4 mb-6">
            <div className="flex items-center gap-2 text-[#7c635b] font-serif-luxury text-sm italic">
              <Sparkles className="w-4 h-4 text-[#a65341]" />
              <span>Sanctuary of Love &bull; {selectedPreset.title}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => audioEngine.playChime(1.4)}
                title="Play reading melody chime"
                className="p-2 rounded-lg bg-[#f4e8e2] hover:bg-[#ede0d8] text-[#4a3a35] border border-[#d8c5bc] transition-colors"
              >
                <Volume2 className="w-4 h-4" />
              </button>
              <button
                id="copy-letter-btn"
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#f4e8e2] hover:bg-[#ede0d8] text-[#4a3a35] border border-[#d8c5bc] text-xs transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Letter</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Salutation */}
          <div className="mb-6">
            <h2 className="font-cursive text-3xl sm:text-4xl md:text-5xl text-[#a65341] font-normal leading-relaxed">
              {customSalutation}
            </h2>
          </div>

          {/* Body Content */}
          <div className="font-serif-luxury text-base sm:text-xl text-[#4a3a35] leading-relaxed sm:leading-loose whitespace-pre-line tracking-wide font-normal">
            {customText}
          </div>

          {/* Signature & Wax Seal */}
          <div className="mt-10 pt-6 border-t border-[#4a3a35]/15 flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="font-cursive text-2xl sm:text-4xl text-[#a65341] font-normal leading-tight">
                {customSignature}
              </p>
              <span className="text-[10px] text-[#8e7d77] uppercase tracking-[0.2em] font-sans-clean font-semibold">
                Dedicated to Jubaida Haque Jemi
              </span>
            </div>

            {/* Interactive Wax Seal in Natural Terracotta */}
            <div
              onClick={handleBreakSeal}
              id="wax-seal-btn"
              title="Click to celebrate this sacred seal"
              className="group relative cursor-pointer flex flex-col items-center select-none"
            >
              <div className="w-16 h-16 rounded-full bg-[#a65341] p-[2px] shadow-lg group-hover:scale-110 transition-transform flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-[#8c4333] flex flex-col items-center justify-center text-center shadow-inner">
                  <Heart className="w-6 h-6 text-[#fde2e4] fill-[#fde2e4] group-hover:animate-ping" />
                  <span className="text-[9px] font-bold text-[#fde2e4] tracking-tighter uppercase font-display">
                    R &hearts; J
                  </span>
                </div>
              </div>
              <span className="text-[10px] text-[#8e7d77] mt-1 font-serif-luxury italic">
                Eternal Seal
              </span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
