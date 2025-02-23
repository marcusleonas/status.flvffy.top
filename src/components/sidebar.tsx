"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "~/lib/auth-client";

interface NavSection {
  title: string;
  links: NavLink[];
}

interface NavLink {
  href: string;
  text: string;
  authLevel?: "auth" | "unauth";
}

const NAV_SECTIONS: NavSection[] = [
  {
    title: "",
    links: [
      { href: "/", text: "Home" },
      { href: "/register", text: "Register", authLevel: "unauth" },
      { href: "/signin", text: "Sign In", authLevel: "unauth" },
      { href: "/embed", text: "Embed", authLevel: "auth" },
      { href: "/terms", text: "Terms of Service" },
    ],
  },
  {
    title: "Account",
    links: [{ href: "/profile", text: "Profile", authLevel: "auth" }],
  },
];

export function Sidebar() {
  const { data: session, isPending } = authClient.useSession();
  const pathname = usePathname();

  if (isPending) return <div className="p-4">Loading...</div>;

  return (
    <aside className="mb-2 border-b border-black pb-2 md:mb-0 md:border-b-transparent md:pb-0">
      <h2 className="font-semibold">status.flvffy.top</h2>
      <div className="flex flex-col gap-4">
        {NAV_SECTIONS.map((section) => (
          <div key={section.title} className="flex flex-col gap-1">
            <p className="font-medium">{section.title}</p>
            {section.links
              .filter((link) => {
                if (link.authLevel === "auth") return session;
                if (link.authLevel === "unauth") return !session;
                return true;
              })
              .map((link) => (
                <Link
                  key={`${section.title}-${link.href}`}
                  href={link.href}
                  className={`hover:underline ${
                    pathname === link.href ? "text-purple-500" : ""
                  }`}
                >
                  {link.text}
                </Link>
              ))}
          </div>
        ))}
      </div>
    </aside>
  );
}
