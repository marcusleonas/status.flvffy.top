import { desc } from "drizzle-orm";
import { db } from "~/server/db";
import { getUserByUsername } from "~/server/db/queries";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ username: string }> },
) {
  const username = (await params).username;
  const user = await getUserByUsername(username);

  if (!user) {
    return Response.json(
      {
        status: 404,
        message: "User not found.",
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      },
    );
  }

  const status = await db.query.status.findFirst({
    where: (t, { eq }) => eq(t.ownerId, user?.id),
    orderBy: (t) => desc(t.created_at),
  });

  if (!status) {
    return Response.json(
      {
        status: 404,
        message: "Status not found.",
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      },
    );
  }

  return Response.json(
    {
      status: 200,
      message: status?.status,
      userId: status?.ownerId,
      lastUpdated: status.created_at,
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    },
  );
}
