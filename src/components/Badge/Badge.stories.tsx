import type { Meta, StoryObj } from '@storybook/react'
import Badge from './Badge'

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof Badge>

export const Default: Story = {
  args: {
    children: 'Genre',
  },
}

export const CustomColor: Story = {
  args: {
    children: 'Custom',
    className: 'bg-green-100 text-green-800',
  },
}

export const LongText: Story = {
  args: {
    children: 'Very Long Genre Name That Should Truncate Or Wrap',
  },
}
