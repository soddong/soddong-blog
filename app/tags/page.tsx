import Link from 'next/link'
import { getAllTags } from '@/lib/posts'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tags',
  description: 'Browse posts by tags and categories.',
}

export default async function TagsPage() {
  const tags = await getAllTags()

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Tags
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Explore posts by topic and technology. Click on any tag to see related posts.
        </p>
      </div>

      {tags.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tags.map((tag) => (
            <Link
              key={tag.name}
              href={`/tags/${tag.name.toLowerCase()}`}
              className="group bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-colors p-6 shadow-sm hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {tag.name}
                </h3>
                <span className="text-sm text-gray-500 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                  {tag.count} {tag.count === 1 ? 'post' : 'posts'}
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            No tags available yet. Check back when posts are published!
          </p>
        </div>
      )}
    </div>
  )
}