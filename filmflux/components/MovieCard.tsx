import Image from "next/image";
import { Movie } from "../services/api";

interface MovieCardProps {
    movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="relative h-96 w-full">
                <Image
                    src={
                        movie.poster_path
                            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                            : "/placeholder-movie.png" // Ensure you have a placeholder or handle null
                    }
                    alt={movie.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm">
                    {movie.vote_average.toFixed(1)}
                </div>
            </div>
            <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 truncate">
                    {movie.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {movie.release_date ? movie.release_date.split("-")[0] : "N/A"}
                </p>
            </div>
        </div>
    );
};

export default MovieCard;
