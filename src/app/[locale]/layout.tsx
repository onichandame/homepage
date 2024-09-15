import { locales } from "@/locale/locales";
import { PropsWithChildren } from "react";
import Footer from "./footer";
import Navbar from "./navbar";
import { Params } from "./params";

export async function generateStaticParams(): Promise<Params[]> {
  return locales.map(v => ({ locale: v }));
}

export default function Layout({
  children,
  params,
}: PropsWithChildren & { params: Params }) {
  return (
    <html lang={params.locale}>
      <body className="bg-primary text-primary">
        <header className="bg-primary px-page">
          <Navbar locale={params.locale} />
        </header>
        <main>{children}</main>
        <footer>
          <Footer locale={params.locale} />
        </footer>
      </body>
    </html>
  );
}
