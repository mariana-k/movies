import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import SearchBar from './SearchBar'
import { describe, it, expect, vi } from 'vitest'
import { t } from '../i18n'

describe('SearchBar', () => {
  it('renders input with placeholder and value', () => {
    render(<SearchBar value="batman" onChange={() => {}} />)
    const input = screen.getByPlaceholderText(t('home.searchPlaceholder'))
    expect(input).toBeInTheDocument()
    expect(input).toHaveValue('batman')
  })

  it('calls onChange when typing', () => {
    const onChange = vi.fn()
    render(<SearchBar value="" onChange={onChange} />)
    const input = screen.getByPlaceholderText(t('home.searchPlaceholder'))
    fireEvent.change(input, { target: { value: 'batman' } })
    expect(onChange).toHaveBeenCalledWith('batman')
  })
})
