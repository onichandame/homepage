import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/_index.tsx"),
  route(":lang", "routes/lang-layout.tsx", [
    index("routes/home.tsx"),
    route("about", "routes/about.tsx"),
    route("projects", "routes/projects.tsx"),
    route("blog", "routes/blog.tsx"),
    route("blog/:slug", "routes/article.tsx")
  ])
] satisfies RouteConfig;
