import { Locale } from "../locales";
import enUS from "./en-US.json";
import zhCN from "./zh-CN.json";

type Translation = typeof enUS | typeof zhCN;
type Key = keyof Translation;

const translations: Record<Locale, Translation> = { "en-US": enUS, "zh-CN": zhCN };

export function useTranslation(lang: Locale) {
  const translation = translations[lang];
  return {
    t(key: Key) {
      return translation[key];
    },
  };
}
