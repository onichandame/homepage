import { NavLink } from "react-router";
import { getSeoMeta } from "../utils/seo";

export function meta({ params }: { params: { lang?: string } }) {
  const isZh = params.lang === "zh";
  return getSeoMeta({
    title: isZh ? "首页 | 张筱 (Zhang Xiao)" : "Home | Zhang Xiao",
    description: isZh
      ? "设计可扩展的AI应用与SaaS产品。以Rust追求极致性能，以K8s支撑高并发。交付真实的解决方案，而非实验品。"
      : "I design scalable AI applications and SaaS products. Rust for performance. K8s for scale. Shipping solutions, not experiments.",
    keywords: "Zhang Xiao, 张筱, Full Stack, Rust, Kubernetes, SaaS, AI",
  });
}

export default function Home() {
  return (
    <div className="flex flex-col gap-10 py-12">
      <section className="space-y-6">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl dark:text-white">
          Hi, I'm Zhang Xiao.
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
          I design scalable AI applications and SaaS products.<br/>
          <strong>Rust</strong> for performance. <strong>K8s</strong> for scale.<br/>
          Shipping solutions, not experiments.
        </p>
      </section>

      <div className="flex flex-wrap gap-4 pt-2">
        <NavLink
          to="/projects"
          className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-base font-medium text-white hover:bg-blue-700 transition-colors shadow-sm"
        >
          View Projects
        </NavLink>
        <NavLink
          to="/blog"
          className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 transition-colors shadow-sm"
        >
          Read Blog
        </NavLink>
      </div>
    </div>
  );
}
