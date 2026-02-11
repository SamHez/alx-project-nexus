import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { getMovieDetails, MovieDetails } from "../../services/api";
import WatchlistButton from "@/components/WatchlistButton";

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
        <>
            <Head>
                <title>{movie.title} | FilmFlux</title>
                <meta name="description" content={movie.overview} />
            </Head>

            {/* Section 1: Cinematic Backdrop Hero */}
            <section className="relative h-[65vh] md:h-[80vh] w-full overflow-hidden bg-gray-900">
                {movie.backdrop_path && (
                    <Image
                        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                        alt={movie.title}
                        fill
                        priority
                        className="object-cover opacity-60 dark:opacity-40"
                    />
                )}
                {/* Enhanced Gradient Overlay with subtle blur */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent backdrop-blur-[2px]"></div>

                {/* Hero Content - Clean Alignment */}
                <div className="absolute inset-0 flex items-end pb-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                        <div className="flex flex-wrap items-center gap-4 mb-6">
                            <span className="bg-yellow-500 text-black font-black px-4 py-1.5 rounded-lg text-sm shadow-xl flex items-center gap-1.5">
                                <span className="text-lg">★</span> {movie.vote_average.toFixed(1)}
                            </span>
                            <div className="flex items-center gap-3 text-gray-200 font-bold drop-shadow-md">
                                <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-md border border-white/10">
                                    {movie.release_date.split("-")[0]}
                                </span>
                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                                <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-md border border-white/10">
                                    {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                                </span>
                            </div>
                        </div>

                        <h1 className="text-5xl md:text-8xl font-black mb-6 drop-shadow-2xl tracking-tighter text-white leading-tight">
                            {movie.title}
                        </h1>

                        {movie.tagline && (
                            <p className="text-xl md:text-3xl italic text-blue-400 font-bold mb-8 drop-shadow-lg max-w-4xl opacity-90">
                                {movie.tagline}
                            </p>
                        )}

                        <div className="flex flex-wrap gap-4">
                            <WatchlistButton movie={movie} />
                        </div>
                    </div>
                </div>

                {/* Back Button */}
                <button
                    onClick={() => router.back()}
                    className="absolute top-8 left-8 z-20 p-3 bg-black/50 backdrop-blur-md rounded-full hover:bg-black/70 transition-all border border-white/20 text-white shadow-xl"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </button>
            </section>

            {/* Section 2: Details Grid - Standard Container */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-in fade-in slide-in-from-bottom-5 duration-1000">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

                    {/* Left Column: Poster - No more negative margin overlap */}
                    <div className="md:col-span-1">
                        <div className="relative h-[450px] md:h-[550px] w-full rounded-2xl overflow-hidden shadow-2xl border border-gray-100/10 dark:border-gray-800 ring-1 ring-white/10 transition-transform hover:scale-[1.02] duration-500">
                            <Image
                                src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "https://via.placeholder.com/500x750?text=No+Poster"}
                                alt={movie.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                    {/* Right Column: Overview + Metadata */}
                    <div className="md:col-span-2">
                        {/* Genres always visible */}
                        <div className="flex flex-wrap gap-2 mb-8">
                            {movie.genres.map((genre) => (
                                <span
                                    key={genre.id}
                                    className="bg-blue-600/10 text-blue-600 dark:text-blue-400 px-5 py-2 rounded-full text-xs md:text-sm font-bold border border-blue-500/10 backdrop-blur-sm"
                                >
                                    {genre.name}
                                </span>
                            ))}
                        </div>

                        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-4">
                            Overview
                        </h2>
                        <p className="text-lg md:text-xl leading-relaxed text-gray-700 dark:text-gray-300 antialiased font-medium mb-12">
                            {movie.overview || "No overview available for this movie."}
                        </p>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="p-6 bg-gray-50 dark:bg-gray-900/40 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm transition-all hover:border-blue-500/30">
                                <h4 className="text-gray-400 dark:text-gray-500 uppercase text-[10px] font-black tracking-[0.2em] mb-2">Status</h4>
                                <p className="text-gray-950 dark:text-white font-bold uppercase tracking-wide">Released</p>
                            </div>
                            <div className="p-6 bg-gray-50 dark:bg-gray-900/40 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm transition-all hover:border-blue-500/30">
                                <h4 className="text-gray-400 dark:text-gray-500 uppercase text-[10px] font-black tracking-[0.2em] mb-2">Language</h4>
                                <p className="text-gray-950 dark:text-white font-bold uppercase tracking-wide">English</p>
                            </div>
                            <div className="p-6 bg-gray-50 dark:bg-gray-900/40 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm transition-all hover:border-blue-500/30">
                                <h4 className="text-gray-400 dark:text-gray-500 uppercase text-[10px] font-black tracking-[0.2em] mb-2">Runtime</h4>
                                <p className="text-gray-950 dark:text-white font-bold uppercase tracking-wide">{movie.runtime}m</p>
                            </div>
                            <div className="p-6 bg-gray-50 dark:bg-gray-900/40 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm transition-all hover:border-blue-500/30">
                                <h4 className="text-gray-400 dark:text-gray-500 uppercase text-[10px] font-black tracking-[0.2em] mb-2">Rating</h4>
                                <p className="text-gray-950 dark:text-white font-bold uppercase tracking-wide">{movie.vote_average.toFixed(1)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="h-24"></div>
        </>
    );
};

export default MovieDetailsPage;
