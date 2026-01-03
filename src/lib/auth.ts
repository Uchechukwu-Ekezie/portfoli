import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Authenticate with backend
        const backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://portfoliobackend-83lp.onrender.com';
        const loginUrl = `${backendUrl}/api/auth/login`;

        try {
          const response = await fetch(loginUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          if (response.ok) {
            const result = await response.json();

            // Backend returns { token: "..." }
            if (result.token) {
              // Decode JWT to get user info (basic decode, not verification)
              try {
                const tokenPayload = JSON.parse(
                  Buffer.from(result.token.split('.')[1], 'base64').toString()
                );
                
                // Backend token structure: { user: { id: "..." }, iat: ..., exp: ... }
                const userId = tokenPayload.user?.id || tokenPayload.id || tokenPayload.userId || credentials.email;
                
                return {
                  id: userId,
                  email: credentials.email,
                  name: credentials.email.split('@')[0],
                  role: "admin", // All authenticated users are admins for now
                  token: result.token, // Store token for API calls
                };
              } catch {
                // Fallback if token decode fails
                return {
                  id: credentials.email,
                  email: credentials.email,
                  name: credentials.email.split('@')[0],
                  role: "admin",
                  token: result.token,
                };
              }
            }
          }
        } catch {
          // Authentication failed
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.accessToken = user.token; // Store backend JWT token
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
        session.accessToken = token.accessToken; // Make token available in session
      }
      return session;
    },
  },
  pages: {
    signIn: "/login", // Use custom login page
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
