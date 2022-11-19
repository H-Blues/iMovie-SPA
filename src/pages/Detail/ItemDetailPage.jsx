import React, { lazy, Suspense } from 'react';
import { useParams } from 'react-router';
import { useQuery } from 'react-query';
import { getMovie, getTV } from '../../api/tmdbApi';
const DetailTemplate = lazy(() => import('../../components/templateMovieDetail'));
const Spinner = lazy(() => import('../../components/spinner'));

const MovieDetailPage = ({ type }) => {
  const { id } = useParams();

  var getDetailFunction;
  if (type === 'tv') {
    getDetailFunction = getTV;
  } else {
    getDetailFunction = getMovie;
  }

  const {
    data: item,
    error,
    isLoading,
    isError,
  } = useQuery([`${type}${id}`, { id: id }], getDetailFunction);

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

  return (
    <>
      <Suspense>
        <DetailTemplate type={type} item={item} id={id} />
      </Suspense>
    </>
  );
};

export default MovieDetailPage;
