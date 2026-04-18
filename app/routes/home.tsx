import { NavLink, useParams } from "react-router";
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
  const { lang } = useParams();
  const isZh = lang === "zh";

  const dict = {
    title: isZh ? "你好，我是张筱。" : "Hi, I'm Zhang Xiao.",
    desc1: isZh ? "设计可扩展的 AI 应用与 SaaS 产品。" : "I design scalable AI applications and SaaS products.",
    desc2: isZh ? <>以 <strong>Rust</strong> 追求极致性能，以 <strong>K8s</strong> 支撑高并发。</> : <><strong>Rust</strong> for performance. <strong>K8s</strong> for scale.</>,
    desc3: isZh ? "交付真实的解决方案，而非实验品。" : "Shipping solutions, not experiments.",
    btnProjects: isZh ? "查看项目" : "View Projects",
    btnBlog: isZh ? "阅读博客" : "Read Blog",
  };

  return (
    <div className="flex flex-col gap-10 py-12">
      <section className="space-y-6">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl dark:text-white">
          {dict.title}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
          {dict.desc1}<br/>
          {dict.desc2}<br/>
          {dict.desc3}
        </p>
      </section>

      <div className="flex flex-wrap gap-4 pt-2">
        <NavLink
          to={`/${lang}/projects`}
          className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-base font-medium text-white hover:bg-blue-700 transition-colors shadow-sm"
        >
          {dict.btnProjects}
        </NavLink>
        <NavLink
          to={`/${lang}/blog`}
          className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 transition-colors shadow-sm"
        >
          {dict.btnBlog}
        </NavLink>
      </div>
    </div>
  );
}
