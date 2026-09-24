"use client";

import { useState } from "react";
import { LoginForm } from "./LoginForm";
import { loginWithPassword } from "@/lib/auth";
import { isValidEmail } from "@/lib/helpers";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";

export default function LoginPage() {
  const { setUser } = useAuthStore();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    toast.dismissAll();

    if (!email || !password) {
      toast.error("Please fill in all fields", { duration: 3000 });
      return;
    }

    if (password.length < 6) {
      toast.error("Login failed, try again");
      return;
    }

    if (isValidEmail(email) === false) {
      toast.error("Invalid email address");
      return;
    }

    try {
      const result = await loginWithPassword({ email, password });

      if (!result.success) {
        toast.error("Login failed, please try again");
        console.log(result.error);
        return;
      }
      setUser(result.data);
      toast.success("Login successful!", { id: "login" });
      router.push("/watchlist");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message, { id: "login" });
        return;
      }
      toast.error("Something went wrong", { id: "login" });
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 flex items-center justify-center px-4">
      <LoginForm
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
