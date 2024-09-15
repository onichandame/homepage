import { ComponentPropsWithoutRef } from "react";
import NameCard from "./name_card";
import { Params } from "./params";

export default async function Home({ params }: { params: Params }) {
  return (
    <div className="relative h-[826px]">
      <section className="block w-full absolute -z-50 h-full">
        <Background />
      </section>
      <section className="flex relative w-full top-48 justify-center">
        <NameCard locale={params.locale} />
      </section>
    </div>
  );
}

function Background({}: ComponentPropsWithoutRef<"div">) {
  return <div className="bg-secondary h-full w-2/5" />;
}
