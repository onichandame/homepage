import { Link } from "@remix-run/react";
import { ComponentPropsWithoutRef } from "react";
import { Locale } from "~/translation";

/** parse raw link to link that contains locale
 *  href must be an absolute link to the current domain, like `/home`
 */
export default function LocalizedLink({
  to,
  locale,
  ...other
}: { locale: Locale } & ComponentPropsWithoutRef<typeof Link>) {
  return (
    <Link
      to={`/${locale}${to}`}
      {...other}
    />
  );
}
