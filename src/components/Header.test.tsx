import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Header from './Header'
import { t } from '../i18n'
import { describe, it, expect, vi } from 'vitest'

describe('Header', () => {
  it('renders app title', () => {
    render(<Header />)
    expect(screen.getByText(t('app.title'))).toBeInTheDocument()
  })
})
