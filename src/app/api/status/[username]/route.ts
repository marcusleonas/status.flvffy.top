import { db } from "~/server/db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ username: string }> },
) {
  const username = (await params).username;
  const status = await db.query.status.findFirst({
    where: (t, { eq }) => eq(t.ownerId, username),
  });

  if (status) {
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
