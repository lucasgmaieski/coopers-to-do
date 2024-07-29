import { Header } from "@/components/Header/Header";
import { auth } from "@/lib/auth";

export default async function Home() {
    const session = await auth()

    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
            <Header session={session}/>

        </main>
    );
}
