import Image from "next/image";
import Link from "next/link";
import { Movie } from "../services/api";
import WatchlistButton from "./WatchlistButton";

interface FeaturedCardProps {
    movie: Movie;
}

const FeaturedCard: React.FC<FeaturedCardProps> = ({ movie }) => {
    return (
        <div className="group relative aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 ease-out cursor-pointer border border-white/5 hover:border-blue-500/50">
            <Link href={`/movies/${movie.id}`}>
                <Image
                    src={
                        movie.backdrop_path
                            ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
                            : movie.poster_path
                                ? `https://image.tmdb.org/t/p/w1280${movie.poster_path}`
                                : "https://via.placeholder.com/1280x720?text=No+Backdrop"
                    }
                    alt={movie.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Bottom Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-100 transition-opacity duration-500"></div>

                {/* Movie Title Overlay */}
                <div className="absolute bottom-0 left-0 p-4 md:p-6 w-full">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors drop-shadow-lg">
                        {movie.title}
                    </h3>
                    <div className="flex items-center gap-2 opacity-80">
                        <span className="text-yellow-400 text-sm">★</span>
                        <span className="text-sm font-semibold text-gray-200">
                            {movie.vote_average.toFixed(1)}
                        </span>
                        <span className="text-gray-400 text-sm ml-2">
                            {movie.release_date ? movie.release_date.split("-")[0] : ""}
                        </span>
                    </div>
                </div>
            </Link>

            {/* Watchlist Button */}
            <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <WatchlistButton movie={movie} variant="icon" />
            </div>
        </div>
    );
};

export default FeaturedCard;
