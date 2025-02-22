import { headers } from "next/headers";
import { auth } from "~/server/auth";
import { SignInForm } from "./_components/signin-form";

import { type Metadata } from "next";
export const metadata: Metadata = {
  title: "Sign In | status.flvffy.top",
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
      <h1 className="text-xl font-semibold">Sign In</h1>
      <SignInForm />
    </section>
  );
}
