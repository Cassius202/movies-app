'use client'

import Link from "next/link"

export const Button = ({ children, className, handleClick, disabled }: Readonly<{ children: React.ReactNode, className?: string, handleClick?: () => void, disabled?: boolean }>) => {
  return (
    <button
      className={`transition-transform duration-200 hover:scale-[1.03] cursor-pointer rounded-md ${className}`}
      onClick={handleClick}
      disabled={disabled || false}
    >
      {children}
    </button>
  )
}

export const ButtonLink = ({ children, className, handleClick, href }: Readonly<{ children: React.ReactNode, className?: string, handleClick?: () => void, href: string }>) => {
  return (
    <Link
      onClick={handleClick}
      className={`transition-transform duration-200 hover:scale-[1.03] cursor-pointer ${className}`}
      href={href}
    >
      {children}
    </Link>
  )
}