"use client"

import Image from "next/image";
import { useContext } from "react";
import Modal from "../Modal/Modal";
import FormSignIn from "../Form/FormSignIn";
import { Session } from "@auth/core/types";
import FormSignUp from "../Form/FormSignUp";
import { signOut } from "next-auth/react";
import { FormHeader } from "../Form/FormHeader";
import { AuthButton } from "../Utils/AuthButton";
import { ModalContext } from "@/contexts/modalContext";

type Props = {
    session: Session | null
}

export function Header({session}: Props) {
    const { modalIsOpen, setModalIsOpen, formActive} = useContext(ModalContext);

    return (
        <header className="absolute top-8 sm:top-14 z-30 container w-full max-w-7xl flex items-center justify-between gap-3">
            <Image
                className="relative w-44 sm:w-auto"
                src="/logo.png"
                alt="Next.js Logo"
                width={217}
                height={50}
                priority
            />
            {session ? 
                <AuthButton onClick={signOut}>Sign Out</AuthButton>
            :
                <AuthButton onClick={() => setModalIsOpen(true)}>Sign in</AuthButton>
            }

            {modalIsOpen &&
                <Modal maxWidth="custom">
                    <div className="py-5 md:py-12">
                        <FormHeader title={formActive === 'SignIn' ? 'Sign in' : 'Sign up'} />
                        {formActive === "SignIn" ?
                            <FormSignIn />
                        :
                            <FormSignUp />
                        }
                    </div>
                </Modal>
            }
        </header>
    );
}