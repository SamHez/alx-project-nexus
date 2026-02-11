import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { getMovieDetails, MovieDetails } from "../../services/api";

const MovieDetailsPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [movie, setMovie] = useState<MovieDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        const fetchDetails = async () => {
            try {
                setLoading(true);
                const data = await getMovieDetails(id as string);
                setMovie(data);
            } catch (err) {
                setError("Failed to load movie details.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
            </div>
        );
    }

    if (error || !movie) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white p-4">
                <p className="text-2xl text-red-500 mb-6 font-semibold">{error || "Movie not found"}</p>
                <button
                    onClick={() => router.back()}
                    className="px-8 py-3 bg-blue-600 rounded-full hover:bg-blue-700 transition-all font-bold shadow-lg"
                >
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-950 text-white font-sans">
            <Head>
                <title>{movie.title} | FilmFlux</title>
                <meta name="description" content={movie.overview} />
            </Head>

            <main>
                {/* Hero Backdrop Section */}
                <div className="relative h-[60vh] md:h-[80vh] w-full">
                    {movie.backdrop_path && (
                        <Image
                            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                            alt={movie.title}
                            fill
                            priority
                            className="object-cover"
                        />
                    )}
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent"></div>

                    {/* Hero Content */}
                    <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
                        <div className="container mx-auto">
                            <div className="flex flex-wrap items-center gap-4 mb-4">
                                <span className="bg-yellow-500 text-black font-extrabold px-3 py-1 rounded-md text-sm shadow-md">
                                    ★ {movie.vote_average.toFixed(1)}
                                </span>
                                <span className="text-gray-300 font-medium">
                                    {movie.release_date.split("-")[0]}
                                </span>
                                <span className="text-gray-300 font-medium tracking-wide">
                                    {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-7xl font-black mb-4 drop-shadow-2xl">
                                {movie.title}
                            </h1>

                            {movie.tagline && (
                                <p className="text-lg md:text-2xl italic text-blue-400 font-light mb-6">
                                    "{movie.tagline}"
                                </p>
                            )}

                            <div className="flex flex-wrap gap-2">
                                {movie.genres.map((genre) => (
                                    <span
                                        key={genre.id}
                                        className="bg-gray-800/80 backdrop-blur-md px-4 py-2 rounded-full text-xs md:text-sm font-semibold border border-gray-700"
                                    >
                                        {genre.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Back Button */}
                    <button
                        onClick={() => router.back()}
                        className="absolute top-6 left-6 z-20 p-2 bg-black/40 backdrop-blur-md rounded-full hover:bg-black/60 transition-all border border-white/10"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </button>
                </div>

                {/* Details Section */}
                <div className="container mx-auto px-6 md:px-12 py-12">
                    <div className="flex flex-col md:flex-row gap-12">
                        {/* Poster Column */}
                        <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0">
                            <div className="relative h-[450px] w-full rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-gray-800 transform -mt-20 md:-mt-32 z-10">
                                <Image
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>

                        {/* Overview Column */}
                        <div className="w-full md:w-2/3 lg:w-3/4">
                            <h2 className="text-3xl font-bold mb-6 border-b border-gray-800 pb-4">Overview</h2>
                            <p className="text-lg md:text-xl leading-relaxed text-gray-300 antialiased">
                                {movie.overview}
                            </p>

                            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8">
                                <div>
                                    <h4 className="text-gray-500 uppercase text-xs font-bold tracking-widest mb-1">Status</h4>
                                    <p className="text-blue-400 font-semibold">Released</p>
                                </div>
                                <div>
                                    <h4 className="text-gray-500 uppercase text-xs font-bold tracking-widest mb-1">Original Language</h4>
                                    <p className="text-blue-400 font-semibold uppercase">English</p>
                                </div>
                                {/* Additional metadata could go here */}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Simple Footer spacing */}
            <footer className="h-20"></footer>
        </div>
    );
};

export default MovieDetailsPage;
