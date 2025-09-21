import Link from 'next/link'
import { getAllPosts, getFeaturedPosts } from '@/lib/posts'
import PostCard from '@/components/PostCard'

export default async function Home() {
  const featuredPosts = await getFeaturedPosts()
  const allPosts = await getAllPosts()
  const recentPosts = allPosts.slice(0, 6)

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-12">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Welcome to Soddong
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
          Sharing my journey in development, documenting technical learning, and showcasing projects. 
          Join me as I explore new technologies and build cool things.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/posts"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Read Latest Posts
          </Link>
          <Link
            href="/about"
            className="px-6 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium"
          >
            Learn About Me
          </Link>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Featured Posts
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredPosts.map((post) => (
              <PostCard key={post.slug} post={post} featured />
            ))}
          </div>
        </section>
      )}

      {/* Recent Posts */}
      <section>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Recent Posts
          </h2>
          {allPosts.length > 6 && (
            <Link
              href="/posts"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
            >
              View all posts →
            </Link>
          )}
        </div>
        
        {recentPosts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {recentPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No posts yet. Check back soon for exciting content!
            </p>
          </div>
        )}
      </section>

      {/* Newsletter CTA */}
      <section className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 text-center">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Stay Updated
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Get notified when I publish new posts about development, technology, and my learning journey.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
            Subscribe
          </button>
        </div>
      </section>
    </div>
  )
}