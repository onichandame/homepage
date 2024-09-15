import { Locale } from "@/locale/locales";
import { useTranslation } from "@/locale/translation";
import lowerCase from "lodash.lowercase";
import startCase from "lodash.startcase";
import { NavbarSection } from "./common";
import LocaleSelector from "./locale-selector";
import Tabs from "./tabs";

export default function Navbar({ locale }: { locale: Locale }) {
  const { t } = useTranslation(locale);
  return (
    <nav className="flex justify-between h-16">
      <NavbarSection>
        <h1 className="text-3xl flex items-center">
          <div className="font-bold">{t("name")}</div>{" "}
          <div className="font-thin flex items-center">
            <div className="px-3">/</div>
            {startCase(lowerCase(t("title")))}
          </div>
        </h1>
      </NavbarSection>
      <NavbarSection>
        <Tabs locale={locale} />
        <LocaleSelector locale={locale} />
      </NavbarSection>
    </nav>
  );
}
