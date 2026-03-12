'use client'
import { useUserState } from "@/app/dashboard/store";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { PhoneCall, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";
import { ChevronDown } from "lucide-react";
import { ChevronUp } from "lucide-react";


const NavLinks = [
    {
        name: "Home",
        url: "/"
    },
    {
        name: "About us",
        url: "/about"
    },
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
    {
        name: "EMI Calculator",
        url: "/calculator"
    },
    {
        name: "DSA",
        url: "/dsa"
    },
    {
        name: "Loan Enquiry",
        url: "/loan-enquiry"
    },
]

const Mobilenavbar = ({ openNav, toggleNav, paths }) => {
    const [openServices, setOpenServices] = useState(false);
    return (
        <div>
            <Sheet open={openNav} onOpenChange={toggleNav} >
                <SheetContent className="transition-all duration-500">
                    <SheetTitle></SheetTitle>
                    <SheetHeader>
                        <Link href="/" className="flex items-center space-x-1 rtl:space-x-reverse">
                            <img src={'/logo/logo1.png'} className="h-10 w-28 bg-transparent" alt="Logo" />
                        </Link>
                    </SheetHeader>
                    <SheetDescription className="transition-all duration-500">
                        <ul className="flex flex-col p-4 space-y-2 font-medium">
                            {NavLinks.map((item, index) => {
                                const pathname = item?.url?.split("/")[1];
                                const isActive = paths.includes(pathname);

                                if (item.subLinks) {
                                    return (
                                        <li key={index}>
                                            <button
                                                className="flex justify-between w-full px-3 py-2 text-left text-slate-800 font-medium"
                                                onClick={() => setOpenServices(!openServices)}
                                            >
                                                <span>{item.name}</span>
                                                {openServices ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                            </button>
                                            {openServices && (
                                                <ul className="pl-6 space-y-1">
                                                    {item.subLinks.map((sub, subIndex) => (
                                                        <li key={subIndex}>
                                                            <Link
                                                                href={sub.url}
                                                                className="block px-3 py-2 text-sm text-slate-700 hover:bg-blue-100 rounded"
                                                            >
                                                                {sub.name}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </li>
                                    );
                                }

                                return (
                                    <li key={index}>
                                        <Link
                                            href={item.url}
                                            className={`block px-3 py-2 rounded ${isActive ? "bg-blue-100 text-blue-700" : "text-slate-800"}`}
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </SheetDescription>
                </SheetContent>
            </Sheet>
        </div>
    )
}


const NavbarNew = () => {
  const [openNav, setOpenNav] = useState(false);
  const toggleNav = () => setOpenNav(!openNav);
  const [navColar, setNavColar] = useState(false);

  const pathName = usePathname();
  const paths = pathName.split("/");

  const userState = useUserState();

  // Scroll listener to change background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) setNavColar(true);
      else setNavColar(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`sticky top-0 z-30 transition-colors duration-300 border-b ${
          navColar
            ? "bg-gradient-to-l from-blue-100 to-teal-100 shadow-md border-gray-200 dark:bg-gray-900 dark:border-gray-600"
            : "bg-gradient-to-r from-blue-100 to-teal-100 border-gray-200 dark:bg-gray-900 dark:border-gray-600"
        }`}
      >
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-1 rtl:space-x-reverse">
            <img
              src="/logo/logo1.png"
              className="h-10 w-28 bg-transparent"
              alt="Logo"
            />
          </Link>

          {/* Right side (Apply Now + Hamburger) */}
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <Link href="/loan-enquiry" className="hidden md:block">
              <button
                type="button"
                className="text-white bg-teal-500 hover:bg-teal-600 dark:bg-blue-600 dark:hover:bg-blue-700 font-medium rounded-lg text-sm px-4 py-2 flex items-center gap-2 focus:outline-none"
              >
                Apply Now
              </button>
            </Link>

            {/* Hamburger Menu */}
            <button
              type="button"
              className="inline-flex lg:hidden items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded={openNav}
              onClick={toggleNav}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>

          {/* Menu Links */}
          <div
            className={`${
              openNav ? "block" : "hidden"
            } items-center justify-between w-full lg:flex md:w-auto md:order-1`}
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:space-x-4 md:flex-row md:mt-0 md:border-0">
              {NavLinks.map((item, index) => {
                const pathname = item?.url?.split("/")[1];
                return (
                  <li key={index} className="relative">
                    {item?.subLinks ? (
                      <HoverCard openDelay={100} closeDelay={100}>
                        <HoverCardTrigger asChild>
                          <div className="group cursor-pointer block py-2 px-1 text-slate-800 relative">
                            <span
                              className={`flex items-center gap-1 ${
                                paths.includes(pathname)
                                  ? "md:text-blue-700 border-b border-blue-700"
                                  : ""
                              }`}
                            >
                              {item.name}
                              <ChevronDown className="h-4 w-4 transform transition-transform duration-300 group-hover:rotate-180" />
                            </span>
                          </div>
                        </HoverCardTrigger>
                        <HoverCardContent
                          className="w-64 p-2 flex flex-col space-y-1 shadow-lg"
                          side="bottom"
                          align="start"
                        >
                          {item.subLinks.map((sub, subIndex) => (
                            <Link
                              key={subIndex}
                              href={sub.url}
                              className="px-3 py-2 text-sm rounded-md hover:bg-blue-100 hover:text-blue-700 transition"
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </HoverCardContent>
                      </HoverCard>
                    ) : (
                      <Link
                        href={item.url}
                        className={`block py-2 px-1 text-slate-800 ${
                          paths.includes(pathname)
                            ? "md:text-blue-700 border-b border-blue-700"
                            : ""
                        }`}
                      >
                        {item.name}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Component */}
      <Mobilenavbar openNav={openNav} toggleNav={toggleNav} paths={paths} />
    </>
  );
};

export default NavbarNew;