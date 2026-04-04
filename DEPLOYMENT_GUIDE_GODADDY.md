# GoDaddy Deployment Guide for iFarmInsurance.com

## Overview
This guide will walk you through deploying your Next.js 16 website to GoDaddy hosting.

## Prerequisites
- GoDaddy hosting account (cPanel or Plesk)
- FTP/SFTP credentials for your GoDaddy account
- Node.js installed on your local machine (or use GoDaddy's SSH access)
- Your domain (iFarmInsurance.com) pointed to GoDaddy servers

---

## Method 1: Static Export (Recommended for Simple Hosting)

### Step 1: Configure Next.js for Static Export

1. Open `next.config.ts` and add the following configuration:

```typescript
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
}
```

2. Update your build script in `package.json` (if needed):

```json
{
  "scripts": {
    "build": "next build",
    "export": "next build"
  }
}
```

### Step 2: Build the Static Export

Run these commands on your local machine:

```bash
# Install dependencies
bun install

# Build the static export
bun run build
```

This will create an `out` folder with all static HTML, CSS, and JavaScript files.

### Step 3: Upload to GoDaddy

**Option A: Using File Manager (GoDaddy Dashboard)**
1. Log in to your GoDaddy account
2. Go to "My Products" → "Managed WordPress" or "Web Hosting"
3. Click "Manage" next to your hosting
4. Open "File Manager"
5. Navigate to the `public_html` folder
6. Delete any existing files (or backup them first)
7. Upload the contents of the `out` folder to `public_html`

**Option B: Using FTP/SFTP**
1. Use an FTP client like FileZilla, Cyberduck, or WinSCP
2. Connect to your GoDaddy hosting with your FTP credentials:
   - Host: Your domain name or IP address
   - Username: Your FTP username
   - Password: Your FTP password
   - Port: 21 (FTP) or 22 (SFTP)
3. Navigate to the `public_html` folder
4. Upload all files from the `out` folder

**Option C: Using Git (if available)**
1. Push your code to GitHub/GitLab
2. Use GoDaddy's Git deployment (if supported)
3. Or clone directly on the server via SSH

### Step 4: Configure .htaccess (For React Router)

Create a `.htaccess` file in the `public_html` folder to handle client-side routing:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### Step 5: Test Your Website

1. Clear your browser cache
2. Visit your domain (iFarmInsurance.com)
3. Test all pages and features

---

## Method 2: Node.js Server (For API Routes)

⚠️ **Important:** This method requires Node.js support on GoDaddy. Most shared hosting plans don't support Node.js. You may need VPS or dedicated hosting.

### Step 1: Configure Next.js for Production

Update `next.config.ts`:

```typescript
const nextConfig = {
  // Keep default settings (no 'output: export')
}
```

### Step 2: Build the Application

```bash
# Install dependencies
bun install

# Build the application
bun run build
```

### Step 3: Upload to GoDaddy

1. Upload the entire project folder to your GoDaddy server
2. Exclude: `node_modules`, `.git`, `.next` (these will be regenerated)

### Step 4: Install Dependencies on Server

SSH into your GoDaddy server:

```bash
# Navigate to your project directory
cd /path/to/your/project

# Install dependencies
bun install

# Generate Prisma client
bun run db:generate

# Start the production server
bun run start
```

### Step 5: Set Up a Process Manager

Use PM2 to keep the server running:

```bash
# Install PM2 globally
bun install -g pm2

# Start the server with PM2
pm2 start bun --name "ifarminsurance" -- run start

# Save PM2 configuration
pm2 save

# Set PM2 to start on boot
pm2 startup
```

### Step 6: Configure Web Server

If using Apache, configure a reverse proxy in `.htaccess` or Apache config:

```apache
<IfModule mod_proxy.c>
  ProxyPreserveHost On
  ProxyPass / http://localhost:3000/
  ProxyPassReverse / http://localhost:3000/
</IfModule>
```

If using Nginx, add to your server block:

```nginx
location / {
  proxy_pass http://localhost:3000;
  proxy_http_version 1.1;
  proxy_set_header Upgrade $http_upgrade;
  proxy_set_header Connection 'upgrade';
  proxy_set_header Host $host;
  proxy_cache_bypass $http_upgrade;
}
```

---

## Method 3: Deploy via Vercel (Easiest Alternative)

If GoDaddy deployment proves difficult, consider using Vercel (free for personal use) and pointing your domain:

### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/ifarminsurance.git
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up/login
3. Click "Add New Project"
4. Import your GitHub repository
5. Click "Deploy"

### Step 3: Configure Custom Domain

1. In Vercel dashboard, go to "Settings" → "Domains"
2. Add iFarmInsurance.com
3. Update DNS records at GoDaddy:

```
Type: CNAME
Name: @
Value: cname.vercel-dns.com

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

---

## Database Setup (Prisma + SQLite)

If you're using the database features:

### For Static Export (Method 1):
⚠️ Database features won't work with static export. You'll need to:
1. Use a backend service (Supabase, Firebase, etc.)
2. Or move to Method 2 (Node.js server)

### For Node.js Server (Method 2):

1. Upload your `prisma/schema.prisma` file
2. Run migrations on the server:

```bash
# Generate Prisma client
bun run db:generate

# Push schema to database
bun run db:push
```

3. Ensure your `db/custom.db` file has proper permissions

---

## Environment Variables

If you have environment variables:

1. Create a `.env.production` file on your server
2. Add your variables:

```env
DATABASE_URL="file:./db/custom.db"
NEXT_PUBLIC_SITE_URL="https://ifarminsurance.com"
# Add any API keys here
```

3. Restart your server

---

## Common Issues & Solutions

### Issue 1: 404 Errors on Navigation
**Solution:** Ensure `.htaccess` is properly configured (see Method 1, Step 4)

### Issue 2: Images Not Loading
**Solution:** Make sure `images.unoptimized: true` is in `next.config.ts` for static export

### Issue 3: API Routes Not Working (Static Export)
**Solution:** API routes don't work with static export. Use Method 2 (Node.js) or external API services

### Issue 4: Build Errors
**Solution:**
- Clear cache: `rm -rf .next out node_modules`
- Reinstall: `bun install`
- Rebuild: `bun run build`

### Issue 5: Permission Errors
**Solution:**
```bash
# Fix file permissions
chmod -R 755 /path/to/public_html
chown -R username:username /path/to/public_html
```

---

## Post-Deployment Checklist

- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] Quote forms submit successfully
- [ ] Contact form works
- [ ] Phone number is clickable
- [ ] Images load properly
- [ ] Mobile responsiveness works
- [ ] No console errors
- [ ] SEO meta tags are correct
- [ ] SSL/HTTPS is enabled (GoDaddy provides free SSL)
- [ ] Domain DNS is correctly pointed

---

## Maintenance Tips

1. **Regular Backups:** Set up automatic backups via GoDaddy
2. **Monitor Uptime:** Use tools like UptimeRobot
3. **Update Dependencies:** Regularly update packages
4. **Check Logs:** Monitor server logs for errors
5. **SSL Certificate:** Keep SSL certificate renewed (auto-renewal is recommended)

---

## Need Help?

- **GoDaddy Support:** https://www.godaddy.com/help
- **Next.js Documentation:** https://nextjs.org/docs
- **Vercel Community:** https://github.com/vercel/next.js/discussions

---

## Recommended Hosting Options Comparison

| Feature | GoDaddy Shared | GoDaddy VPS | Vercel | Netlify |
|---------|---------------|-------------|---------|---------|
| Static Sites | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes |
| Node.js | ❌ No | ✅ Yes | ✅ Yes | ✅ Yes |
| API Routes | ❌ No | ✅ Yes | ✅ Yes | ✅ Yes |
| Database | ❌ Limited | ✅ Yes | ✅ Yes | ✅ Yes |
| SSL | ✅ Free | ✅ Free | ✅ Free | ✅ Free |
| Custom Domain | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes |
| Auto Deploys | ❌ No | ❌ No | ✅ Yes | ✅ Yes |
| Cost | Low | Medium | Free* | Free* |

*Free tiers available for personal use

---

**Last Updated:** April 2025
**For:** iFarmInsurance.com
**Framework:** Next.js 16 + TypeScript + Tailwind CSS
