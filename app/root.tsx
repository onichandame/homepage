import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  NavLink,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [
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

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-gray-50 text-gray-900 font-sans flex flex-col min-h-screen">
        <header className="border-b bg-white p-4 sticky top-0 z-10">
          <nav className="max-w-4xl mx-auto flex gap-6 font-medium">
            <NavLink to="/" className="hover:text-blue-600 [&.active]:text-blue-600">Home</NavLink>
            <NavLink to="/about" className="hover:text-blue-600 [&.active]:text-blue-600">About</NavLink>
            <NavLink to="/projects" className="hover:text-blue-600 [&.active]:text-blue-600">Projects</NavLink>
            <NavLink to="/blog" className="hover:text-blue-600 [&.active]:text-blue-600">Blog</NavLink>
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
