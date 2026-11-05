
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import pool from "@/lib/database";
import { RowDataPacket } from "mysql2";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Google],

    pages: {
        signIn: "/signin",
    },

    callbacks: {

        // 1. GOOGLE SIGN-IN CALLBACK
        async signIn({ user, account }) {
            try {
                // Only allow Google sign-in
                if (account?.provider !== "google") {
                    return false;
                }

                const googleId = account.providerAccountId;
                const email = user.email;
                const name = user.name || "User";

                if (!googleId || !email) {
                    return false;
                }

                // Check whether the user already exists
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
                    if (
                        existingUser.email !== email ||
                        (existingUser.google_id &&
                         existingUser.google_id !== googleId)
                    ) {
                        return false;
                    }

                    // Update existing user
                    await pool.execute(
                        `UPDATE users
                         SET name = ?, google_id = ?
                         WHERE id = ?`,
                        [name, googleId, existingUser.id]
                    );

                } else {
                    // Register new user
                    await pool.execute(
                        `INSERT INTO users (name, email, google_id)
                         VALUES (?, ?, ?)`,
                        [name, email, googleId]
                    );
                }

                return true;

            } catch (error) {
                console.error(
                    "Google user database synchronization failed:",
                    error
                );

                return false;
            }
        },

        // 2. JWT CALLBACK
        async jwt({ token }) {
            const dbToken = token as typeof token & {
                userId?: number;
            };

            // Find the database ID if it is not already stored
            if (dbToken.userId === undefined && token.email) {

                const [rows] = await pool.execute<RowDataPacket[]>(
                    `SELECT id FROM users
                     WHERE email = ?
                     LIMIT 1`,
                    [token.email]
                );

                if (rows.length > 0) {
                    dbToken.userId = Number(rows[0].id);
                }
            }

            return token;
        },

        // 3. SESSION CALLBACK
        async session({ session, token }) {
            const dbToken = token as typeof token & {
                userId?: number;
            };

            // Add the database ID to the logged-in user
            if (session.user && dbToken.userId !== undefined) {
                Object.assign(session.user, {
                    id: String(dbToken.userId),
                });
            }

            return session;
        },

        // 4. REDIRECT CALLBACK
        async redirect({ url, baseUrl }) {

            // Allow redirects within the application
            if (url.startsWith("/")) {
                return `${baseUrl}${url}`;
            }

            // Allow redirects to the same origin
            if (new URL(url).origin === baseUrl) {
                return url;
            }

            return baseUrl;
        },

    },
});
