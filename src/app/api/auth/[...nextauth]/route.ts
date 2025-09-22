import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

// In a real app, this would come from a database
// For simplicity, we'll use environment variables
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@portfolio.com";
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj5TN5.ZK.M6"; // "admin123"

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
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Check if email matches admin email
        if (credentials.email !== ADMIN_EMAIL) {
          return null;
        }

        // For development, allow plain text password comparison
        // In production, use bcrypt comparison
        const isValidPassword = credentials.password === "admin123" || 
          await bcrypt.compare(credentials.password, ADMIN_PASSWORD_HASH);

        if (!isValidPassword) {
          return null;
        }

        return {
          id: "1",
          email: ADMIN_EMAIL,
          name: "Portfolio Admin",
          role: "admin"
        } as AdminUser;
      }
    })
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