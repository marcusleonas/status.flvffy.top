"use client";

import { authClient } from "~/lib/auth-client";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import React from "react";

export function SignOutButton({ className }: { className: string }) {
  const router = useRouter();

  return (
    <Button
      className={className}
      onClick={async () => {
        await authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              router.push("/signin");
            },
          },
        });
      }}
    >
      Sign Out
    </Button>
  );
}

export function SignOutLink({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <button
      className="text-left hover:underline"
      onClick={async () => {
        await authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              router.push("/signin");
            },
          },
        });
      }}
    >
      {children}
    </button>
  );
}
