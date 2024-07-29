import Image from "next/image"

type Props = {
    title: string
}
export const FormHeader = ({title}: Props) => {
    return (
        <div className={`w-full flex items-center justify-end px-3 mx-auto `}>
            <Image
                className="relative mx-auto w-32 xsm:w-40 sm:w-56"
                src="/form-signin.png"
                alt="Next.js Logo"
                width={200}
                height={200}
            /> 
            <div className="w-[70%]">
                <h2 className="text-5xl sm:text-6xl md:text-[80px] md:leading-[90px] font-bold">{title}</h2>
                <h3 className="text-3xl sm:text-4xl md:text-[50px] md:leading-[60px] text-themecolorprimary font-normal">to access your list</h3>
            </div>
        </div>
    )
} 