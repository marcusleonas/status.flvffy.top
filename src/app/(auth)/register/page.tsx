import { headers } from "next/headers";
import { auth } from "~/server/auth";
import { RegisterForm } from "./_components/register-form";

import { type Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
  title: "Register | status.flvffy.top",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    return (
      <section>
        <p>Already logged in.</p>
      </section>
    );
  }

  return (
    <section>
      <h1 className="text-xl font-semibold">Register</h1>
      <p className="pt-4">
        By registering, you agree to the{" "}
        <Link className="underline" href="/terms">
          Terms of Service
        </Link>
        .
      </p>
      <RegisterForm />
    </section>
  );
}
