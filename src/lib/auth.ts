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
          console.log("Missing credentials");
          return null;
        }

        // Array of backend endpoints to try
        const backendEndpoints = [
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/authRoutes/login`,
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`,
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/login`,
        ];

        let authResult = null;
        let successfulEndpoint = null;

        // Try each endpoint until one works
        for (const backendUrl of backendEndpoints) {
          try {
            console.log("Trying endpoint:", backendUrl);

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

              // Check if we have a token (successful authentication)
              if (result.token) {
                authResult = result;
                successfulEndpoint = backendUrl;
                break; // Exit loop on success
              } else {
                console.log(
                  "No token in response, trying next endpoint:",
                  result
                );
              }
            } else {
              const errorText = await response.text();
              console.log(
                `Failed with status ${response.status}:`,
                errorText
              );
            }
          } catch (error) {
            console.log(`Error with endpoint ${backendUrl}:`, error);
            // Continue to next endpoint
          }
        }

        // If we found a successful authentication
        if (authResult && successfulEndpoint) {
          console.log("Successful authentication via:", successfulEndpoint);
          console.log("Auth result:", authResult);

          // Backend might return user data in different formats
          // Try to extract user info from various possible structures
          let user = null;

          if (authResult.user) {
            user = authResult.user;
          } else if (authResult.data?.user) {
            user = authResult.data.user;
          } else if (authResult.email) {
            // User data might be at root level
            user = {
              email: authResult.email,
              name: authResult.name,
              role: authResult.role,
            };
          }

          if (user) {
            console.log("User found:", user);
            return {
              id: user.id || user._id || user.email,
              email: user.email,
              name: user.name || user.email,
              role: user.role || "user",
            };
          }

          console.log("No user found in response");
          return null;
        }

        // All endpoints failed
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
