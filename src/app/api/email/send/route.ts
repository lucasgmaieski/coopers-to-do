import EmailTemplate from "@/components/Form/EmailTemplate";
import { contactSchema } from "@/lib/schema";
import { NextResponse } from "next/server";
import { Resend } from 'resend';

export async function POST(req: Request) {
    try {
        const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

        const { formData } = await req.json();
        const { name, email, phone, message } = formData;
        const parse = contactSchema.safeParse({ name, email, phone, message });

        if (!parse.success) {
            return NextResponse.json({ ok: false, message: 'Preencha todos os campos corretamente e tente novamente!', status: 400 });
        }

        const data = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: ['lucasgrigol@gmail.com'],
            subject: 'Contact - Coopers',
            react: EmailTemplate({ name, email, phone, message }),
        });
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({error});
    }
}