import { NavLink } from "react-router";

export function meta() {
  return [
    { title: "Home | Personal Portfolio" },
    { name: "description", content: "Welcome to my personal portfolio and digital garden." },
  ];
}

export default function Home() {
  return (
    <div className="flex flex-col gap-10 py-12">
      <section className="space-y-6">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl dark:text-white">
          Hi, I'm a Software Engineer.
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
          I build scalable web applications and explore the boundaries of edge architecture. 
          Welcome to my digital garden where I share my technical projects, thoughts, and career journey.
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
