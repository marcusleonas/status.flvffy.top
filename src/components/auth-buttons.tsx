"use client";

import { authClient } from "~/lib/auth-client";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

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
