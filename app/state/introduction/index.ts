import { getFileContent } from "../cms";

export async function getIntroduction(locale: string) {
  const [introduction] = await getFileContent([`homepage/introduction/${locale}.md`]);
  return introduction
}