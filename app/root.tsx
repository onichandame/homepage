import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  NavLink,
  useParams,
  useLocation,
} from "react-router";
import { useState, useEffect } from "react";

import type { Route } from "./+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [
  {
    rel: "icon",
    type: "image/png",
    href: "https://res.cloudinary.com/onichandame/image/upload/w_128,c_fill,ar_1:1,g_auto,r_max/v1747296851/mmexport1728029668566_cropped_y57sqr.png"
  },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

const DICT: Record<string, any> = {
  en: { home: "Home", about: "About", projects: "Projects", blog: "Blog" },
  zh: { home: "首页", about: "关于", projects: "项目", blog: "博客" }
};

// 避免 FOUC (闪烁) 的防线：在 React Hydration 前执行
const ThemeScript = () => (
  <script
    dangerouslySetInnerHTML={{
      __html: `
        (function() {
          try {
            var storedTheme = localStorage.getItem('theme');
            var isDark = storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
            if (isDark) document.documentElement.classList.add('dark');
          } catch (e) {}
        })();
      `,
    }}
  />
);

export function Layout({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const location = useLocation();
  const lang = params.lang === "zh" ? "zh" : "en";
  const t = DICT[lang];
  
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setIsDark(!isDark);
  };

  // 动态替换当前路径的语言前缀，实现原地无缝切换
  const switchPath = (targetLang: string) => {
    return location.pathname.replace(new RegExp(`^/${lang}`), `/${targetLang}`);
  };

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <ThemeScript />
      </head>
      <body className="bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans flex flex-col min-h-screen transition-colors duration-300">
            <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 sticky top-0 z-10 transition-colors duration-300">
              <nav className="max-w-4xl mx-auto flex gap-6 font-medium items-center text-sm sm:text-base">
                <NavLink to={`/${lang}`} end className="flex items-center gap-3 mr-2 sm:mr-4 shrink-0 transition-opacity hover:opacity-80">
                  <img 
                    src="https://res.cloudinary.com/onichandame/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,b_rgb:262c35/v1747296851/mmexport1728029668566_cropped_y57sqr.png" 
                    alt="Logo" 
                    className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm"
                  />
                  <span className="font-bold tracking-tight text-gray-900 dark:text-white hidden sm:block">Zhang Xiao</span>
                </NavLink>
                <NavLink to={`/${lang}`} end className="hover:text-blue-600 dark:hover:text-blue-400 [&.active]:text-blue-600 dark:[&.active]:text-blue-400">{t.home}</NavLink>
            <NavLink to={`/${lang}/about`} className="hover:text-blue-600 dark:hover:text-blue-400 [&.active]:text-blue-600 dark:[&.active]:text-blue-400">{t.about}</NavLink>
            <NavLink to={`/${lang}/projects`} className="hover:text-blue-600 dark:hover:text-blue-400 [&.active]:text-blue-600 dark:[&.active]:text-blue-400">{t.projects}</NavLink>
            <NavLink to={`/${lang}/blog`} className="hover:text-blue-600 dark:hover:text-blue-400 [&.active]:text-blue-600 dark:[&.active]:text-blue-400">{t.blog}</NavLink>
            
            <div className="ml-auto flex items-center gap-4">
              <button 
                onClick={toggleTheme}
                className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300 focus:outline-none"
                aria-label="Toggle Dark Mode"
              >
                {isDark ? "☀️" : "🌙"}
              </button>
              
              <div className="text-sm flex gap-2 items-center">
                <NavLink to={switchPath("en")} className="hover:underline opacity-70 [&.active]:opacity-100 [&.active]:font-bold">EN</NavLink>
                <span className="opacity-50">|</span>
                <NavLink to={switchPath("zh")} className="hover:underline opacity-70 [&.active]:opacity-100 [&.active]:font-bold">中文</NavLink>
              </div>
            </div>
          </nav>
        </header>
        <main className="flex-1 max-w-4xl mx-auto w-full p-6">
          {children}
        </main>
        <footer className="border-t p-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Personal Space
        </footer>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
