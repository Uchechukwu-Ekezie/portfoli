import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
    accessToken?: string; // Backend JWT token
  }

  interface User extends DefaultUser {
    role: string;
    token?: string; // Backend JWT token
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    role: string;
    accessToken?: string; // Backend JWT token
  }
}