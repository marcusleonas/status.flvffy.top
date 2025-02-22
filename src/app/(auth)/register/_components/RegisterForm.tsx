"use client";

export async function RegisterForm() {
  return (
    <form action="">
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" />
      </div>

      <div>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" />
      </div>
    </form>
  );
}
