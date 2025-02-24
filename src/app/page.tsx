import { headers } from "next/headers";
import { auth } from "~/server/auth";
import { type Metadata } from "next";

import { SignOutButton } from "~/components/auth-buttons";
import { SetStatusForm } from "./_components/set-form";
import Link from "next/link";

import { db } from "~/server/db";
import { desc } from "drizzle-orm";
import { getAllStatus, getUserById } from "~/server/db/queries";

import { getTimeSince } from "~/lib/time";

export const metadata: Metadata = {
  title: "Home | status.flvffy.top",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function HomePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  let currentStatus;
  if (session) {
    currentStatus = await db.query.status.findFirst({
      where: (t, { eq }) => eq(t.ownerId, session.user.id),
      orderBy: (t) => desc(t.created_at),
    });
  }

  const recentStatus = await getAllStatus(10, true);

  return (
    <section>
      <h1>status.flvffy.top</h1>
      <p>
        a simple website for displaying your current status. designed for
        neocities websites.
      </p>

      <div className="flex flex-col divide-y divide-gray-950">
        {recentStatus.map(async (status) => {
          const user = await getUserById(status.ownerId);

          return (
            <div className="py-4" key={status.id}>
              <p>{status.status}</p>
              <small className="text-sm">
                {getTimeSince(new Date(status.created_at))} •{" "}
                <Link
                  className="font-medium text-purple-700 hover:underline"
                  href={`/profile/${user?.username}`}
                >
                  {user?.username}
                </Link>
              </small>
            </div>
          );
        })}

        {recentStatus.length === 0 && <p>No status found.</p>}
      </div>

      {session && (
        <div className="pt-4">
          <p className="pb-4 font-medium">
            Logged in as {session.user.username}.
          </p>

          <SetStatusForm currentStatus={currentStatus?.status ?? ""} />

          <SignOutButton className="mt-4" />
        </div>
      )}
    </section>
  );
}
