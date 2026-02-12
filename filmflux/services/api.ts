import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.themoviedb.org/3";

if (!API_KEY) {
    console.warn("TMDB API Key is missing in environment variables.");
}

export interface Movie {
    id: number;
    title: string;
    poster_path: string;
    backdrop_path: string;
    release_date: string;
    vote_average: number;
    overview: string;
}

export interface Genre {
    id: number;
    name: string;
}

export interface MovieDetails extends Movie {
    backdrop_path: string;
    runtime: number;
    genres: Genre[];
    tagline: string;
}

interface MovieResponse {
    results: Movie[];
}

export const fetchTrendingMovies = async (): Promise<Movie[]> => {
    try {
        const response = await axios.get<MovieResponse>(
            `${BASE_URL}/trending/movie/week`,
            {
                params: {
                    api_key: API_KEY,
                },
            }
        );
        return response.data.results;
    } catch (error) {
        console.error("Error fetching trending movies:", error);
        throw error;
    }
};

export const getMovieDetails = async (id: string): Promise<MovieDetails> => {
    try {
        const response = await axios.get<MovieDetails>(
            `${BASE_URL}/movie/${id}`,
            {
                params: {
                    api_key: API_KEY,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error(`Error fetching movie details for id ${id}:`, error);
        throw error;
    }
};
export const searchMovies = async (query: string): Promise<Movie[]> => {
    try {
        const response = await axios.get<MovieResponse>(
            `${BASE_URL}/search/movie`,
            {
                params: {
                    api_key: API_KEY,
                    query: query,
                },
            }
        );
        return response.data.results;
    } catch (error) {
        console.error(`Error searching movies for query ${query}:`, error);
        throw error;
    }
};
