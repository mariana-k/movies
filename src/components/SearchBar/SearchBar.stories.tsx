import type { Meta, StoryObj } from '@storybook/react'
import SearchBar from './SearchBar'
import { useState } from 'react'

const meta: Meta<typeof SearchBar> = {
  title: 'Components/SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof SearchBar>

export const Empty: Story = {
  render: (args) => {
    const [value, setValue] = useState('')
    return <SearchBar {...args} value={value} onChange={setValue} />
  },
}

export const Filled: Story = {
  render: (args) => {
    const [value, setValue] = useState('batman')
    return <SearchBar {...args} value={value} onChange={setValue} />
  },
}
