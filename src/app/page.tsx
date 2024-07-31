import FormContact from "@/components/Form/FormContact";
import { Header } from "@/components/Header/Header";
import { PostsSection } from "@/components/Posts/PostsSection";
import { TaskList } from "@/components/Tasks/TaskList";
import { TaskListStatic } from "@/components/Tasks/TaskListStatic";
import { Button } from "@/components/Utils/Button";
import { ButtonScrollDown } from "@/components/Utils/ButtonScrollDown";
import { auth } from "@/lib/auth";
import Image from "next/image";

export default async function Home() {
    const session = await auth()

    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
            <Header session={session}/>

            <section className="relative bg-none sm:bg-[url('/bg-hero.png')] bg-no-repeat bg-contain md:bg-[length:55%_auto] xl:bg-contain bg-right mt-28 sm:mt-36 py-10 md:py-0 md:min-h-[650px] lg:min-h-[90vh] xl:min-h-[110vh] w-full flex items-center justify-center md:mt-10 xl:mt-0">

                <div className="w-full max-w-7xl flex justify-between gap-5 container flex-col sm:flex-row">
                    <div className="space-y-6 md:space-y-11 text-center sm:text-start">
                        <h1 className="text-6xl xsm:text-7xl  leading-[45px] xsm:leading-[55px] sm:leading-[55px] md:text-[80px] md:leading-[64px] font-bold">
                            Organize <br />
                            <span className="text-4xl xsm:text-5xl md:text-[60px] md:leading-[60px] text-themecolorprimary font-normal ">your daily jobs</span>
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
                    <ButtonScrollDown />

                </div>
            </section>

            <section id="todo" className="w-full mb-20 md:-mt-10">
                <div className="bg-[url('/bg-todo.png')] bg-no-repeat bg-center bg-cover lg:bg-[length:100%_100%] w-full py-28 mb-10 sm:mb-20">
                    <div className="max-w-[600px] mx-auto text-center text-white space-y-10 px-3 sm:px-0">
                        <h2 className="relative w-fit mx-auto text-3xl sm:text-4xl md:text-[60px] md:leading-[60px] font-semibold font-poppins before:content-[''] before:absolute before:w-full before:h-1 before:bg-themecolorprimary before:-bottom-1 before:left-0">To-do List</h2>
                        <p className="text-xl sm:text-2xl font-medium">Drag and drop to set your main priorities, check when done and create what's new.</p>
                    </div>
                </div>

                <div className="relative lg:bg-[url('/grafismos-lateral-esquerda.png')] bg-no-repeat bg-left-top bg-[length:auto_200px] xl:bg-[length:auto_570px]">
                    {session ?
                        <TaskList session={session}/>
                    :
                        <TaskListStatic />
                    }
                </div>
            </section>

            <PostsSection />

            <FormContact />
            
        </main>
    );
}
