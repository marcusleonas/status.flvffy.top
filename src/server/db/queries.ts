"use server";

import { desc } from "drizzle-orm";
import { db } from ".";

export async function getUserByUsername(username: string) {
  return await db.query.user.findFirst({
    where: (t, { eq }) => eq(t.username, username),
  });
}

export async function getUserById(userId: string) {
  return await db.query.user.findFirst({
    where: (t, { eq }) => eq(t.id, userId),
  });
}

export async function checkUsernameAvailability(username: string) {
  const res = await db.query.user.findFirst({
    where: (t, { eq }) => eq(t.username, username),
  });

  return !res;
}

export async function getAllStatus(limit?: number, withUser?: boolean) {
  return await db.query.status.findMany({
    limit: limit,
    // with: {
    //   user: withUser,
    // },
  });
}

export async function getAllStatusByUserId(userId: string) {
  return await db.query.status.findMany({
    where: (t, { eq }) => eq(t.ownerId, userId),
    orderBy: (t) => desc(t.created_at),
  });
}
