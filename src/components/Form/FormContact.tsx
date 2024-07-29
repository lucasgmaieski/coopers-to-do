"use client"

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { contactSchema } from "@/lib/schema";
import { FieldError } from "./FieldError"; 
import { FormMessage } from "./FormMessage";
import Image from "next/image";

type FormProps = z.infer<typeof contactSchema>;

export default function FormContact() {
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [isPending, startTransition] = useTransition();

    const { handleSubmit, register, formState: { errors }, reset } = useForm<FormProps>({
        mode: 'all',
        reValidateMode: 'onBlur',
        resolver: zodResolver(contactSchema)
    });

    const handleForm = async (formData : FormProps) => {
        startTransition(async () => {

            const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/email/send`, {
                method: 'POST',
                body: JSON.stringify({formData}),
                headers: {
                    'Content-Type': 'application/json',
                },
                cache: 'no-store'
            });
            if(!response.ok) {
                setMessage("Falha ao enviar sua mensagem, tente novamente!");
                setSuccess(false);
                throw new Error('Failed to fetch data');
            } else if(response.ok) {
                setMessage("Mensagem enviada com sucesso. Retornaremos o mais breve possível, Obrigado!");
                setSuccess(true);
                reset()
            }
        });
    }

    const handleInputChange = () => {
        setMessage('');
    };

    return (
        <div className="shadow-xl mt-40 mb-10 sm:mb-20 rounded max-w-[700px] w-[95%] md:w-full">
            <div className="px-10 sm:px-16 -mt-20">
                <div className="relative w-fit mx-auto before:content-[''] before:absolute before:w-full before:h-6 before:bg-themecolorprimary before:-left-1/2 before:top-1/2 before:-translate-y-1/2">
                    <Image
                        className="relative"
                        src="/person.png"
                        alt="Icon mail"
                        width={190}
                        height={190}
                    />
                </div>
                <div className="flex gap-6">
                    <Image
                        className="relative"
                        src="/icon-mail.png"
                        alt="Icon mail"
                        width={60}
                        height={60}
                    />
                    <h2 className="text-2xl ">Get in <br /> <span className="font-bold">Touch</span></h2>
                </div>
            </div>
            <form onSubmit={handleSubmit(handleForm)} className='bg-white p-10 sm:p-16'>
                <label className='flex gap-[2px] flex-col pb-5 w-full text-base font-normal'>
                    Your name
                    <input type="text" id="name" placeholder="Type your name here..." {...register('name')} onChange={handleInputChange} className='border border-[#06152B] rounded px-4 py-3 placeholder:text-slate-500' readOnly={isPending}/>
                    {errors.name && (
                        <FieldError color='#fff' message={errors.name?.message} />
                    )}
                </label>
                <div className="flex gap-0 sm:gap-[20px] flex-col sm:flex-row">
                    <label className='flex gap-[2px] flex-col pb-5 w-full text-base font-normal'>
                        E-mail*
                        <input type="email" id="email" placeholder="example@example.com" {...register('email')} onChange={handleInputChange} className='border border-[#06152B] rounded px-4 py-3 placeholder:text-slate-500' readOnly={isPending}/>
                        {errors.email && (
                            <FieldError color='#fff' message={errors.email?.message} />
                        )}
                    </label>
                    <label className='flex gap-[2px] flex-col pb-5 w-full text-base font-normal'>
                        Telephone*
                        <input type="text" id="phone" placeholder="(  ) ____-____" {...register('phone')} onChange={handleInputChange} className='border border-[#06152B] rounded px-4 py-3 placeholder:text-slate-500' readOnly={isPending}/>
                        {errors.phone && (
                            <FieldError color='#fff' message={errors.phone?.message} />
                        )}
                    </label>
                </div>
                <label className='flex gap-[2px] flex-col pb-5 w-full text-base font-normal'>
                    Message*
                    <textarea id="message" placeholder="Type what your want to say to us" {...register('message')} onChange={handleInputChange} className='border border-[#06152B] rounded px-4 py-3 placeholder:text-slate-500' readOnly={isPending}/>
                    {errors.message && (
                        <FieldError color='#fff' message={errors.message?.message} />
                    )}
                </label>
                <button type="submit" className='relative bg-themecolorprimary text-white py-4 px-4 mt-10 rounded w-full block mx-auto uppercase text-base  font-bold disabled:opacity-60 hover:bg-green-600 transition-colors' disabled={isPending}>
                    {isPending ?
                        <>
                            Sending...
                            <svg aria-hidden="true" className="w-7 h-7 mx-auto text-gray-200 animate-spin dark:text-gray-100 fill-slate-600 inline ml-4 sm:w-9 sm:h-9" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill=""/></svg>
                        </>
                    :
                        <>
                            Send now
                        </>
                    }
                </button>
                <FormMessage success message={message}/>
            </form>
        </div>
    );
}
