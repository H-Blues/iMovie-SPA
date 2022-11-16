import React from 'react';
import { useParams } from 'react-router';
import { useQuery } from 'react-query';
import { getMovie, getTV } from '../../api/tmdbApi';
import DetailTemplate from '../../components/templateMovieDetail';
import Spinner from '../../components/spinner';

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
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      <DetailTemplate type={type} item={item} id={id} />
    </>
  );
};

export default MovieDetailPage;
