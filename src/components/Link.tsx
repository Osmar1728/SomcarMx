import type { MouseEvent, ReactNode } from "react";
import { href, navigate } from "../lib/router";

export default function Link({ to, children, className }: { to: string; children: ReactNode; className?: string }) {
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate(to);
  };
  return (
    <a href={href(to)} onClick={onClick} className={className ?? "underline"}>
      {children}
    </a>
  );
}
