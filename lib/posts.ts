import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkHtml from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'content/posts')

// Process markdown content to HTML
async function processMarkdownToHtml(content: string): Promise<string> {
  try {
    const result = await remark()
      .use(remarkGfm)
      .use(remarkHtml)
      .process(content)
    
    return String(result)
  } catch (error) {
    console.error('Error processing markdown:', error)
    // Fallback: return content wrapped in paragraphs
    return `<div class="markdown-error"><p>${content.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p></div>`
  }
}

export interface PostMatter {
  title: string
  description: string
  date: string
  tags: string[]
  author?: string
  draft?: boolean
  featured?: boolean
}

export interface Post {
  slug: string
  frontmatter: PostMatter
  content: string
  contentHtml: string
  readingTime: string
}


// Validation function for post frontmatter
function validateAndNormalizeFrontmatter(data: any, slug: string): PostMatter {
  const errors: string[] = []
  
  // Required fields validation
  if (!data.title || typeof data.title !== 'string') {
    errors.push(`Missing or invalid title in ${slug}`)
  }
  
  if (!data.description || typeof data.description !== 'string') {
    errors.push(`Missing or invalid description in ${slug}`)
  }
  
  if (!data.date || typeof data.date !== 'string') {
    errors.push(`Missing or invalid date in ${slug}`)
  } else {
    // Validate date format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/
    if (!dateRegex.test(data.date)) {
      errors.push(`Invalid date format in ${slug}. Expected YYYY-MM-DD format`)
    } else {
      // Validate date is not in future
      const postDate = new Date(data.date)
      if (isNaN(postDate.getTime())) {
        errors.push(`Invalid date value in ${slug}`)
      }
    }
  }
  
  // Tags validation
  if (!Array.isArray(data.tags)) {
    console.warn(`Missing or invalid tags in ${slug}, using empty array`)
    data.tags = []
  } else {
    // Ensure all tags are strings and filter out invalid ones
    data.tags = data.tags.filter((tag: any) => typeof tag === 'string' && tag.trim().length > 0)
  }
  
  if (errors.length > 0) {
    throw new Error(`Frontmatter validation failed:\n${errors.join('\n')}`)
  }
  
  // Return normalized frontmatter with defaults
  return {
    title: data.title.trim(),
    description: data.description.trim(),
    date: data.date,
    tags: data.tags,
    author: data.author && typeof data.author === 'string' ? data.author.trim() : undefined,
    draft: Boolean(data.draft),
    featured: Boolean(data.featured)
  }
}

export function getPostSlugs(): string[] {
  try {
    if (!fs.existsSync(postsDirectory)) {
      console.warn(`Posts directory not found: ${postsDirectory}`)
      return []
    }
    
    const files = fs.readdirSync(postsDirectory)
    
    return files
      .filter((file) => {
        // Filter for .mdx files and ensure they're actually files, not directories
        if (!file.endsWith('.mdx')) return false
        
        const fullPath = path.join(postsDirectory, file)
        const stats = fs.statSync(fullPath)
        return stats.isFile()
      })
      .map((file) => file.replace(/\.mdx$/, ''))
      .filter((slug) => {
        // Filter out slugs with invalid characters
        const validSlugRegex = /^[a-z0-9-_]+$/i
        if (!validSlugRegex.test(slug)) {
          console.warn(`Skipping post with invalid slug: ${slug}`)
          return false
        }
        return true
      })
  } catch (error) {
    console.error('Error reading posts directory:', error instanceof Error ? error.message : error)
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    // Validate slug
    if (!slug || typeof slug !== 'string') {
      console.error(`Invalid slug provided: ${slug}`)
      return null
    }
    
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    
    if (!fs.existsSync(fullPath)) {
      console.warn(`Post file not found: ${fullPath}`)
      return null
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    
    // Check if file is empty
    if (!fileContents.trim()) {
      console.error(`Empty post file: ${slug}`)
      return null
    }
    
    const { data, content } = matter(fileContents)
    
    // Validate and normalize frontmatter with null checks
    if (!data || typeof data !== 'object') {
      console.error(`Invalid frontmatter in post ${slug}`)
      return null
    }
    
    const frontmatter = validateAndNormalizeFrontmatter(data, slug)
    
    // Validate content exists
    if (!content || typeof content !== 'string' || !content.trim()) {
      console.error(`Post ${slug} has no content or invalid content type`)
      return null
    }
    
    const reading = readingTime(content)
    const contentHtml = await processMarkdownToHtml(content.trim())

    return {
      slug,
      frontmatter,
      content: content.trim(),
      contentHtml,
      readingTime: reading.text,
    }
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error instanceof Error ? error.message : error)
    return null
  }
}

export async function getAllPosts(): Promise<Post[]> {
  const slugs = getPostSlugs()
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      try {
        return await getPostBySlug(slug)
      } catch (error) {
        console.error(`Error loading post ${slug}:`, error)
        return null
      }
    })
  )
  
  return posts
    .filter((post): post is Post => post !== null)
    .filter((post) => !post.frontmatter.draft)
    .sort((a, b) => {
      const dateA = new Date(a.frontmatter.date).getTime()
      const dateB = new Date(b.frontmatter.date).getTime()
      return dateB - dateA // Most recent first
    })
}

export async function getPostsByTag(tag: string): Promise<Post[]> {
  const posts = await getAllPosts()
  return posts.filter((post) =>
    post.frontmatter.tags.some((postTag) => 
      postTag.toLowerCase() === tag.toLowerCase()
    )
  )
}

export async function getAllTags(): Promise<Array<{ name: string; count: number }>> {
  const posts = await getAllPosts()
  const tagCounts = new Map<string, number>()

  posts.forEach((post) => {
    post.frontmatter.tags.forEach((tag) => {
      const normalizedTag = tag.toLowerCase()
      tagCounts.set(normalizedTag, (tagCounts.get(normalizedTag) || 0) + 1)
    })
  })

  return Array.from(tagCounts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
}

export async function getFeaturedPosts(): Promise<Post[]> {
  const posts = await getAllPosts()
  return posts
    .filter((post) => post.frontmatter.featured)
    .slice(0, 3)
}

export async function getRecentPosts(limit: number = 5): Promise<Post[]> {
  const posts = await getAllPosts()
  return posts.slice(0, limit)
}
