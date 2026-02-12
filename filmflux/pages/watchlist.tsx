import Head from "next/head";
import { useWatchlist } from "../contexts/WatchlistContext";
import MovieList from "../components/MovieList";
import Link from "next/link";

export default function WatchlistPage() {
    const { watchlist } = useWatchlist();

    return (
        <div className="min-h-screen bg-white dark:bg-[#050505] transition-colors duration-500">
            <Head>
                <title>My Watchlist | FilmFlux | Your Personal Collection</title>
                <meta name="description" content="Your personal movie watchlist on FilmFlux. Keep track of what you want to watch next." />
            </Head>

            {/* Watchlist Hero */}
            <section className="relative w-full py-16 md:py-20 overflow-hidden border-b border-gray-100 dark:border-gray-800/50">
                {/* Dynamic Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10 dark:from-blue-900/20 dark:via-[#050505] dark:to-purple-900/20"></div>

                {/* Glow Accents */}
                <div className="absolute top-1/2 -left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="absolute top-1/2 -right-20 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
                    <h1 className="text-5xl md:text-6xl font-black mb-4 tracking-tighter animate-in fade-in slide-in-from-left-8 duration-700">
                        <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                            My Watchlist
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-medium max-w-2xl animate-in fade-in slide-in-from-left-10 duration-1000">
                        {watchlist.length === 0
                            ? "Your saved movies in one place. Keep track of what you want to watch next."
                            : `You have ${watchlist.length} ${watchlist.length === 1 ? 'movie' : 'movies'} waiting for your appreciation.`
                        }
                    </p>
                </div>
            </section>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {watchlist.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 px-6 text-center animate-in fade-in zoom-in duration-700">
                        <div className="relative group mb-10">
                            <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-2xl group-hover:bg-blue-500/30 transition-all"></div>
                            <div className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-10 rounded-full shadow-xl">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                </svg>
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">Your watchlist is empty</h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-10 max-w-sm text-lg font-medium leading-relaxed">
                            Explore moving pictures and add them to your collection to keep track of what you want to experience next.
                        </p>
                        <Link
                            href="/"
                            className="px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-black transition-all shadow-xl hover:shadow-blue-500/20 active:scale-95 flex items-center gap-2"
                        >
                            <span>Browse Movies</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </Link>
                    </div>
                ) : (
                    <MovieList movies={watchlist} />
                )}
            </main>
        </div>
    );
}
