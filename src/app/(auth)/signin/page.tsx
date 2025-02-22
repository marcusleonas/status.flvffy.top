import { headers } from "next/headers";
import { auth } from "~/server/auth";
import { SignInForm } from "./_components/signin-form";

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
      <SignInForm />
    </section>
  );
}
