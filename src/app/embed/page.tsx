import { headers } from "next/headers";
import { Input } from "~/components/ui/input";
import { auth } from "~/server/auth";

export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session)
    return (
      <section>
        <p>Must be logged in to view this page!</p>
      </section>
    );

  return (
    <section>
      <h1 className="text-xl font-semibold">Embed</h1>
      <p>Copy the example code to embed your latest status on your website.</p>

      <p className="pt-4">Get status via API:</p>
      <Input
        defaultValue={`https://status.flvffy.top/api/status/${session.user.id}`}
        readOnly
      />

      <p className="pt-4">Returns:</p>
      <pre>
        <code>
          {`{
  status: number, // status code of the response
  message: string, // user's current status
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
    "https://status.flvffy.top/api/status/${session.user.id}"
  ).then(async (value) => {
    const json = await value.json(); // get the json result from the api
    const statusText = document.querySelector("#status-text");
    if (json["status"] == 200) {
      // check if status code is 200 for OK
      statusText.innerHTML = json["message"]; // set to the status result.
    }
  });
}`}
        </code>
      </pre>
    </section>
  );
}
