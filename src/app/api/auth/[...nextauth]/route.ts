import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { JWT } from "next-auth/jwt";
import type { Session } from "next-auth";

interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
  accessToken?: string;
}

interface BackendUser {
  id?: string;
  _id?: string;
  email?: string;
  name?: string;
  username?: string;
  role?: string;
}

interface BackendAuthResponse {
  success?: boolean;
  authenticated?: boolean;
  token?: string;
  accessToken?: string;
  user?: BackendUser;
  data?: {
    user?: BackendUser;
    token?: string;
  };
  // Some backends return the user fields at top-level
  id?: string;
  _id?: string;
  email?: string;
  name?: string;
  username?: string;
  role?: string;
  message?: string;
  error?: string;
  detail?: string;
}

// Local helper types to extend NextAuth structures at runtime without global module augmentation
type JWTWithAccessToken = JWT & { role?: string; accessToken?: string };
type SessionUserWithRole = (Session["user"] & { role?: string }) | undefined;
type SessionWithAccessToken = Session & { accessToken?: string };

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log("Missing credentials");
          return null;
        }

        try {
          // Ensure base URL is configured
          const baseUrl =
            process.env.NEXT_PUBLIC_API_BASE_URL ||
            // Fallbacks to be resilient if env var is named differently in hosting
            process.env.API_URL ||
            process.env.NEXT_PUBLIC_API_URL ||
            // Last-resort default to avoid confusing "not configured" in prod
            "https://portfoliobackend-83lp.onrender.com";
          if (!baseUrl) {
            throw new Error("NEXT_PUBLIC_API_BASE_URL is not configured");
          }

          // Backend-recommended endpoint
          const backendUrl = `${baseUrl}/api/auth/login`;
          console.log("Authenticating via:", backendUrl);

          const response = await fetch(backendUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          const contentType = response.headers.get("content-type") || "";
          const payload: BackendAuthResponse | string = contentType.includes(
            "application/json"
          )
            ? await response.json().catch(() => ({} as BackendAuthResponse))
            : await response.text().catch(() => "");

          if (!response.ok) {
            let message = `Login failed with status ${response.status}`;
            if (typeof payload === "string" && payload) {
              message = payload;
            } else if (payload && typeof payload === "object") {
              const p = payload as BackendAuthResponse;
              message = p.message || p.error || p.detail || message;
            }
            // Throw to surface a clear error to the client
            throw new Error(message);
          }

          const authResult: BackendAuthResponse =
            typeof payload === "string" ? ({} as BackendAuthResponse) : payload;
          console.log("Auth result payload:", authResult);

          // Normalize result
          const backendUser: BackendUser | null =
            authResult.user || authResult.data?.user || null;
          const token: string | undefined =
            authResult.token ||
            authResult.accessToken ||
            authResult.data?.token;

          // If backend only returns token without user object, create a minimal user
          if (!backendUser && !authResult.email && token) {
            console.log(
              "Backend returned only token, creating minimal user object"
            );
            const adminUser: AdminUser = {
              id: "1",
              email: credentials.email,
              name: "Portfolio Admin",
              role: "admin",
              accessToken: token,
            };
            return adminUser;
          }

          if (!backendUser && !authResult.email) {
            throw new Error("Login succeeded but no user object returned");
          }

          const userObj: BackendUser & {
            email?: string;
            name?: string;
            role?: string;
          } = (backendUser as BackendUser) || {
            id: authResult.id,
            _id: authResult._id,
            email: authResult.email,
            name: authResult.name,
            username: authResult.username,
            role: authResult.role,
          };

          const adminUser: AdminUser = {
            id: userObj.id || userObj._id || "1",
            email: userObj.email || credentials.email,
            name: userObj.name || userObj.username || "Portfolio Admin",
            role: userObj.role || "admin",
            accessToken: token,
          };
          return adminUser;
        } catch (error) {
          console.error("Auth error:", error);
          // Re-throw to let NextAuth surface a readable error on the client
          throw error;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user as AdminUser;
        token.role = u.role;
        if (u.accessToken) {
          (token as JWTWithAccessToken).accessToken = u.accessToken;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub!;
        const t = token as JWTWithAccessToken;
        if (t.role) {
          (session.user as SessionUserWithRole)!.role = t.role;
        }
        if (t.accessToken) {
          (session as SessionWithAccessToken).accessToken = t.accessToken;
        }
      }
      return session;
    },
  },
  pages: {
    signIn: "/admin/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
