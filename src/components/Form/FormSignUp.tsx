"use client"

import { useContext, useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signUpSchema } from "@/lib/schema";
import { CreateUser } from "@/actions/create-user";
import { FieldError } from "./FieldError"; 
import { FormMessage } from "./FormMessage";
import { ModalContext } from "@/contexts/modalContext";

type FormProps = z.infer<typeof signUpSchema>;

export default function FormSignUp() {
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [isPending, startTransition] = useTransition();

    const { setIsLoading, setFormActive } = useContext(ModalContext);

    const { handleSubmit, register, formState: { errors } } = useForm<FormProps>({
        mode: 'all',
        reValidateMode: 'onBlur',
        resolver: zodResolver(signUpSchema)
    });

    const handleForm = async (data: FormProps) => {
        startTransition(async () => {
            const response = await CreateUser(data);
            if (response.user) {
                setMessage("Account created successfully");
                setSuccess(true);
                setTimeout(() => {
                    setFormActive('SignIn')
                }, 1000);
            } else {
                setMessage(response.message);
            }
        });
    }

    const handleInputChange = () => {
        setMessage('');
    };

    useEffect(() => {
        setIsLoading(isPending);
    }, [isPending, setIsLoading])

    return (
        <form onSubmit={handleSubmit(handleForm)} className='bg-white px-6 sm:px-8 md:p-2 w-full md:w-2/5 mx-auto'>
            <label className={`flex gap-[2px] flex-col ${errors.name ? 'pb-1 sm:pb-3' : 'pb-3 sm:pb-5'} w-full text-xl sm:text-2xl font-semibold`}>
                Name:
                <input type="text" {...register('name')} onChange={handleInputChange} className='h-10 sm:h-[54px] font-normal px-2 rounded-[10px] border border-black text-black' readOnly={isPending}/>
                {errors.name && (
                    <FieldError message={errors.name?.message} />
                )}
            </label>
            <label className={`flex gap-[2px] flex-col ${errors.email ? 'pb-1 sm:pb-3' : 'pb-3 sm:pb-5'} w-full text-xl sm:text-2xl font-semibold`}>
                E-mail:
                <input type="email" {...register('email')} onChange={handleInputChange} className='h-10 sm:h-[54px] font-normal px-2 rounded-[10px] border border-black text-black' readOnly={isPending}/>
                {errors.email && (
                    <FieldError message={errors.email?.message} />
                )}
            </label>
            <label className={`flex gap-[2px] flex-col ${errors.password ? 'pb-1 sm:pb-3' : 'pb-3 sm:pb-5'} w-full text-xl sm:text-2xl font-semibold`}>
                Password:
                <input type="password" {...register('password')} onChange={handleInputChange} className='h-10 sm:h-[54px] font-normal px-2 rounded-[10px] border border-black text-black' readOnly={isPending}/>
                {errors.password && (
                    <FieldError message={errors.password?.message} />
                )}
            </label>
    
            <button type="submit" className='relative bg-themecolorprimary text-white py-2 px-3 mt-3 w-4/5 block mx-auto text-xl sm:text-2xl font-semibold sm:py-3 sm:px-6 disabled:opacity-60 hover:bg-green-600 transition-colors' disabled={isPending}>
                {isPending ? 
                    <> 
                        signing up...
                        <svg aria-hidden="true" className="w-7 h-7 mx-auto text-gray-200 animate-spin dark:text-gray-100 fill-slate-600 inline ml-4 sm:w-9 sm:h-9" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill=""/></svg>
                    </>
                :
                    <>
                        Sign in
                    </>
                }
            </button>

            <FormMessage success={success} message={message}/>

            <p className="text-black mt-5 text-center">Already have an account? <button className="underline" onClick={() => setFormActive('SignIn')}>Sign in</button></p>
        </form>
    );
}
