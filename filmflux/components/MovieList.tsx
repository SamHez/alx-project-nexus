import { Movie } from "../services/api";
import MovieCard from "./MovieCard";

interface MovieListProps {
    movies: Movie[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
    return (
        <section className="py-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white border-l-4 border-blue-500 pl-4">
                Trending Now
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </section>
    );
};

export default MovieList;
