"use client"
import { MouseEvent, ReactNode, useCallback, useEffect, useRef, useState } from "react";

type ModalProps = {
    children: ReactNode;
    onClose: () => void;
    loading: boolean;
    maxWidth: 'SM' | 'MD' | 'LG' | 'XL' | '2XL' | '3XL' | '4XL' | '5XL' | 'custom';
}

export default function Modal({ children, onClose, loading, maxWidth }: ModalProps) {
    const overlay = useRef<HTMLDivElement>(null);
    const wrapper = useRef<HTMLDivElement>(null);
    const [isClosing, setIsClosing] = useState(false);

    const onClick = useCallback((e: MouseEvent<HTMLDivElement>) => {
        if((e.target === overlay.current || e.target === wrapper.current) && !loading) {
            setIsClosing(true);
        }
    }, [overlay, wrapper]);

    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
          if (e.key === "Escape" && !loading) {
            setIsClosing(true);
          }
    }, []);

    useEffect(() => {
        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [onKeyDown]);

    useEffect(() => {
        if (isClosing) {
          setTimeout(() => {
            if(onClose) onClose();
            setIsClosing(false);
          }, 300);
        }
      }, [isClosing, onClose]);
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
            className="fixed z-10 left-0 right-0 top-0 bottom-0 mx-auto bg-black/40"
            onClick={onClick}
        > 
            <div ref={wrapper} className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[97vh] w-[95%] lg:w-full ${maxWidthModal()} bg-white overflow-y-auto`}>
                <button className="absolute top-3 sm:top-5 right-3 sm:right-5 font-bold" onClick={() => setIsClosing(true)} disabled={loading}>
                    close
                </button>
                {children}
            </div>
        </div>
    )
}