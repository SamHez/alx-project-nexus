import React from "react";
import { useWatchlist } from "../contexts/WatchlistContext";
import { Movie } from "../services/api";

interface WatchlistButtonProps {
    movie: Movie;
    variant?: "full" | "icon";
}

const WatchlistButton: React.FC<WatchlistButtonProps> = ({ movie, variant = "full" }) => {
    const { addMovie, removeMovie, isInWatchlist } = useWatchlist();
    const inWatchlist = isInWatchlist(movie.id);

    const handleToggle = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (inWatchlist) {
            removeMovie(movie.id);
        } else {
            addMovie(movie);
        }
    };

    if (variant === "icon") {
        return (
            <button
                onClick={handleToggle}
                className={`p-2 rounded-full backdrop-blur-md transition-all active:scale-90 shadow-lg border border-white/10 ${inWatchlist
                        ? "bg-red-500 text-white hover:bg-red-600"
                        : "bg-black/60 text-white hover:bg-blue-600"
                    }`}
                title={inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
            >
                {inWatchlist ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                )}
            </button>
        );
    }

    return (
        <button
            onClick={handleToggle}
            className={`flex items-center gap-2 px-8 py-4 rounded-xl font-bold transition-all active:scale-95 shadow-xl ${inWatchlist
                    ? "bg-red-600 hover:bg-red-700 text-white ring-4 ring-red-500/20"
                    : "bg-blue-600 hover:bg-blue-700 text-white ring-4 ring-blue-500/20"
                }`}
        >
            {inWatchlist ? (
                <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                    <span>Remove from Watchlist</span>
                </>
            ) : (
                <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    <span>Add to Watchlist</span>
                </>
            )}
        </button>
    );
};

export default WatchlistButton;
