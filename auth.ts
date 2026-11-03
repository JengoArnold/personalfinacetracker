

import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import pool from "@/lib/database";
import { RowDataPacket} from "mysql2";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  pages: {
    signIn: "/signin",
  },
  callbacks: {

    async signIn({ user, account }) {
            try {
                // Only process Google sign-ins
                if (account?.provider !== "google") {
                    return false;
                }

                // Get the user's Google account information
                const googleId = account.providerAccountId;
                const email = user.email;
                const name = user.name || "User";

                if (!googleId || !email) {
                    return false;
                }

                // Check whether this user already exists
                const [rows] = await pool.execute<RowDataPacket[]>(
                    `SELECT id, email, google_id
                     FROM users
                     WHERE email = ? OR google_id = ?
                     LIMIT 1`,
                    [email, googleId]
                );

                if (rows.length > 0) {
                    const existingUser = rows[0];

                    // Prevent linking a different Google account
                    // to an existing email.
                    if (
                        existingUser.email !== email ||
                        (existingUser.google_id &&
                         existingUser.google_id !== googleId)
                    ) {
                        return false;
                    }

                    // Update the existing user
                    await pool.execute(
                        `UPDATE users
                         SET name = ?, google_id = ?
                         WHERE id = ?`,
                        [name, googleId, existingUser.id]
                    );

                } else {
                    // Register a new user
                    await pool.execute(
                        `INSERT INTO users (name, email, google_id)
                         VALUES (?, ?, ?)`,
                        [name, email, googleId]
                    );
                }

                return true;

            } catch (error) {
                console.error("Google user database synchronization failed:", error);
                return false;
            }
        },

    

    async redirect({ url, baseUrl }) {
      // Allow redirects to the same application.
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }

      // Allow redirects to the same origin.
      if (new URL(url).origin === baseUrl) {
        return url;
      }

      return baseUrl;
    },
  },
});