import axios from 'axios'

const API_KEY = process.env.TMDB_API_KEY as string
const BASE_URL = process.env.TMDB_BASE_URL as string

const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
})

export async function fetchPopularMovies(page = 1) {
  try {
    const { data } = await tmdb.get('/movie/popular', { params: { page } })
    return data
  } catch (error: any) {
    throw new Error(error?.response?.data?.status_message || 'Failed to fetch popular movies')
  }
}

export async function searchMovies(query: string, page = 1) {
  try {
    const { data } = await tmdb.get('/search/movie', { params: { query, page } })
    return data
  } catch (error: any) {
    throw new Error(error?.response?.data?.status_message || 'Failed to search movies')
  }
}

export async function fetchMovieDetails(id: string | number) {
  try {
    const { data } = await tmdb.get(`/movie/${id}`)
    return data
  } catch (error: any) {
    throw new Error(error?.response?.data?.status_message || 'Failed to fetch movie details')
  }
}
