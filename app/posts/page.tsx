import { getAllPosts } from '@/lib/posts'
import PostCard from '@/components/PostCard'
import Link from 'next/link'

export default async function AllPosts() {
  const allPosts = await getAllPosts()

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">All Posts</h1>
      
      {allPosts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {allPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-400 text-lg">No posts available yet. Check back soon!</p>
      )}

      <Link href="/" className="mt-8 inline-block text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium">
        ← Back to Home
      </Link>
    </div>
  )
}