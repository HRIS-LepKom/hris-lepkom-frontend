import React from 'react'

export interface SkeletonProps {
  className?: string
  count?: number
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = 'h-4 w-full', count = 1 }) => {
  const items = Array.from({ length: count })

  return (
    <div className="space-y-2 w-full">
      {items.map((_, index) => (
        <div
          key={index}
          className={`bg-gray-200 animate-pulse rounded ${className}`.trim()}
          style={{ animationDuration: '1s' }}
        />
      ))}
    </div>
  )
}
