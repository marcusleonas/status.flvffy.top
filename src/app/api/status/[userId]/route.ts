import { db } from "~/server/db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ userId: string }> },
) {
  const userId = (await params).userId;
  const status = await db.query.status.findFirst({
    where: (t, { eq }) => eq(t.ownerId, userId),
  });

  if (status) {
    return Response.json(
      {
        status: 200,
        message: status?.status,
        userId: status?.ownerId,
        lastUpdated: status?.updated_at,
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
      message: "user not found",
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    },
  );
}
