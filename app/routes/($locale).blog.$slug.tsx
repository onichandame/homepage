import { LoaderFunctionArgs, redirect } from "@remix-run/cloudflare";
import { useLoaderData } from "@remix-run/react";
import startCase from "lodash.startcase";
import LocalizedLink from "~/components/localizedLink";
import { Toc } from "~/components/toc";
import { getBlog, listBlogs } from "~/state/blog";
import { getLocaleFromReq, translations } from "~/translation";
import { markdownToHtml } from "~/utils/markdown";

export async function loader({ params, request }: LoaderFunctionArgs) {
  const locale = getLocaleFromReq(request);
  const { slug } = params;
  const blog = await getBlog(slug!, locale)
  if (!blog) return redirect(`/${locale}/blog`, 308)
  const blogs = await listBlogs(locale)
  const index = blogs.findIndex(blog => blog.metadata.slug === slug)
  const prevBlog = index > 0 ? blogs[index - 1] : null
  const nextBlog = index < blogs.length - 1 ? blogs[index + 1] : null

  // Process the markdown content
  const { html, headings } = await markdownToHtml(blog.content.content)

  const translation = translations[locale]
  return {
    locale,
    blog: {
      ...blog,
      content: {
        ...blog.content,
        htmlContent: html
        , headings
      }
    },
    prevBlog,
    nextBlog,
    translation
  }
}
export default function BlogPost() {
  const { blog, prevBlog, nextBlog, locale, translation } = useLoaderData<typeof loader>();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Main content - wider and without nested containers */}
        <div className="w-full lg:max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="relative h-64 md:h-80 overflow-hidden">
            <img
              src={blog.metadata.image}
              alt={blog.content.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{blog.content.title}</h1>
              <div className="flex items-center space-x-4">
                <span>{new Date(blog!.metadata.updatedAt).toLocaleDateString(locale)}</span>
                <span>•</span>
                <span>{blog.content.timeToRead}</span>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="flex items-center mb-8">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                <img
                  src={"https://res.cloudinary.com/onichandame/image/upload/w_100,h_100,c_fill,g_face,r_max/v1747296851/mmexport1728029668566_cropped_y57sqr.png"}
                  alt={translation.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-medium text-gray-800">{startCase(translation.name)}</p>
                <p className="text-sm text-gray-500">{startCase(translation.title)}</p>
              </div>
            </div>

            <article
              className="prose prose-md max-w-none"
              dangerouslySetInnerHTML={{ __html: blog.content.htmlContent }}
            />

            <div className="mt-12 pt-6 border-t border-gray-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4">{startCase(translation.moreArticles)}</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {prevBlog && (
                  <LocalizedLink locale={locale} to={`/blog/${prevBlog.metadata.slug}`}>
                    <a className="block p-4 rounded-lg hover:bg-gray-50 transition-colors">
                      <h4 className="font-medium text-gray-800 mb-1">{prevBlog.content.title}</h4>
                      <p className="text-sm text-gray-500">{prevBlog.content.timeToRead}</p>
                    </a>
                  </LocalizedLink>
                )}
                {nextBlog && (
                  <LocalizedLink locale={locale} to={`/blog/${nextBlog.metadata.slug}`}>
                    <a className="block p-4 rounded-lg hover:bg-gray-50 transition-colors">
                      <h4 className="font-medium text-gray-800 mb-1">{nextBlog.content.title}</h4>
                      <p className="text-sm text-gray-500">{nextBlog.content.timeToRead}</p>
                    </a>
                  </LocalizedLink>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* TOC - now properly positioned outside main content */}
        <div className="hidden lg:block w-72 flex-shrink-0">
          <div className="sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto py-4">
            <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 border border-gray-200">
              <Toc headings={blog.content.headings} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}