import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { debounce } from "../utils/debounce";
import { useTheme } from "@/contexts/ThemeContext";

const Navbar = () => {
    const router = useRouter();
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [searchQuery, setSearchQuery] = useState("");

    // Sync input with URL search param on mount or back navigation
    useEffect(() => {
        if (router.query.search) {
            setSearchQuery(router.query.search as string);
        } else {
            setSearchQuery("");
        }
    }, [router.query.search]);

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
        setSearchQuery(query);
        debouncedSearch(query);
    };

    const cycleTheme = () => {
        if (theme === "system") setTheme("light");
        else if (theme === "light") setTheme("dark");
        else setTheme("system");
    };

    return (
        <nav className="sticky top-0 z-50 bg-white/80 dark:bg-[#050505]/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Left: Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="text-2xl font-black tracking-tighter text-blue-600 dark:text-blue-400">
                            FILM<span className="text-gray-900 dark:text-white">FLUX</span>
                        </Link>
                    </div>

                    {/* Center: Search */}
                    <div className="hidden md:block flex-1 max-w-md mx-8">
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                placeholder="Search movies..."
                                className="w-full bg-gray-100 dark:bg-gray-900 border border-transparent focus:border-blue-500/50 rounded-full py-2 pl-10 pr-10 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-sm text-gray-900 dark:text-gray-100 placeholder-gray-500"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => {
                                        setSearchQuery("");
                                        router.push("/");
                                    }}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-blue-500 transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center space-x-2 sm:space-x-4">
                        <Link href="/watchlist" className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-all">
                            Watchlist
                        </Link>

                        <button
                            onClick={cycleTheme}
                            className="flex items-center space-x-2 p-2 rounded-xl bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 transition-all active:scale-95 shadow-sm border border-transparent dark:border-gray-800 overflow-hidden"
                            aria-label="Toggle Theme"
                            title={`Current: ${theme === 'system' ? 'System (' + resolvedTheme + ')' : theme.charAt(0).toUpperCase() + theme.slice(1)}`}
                        >
                            <div className="relative w-5 h-5">
                                {theme === "system" ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 21h6l-.75-4M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                ) : resolvedTheme === "dark" ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-blue-600" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                                    </svg>
                                )}
                            </div>
                            <span className="hidden sm:inline text-xs font-semibold uppercase tracking-wider">
                                {theme}
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
