import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Button from './Button'
import { describe, it, expect, vi } from 'vitest'

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Click</Button>)
    fireEvent.click(screen.getByText('Click'))
    expect(onClick).toHaveBeenCalled()
  })

  it('does not call onClick when disabled', () => {
    const onClick = vi.fn()
    render(
      <Button onClick={onClick} disabled>
        Disabled
      </Button>,
    )
    fireEvent.click(screen.getByText('Disabled'))
    expect(onClick).not.toHaveBeenCalled()
  })

  it('applies custom className', () => {
    render(<Button className="test-class">Styled</Button>)
    expect(screen.getByText('Styled')).toHaveClass('test-class')
  })
})
