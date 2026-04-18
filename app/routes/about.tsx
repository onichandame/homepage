import { useParams } from "react-router";
import { getSeoMeta } from "../utils/seo";

export function meta({ params }: { params: { lang?: string } }) {
  const isZh = params.lang === "zh";
  return getSeoMeta({
    title: isZh ? "关于 | 张筱" : "About | Zhang Xiao",
    description: isZh
      ? "物理学硕士，资深全栈工程师。精通复杂SaaS平台开发，擅长敏捷交付与异构集群架构。"
      : "MSc in Physics, Senior Full Stack Engineer. Expert in complex SaaS platforms, agile delivery, and heterogeneous cluster architectures.",
    keywords: "Zhang Xiao, Resume, Lancaster University, Node.js, Rust, Kubernetes, Heywhale",
  });
}

export default function About() {
  const { lang } = useParams();
  const isZh = lang === "zh";
  const avatarUrl = "https://res.cloudinary.com/onichandame/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,b_rgb:262c35/v1747296851/mmexport1728029668566_cropped_y57sqr.png";

  const dict = {
    title: isZh ? "关于我" : "About Me",
    bio: isZh
      ? "英国兰卡斯特大学物理学硕士，资深全栈工程师。专注从 0 到 1 构建复杂的 SaaS 平台，并将其从 1 扩展至 100。在带领高绩效工程团队、异构计算资源（如 Slurm 集群）集成以及企业级性能调优方面拥有丰富经验。"
      : "Senior Full Stack Engineer with an MSc in Physics from Lancaster University. I specialize in building complex SaaS platforms from 0 to 1 and scaling them from 1 to 100. Experienced in leading high-performance engineering teams, integrating heterogeneous computing resources (like Slurm clusters), and optimizing enterprise performance.",
    timelineTitle: isZh ? "职业轨迹" : "Career Timeline",
    skillsTitle: isZh ? "核心技术栈" : "Core Skills",
    jobs: [
      {
        title: isZh ? "后端负责人 @ Heywhale" : "Backend Lead @ Heywhale",
        date: "2023 - Present",
        desc: isZh ? "带领后端团队，推动跨部门协作，攻克企业级 LLM/算力应用的复杂技术难题。" : "Leading the backend team, driving cross-functional collaboration, and tackling complex technical challenges for enterprise LLM/Compute applications.",
        color: "bg-blue-600"
      },
      {
        title: isZh ? "后端工程师 @ Heywhale" : "Backend Engineer @ Heywhale",
        date: "2020 - 2023",
        desc: isZh ? "从零架构社区社交系统和计费基础设施。使用 Monorepo 和分布式消息队列升级基础架构。" : "Architected the community social system and billing infrastructure from scratch. Upgraded infrastructure with monorepo and distributed message queues.",
        color: "bg-gray-300 dark:bg-gray-600"
      },
      {
        title: isZh ? "全栈架构师 @ Gaoying Tech" : "Full Stack Architect @ Gaoying Tech",
        date: "2020",
        desc: isZh ? "主导基于 Kubernetes 的自动化生产控制与订单管理系统的全生命周期开发。" : "Led the full-lifecycle development of automated production control and order management systems based on Kubernetes.",
        color: "bg-gray-300 dark:bg-gray-600"
      }
    ]
  };

  return (
    <div className="flex flex-col gap-12 py-12">
      <section>
        <div className="flex items-center gap-6 mb-8">
          <img 
            src={avatarUrl} 
            alt="Zhang Xiao" 
            className="w-20 h-20 rounded-full border-2 border-gray-200 dark:border-gray-700 shadow-sm"
          />
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                {dict.title}
              </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-10 max-w-3xl">
              {dict.bio}
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              {dict.timelineTitle}
            </h2>
            <div className="space-y-8 border-l-2 border-gray-200 dark:border-gray-700 pl-6 ml-3">
              {dict.jobs.map((job, idx) => (
                <div key={idx} className="relative">
                  <div className={`absolute -left-[31px] top-1.5 h-4 w-4 rounded-full border-2 border-white dark:border-gray-900 ${job.color}`}></div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{job.title}</h3>
                  <time className="mb-2 block text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{job.date}</time>
                  <p className="text-base font-normal text-gray-600 dark:text-gray-400">{job.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              {dict.skillsTitle}
            </h2>
        <div className="flex flex-wrap gap-3">
          {['Node.js', 'TypeScript', 'Rust', 'React', 'Docker', 'Kubernetes', 'MongoDB', 'PostgreSQL', 'Redis', 'Python'].map((skill) => (
            <span
              key={skill}
              className="bg-gray-100 text-gray-800 text-sm font-medium px-4 py-2 rounded-md dark:bg-gray-800 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
