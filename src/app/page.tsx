import React from 'react'

export default function Home() {
  return (
    <main className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-6">Popular Movies</h1>
      {/* Search Bar */}
      <div className="mb-6">
        {/* TODO: SearchBar component */}
        <input
          type="text"
          placeholder="Search for movies..."
          className="w-full p-2 border rounded"
          disabled
        />
      </div>
      {/* Movie List */}
      <div>
        {/* TODO: MovieList component */}
        <div className="text-gray-500">Movie list goes here</div>
      </div>
    </main>
  )
}
