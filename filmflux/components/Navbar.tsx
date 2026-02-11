import Link from "next/link";

const Navbar = () => {
    return (
        <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Left: Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-2xl font-black tracking-tighter text-blue-600 dark:text-blue-400">
                            FILM<span className="text-gray-900 dark:text-white">FLUX</span>
                        </Link>
                    </div>

                    {/* Center: Search (Placeholder) */}
                    <div className="hidden md:block flex-1 max-w-md mx-8">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search movies..."
                                className="w-full bg-gray-100 dark:bg-gray-900 border-none rounded-full py-2 px-4 focus:ring-2 focus:ring-blue-500 transition-all outline-none text-sm text-gray-900 dark:text-gray-100"
                            />
                        </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center space-x-6">
                        <Link href="/watchlist" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">
                            Watchlist
                        </Link>
                        {/* Theme Toggle Button Skeleton */}
                        <button className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                            🌙
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
