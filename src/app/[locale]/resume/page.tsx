import { useTranslation } from "@/locale/translation";
import capitalize from "lodash.capitalize";
import { Params } from "../params";

export default function({ params }: { params: Params }) {
  const { t } = useTranslation(params.locale);
  return (
    <div className="bg-secondary h-full flex flex-col items-center py-16 space-y-12">
      <h1 className="text-4xl font-bold">{capitalize(t("resume"))}</h1>
      <h2 className="text-2xl font-bold flex justify-between items-center">
        {capitalize(t("experience"))}
        <a
          className="bg-button hover:bg-button-hover hover:cursor-pointer rounded-l-3xl rounded-r-3xl p-2"
          href={`/cv/${params.locale}.pdf`}
        >
          {t("downloadCv").toUpperCase()}
        </a>
      </h2>
      <Card
        period={{ start: "2023.12", end: "Present" }}
        title="后端Lead"
        company="上海和今信息科技有限公司"
        location="上海"
        description="desc"
      />
    </div>
  );
}

function Card(
  { period, title, company, location, description }: {
    period: { start: string; end: string };
    title: string;
    company: string;
    location: string;
    description: string;
  },
) {
  return (
    <div className="flex justify-between px-6 py-14 bg-white space-x-24">
      <div className="flex flex-col space-y-2">
        <h1 className="font-bold text-blue-700 text-2xl">{period.start} - {period.end}</h1>
        <h2>{title}</h2>
        <h2>{company}</h2>
        <h2>{location}</h2>
      </div>
      <p className="font-mono whitespace-pre-wrap">{description}</p>
    </div>
  );
}
