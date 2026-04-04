# Deploy iFarmInsurance.com to Vercel (Free Hobby Plan)

## 🎯 Why Vercel Hobby Plan is Perfect for You

✅ **100% Free Forever**
✅ **All Features Work** - API routes, database, forms, everything
✅ **Automatic Deployments** - Push to GitHub, it deploys automatically
✅ **Global CDN** - Fast loading worldwide
✅ **Free SSL/HTTPS** - Automatic security certificate
✅ **DDoS Protection** - Built-in security
✅ **Analytics** - Traffic and performance insights

---

## 📋 Prerequisites

Before starting, make sure you have:
- [ ] GitHub account (free)
- [ ] Vercel account (free)
- [ ] Your domain (iFarmInsurance.com) on GoDaddy

---

## 🚀 Step-by-Step Deployment Guide

### Step 1: Push Your Code to GitHub

#### Option A: If you already have GitHub CLI installed

```bash
# Initialize git repo
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit - iFarmInsurance website"

# Create a new repository on GitHub (or use existing)
gh repo create ifarminsurance --public --source=. --remote=origin

# Push to GitHub
git push -u origin main
```

#### Option B: Manual GitHub setup

1. **Create a new repository on GitHub:**
   - Go to https://github.com/new
   - Repository name: `ifarminsurance` (or your preferred name)
   - Make it Public (easier for free tier)
   - Click "Create repository"

2. **Push your code to GitHub:**

```bash
# Initialize git repo (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit - iFarmInsurance website"

# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/ifarminsurance.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**📝 Note:** Your files are already in `/home/z/my-project`. Just run the commands above.

---

### Step 2: Deploy to Vercel

#### Method A: Deploy via Vercel Dashboard (Easiest)

1. **Create a Vercel account:**
   - Go to https://vercel.com/signup
   - Sign up with GitHub, GitLab, or email
   - Choose the **Hobby** plan (Free)

2. **Import your repository:**
   - Click "Add New Project" or "Import Project"
   - Select your `ifarminsurance` repository from GitHub
   - Vercel will auto-detect Next.js configuration

3. **Configure the project:**

   **Project Settings:**
   - Project Name: `ifarminsurance` (or any name you prefer)
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: `./` (leave as default)

   **Environment Variables (if needed):**
   - Add any API keys or secrets here
   - For now, you can skip this

4. **Click "Deploy"**
   - Wait 1-2 minutes for deployment to complete
   - Vercel will give you a URL like: `https://ifarminsurance.vercel.app`

5. **🎉 Congratulations!** Your website is live!

---

#### Method B: Deploy via Vercel CLI (Advanced)

If you prefer command-line deployment:

```bash
# Install Vercel CLI globally
bun install -g vercel

# Login to Vercel
vercel login

# Deploy your project
vercel

# Answer the questions:
# - Link to existing project? No
# - Project name: ifarminsurance
# - In which directory is your code located? ./
# - Want to override the settings? No

# Deploy to production
vercel --prod
```

---

### Step 3: Connect Your GoDaddy Domain

Now let's connect iFarmInsurance.com to your Vercel deployment:

#### Option A: Use Vercel's Domain Management (Recommended)

1. **Go to your Vercel project:**
   - Visit https://vercel.com/dashboard
   - Click on your `ifarminsurance` project

2. **Add your domain:**
   - Go to **Settings** → **Domains**
   - Click "Add Domain"
   - Enter: `ifarminsurance.com`
   - Click "Add"

3. **Copy the DNS records provided by Vercel:**

   Vercel will show you something like:
   ```
   Type: CNAME
   Name: @
   Value: cname.vercel-dns.com

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

4. **Update DNS at GoDaddy:**

   - Log in to your GoDaddy account
   - Go to **My Products** → **Domains**
   - Click **DNS** next to iFarmInsurance.com
   - Find any existing A records or CNAME records for `@` and `www`
   - Delete them (or take a screenshot first for backup)
   - Add the new records:

   ```
   Type: CNAME
   Name: @
   Value: cname.vercel-dns.com
   TTL: 600 (or 1 hour)

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   TTL: 600 (or 1 hour)
   ```

5. **Verify DNS propagation:**
   - Wait 10-30 minutes (can take up to 48 hours)
   - Go back to Vercel and click "Verify"
   - Vercel will automatically issue an SSL certificate
   - Your domain will show as "Valid Configuration"

6. **Test your website:**
   - Visit https://ifarminsurance.com
   - It should load your website!

---

#### Option B: Use GoDaddy's DNS Forwarding (Alternative)

If DNS updates are taking too long:

1. Log in to GoDaddy
2. Go to **DNS Management** for iFarmInsurance.com
3. Find **Forwarding**
4. Set up forwarding:
   - Forward to: `https://ifarminsurance.vercel.app`
   - Type: Permanent (301)
   - Settings: Forward only

⚠️ **Note:** Forwarding shows the Vercel URL in the browser. Use DNS records (Option A) for a professional look.

---

### Step 4: Test Everything

Once your domain is connected, test:

- [ ] Homepage loads: https://ifarminsurance.com
- [ ] Quote type selection works
- [ ] All insurance quote pages work:
  - [ ] /farm
  - [ ] /home
  - [ ] /auto
  - [ ] /renter
- [ ] Contact page works: https://ifarminsurance.com/contact
- [ ] Contact form submits successfully
- [ ] Phone number is clickable
- [ ] All images load
- [ ] Mobile version works
- [ ] HTTPS is enabled (look for the lock icon 🔒)

---

## 🔧 Configure Email Sending (Contact Form)

Currently, your contact form logs submissions to the console. To actually send emails to billyearly3@gmail.com:

### Option 1: Use Resend (Recommended - Easy)

1. **Sign up for Resend:**
   - Go to https://resend.com
   - Get your API key (free tier available)

2. **Add environment variable to Vercel:**
   - Go to your Vercel project → **Settings** → **Environment Variables**
   - Add:
     - Name: `RESEND_API_KEY`
     - Value: `re_your_api_key_here`
   - Select all environments (Production, Preview, Development)

3. **Install Resend SDK:**

```bash
bun add resend
```

4. **Update your contact API:**

Edit `/src/app/api/contact/route.ts`:

```typescript
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, phone, subject, message } = body

    // Validation...
    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Please fill in all required fields' },
        { status: 400 }
      )
    }

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: 'iFarmInsurance <onboarding@resend.dev>', // Change to your domain after verification
      to: 'billyearly3@gmail.com',
      subject: `Contact Form: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${firstName} ${lastName} (${email})</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    })

    if (error) {
      console.error('Email error:', error)
      // Still return success, but log the error
      // You can store the submission in a database instead
    }

    return NextResponse.json(
      { success: true, message: 'Message sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    )
  }
}
```

5. **Redeploy:**
   - Push changes to GitHub
   - Vercel will auto-deploy
   - Test the contact form

### Option 2: Use a Database to Store Submissions

If you don't want to set up email yet:

1. Create a Prisma model for contact submissions in `prisma/schema.prisma`:

```prisma
model ContactSubmission {
  id        String   @id @default(uuid())
  firstName String
  lastName  String
  email     String
  phone     String?
  subject   String
  message   String
  createdAt DateTime @default(now())
}
```

2. Push the schema:

```bash
bun run db:push
```

3. Update your API to save to database (you can view these in a database browser)

---

## 📊 Monitor Your Website

### Vercel Dashboard

Visit your Vercel dashboard to see:
- **Deployments:** History of all deployments
- **Analytics:** Page views, visitors, performance
- **Logs:** Real-time logs from your server
- **Settings:** Environment variables, domains, etc.

### Analytics Dashboard

1. Go to your Vercel project
2. Click the "Analytics" tab
3. See:
   - Page views
   - Unique visitors
   - Top pages
   - Geographic distribution
   - Device types
   - Performance metrics

---

## 🔄 Automatic Deployments (CI/CD)

Vercel automatically deploys whenever you:

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Update homepage"
   git push
   ```
   → Vercel automatically deploys!

2. **Create a pull request:**
   → Vercel creates a preview URL for testing

3. **Merge pull request:**
   → Vercel deploys to production

### Workflow Example:

```bash
# Make changes to your website
# Edit files locally...

# Commit and push
git add .
git commit -m "Add new insurance quote page"
git push

# Vercel automatically builds and deploys!
# Watch the progress in your Vercel dashboard
```

---

## 🛡️ Security Features (Included in Free Tier)

Vercel automatically provides:

- ✅ **Free SSL Certificate** - HTTPS enabled by default
- ✅ **DDoS Protection** - Protects against attacks
- ✅ **Web Application Firewall** - Blocks malicious traffic
- ✅ **Automatic HTTPS** - All traffic encrypted
- ✅ **Security Headers** - Best-practice headers added

---

## 📈 Performance Optimization

Vercel optimizes your website automatically:

- ✅ **Image Optimization** - Automatic WebP/AVIF conversion
- ✅ **Code Splitting** - Faster page loads
- ✅ **Edge Network** - Content served from nearest server
- ✅ **Caching** - Intelligent caching for faster loads
- ✅ **Minification** - Automatic code minification

---

## 🐛 Troubleshooting

### Issue 1: Deployment Fails

**Solution:**
```bash
# Check build locally
bun run build

# If it fails locally, fix the errors
# If it works locally, check Vercel deployment logs
```

### Issue 2: DNS Not Propagating

**Solution:**
- Wait 10-30 minutes (can take up to 48 hours)
- Check DNS propagation: https://dnschecker.org
- Verify DNS records in GoDaddy match Vercel's instructions

### Issue 3: Images Not Loading

**Solution:**
- Ensure images are in `/public/` folder
- Check image paths in your code
- Vercel handles image optimization automatically

### Issue 4: API Routes Not Working

**Solution:**
- Check Vercel function logs
- Ensure API files are in `/src/app/api/` directory
- Verify environment variables are set

### Issue 5: Contact Form Not Sending Emails

**Solution:**
- Check Vercel logs for errors
- Verify Resend API key is correct
- Make sure email sending code is implemented

---

## 💡 Tips & Best Practices

1. **Use Preview Deployments:**
   - Every pull request gets a unique preview URL
   - Test changes before going live

2. **Monitor Logs:**
   - Check Vercel logs regularly
   - Set up error tracking (Sentry, LogRocket)

3. **Keep Dependencies Updated:**
   ```bash
   bun update
   ```

4. **Test Locally First:**
   ```bash
   bun run dev
   ```
   - Test everything before pushing

5. **Use Branch Protection:**
   - Require pull requests for main branch
   - Enable status checks

6. **Set Up Automated Tests:**
   - Add tests to your project
   - Vercel runs tests on every deployment

---

## 📦 What's Included in Free Tier

- ✅ Unlimited projects
- ✅ Unlimited deployments
- ✅ 100 GB bandwidth per month
- ✅ 100 GB Edge Network bandwidth
- ✅ 100 GB storage
- ✅ 500 GB serverless function execution
- ✅ Unlimited team members
- ✅ Global CDN
- ✅ SSL certificates
- ✅ DDoS protection
- ✅ Analytics

**⚠️ Limitations:**
- Serverless functions timeout after 10 seconds (Pro: 60 seconds)
- 100 GB bandwidth/month (should be plenty for your website)
- No custom log retention (logs available for 24 hours)

---

## 🎉 You're All Set!

Your iFarmInsurance.com website is now:
- ✅ Deployed to Vercel (free!)
- ✅ Connected to your GoDaddy domain
- ✅ SSL/HTTPS enabled
- ✅ Automatically deploying on git push
- ✅ Protected by DDoS and firewall
- ✅ Optimized for performance

---

## 📞 Need Help?

- **Vercel Documentation:** https://vercel.com/docs
- **Vercel Support:** https://vercel.com/support
- **Community Forum:** https://vercel.com/forum
- **GitHub Issues:** https://github.com/vercel/next.js/issues

---

**Happy Deploying! 🚀**

Your website is now live and ready to help farmers get insurance quotes!
