import React from 'react'
import { render, screen } from '@testing-library/react'
import { Rating } from './Rating'
import { describe, it, expect } from 'vitest'

describe('Rating', () => {
  it('renders the star and value when value is a number', () => {
    render(<Rating value={7.5} fallback="No rating" />)
    expect(screen.getByText('7.5')).toBeInTheDocument()
    // Should render the filled star SVG
    expect(document.querySelector('svg')).toBeInTheDocument()
  })

  it('renders the fallback and off star when value is undefined', () => {
    render(<Rating value={undefined} fallback="No rating" />)
    expect(screen.getByText('No rating')).toBeInTheDocument()
    // Should render the off star SVG
    expect(document.querySelector('svg')).toBeInTheDocument()
  })

  it('renders 0 as a valid rating', () => {
    render(<Rating value={0} fallback="No rating" />)
    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('renders negative numbers', () => {
    render(<Rating value={-1} fallback="No rating" />)
    expect(screen.getByText('-1')).toBeInTheDocument()
  })

  it('renders large numbers', () => {
    render(<Rating value={12345.678} fallback="No rating" />)
    expect(screen.getByText('12345.678')).toBeInTheDocument()
  })
})
