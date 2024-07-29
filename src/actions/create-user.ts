"use server";
import prisma from "@/lib/prisma";
import { signUpSchema } from "@/lib/schema";
import bcrypt from "bcryptjs";
import { z } from "zod";

type FormProps = z.infer<typeof signUpSchema>;

export async function CreateUser(formData: FormProps) {
    
    console.log('entra aqui 2222')

    const { name, email, password} = signUpSchema.parse(formData);
    const parse = signUpSchema.safeParse({
        name,
        email,
        password
    });
    if(!parse.success) {
        return { user: null, message: 'Invalid data for account creation', status: 400};
    }
    const user = parse.data
    console.log("user para ser criado:", user );

    try {
        const emailExists = await prisma.user.findUnique({
            where: { email: email }
        });
        if(emailExists) {
            return { user: null, message: "E-mail already registered!", status: 409};
        }

        const hashedPassword = await bcrypt.hash(password, 7);

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            }
        });
        console.log('Deu tudo certo criouo o usuario: ', JSON.stringify(newUser, null, 2))
        return { user: {email: user.email, password: user.password}, message: `Account created successfully`, status: 201};
    } catch (error) {
        return { user: null, message: `Failed to create account - ${error}`, status: 400};
    }
}