# 🚀 Deployment Guide

## Quick Deployment Steps

### Step 1: Setup Git Repository

```bash
# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Modern portfolio website"

# Set branch to main
git branch -M main
```

### Step 2: Deploy to GitHub Pages

#### Option A: Using a dedicated repository (Recommended)

1. **Create a new repository** on GitHub:
   - Go to https://github.com/new
   - Name it: `portfolio` or `abhijit-barik.github.io` (for user site)
   - Make it public
   - Do NOT initialize with README

2. **Push your code**:
   ```bash
   git remote add origin https://github.com/Abhijit-Barik01/portfolio.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - Go to repository Settings
   - Click on "Pages" in the left sidebar
   - Under "Source", select "Deploy from a branch"
   - Select `main` branch and `/ (root)` folder
   - Click "Save"
   - Wait 1-2 minutes for deployment

4. **Access your site**:
   - `https://abhijit-barik01.github.io/portfolio/`
   - Or `https://abhijit-barik01.github.io/` if you named it `abhijit-barik.github.io`

#### Option B: Using GitHub Pages from existing repo

If you want to add this to an existing repository:

1. **Push to a new branch**:
   ```bash
   git remote add origin https://github.com/Abhijit-Barik01/YOUR_REPO.git
   git checkout -b gh-pages
   git push -u origin gh-pages
   ```

2. **Enable GitHub Pages** using the `gh-pages` branch

### Step 3: Deploy to Vercel (Alternative)

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```

3. **Follow the prompts**:
   - Login with GitHub
   - Link to existing project or create new
   - Accept default settings
   - Your site is live! 🎉

4. **For production deployment**:
   ```bash
   vercel --prod
   ```

### Step 4: Deploy to Netlify (Alternative)

#### Option A: Drag and Drop

1. Go to https://app.netlify.com/drop
2. Drag the entire Portfolio folder
3. Your site is live instantly!

#### Option B: Netlify CLI

1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Deploy**:
   ```bash
   netlify deploy
   ```

3. **Follow prompts and deploy to production**:
   ```bash
   netlify deploy --prod
   ```

## 🔧 Post-Deployment Setup

### Custom Domain (Optional)

#### For GitHub Pages:
1. Add your domain to the `CNAME` file
2. Configure DNS with your domain provider:
   - Add A records pointing to GitHub's IPs:
     - 185.199.108.153
     - 185.199.109.153
     - 185.199.110.153
     - 185.199.111.153
   - Or add a CNAME record pointing to `abhijit-barik01.github.io`

#### For Vercel:
1. Go to project settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

### SSL Certificate

- **GitHub Pages**: Automatic HTTPS (may take a few minutes)
- **Vercel**: Automatic HTTPS
- **Netlify**: Automatic HTTPS

## 📊 Monitoring

### GitHub Pages

- Check deployment status in repository's "Actions" tab
- View site analytics in repository "Insights" → "Traffic"

### Vercel

- View deployment logs and analytics in Vercel dashboard
- Real-time deployment previews for every push

### Netlify

- View deployment logs in Netlify dashboard
- Automatic deploy previews for PRs

## 🔄 Updates

After making changes to your portfolio:

```bash
# Add changes
git add .

# Commit
git commit -m "Update portfolio content"

# Push (triggers automatic deployment)
git push
```

## ✅ Verification Checklist

- [ ] Website is accessible via the deployed URL
- [ ] All sections load correctly
- [ ] Mobile responsiveness works
- [ ] All links work (GitHub, LinkedIn, LeetCode)
- [ ] Contact form opens email client
- [ ] Animations and interactions work smoothly
- [ ] SEO meta tags are present
- [ ] HTTPS is enabled

## 🆘 Troubleshooting

### GitHub Pages not working?
- Check if GitHub Pages is enabled in settings
- Ensure `index.html` is in the root directory
- Wait 1-2 minutes after enabling
- Check repository is public

### 404 Error?
- Verify file names are correct (case-sensitive)
- Check GitHub Pages source branch and folder
- Ensure all files are committed and pushed

### CSS/JS not loading?
- Check file paths in `index.html`
- Ensure all files are in the same directory
- Clear browser cache

## 📞 Need Help?

If you encounter any issues:
1. Check the deployment platform's documentation
2. Review the troubleshooting section above
3. Check browser console for errors
4. Verify all files are properly committed

---

Good luck with your deployment! 🚀

