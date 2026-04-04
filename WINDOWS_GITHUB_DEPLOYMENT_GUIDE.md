# 🚀 Windows Deployment Guide for iFarmInsurance.com
## Deploy to Vercel using GitHub - Step by Step

This guide will walk you through deploying your iFarmInsurance website to Vercel using a **private GitHub repository**.

---

## 📋 Repository Name & Description Suggestions

### Recommended Repository Name:
**`ifarminsurance-com`** or **`ifarminsurance-website`**

### Why These Names?
- ✅ Clear and descriptive
- ✅ Includes your brand name
- ✅ Professional appearance
- ✅ Easy to remember and share

### Repository Description (choose one):

**Option 1 (Professional):**
> "iFarmInsurance.com - Modern insurance comparison platform for farmers. Compare quotes from top carriers for farm, auto, home, and life insurance."

**Option 2 (Technical):**
> "Next.js 16 insurance comparison website with simplified quote calculation algorithm. Features multi-step quote forms, carrier comparisons, and real-time pricing estimates."

**Option 3 (Simple):**
> "Insurance comparison website for farmers - Compare quotes and save on farm, auto, home, and life insurance."

---

## 🔧 Prerequisites

Before starting, make sure you have:

1. **GitHub Account** - Free at github.com
2. **Vercel Account** - Free at vercel.com (Hobby plan)
3. **Git installed on Windows** - Download from git-scm.com
4. **Node.js/Bun installed** - You already have this
5. **Your project folder** - `/home/z/my-project`

---

## 📝 Step 1: Create a Private GitHub Repository

### 1.1 Go to GitHub
- Open your browser and go to https://github.com
- Sign in to your account

### 1.2 Create New Repository
1. Click the **+** button in the top-right corner
2. Select **"New repository"**

### 1.3 Configure Repository
- **Repository name**: `ifarminsurance-com` (or your choice)
- **Description**: Choose one from the suggestions above
- **Visibility**: ⚠️ **Select "Private"** (This is important!)
- **Initialize with**:
  - ☐ Do NOT check "Add a README file"
  - ☐ Do NOT check "Add .gitignore"
  - ☐ Do NOT check "Choose a license"

### 1.4 Create Repository
- Click the green **"Create repository"** button
- **Keep this tab open** - you'll need the repository URL soon

---

## 💻 Step 2: Set Up Git Locally on Windows

### 2.1 Open Command Prompt or PowerShell
- Press `Win + R`
- Type `cmd` or `powershell`
- Press Enter

### 2.2 Navigate to Your Project Folder
```bash
cd C:\path\to\your\project
```

**Note**: If you're using the cloud environment, use:
```bash
cd /home/z/my-project
```

### 2.3 Initialize Git
```bash
git init
```

This creates a new git repository in your project folder.

---

## 📦 Step 3: Prepare Your Project for Git

### 3.1 Create .gitignore File
In your project folder, create a file named `.gitignore` with the following content:

```gitignore
# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/

# Next.js
.next/
out/
build/
dist/

# Production
*.log
dev.log
server.log

# Misc
.DS_Store
*.pem

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Local env files
.env
.env*.local
.env.production

# Vercel
.vercel/

# TypeScript
*.tsbuildinfo
next-env.d.ts

# Database
*.db
*.sqlite
*.sqlite3
prisma/migrations/

# IDE
.vscode/
.idea/
*.swp
*.swo
*~
```

### 3.2 Remove Sensitive Files (if any)
Make sure you don't have:
- API keys in code
- Database credentials
- Personal passwords

### 3.3 Verify .env.local (if it exists)
```bash
# Check if .env.local exists
dir .env.local

# If it exists, make sure it's in .gitignore
```

---

## 📤 Step 4: Commit Your Code

### 4.1 Check Git Status
```bash
git status
```

### 4.2 Add All Files
```bash
git add .
```

### 4.3 Create First Commit
```bash
git commit -m "Initial commit - iFarmInsurance website"
```

---

## 🔗 Step 5: Connect Local Git to GitHub

### 5.1 Copy Your GitHub Repository URL
From the GitHub page you opened in Step 1, copy the repository URL:
- It should look like: `https://github.com/YOUR_USERNAME/ifarminsurance-com.git`

### 5.2 Add Remote Repository
```bash
git remote add origin https://github.com/YOUR_USERNAME/ifarminsurance-com.git
```

**Replace `YOUR_USERNAME` with your actual GitHub username!**

### 5.3 Verify Remote
```bash
git remote -v
```

You should see your GitHub repository listed.

---

## 🚀 Step 6: Push to GitHub

### 6.1 Configure Your Git Identity (First Time Only)
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

**Use the same email you used for your GitHub account.**

### 6.2 Push to GitHub
```bash
git branch -M main
git push -u origin main
```

### 6.3 Authenticate with GitHub
1. A browser window will open
2. Sign in to GitHub if prompted
3. Authorize Git Credential Manager
4. Close the browser window when done

### 6.4 Verify Push
- Go back to your GitHub repository tab
- Refresh the page
- You should see all your project files!

---

## 🌐 Step 7: Deploy to Vercel

### 7.1 Sign In to Vercel
- Go to https://vercel.com
- Click **"Sign Up"** or **"Log In"**
- Choose **"Continue with GitHub"**
- Authorize Vercel to access your GitHub account

### 7.2 Create New Project
1. On your Vercel dashboard, click **"Add New..."**
2. Select **"Project"**

### 7.3 Import Your Repository
1. Find `ifarminsurance-com` in the list
2. Click the **"Import"** button

### 7.4 Configure Project Settings
Vercel will auto-detect most settings. Verify:

**Framework Preset**: Next.js
- ✅ Automatically detected

**Root Directory**: `./`
- ✅ Leave as is

**Build Command**: `npm run build`
- ✅ Vercel sets this automatically

**Output Directory**: `.next`
- ✅ Vercel sets this automatically

**Install Command**: `npm install`
- ✅ Vercel sets this automatically

### 7.5 Environment Variables (Optional)
If you have any environment variables, add them here:
- Click **"Environment Variables"**
- Add key-value pairs as needed
- Click **"Add"**

### 7.6 Deploy
1. Click the **"Deploy"** button
2. Wait for deployment to complete (1-3 minutes)
3. You'll see a green checkmark when done ✅

### 7.7 View Your Live Site
- Click the **"Visit"** button
- Your site is now live! 🎉

---

## ✅ Step 8: Verify Your Deployment

### 8.1 Test Your Site
- Check all pages load correctly
- Test the quote forms
- Verify navigation works
- Check mobile responsiveness (use browser DevTools)

### 8.2 Check Vercel Dashboard
- Go to your project in Vercel
- View deployment logs if needed
- Monitor performance metrics

---

## 🔄 Step 9: How to Make Updates

### Updating Your Site is Easy!

1. **Make changes locally** (edit files)
2. **Test locally**:
   ```bash
   bun run dev
   ```
3. **Commit changes**:
   ```bash
   git add .
   git commit -m "Describe your changes"
   git push
   ```
4. **Vercel auto-deploys** - Your site updates automatically!

### Example:
```bash
# Edit a file
# Then:
git add .
git commit -m "Updated home page hero section"
git push

# Wait 1-2 minutes
# Your site is updated!
```

---

## 🌍 Step 10: Connect Your Custom Domain (Optional)

### 10.1 Add Domain in Vercel
1. Go to your project in Vercel
2. Click **"Settings"** → **"Domains"**
3. Enter your domain: `ifarminsurance.com`
4. Click **"Add"**

### 10.2 Update DNS at GoDaddy
1. Log in to your GoDaddy account
2. Go to **DNS Management**
3. Add the following records (Vercel will provide these):

**Type: CNAME**
- **Name**: `@` or leave blank
- **Value**: `cname.vercel-dns.com`
- **TTL**: 1 hour

**Type: CNAME**
- **Name**: `www`
- **Value**: `cname.vercel-dns.com`
- **TTL**: 1 hour

### 10.3 Wait for Propagation
- DNS changes can take 5 minutes to 48 hours
- Vercel will automatically configure SSL certificates
- Your site will be available at `https://ifarminsurance.com`

---

## 🔒 Security Best Practices

### Keep Your Repository Private!
- ✅ Your quote algorithm is valuable IP
- ✅ Competitors shouldn't see your code
- ✅ Protect your business logic

### Never Commit:
- ❌ API keys
- ❌ Database passwords
- ❌ Personal information
- ❌ Environment files (.env, .env.local)

### Use Environment Variables:
- Store sensitive data in Vercel environment variables
- Access them in code with `process.env.VARIABLE_NAME`

---

## 📊 Troubleshooting

### Problem: Git Push Fails
**Solution:**
```bash
git pull --rebase origin main
git push origin main
```

### Problem: Vercel Build Fails
**Solution:**
1. Check deployment logs in Vercel dashboard
2. Ensure all dependencies are in `package.json`
3. Verify no TypeScript errors
4. Check that `.env.local` is in `.gitignore`

### Problem: Images Not Loading
**Solution:**
- Ensure images are in the `public/` folder
- Use `/` at start of image paths (e.g., `/upload/logo.jpg`)

### Problem: Forms Not Working
**Solution:**
- Verify API routes exist in `src/app/api/`
- Check browser console for errors
- Ensure API routes use `export async function POST`

---

## 🎯 Quick Reference Commands

```bash
# Navigate to project
cd /home/z/my-project

# Check git status
git status

# Add all changes
git add .

# Commit changes
git commit -m "Your message here"

# Push to GitHub
git push

# Pull latest changes
git pull

# View commit history
git log --oneline

# Create new branch
git checkout -b feature-name

# Switch branches
git checkout main
```

---

## 📞 Need Help?

### Vercel Support
- Documentation: https://vercel.com/docs
- Status Page: https://www.vercel-status.com

### GitHub Support
- Documentation: https://docs.github.com
- Community Forum: https://github.com/community

### iFarmInsurance Team
- Phone: 843-858-3415
- Email: billyearly3@gmail.com

---

## 🎉 Congratulations!

You've successfully:
- ✅ Created a private GitHub repository
- ✅ Pushed your iFarmInsurance code
- ✅ Deployed to Vercel
- ✅ Made your site live on the internet!

Your site is now accessible at:
- **Vercel URL**: `https://your-project.vercel.app`
- **Custom Domain**: `https://ifarminsurance.com` (after DNS setup)

---

## 📝 Next Steps

1. **Monitor Performance**: Use Vercel Analytics
2. **Set Up Alerts**: Configure uptime monitoring
3. **Add More Features**: Expand quote types
4. **Integrate Real APIs**: Connect to insurance carriers
5. **Optimize SEO**: Add meta tags and sitemaps

---

**Deployment Complete!** 🚀

Your iFarmInsurance website is now live and ready to help farmers compare insurance quotes!
