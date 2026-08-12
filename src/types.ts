export interface LoveNote {
  id: string;
  title: string;
  content: string;
  iconName: string;
  tag: string;
  isUnlocked?: boolean;
}

export interface LoveReason {
  id: number;
  text: string;
  emoji: string;
}

export interface LoveCoupon {
  id: string;
  title: string;
  description: string;
  emoji: string;
  isRedeemed: boolean;
}

export interface ClickParticle {
  id: string;
  x: number;
  y: number;
  emoji: string;
  size: number;
  rotation: number;
}
