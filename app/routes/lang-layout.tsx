import { Outlet, redirect } from "react-router";
import type { LoaderFunctionArgs } from "react-router";

export function loader({ params }: LoaderFunctionArgs) {
  const lang = params.lang;
  if (lang !== "en" && lang !== "zh") {
    // 防御无效语言枚举
    return redirect("/en");
  }
  return null;
}

export default function LangLayout() {
  return <Outlet />;
}
