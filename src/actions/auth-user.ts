"use server"

import { signIn } from "@/lib/auth";
import { signInSchema } from "@/lib/schema";
import { AuthError } from "next-auth";
import { z } from "zod";

export async function SignInAction(data: z.infer<typeof signInSchema>) {
    try {
        const result = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false,
        });
        console.log('result: ', result)
        if (!result) {
            return {
                success: false,
                error: "Invalid credentialsss",
            };
        }
      
        return { success: true , error: ''};
    } catch (error) {
        if (error instanceof AuthError) {
            return {
                success: false,
                error: "Invalid credentials",
            };
        }
    
        return {
            success: false,
            error: "Erro desconhecido",
        };
    }
}