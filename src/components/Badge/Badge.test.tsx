import React from 'react'
import { render, screen } from '@testing-library/react'
import Badge from './Badge'
import { describe, it, expect } from 'vitest'

describe('Badge', () => {
  it('renders children', () => {
    render(<Badge>Genre</Badge>)
    expect(screen.getByText('Genre')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<Badge className="test-class">Styled</Badge>)
    expect(screen.getByText('Styled')).toHaveClass('test-class')
  })

  it('supports other span props', () => {
    render(<Badge data-testid="badge">Badge</Badge>)
    expect(screen.getByTestId('badge')).toBeInTheDocument()
  })
})
