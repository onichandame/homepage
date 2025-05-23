import enUS from "./en-US";
import zhCN from "./zh-CN";

type Translation = typeof enUS | typeof zhCN;
type Key = keyof Translation;

const locales = ["en-US", "zh-CN"] as const
type Locale = typeof locales[number]
const translations: Record<Locale, Translation> = { "en-US": enUS, "zh-CN": zhCN };
const defaultLocale: Locale = 'en-US'
function getLocaleFromReq(request: Request): Locale {
  const headerLanguages = request.headers.get("accept-language")?.split(",") ?? [];
  const headerLocale = headerLanguages
    .map((language) => {
      const [code, ...others] = language.split(";");

      const q = others.find((param) => param.startsWith("q="))?.split("=")[1] ?? '1';
      return { code, q: parseFloat(q) } as const;
    })
    .sort((a, b) => b.q - a.q)
    .find(({ code }) => locales.includes(code as Locale))?.code || null;
  const url = new URL(request.url);
  const pathLocale = url.pathname.split("/")[1];
  const localeMap = Object.fromEntries(locales.map((locale) => [locale, locale]));
  const locale = localeMap[pathLocale] || (headerLocale ? localeMap[headerLocale] : null) || defaultLocale;
  return locale
}
function getUnlocalizedPathFromReq(request: Request): string {
  const locale = getLocaleFromReq(request)
  const url = new URL(request.url);
  return url.pathname.replace(new RegExp(`^/${locale}`), "");
}

export { translations, defaultLocale, locales as supportedLocales, type Locale, getLocaleFromReq, getUnlocalizedPathFromReq, type Translation };