"use client";

import { navLinks } from "@/constants/assets";
import { NavLink } from "@/constants/types";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu } from "lucide-react";
import { MobileMenu } from "./MobileMenu";
import Link from "next/link";
import NavAuth from "./NavAuth";

export default function NavBar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAuthRoute = pathname.startsWith("/auth");
  const isRolloverRoute = pathname.startsWith("/rollover");

  if (isAuthRoute || isRolloverRoute) return null;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 w-full bg-white/80 backdrop-blur-md dark:bg-gray-900/80 shadow-sm">
        <div className="container mx-auto flex h-full items-center justify-between px-4 md:px-6">
          {/* Logo/Brand */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="rounded-lg p-2 text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            
            <Link href="/" className="text-xl font-bold text-gray-900 italic dark:text-white">
              WatchList
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center gap-1">
              {navLinks.map((link: NavLink) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:scale-105 dark:text-gray-200 dark:hover:bg-gray-800"
                >
                  <link.icon className="h-4 w-4" aria-hidden="true" />
                  <span>{link.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Auth Buttons */}
          <NavAuth />
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}