

import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
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