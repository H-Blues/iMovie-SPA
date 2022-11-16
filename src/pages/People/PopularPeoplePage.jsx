import React, { useState } from 'react';
import { getPeople } from '../../api/tmdbApi';
import { useQuery } from 'react-query';
import PageTemplate from '../../components/templatePersonList';
import Spinner from '../../components/spinner';
import Pagination from '@mui/material/Pagination';

const PopularPeoplePage = () => {
  let [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  const { data, error, isLoading, isError } = useQuery(
    [`popularPeople${page}`, { page: page }],
    getPeople
  );

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }
  const people = data.results;

  return (
    <>
      <PageTemplate title="Popular People" people={people} />
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
export default PopularPeoplePage;
