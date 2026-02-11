import Head from "next/head";
import { useEffect, useState } from "react";
import { fetchTrendingMovies, Movie } from "../services/api";
import MovieList from "../components/MovieList";

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
        setError("Failed to load trending movies. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
      <Head>
        <title>FilmFlux | Trending Movies</title>
        <meta name="description" content="Discover the latest trending movies on FilmFlux." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-2">
            FilmFlux
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Your daily dose of trending cinema.
          </p>
        </header>

        {loading && (
          <div className="flex flex-col items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-xl text-gray-600 dark:text-gray-400 animate-pulse">Loading movies...</p>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <p className="text-xl text-red-500 font-semibold">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && movies.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">No trending movies found at the moment.</p>
          </div>
        )}

        {!loading && !error && movies.length > 0 && (
          <MovieList movies={movies} />
        )}
      </main>
    </div>
  );
}
