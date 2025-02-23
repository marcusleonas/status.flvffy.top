import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { Sidebar } from "~/components/sidebar";
import { Toaster } from "~/components/ui/sonner";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <main className="mx-auto my-8 grid max-w-4xl grid-cols-1 gap-8 px-4 md:grid-cols-[0.25fr_1fr] md:px-0">
          <Sidebar />
          {children}
          <Toaster />
        </main>
      </body>
    </html>
  );
}
