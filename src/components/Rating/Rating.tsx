import React from 'react'
import { Star, StarOff } from 'lucide-react'

export function Rating({ value, fallback }: { value?: number; fallback: string }) {
  return (
    <span className="flex items-center gap-1">
      {typeof value === 'number' ? (
        <>
          <Star size={16} className="inline-block fill-yellow-500 stroke-yellow-500" />
          {value}
        </>
      ) : (
        <>
          <StarOff size={16} className="inline-block text-gray-300" />
          {fallback}
        </>
      )}
    </span>
  )
}
