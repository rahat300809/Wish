import React, { useState, useRef } from 'react';
import { Heart, Sparkles, Download, Image as ImageIcon, Check } from 'lucide-react';
import { audioEngine } from '../audio/RomanticAudioEngine';
import { launchRoseShower, launchGrandFireworks } from '../utils/celebrationEffects';

export const KeepsakeCardMaker: React.FC = () => {
  const [recipient, setRecipient] = useState('Jubaida Haque Jemi');
  const [sender, setSender] = useState('Rahat');
  const [title, setTitle] = useState('My Forever Love & Blessing');
  const [message, setMessage] = useState(
    'In you, my dearest Jemi, I found my soulmate, my best friend, and my eternal home. Thank you for filling every day with your sweet warmth, kindness, and beauty. I love you infinitely.'
  );
  const [date, setDate] = useState('Forever & Always');
  const [cardStyle, setCardStyle] = useState<'natural-linen' | 'terracotta-clay' | 'rose-blush' | 'sage-earth'>('natural-linen');
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPhotoUrl(reader.result as string);
        audioEngine.playChime(1.3);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePrintOrDownload = () => {
    audioEngine.playChime(1.2);
    launchGrandFireworks();
    launchRoseShower();
    window.print();
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const getCardStyleClasses = () => {
    switch (cardStyle) {
      case 'terracotta-clay':
        return 'bg-[#4a3a35] text-white border-2 border-[#a65341] shadow-xl';
      case 'rose-blush':
        return 'bg-[#fff5f5] text-[#4a3a35] border-2 border-[#e8a598] shadow-lg';
      case 'sage-earth':
        return 'bg-[#f4f7f4] text-[#2d3a2e] border-2 border-[#829e84] shadow-lg';
      default:
        return 'bg-[#fffcf9] text-[#4a3a35] border-2 border-[#d8c5bc] shadow-xl';
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 max-w-6xl mx-auto flex flex-col items-center">
      
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/80 border border-[#4a3a35]/20 text-[#6d5a54] text-xs font-semibold uppercase tracking-[0.25em] mb-3 shadow-sm font-sans-clean">
          <Heart className="w-3.5 h-3.5 text-[#a65341] fill-[#a65341]" />
          <span>Romantic Keepsake Studio</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif-luxury text-[#4a3a35] font-medium tracking-tight">
          Custom Wish Card for Jemi
        </h1>
        <p className="font-serif-luxury text-base sm:text-xl text-[#7c635b] mt-2 italic max-w-xl mx-auto">
          Personalize, style, and save an elegant eternal love keepsake card.
        </p>
      </div>

      {/* Main Grid: Controls on Left, Live Card Preview on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
        
        {/* Editor Controls (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white border border-[#e8d7cf] shadow-md backdrop-blur-xl flex flex-col gap-4 text-[#4a3a35]">
          <h2 className="text-lg font-bold font-serif-luxury text-[#4a3a35] flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#a65341]" />
            <span>Card Customizer</span>
          </h2>

          <div>
            <label className="text-xs text-[#6d5a54] font-medium block mb-1">Natural Theme Style</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'natural-linen', name: 'Natural Linen', bg: 'bg-[#ede0d8]' },
                { id: 'terracotta-clay', name: 'Terracotta Clay', bg: 'bg-[#a65341]' },
                { id: 'rose-blush', name: 'Rose Blush', bg: 'bg-[#e8a598]' },
                { id: 'sage-earth', name: 'Sage Earth', bg: 'bg-[#829e84]' },
              ].map((style) => (
                <button
                  key={style.id}
                  onClick={() => {
                    setCardStyle(style.id as typeof cardStyle);
                    audioEngine.playChime(1.1);
                  }}
                  className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-medium transition-all ${
                    cardStyle === style.id
                      ? 'border-[#a65341] bg-[#f4e8e2] text-[#4a3a35] font-bold shadow-sm'
                      : 'border-[#e8d7cf] bg-[#fffaf8] text-[#6d5a54] hover:bg-white'
                  }`}
                >
                  <span className={`w-3 h-3 rounded-full ${style.bg} border border-[#4a3a35]/20`} />
                  <span>{style.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs text-[#6d5a54] font-medium block mb-1">Dedicated To (Wife&apos;s Name)</label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-[#fffaf8] border border-[#d8c5bc] text-[#4a3a35] text-sm focus:outline-none focus:border-[#a65341]"
            />
          </div>

          <div>
            <label className="text-xs text-[#6d5a54] font-medium block mb-1">Sender Name (Husband)</label>
            <input
              type="text"
              value={sender}
              onChange={(e) => setSender(e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-[#fffaf8] border border-[#d8c5bc] text-[#4a3a35] text-sm focus:outline-none focus:border-[#a65341]"
            />
          </div>

          <div>
            <label className="text-xs text-[#6d5a54] font-medium block mb-1">Card Heading</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-[#fffaf8] border border-[#d8c5bc] text-[#4a3a35] text-sm focus:outline-none focus:border-[#a65341]"
            />
          </div>

          <div>
            <label className="text-xs text-[#6d5a54] font-medium block mb-1">Romantic Message</label>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-[#fffaf8] border border-[#d8c5bc] text-[#4a3a35] text-sm focus:outline-none focus:border-[#a65341]"
            />
          </div>

          <div>
            <label className="text-xs text-[#6d5a54] font-medium block mb-1">Special Date / Caption</label>
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-[#fffaf8] border border-[#d8c5bc] text-[#4a3a35] text-sm focus:outline-none focus:border-[#a65341]"
            />
          </div>

          {/* Photo upload button */}
          <div>
            <label className="text-xs text-[#6d5a54] font-medium block mb-1">Add Cherished Photo</label>
            <label className="cursor-pointer flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#fffaf8] border border-[#d8c5bc] hover:border-[#a65341] text-xs text-[#4a3a35] font-medium transition-colors">
              <ImageIcon className="w-4 h-4 text-[#a65341]" />
              <span>{photoUrl ? 'Replace Photo' : 'Upload Couple Photo'}</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Print / Save Trigger */}
          <button
            id="print-card-btn"
            onClick={handlePrintOrDownload}
            className="mt-2 w-full py-3 rounded-2xl bg-[#4a3a35] hover:bg-[#382b27] hover:scale-[1.02] active:scale-[0.98] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-transform cursor-pointer font-sans-clean"
          >
            {downloadSuccess ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Card Ready! ✨</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Save / Print Keepsake Card</span>
              </>
            )}
          </button>
        </div>

        {/* Live Keepsake Card Preview (7 cols) */}
        <div className="lg:col-span-7 flex items-center justify-center">
          <div
            ref={cardRef}
            id="romantic-keepsake-card"
            className={`w-full max-w-lg p-8 sm:p-10 rounded-3xl relative overflow-hidden flex flex-col justify-between transition-all duration-500 ${getCardStyleClasses()}`}
          >
            {/* Ornamental Inset Border */}
            <div className="absolute inset-3 border border-current opacity-20 rounded-2xl pointer-events-none" />
            <div className="absolute inset-4 border border-dashed border-current opacity-15 rounded-xl pointer-events-none" />

            {/* Top Monogram */}
            <div className="text-center mb-6 relative z-10">
              <div className="inline-flex items-center gap-2 mb-1 opacity-80">
                <Sparkles className="w-4 h-4 text-[#a65341]" />
                <span className="font-sans-clean text-xs uppercase tracking-[0.25em] font-bold">
                  Sacred Keepsake of Love
                </span>
                <Sparkles className="w-4 h-4 text-[#a65341]" />
              </div>
              <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold">
                {title}
              </h3>
            </div>

            {/* Photo Inset (if present) */}
            {photoUrl && (
              <div className="relative z-10 w-36 h-36 mx-auto rounded-2xl overflow-hidden border-2 border-[#a65341]/60 shadow-md mb-6">
                <img
                  src={photoUrl}
                  alt="Keepsake Photo"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Recipient Display */}
            <div className="text-center mb-4 relative z-10">
              <span className="text-xs uppercase tracking-[0.25em] block font-sans-clean font-semibold opacity-75">
                To My Darling Wife
              </span>
              <h2 className="font-cursive text-3xl sm:text-5xl text-[#a65341] font-normal mt-1">
                {recipient}
              </h2>
            </div>

            {/* Message Body */}
            <div className="relative z-10 my-4 px-2 sm:px-4">
              <p className="font-serif-luxury text-base sm:text-lg font-light italic leading-relaxed text-center opacity-90">
                &ldquo;{message}&rdquo;
              </p>
            </div>

            {/* Bottom Signature and Seal */}
            <div className="relative z-10 mt-8 pt-4 border-t border-current opacity-80 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] font-sans-clean block opacity-70">With All My Soul</span>
                <span className="font-cursive text-2xl sm:text-3xl text-[#a65341]">{sender} ♥</span>
              </div>

              <div className="text-right">
                <span className="text-[10px] uppercase tracking-[0.2em] font-sans-clean block opacity-70">Date of Love</span>
                <span className="font-serif-luxury text-xs sm:text-sm italic">{date}</span>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
