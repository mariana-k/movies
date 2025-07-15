import React from 'react'
import { Star, StarOff } from 'lucide-react'

export function Rating({ value, fallback }: { value?: number; fallback: string }) {
  return (
    <span className="flex items-center gap-1">
      {typeof value === 'number' ? (
        <>
          <Star size={16} className="inline-block fill-yellow-500 stroke-yellow-500" />
          <span className="font-bold text-gray-800">{value}</span>
        </>
      ) : (
        <>
          <StarOff size={16} className="inline-block text-gray-300" />
          <span className="font-bold text-gray-800">{fallback}</span>
        </>
      )}
    </span>
  )
}
