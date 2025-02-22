import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "~/server/auth";
import { RegisterForm } from "./_components/RegisterForm";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    return redirect("/");
  }

  return (
    <section>
      <h1 className="text-xl font-semibold">Register</h1>
      <RegisterForm />
    </section>
  );
}
