import Head from "next/head";
import { useEffect, useState } from "react";
import { fetchTrendingMovies, Movie } from "../services/api";

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const trendingMovies = await fetchTrendingMovies();
        setMovies(trendingMovies);
      } catch (err) {
        setError("Failed to load trending movies.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
      <Head>
        <title>FilmFlux</title>
        <meta name="description" content="Movie Recommendation App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-blue-600 dark:text-blue-400">
          Trending Movies
        </h1>

        {loading && (
          <div className="text-center text-xl">Loading trending movies...</div>
        )}

        {error && (
          <div className="text-center text-red-500 text-xl">{error}</div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="p-4 bg-white dark:bg-gray-800 rounded shadow"
              >
                <h2 className="text-xl font-semibold">{movie.title}</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  {movie.release_date}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
