import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { username } from "better-auth/plugins";
import { db } from "../db";
import { resend } from "~/lib/email";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  emailVerification: {
    sendOnSignUp: true,
    requireEmailVerification: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      await resend.emails.send({
        from: "status.flvffy.top <status@flvffy.top>",
        to: [user.email],
        subject: "Verify your email address",
        html: `<span>Please verify your email address by clicking this link:</span><br><br><a href="${url}">${url}</a><br><br><span>from status.flvffy.top</span>`,
      });
    },
  },
  plugins: [
    username({
      minUsernameLength: 3,
      maxUsernameLength: 15,
    }),
  ],
});
