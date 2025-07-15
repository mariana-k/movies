import React from 'react'
import { useParams } from 'next/navigation'

export default function MovieDetailsPage() {
  // TODO: Fetch movie details using id
  // const { id } = useParams()
  return (
    <main className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-6">Movie Details</h1>
      {/* TODO: Movie details content */}
      <div className="text-gray-500">Movie details will be shown here</div>
    </main>
  )
}
