"use client"

export function InputField({
  icon,
  type = 'text',
  placeholder,
  value,
  onChange,
}: {
  icon: React.ReactNode
  type?: string
  placeholder: string
  value: string | number
  onChange: (value: string) => void
}) {
  return (
    <div className="relative">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
        {icon}
      </span>

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-12 pr-4 text-white placeholder:text-gray-500 outline-none transition-all focus:border-blue-500 focus:bg-white/[0.08]"
      />
    </div>
  )
}