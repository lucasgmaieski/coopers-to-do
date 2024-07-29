import FormContact from "@/components/Form/FormContact";
import { Header } from "@/components/Header/Header";
import { Button } from "@/components/Utils/Button";
import { auth } from "@/lib/auth";
import Image from "next/image";

export default async function Home() {
    const session = await auth()

    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
            <Header session={session}/>

            <section className="bg-none sm:bg-[url('/bg-hero.png')] bg-no-repeat bg-contain md:bg-[length:55%_auto] xl:bg-contain bg-right mt-28 sm:mt-36 py-10 md:py-0 md:min-h-[650px] lg:min-h-[90vh] xl:min-h-[110vh] w-full flex items-center justify-center md:mt-10 xl:mt-0">

                <div className="w-full max-w-7xl flex justify-between gap-5 container flex-col sm:flex-row">
                    <div className="space-y-6 md:space-y-11 text-center">
                        <h1 className="text-6xl xsm:text-7xl  leading-[45px] xsm:leading-[55px] sm:leading-[55px] md:text-[80px] md:leading-[64px] font-bold">
                            Organize <br />
                            <span className="text-4xl xsm:text-5xl md:text-[50px] md:leading-[60px] text-themecolorprimary font-normal ">your daily jobs</span>
                        </h1>

                        <p className="text-xl md:text-2xl font-semibold pb-11">The only way to get things done</p>

                        <Button />
                    </div>

                    <div className="w-1/3 md:w-auto hidden sm:flex md:block items-center">
                        <Image
                            className="relative w-96 xl:w-[450px]"
                            src="/image-hero.jpg"
                            alt="Image Hero"
                            width={450}
                            height={485}
                            priority
                        />
                    </div>
                </div>
            </section>

            <FormContact />
            
        </main>
    );
}
