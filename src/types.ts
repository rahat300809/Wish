export type TabScene = 'universe' | 'cake' | 'rose' | 'letter' | 'reasons' | 'timeline' | 'surprise' | 'keepsake';

export type RomanticTheme = 'natural-linen' | 'terracotta-clay' | 'rose-blush' | 'sage-earth';

export interface Milestone {
  id: string;
  title: string;
  date: string;
  description: string;
  icon: string;
  tag: string;
}

export interface LoveReason {
  id: number;
  title: string;
  content: string;
  category: 'beauty' | 'soul' | 'moments' | 'future' | 'smile';
  isFavorite?: boolean;
}

export interface LoveLetterPreset {
  id: string;
  title: string;
  mood: string;
  text: string;
  salutation: string;
  signature: string;
}

export interface RoseWish {
  id: string;
  roseType: 'crimson' | 'blush' | 'sunset' | 'white' | 'terracotta';
  roseName: string;
  recipient: string;
  sender: string;
  message: string;
  meaning: string;
  date: string;
}

