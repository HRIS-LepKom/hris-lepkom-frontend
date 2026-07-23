import React from 'react'

export interface BadgeProps {
  variant?: 'role' | 'status-green' | 'status-yellow' | 'status-red' | 'info'
  children: React.ReactNode
  className?: string
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'info',
  children,
  className = '',
}) => {
  const baseStyles = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold'

  const variantStyles = {
    role: 'bg-lepkom-blue/10 text-lepkom-blue',
    'status-green': 'bg-green-100 text-green-700',
    'status-yellow': 'bg-amber-100 text-amber-700',
    'status-red': 'bg-red-100 text-red-700',
    info: 'bg-blue-100 text-blue-700',
  }

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${className}`.trim()}>
      {children}
    </span>
  )
}
