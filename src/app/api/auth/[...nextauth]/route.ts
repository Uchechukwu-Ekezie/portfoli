import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

export const authOptions: NextAuthOptions = {
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

        // TEMPORARY: Hardcoded admin for testing
        if (credentials.email === "admin@portfolio.com" && credentials.password === "admin123") {
          return {
            id: "1",
            email: "admin@portfolio.com",
            name: "Admin",
            role: "admin",
          } as AdminUser;
        }

        try {
          // Try multiple possible backend endpoints
          const possibleEndpoints = [
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`,
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/login`,
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/login`,
          ];

          let authResult = null;
          let successfulEndpoint = null;

          for (const backendUrl of possibleEndpoints) {
            console.log("Trying endpoint:", backendUrl);

            try {
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

              console.log(`Response from ${backendUrl}:`, response.status);

              if (response.ok) {
                const result = await response.json();
                console.log("Response data:", result);

                // Check different possible response formats
                if (
                  result.success ||
                  result.token ||
                  result.user ||
                  result.authenticated
                ) {
                  authResult = result;
                  successfulEndpoint = backendUrl;
                  break;
                }
              } else {
                const errorText = await response.text();
                console.log(
                  `Error from ${backendUrl}:`,
                  response.status,
                  errorText
                );
              }
            } catch (endpointError) {
              console.log(
                `Failed to connect to ${backendUrl}:`,
                endpointError instanceof Error
                  ? endpointError.message
                  : String(endpointError)
              );
            }
          }

          if (!authResult) {
            console.error("All backend endpoints failed");
            return null;
          }

          console.log("Successful authentication via:", successfulEndpoint);
          console.log("Auth result:", authResult);

          // Handle different response formats
          let user = null;

          if (authResult.user) {
            user = authResult.user;
          } else if (authResult.data && authResult.data.user) {
            user = authResult.data.user;
          } else if (authResult.email) {
            // Direct user object
            user = authResult;
          } else if (authResult.token) {
            // Backend returns only a token, create user from credentials
            user = {
              email: credentials.email,
              name: credentials.email.split('@')[0],
              role: "admin"
            };
          }

          if (user) {
            console.log("User found:", user);
            return {
              id: user.id || user._id || "1",
              email: user.email || credentials.email,
              name: user.name || user.username || "Portfolio Admin",
              role: user.role || "admin",
            } as AdminUser;
          }

          console.log("No user found in response");
          return null;
        } catch (error) {
          console.error("Auth error:", error);
          return null;
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
        token.role = (user as AdminUser).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub!;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/admin/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
