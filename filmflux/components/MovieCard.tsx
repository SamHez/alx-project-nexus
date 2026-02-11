import Image from "next/image";
import Link from "next/link";
import { Movie } from "../services/api";
import WatchlistButton from "./WatchlistButton";

interface MovieCardProps {
    movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    return (
        <div className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transform hover:scale-[1.03] transition-all duration-300 ease-out cursor-pointer border border-gray-100 dark:border-gray-700/50 hover:border-blue-500/30">
            <Link href={`/movies/${movie.id}`}>
                <div className="relative h-[400px] w-full">
                    <Image
                        src={
                            movie.poster_path
                                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                : "https://via.placeholder.com/500x750?text=No+Poster"
                        }
                        alt={movie.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-75"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
            </Link>

            {/* Watchlist Button Overlay */}
            <div className="absolute top-4 right-4 z-10 transition-transform hover:scale-110">
                <WatchlistButton movie={movie} variant="icon" />
            </div>

            <div className="p-5">
                <Link href={`/movies/${movie.id}`}>
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 truncate group-hover:text-blue-500 transition-colors">
                            {movie.title}
                        </h3>
                        <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                            {movie.release_date ? movie.release_date.split("-")[0] : "N/A"}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-yellow-500 text-sm">★</span>
                        <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                            {movie.vote_average.toFixed(1)}
                        </span>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default MovieCard;
