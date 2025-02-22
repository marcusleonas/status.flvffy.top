"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { auth } from "~/server/auth";
import { db } from "~/server/db";
import { status as schemaStatus } from "~/server/db/schema";

export async function updateStatus(status: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  await db
    .update(schemaStatus)
    .set({ status })
    .where(eq(schemaStatus.ownerId, session.user.id));

  return {
    success: true,
    message: "Updated status",
  };
}
