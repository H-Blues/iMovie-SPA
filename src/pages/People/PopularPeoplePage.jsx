import React, { useState, lazy, Suspense } from 'react';
import { getPeople } from '../../api/tmdbApi';
import { useQuery } from 'react-query';
import Pagination from '@mui/material/Pagination';
const PageTemplate = lazy(() => import('../../components/templatePersonList'));
const Spinner = lazy(() => import('../../components/spinner'));

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
    return (
      <Suspense>
        <Spinner />
      </Suspense>
    );
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }
  const people = data.results;

  return (
    <>
      <Suspense>
        <PageTemplate title="Popular People" people={people} />
      </Suspense>
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
