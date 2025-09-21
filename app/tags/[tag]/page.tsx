import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPostsByTag, getAllTags } from '@/lib/posts'
import PostCard from '@/components/PostCard'
import { Metadata } from 'next'

interface TagPageProps {
  params: Promise<{
    tag: string
  }>
}

export async function generateStaticParams() {
  const tags = await getAllTags()
  return tags.map((tag) => ({
    tag: tag.name.toLowerCase(),
  }))
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const posts = await getPostsByTag(resolvedParams.tag)
  
  if (posts.length === 0) {
    return {}
  }

  const capitalizedTag = resolvedParams.tag.charAt(0).toUpperCase() + resolvedParams.tag.slice(1)
  
  return {
    title: `Posts tagged "${capitalizedTag}"`,
    description: `All posts related to ${capitalizedTag}. ${posts.length} ${posts.length === 1 ? 'post' : 'posts'} found.`,
  }
}

export default async function TagPage({ params }: TagPageProps) {
  const resolvedParams = await params
  const posts = await getPostsByTag(resolvedParams.tag)
  
  if (posts.length === 0) {
    notFound()
  }

  const capitalizedTag = resolvedParams.tag.charAt(0).toUpperCase() + resolvedParams.tag.slice(1)

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="mb-4">
          <Link 
            href="/tags" 
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
          >
            ← All Tags
          </Link>
        </div>
        
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Posts tagged &quot;{capitalizedTag}&quot;
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          {posts.length} {posts.length === 1 ? 'post' : 'posts'} found
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  )
}