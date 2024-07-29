"use client"

import Image from "next/image";
import { useState } from "react";
import Modal from "../Modal/Modal";
import FormSignIn from "../Form/FormSignIn";
import { Session } from "@auth/core/types";
import FormSignUp from "../Form/FormSignUp";
import { signOut, useSession } from "next-auth/react";
import { FormHeader } from "../Form/FormHeader";
import { AuthButton } from "../Utils/AuthButton";

type Props = {
    session: Session | null
}

export function Header({session}: Props) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formActive, setFormActive] = useState<'SignIn' | 'SignUp'>('SignIn');

    const openModal = () => {
        setModalIsOpen(true);
      };
    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <header className="absolute top-8 sm:top-14 z-10 container w-full max-w-7xl flex items-center justify-between gap-3">
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
                <AuthButton onClick={openModal}>Sign in</AuthButton>
            }

            {modalIsOpen &&
                <Modal onClose={closeModal} loading={isLoading} maxWidth="custom">
                    <div className="py-5 md:py-12">
                        <FormHeader title={formActive === 'SignIn' ? 'Sign in' : 'Sign up'} />
                        {formActive === "SignIn" ?
                            <FormSignIn setFormActive={setFormActive} setIsLoading={setIsLoading} onClose={closeModal}/>
                        :
                            <FormSignUp setFormActive={setFormActive} setIsLoading={setIsLoading} onClose={closeModal}/>
                        }
                    </div>
                </Modal>
            }
        </header>
    );
}