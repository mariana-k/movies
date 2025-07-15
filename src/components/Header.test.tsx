import React from 'react'
import { render, screen } from '@testing-library/react'
import Header from './Header'
import { t } from '../i18n'
import { describe, it, expect } from 'vitest'

describe('Header', () => {
  it('renders app title', () => {
    render(<Header />)
    expect(screen.getByText(t('app.title'))).toBeInTheDocument()
  })
})
