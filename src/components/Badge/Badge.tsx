import React from 'react'

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement>

const Badge: React.FC<BadgeProps> = ({ children, className = '', ...props }) => (
  <span
    className={`bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium ${className}`}
    {...props}
  >
    {children}
  </span>
)

export default Badge
