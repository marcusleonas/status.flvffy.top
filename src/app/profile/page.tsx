import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getTimeSince } from "~/lib/time";
import { auth } from "~/server/auth";
import { getAllStatus } from "~/server/db/queries";

export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return redirect("/signin");
  }

  const allStatus = await getAllStatus(session.user.id);

  return (
    <section className="flex flex-col gap-2">
      <div>
        <h1 className="text-xl font-semibold">{session.user.username}</h1>
      </div>

      <div>
        <h2 className="font-semibold">Status Updates</h2>
        <div className="flex flex-col divide-y divide-gray-950">
          {allStatus.map((status) => (
            <div className="py-4" key={status.id}>
              <p>{status.status}</p>
              <small className="text-xs">
                Created: {getTimeSince(new Date(status.created_at))}
              </small>
            </div>
          ))}

          {allStatus.length === 0 && <p>No status found.</p>}
        </div>
      </div>
    </section>
  );
}
