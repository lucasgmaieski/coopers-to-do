import Image from "next/image";
import Link from "next/link";
interface CardProps {
    category: string;
    title: string;
    image: string;
}
export function PostCard({category, title, image}:CardProps){
    return(
        <div className="bg-white flex flex-col rounded-2xl shadow-xl mx-3 h-full overflow-hidden">
            <div className="relative after:content-iconCoopers after:absolute after:right-20 after:bottom-6 after:block after:ml-0.5 after:w-1 after:h-1">
                <Image
                    className="relative w-full rounded-tl-2xl"
                    src={image}
                    alt="alt"
                    width={360}
                    height={200}
                />
            </div>
            <div className="flex flex-col flex-1 gap-4 py-6 px-7">
                <span className="text-base border-2 rounded-2xl w-fit py-1 px-2">{category}</span>
                <h2 className="mb-11">{title}</h2>
                <Link href={'/#'} className="w-fit text-themecolorprimary text-base font-bold mt-auto hover:text-green-600 transition-colors">read more</Link>
            </div>
        </div>
    );
}