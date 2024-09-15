"use client";

import { Locale } from "@/locale/locales";
import LocalizedLink from "@/locale/localized_link";
import { useTranslation } from "@/locale/translation";
import useUnlocalizedPathname from "@/locale/use_unlocalized_path";
import { useEffect, useState } from "react";
import { NavbarSection } from "./common";

export default function({ locale }: { locale: Locale }) {
  const { t } = useTranslation(locale);
  const allSections = [
    { matcher: /^\/$/, link: `/`, name: t("aboutMe") },
    //{ matcher: /^\/resume/, link: `/resume`, name: t("resume") },
  ] as const;
  const [section, setSection] = useState<(typeof allSections)[number]["name"]>("About Me");
  const unlocalizedPath = useUnlocalizedPathname();
  useEffect(() => {
    allSections.forEach(sec => {
      if (sec.matcher.test(unlocalizedPath)) setSection(sec.name);
    });
  }, [unlocalizedPath]);
  return (
    <NavbarSection>
      {allSections.map(sec => (
        <div key={sec.name} className="text-lg whitespace-nowrap">
          <LocalizedLink
            locale={locale}
            href={sec.link}
            className={section === sec.name ? `font-bold` : ``}
          >
            {sec.name}
          </LocalizedLink>
        </div>
      ))}
    </NavbarSection>
  );
}
