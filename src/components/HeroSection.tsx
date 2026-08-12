import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Volume2, VolumeX, Edit3, MessageCircleHeart } from 'lucide-react';
import { soundManager } from '../utils/audioSynth';

interface HeroSectionProps {
  kissCount: number;
  onAddKisses: (amount: number) => void;
  boyfriendName: string;
  onOpenCustomizer: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  kissCount,
  onAddKisses,
  boyfriendName,
  onOpenCustomizer,
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [lastMessage, setLastMessage] = useState<string | null>(null);

  const handleSendKiss = (amount: number = 1) => {
    onAddKisses(amount);
    soundManager.playKissSound();

    // Trigger romantic heart/kiss confetti burst
    try {
      const scalar = 1.3;
      const kissEmoji = confetti.shapeFromText({ text: '💋', scalar });
      const heartEmoji = confetti.shapeFromText({ text: '💖', scalar });
      const faceEmoji = confetti.shapeFromText({ text: '😘', scalar });

      confetti({
        particleCount: Math.min(amount, 35),
        spread: 70,
        origin: { y: 0.65 },
        shapes: [kissEmoji, heartEmoji, faceEmoji],
        scalar: 1.2,
      });
    } catch {
      // Fallback if canvas confetti fails
    }

    const cuteMessages = [
      'Mwah! A big kiss for Patlu! 💋',
      'Smooch! Sending infinite love your way! 😘',
      'You just received a warm forehead kiss! 🥰',
      'One more kiss added to Patlu\'s collection! 💖',
      'Patlu is officially the most loved girl in the world! 👑',
    ];
    setLastMessage(cuteMessages[Math.floor(Math.random() * cuteMessages.length)]);
  };

  const handleToggleMute = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
  };

  return (
    <div className="relative pt-8 pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
      {/* Top Header Toolbar */}
      <div className="flex justify-between items-center mb-6 max-w-xl mx-auto text-xs sm:text-sm font-medium text-rose-600/80">
        <button
          onClick={onOpenCustomizer}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 hover:bg-white border border-rose-200/60 shadow-xs hover:shadow-sm text-rose-700 transition-all cursor-pointer"
          title="Customize names & secret message"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Personalize Note</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleToggleMute}
            className="p-2 rounded-full bg-white/80 hover:bg-white border border-rose-200/60 shadow-xs text-rose-700 transition-all cursor-pointer"
            title={isMuted ? 'Unmute sounds' : 'Mute sounds'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Greeting Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100/80 border border-rose-200 text-rose-700 text-sm font-semibold tracking-wide shadow-xs mb-6 animate-pulse-subtle">
        <Sparkles className="w-4 h-4 text-rose-500 fill-rose-500" />
        <span>A Special Message For You</span>
        <Sparkles className="w-4 h-4 text-rose-500 fill-rose-500" />
      </div>

      {/* Hero Headline "Hello Patlu 😘" */}
      <div className="relative mb-4">
        <h1 id="hero-title" className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-rose-950 font-serif-display drop-shadow-xs">
          Hello Patlu <span className="inline-block animate-bounce text-6xl sm:text-8xl lg:text-9xl ml-1">😘</span>
        </h1>
        <p className="font-handwriting text-3xl sm:text-4xl text-rose-600 mt-2 font-bold">
          ~ With lots & lots of love ~
        </p>
      </div>

      <p className="max-w-xl mx-auto text-base sm:text-lg text-slate-600 font-sans-body leading-relaxed mb-8">
        Welcome to your very own cozy love corner! Tap the big kiss button below to receive instant kisses, uncover sweet love notes, and redeem your personal love coupons.
      </p>

      {/* Big Action: Send a Kiss */}
      <div className="flex flex-col items-center justify-center gap-4 mb-8">
        <button
          id="send-kiss-btn"
          onClick={() => handleSendKiss(1)}
          className="group relative inline-flex items-center justify-center gap-3 px-8 py-5 rounded-3xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-bold text-xl sm:text-2xl shadow-lg hover:shadow-rose-300/50 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer overflow-hidden border-2 border-white/40"
        >
          <span className="relative z-10 flex items-center gap-3">
            <span className="text-3xl sm:text-4xl group-hover:rotate-12 transition-transform">💋</span>
            <span>Send a Kiss to Patlu</span>
            <span className="text-3xl sm:text-4xl group-hover:-rotate-12 transition-transform">😘</span>
          </span>
          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>

        {/* Floating status alert */}
        {lastMessage && (
          <div className="text-sm sm:text-base font-semibold text-rose-700 bg-white/90 backdrop-blur-xs px-4 py-2 rounded-full border border-rose-200 shadow-xs animate-fade-in flex items-center gap-2">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-ping" />
            <span>{lastMessage}</span>
          </div>
        )}
      </div>

      {/* Kiss Counter Display */}
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-xl max-w-lg mx-auto relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-rose-100 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-pink-100 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="flex items-center gap-2 text-rose-500 font-medium text-xs sm:text-sm uppercase tracking-wider mb-1">
            <MessageCircleHeart className="w-4 h-4" />
            <span>Patlu's Kiss Meter</span>
          </div>

          <div className="text-4xl sm:text-6xl font-extrabold text-slate-900 my-2 font-sans-body tracking-tight">
            {kissCount.toLocaleString()} <span className="text-3xl sm:text-5xl">💋</span>
          </div>

          <p className="text-xs sm:text-sm text-slate-500 mb-5">
            Total virtual kisses delivered to Patlu so far!
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => handleSendKiss(1)}
              className="px-3.5 py-1.5 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs sm:text-sm font-semibold border border-rose-200 transition-colors cursor-pointer"
            >
              +1 Kiss
            </button>
            <button
              onClick={() => handleSendKiss(100)}
              className="px-3.5 py-1.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors cursor-pointer"
            >
              +100 Kiss Shower
            </button>
            <button
              onClick={() => handleSendKiss(1000)}
              className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors cursor-pointer"
            >
              +1,000 Kiss Tsunami! 🌊
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
