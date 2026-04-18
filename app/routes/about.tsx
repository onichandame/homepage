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
  const avatarUrl = "https://res.cloudinary.com/onichandame/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,b_rgb:262c35/v1747296851/mmexport1728029668566_cropped_y57sqr.png";

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
            About Me
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-10 max-w-3xl">
          Senior Full Stack Engineer with an MSc in Physics from Lancaster University. I specialize in building complex SaaS platforms from 0 to 1 and scaling them from 1 to 100. Experienced in leading high-performance engineering teams, integrating heterogeneous computing resources (like Slurm clusters), and optimizing enterprise performance.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Career Timeline
        </h2>
        <div className="space-y-8 border-l-2 border-gray-200 dark:border-gray-700 pl-6 ml-3">
          <div className="relative">
            <div className="absolute -left-[31px] top-1.5 h-4 w-4 rounded-full border-2 border-white bg-blue-600 dark:border-gray-900"></div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Backend Lead @ Heywhale</h3>
            <time className="mb-2 block text-sm font-normal leading-none text-gray-400 dark:text-gray-500">2023 - Present</time>
            <p className="text-base font-normal text-gray-600 dark:text-gray-400">Leading the backend team, driving cross-functional collaboration, and tackling complex technical challenges for enterprise LLM/Compute applications.</p>
          </div>
          <div className="relative">
            <div className="absolute -left-[31px] top-1.5 h-4 w-4 rounded-full border-2 border-white bg-gray-300 dark:border-gray-900 dark:bg-gray-600"></div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Backend Engineer @ Heywhale</h3>
            <time className="mb-2 block text-sm font-normal leading-none text-gray-400 dark:text-gray-500">2020 - 2023</time>
            <p className="text-base font-normal text-gray-600 dark:text-gray-400">Architected the community social system and billing infrastructure from scratch. Upgraded infrastructure with monorepo and distributed message queues.</p>
          </div>
          <div className="relative">
            <div className="absolute -left-[31px] top-1.5 h-4 w-4 rounded-full border-2 border-white bg-gray-300 dark:border-gray-900 dark:bg-gray-600"></div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Full Stack Architect @ Gaoying Tech</h3>
            <time className="mb-2 block text-sm font-normal leading-none text-gray-400 dark:text-gray-500">2020</time>
            <p className="text-base font-normal text-gray-600 dark:text-gray-400">Led the full-lifecycle development of automated production control and order management systems based on Kubernetes.</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Core Skills
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
