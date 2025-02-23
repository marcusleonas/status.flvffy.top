import { notFound } from "next/navigation";
import { getUserByUsername } from "~/server/db/queries";

export default async function Page({
  params,
}: {
  params: Promise<{ user: string }>;
}) {
  const providedUsername = (await params).user;
  const user = await getUserByUsername(providedUsername);

  if (!user) {
    return notFound();
  }

  return (
    <section>
      <h1 className="text-xl font-semibold">{user.username}</h1>
    </section>
  );
}
