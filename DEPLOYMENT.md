
# 🚀 Netlify Deployment Guide

## ✅ Prerequisites
- Your Next.js project is already configured for static export
- `netlify.toml` configuration file is created
- Build is working locally (`npm run build`)

## 🌐 Deploy to Netlify

### Option 1: Drag & Drop (Easiest)
1. **Build your project:**
   ```bash
   npm run build
   ```

2. **Go to [netlify.com](https://netlify.com)**
   - Sign up/Login with GitHub, GitLab, or Bitbucket

3. **Drag & Drop:**
   - Drag the entire `out` folder from your project
   - Drop it onto the Netlify dashboard
   - Your site will be live in seconds!

### Option 2: Git Integration (Recommended)
1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Ready for Netlify deployment"
   git push origin main
   ```

2. **Connect Netlify to GitHub:**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Choose GitHub and select your repository
   - Set build command: `npm run build`
   - Set publish directory: `out`
   - Click "Deploy site"

### Option 3: Netlify CLI
1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login and deploy:**
   ```bash
   netlify login
   netlify deploy --prod --dir=out
   ```

## 🔧 Configuration

Your `netlify.toml` is already configured with:
- ✅ Build command: `npm run build`
- ✅ Publish directory: `out`
- ✅ Node.js version: 18
- ✅ SPA redirects for Next.js routing
- ✅ Security headers

## 📱 Custom Domain (Optional)
1. In Netlify dashboard, go to "Domain settings"
2. Click "Add custom domain"
3. Follow DNS configuration instructions

## 🔄 Auto-Deploy
- Every push to your main branch will automatically trigger a new deployment
- Netlify will run `npm run build` and deploy the `out` folder

## 🎯 Your Plant Pod Website
Your website includes:
- 🌱 **Plant Pod Demo** - Interactive plant with canopy lighting
- 📊 **Charts** - Data visualization components
- ⚙️ **Settings** - Configuration panel
- 🔐 **Login** - Authentication system

## 🚨 Troubleshooting
- **Build fails**: Check `npm run build` locally first
- **404 errors**: Ensure `netlify.toml` redirects are correct
- **Styling issues**: Verify Tailwind CSS is building correctly

## 🌟 Success!
Once deployed, your Plant Pod website will be live at:
`https://your-site-name.netlify.app`

---

**Built with ❤️ using Next.js 13 + Tailwind CSS**
