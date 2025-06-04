import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      currentDay?: number;
      targetRevenue?: number;
      currentRevenue?: number;
    };
  }

  interface User {
    id: string;
    currentDay?: number;
    targetRevenue?: number;
    currentRevenue?: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    currentDay?: number;
    targetRevenue?: number;
    currentRevenue?: number;
  }
}
