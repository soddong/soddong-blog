# Deployment Guide

This guide covers how to deploy your blog to Vercel with CI/CD automation and custom domain setup.

## Prerequisites

Before deploying, make sure you have:

- A GitHub account with your code repository
- A Vercel account (sign up at [vercel.com](https://vercel.com))
- Your custom domain (optional but recommended)

## Step 1: Initial Vercel Setup

### 1.1 Connect Your GitHub Repository

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Import Project"
3. Select your GitHub repository
4. Click "Import"

### 1.2 Configure Project Settings

Vercel will automatically detect this as a Next.js project. The `vercel.json` file in your repository contains all the necessary configuration.

## Step 2: Environment Variables

### 2.1 Set Production Environment Variables

In your Vercel dashboard:

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add the following variables:

```bash
# Required
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_SITE_NAME=Soddong Blog
NEXT_PUBLIC_SITE_DESCRIPTION=A blog to share learning and projects by Soddong

# Social Media (Optional)
NEXT_PUBLIC_TWITTER_HANDLE=@yourusername
NEXT_PUBLIC_GITHUB_USERNAME=yourusername
NEXT_PUBLIC_LINKEDIN_USERNAME=yourusername
NEXT_PUBLIC_EMAIL=your.email@example.com

# Performance
POSTS_PER_PAGE=10
FEATURED_POSTS_COUNT=3
```

### 2.2 Analytics (Optional)

If you want to add analytics:

```bash
# Google Analytics
NEXT_PUBLIC_GA_ID=GA_MEASUREMENT_ID

# Plausible Analytics
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=your-domain.com
```

## Step 3: Custom Domain Setup

### 3.1 Add Custom Domain in Vercel

1. Go to your project in Vercel dashboard
2. Navigate to "Domains" tab
3. Click "Add Domain"
4. Enter your domain name (e.g., `your-domain.com`)

### 3.2 Configure DNS Records

#### Option A: Using Vercel Nameservers (Recommended)

1. In your domain registrar's dashboard, change nameservers to:
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ```

2. Vercel will automatically configure all DNS records

#### Option B: Using Custom DNS

Add these DNS records in your domain registrar:

```
# For root domain (your-domain.com)
Type: A
Name: @
Value: 76.76.19.61

# For www subdomain
Type: CNAME
Name: www
Value: cname.vercel-dns.com

# Optional: Redirect www to non-www
Type: A
Name: www
Value: 76.76.19.61
```

### 3.3 SSL Certificate

Vercel automatically provisions SSL certificates for all domains. This process may take a few minutes to complete.

## Step 4: GitHub Actions Setup

### 4.1 Required Secrets

In your GitHub repository, add these secrets:

1. Go to repository → Settings → Secrets and variables → Actions
2. Add the following secrets:

```bash
# Vercel Token
VERCEL_TOKEN=your_vercel_token

# Get your Vercel token from: https://vercel.com/account/tokens
```

### 4.2 Get Vercel Token

1. Go to [Vercel Account Settings](https://vercel.com/account/tokens)
2. Click "Create Token"
3. Name it "GitHub Actions"
4. Copy the token and add it to your GitHub secrets

### 4.3 Project Configuration

You'll also need to link your project:

```bash
# Install Vercel CLI locally
npm i -g vercel

# Login to Vercel
vercel login

# Link your project
vercel link
```

This creates a `.vercel` directory with project configuration.

## Step 5: Deployment Process

### 5.1 Automatic Deployments

Once set up, deployments happen automatically:

- **Push to main branch** → Production deployment
- **Pull request** → Preview deployment
- **Failed CI checks** → Deployment blocked

### 5.2 Manual Deployment

To deploy manually:

```bash
# Deploy to production
vercel --prod

# Deploy to preview
vercel
```

## Step 6: Post-Deployment Verification

### 6.1 Check Your Site

1. Visit your production URL
2. Test all pages and functionality
3. Verify custom domain works
4. Check SSL certificate

### 6.2 SEO Setup

Your site automatically generates:
- `/robots.txt` - Search engine instructions
- `/sitemap.xml` - Site structure for search engines

Verify these work:
- `https://your-domain.com/robots.txt`
- `https://your-domain.com/sitemap.xml`

### 6.3 Performance Monitoring

Monitor your site using:
- [Vercel Analytics](https://vercel.com/docs/concepts/analytics)
- [Web Vitals](https://web.dev/vitals/)
- [PageSpeed Insights](https://pagespeed.web.dev/)

## Troubleshooting

### Common Issues

1. **Build Failures**
   ```bash
   # Check build logs in Vercel dashboard
   # Common fixes:
   npm run build  # Test locally first
   ```

2. **Domain Not Working**
   ```bash
   # Check DNS propagation
   dig your-domain.com
   # or use: https://whatsmydns.net/
   ```

3. **SSL Certificate Issues**
   ```bash
   # Wait 24-48 hours for DNS propagation
   # Check domain ownership in Vercel dashboard
   ```

4. **Environment Variables**
   ```bash
   # Ensure all required variables are set in Vercel
   # Remember to redeploy after adding variables
   ```

### Getting Help

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Community](https://github.com/vercel/vercel/discussions)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

## Security Best Practices

1. **Environment Variables**
   - Never commit `.env.local` or `.env.production`
   - Use `NEXT_PUBLIC_` prefix only for client-side variables
   - Rotate tokens regularly

2. **Domain Security**
   - Enable HSTS in your domain settings
   - Use strong passwords for domain registrar
   - Enable 2FA where possible

3. **Content Security**
   - Review content before publishing
   - Use proper image optimization
   - Implement rate limiting if needed

## Performance Optimization

1. **Images**
   - Use Next.js Image component
   - Optimize images before uploading
   - Consider using Vercel's image optimization

2. **Caching**
   - Static assets cached for 1 year
   - API routes cached appropriately
   - Use ISR for dynamic content

3. **Bundle Size**
   - Regularly audit bundle size
   - Use dynamic imports for large components
   - Remove unused dependencies

## Monitoring and Maintenance

1. **Regular Updates**
   ```bash
   # Update dependencies monthly
   npm outdated
   npm update
   ```

2. **Security Updates**
   ```bash
   # Run security audit
   npm audit
   npm audit fix
   ```

3. **Performance Monitoring**
   - Set up alerts for deployment failures
   - Monitor Core Web Vitals
   - Track build times and success rates

---

## Quick Deployment Checklist

- [ ] Repository connected to Vercel
- [ ] Environment variables configured
- [ ] Custom domain added and DNS configured
- [ ] SSL certificate provisioned
- [ ] GitHub secrets added (`VERCEL_TOKEN`)
- [ ] CI/CD pipeline tested
- [ ] Site functionality verified
- [ ] SEO endpoints tested (`/robots.txt`, `/sitemap.xml`)
- [ ] Performance monitoring set up

Your blog is now ready for production! 🚀