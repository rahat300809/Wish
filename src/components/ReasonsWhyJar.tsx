import React, { useState } from 'react';
import { ROMANTIC_REASONS } from '../data/romanticContent';
import { LoveReason } from '../types';
import { Heart, Sparkles, Plus, Star, Shuffle, Filter, Check } from 'lucide-react';
import { audioEngine } from '../audio/RomanticAudioEngine';
import { launchRoseShower } from '../utils/celebrationEffects';

export const ReasonsWhyJar: React.FC = () => {
  const [reasons, setReasons] = useState<LoveReason[]>(ROMANTIC_REASONS);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [randomDrawnReason, setRandomDrawnReason] = useState<LoveReason | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<LoveReason['category']>('soul');

  const categories = [
    { id: 'all', label: 'All 50 Reasons' },
    { id: 'smile', label: 'Smile & Laughter' },
    { id: 'soul', label: 'Pure Soul' },
    { id: 'beauty', label: 'Grace & Beauty' },
    { id: 'moments', label: 'Our Moments' },
    { id: 'future', label: 'Eternal Future' },
  ];

  const handleDrawRandom = () => {
    setIsDrawing(true);
    audioEngine.playHeartbeat();

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * reasons.length);
      setRandomDrawnReason(reasons[randomIndex]);
      setIsDrawing(false);
      audioEngine.playChime(1.2);
      launchRoseShower();
    }, 600);
  };

  const handleToggleFavorite = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    audioEngine.playChime(1.4);
    setReasons((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isFavorite: !r.isFavorite } : r))
    );
  };

  const handleAddReason = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newEntry: LoveReason = {
      id: Date.now(),
      title: newTitle.trim(),
      content: newContent.trim(),
      category: newCategory,
      isFavorite: true,
    };

    setReasons([newEntry, ...reasons]);
    setNewTitle('');
    setNewContent('');
    setShowAddForm(false);
    audioEngine.playChime(1.3);
    launchRoseShower();
  };

  const filteredReasons = reasons.filter((r) => {
    if (activeCategory === 'all') return true;
    return r.category === activeCategory;
  });

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 max-w-6xl mx-auto flex flex-col items-center">
      
      {/* Top Title */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/80 border border-[#4a3a35]/20 text-[#6d5a54] text-xs font-semibold uppercase tracking-[0.25em] mb-3 shadow-sm font-sans-clean">
          <Heart className="w-3.5 h-3.5 text-[#a65341] fill-[#a65341]" />
          <span>Heartfelt Reasons</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif-luxury text-[#4a3a35] font-medium tracking-tight">
          Why I Love You, Jemi
        </h1>
        <p className="font-serif-luxury text-base sm:text-xl text-[#7c635b] mt-2 italic max-w-2xl mx-auto">
          A collection of countless reasons why Jubaida Haque Jemi is the greatest joy and blessing in Rahat&apos;s life.
        </p>
      </div>

      {/* Interactive Love Jar & Draw Random Section */}
      <div className="w-full max-w-3xl mb-12 p-6 sm:p-8 rounded-3xl bg-white/90 border border-[#e8d7cf] shadow-md backdrop-blur-xl flex flex-col items-center text-center text-[#4a3a35]">
        
        <div className="relative mb-4">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#4a3a35] p-[3px] shadow-lg animate-pulse-subtle flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-[#fffaf8] flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-[#a65341] animate-spin [animation-duration:8s]" />
            </div>
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl font-serif-luxury font-bold text-[#4a3a35] mb-2">
          The Devotion Note Jar
        </h2>
        <p className="text-xs sm:text-sm text-[#6d5a54] max-w-lg mb-6 font-sans-clean">
          Reach into the jar to reveal a special reason why Rahat adores you beyond words today!
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            id="draw-random-love-btn"
            onClick={handleDrawRandom}
            disabled={isDrawing}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#4a3a35] hover:bg-[#382b27] hover:scale-105 active:scale-95 text-white font-bold text-sm shadow-md transition-transform disabled:opacity-60 cursor-pointer font-sans-clean"
          >
            <Shuffle className={`w-4 h-4 ${isDrawing ? 'animate-spin' : ''}`} />
            <span>{isDrawing ? 'Reaching into the jar...' : 'Pick a Love Note for Jemi ✨'}</span>
          </button>

          <button
            id="add-custom-reason-btn"
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#f4e8e2] hover:bg-[#ede0d8] border border-[#d8c5bc] text-[#4a3a35] text-sm font-medium transition-colors font-sans-clean"
          >
            <Plus className="w-4 h-4" />
            <span>{showAddForm ? 'Close Form' : 'Add Another Reason'}</span>
          </button>
        </div>

        {/* Drawn Love Note Display */}
        {randomDrawnReason && (
          <div className="mt-8 w-full p-6 rounded-2xl bg-[#fff7f4] border border-[#c97b6b]/40 shadow-sm backdrop-blur-md animate-scaleUp text-left">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a65341] font-sans-clean">
                Drawn from the Heart &bull; #{randomDrawnReason.id}
              </span>
              <Heart className="w-5 h-5 text-[#a65341] fill-[#a65341] animate-ping" />
            </div>
            <h3 className="font-serif-luxury text-2xl font-bold text-[#4a3a35] mb-2">
              {randomDrawnReason.title}
            </h3>
            <p className="font-serif-luxury text-base sm:text-lg text-[#6d5a54] italic leading-relaxed">
              &ldquo;{randomDrawnReason.content}&rdquo;
            </p>
          </div>
        )}

      </div>

      {/* Add Custom Reason Form Modal/Inline */}
      {showAddForm && (
        <form
          onSubmit={handleAddReason}
          className="w-full max-w-xl mb-12 p-6 rounded-2xl bg-white border border-[#e8d7cf] shadow-xl flex flex-col gap-4 animate-fadeIn"
        >
          <h3 className="text-base font-bold text-[#4a3a35] flex items-center gap-2 font-serif-luxury">
            <Heart className="w-4 h-4 text-[#a65341] fill-[#a65341]" />
            <span>Add a Personal Love Reason from Rahat to Jemi</span>
          </h3>

          <div>
            <label className="text-xs text-[#6d5a54] font-medium block mb-1">Reason Title</label>
            <input
              type="text"
              placeholder="e.g. Your Gentle Voice, The Way You Smile..."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-xl bg-[#fffaf8] border border-[#d8c5bc] text-[#4a3a35] text-sm focus:outline-none focus:border-[#a65341]"
            />
          </div>

          <div>
            <label className="text-xs text-[#6d5a54] font-medium block mb-1">Heartfelt Description</label>
            <textarea
              rows={3}
              placeholder="Describe what makes this quality in Jemi so unforgettable to you..."
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-xl bg-[#fffaf8] border border-[#d8c5bc] text-[#4a3a35] text-sm focus:outline-none focus:border-[#a65341]"
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <label className="text-xs text-[#6d5a54]">Category:</label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as LoveReason['category'])}
                className="px-3 py-1.5 rounded-lg bg-[#fffaf8] border border-[#d8c5bc] text-[#4a3a35] text-xs"
              >
                <option value="soul">Pure Soul</option>
                <option value="smile">Smile & Laughter</option>
                <option value="beauty">Grace & Beauty</option>
                <option value="moments">Our Moments</option>
                <option value="future">Eternal Future</option>
              </select>
            </div>

            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#4a3a35] hover:bg-[#382b27] text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md"
            >
              <Check className="w-4 h-4" />
              <span>Save Reason</span>
            </button>
          </div>
        </form>
      )}

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        <Filter className="w-4 h-4 text-[#8e7d77] mr-1" />
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setActiveCategory(cat.id);
              audioEngine.playChime(1.0);
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
              activeCategory === cat.id
                ? 'bg-[#4a3a35] text-white shadow-md border border-[#382b27]'
                : 'bg-white/80 text-[#6d5a54] hover:text-[#4a3a35] border border-[#4a3a35]/15 hover:bg-white'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid of 3D Flip & Glowing Love Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
        {filteredReasons.map((reason) => (
          <div
            key={reason.id}
            onClick={() => audioEngine.playChime(1.2)}
            className="group relative p-6 rounded-3xl bg-white/80 hover:bg-white border border-[#4a3a35]/15 hover:border-[#a65341]/40 shadow-sm hover:shadow-md backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold text-[#8e7d77] uppercase tracking-[0.2em] font-sans-clean">
                  #{reason.id} &bull; {reason.category}
                </span>
                
                <button
                  onClick={(e) => handleToggleFavorite(reason.id, e)}
                  title="Favorite this reason"
                  className="p-1.5 rounded-full hover:bg-[#f4e8e2] transition-colors"
                >
                  <Star
                    className={`w-4 h-4 ${
                      reason.isFavorite
                        ? 'text-[#a65341] fill-[#a65341]'
                        : 'text-[#c4b5ae] hover:text-[#a65341]'
                    }`}
                  />
                </button>
              </div>

              <h3 className="text-lg sm:text-xl font-bold font-serif-luxury text-[#4a3a35] mb-2 group-hover:text-[#a65341] transition-colors">
                {reason.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#6d5a54] font-serif-luxury italic leading-relaxed">
                &ldquo;{reason.content}&rdquo;
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-[#4a3a35]/10 flex items-center justify-between text-[11px] text-[#8e7d77]">
              <span className="font-sans-clean">Dedicated with love</span>
              <span className="font-cursive text-base text-[#a65341]">Rahat ♥ Jemi</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
