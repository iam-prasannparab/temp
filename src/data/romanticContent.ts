import { LoveNote, LoveReason, LoveCoupon } from '../types';

export const DEFAULT_LOVE_NOTES: LoveNote[] = [
  {
    id: 'note-1',
    title: 'A Good Morning Hug',
    content: 'Just wanted to remind you that you are the absolute brightest part of my day. Sending you the warmest hug and a thousand kisses right now! 😘❤️',
    iconName: 'Sun',
    tag: 'Daily Smile',
  },
  {
    id: 'note-2',
    title: 'Why You Are So Special',
    content: 'Your smile can light up the entire room, and your kindness makes everything feel softer and happier. Thank you for just being you, Patlu!',
    iconName: 'Sparkles',
    tag: 'Heartfelt',
  },
  {
    id: 'note-3',
    title: 'An Instant Kiss Pass',
    content: 'This note entitles you to 100 extra kisses right this second. Press the big kiss button at the top to claim them all! 💋💋💋',
    iconName: 'HeartHandshake',
    tag: 'Sweet Perk',
  },
  {
    id: 'note-4',
    title: 'My Favorite Person',
    content: 'Out of 8 billion people on this planet, you are my favorite person to talk to, laugh with, and make memories alongside. Forever & always!',
    iconName: 'Star',
    tag: 'Always & Forever',
  },
];

export const REASONS_WHY_I_LOVE_PATLU: LoveReason[] = [
  { id: 1, text: 'The adorable way you smile whenever you get excited.', emoji: '✨' },
  { id: 2, text: 'How you make even the ordinary moments feel so warm and special.', emoji: '🌸' },
  { id: 3, text: 'Your laugh — it is literally my absolute favorite sound in the world.', emoji: '🎵' },
  { id: 4, text: 'The way you care so genuinely about the people you love.', emoji: '💖' },
  { id: 5, text: 'You always know how to make me feel better no matter what.', emoji: '🤗' },
  { id: 6, text: 'Because you are my best friend and my favorite human being.', emoji: '👑' },
  { id: 7, text: 'Your cute expressions that always bring a smile to my face.', emoji: '🥰' },
  { id: 8, text: 'The cozy comfort of just being together and relaxing.', emoji: '☕' },
  { id: 9, text: 'Because no matter how many kisses I give you, it is never enough! 💋', emoji: '😘' },
];

export const DEFAULT_LOVE_COUPONS: LoveCoupon[] = [
  {
    id: 'coupon-1',
    title: '1,000 Extra Kisses Pass',
    description: 'Redeemable anytime for non-stop kisses on your forehead, cheeks, and lips!',
    emoji: '💋',
    isRedeemed: false,
  },
  {
    id: 'coupon-2',
    title: 'Late Night Snack Run',
    description: 'Valid for your favorite treats delivered or picked up whenever cravings hit!',
    emoji: '🍩',
    isRedeemed: false,
  },
  {
    id: 'coupon-3',
    title: 'Movie Night Remote Control',
    description: 'Gives Patlu 100% full authority over movie selection and popcorn distribution.',
    emoji: '🍿',
    isRedeemed: false,
  },
  {
    id: 'coupon-4',
    title: 'Unlimited Head Massage & Cuddles',
    description: 'Minimum 30 minutes of cozy hair strokes, back rubs, and warm hugs.',
    emoji: '🧸',
    isRedeemed: false,
  },
];
