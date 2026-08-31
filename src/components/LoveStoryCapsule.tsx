import React, { useState } from 'react';
import { INITIAL_MILESTONES } from '../data/romanticContent';
import { Milestone } from '../types';
import { Sparkles, Heart, Plus, Calendar, Crown, HeartHandshake, Check, Flower2 } from 'lucide-react';
import { audioEngine } from '../audio/RomanticAudioEngine';
import { launchRoseShower } from '../utils/celebrationEffects';

export const LoveStoryCapsule: React.FC = () => {
  const [milestones, setMilestones] = useState<Milestone[]>(INITIAL_MILESTONES);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newTag, setNewTag] = useState('Memory');

  const handleAddMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDesc.trim()) return;

    const entry: Milestone = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      date: newDate.trim() || 'Timeless Moment',
      description: newDesc.trim(),
      icon: 'Heart',
      tag: newTag.trim() || 'Love',
    };

    setMilestones([entry, ...milestones]);
    setNewTitle('');
    setNewDate('');
    setNewDesc('');
    setShowAddModal(false);
    audioEngine.playChime(1.3);
    launchRoseShower();
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-[#a65341]" />;
      case 'HeartHandshake': return <HeartHandshake className="w-5 h-5 text-[#a65341]" />;
      case 'Crown': return <Crown className="w-5 h-5 text-[#a65341]" />;
      case 'Flower2': return <Flower2 className="w-5 h-5 text-[#a65341]" />;
      default: return <Heart className="w-5 h-5 text-[#a65341] fill-[#a65341]" />;
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 max-w-5xl mx-auto flex flex-col items-center">
      
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/80 border border-[#4a3a35]/20 text-[#6d5a54] text-xs font-semibold uppercase tracking-[0.25em] mb-3 shadow-sm font-sans-clean">
          <Heart className="w-3.5 h-3.5 text-[#a65341] fill-[#a65341]" />
          <span>Our Sacred Journey</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif-luxury text-[#4a3a35] font-medium tracking-tight">
          The Story of Rahat &amp; Jemi
        </h1>
        <p className="font-serif-luxury text-base sm:text-xl text-[#7c635b] mt-2 italic max-w-xl mx-auto">
          Every memory with you is etched eternally in my heart, timeless and infinite.
        </p>
      </div>

      {/* Devotional Eternal Journey Banner */}
      <div className="w-full mb-12 p-6 sm:p-8 rounded-3xl bg-white/90 border border-[#e8d7cf] shadow-md backdrop-blur-xl flex flex-col items-center text-center text-[#4a3a35]">
        <div className="w-12 h-12 rounded-full bg-[#f4e8e2] border border-[#d8c5bc] flex items-center justify-center mb-3 shadow-sm">
          <Sparkles className="w-6 h-6 text-[#a65341]" />
        </div>
        
        <h2 className="font-serif-luxury text-2xl sm:text-3xl font-medium text-[#4a3a35] mb-2">
          An Everlasting Bond Beyond Time
        </h2>
        
        <p className="font-serif-luxury text-base sm:text-lg text-[#6d5a54] italic max-w-2xl leading-relaxed">
          &ldquo;Our love is not defined by days or numbers, but by the depth of every glance, the gentle warmth of your smile, and the unwavering devotion I carry for you every single breath.&rdquo;
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <span className="px-4 py-1.5 rounded-full bg-[#fffaf8] border border-[#d8c5bc] text-[#4a3a35] text-xs font-serif-luxury italic">
            Forever Cherished
          </span>
          <span className="px-4 py-1.5 rounded-full bg-[#fffaf8] border border-[#d8c5bc] text-[#4a3a35] text-xs font-serif-luxury italic">
            Endlessly Beloved
          </span>
          <span className="px-4 py-1.5 rounded-full bg-[#fffaf8] border border-[#d8c5bc] text-[#a65341] text-xs font-serif-luxury italic font-bold">
            Rahat &hearts; Jemi
          </span>
        </div>
      </div>

      {/* Timeline Controls & Add Button */}
      <div className="w-full flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold font-serif-luxury text-[#4a3a35] flex items-center gap-2">
          <Calendar className="w-5 h-5 text-[#a65341]" />
          <span>Our Sacred Milestones</span>
        </h2>

        <button
          onClick={() => setShowAddModal(!showAddModal)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#4a3a35] hover:bg-[#382b27] text-white text-xs sm:text-sm font-bold shadow-md font-sans-clean"
        >
          <Plus className="w-4 h-4" />
          <span>{showAddModal ? 'Close Form' : 'Add Milestone'}</span>
        </button>
      </div>

      {/* Add Milestone Form */}
      {showAddModal && (
        <form
          onSubmit={handleAddMilestone}
          className="w-full mb-10 p-6 rounded-2xl bg-white border border-[#e8d7cf] shadow-xl flex flex-col gap-4 animate-fadeIn"
        >
          <h3 className="text-sm font-bold text-[#4a3a35] font-serif-luxury">
            Add a New Memory to Our Journey
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-[#6d5a54] font-medium block mb-1">Milestone Title</label>
              <input
                type="text"
                placeholder="e.g. Our First Romantic Trip, Special Anniversary..."
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-xl bg-[#fffaf8] border border-[#d8c5bc] text-[#4a3a35] text-sm focus:outline-none focus:border-[#a65341]"
              />
            </div>
            <div>
              <label className="text-xs text-[#6d5a54] font-medium block mb-1">Date / Period</label>
              <input
                type="text"
                placeholder="e.g. Autumn Evening, July 14th..."
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-xl bg-[#fffaf8] border border-[#d8c5bc] text-[#4a3a35] text-sm focus:outline-none focus:border-[#a65341]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-[#6d5a54] font-medium block mb-1">Story / Feeling</label>
            <textarea
              rows={3}
              placeholder="What made this moment with Jemi so unforgettable to Rahat?"
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-xl bg-[#fffaf8] border border-[#d8c5bc] text-[#4a3a35] text-sm focus:outline-none focus:border-[#a65341]"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <label className="text-xs text-[#6d5a54]">Tag:</label>
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                className="px-3 py-1 rounded-lg bg-[#fffaf8] border border-[#d8c5bc] text-[#4a3a35] text-xs w-28"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#4a3a35] hover:bg-[#382b27] text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md"
            >
              <Check className="w-4 h-4" />
              <span>Save Memory</span>
            </button>
          </div>
        </form>
      )}

      {/* Vertical Timeline Tree */}
      <div className="relative w-full border-l-2 border-[#4a3a35]/20 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-8">
        {milestones.map((m) => (
          <div
            key={m.id}
            onClick={() => audioEngine.playChime(1.1)}
            className="group relative p-6 rounded-3xl bg-white/80 hover:bg-white border border-[#4a3a35]/15 hover:border-[#a65341]/40 shadow-sm hover:shadow-md backdrop-blur-md transition-all duration-300 hover:-translate-y-1 cursor-pointer"
          >
            {/* Timeline node icon */}
            <div className="absolute -left-[35px] sm:-left-[51px] top-6 w-8 h-8 rounded-full bg-[#4a3a35] border-2 border-white flex items-center justify-center shadow-md group-hover:scale-125 transition-transform text-white">
              {getIcon(m.icon)}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <span className="px-3 py-0.5 rounded-full bg-[#f4e8e2] border border-[#d8c5bc] text-[#4a3a35] text-xs font-semibold font-sans-clean">
                {m.tag}
              </span>
              <span className="text-xs text-[#8e7d77] font-serif-luxury italic">
                {m.date}
              </span>
            </div>

            <h3 className="text-xl font-bold font-serif-luxury text-[#4a3a35] group-hover:text-[#a65341] transition-colors mb-2">
              {m.title}
            </h3>

            <p className="text-sm text-[#6d5a54] font-serif-luxury leading-relaxed italic">
              &ldquo;{m.description}&rdquo;
            </p>
          </div>
        ))}
      </div>

    </div>
  );
};
