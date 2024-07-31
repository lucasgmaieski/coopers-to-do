import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import authConfig from "@/auth.config"

import prisma from "@/lib/prisma";
import { JWT } from "next-auth/jwt";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
    secret: process.env.AUTH_SECRET,
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: 'jwt',
    },
    ...authConfig,
    callbacks: {
        async jwt({ token, user}: { token: JWT, user?: any }) {
            if(user) {
                token.user = user;
            }
            return token;
        },
        async session({ session, token}) {
            session.user.id = token.user.id as string
            
            return session
        },
    }
})