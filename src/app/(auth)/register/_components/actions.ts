"use server";

import { headers } from "next/headers";
import { auth } from "~/server/auth";
import { db } from "~/server/db";
import { status } from "~/server/db/schema";

export async function createEmptyStatus(userId: string) {
  return await db.insert(status).values({
    ownerId: userId,
    status: "No status set",
  });
}
