import { Locale, locales, localizedLocale } from "@/locale/locales";
import LocalizedLink from "@/locale/localized_link";

export default function({ locale }: { locale: Locale }) {
  return (
    <div className="relative group cursor-pointer">
      <LocaleButton locale={locale} />
      <ul
        className={`absolute w-full rounded-lg bg-white shadow-lg transition-all duration-250 ease-out invisible h-0 group-hover:visible group-hover:h-full z-50`}
      >
        {locales.filter(v => v !== locale).map(v => (
          <li key={v}>
            <LocaleButton locale={v} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function LocaleButton({
  locale,
}: { locale: (typeof locales)[number] }) {
  return (
    <LocalizedLink
      locale={locale}
      className="inline-flex space-x-2 items-center justify-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 whitespace-nowrap"
    >
      <LocaleIcon locale={locale} />
      <div>{localizedLocale[locale]}</div>
    </LocalizedLink>
  );
}

function LocaleIcon({ locale }: { locale: (typeof locales)[number] }) {
  return (
    <img
      className="h-4"
      alt={locale}
      src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${locale.split(`-`)[1]}.svg`}
    />
  );
}
