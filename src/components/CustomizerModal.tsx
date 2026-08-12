import React, { useState } from 'react';
import { Heart, Sparkles, Save, X } from 'lucide-react';
import { soundManager } from '../utils/audioSynth';

interface CustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  customMessage: string;
  onSaveMessage: (msg: string) => void;
}

export const CustomizerModal: React.FC<CustomizerModalProps> = ({
  isOpen,
  onClose,
  customMessage,
  onSaveMessage,
}) => {
  const [text, setText] = useState(customMessage);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playChimeSound();
    onSaveMessage(text);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
      <div className="relative bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border-2 border-rose-200 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 font-bold transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-rose-500 font-bold text-xs uppercase tracking-wider mb-2">
          <Sparkles className="w-4 h-4" />
          <span>Personalize Love Note</span>
        </div>

        <h3 className="text-2xl font-bold text-slate-900 font-serif-display mb-2">
          Write a Secret Note for Patlu 💌
        </h3>

        <p className="text-xs sm:text-sm text-slate-500 mb-4">
          Add a custom message, private inside joke, or heartfelt secret note that will be displayed permanently on Patlu's screen!
        </p>

        <form onSubmit={handleSave}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            placeholder="Type your romantic message for Patlu here... (e.g. You are my sunshine forever! 😘)"
            className="w-full p-4 rounded-2xl border-2 border-rose-100 focus:border-rose-400 focus:ring-2 focus:ring-rose-200 outline-none text-slate-800 font-sans-body text-sm sm:text-base resize-none mb-4"
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-sm font-semibold transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-sm shadow-md transition-colors cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Secret Note</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
