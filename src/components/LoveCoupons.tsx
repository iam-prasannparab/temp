import React, { useState } from 'react';
import { LoveCoupon } from '../types';
import { DEFAULT_LOVE_COUPONS } from '../data/romanticContent';
import { Ticket, CheckCircle, Heart } from 'lucide-react';
import { soundManager } from '../utils/audioSynth';

export const LoveCoupons: React.FC = () => {
  const [coupons, setCoupons] = useState<LoveCoupon[]>(() => {
    const saved = localStorage.getItem('patlu_love_coupons');
    if (saved) {
      try { return JSON.parse(saved); } catch { return DEFAULT_LOVE_COUPONS; }
    }
    return DEFAULT_LOVE_COUPONS;
  });

  const handleRedeem = (id: string) => {
    soundManager.playChimeSound();
    soundManager.playKissSound();

    const updated = coupons.map((c) => {
      if (c.id === id) {
        return { ...c, isRedeemed: !c.isRedeemed };
      }
      return c;
    });

    setCoupons(updated);
    localStorage.setItem('patlu_love_coupons', JSON.stringify(updated));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-16">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-bold mb-2">
          <Ticket className="w-3.5 h-3.5" />
          <span>Redeemable Perks</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-rose-950 font-serif-display">
          Patlu's Love Coupons 🎟️
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 font-sans-body">
          These coupons never expire! Tap to redeem whenever you want a treat.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {coupons.map((coupon) => (
          <div
            key={coupon.id}
            className={`relative rounded-2xl p-5 border-2 transition-all duration-200 overflow-hidden ${
              coupon.isRedeemed
                ? 'bg-rose-50/60 border-rose-200 opacity-90'
                : 'bg-white border-rose-200/80 hover:border-rose-400 shadow-md hover:shadow-lg'
            }`}
          >
            {/* Coupon Notch Left & Right styling */}
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-rose-50 border-r border-rose-200" />
            <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-rose-50 border-l border-rose-200" />

            <div className="pl-3 pr-3 flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 flex items-center justify-center text-2xl shrink-0 shadow-inner">
                {coupon.emoji}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-bold text-slate-900 text-lg font-sans-body">
                    {coupon.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 my-1">
                  {coupon.description}
                </p>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-rose-500 uppercase tracking-wider">
                    Valid Forever • Unlimited Uses
                  </span>

                  <button
                    onClick={() => handleRedeem(coupon.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                      coupon.isRedeemed
                        ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                        : 'bg-rose-500 hover:bg-rose-600 text-white shadow-xs'
                    }`}
                  >
                    {coupon.isRedeemed ? (
                      <>
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Redeemed! (Tap to reset)</span>
                      </>
                    ) : (
                      <>
                        <Heart className="w-3.5 h-3.5 fill-white" />
                        <span>Redeem Coupon</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
