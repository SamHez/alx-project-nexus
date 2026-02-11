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
                <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in duration-700">
                    <div className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-10 rounded-full mb-8 shadow-inner">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-gray-400 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">Your watchlist is empty</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-10 max-w-sm text-lg font-medium leading-relaxed">
                        Explore moving pictures and add them to your collection to keep track of what you want to experience next.
                    </p>
                    <Link
                        href="/"
                        className="px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-black transition-all shadow-xl hover:shadow-blue-500/20 active:scale-95"
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
