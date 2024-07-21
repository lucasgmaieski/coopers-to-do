import type { NextAuthConfig } from "next-auth"
import credentials from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signInSchema } from "./lib/schema";


export default {
    providers: [
        credentials({
            credentials: {
                email: { label: "Email", type: "text", placeholder: "Digite seu email" },
                password: { label: "Password", type: "password" }
            },
            authorize: async (credentials)  => {
                const { data, success } = signInSchema.safeParse(credentials);
                if(!success) {
                    throw new Error("Credenciais inválidas");
                }

                const user = await prisma.user.findUnique({
                    where: { 
                        email: credentials.email as string
                    }
                });

                if(!user || !user.password) {
                    console.log("Credenciais inválidas")
                    return null;
                }
                
                const validPassword = await bcrypt.compare(
                    credentials.password as string,
                    user.password
                );
                if(!validPassword) {
                    return null;
                } 
                
                return {
                    id: `${user.id}`,
                    name: user.name,
                    email: user.email,
                }
            }
        })
    ],
} satisfies NextAuthConfig