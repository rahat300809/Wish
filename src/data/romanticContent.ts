import { Milestone, LoveReason, LoveLetterPreset } from '../types';

export const ROMANTIC_REASONS: LoveReason[] = [
  {
    id: 1,
    title: 'Your Radiant Smile',
    content: 'The way your entire face lights up whenever you laugh—it brings warmth and peace to my darkest days.',
    category: 'smile',
  },
  {
    id: 2,
    title: 'Your Pure & Kind Heart',
    content: 'You care so deeply for everyone around you. Your gentle soul is the sweetest gift in my life.',
    category: 'soul',
  },
  {
    id: 3,
    title: 'The Sparkle in Your Eyes',
    content: 'When you look at me with your soft, loving gaze, I see my entire future and eternal home.',
    category: 'beauty',
  },
  {
    id: 4,
    title: 'Your Comforting Presence',
    content: 'Just holding your hand or sitting quietly beside you makes all the world’s noise fade away into serenity.',
    category: 'moments',
  },
  {
    id: 5,
    title: 'How You Believe in Me',
    content: 'Your unwavering support and trust give me the strength to overcome every challenge with confidence.',
    category: 'soul',
  },
  {
    id: 6,
    title: 'Our Sweet Little Conversations',
    content: 'Whether talking about our deepest dreams at 2 AM or laughing at silly jokes, every moment with you is precious.',
    category: 'moments',
  },
  {
    id: 7,
    title: 'The Grace You Carry',
    content: 'Everything you do, from your soft gestures to your graceful stride, leaves me in awe every single day.',
    category: 'beauty',
  },
  {
    id: 8,
    title: 'Building Our Dreams Together',
    content: 'I cherish every step we take together towards building our beautiful home, our happiness, and our future.',
    category: 'future',
  },
  {
    id: 9,
    title: 'Your Playful & Cheerful Spirit',
    content: 'The way you playfully tease me and bring spontaneous joy into our lives keeps my heart dancing.',
    category: 'smile',
  },
  {
    id: 10,
    title: 'You Are My Forever Home',
    content: 'No matter where we go in this vast universe, my soul is always at peace as long as I am with you, Jemi.',
    category: 'future',
  },
  {
    id: 11,
    title: 'Your Tender Voice',
    content: 'Hearing you call my name with love is the sweetest melody my ears could ever know.',
    category: 'beauty',
  },
  {
    id: 12,
    title: 'How We Complete Each Other',
    content: 'You are the missing piece of my heart—where I am weak you are strong, and together we are whole.',
    category: 'soul',
  },
];

export const INITIAL_MILESTONES: Milestone[] = [
  {
    id: '1',
    title: 'When My Heart Found Yours',
    date: 'The Beginning',
    description: 'The unforgettable day destiny crossed our paths. One look at you, Jemi, and I knew my life would never be the same.',
    icon: 'Sparkles',
    tag: 'Destiny',
  },
  {
    id: '2',
    title: 'Our First Beautiful Talks',
    date: 'Endless Whispers',
    description: 'Hours turned into seconds as we shared our thoughts, smiles, and dreams under the moonlit sky.',
    icon: 'HeartHandshake',
    tag: 'Connection',
  },
  {
    id: '3',
    title: 'The Day You Said Yes',
    date: 'Sacred Promise',
    description: 'When our hands intertwined and two souls became one forever. The happiest, most blessed moment of my existence.',
    icon: 'Heart',
    tag: 'Eternity',
  },
  {
    id: '4',
    title: 'Our Journey of a Lifetime',
    date: 'Every Single Day',
    description: 'Every morning I wake up grateful to the heavens for blessing me with the most wonderful, loving wife in the world.',
    icon: 'Crown',
    tag: 'Forever',
  },
];

export const LOVE_LETTER_PRESETS: LoveLetterPreset[] = [
  {
    id: 'eternal-vow',
    title: 'My Eternal Vow of Love',
    mood: 'Deep & Soulful',
    salutation: 'My Dearest Jubaida (Jemi), My Beloved Wife,',
    text: `From the very moment you walked into my life, you transformed my world into an endless symphony of light, laughter, and serenity. 

You are not merely my wife; you are my best friend, my greatest confidante, and the gentle keeper of my soul. In your eyes, I find the comfort of a thousand peaceful sunsets. In your smile, I see the purest joy this universe has to offer.

Through every triumph and every quiet moment, I promise to love you fiercely, cherish you unconditionally, protect your heart with my very life, and hold your hand through every chapter of our eternity. 

You are my paradise on Earth, Jemi. I loved you yesterday, I love you today, and I will love you beyond all stars and time.`,
    signature: 'Forever & Completely Yours,\nRahat ♥',
  },
  {
    id: 'poetic-starlight',
    title: 'Written in the Constellations',
    mood: 'Celestial Romance',
    salutation: 'To My Queen, Jubaida Haque Jemi,',
    text: `If the sky were a canvas and the stars were words of gold, they could never fully tell the depth of my love for you. 

Your grace makes the blooming roses envious, and your gentle voice turns every chaotic thought into pure harmony. When I look at you, I see the answered prayer of my entire existence. 

Thank you for choosing to walk this life with me. Thank you for your warmth, your sweetness, and your boundless love. With every breath I take, my heart beats solely for you.`,
    signature: 'With all my heart and soul,\nYour Devoted Rahat ♥',
  },
  {
    id: 'sweet-cherish',
    title: 'My Favorite Blessing',
    mood: 'Sweet & Heartfelt',
    salutation: 'My Sweetest Jemi,',
    text: `Every day with you feels like a blessing I could never thank the universe enough for. I adore the little things—your laughter when we share a silly joke, the warmth of your touch, and the comforting feeling of coming home to you.

I wish you endless joy, radiant health, and boundless happiness today and every day of your life. May every dream in your heart blossom into reality, and know that Rahat is always standing right beside you, cheering for you and loving you more than words could ever describe.`,
    signature: 'All my love, always,\nRahat',
  },
];
