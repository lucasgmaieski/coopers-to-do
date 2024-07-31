"use client"
import { ModalContext } from "@/contexts/modalContext";
import { MouseEvent, ReactNode, useCallback, useContext, useEffect, useRef } from "react";

type ModalProps = {
    children: ReactNode;
    maxWidth: 'SM' | 'MD' | 'LG' | 'XL' | '2XL' | '3XL' | '4XL' | '5XL' | 'custom';
}

export default function Modal({ children, maxWidth }: ModalProps) {
    const overlay = useRef<HTMLDivElement>(null);
    const wrapper = useRef<HTMLDivElement>(null);

    const { modalIsOpen, setModalIsOpen, isLoading} = useContext(ModalContext);

    const onClick = useCallback((e: MouseEvent<HTMLDivElement>) => {
        if((e.target === overlay.current || e.target === wrapper.current) && !isLoading) {
            setModalIsOpen(false);
        }
    }, [overlay, wrapper]);

    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
          if (e.key === "Escape" && !isLoading) {
            setModalIsOpen(false);
          }
    }, [setModalIsOpen]);

    useEffect(() => {
        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [onKeyDown]);

    useEffect(() => {
        if (!modalIsOpen) {
          setTimeout(() => {
            setModalIsOpen(true);
          }, 300);
        }
    }, [modalIsOpen, setModalIsOpen]);
    function maxWidthModal() {
        switch (maxWidth) {
            case 'SM':
                return 'max-w-sm'
            case 'MD':
                return 'max-w-md'
            case 'LG':
                return 'max-w-lg'
            case 'XL':
                return 'max-w-xl'
            case '2XL':
                return 'max-w-2xl'
            case '3XL':
                return 'max-w-3xl'
            case '3XL':
                return 'max-w-4xl'
            case '4XL':
                return 'max-w-5xl'
            case '5XL':
                return 'max-w-6xl'
            default:
                return 'max-w-[930px]'
                break;
        }
    }
    return (
        <div 
            ref={overlay} 
            className="fixed z-30 left-0 right-0 top-0 bottom-0 mx-auto bg-black/40"
            onClick={onClick}
        > 
            <div ref={wrapper} className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[97vh] w-[95%] lg:w-full ${maxWidthModal()} bg-white overflow-y-auto`}>
                <button className="absolute top-3 sm:top-5 right-3 sm:right-5 font-bold" onClick={() => setModalIsOpen(false)} disabled={isLoading}>
                    close
                </button>
                {children}
            </div>
        </div>
    )
}