export function getSeoMeta({
  title,
  description,
  keywords = "",
  ogImage = "/logo-dark.svg", // Default fallback image
}: {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
}) {
  return [
    { title },
    { name: "description", content: description },
    { name: "keywords", content: keywords },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: ogImage },
    { name: "twitter:card", content: "summary_large_image" },
  ];
}
