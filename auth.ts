

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

    async signIn({user,account}) {
      try {
        if(account?.provider !=="google") {
          return false;
        }
        
      }
    }

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