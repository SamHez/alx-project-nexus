import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState, useMemo } from "react";
import { fetchTrendingMovies, searchMovies, Movie } from "../services/api";
import MovieList from "../components/MovieList";
import FeaturedCard from "../components/FeaturedCard";
import SkeletonCard from "../components/SkeletonCard";
import { debounce } from "../utils/debounce";

export default function Home() {
  const router = useRouter();
  const { search } = router.query;
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [heroSearch, setHeroSearch] = useState("");

  const debouncedSearch = useMemo(
    () => debounce((query: string) => {
      if (query.trim().length > 2) {
        router.push(`/?search=${encodeURIComponent(query)}`);
      } else if (query.trim().length === 0) {
        router.push("/");
      }
    }, 500),
    [router]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setHeroSearch(query);
    debouncedSearch(query);
  };

  useEffect(() => {
    if (search) {
      setHeroSearch(search as string);
    }
  }, [search]);

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

  const topPicks = useMemo(() => movies.slice(0, 4), [movies]);
  const trendingMovies = useMemo(() => movies.slice(4), [movies]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] transition-colors duration-500">
      <Head>
        <title>{search ? `Search results for "${search}"` : "FilmFlux | Discover Your Next Favorite Film"}</title>
        <meta name="description" content={search ? `Results for ${search}` : "Discover trending movies, explore top picks, and build your personal watchlist with FilmFlux."} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Hero Section */}
      <section className="relative w-full py-16 md:py-24 overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-purple-900/20 dark:from-blue-900/30 dark:via-[#050505] dark:to-purple-900/30 transition-all duration-700"></div>

        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
          style={{ backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`, backgroundSize: '32px 32px' }}></div>

        {/* Glow Accents */}
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-500/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter animate-in fade-in slide-in-from-bottom-8 duration-700">
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-purple-600 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(59,130,246,0.5)]">
              FILMFLUX
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10 font-medium leading-relaxed animate-in fade-in slide-in-from-bottom-10 duration-1000">
            Discover trending films, explore top picks, and build your personal watchlist. Your cinematic journey starts here.
          </p>

          {/* Hero Search Bar */}
          <div className="w-full max-w-2xl relative group animate-in fade-in slide-in-from-bottom-12 duration-1000">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-focus-within:text-blue-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={heroSearch}
              onChange={handleSearchChange}
              placeholder="Search for movies, actors, or genres..."
              className="w-full bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-full py-4 pl-14 pr-6 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500/50 outline-none text-gray-900 dark:text-white placeholder-gray-500 transition-all shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : error ? (
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
        ) : movies.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center animate-in fade-in zoom-in duration-700">
            <div className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-10 rounded-full mb-8 shadow-inner">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-gray-400 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">No results found</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-sm text-lg font-medium leading-relaxed mb-8">
              We couldn't find any cinematic masterpieces matching <span className="text-blue-600 dark:text-blue-400 font-bold">"{search}"</span>.
            </p>
          </div>
        ) : (
          <>
            {/* Our Top Picks (16:9) */}
            {!search && topPicks.length > 0 && (
              <section className="mb-20">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-1.5 h-8 bg-blue-600 rounded-full"></div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Our Top Picks</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                  {topPicks.map((movie) => (
                    <FeaturedCard key={movie.id} movie={movie} />
                  ))}
                </div>
              </section>
            )}

            {/* Trending / Search Results */}
            <section className={!search ? "pt-12 border-t border-gray-100 dark:border-gray-800" : ""}>
              <div className="flex items-center gap-4 mb-8">
                {!search && <div className="w-1.5 h-8 bg-purple-600 rounded-full"></div>}
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                  {search ? "Search Results" : "Trending Now"}
                </h2>
              </div>
              <MovieList movies={!search ? trendingMovies : movies} />
            </section>
          </>
        )}
      </main>
    </div>
  );
}
