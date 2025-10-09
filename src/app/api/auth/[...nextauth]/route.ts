import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

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
          return null;
        }

        try {
          // Send login request to backend
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          );

          if (!response.ok) {
            console.error(
              "Backend auth failed:",
              response.status,
              response.statusText
            );
            return null;
          }

          const authResult = await response.json();

          // Check if login was successful
          if (authResult.success && authResult.user) {
            return {
              id: authResult.user.id || "1",
              email: authResult.user.email,
              name: authResult.user.name || "Portfolio Admin",
              role: authResult.user.role || "admin",
            } as AdminUser;
          }

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
});

export { handler as GET, handler as POST };
