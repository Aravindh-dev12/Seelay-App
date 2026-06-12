import type { VisorReply } from './types';

interface Rule {
  match: RegExp;
  reply: string;
  navigateTo?: string;
}

const RULES: Rule[] = [
  {
    match: /duel|battle|challenge/i,
    reply: 'Duels are movement battles. Pick a challenge, perform your moves, and the AI scores style, originality and energy. Taking you to Duels now.',
    navigateTo: 'MainTabs',
  },
  {
    match: /world\s*drop/i,
    reply: 'World Drop opens every Friday at 8pm. One challenge, the whole country moves at once. Clips stay visible 48 hours, then vault into your Life Stamps.',
    navigateTo: 'MainTabs',
  },
  {
    match: /token|wallet|energy|coin/i,
    reply: 'Energy Tokens are earned by moving: duels, remixes and challenges. Spend them in the Store. Opening your wallet.',
    navigateTo: 'EnergyTokens',
  },
  {
    match: /vibe|dna|aura/i,
    reply: 'Your Vibe DNA is built from how you move. It evolves every day. Showing your current aura.',
    navigateTo: 'VibeDNA',
  },
  {
    match: /sound|music|audio|alchemy/i,
    reply: 'Sound Alchemy turns your motion into music. Match with someone and you can fuse your sounds into one shared track.',
    navigateTo: 'SoundAlchemy',
  },
  {
    match: /alter\s*ego|persona|twin/i,
    reply: 'Your Alter Ego is a second persona trained on your Vibe DNA. Unlock it and it can hold your place while you are away.',
    navigateTo: 'AlterEgo',
  },
  {
    match: /match|date|compatib|heart/i,
    reply: 'Motion Match finds people who move like you. Mutual hearts unlock chat. Opening Motion Match.',
    navigateTo: 'MotionMatch',
  },
  {
    match: /stamp|milestone|memor/i,
    reply: 'Life Stamps are your milestone timeline, every breakthrough moment saved forever. Opening your timeline.',
    navigateTo: 'LifeStamps',
  },
  {
    match: /store|buy|shop/i,
    reply: 'The Store has unlocks and items you can grab with Energy Tokens. Opening it now.',
    navigateTo: 'Store',
  },
  {
    match: /delete|remove account/i,
    reply: 'You can delete your account from the Danger Zone at the bottom of Settings. Taking you there.',
    navigateTo: 'Settings',
  },
  {
    match: /setting|privacy|notification/i,
    reply: 'Settings holds your profile, privacy and notification controls. Opening Settings.',
    navigateTo: 'Settings',
  },
  {
    match: /search|find/i,
    reply: 'Opening Search so you can find creators, challenges and sounds.',
    navigateTo: 'Search',
  },
  {
    match: /hello|hi|hey|who are you/i,
    reply: 'Hey, I am Visor, your living guide inside Seelay. Ask me anything, or turn on follow mode and I will move with you.',
  },
  {
    match: /help|what can you do/i,
    reply: 'I can explain any feature, take you anywhere in the app, react to your gestures, and follow your touch in follow mode. Try asking about duels, World Drop or your Vibe DNA.',
  },
];

export function visorThink(input: string): VisorReply {
  for (const rule of RULES) {
    if (rule.match.test(input)) {
      return { text: rule.reply, navigateTo: rule.navigateTo };
    }
  }
  return {
    text: 'I am still learning that one. Try asking me about duels, World Drop, tokens, Vibe DNA, Sound Alchemy, Motion Match or settings.',
  };
}

export function visorGreeting(name?: string): string {
  return name
    ? `Welcome back, ${name}. Your body is the interface. Tap me anytime you need a guide.`
    : 'Welcome to Seelay. Your body is the interface. Tap me anytime you need a guide.';
}
