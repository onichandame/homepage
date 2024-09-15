"use client";

import { usePathname } from "next/navigation";
import { Locale, locales } from "./locales";

/** get the current path without the locale section */
export default function useUnlocalizedPathname() {
  const pathname = usePathname();
  return locales.reduce((prev, curr) => prev.replace(new RegExp(`^/${curr}`), ``), pathname);
}
