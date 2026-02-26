import Image from "next/image";

export default function Header() {
    const total = 100;
    const curr = 50;
    return (
        <header className="sticky top-0 z-50">
            <div className="bg-[#F5F5F5] h-17.5 flex items-center justify-between px-5">
                <Image
                    src="/neu.png"
                    alt="NEU Logo"
                    width={100}
                    height={100}
                    className="w-auto h-full object-contain"
                />
                <Image
                    src="/hat.png"
                    alt="HAT Logo"
                    width={100}
                    height={100}
                    className="w-auto h-7/12 object-contain"
                />
            </div>

            <div className="w-full h-2 bg-[#E0E0E0]">
                <div
                    className="bg-[#4A90E2] h-full transition-all duration-200"
                    style={{ width: `${100 * curr / total}%` }}
                />
            </div>
        </header>
    );
}