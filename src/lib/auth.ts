import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import authConfig from "@/auth.config"

import prisma from "@/lib/prisma";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
    secret: process.env.AUTH_SECRET,
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: 'jwt',
    },
    pages: {
        // signIn: "/login",
        error: "/login",
    },
    ...authConfig,
    callbacks: {
        async jwt({ token, user}) {
            if(user) {
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token}) {
            if(session.user) session.user.role = token.role ;
            return session;
        },
    }
})