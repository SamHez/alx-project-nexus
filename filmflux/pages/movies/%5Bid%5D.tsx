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
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error || !movie) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
                <p className="text-xl text-red-500 mb-4">{error || "Movie not found"}</p>
                <button
                    onClick={() => router.back()}
                    className="px-6 py-2 bg-blue-600 rounded-full hover:bg-blue-700 transition"
                >
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <Head>
                <title>{movie.title} | FilmFlux</title>
                <meta name="description" content={movie.overview} />
            </Head>

            <main>
                {/* Basic structure for logic verification */}
                <div className="relative h-[50vh] w-full">
                    {movie.backdrop_path && (
                        <Image
                            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                            alt={movie.title}
                            fill
                            className="object-cover opacity-50"
                        />
                    )}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-gradient-to-t from-gray-900">
                        <h1 className="text-5xl font-bold text-center">{movie.title}</h1>
                        <p className="mt-4 text-lg max-w-2xl text-center italic text-gray-300">{movie.tagline}</p>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-8">
                    <p className="text-lg leading-relaxed">{movie.overview}</p>
                </div>
            </main>
        </div>
    );
};

export default MovieDetailsPage;
