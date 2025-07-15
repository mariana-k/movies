import type { Meta, StoryObj } from '@storybook/react'
import MovieCard, { Movie } from './MovieCard'

const meta: Meta<typeof MovieCard> = {
  title: 'Components/MovieCard',
  component: MovieCard,
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof MovieCard>

const baseMovie: Movie = {
  id: 1,
  title: 'Test Movie',
  poster_path: '/qtSY2SAL5QApuCUD0sXqyzgHYnl.jpg',
  release_date: '2023-01-01',
  vote_average: 7.5,
}

export const Default: Story = {
  args: {
    movie: baseMovie,
  },
}

export const NoImage: Story = {
  args: {
    movie: { ...baseMovie, poster_path: undefined },
  },
}

export const NoTitle: Story = {
  args: {
    movie: { ...baseMovie, title: undefined },
  },
}

export const NoReleaseDate: Story = {
  args: {
    movie: { ...baseMovie, release_date: undefined },
  },
}

export const NoRating: Story = {
  args: {
    movie: { ...baseMovie, vote_average: undefined },
  },
}
