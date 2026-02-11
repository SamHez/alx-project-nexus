import React, { createContext, useContext, useState, useEffect } from "react";
import { Movie } from "../services/api";

interface WatchlistContextType {
    watchlist: Movie[];
    addMovie: (movie: Movie) => void;
    removeMovie: (movieId: number) => void;
    isInWatchlist: (movieId: number) => boolean;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export const WatchlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [watchlist, setWatchlist] = useState<Movie[]>([]);

    // Load from localStorage on mount
    useEffect(() => {
        const savedWatchlist = localStorage.getItem("filmflux_watchlist");
        if (savedWatchlist) {
            try {
                setWatchlist(JSON.parse(savedWatchlist));
            } catch (error) {
                console.error("Failed to parse watchlist from localStorage", error);
            }
        }
    }, []);

    // Save to localStorage whenever watchlist changes
    useEffect(() => {
        localStorage.setItem("filmflux_watchlist", JSON.stringify(watchlist));
    }, [watchlist]);

    const addMovie = (movie: Movie) => {
        if (!isInWatchlist(movie.id)) {
            setWatchlist((prev) => [...prev, movie]);
        }
    };

    const removeMovie = (movieId: number) => {
        setWatchlist((prev) => prev.filter((m) => m.id !== movieId));
    };

    const isInWatchlist = (movieId: number) => {
        return watchlist.some((m) => m.id === movieId);
    };

    return (
        <WatchlistContext.Provider value={{ watchlist, addMovie, removeMovie, isInWatchlist }}>
            {children}
        </WatchlistContext.Provider>
    );
};

export const useWatchlist = () => {
    const context = useContext(WatchlistContext);
    if (context === undefined) {
        throw new Error("useWatchlist must be used within a WatchlistProvider");
    }
    return context;
};
