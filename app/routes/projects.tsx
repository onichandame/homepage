import { getSeoMeta } from "../utils/seo";

export function meta({ params }: { params: { lang?: string } }) {
  const isZh = params.lang === "zh";
  return getSeoMeta({
    title: isZh ? "项目集 | 张筱" : "Projects | Zhang Xiao",
    description: isZh
      ? "涵盖公有云SaaS、大语言模型AI应用、私有化Kubernetes部署及自动化生产系统的核心项目展示。"
      : "Portfolio showcasing core projects across public cloud SaaS, LLM AI applications, private Kubernetes deployments, and automated systems.",
    keywords: "Projects, Open Source, SaaS, AI, Kubernetes, React, Rust, Heywhale",
  });
}

import { useParams } from "react-router";

export default function Projects() {
  const { lang } = useParams();
  const isZh = lang === "zh";

  const dict = {
    title: isZh ? "项目集" : "Projects Portfolio",
    desc: isZh 
      ? <>我参与设计与部署的企业级系统、SaaS 平台及核心服务精选。更多开源工作请访问 <a href="https://github.com/onichandame" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline dark:text-blue-400">GitHub (@onichandame)</a>。</>
      : <>A selection of enterprise systems, SaaS platforms, and tools I have engineered and deployed. You can find more of my open-source work on <a href="https://github.com/onichandame" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline dark:text-blue-400">GitHub (@onichandame)</a>.</>
  };

  const projects = [
    {
      name: isZh ? "Heywhale 数据科学社区" : "Heywhale Data Science Community",
      description: isZh ? "主导 LLM 应用、社区社交系统与算力计费核心模块。将基础架构升级为 Monorepo 与分布式消息队列。" : "Core features including LLM applications, social systems, and compute billing. Upgraded infrastructure to monorepo and distributed message queues.",
      tags: ["Rust", "Node.js", "MongoDB", "Redis", "Microservices"],
    },
    {
      name: isZh ? "企业级私有化部署" : "Enterprise Private Deployments",
      description: isZh ? "为企业客户提供异构计算资源（Slurm集群）整合及三方认证系统对接，并使用 Helm 优化交付流水线。" : "Heterogeneous resource integration (Slurm clusters) and third-party auth systems for enterprise clients. Optimized operations using Helm.",
      tags: ["Kubernetes", "Helm", "Golang", "Python", "Enterprise SaaS"],
    },
    {
      name: isZh ? "雅思 AI 写作批改系统" : "IELTS AI Writing Grader",
      description: isZh ? "基于大语言模型，为雅思写作批改工具交付高可用的生产环境，管理全套容器化与基础设施。" : "Delivered a production environment for an IELTS writing correction tool powered by Large Language Models. Managed containerization and infra.",
      tags: ["LLM", "Docker", "Python", "Linux"],
    },
  ];

  return (
    <div className="flex flex-col gap-10 py-12">
      <section>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
          {dict.title}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-10">
          {dict.desc}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <div key={i} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow dark:bg-gray-800/50">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{p.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">{p.description}</p>
              <div className="flex flex-wrap gap-2">
                {p.tags.map(tag => (
                  <span key={tag} className="text-xs font-medium px-2.5 py-1 bg-blue-100 text-blue-800 rounded dark:bg-blue-900 dark:text-blue-200">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
