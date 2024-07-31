"use client"

import { useContext, useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signInSchema } from "@/lib/schema";
import { SignInAction } from "@/actions/auth-user";
import { FieldError } from "./FieldError"; 
import { FormMessage } from "./FormMessage";
import { ModalContext } from "@/contexts/modalContext";

type Props = {
    setFormActive: (form: 'SignIn' | 'SignUp') => void
    onClose: () => void;
    setIsLoading: (loading: boolean) => void;
}
type FormProps = z.infer<typeof signInSchema>;

export default function FormSignIn() {
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [isPending, startTransition] = useTransition();

    const { setModalIsOpen,  setIsLoading, setFormActive } = useContext(ModalContext);

    const { handleSubmit, register, formState: { errors } } = useForm<FormProps>({
        mode: 'all',
        reValidateMode: 'onBlur',
        resolver: zodResolver(signInSchema)
    });

    const handleForm = async (data: FormProps) => {
        startTransition(async () => {
            const response = await SignInAction(data);
            if (response.success) {
                setMessage("Authentication Successful");
                setSuccess(true);
                setTimeout(() => {
                    // onClose();
                    setModalIsOpen(true)
                    window.location.reload()
                }, 500);
            } else {
                setMessage(response.error);
            }
        });
    }

    const handleInputChange = () => {
        setMessage('');
    };

    useEffect(() => {
        setIsLoading(isPending);
    }, [isPending])

    return (
        <form onSubmit={handleSubmit(handleForm)} className='bg-white px-4 sm:px-8 md:p-2 w-full md:w-2/5 mx-auto'>
            <label className='flex gap-[2px] flex-col pb-3 sm:pb-5 w-full text-xl sm:text-2xl font-semibold'>
                User:
                <input type="email" {...register('email')} onChange={handleInputChange} className='h-10 sm:h-14 font-normal px-2 rounded-[10px] border border-black text-black' readOnly={isPending}/>
                {errors.email && (
                    <FieldError message={errors.email?.message} />
                )}
            </label>
            <label className='flex gap-[2px] flex-col pb-3 sm:pb-5 w-full text-xl sm:text-2xl font-semibold'>
                Password:
                <input type="password" {...register('password')} onChange={handleInputChange} className='h-10 sm:h-14 font-normal px-2 rounded-[10px] border border-black text-black' readOnly={isPending}/>
                {errors.password && (
                    <FieldError message={errors.password?.message} />
                )}
            </label>
    
            <button type="submit" className='relative bg-themecolorprimary text-white py-2 px-3 mt-2 w-4/5 block mx-auto text-xl sm:text-2xl font-semibold sm:py-3 sm:px-6 disabled:opacity-60 hover:bg-green-600 transition-colors' disabled={isPending}>
                {isPending ? 
                    <> 
                        Signing...
                        <svg aria-hidden="true" className="w-7 h-7 mx-auto text-gray-200 animate-spin dark:text-gray-100 fill-slate-600 inline ml-4 sm:w-9 sm:h-9" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill=""/></svg>
                    </>
                :
                    <>
                        Sign in
                    </>
                }
            </button>

            <FormMessage success message={message}/>

            <p className="text-black mt-5 text-center">Don't have an account? <button className="underline" onClick={() => setFormActive('SignUp')}>Sign up</button></p>

        </form>
    );
}