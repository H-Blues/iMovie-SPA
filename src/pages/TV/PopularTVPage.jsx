import React, { useState } from 'react';
import { getPopularTV } from '../../api/tmdbApi';
import { useQuery } from 'react-query';
import PageTemplate from '../../components/templateMovieList';
import Spinner from '../../components/spinner';
import Pagination from '@mui/material/Pagination';

const PopularTVPage = () => {
  let [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  const { data, error, isLoading, isError } = useQuery(
    [`popularTV${page}`, { page: page }],
    getPopularTV
  );

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }
  const movies = data.results;

  return (
    <>
      <PageTemplate title="Popular TV" movies={movies} type="tv" />
      <Pagination
        count={10}
        page={page}
        variant="outlined"
        size="large"
        onChange={handleChange}
        sx={{ display: 'flex', justifyContent: 'center', margin: '20px' }}
      />
    </>
  );
};
export default PopularTVPage;
