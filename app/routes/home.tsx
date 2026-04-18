import { useParams } from "react-router";
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
    name: isZh ? "张筱" : "Zhang Xiao",
    role: isZh ? "AI 工程师" : "AI engineer",
    bio: isZh
      ? "设计可扩展的 AI 应用与 SaaS 产品。以 Rust 追求极致性能，以 K8s 支撑高并发。交付真实的解决方案，而非实验品。"
      : "I design scalable AI application and SaaS product. Rust for performance. K8s for scale. Shipping solutions, not experiments."
  };

  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 py-16 max-w-3xl">
      <img
        src="https://res.cloudinary.com/onichandame/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,b_rgb:262c35/v1747296851/mmexport1728029668566_cropped_y57sqr.png"
        alt={dict.name}
        className="w-32 h-32 rounded-full object-cover shadow-sm ring-1 ring-gray-200 dark:ring-gray-800 shrink-0"
      />
      <div className="flex flex-col space-y-4 text-center sm:text-left pt-2">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">{dict.name}</h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 mt-1 font-medium">{dict.role}</p>
        </div>
        <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg">
          {dict.bio}
        </p>
      </div>
    </div>
  );
}
