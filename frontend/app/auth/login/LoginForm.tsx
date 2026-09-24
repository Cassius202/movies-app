'use client';

import { Mail, Lock, LogIn } from 'lucide-react';
import { InputField } from '@/components/general/InputField';
import Link from 'next/link';

interface LoginFormProps {
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  handleSubmit: () => void;
  isLoading?: boolean;
  error?: string;
}

export const LoginForm = ({
  email,
  password,
  setEmail,
  setPassword,
  handleSubmit,
  isLoading = false,
  error,
}: LoginFormProps) => {
  return (
    <div className="w-full max-w-md">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl mb-4">
          <LogIn className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome Back
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Sign in to your account to continue
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-sm text-red-600 dark:text-red-400 text-center">
            {error}
          </p>
        </div>
      )}

      {/* Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="space-y-4"
      >
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

        {/* Forgot Password Link */}
        <div className="text-right">
          <Link
            href="/auth/forgot-password"
            className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Signing in...</span>
            </div>
          ) : (
            'Sign In'
          )}
        </button>

        {/* Sign Up Link */}
        <p className="text-center text-gray-600 dark:text-gray-400 text-sm mt-6">
          Don&apos;t have an account?{' '}
          <Link
            href="/auth/register"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
          >
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
};