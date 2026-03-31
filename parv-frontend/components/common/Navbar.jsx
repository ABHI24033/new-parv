'use client'

import { useUserState } from "@/app/dashboard/store";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu, ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";

const NavLinks = [
    { name: "Home", url: "/" },
    { name: "About", url: "/about" },
    {
        name: "Services",
        url: "/services",
        subLinks: [
            { name: "Home Loan", url: "/services/home-loan" },
            { name: "Business Loan", url: "/services/business-loan" },
            { name: "Gold Loan", url: "/services/gold-loan" },
            { name: "Personal Loan", url: "/services/personal-loan" },
            { name: "Vehicle Loan", url: "/services/vehicle-loan" },
            { name: "Group Loan", url: "/services/group-loan" },
        ]
    },
    { name: "EMI Calculator", url: "/calculator" },
    { name: "DSA", url: "/dsa" },
    { name: "Contact", url: "/loan-enquiry" },
];

const MobileNavbar = ({ openNav, toggleNav, paths }) => {
    const [openServices, setOpenServices] = useState(false);

    return (
        <Sheet open={openNav} onOpenChange={toggleNav}>
            <SheetContent className="w-[300px] bg-white border-l border-slate-200 p-0">
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <SheetHeader className="px-6 py-4 border-b border-slate-100">
                    <Link href="/" className="flex items-center" onClick={() => toggleNav(false)}>
                        <img src="/logo/logo1.png" className="h-8 w-auto object-contain" alt="Parv Financial" />
                    </Link>
                </SheetHeader>
                <SheetDescription className="sr-only">Navigation menu</SheetDescription>
                <nav className="flex flex-col p-4">
                    {NavLinks.map((item, index) => {
                        const pathname = item?.url?.split("/")[1];
                        const isActive = paths.includes(pathname);

                        if (item.subLinks) {
                            return (
                                <div key={index} className="mb-1">
                                    <button
                                        className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                                        onClick={() => setOpenServices(!openServices)}
                                    >
                                        <span>{item.name}</span>
                                        <ChevronDown 
                                            className={`h-4 w-4 text-slate-400 transition-transform ${openServices ? 'rotate-180' : ''}`} 
                                        />
                                    </button>
                                    {openServices && (
                                        <div className="ml-3 mt-1 border-l-2 border-slate-100 pl-3 space-y-1">
                                            {item.subLinks.map((sub, subIndex) => (
                                                <Link
                                                    key={subIndex}
                                                    href={sub.url}
                                                    className="block rounded-lg px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-blue-50 hover:text-blue-600"
                                                    onClick={() => toggleNav(false)}
                                                >
                                                    {sub.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        }

                        return (
                            <Link
                                key={index}
                                href={item.url}
                                onClick={() => toggleNav(false)}
                                className={`rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                                    isActive 
                                        ? "bg-blue-50 text-blue-600" 
                                        : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                                }`}
                            >
                                {item.name}
                            </Link>
                        );
                    })}
                    
                    <div className="mt-4 pt-4 border-t border-slate-100">
                        <Link href="/loan-enquiry" onClick={() => toggleNav(false)}>
                            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium">
                                Apply Now
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                </nav>
            </SheetContent>
        </Sheet>
    );
}

const NavbarNew = () => {
    const [openNav, setOpenNav] = useState(false);
    const toggleNav = () => setOpenNav(!openNav);
    const [navSolid, setNavSolid] = useState(false);

    const pathName = usePathname();
    const paths = pathName.split("/");

    useUserState();

    useEffect(() => {
        const handleScroll = () => {
            setNavSolid(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <header
                className={`sticky top-0 z-50 transition-all duration-300 ${
                    navSolid
                        ? "bg-white/95 shadow-lg shadow-slate-200/50 backdrop-blur-md border-b border-slate-200/60"
                        : "bg-white border-b border-slate-100"
                }`}
            >
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
                    {/* Logo */}
                    <Link href="/" className="flex items-center py-1">
                        <img
                            src="/logo/logo1.png"
                            className="h-9 w-auto object-contain transition-transform hover:scale-[1.02]"
                            alt="Parv Financial Services"
                        />
                    </Link>

                    {/* Desktop Navigation - Center */}
                    <nav className="hidden lg:flex items-center gap-1">
                        {NavLinks.map((item, index) => {
                            const pathname = item?.url?.split("/")[1];
                            const isActive = paths.includes(pathname);

                            if (item?.subLinks) {
                                return (
                                    <div key={index} className="relative">
                                        <HoverCard openDelay={100} closeDelay={150}>
                                            <HoverCardTrigger asChild>
                                                <button
                                                    className={`group flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                                                        isActive 
                                                            ? "text-blue-600" 
                                                            : "text-slate-600 hover:text-slate-900"
                                                    }`}
                                                >
                                                    <span>{item.name}</span>
                                                    <ChevronDown className="h-4 w-4 text-slate-400 transition-transform duration-200 group-hover:rotate-180" />
                                                </button>
                                            </HoverCardTrigger>
                                            <HoverCardContent
                                                className="w-56 rounded-xl border border-slate-200/80 bg-white p-2 shadow-xl shadow-slate-900/10"
                                                side="bottom"
                                                align="start"
                                                sideOffset={8}
                                            >
                                                <div className="flex flex-col gap-0.5">
                                                    {item.subLinks.map((sub, subIndex) => (
                                                        <Link
                                                            key={subIndex}
                                                            href={sub.url}
                                                            className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-blue-50 hover:text-blue-600"
                                                        >
                                                            {sub.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </HoverCardContent>
                                        </HoverCard>
                                    </div>
                                );
                            }

                            return (
                                <Link
                                    key={index}
                                    href={item.url}
                                    className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                                        isActive 
                                            ? "text-blue-600" 
                                            : "text-slate-600 hover:text-slate-900"
                                    }`}
                                >
                                    <span className="relative">
                                        {item.name}
                                        {isActive && (
                                            <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                                        )}
                                    </span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Right: CTA + Mobile Menu */}
                    <div className="flex items-center gap-3">
                        <Link
                            href="/loan-enquiry"
                            className="hidden md:inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-200 transition-all hover:shadow-lg hover:shadow-blue-300 hover:-translate-y-0.5 active:translate-y-0"
                        >
                            Apply Now
                            <ArrowRight className="h-4 w-4" />
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            type="button"
                            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
                            aria-controls="mobile-menu"
                            aria-expanded={openNav}
                            onClick={toggleNav}
                        >
                            <span className="sr-only">Open main menu</span>
                            <Menu className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Spacer removed - sticky header flows naturally */}

            <MobileNavbar openNav={openNav} toggleNav={toggleNav} paths={paths} />
        </>
    );
};

export default NavbarNew;
