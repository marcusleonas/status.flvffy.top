"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const link: { href: string; text: string }[] = [
  {
    href: "/",
    text: "Home",
  },
  {
    href: "/register",
    text: "Register",
  },
  {
    href: "/signin",
    text: "Sign In",
  },
  {
    href: "/terms",
    text: "Terms of Service",
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [current, setCurrent] = useState(pathname);
  useEffect(() => {
    setCurrent(pathname);
  }, [pathname]);

  return (
    <aside className="mb-2 border-b border-b-black pb-2 md:mb-0 md:border-b-transparent md:pb-0">
      <h2 className="font-semibold">status.flvffy.top</h2>
      <div className="flex flex-col gap-1">
        {link.map((link) => (
          <Link
            href={link.href}
            key={link.href}
            className={`hover:underline ${current == link.href && "font-semibold"}`}
          >
            {link.text}
          </Link>
        ))}
      </div>
    </aside>
  );
}
