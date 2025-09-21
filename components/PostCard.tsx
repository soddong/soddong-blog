import Link from 'next/link'
import { Post } from '@/lib/posts'

interface PostCardProps {
  post: Post
  featured?: boolean
}

const PostCard = ({ post, featured = false }: PostCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <article className={`group relative bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors ${featured ? 'shadow-lg' : 'shadow-sm hover:shadow-md'}`}>
      <div className="p-6">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {post.frontmatter.tags.slice(0, 3).map((tag) => (
            <Link
              key={tag}
              href={`/tags/${tag.toLowerCase()}`}
              className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
            >
              {tag}
            </Link>
          ))}
          {post.frontmatter.tags.length > 3 && (
            <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">
              +{post.frontmatter.tags.length - 3} more
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className={`font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors ${featured ? 'text-xl' : 'text-lg'}`}>
          <Link href={`/posts/${post.slug}`} className="hover:underline">
            {post.frontmatter.title}
          </Link>
        </h3>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
          {post.frontmatter.description}
        </p>

        {/* Metadata */}
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-500">
          <div className="flex items-center space-x-4">
            <time dateTime={post.frontmatter.date}>
              {formatDate(post.frontmatter.date)}
            </time>
            <span>{post.readingTime}</span>
          </div>
          
          {post.frontmatter.author && (
            <span>by {post.frontmatter.author}</span>
          )}
        </div>

        {/* Featured badge */}
        {featured && (
          <div className="absolute top-4 right-4">
            <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 text-xs font-medium px-2 py-1 rounded-full">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Read more link overlay */}
      <Link 
        href={`/posts/${post.slug}`}
        className="absolute inset-0 z-10"
        aria-label={`Read post: ${post.frontmatter.title}`}
      />
    </article>
  )
}

export default PostCard