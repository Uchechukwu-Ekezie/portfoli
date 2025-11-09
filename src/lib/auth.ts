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

        // TEMPORARY: Hardcoded admin accounts for testing
        if (credentials.email === "admin@portfolio.com" && credentials.password === "admin123") {
          return {
            id: "1",
            email: "admin@portfolio.com",
            name: "Admin",
            role: "admin",
          };
        }
        
        // Your actual admin account as fallback
        if (credentials.email === "Oshiomah.oyageshio@gmail.com" && credentials.password === "strongpassword123") {
          return {
            id: "2",
            email: "Oshiomah.oyageshio@gmail.com",
            name: "Oshiomah Oyageshio",
            role: "admin",
          };
        }

        // Try the backend endpoint
        const backendUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/authRoutes/login`;

        try {
          console.log("Trying backend authentication:", backendUrl);

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

          console.log(`Backend response status: ${response.status}`);

          if (response.ok) {
            const result = await response.json();
            console.log("Backend authentication successful:", result);

            // Extract user info from backend response
            let user = null;

            if (result.user) {
              user = result.user;
            } else if (result.data?.user) {
              user = result.data.user;
            } else if (result.email) {
              user = {
                email: result.email,
                name: result.name,
                role: result.role,
              };
            } else if (result.token) {
              user = {
                email: credentials.email,
                name: credentials.email.split('@')[0],
                role: "admin"
              };
            }

            if (user) {
              console.log("User authenticated from backend:", user);
              return {
                id: user.id || user._id || user.email,
                email: user.email || credentials.email,
                name: user.name || "Admin",
                role: user.role || "admin",
              };
            }
          } else {
            const errorText = await response.text();
            console.log(`Backend authentication failed (${response.status}):`, errorText);
          }
        } catch (error) {
          console.log("Backend authentication error:", error);
        }

        // All authentication methods failed
        console.log("All authentication methods failed");
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
