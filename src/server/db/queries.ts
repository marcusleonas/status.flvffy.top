"use server";

import { db } from ".";

export async function getUserByUsername(username: string) {
  return await db.query.user.findFirst({
    where: (t, { eq }) => eq(t.username, username),
  });
}

export async function checkUsernameAvailability(username: string) {
  const res = await db.query.user.findFirst({
    where: (t, { eq }) => eq(t.username, username),
  });

  return !res;
}
