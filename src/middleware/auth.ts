import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function getAuthenticatedUser(request: NextRequest) {
  try {
    const token = await getToken({ 
      req: request, 
      secret: process.env.NEXTAUTH_SECRET 
    });
    
    if (!token || !token.id) {
      return null;
    }
    
    return {
      id: token.id as string,
      email: token.email as string,
      name: token.name as string
    };
  } catch (error) {
    console.error("Auth error:", error);
    return null;
  }
}
