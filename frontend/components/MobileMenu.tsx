"use client";

import { navLinks } from "@/constants/assets";
import { NavLink } from "@/constants/types";
import { X } from "lucide-react";
import Link from "next/link";
import { Button, ButtonLink } from "./utility/buttons";
import { useEffect } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import { CgLogOut } from "react-icons/cg";
import { capitalizeFirst } from "@/lib/helpers";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const { user } = useAuthStore();
  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Panel */}
      <div className="fixed inset-y-0 left-0 z-50 w-full max-w-sm transform bg-white shadow-2xl transition-transform duration-300 dark:bg-gray-900 sm:w-80">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Menu</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col p-4">
          {navLinks.map((link: NavLink) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={onClose}
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:scale-[1.02] dark:text-gray-200 dark:hover:bg-gray-800"
            >
              <link.icon className="h-5 w-5" aria-hidden="true" />
              <span className="text-base font-medium">{link.name}</span>
            </Link>
          ))}
        </nav>

        {/* Mobile Auth Section */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 p-4 dark:border-gray-800">
          {user ? (<div className="flex justify-between px-4">
            <Button handleClick={onClose} className="rounded-lg gap-2.5 bg-red-600 flex items-center px-4 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-red-700">
              <CgLogOut size={22} /> 
            </Button>
            <div>
              <span>
                {capitalizeFirst(user.username)}
              </span>
              <p className="text-xs font-bold">
                {user.email}
              </p>
            </div>
          </div>) : (<div className="flex flex-col gap-2">
            <ButtonLink
              href="/auth/login"
              handleClick={onClose}
              className="rounded-lg px-4 py-2.5 text-center text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              Login
            </ButtonLink>
            <ButtonLink
              href="/auth/register"
              handleClick={onClose}
              className="rounded-lg bg-blue-600 px-4 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              Sign Up
            </ButtonLink>
          </div>)}
        </div>
      </div>
    </>
  );
};