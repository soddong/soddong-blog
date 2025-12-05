import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about me, my background, and what drives my passion for development.',
}

export default function About() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          About Me
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
        
        </p>
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        {/* <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            My Journey
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Welcome to my corner of the internet! I created this blog to document my learning journey,
            share interesting projects, and connect with fellow developers who are as excited about 
            technology as I am.
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            My passion lies in building things that matter – whether it&apos;s a simple utility that saves
            time, a complex web application that solves real problems, or contributing to open-source 
            projects that help the community.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            When I&apos;m not coding, you can find me exploring new technologies, reading tech blogs,
            or working on side projects that push my skills in new directions.
          </p>
        </div> */}

        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            What I Work With
          </h2>
          <div className="grid md:grid-cols-2 gap-6 mt-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">
                Backend
              </h3>
              <div className="flex flex-wrap gap-2">
                {['Java', 'Spring Boot', 'JPA', 'Python'].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">
                Infra
              </h3>
              <div className="flex flex-wrap gap-2">
                {['AWS/GCP/OCI', 'OCP', 'Docker', 'Nginx'].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">
                AI
              </h3>
              <div className="flex flex-wrap gap-2">
                {['Python', 'LangChain', 'RAG'].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <br />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            What You&apos;ll Find Here
          </h2>
          <ul className="space-y-3 text-gray-600 dark:text-gray-400">
            <li className="flex items-start">
              <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
              <strong>Technical tutorials</strong> and guides based on real-world problems I&apos;ve solved
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
              <strong>Project showcases</strong> with detailed breakdowns of the development process
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
              <strong>Learning notes</strong> from exploring new technologies and frameworks
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
              <strong>Development insights</strong> and lessons learned from building applications
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
              <strong>Open-source contributions</strong> and community involvement
            </li>
          </ul>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Let&apos;s Connect
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            I love connecting with fellow developers, sharing ideas, and learning from each other&apos;s experiences.
          </p>
          <div className="flex justify-center space-x-6">
            <a
              href="https://github.com/soddong"
              className="flex items-center px-4 py-2 bg-gray-800 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-900 dark:hover:bg-gray-600 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
              </svg>
              GitHub
            </a>
            <a
              href="gus9300@naver.com"
              className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
