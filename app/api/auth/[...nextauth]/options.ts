import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import GoogleProvider from "next-auth/providers/google";
// import { RoleType } from "@prisma/client";

// REF.: https://next-auth.js.org/configuration/providers/oauth#using-a-custom-provider
export const authOptions: NextAuthOptions = {
  session: {
    strategy: "database",
  },
  // secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      profile(profile) {
        console.log(">>>>>profile", profile);
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          emailVerified: profile.email_verified,
          image: profile.picture,
          role: profile.role ? profile.role : "INVESTOR", // role: RoleType.INVESTOR, // "INVESTOR",
        };
      },
    }),
  ],
  // REF.: https://authjs.dev/guides/role-based-access-control#with-database
  callbacks: {
    async session({ session, user }) {
      session.user.role = user?.role;
      session.user.id = user?.id;
      console.log("SESION", session);
      return session;
    },
  },
};
