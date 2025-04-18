import { CssBaseline } from '@mui/material'
import React, { useState, useEffect} from 'react';
import {Box, CircularProgress, useMediaQuery, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';

import { useGetMoviesQuery } from '../../services/TMDB';
import MovieList from '../MovieList/MovieList';

const Movies = () => {
  const [page, setPage] = useState(1);
  const { genreIdOrCategoryName, searchQuery } = useSelector((state) => state.currentGenreOrCategory);
  const { data, error, isFetching } = useGetMoviesQuery({ genreIdOrCategoryName, page, searchQuery });
  if(isFetching) {
    return(
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }

  if(!data.results.length){
    return(
      <Box display="flex" justifyContent="center">
      <Typography variant="h4">
        No movies that match that name.
        <br />
        Please search for something else.
      </Typography>
    </Box>
    );
  }

  if (error) return 'An error has occured.';

  return (
    <div>
      <MovieList movies={data}/>
    </div>
  )
}

export default Movies;