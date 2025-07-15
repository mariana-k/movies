import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Rating } from './Rating'

const meta: Meta<typeof Rating> = {
  title: 'Components/Rating',
  component: Rating,
  tags: ['autodocs'],
  args: {
    fallback: 'No rating',
  },
}
export default meta

type Story = StoryObj<typeof Rating>

export const Default: Story = {
  args: {
    value: 7.5,
  },
}

export const NoRating: Story = {
  args: {
    value: undefined,
  },
}

export const Zero: Story = {
  args: {
    value: 0,
  },
}

export const Negative: Story = {
  args: {
    value: -1,
  },
}

export const Large: Story = {
  args: {
    value: 12345.678,
  },
}
