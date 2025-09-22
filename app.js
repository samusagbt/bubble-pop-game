class BubbleGame {
    constructor() {
        this.gameState = 'start'; // 'start', 'playing', 'ended'
        this.score = 0;
        this.timeLeft = 60;
        this.bubbles = [];
        this.canvas = null;
        this.ctx = null;
        this.gameTimer = null;
        this.animationFrame = null;
        this.spawnTimer = null;
        this.currentSpawnInterval = 800;

        // Game configuration
        this.gameConfig = {
            duration: 60,
            bubbleTypes: [
                {color: "#FF6B6B", name: "Red", points: 10, frequency: 40},
                {color: "#4ECDC4", name: "Blue", points: 15, frequency: 30},
                {color: "#45B7D1", name: "Green", points: 20, frequency: 20},
                {color: "#FFD93D", name: "Gold", points: 50, frequency: 10}
            ],
            bubbleSize: {min: 50, max: 80},
            spawnInterval: {start: 800, end: 400},
            bubbleLifetime: 4000
        };

        this.achievements = [
            {threshold: 100, title: "Bubble Novice", emoji: "🫧"},
            {threshold: 250, title: "Pop Star", emoji: "⭐"},
            {threshold: 500, title: "Bubble Master", emoji: "🎯"},
            {threshold: 750, title: "Pop Legend", emoji: "🏆"},
            {threshold: 1000, title: "Bubble Champion", emoji: "👑"}
        ];

        this.shareMessages = [
            "I just scored {score} points in Bubble Pop! 🫧 Can you beat me?",
            "Popped my way to {score} points! 🎯 Think you can top that?",
            "Just crushed {score} points in Bubble Pop! 🔥 Your turn!",
            "New high score: {score} points! 🏆 Who's up for the challenge?"
        ];

        this.init();
    }

    init() {
        console.log('Initializing Bubble Game...');
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setupDOM();
                this.setupEventListeners();
                this.setupCanvas();
            });
        } else {
            this.setupDOM();
            this.setupEventListeners();
            this.setupCanvas();
        }
    }

    setupDOM() {
        // Get DOM elements
        this.startScreen = document.getElementById('startScreen');
        this.gameScreen = document.getElementById('gameScreen');
        this.endScreen = document.getElementById('endScreen');

        this.playButton = document.getElementById('playButton');
        this.scoreValue = document.getElementById('scoreValue');
        this.timerValue = document.getElementById('timerValue');
        this.finalScore = document.getElementById('finalScore');
        this.shareButton = document.getElementById('shareButton');
        this.playAgainButton = document.getElementById('playAgainButton');

        this.achievementBadge = document.getElementById('achievementBadge');
        this.achievementEmoji = document.getElementById('achievementEmoji');
        this.achievementTitle = document.getElementById('achievementTitle');
    }

    setupEventListeners() {
        console.log('Setting up event listeners...');

        this.playButton.addEventListener('click', () => this.startGame());
        this.shareButton.addEventListener('click', () => this.shareScore());
        this.playAgainButton.addEventListener('click', () => this.resetGame());

        // Prevent context menu on long press (mobile)
        document.addEventListener('contextmenu', (e) => e.preventDefault());
    }

    setupCanvas() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');

        // Set canvas size
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());

        // Add click/touch listeners to canvas
        this.canvas.addEventListener('click', (e) => this.handleCanvasClick(e));
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.handleCanvasTouch(e);
        });
    }

    resizeCanvas() {
        const pixelRatio = window.devicePixelRatio || 1;
        this.canvas.width = window.innerWidth * pixelRatio;
        this.canvas.height = window.innerHeight * pixelRatio;
        this.canvas.style.width = window.innerWidth + 'px';
        this.canvas.style.height = window.innerHeight + 'px';
        this.ctx.scale(pixelRatio, pixelRatio);
    }

    startGame() {
        console.log('Starting game...');
        this.gameState = 'playing';
        this.score = 0;
        this.timeLeft = this.gameConfig.duration;
        this.bubbles = [];
        this.currentSpawnInterval = this.gameConfig.spawnInterval.start;

        // Update UI
        this.updateScore();
        this.updateTimer();

        // Switch screens
        this.startScreen.classList.add('hidden');
        this.gameScreen.classList.remove('hidden');

        // Start game systems
        this.startTimer();
        this.startBubbleSpawning();
        this.startGameLoop();
    }

    startTimer() {
        this.gameTimer = setInterval(() => {
            this.timeLeft--;
            this.updateTimer();

            // Update spawn rate (increase difficulty)
            const progress = (this.gameConfig.duration - this.timeLeft) / this.gameConfig.duration;
            this.currentSpawnInterval = this.gameConfig.spawnInterval.start - 
                (progress * (this.gameConfig.spawnInterval.start - this.gameConfig.spawnInterval.end));

            if (this.timeLeft <= 0) {
                this.endGame();
            }
        }, 1000);
    }

    startBubbleSpawning() {
        const spawnBubble = () => {
            if (this.gameState === 'playing') {
                this.createBubble();
                this.spawnTimer = setTimeout(spawnBubble, this.currentSpawnInterval);
            }
        };
        spawnBubble();
    }

    startGameLoop() {
        const gameLoop = () => {
            if (this.gameState === 'playing') {
                this.updateBubbles();
                this.drawGame();
                this.animationFrame = requestAnimationFrame(gameLoop);
            }
        };
        gameLoop();
    }

    createBubble() {
        const bubbleType = this.getRandomBubbleType();
        const size = this.gameConfig.bubbleSize.min + 
            Math.random() * (this.gameConfig.bubbleSize.max - this.gameConfig.bubbleSize.min);

        const bubble = {
            x: Math.random() * (window.innerWidth - size),
            y: window.innerHeight + size,
            size: size,
            color: bubbleType.color,
            points: bubbleType.points,
            speed: 1 + Math.random() * 2,
            createdAt: Date.now(),
            alive: true
        };

        this.bubbles.push(bubble);
    }

    getRandomBubbleType() {
        const rand = Math.random() * 100;
        let cumulative = 0;

        for (let type of this.gameConfig.bubbleTypes) {
            cumulative += type.frequency;
            if (rand <= cumulative) {
                return type;
            }
        }

        return this.gameConfig.bubbleTypes[0]; // fallback
    }

    updateBubbles() {
        this.bubbles = this.bubbles.filter(bubble => {
            if (!bubble.alive) return false;

            // Move bubble up
            bubble.y -= bubble.speed;

            // Remove if off screen or too old
            if (bubble.y + bubble.size < 0 || 
                Date.now() - bubble.createdAt > this.gameConfig.bubbleLifetime) {
                return false;
            }

            return true;
        });
    }

    drawGame() {
        // Clear canvas
        this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

        // Draw bubbles
        this.bubbles.forEach(bubble => {
            this.drawBubble(bubble);
        });
    }

    drawBubble(bubble) {
        this.ctx.save();

        // Create gradient for bubble effect
        const gradient = this.ctx.createRadialGradient(
            bubble.x + bubble.size * 0.3, 
            bubble.y + bubble.size * 0.3, 
            0,
            bubble.x + bubble.size * 0.5, 
            bubble.y + bubble.size * 0.5, 
            bubble.size * 0.5
        );
        gradient.addColorStop(0, bubble.color + 'CC');
        gradient.addColorStop(0.7, bubble.color);
        gradient.addColorStop(1, bubble.color + '88');

        // Draw bubble
        this.ctx.beginPath();
        this.ctx.arc(bubble.x + bubble.size/2, bubble.y + bubble.size/2, bubble.size/2, 0, Math.PI * 2);
        this.ctx.fillStyle = gradient;
        this.ctx.fill();

        // Add shine effect
        this.ctx.beginPath();
        this.ctx.arc(bubble.x + bubble.size * 0.35, bubble.y + bubble.size * 0.35, bubble.size * 0.15, 0, Math.PI * 2);
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        this.ctx.fill();

        this.ctx.restore();
    }

    handleCanvasClick(e) {
        if (this.gameState !== 'playing') return;

        const rect = this.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        this.checkBubbleHit(x, y);
    }

    handleCanvasTouch(e) {
        if (this.gameState !== 'playing') return;

        const rect = this.canvas.getBoundingClientRect();
        const touch = e.touches[0];
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;

        this.checkBubbleHit(x, y);
    }

    checkBubbleHit(x, y) {
        for (let i = this.bubbles.length - 1; i >= 0; i--) {
            const bubble = this.bubbles[i];
            const distance = Math.sqrt(
                Math.pow(x - (bubble.x + bubble.size/2), 2) + 
                Math.pow(y - (bubble.y + bubble.size/2), 2)
            );

            if (distance <= bubble.size/2) {
                // Hit! Remove bubble and add score
                this.score += bubble.points;
                this.updateScore();
                this.bubbles.splice(i, 1);

                // Create pop effect (optional)
                this.createPopEffect(bubble.x + bubble.size/2, bubble.y + bubble.size/2);
                break;
            }
        }
    }

    createPopEffect(x, y) {
        // Simple pop effect - could be enhanced with particles
        const effect = document.createElement('div');
        effect.style.position = 'fixed';
        effect.style.left = x + 'px';
        effect.style.top = y + 'px';
        effect.style.width = '20px';
        effect.style.height = '20px';
        effect.style.background = 'radial-gradient(circle, #FFD93D, transparent)';
        effect.style.borderRadius = '50%';
        effect.style.pointerEvents = 'none';
        effect.style.zIndex = '1000';
        effect.style.animation = 'popEffect 0.3s ease-out forwards';

        document.body.appendChild(effect);
        setTimeout(() => effect.remove(), 300);
    }

    updateScore() {
        this.scoreValue.textContent = this.score;
    }

    updateTimer() {
        this.timerValue.textContent = this.timeLeft;
    }

    endGame() {
        console.log('Game ended! Final score:', this.score);
        this.gameState = 'ended';

        // Stop all game systems
        if (this.gameTimer) {
            clearInterval(this.gameTimer);
            this.gameTimer = null;
        }

        if (this.spawnTimer) {
            clearTimeout(this.spawnTimer);
            this.spawnTimer = null;
        }

        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = null;
        }

        // Show end screen
        this.showEndScreen();
    }

    showEndScreen() {
        console.log('Showing end screen...');

        // Update final score
        this.finalScore.textContent = this.score;

        // Check for achievements
        const achievement = this.checkAchievements();
        if (achievement) {
            this.achievementBadge.classList.remove('hidden');
            this.achievementEmoji.textContent = achievement.emoji;
            this.achievementTitle.textContent = achievement.title;
        } else {
            this.achievementBadge.classList.add('hidden');
        }

        // Switch screens
        this.gameScreen.classList.add('hidden');
        this.endScreen.classList.remove('hidden');
    }

    checkAchievements() {
        for (let i = this.achievements.length - 1; i >= 0; i--) {
            if (this.score >= this.achievements[i].threshold) {
                return this.achievements[i];
            }
        }
        return null;
    }

    shareScore() {
        const message = this.shareMessages[Math.floor(Math.random() * this.shareMessages.length)]
            .replace('{score}', this.score);

        // Try Web Share API first
        if (navigator.share) {
            navigator.share({
                title: 'Bubble Pop Game',
                text: message,
                url: window.location.href
            }).catch(console.error);
        }
        // Try opening Warpcast
        else {
            const warpcastUrl = `https://warpcast.com/~/compose?text=${encodeURIComponent(message + ' ' + window.location.href)}`;
            window.open(warpcastUrl, '_blank');
        }
    }

    resetGame() {
        console.log('Resetting game...');
        this.gameState = 'start';
        this.score = 0;
        this.timeLeft = this.gameConfig.duration;
        this.bubbles = [];

        // Switch back to start screen
        this.endScreen.classList.add('hidden');
        this.startScreen.classList.remove('hidden');
    }
}

// Add CSS animation for pop effect
const style = document.createElement('style');
style.textContent = `
    @keyframes popEffect {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', () => {
    new BubbleGame();
});