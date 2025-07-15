import React from 'react'
import { render, screen } from '@testing-library/react'
import { t } from '../../i18n'
import { describe, it, expect } from 'vitest'
import Header from './Header'

describe('Header', () => {
  it('renders app title', () => {
    render(<Header />)
    expect(screen.getByText(t('app.title'))).toBeInTheDocument()
  })
})
