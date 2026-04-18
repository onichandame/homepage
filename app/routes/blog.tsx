import { useLoaderData, Link, useParams } from "react-router";
import type { LoaderFunctionArgs } from "react-router";

export async function loader({ request, context, params }: LoaderFunctionArgs) {
  const env = context.cloudflare.env as any;
  const url = new URL("/posts/manifest.json", request.url);
  const response = await env.ASSETS.fetch(new Request(url));

  if (!response.ok) {
    throw new Response("Manifest not found", { status: 404 });
  }

  const manifest = await response.json();
  const lang = params.lang === "zh" ? "zh" : "en";
  const posts = manifest[lang] || [];
  return { posts };
}

export default function Blog() {
  const { posts } = useLoaderData<typeof loader>();
  const params = useParams();
  const lang = params.lang === "zh" ? "zh" : "en";

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">{lang === "zh" ? "博客文章" : "Blog Articles"}</h1>
      <ul className="space-y-4">
        {posts.map((post: any) => (
          <li key={post.slug} className="border p-4 rounded shadow-sm hover:shadow-md transition-shadow">
            <Link to={`/${lang}/blog/${post.slug}`} className="block">
              <h2 className="text-xl font-semibold text-blue-600">{post.title}</h2>
              <div className="text-sm text-gray-500 mb-2">{post.date}</div>
              <p className="text-gray-700">{post.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
