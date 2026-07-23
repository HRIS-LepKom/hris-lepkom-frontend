import React from 'react'

export interface CardProps {
  children: React.ReactNode
  header?: React.ReactNode
  className?: string
  bodyClassName?: string
}

export const Card: React.FC<CardProps> = ({
  children,
  header,
  className = '',
  bodyClassName = '',
}) => {
  return (
    <div className={`bg-surface rounded-lg border border-border shadow-sm ${className}`.trim()}>
      {header && (
        <div className="border-b border-border px-6 py-4 font-semibold text-gray-800">
          {header}
        </div>
      )}
      <div className={`p-6 ${bodyClassName}`.trim()}>{children}</div>
    </div>
  )
}
