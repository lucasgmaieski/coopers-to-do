"use client"
import React, { createContext, useState, ReactNode } from 'react';

type ModalContextType = {
    modalIsOpen: boolean,
    setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    isLoading: boolean,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    formActive: 'SignIn' | 'SignUp',
    setFormActive: React.Dispatch<React.SetStateAction<'SignIn' | 'SignUp'>>
};

const defaultContextValue: ModalContextType = {
    modalIsOpen: false,
    setModalIsOpen: () => {},
    isLoading: false,
    setIsLoading: () => {},
    formActive: 'SignIn',
    setFormActive: () => {}
};

export const ModalContext = createContext<ModalContextType>(defaultContextValue);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formActive, setFormActive] = useState<'SignIn' | 'SignUp'>('SignIn');

  return (
    <ModalContext.Provider value={{ modalIsOpen, setModalIsOpen, isLoading, setIsLoading, formActive, setFormActive }}>
      {children}
    </ModalContext.Provider>
  );
};
