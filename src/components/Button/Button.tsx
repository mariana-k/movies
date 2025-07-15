import React from 'react'

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className = '', ...props }, ref) => (
    <button
      ref={ref}
      className={`px-4 py-2 rounded bg-gray-200 disabled:opacity-50 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
      {...props}
    >
      {children}
    </button>
  ),
)
Button.displayName = 'Button'

export default Button
