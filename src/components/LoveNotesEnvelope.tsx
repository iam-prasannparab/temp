import React, { useState } from 'react';
import { Mail, Heart, Sparkles, Sun, Star, HeartHandshake, CheckCircle2, Lock } from 'lucide-react';
import { LoveNote } from '../types';
import { soundManager } from '../utils/audioSynth';

interface LoveNotesEnvelopeProps {
  notes: LoveNote[];
  onOpenNote: (note: LoveNote) => void;
}

export const LoveNotesEnvelope: React.FC<LoveNotesEnvelopeProps> = ({ notes, onOpenNote }) => {
  const [selectedNote, setSelectedNote] = useState<LoveNote | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sun': return <Sun className="w-5 h-5 text-amber-500" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-rose-500" />;
      case 'HeartHandshake': return <HeartHandshake className="w-5 h-5 text-pink-500" />;
      case 'Star': return <Star className="w-5 h-5 text-purple-500" />;
      default: return <Heart className="w-5 h-5 text-rose-500" />;
    }
  };

  const handleCardClick = (note: LoveNote) => {
    soundManager.playChimeSound();
    setSelectedNote(note);
    onOpenNote(note);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-rose-950 font-serif-display mb-2">
          Love Notes For Patlu 💌
        </h2>
        <p className="text-sm sm:text-base text-slate-600 font-sans-body">
          Tap on any letter below to unseal a special message hidden inside.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {notes.map((note) => (
          <div
            key={note.id}
            onClick={() => handleCardClick(note)}
            className="interactive-card group relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-rose-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between min-h-[160px]"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-rose-50/60 rounded-bl-full -z-0 group-hover:scale-110 transition-transform" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-100">
                  {getIcon(note.iconName)}
                  <span>{note.tag}</span>
                </span>
                <Mail className="w-5 h-5 text-rose-400 group-hover:text-rose-600 transition-colors" />
              </div>

              <h3 className="text-xl font-bold text-slate-900 group-hover:text-rose-700 transition-colors font-sans-body mb-2">
                {note.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 line-clamp-2">
                {note.content}
              </p>
            </div>

            <div className="relative z-10 pt-4 flex items-center justify-between text-xs font-bold text-rose-600 group-hover:translate-x-1 transition-transform">
              <span>Tap to Open Letter 💌</span>
              <span>→</span>
            </div>
          </div>
        ))}
      </div>

      {/* Love Note Modal Dialog */}
      {selectedNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="relative bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border-2 border-rose-200 shadow-2xl transform transition-all animate-scale-up">
            <button
              onClick={() => setSelectedNote(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-lg transition-colors cursor-pointer"
            >
              ✕
            </button>

            <div className="text-center mb-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-rose-100 flex items-center justify-center text-3xl mb-3 shadow-inner">
                💌
              </div>
              <span className="text-xs font-bold tracking-widest text-rose-500 uppercase">
                {selectedNote.tag}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif-display mt-1">
                {selectedNote.title}
              </h3>
            </div>

            <div className="bg-rose-50/70 rounded-2xl p-6 border border-rose-100 mb-6 font-handwriting text-2xl text-rose-950 leading-relaxed text-center shadow-inner">
              "{selectedNote.content}"
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => setSelectedNote(null)}
                className="px-6 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-sm shadow-md transition-colors cursor-pointer"
              >
                Close & Hug Patlu 🤗
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
