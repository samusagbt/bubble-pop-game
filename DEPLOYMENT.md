# 🚀 Deployment Guide for Bubble Pop Game

This guide will help you deploy your Bubble Pop game to GitHub Pages and configure it as a Base Mini App.

## 📁 Repository Setup

### 1. Create GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it `bubble-pop-game` (or your preferred name)
3. Make it public (required for GitHub Pages)
4. Don't initialize with README (we have our own files)

### 2. Upload Your Files

**Option A: Using GitHub Web Interface**
1. Click "uploading an existing file"
2. Drag and drop all these files:
   - `index.html`
   - `style.css` 
   - `app.js`
   - `README.md`
   - `package.json`
   - `minikit.config.ts`
   - `.gitignore`
3. Commit the files

**Option B: Using Git Command Line**
```bash
# Initialize git repository
git init
git add .
git commit -m "Initial commit: Bubble Pop game"

# Add your GitHub repository as origin
git remote add origin https://github.com/YOUR_USERNAME/bubble-pop-game.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## 🌐 GitHub Pages Deployment

### 1. Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** section
4. Under "Source", select **Deploy from a branch**
5. Select branch: **main**
6. Select folder: **/ (root)**
7. Click **Save**

### 2. Access Your Game
- Your game will be live at: `https://YOUR_USERNAME.github.io/bubble-pop-game`
- It may take a few minutes to deploy

## 🔧 Base Mini App Configuration

### 1. Update Domain References

Edit `index.html` and replace placeholder URLs:
```html
<!-- Replace these meta tags -->
<meta property="fc:frame:image" content="https://YOUR_USERNAME.github.io/bubble-pop-game/preview.png">
<meta property="fc:frame:button:1:target" content="https://YOUR_USERNAME.github.io/bubble-pop-game">
```

Edit `minikit.config.ts`:
```typescript
export const ROOT_URL = 'https://YOUR_USERNAME.github.io/bubble-pop-game';
```

### 2. Create Required Images

You'll need to create these images (recommended sizes):
- `icon.png` - 512x512px app icon
- `splash.png` - 1200x630px splash screen
- `hero.png` - 1200x630px hero image
- `og-image.png` - 1200x630px social sharing image
- `screenshot-portrait.png` - 375x812px mobile screenshot
- `preview.png` - 1200x630px frame preview

### 3. Set Up Account Association (For Base Mini Apps)

1. Go to [Base Build Account Association Tool](https://docs.base.org/mini-apps/quickstart/create-new-miniapp#create-accountassociation-credentials)
2. Enter your app URL: `https://YOUR_USERNAME.github.io/bubble-pop-game`
3. Follow the verification process
4. Copy the generated `accountAssociation` object
5. Update `minikit.config.ts` with the credentials

### 4. Test Your Mini App

1. Visit [base.dev/preview](https://base.dev/preview)
2. Enter your app URL
3. Test the embedding and launch functionality
4. Verify metadata and account association

## 📱 Sharing Features

### Warpcast Integration
The game automatically opens Warpcast composer when sharing:
```javascript
const warpcastUrl = `https://warpcast.com/~/compose?text=${encodeURIComponent(message)}`;
```

### Custom Domain (Optional)

If you want a custom domain:
1. Purchase a domain
2. Add `CNAME` file to your repository with your domain
3. Configure DNS settings
4. Update all URL references

## 🔍 Testing

### Local Testing
```bash
# Install dependencies (optional)
npm install

# Serve locally
npm run dev
# OR
python -m http.server 8000
```

### Production Testing
1. Test on mobile devices
2. Verify sharing functionality
3. Check Farcaster frame rendering
4. Test touch controls

## 📊 Analytics (Optional)

Add Google Analytics to track usage:
```html
<!-- Add to <head> section in index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🚨 Troubleshooting

### Common Issues:

1. **404 Error**: Make sure GitHub Pages is enabled and files are in root directory
2. **Game Not Loading**: Check browser console for JavaScript errors
3. **Sharing Not Working**: Verify URLs and test on mobile devices
4. **Frame Not Rendering**: Check meta tags and test with Farcaster frame validator

### Debug Steps:
1. Check browser developer console
2. Verify all files are accessible via direct URLs
3. Test on different devices and browsers
4. Validate meta tags using frame debugging tools

## 🎯 Next Steps

1. **Promote Your Game**: Share on Farcaster/Warpcast
2. **Collect Feedback**: Monitor user engagement
3. **Add Features**: Leaderboards, new game modes, etc.
4. **Submit to Base App**: Apply for featuring in the Base App catalog

---

Need help? Create an issue in your repository or reach out to the Farcaster developer community!