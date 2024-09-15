import { Locale } from "@/locale/locales";
import { useTranslation } from "@/locale/translation";
import capitalize from "lodash.capitalize";
import { BiCopyright } from "react-icons/bi";

export default function({ locale }: { locale: Locale }) {
  const { t } = useTranslation(locale);
  return (
    <div className="flex justify-between m-6 items-start">
      <div className="flex items-center space-x-1">
        <BiCopyright />2024 by <a href="https://github.com/onichandame" className="underline">onichandame</a>.
      </div>
      <div className="flex flex-col space-y-4 items-center">
        <div className="font-bold text-lg">{capitalize(t("contact"))}</div>
        <a href="mailto:zxinmyth@gmail.com" className="font-light">Email</a>
      </div>
    </div>
  );
}
