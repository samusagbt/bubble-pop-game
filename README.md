# 🫧 Bubble Pop - Farcaster Mini App

A fun and addictive bubble popping game built for Farcaster/Warpcast with social sharing features.

## 🎮 Game Features

- **60-second gameplay** with progressive difficulty
- **4 bubble types** with different point values:
  - Red: 10 points
  - Blue: 15 points  
  - Green: 20 points
  - Gold: 50 points
- **Achievement system** with unlockable titles
- **Social sharing** integration with Warpcast/Farcaster
- **Mobile-optimized** touch controls
- **Smooth animations** using HTML5 Canvas

## 🚀 Live Demo

[Play the game here!](https://your-username.github.io/bubble-pop-game)

## 📱 Farcaster Integration

This mini app is designed to work seamlessly with:
- **Base App** - Native embedding and sharing
- **Warpcast** - Social sharing with pre-filled messages
- **Farcaster Protocol** - Frame meta tags for rich previews

## 🛠️ Tech Stack

- **HTML5** - Structure and Canvas for game rendering
- **CSS3** - Responsive styling and animations
- **Vanilla JavaScript** - Game logic and interactions
- **Web APIs** - Share API, Canvas API, Touch Events

## 📦 Installation

1. Clone this repository:
```bash
git clone https://github.com/your-username/bubble-pop-game.git
cd bubble-pop-game
```

2. Serve the files using a local web server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve

# Using PHP
php -S localhost:8000
```

3. Open `http://localhost:8000` in your browser

## 🚀 Deployment

### GitHub Pages
1. Push code to GitHub
2. Go to Settings > Pages
3. Select source branch (main)
4. Your game will be available at `https://your-username.github.io/bubble-pop-game`

### Vercel
1. Connect your GitHub repository to Vercel
2. Deploy automatically on push
3. Configure custom domain if needed

### Base Mini App Setup
1. Update the meta tags in `index.html` with your domain
2. Configure `minikit.config.ts` (if using MiniKit)
3. Set up account association through Base Build tools
4. Submit for review in Base App catalog

## 🎯 Game Mechanics

- **Objective**: Pop as many bubbles as possible in 60 seconds
- **Controls**: Tap/click bubbles to pop them
- **Scoring**: Different colors give different points
- **Difficulty**: Spawn rate increases over time
- **End Game**: Share your score on Farcaster/Warpcast

## 🏆 Achievement System

- 🫧 **Bubble Novice** - 100 points
- ⭐ **Pop Star** - 250 points
- 🎯 **Bubble Master** - 500 points
- 🏆 **Pop Legend** - 750 points
- 👑 **Bubble Champion** - 1000+ points

## 🔧 Customization

### Bubble Configuration
Edit the bubble types in `app.js`:
```javascript
bubbleTypes: [
    {color: "#FF6B6B", name: "Red", points: 10, frequency: 40},
    {color: "#4ECDC4", name: "Blue", points: 15, frequency: 30},
    // Add more types...
]
```

### Share Messages
Customize share text in `app.js`:
```javascript
shareMessages: [
    "I just scored {score} points in Bubble Pop! 🫧 Can you beat me?",
    // Add more messages...
]
```

## 🌐 Browser Support

- **Chrome/Chromium** - Full support
- **Safari** - Full support  
- **Firefox** - Full support
- **Mobile browsers** - Optimized for touch

## 📄 License

MIT License - feel free to fork and customize!

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

- Create an issue for bugs
- Star the repo if you like it!
- Share your high scores on Farcaster

---

Built with ❤️ for the Farcaster community