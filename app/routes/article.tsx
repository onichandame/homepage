import { useLoaderData } from "react-router";
import type { LoaderFunctionArgs } from "react-router";
import { marked } from "marked";
import matter from "gray-matter";

export async function loader({ request, context, params }: LoaderFunctionArgs) {
  const env = context.cloudflare.env as any;
  const slug = params.slug;
  const lang = params.lang === "zh" ? "zh" : "en";

  const assetUrl = new URL(`/posts/${lang}/${slug}.md`, request.url);
  const response = await env.ASSETS.fetch(new Request(assetUrl));
  
  if (!response.ok) {
    throw new Response("Blog post not found", { status: 404 });
  }
  
  const rawText = await response.text();
  const { data, content } = matter(rawText);
  const html = await marked.parse(content);
  
  return { title: data.title || slug, html, date: data.date, image: data.image };
}

export default function Article() {
  const { title, html, date, image } = useLoaderData<typeof loader>();

  return (
    <article className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-4xl font-extrabold mb-2">{title}</h1>
      {date && <div className="text-gray-500 mb-6">{date}</div>}
      {image && (
        <img src={image} alt={title} className="w-full max-h-[400px] object-cover rounded-lg mb-8 shadow-md" />
      )}
          <div
            className="prose dark:prose-invert lg:prose-xl max-w-none"
            dangerouslySetInnerHTML={{ __html: html as string }}
          />
    </article>
  );
}
