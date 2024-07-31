"use client"

import Image from 'next/image';
import { ButtonEraseAll } from './ButtonEraseAll';
import { tasks } from '@/data/tasks';
import { ModalContext } from '@/contexts/modalContext';
import { useContext } from 'react';

export function TaskListStatic(){
    const { setModalIsOpen } = useContext(ModalContext);

    return (
        <div className="grid sm:grid-cols-2 gap-y-10 gap-x-5 md:gap-x-10 justify-center container max-w-4xl">
            <div className="relative shadow-[0_4px_60px_0_rgba(66,66,66,0.2)] before:content-[''] before:absolute before:w-full before:h-5 before:bg-themecolorsecondary before:top-0 before:left-0 px-8 pt-10 sm:pt-[60px] pb-10 text-center h-fit z-20">
                <h2 className="font-bold font-poppins text-[40px]">To-do</h2>
                <h3 className='text-2xl'>Take a breath <br /> Start doing</h3>
                <div className="mt-8">
                    {tasks.filter(todo => !todo.done).map((task, index) => (
                        <div key={index} className="flex gap-3 items-center justify-between py-2 group" >
                            <div className="size-6 border-2 border-themecolorsecondary rounded-full flex items-center justify-center cursor-pointer">
                                {index === 0 &&
                                    <Image
                                        className="relative size-3"
                                        src="/check.png"
                                        alt="Image Hero"
                                        width={12}
                                        height={12}
                                    />
                                }
                            </div>
                            <span className="text-base text-start flex-1 border-b border-b-transparent">{task.content}</span>
                            <button className="text-xs font-bold text-[#999999] opacity-0 group-hover:opacity-100 hover:text-red-900 transition-all" onClick={() => setModalIsOpen(true)}>Delete</button>
                        </div>
                    ))}
                    <form onSubmit={(e) => {e.preventDefault()}} className="flex items-center justify-between gap-3 group py-2">
                        <div className="size-6 min-w-6 border-2 border-themecolorsecondary rounded-full flex items-center justify-center"></div>
                        <input
                            type="text"
                            placeholder="Add new task..."
                            className="text-base text-start flex-1 border-b border-transparent placeholder:text-themecolorsecondary focus-within:outline-none focus-within:border-themecolorsecondary text-themecolorsecondary"
                            required
                        />
                        <button className="opacity-0 pointer-events-none group-focus-within:opacity-100 transition-opacity text-base text-white bg-themecolorsecondary px-2 py-1 rounded-md" >Add</button>
                    </form>
                </div>
                <ButtonEraseAll handleDeleteAll={() => setModalIsOpen(true)} disabled={false}/>
            </div>

            <div className="relative shadow-[0_4px_60px_0_rgba(66,66,66,0.2)] before:content-[''] before:absolute before:w-full before:h-5 before:bg-themecolorprimary before:top-0 before:left-0 px-8 pt-10 sm:pt-[60px] pb-10 text-center h-fit">
                <h2 className='font-bold font-poppins text-[40px]'>Done</h2>
                <h3 className='text-2xl'>
                    Congratulations!<br /> 
                    <span className='font-bold'>You have done 5 tasks</span>
                </h3>
                <ul className="space-y-3 mt-8">
                    {tasks.filter(todo => todo.done).map((task, index) => (
                        <li key={index} className="task-item flex gap-3 items-center justify-between group">
                            <Image
                                className="relative size-6"
                                src="/icon-check.png"
                                alt="Image Hero"
                                width={24}
                                height={24}
                            />
                            <span className="text-base text-start flex-1">{task.content}</span>
                            <button className="text-xs font-bold text-[#999999] opacity-0 group-hover:opacity-100 hover:text-red-900 transition-all" onClick={() => setModalIsOpen(true)}>Delete</button>
                        </li>
                    ))}
                </ul>
                <ButtonEraseAll handleDeleteAll={() => setModalIsOpen(true)} disabled={false}/>
            </div>
        </div>
    );
};

