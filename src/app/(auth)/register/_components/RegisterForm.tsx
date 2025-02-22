"use client";

import { Input } from "~/components/ui/input";

export function RegisterForm() {
  return (
    <form action="" className="space-y-4 pt-4">
      <div>
        <label htmlFor="email">Email</label>
        <Input type="email" name="email" />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <Input type="password" name="password" />
      </div>

      <div>
        <label htmlFor="username">Username</label>
        <Input type="text" name="username" />
      </div>
    </form>
  );
}
