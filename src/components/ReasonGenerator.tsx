import React, { useState } from 'react';
import { Heart, Sparkles, RefreshCw } from 'lucide-react';
import { LoveReason } from '../types';
import { REASONS_WHY_I_LOVE_PATLU } from '../data/romanticContent';
import { soundManager } from '../utils/audioSynth';

export const ReasonGenerator: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentReason = REASONS_WHY_I_LOVE_PATLU[currentIndex];

  const handleNextReason = () => {
    soundManager.playPopSound();
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % REASONS_WHY_I_LOVE_PATLU.length);
      setIsAnimating(false);
    }, 200);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 mb-12">
      <div className="bg-gradient-to-br from-rose-500 via-pink-500 to-rose-600 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        {/* Background Decorative Circles */}
        <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-white/10 rounded-full blur-xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-40 h-40 bg-black/10 rounded-full blur-xl pointer-events-none" />

        <div className="relative z-10 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-white text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Reason #{currentIndex + 1} Of {REASONS_WHY_I_LOVE_PATLU.length}</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold font-serif-display mb-6">
            Why Patlu Is My Favorite Human 💖
          </h3>

          <div
            className={`min-h-[120px] flex items-center justify-center bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-inner mb-6 transition-all duration-200 ${
              isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
            }`}
          >
            <p className="text-xl sm:text-2xl font-bold font-sans-body leading-snug">
              <span className="text-3xl sm:text-4xl mr-2">{currentReason.emoji}</span>
              "{currentReason.text}"
            </p>
          </div>

          <button
            onClick={handleNextReason}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-rose-700 font-bold text-sm sm:text-base shadow-md hover:bg-rose-50 active:scale-95 transition-all cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Click For Another Reason 😘</span>
          </button>
        </div>
      </div>
    </div>
  );
};
