'use client'

import { useState } from 'react'
import { toast } from 'react-hot-toast'
import Link from 'next/link'
import { User, Mail, Lock} from 'lucide-react'
import { InputField } from '@/components/general/InputField'
import { isValidEmail, isValidPassword } from '@/lib/helpers'
import { loginWithPassword, SignUpWithPassword } from '@/lib/auth'
import { useRouter } from 'next/navigation'
import { revalidateAndRedirect } from '@/lib/serverHelpers'
import { useAuthStore } from '@/stores/useAuthStore'

export default function RegisterPage() {
  const { setUser } = useAuthStore();
  const router = useRouter();
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleRegistration = async () => {

    if (username.length < 3) {
      toast.error("Username must be at least 3 characters long");
      return;
    }

    if (isValidEmail(email) === false) {
      toast.error("Invalid email address");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords don't match")
      return
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return
    }

    if (isValidPassword(password) === false) {
      toast.error("Password must contain at least one letter and one number");
      return;
    }

    setIsLoading(true);

    const result = await SignUpWithPassword({
      username,
      email,
      password,
    });

    if (!result.success) {
      toast.error("Registration failed try again later");
      console.error(result.error);
      return;
    }

    const loginResult = await loginWithPassword({
      email,
      password,
    });

    if (!loginResult.success) {
      toast.error("Account created but login failed, try logging in again");
      console.error(loginResult.error);
      router.push('/auth/login');
      return;
    }

    toast.success('Account created successfully!');
    setIsLoading(false);
    setUser(loginResult.data);
    setTimeout(() => {
      revalidateAndRedirect("/", "/watchlist");
    }, 600);
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-black flex items-center justify-center px-6 py-10">
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-br from-blue-950 via-black to-slate-950" />

      <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-blue-600/20 blur-[120px]" />
      <div className="absolute bottom-20 right-20 h-72 w-72 rounded-full bg-indigo-600/20 blur-[120px]" />

      {/* Card */}
      <div className="relative w-full max-w-md">
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            

            <h1 className="text-4xl font-bold text-white">
              Create Account
            </h1>

            <p className="mt-2 text-gray-400">
              Join thousands of movie lovers
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleRegistration()
            }}
            className="space-y-5"
          >
            <InputField
              icon={<User size={18} />}
              placeholder="Username"
              value={username}
              onChange={setUsername}
            />

            <InputField
              icon={<Mail size={18} />}
              type="email"
              placeholder="Email address"
              value={email}
              onChange={setEmail}
            />

            <InputField
              icon={<Lock size={18} />}
              type="password"
              placeholder="Password"
              value={password}
              onChange={setPassword}
            />

            <InputField
              icon={<Lock size={18} />}
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={setConfirmPassword}
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/30 disabled:opacity-50"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-8 border-t border-white/10 pt-6 text-center">
            <p className="text-sm text-gray-400">
              Already have an account?{' '}
              <Link
                href="/auth/login"
                className="font-medium text-blue-400 hover:text-blue-300"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

