import { db } from ".";

export default async function getUserByUsername(username: string) {
  return await db.query.user.findFirst({
    where: (t, { eq }) => eq(t.username, username),
  });
}
