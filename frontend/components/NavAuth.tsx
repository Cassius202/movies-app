"use client";

import { User } from "@/constants/types";
import { Button, ButtonLink } from "./utility/buttons";
import { logout } from "@/lib/auth";
import { capitalizeFirst } from "@/lib/helpers";
import { useAuthStore } from "@/stores/useAuthStore";
import { CgSpinner } from "react-icons/cg";

export default function NavAuth() {
  const { user, setUser, isLoading } = useAuthStore();
 
  const handleLogout = async () => {
    setUser(null);
    await logout();
  };
  if (isLoading)
    return (
      <div className="flex items-center animate-spin">
        <CgSpinner />
      </div>
    );
  return (
    <div className="flex items-center gap-3">
      {user ? (
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-700 dark:text-gray-200">
            {capitalizeFirst(user.username)}
          </span>
          <Button
            handleClick={handleLogout}
            className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            Logout
          </Button>
        </div>
      ) : (
        <>
          <ButtonLink
            href="/auth/login"
            className="hidden rounded-lg px-3 py-1.5 text-sm font-medium text-gray-700 transition-all hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800 sm:inline-flex"
          >
            Login
          </ButtonLink>
          <ButtonLink
            href="/auth/register"
            className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white transition-all hover:bg-blue-700"
          >
            Sign Up
          </ButtonLink>
        </>
      )}
    </div>
  );
}
