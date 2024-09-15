import { Locale } from "@/locale/locales";
import { useTranslation } from "@/locale/translation";
import capitalize from "lodash.capitalize";
import startCase from "lodash.startcase";
import { BsWechat } from "react-icons/bs";
import { FaGithub, FaTelegram } from "react-icons/fa";

export default function({ locale }: { locale: Locale }) {
  return (
    <div className="flex">
      <div className="w-96">
        <Cover locale={locale} />
      </div>
      <div className="w-96">
        <Inlet locale={locale} />
      </div>
    </div>
  );
}

function Cover({ locale }: { locale: Locale }) {
  const { t } = useTranslation(locale);
  return (
    <div className="flex flex-col rounded-md bg-tertiary w-full items-center shadow-xl">
      <div className="flex flex-col items-center space-y-4 py-12">
        <div className="w-48 h-48 rounded-full overflow-hidden">
          <img
            src="https://res.cloudinary.com/onichandame/image/upload/f_auto,c_limit,w_192,q_auto/v1654698901/pic/20220608222820_10_oaxmjm.png"
            alt="avatar"
          />
        </div>
        <h3 className="text-3xl font-bold">{t("name")}</h3>
        <hr className="w-48 h-0.5 mx-auto my-4 bg-blue-300 border-0 rounded md:my-10 dark:bg-gray-700" />
        <h4 className="font-thin text-2xl">{t("title")}</h4>
      </div>
      <div className="bg-white flex w-full rounded-b-md justify-around items-center text-lg py-3 [&>a]:w-full [&>a]:flex [&>a]:justify-center">
        <a href="https://github.com/onichandame" target="_blank">
          <FaGithub />
        </a>
        <a href="https://t.me/onichanmodo" target="_blank">
          <FaTelegram className="text-[#24A1DE]" />
        </a>
        <a href="weixin://dl/chat?onichandame" target="_blank">
          <BsWechat className="text-[#25D366]" />
        </a>
      </div>
    </div>
  );
}

function Inlet({ locale }: { locale: Locale }) {
  const { t } = useTranslation(locale);
  return (
    <div className="flex flex-col px-4 py-14 space-y-8">
      <h1 className="text-6xl font-extrabold">{startCase(t(`welcome`))}</h1>
      <div className="flex flex-col space-y-4">
        <h3 className="text-2xl font-semibold">{capitalize(t(`welcomeSubtitle`))}</h3>
        <p className="font-mono text-lg whitespace-pre-wrap">
          {t(`welcomeText`)}
        </p>
      </div>
    </div>
  );
}
