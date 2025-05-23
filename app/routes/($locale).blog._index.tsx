import { LoaderFunctionArgs, json } from "@remix-run/cloudflare";
import { Link, useLoaderData } from "@remix-run/react";
import LocalizedLink from "~/components/localizedLink";
import { listBlogs } from "~/state/blog";
import { getLocaleFromReq } from "~/translation";


export async function loader({ request }: LoaderFunctionArgs) {
  const locale = getLocaleFromReq(request);
  const blogs = await listBlogs(locale)
  return {
    locale,
    blogs
  }
}

export default function BlogIndex() {
  const { blogs, locale } = useLoaderData<typeof loader>();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">My Blog</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Thoughts on web development, cloud computing, and technology trends.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((post) => (
            <div
              key={post.metadata.slug}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
            >
              <LocalizedLink locale={locale} to={`/blog/${post.metadata.slug}`} className="block">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.metadata.image}
                    alt={post.content.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500">{new Date(post.metadata.updatedAt).toLocaleDateString(locale)}</span>
                    <span className="text-sm text-gray-500">{post.content.timeToRead}</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {post.content.title}
                  </h2>
                  <p className="text-gray-600">{post.content.intro}</p>
                  <div className="mt-4 flex items-center text-blue-600 group-hover:text-blue-700 transition-colors">
                    <span>Read more</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </LocalizedLink>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}