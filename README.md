# Soddong Blog

A modern, fast, and SEO-optimized blog built with Next.js 15, TypeScript, and Tailwind CSS. Features automated CI/CD deployment to Vercel with custom domain support.

## ✨ Features

- **Modern Stack**: Built with Next.js 15, TypeScript, and Tailwind CSS
- **MDX Support**: Write posts in MDX with syntax highlighting
- **Dark Mode**: Automatic and manual theme switching
- **SEO Optimized**: Automatic sitemap and robots.txt generation
- **Performance**: Optimized for Core Web Vitals
- **CI/CD**: Automated testing, linting, and deployment
- **Responsive**: Mobile-first design with beautiful typography
- **Analytics Ready**: Easy integration with Google Analytics or Plausible

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/dev-blog.git
   cd dev-blog
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your settings
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Visit [http://localhost:3000](http://localhost:3000)

## 📝 Writing Posts

### Creating a New Post

1. Create a new `.mdx` file in `content/posts/`:
   ```bash
   # Example: content/posts/my-new-post.mdx
   ```

2. Add frontmatter:
   ```mdx
   ---
   title: "My New Post"
   description: "A brief description of your post"
   date: "2024-01-01"
   tags: ["nextjs", "react", "web-dev"]
   author: "Your Name"
   featured: false
   draft: false
   ---

   # Your Post Content

   Write your content here using MDX syntax...
   ```

### Frontmatter Fields

- `title`: Post title (required)
- `description`: SEO description (required)
- `date`: Publication date in YYYY-MM-DD format (required)
- `tags`: Array of tags (required)
- `author`: Author name (optional)
- `featured`: Show in featured section (optional, default: false)
- `draft`: Hide from production (optional, default: false)

### MDX Features

- **Syntax Highlighting**: Automatic code highlighting
- **Custom Components**: Use React components in your posts
- **Math Support**: LaTeX math expressions (coming soon)
- **Embeds**: Twitter, YouTube, CodePen embeds (coming soon)

## 🎨 Customization

### Theme Colors

Edit `tailwind.config.ts` to customize colors:

```typescript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          // Your custom colors
        }
      }
    }
  }
}
```

### Site Configuration

Update `app/layout.tsx` for site metadata:

```typescript
export const metadata: Metadata = {
  title: 'Your Blog Name',
  description: 'Your blog description',
  // ... other metadata
}
```

### Social Links

Update social links in:
- `app/about/page.tsx`
- `components/Footer.tsx`
- Environment variables

## 🚀 Deployment

### Automatic Deployment (Recommended)

1. **Connect to Vercel**
   - Push your code to GitHub
   - Connect repository to Vercel
   - Follow the [Deployment Guide](./DEPLOYMENT.md)

2. **Set up CI/CD**
   - GitHub Actions workflows are pre-configured
   - Add `VERCEL_TOKEN` to GitHub secrets
   - Automatic deployments on push to main

### Manual Deployment

```bash
# Deploy to Vercel
npm install -g vercel
vercel --prod
```

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run format       # Format with Prettier
npm run type-check   # TypeScript type checking

# Analysis
npm run analyze      # Bundle size analysis
```

### Project Structure

```
├── app/                    # Next.js App Router
│   ├── about/             # About page
│   ├── api/               # API routes
│   ├── posts/             # Blog post pages
│   ├── tags/              # Tag pages
│   └── layout.tsx         # Root layout
├── components/            # React components
├── content/posts/         # MDX blog posts
├── lib/                   # Utility functions
├── .github/workflows/     # GitHub Actions
└── public/               # Static assets
```

### Adding New Features

1. **New Page**
   ```bash
   # Create new page in app directory
   mkdir app/your-page
   echo "export default function YourPage() { return <div>Your Page</div> }" > app/your-page/page.tsx
   ```

2. **New Component**
   ```bash
   # Create component
   echo "export default function YourComponent() { return <div>Component</div> }" > components/YourComponent.tsx
   ```

3. **New API Route**
   ```bash
   # Create API route
   mkdir app/api/your-route
   echo "import { NextResponse } from 'next/server'
   export async function GET() { return NextResponse.json({ message: 'Hello' }) }" > app/api/your-route/route.ts
   ```

## 🔧 Configuration

### Environment Variables

Required variables:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_SITE_NAME="Your Blog Name"
NEXT_PUBLIC_SITE_DESCRIPTION="Your blog description"
```

Optional variables:

```bash
# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=your-domain.com

# Social
NEXT_PUBLIC_TWITTER_HANDLE=@yourusername
NEXT_PUBLIC_GITHUB_USERNAME=yourusername
NEXT_PUBLIC_EMAIL=your@email.com
```

### Vercel Configuration

The `vercel.json` file includes:
- Build optimization
- Security headers
- Caching strategies
- Redirects and rewrites

## 📊 Analytics and SEO

### Built-in SEO

- Automatic sitemap generation (`/sitemap.xml`)
- Robots.txt configuration (`/robots.txt`)
- Open Graph meta tags
- Twitter Card support
- Structured data for blog posts

### Analytics Integration

Add your analytics ID to environment variables:

```bash
# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Plausible Analytics
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=your-domain.com
```

## 🚨 Troubleshooting

### Common Issues

1. **Build Errors**
   ```bash
   npm run clean
   npm run build
   ```

2. **Type Errors**
   ```bash
   npm run type-check
   ```

3. **Lint Errors**
   ```bash
   npm run lint:fix
   ```

4. **Formatting Issues**
   ```bash
   npm run format
   ```

### Getting Help

- Check the [Deployment Guide](./DEPLOYMENT.md)
- Search existing [GitHub Issues](https://github.com/yourusername/dev-blog/issues)
- Create a new issue if needed

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first styling
- [MDX](https://mdxjs.com/) for MDX support
- [Vercel](https://vercel.com/) for deployment platform
- [TypeScript](https://www.typescriptlang.org/) for type safety

---

**Happy blogging! 🎉**

If you found this project helpful, please consider giving it a star ⭐