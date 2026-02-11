import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fetchTrendingMovies, searchMovies, Movie } from "../services/api";
import MovieList from "../components/MovieList";
import SkeletonCard from "../components/SkeletonCard";

export default function Home() {
  const router = useRouter();
  const { search } = router.query;
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        let results: Movie[];

        if (search) {
          results = await searchMovies(search as string);
        } else {
          results = await fetchTrendingMovies();
        }

        setMovies(results);
      } catch (err) {
        setError("Something went wrong. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (router.isReady) {
      loadMovies();
    }
  }, [search, router.isReady]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Head>
        <title>{search ? `Search results for "${search}"` : "FilmFlux | Trending Movies"}</title>
        <meta name="description" content={search ? `Results for ${search}` : "Discover the latest trending movies on FilmFlux."} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="mb-12 text-center">
        <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 mb-4 tracking-tight">
          {search ? "Search Results" : "Trending Movies"}
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {search
            ? `Showing results for "${search}"`
            : "Explore the most popular films around the world right now."}
        </p>
      </header>

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {[...Array(8)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {error && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <p className="text-xl text-red-500 font-semibold">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/20"
          >
            Retry
          </button>
        </div>
      )}

      {!loading && !error && movies.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="bg-gray-100 dark:bg-gray-900 p-8 rounded-full mb-6 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No results found</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-md">
            We couldn't find any movies matching "{search}". Try searching for something else.
          </p>
        </div>
      )}

      {!loading && !error && movies.length > 0 && (
        <MovieList movies={movies} />
      )}
    </div>
  );
}
