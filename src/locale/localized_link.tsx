"use client";

import { ComponentPropsWithoutRef } from "react";
import { Locale } from "./locales";
import useDefaultLocale from "./use_default_locale";
import useUnlocalizedPathname from "./use_unlocalized_path";

/** parse raw link to link that contains locale
 *  href must be an absolute link to the current domain, like `/home`
 */
export default function LocalizedLink({
  href,
  locale,
  ...other
}: { locale: Locale } & ComponentPropsWithoutRef<"a">) {
  const currentUnlocalizedPath = useUnlocalizedPathname();
  const { setDefaultLocale } = useDefaultLocale();
  return (
    <a
      href={`/${locale}${href || currentUnlocalizedPath}`}
      onClick={() => {
        setDefaultLocale(locale);
      }}
      {...other}
    />
  );
}
