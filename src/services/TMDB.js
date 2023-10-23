import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;
//'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1' \

export const tmdbApi = createApi({
    reducerPath: 'tmdbApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3' }),
    endpoints: (builder) => ({
        //* Get Genres
        getGenres: builder.query({
            query: () => `genre/movie/list?api_key=${tmdbApiKey}`,
        }),
        //* Get movies by [Type]
        getMovies: builder.query({
            query: ({ genreIdOrCategoryName, page, searchQuery}) => {
                //Get Movies by Search
                if(searchQuery){
                    return `search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbApiKey}`;
                }
                //Get Movie by category name
                if(genreIdOrCategoryName && typeof genreIdOrCategoryName === 'string'){
                    return `movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`;
                }
                //Get movie by genre id
                if(genreIdOrCategoryName && typeof genreIdOrCategoryName === 'number'){
                    console.log("HERE");
                    return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmdbApiKey}`;
                }
                //Get popular movies
                return `movie/popular?page=${page}&api_key=${tmdbApiKey}`;
            } 
        }),
    }),
});

export const {
    useGetMoviesQuery,
    useGetGenresQuery,
} = tmdbApi;