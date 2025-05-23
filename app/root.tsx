import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/cloudflare";
import {
  Links,
  Meta,
  NavLink,
  Outlet,
  redirect,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { getLocaleFromReq, getUnlocalizedPathFromReq, Locale, supportedLocales, Translation, translations } from "./translation";
import startCase from "lodash.startcase";

import "./tailwind.css";
import LocalizedLink from "./components/localizedLink";
import { BiCopyright } from "react-icons/bi";
import capitalize from "lodash.capitalize";
import { Dropdown } from "./components/dropdown";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "icon",
    href: "https://res.cloudinary.com/onichandame/image/upload/w_100,h_100,c_fill,g_face,r_max/v1747296851/mmexport1728029668566_cropped_y57sqr.png",
    type: "image/png",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

type LoaderData = {
  locale: Locale,
  path: string,
  translation: Translation
}

export function loader({ request }: LoaderFunctionArgs) {
  const locale = getLocaleFromReq(request);
  const url = new URL(request.url);
  if (!url.pathname.startsWith(`/${locale}`)) {
    const newPath = `/${locale}${url.pathname}`;
    return redirect(newPath, 308);
  }
  return { locale, path: getUnlocalizedPathFromReq(request), translation: translations[locale] } as LoaderData;
}

export default function Layout() {
  const loaderData = useLoaderData<LoaderData>();

  return (
    <html lang={loaderData.locale}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen flex flex-col">
        <div className="bg-primary text-primary flex-grow">
          <header className="bg-primary sticky top-0 z-10">
            <Navbar loaderData={loaderData} />
          </header>
          <main className="flex-grow"><Outlet /></main>
          <footer className="mt-auto">
            <Footer locale={loaderData.locale} />
          </footer>
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

function Navbar({ loaderData }: { loaderData: LoaderData }) {
  const allSections = [
    { matcher: /^\/$/, link: `/`, name: loaderData.translation.aboutMe, hasSubPath: false },
    { matcher: /^\/blog/, link: `/blog`, name: loaderData.translation.blog, hasSubPath: true },
  ] as const;

  return (
    <nav className="flex justify-between items-center h-16 shadow-lg px-4">
      <div className="flex items-center">
        <h1 className="text-3xl flex items-center">
          <div className="font-bold">{loaderData.translation.name}</div>
          <div className="font-thin items-center hidden md:flex">
            <div className="px-3">/</div>
            {startCase(loaderData.translation.title)}
          </div>
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden md:flex">
          <ul className="flex items-center gap-6">
            {allSections.map(sec => (
              <li key={sec.name}>
                <NavLink
                  to={`/${loaderData.locale}${sec.link}`}
                  end
                  className={({ isActive }) =>
                    `text-lg hover:text-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary rounded px-2 py-1 ${isActive ? 'font-bold underline' : ''}`
                  }
                >
                  {sec.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:hidden">
          <Dropdown
            trigger={
              <span className="text-4xl p-2 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primary">
                ☰
              </span>
            }
            align="right"
          >
            <ul className="flex flex-col py-2">
              {allSections.map(sec => (
                <li key={sec.name}>
                  <NavLink
                    to={`/${loaderData.locale}${sec.link}`}
                    end={!sec.hasSubPath}
                    className={({ isActive }) =>
                      `block px-4 py-3 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none ${isActive ? 'font-bold bg-gray-50' : ''}`
                    }
                  >
                    {sec.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </Dropdown>
        </div>
        <LocaleSelector loaderData={loaderData} />
      </div>
    </nav>
  );
}

function LocaleSelector({ loaderData }: { loaderData: LoaderData }) {
  return (
    <Dropdown
      trigger={
        <div className="inline-flex items-center space-x-2 h-full justify-between px-3 py-2 text-sm hover:bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
          <LocaleIcon locale={loaderData.locale} />
          <span className="hidden md:inline">{loaderData.translation[loaderData.locale]}</span>
          <span className="text-xs ml-1">▼</span>
        </div>
      }
      align="right"
      width="full"
    >
      <ul>
        {supportedLocales.filter(v => v !== loaderData.locale).map(v => (
          <li key={v}>
            <LocalizedLink
              locale={v}
              to={loaderData.path}
              className="inline-flex items-center space-x-2 px-3 py-2 text-sm hover:bg-gray-100 w-full text-left"
            >
              <LocaleIcon locale={v} />
              <span className="hidden md:inline">{loaderData.translation[v]}</span>
            </LocalizedLink>
          </li>
        ))}
      </ul>
    </Dropdown>
  );
}

function LocaleIcon({ locale }: { locale: Locale }) {
  return (
    <img
      className="h-4 w-6 object-cover"
      alt={locale}
      src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${locale.split('-')[1]}.svg`}
      loading="lazy"
    />
  );
}

function Footer({ locale }: { locale: Locale }) {
  const t = translations[locale];
  return (
    <footer className="bg-gray-50 py-6 px-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-1 text-sm flex-wrap justify-center">
          <BiCopyright className="flex-shrink-0" />
          <span>2025 by</span>
          <a
            href="https://github.com/onichandame"
            className="underline hover:text-opacity-80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-1"
          >
            onichandame
          </a>
        </div>
        <address className="not-italic flex flex-col items-center gap-2">
          <div className="font-bold text-lg">{capitalize(t.contact)}</div>
          <a
            href="mailto:zxinmyth@gmail.com"
            className="font-light hover:text-opacity-80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-2 py-1"
          >
            Email
          </a>
        </address>
      </div>
    </footer>
  );
}