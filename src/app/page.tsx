import { headers } from "next/headers";
import { auth } from "~/server/auth";

export default async function HomePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <section>
      <h1>status.flvffy.top</h1>
      <p>
        a simple website for displaying your current status. designed for
        neocities websites.
      </p>

      {session && <p>logged in as {session.user.name}</p>}
    </section>
  );
}
