import { redirect, type LoaderFunctionArgs } from "react-router";

export function loader({ request }: LoaderFunctionArgs) {
  const acceptLang = request.headers.get("Accept-Language") || "";
  // 边缘端极速判定，如果是中文环境直接 302，否则兜底英语
  const lang = acceptLang.toLowerCase().includes("zh") ? "zh" : "en";
  return redirect(`/${lang}`);
}
