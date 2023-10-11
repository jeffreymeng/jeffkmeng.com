import React, { ReactNode } from "react";
import Link from "next/link";

export default function StyledLink({
  href,
  children,
}: {
  href: string;
  children?: ReactNode;
}) {
  return (
    <Link
      className={
        "inline text-cyan-600 hover:text-cyan-900 transition-all underline"
      }
      href={href}
    >
      {children}
    </Link>
  );
}
