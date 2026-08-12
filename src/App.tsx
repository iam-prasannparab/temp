import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Volume2, VolumeX, Edit3, MessageCircleHeart } from 'lucide-react';
import { DEFAULT_LOVE_NOTES } from './data/romanticContent';
import { LoveNote } from './types';
import { BackgroundHearts } from './components/BackgroundHearts';
import { KissParticleCanvas } from './components/KissParticleCanvas';
import { HeroSection } from './components/HeroSection';
import { LoveNotesEnvelope } from './components/LoveNotesEnvelope';
import { ReasonGenerator } from './components/ReasonGenerator';
import { LoveCoupons } from './components/LoveCoupons';
import { CustomizerModal } from './components/CustomizerModal';
import { soundManager } from './utils/audioSynth';

export default function App() {
  const [kissCount, setKissCount] = useState<number>(() => {
    const saved = localStorage.getItem('patlu_kiss_count');
    return saved ? parseInt(saved, 10) : 1000;
  });

  const [customNote, setCustomNote] = useState<string>(() => {
    return (
      localStorage.getItem('patlu_custom_note') ||
      'Pattu, you make every day brighter, sweeter, and happier! Sending you endless love and a giant hug today and always. 😘❤️'
    );
  });

  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [loveNotes, setLoveNotes] = useState<LoveNote[]>(DEFAULT_LOVE_NOTES);

  // Sync kiss count to localStorage
  useEffect(() => {
    localStorage.setItem('patlu_kiss_count', kissCount.toString());
  }, [kissCount]);

  const handleAddKisses = (amount: number) => {
    setKissCount((prev) => prev + amount);
  };

  const handleSaveCustomNote = (newMsg: string) => {
    setCustomNote(newMsg);
    localStorage.setItem('patlu_custom_note', newMsg);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-pink-50 to-rose-100/60 text-slate-800 relative font-sans-body selection:bg-rose-200 selection:text-rose-900 overflow-x-hidden">
      {/* Interactive Screen Click Particles */}
      <KissParticleCanvas />

      {/* Floating Animated Hearts Background */}
      <BackgroundHearts />

      {/* Main Container */}
      <main className="relative z-10 pb-16">
        {/* Hero Section with "Hello Patlu 😘" */}
        <HeroSection
          kissCount={kissCount}
          onAddKisses={handleAddKisses}
          boyfriendName="Your Favorite Person"
          onOpenCustomizer={() => setIsCustomizerOpen(true)}
        />

        {/* Custom Love Banner (if present) */}
        {customNote && (
          <div className="max-w-3xl mx-auto px-4 sm:px-6 mb-12">
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border-2 border-rose-200 shadow-xl relative overflow-hidden text-center">
              <div className="absolute top-0 right-0 w-20 h-20 bg-rose-100/60 rounded-bl-full pointer-events-none" />
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-bold mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Special Personal Note</span>
              </div>
              <p className="font-handwriting text-2xl sm:text-3xl text-rose-900 leading-relaxed font-bold">
                "{customNote}"
              </p>
              <div className="mt-4 flex justify-center">
                <button
                  onClick={() => setIsCustomizerOpen(true)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-800 transition-colors cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Note</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Interactive Love Notes Envelopes */}
        <LoveNotesEnvelope
          notes={loveNotes}
          onOpenNote={(note) => {
            // Note opened
          }}
        />

        {/* Interactive Reasons Generator */}
        <ReasonGenerator />

        {/* Redeemable Love Coupons */}
        <LoveCoupons />

        {/* Sweet Footer */}
        <footer className="text-center px-4 py-8 max-w-lg mx-auto text-xs sm:text-sm text-slate-500 border-t border-rose-200/60">
          <div className="flex items-center justify-center gap-1.5 font-semibold text-rose-700 mb-1">
            <span>Made with endless love for Patlu</span>
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
          </div>
          <p className="text-slate-400">
            Remember: You can tap anywhere on the screen for floating kisses! 💋
          </p>
        </footer>
      </main>

      {/* Modal to personalize custom message */}
      <CustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        customMessage={customNote}
        onSaveMessage={handleSaveCustomNote}
      />
    </div>
  );
}
