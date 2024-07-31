"use client"
import { Link } from "react-scroll";

export function Button() {
  return (
    <Link to="todo" smooth={true} duration={1000} offset={70} className="bg-themecolorprimary text-white text-xl xsm:text-2xl font-semibold px-8 xsm:px-14 py-[18px] rounded-[10px] cursor-pointer hover:bg-green-600 transition-colors">Go to To-do list</Link>
  )
}