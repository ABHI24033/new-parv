'use client'

import { ArrowLeftCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Header({ title, subTitle, img }) {
    const router = useRouter();
    return (
        <header className="relative bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white overflow-hidden py-16 md:py-24">
            {/* Background decorative element */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="max-w-7xl container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-center gap-12">
                    <div className="flex-1 space-y-6 text-center md:text-start">
                        <div className="flex flex-col md:flex-row gap-4 items-center md:items-baseline justify-center md:justify-start">
                            <button 
                                onClick={() => router.back()}
                                className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all group backdrop-blur-sm shadow-lg border border-white/10"
                                aria-label="Go back"
                            >
                                <ArrowLeftCircleIcon className="w-6 h-6 text-blue-100 group-hover:text-white transition-colors" />
                            </button>
                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white drop-shadow-sm">
                                {title}
                            </h1>
                        </div>
                        <p className="text-lg md:text-xl text-blue-100/90 leading-relaxed max-w-3xl drop-shadow-sm">
                            {subTitle}
                        </p>
                    </div>
                    {img && (
                        <div className="hidden md:block flex-shrink-0 animate-in fade-in zoom-in duration-700">
                            <div className="relative group">
                                <div className="absolute inset-0 bg-blue-400/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
                                <img 
                                    src={img} 
                                    alt={title} 
                                    className="relative w-full max-w-[400px] h-auto object-contain rounded-3xl drop-shadow-2xl transform hover:scale-105 transition-transform duration-500" 
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
