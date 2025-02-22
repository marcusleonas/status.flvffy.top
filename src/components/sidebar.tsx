import Link from "next/link";

const link: { href: string; text: string }[] = [
  {
    href: "/",
    text: "Home",
  },
  {
    href: "/register",
    text: "Register",
  },
];

export function Sidebar() {
  return (
    <aside>
      <h2 className="font-semibold">status.flvffy.top</h2>
      <div className="flex flex-col gap-1">
        {link.map((link) => (
          <Link href={link.href} key={link.href} className="hover:underline">
            {link.text}
          </Link>
        ))}
      </div>
    </aside>
  );
}
