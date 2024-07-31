import type { Metadata } from "next";
import { Montserrat, Poppins } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/lib/auth";
import { Footer } from "@/components/Footer/Footer";
import { ModalProvider } from "@/contexts/modalContext";

const montserrat = Montserrat({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-montserrat',
});

const poppins = Poppins({ 
  subsets: ["latin"],
  display: 'swap',
  weight: ['600'],
  variable: '--font-poppins'
});

export const metadata: Metadata = {
  title: "Coopers To-Do List",
  description: "Organize your tasks efficiently with Coopers To-Do List. Simplify your daily routine and boost your productivity.",
  keywords: "Coopers, To-Do List, Task Management, Productivity, Organize Tasks, Task Planner",
  authors: { name: "Lucas Maieski", url: "https://portfolio-lucasgmaieski.vercel.app/" },
  openGraph: {
      title: 'Coopers To-Do List',
      description: 'Organize your tasks efficiently with Coopers To-Do List. Simplify your daily routine and boost your productivity.',
      url: '',
      siteName: 'Coopers To-Do List',
      images: [
        {
          url: '/logo.png',
          width: 434,
          height: 100,
        },
        {
          url: '/logo.png',
          width: 217,
          height: 100,
          alt: 'Logo Coopers',
        },
      ],
      type: 'website',
  },
  robots: {
    follow: true,
    index: true,
  },
  icons: {
      icon: '/favicon.ICO',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en" className={`${montserrat.variable} ${poppins.variable} font-montserrat`}>
      <body>
        <SessionProvider session={session}>
          <ModalProvider>
            {children}
            <Footer />
          </ModalProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
