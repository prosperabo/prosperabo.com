import NextAuth from "next-auth/next";
import { User } from "@prisma/client";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User extends AdapterUser {
    role: string;
    id: string;
  }
  interface Session {
    user: User;
  }
}

/* declare module "next-auth/jwt" {
  type JWT = User;
} */

/* declare module "next-auth/jwt" {
  interface JWT {
    User;
  }
} */
