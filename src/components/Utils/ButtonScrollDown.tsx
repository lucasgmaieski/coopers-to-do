"use client"
import Image from "next/image";
import { Link } from "react-scroll";

export function ButtonScrollDown() {
    return (
        <Link to="todo" smooth={true} duration={1000} offset={70} className="absolute bottom-10 left-1/2 xl:bottom-28 -translate-x-1/2 hidden md:block text-white text-xl xsm:text-2xl font-semibold cursor-pointer transition-colors">
            <Image
                className="relative w-6 animate-bounce"
                src="/icon-scroll.png"
                alt="Image Hero"
                width={25}
                height={42}
            />
        </Link>
    )
}