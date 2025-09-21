import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getPostBySlug, getAllPosts } from '@/lib/posts'
import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'
import { Suspense } from 'react'

import rehypeHighlight from 'rehype-highlight';

interface PostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const post = await getPostBySlug(resolvedParams.slug)
  
  if (!post) {
    return {}
  }

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      type: 'article',
      publishedTime: post.frontmatter.date,
      tags: post.frontmatter.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.frontmatter.title,
      description: post.frontmatter.description,
    },
  }
}

// Define MDX components with proper TypeScript types
const components = {
  h1: ({ children, ...props }: React.HTMLProps<HTMLHeadingElement>) => (
    <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: React.HTMLProps<HTMLHeadingElement>) => (
    <h2 className="text-2xl font-semibold mb-4 mt-8 text-gray-900 dark:text-gray-100" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: React.HTMLProps<HTMLHeadingElement>) => (
    <h3 className="text-xl font-medium mb-3 mt-6 text-gray-900 dark:text-gray-100" {...props}>
      {children}
    </h3>
  ),
  p: ({ children, ...props }: React.HTMLProps<HTMLParagraphElement>) => (
    <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed" {...props}>
      {children}
    </p>
  ),
  a: ({ children, ...props }: React.HTMLProps<HTMLAnchorElement>) => (
    <a className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline" {...props}>
      {children}
    </a>
  ),
  ul: ({ children, ...props }: React.HTMLProps<HTMLUListElement>) => (
    <ul className="mb-4 ml-6 list-disc text-gray-700 dark:text-gray-300" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: React.HTMLProps<HTMLOListElement>) => (
    <ol className="mb-4 ml-6 list-decimal text-gray-700 dark:text-gray-300" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: React.HTMLProps<HTMLLIElement>) => (
    <li className="mb-1" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }: React.HTMLProps<HTMLQuoteElement>) => (
    <blockquote className="border-l-4 border-blue-500 pl-4 py-2 mb-4 italic text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800" {...props}>
      {children}
    </blockquote>
  ),
  pre: ({ children, ...props }: React.HTMLProps<HTMLPreElement>) => (
    <pre className="bg-gray-900 dark:bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4 text-sm" {...props}>
      {children}
    </pre>
  ),
  code: ({ children, ...props }: React.HTMLProps<HTMLElement>) => (
    <code className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-1 py-0.5 rounded text-sm font-mono" {...props}>
      {children}
    </code>
  ),
  img: ({ alt = '', src, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => {
    if (!src) return null
    return (
      <Image 
        className="w-full h-auto rounded-lg shadow-md my-6" 
        width={800} 
        height={400} 
        src={src}
        alt={alt} 
        {...props}
      />
    )
  },
}

export default async function PostPage({ params }: PostPageProps) {
  try {
    const resolvedParams = await params
    
    if (!resolvedParams?.slug) {
      console.error('No slug provided in params')
      notFound()
    }
    
    const post = await getPostBySlug(resolvedParams.slug)

    if (!post) {
      console.warn(`Post not found: ${resolvedParams.slug}`)
      notFound()
    }

    // Additional null checks for post data
    if (!post.frontmatter || !post.contentHtml) {
      console.error(`Invalid post data for: ${resolvedParams.slug}`)
      notFound()
    }

    const formatDate = (dateString: string) => {
      try {
        const date = new Date(dateString)
        if (isNaN(date.getTime())) {
          return dateString // Return original string if date is invalid
        }
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      } catch (error) {
        console.error('Date formatting error:', error)
        return dateString
      }
    }

    return (
      <article className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <div className="mb-4">
            <Link 
              href="/" 
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
            >
              ← Back to posts
            </Link>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {post.frontmatter.title}
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
            {post.frontmatter.description}
          </p>
          
          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-500 mb-6">
            <time dateTime={post.frontmatter.date}>
              {formatDate(post.frontmatter.date)}
            </time>
            <span>•</span>
            <span>{post.readingTime}</span>
            {post.frontmatter.author && (
              <>
                <span>•</span>
                <span>by {post.frontmatter.author}</span>
              </>
            )}
          </div>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {post.frontmatter.tags.map((tag) => (
              <Link
                key={tag}
                href={`/tags/${encodeURIComponent(tag.toLowerCase())}`}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        </header>

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
          <div 
            dangerouslySetInnerHTML={{ 
              __html: post.contentHtml 
            }} 
          />
        </div>

        {/* Footer */}
        <footer className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <div className="flex justify-between items-center">
            <Link 
              href="/" 
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
            >
              ← Back to posts
            </Link>
            
            <div className="text-sm text-gray-500 dark:text-gray-500">
              Published on {formatDate(post.frontmatter.date)}
            </div>
          </div>
          
          {/* Share buttons */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Found this helpful? Share it with others!
            </p>
            <div className="flex justify-center space-x-4">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.frontmatter.title)}`}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                Share on Twitter
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/`}
                className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors text-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                Share on LinkedIn
              </a>
            </div>
          </div>
        </footer>
      </article>
    )
  } catch (error) {
    console.error('Error in PostPage component:', error)
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
          <h1 className="text-red-800 dark:text-red-200 font-bold text-xl mb-2">
            Error Loading Post
          </h1>
          <p className="text-red-600 dark:text-red-400 mb-4">
            There was an error loading this post. Please try again later.
          </p>
          <Link 
            href="/" 
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
          >
            ← Back to posts
          </Link>
        </div>
      </div>
    )
  }
}
