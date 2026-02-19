import axios from "axios";

const API_KEY = "7d5837db";
const BASE_URL = "https://www.omdbapi.com/";

export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type: string;
}

export interface MovieDetails extends Movie {
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  imdbRating: string;
  imdbVotes: string;
  BoxOffice?: string;
}

export interface SearchResponse {
  Search: Movie[];
  totalResults: string;
  Response: string;
  Error?: string;
}

export const searchMovies = async (query: string, page = 1): Promise<SearchResponse> => {
  const { data } = await axios.get<SearchResponse>(BASE_URL, {
    params: { s: query, apikey: API_KEY, page },
  });
  return data;
};

export const getMovieDetails = async (imdbID: string): Promise<MovieDetails> => {
  const { data } = await axios.get<MovieDetails>(BASE_URL, {
    params: { i: imdbID, apikey: API_KEY, plot: "full" },
  });
  return data;
};

export const MOVIE_CATEGORIES = [
  { title: "Trending Now", query: "batman" },
  { title: "Action Movies", query: "avengers" },
  { title: "Sci-Fi Adventures", query: "star wars" },
  { title: "Thriller", query: "inception" },
  { title: "Comedy", query: "comedy" },
];
