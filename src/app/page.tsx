import { headers } from "next/headers";
import { Button } from "~/components/ui/button";
import { auth } from "~/server/auth";

import { type Metadata } from "next";
import { SignOutButton } from "~/components/auth-buttons";
import { Input } from "~/components/ui/input";
import { SetStatusForm } from "./_components/set-form";
import { db } from "~/server/db";
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
    });
  }

  return (
    <section>
      <h1>status.flvffy.top</h1>
      <p>
        a simple website for displaying your current status. designed for
        neocities websites.
      </p>

      {session && (
        <div className="pt-4">
          <p className="pb-4 font-medium">Logged in as {session.user.name}.</p>

          <SetStatusForm currentStatus={currentStatus?.status ?? ""} />

          <SignOutButton className="mt-4" />

          <p className="pt-4">Get status via API:</p>
          <Input
            defaultValue={`https://status.flvffy.top/api/status/${session.user.id}`}
            readOnly
          />

          <p className="pt-4">Returns:</p>
          <pre>
            <code>
              {`{
  status: string,
  userId: string,
  lastUpdated: string,
}`}
            </code>
          </pre>
          <p className="pt-4">Example JS Usage: </p>
          <pre>
            <code>
              {`function getStatus() {
  fetch(
    "https://status.flvffy.top/api/status/<user-id>" // copy this url from the home page
  ).then(async (value) => {
    const json = await value.json(); // get the json result from the api
    const statusText = document.querySelector("#status-text");
    statusText.innerHTML = json["status"]; # set statusText to the status result.
  });
}`}
            </code>
          </pre>
        </div>
      )}
    </section>
  );
}
