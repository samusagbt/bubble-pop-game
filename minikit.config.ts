export const ROOT_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-username.github.io/bubble-pop-game'
  : 'http://localhost:3000';

export const minikitConfig = {
  accountAssociation: {
    // Will be filled after account association setup
    "header": "",
    "payload": "", 
    "signature": ""
  },
  miniapp: {
    version: "1",
    name: "Bubble Pop",
    subtitle: "Addictive Bubble Popping Game",
    description: "Pop colorful bubbles to score points and share your achievements on Farcaster!",
    screenshotUrls: [`${ROOT_URL}/screenshot-portrait.png`],
    iconUrl: `${ROOT_URL}/icon.png`,
    splashImageUrl: `${ROOT_URL}/splash.png`,
    splashBackgroundColor: "#667eea",
    homeUrl: ROOT_URL,
    webhookUrl: `${ROOT_URL}/api/webhook`,
    primaryCategory: "entertainment",
    tags: ["game", "arcade", "bubbles", "social", "fun"],
    heroImageUrl: `${ROOT_URL}/hero.png`,
    tagline: "Pop bubbles, beat scores, share achievements!",
    ogTitle: "Bubble Pop - Farcaster Mini App",
    ogDescription: "Addictive bubble popping game with social sharing for Farcaster",
    ogImageUrl: `${ROOT_URL}/og-image.png`,
  },
} as const;

export default minikitConfig;