import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "~/server/auth";

export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return redirect("/signin");
  }

  return (
    <section>
      <h1 className="text-xl font-semibold">{session.user.username}</h1>
    </section>
  );
}
