export function meta() {
  return [
    { title: "About | Personal Portfolio" },
    { name: "description", content: "My career timeline and technical skills." },
  ];
}

export default function About() {
  return (
    <div className="flex flex-col gap-12 py-12">
      <section>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
          About Me
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-10 max-w-3xl">
          I am a passionate developer focused on building resilient and high-performance web systems.
          With a strong background in full-stack development, I specialize in React ecosystem, Node.js, and edge computing architectures.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Career Timeline
        </h2>
        <div className="space-y-8 border-l-2 border-gray-200 dark:border-gray-700 pl-6 ml-3">
          <div className="relative">
            <div className="absolute -left-[31px] top-1.5 h-4 w-4 rounded-full border-2 border-white bg-blue-600 dark:border-gray-900"></div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Senior Software Engineer</h3>
            <time className="mb-2 block text-sm font-normal leading-none text-gray-400 dark:text-gray-500">2023 - Present</time>
            <p className="text-base font-normal text-gray-600 dark:text-gray-400">Leading frontend architecture and edge deployment strategies.</p>
          </div>
          <div className="relative">
            <div className="absolute -left-[31px] top-1.5 h-4 w-4 rounded-full border-2 border-white bg-gray-300 dark:border-gray-900 dark:bg-gray-600"></div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Full Stack Developer</h3>
            <time className="mb-2 block text-sm font-normal leading-none text-gray-400 dark:text-gray-500">2020 - 2023</time>
            <p className="text-base font-normal text-gray-600 dark:text-gray-400">Developed and maintained multiple high-traffic SPA applications.</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Core Skills
        </h2>
        <div className="flex flex-wrap gap-3">
          {['React Router v7', 'Cloudflare Workers', 'TypeScript', 'Tailwind CSS', 'Vite', 'React', 'Node.js'].map((skill) => (
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
