import Head from "next/head";
import { useWatchlist } from "../contexts/WatchlistContext";
import MovieList from "../components/MovieList";
import Link from "next/link";

export default function WatchlistPage() {
    const { watchlist } = useWatchlist();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Head>
                <title>My Watchlist | FilmFlux</title>
                <meta name="description" content="Your personal movie watchlist on FilmFlux." />
            </Head>

            <header className="mb-12">
                <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
                    My Watchlist
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                    {watchlist.length === 1
                        ? "1 movie saved"
                        : `${watchlist.length} movies saved`}
                </p>
            </header>

            {watchlist.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="bg-gray-100 dark:bg-gray-900 p-8 rounded-full mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Your watchlist is empty</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
                        Explore trending movies and add them to your watchlist to keep track of what you want to watch.
                    </p>
                    <Link
                        href="/"
                        className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold transition-all shadow-lg"
                    >
                        Browse Movies
                    </Link>
                </div>
            ) : (
                <MovieList movies={watchlist} />
            )}
        </div>
    );
}
