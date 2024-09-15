import { PropsWithChildren } from "react";

/** Common container in the navbar */
export function NavbarSection({ children }: PropsWithChildren) {
    const normalizedChildren = Array.isArray(children) ? children : [children];
    return <ul className="flex items-center space-x-10">{normalizedChildren}</ul>;
  }
  