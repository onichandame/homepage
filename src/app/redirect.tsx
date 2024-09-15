"use client";

import useDefaultLocale from "@/locale/use_default_locale";
import { useEffect } from "react";

export default function() {
  const { defaultLocale } = useDefaultLocale();
  useEffect(() => {
    window.location.replace(`/${defaultLocale}`);
  }, [defaultLocale]);
  return <></>;
}
