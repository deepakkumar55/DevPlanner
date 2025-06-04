import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import User from "@/lib/Model/User.Model";

const authOptions: NextAuthOptions = {
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

        try {
          await connectDB();
          const user = await User.findOne({ email: credentials.email });

          if (!user) {
            return null;
          }

          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);

          if (!isPasswordValid) {
            return null;
          }

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            currentDay: user.currentDay,
            targetRevenue: user.targetRevenue,
            currentRevenue: user.currentRevenue
          };
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.currentDay = user.currentDay;
        token.targetRevenue = user.targetRevenue;
        token.currentRevenue = user.currentRevenue;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.currentDay = token.currentDay;
        session.user.targetRevenue = token.targetRevenue;
        session.user.currentRevenue = token.currentRevenue;
      }
      return session;
    }
  },
  pages: {
    signIn: "/auth/signin",
    signUp: "/auth/signup"
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
