import Link from "next/link";

export function Footer() {
    return (
        <footer className="relative w-full py-20 bg-[url('/bg-footer.png')] bg-cover text-white">
            <div className="max-w-lg space-y-[18px] mx-auto text-center">
                <h2 className="pb-[20px] text-2xl font-semibold">Need help?</h2>

                <Link href="mailto:coopers@coopers.pro" className="text-2xl font-semibold hover:text-gray-400 transition-colors">coopers@coopers.pro</Link>

                <h4 className="text-sm font-medium">&copy; {new Date().getFullYear()} Coopers. All rights reserved.</h4>
                
                <div className="absolute bottom-0 w-full h-5 sm:h-10 max-w-lg bg-themecolorprimary"></div>
            </div>
        </footer>
    );
}