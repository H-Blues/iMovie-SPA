import React from 'react';
import { useParams } from 'react-router';
import { useQuery } from 'react-query';
import { getPerson } from '../../api/tmdbApi';
import DetailTemplate from '../../components/templatePersonDetail';
import Spinner from '../../components/spinner';

const PersonDetailPage = () => {
  const { id } = useParams();
  const { data: p, error, isLoading, isError } = useQuery([`person${id}`, { id: id }], getPerson);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      <DetailTemplate person={p} id={id} />
    </>
  );
};

export default PersonDetailPage;
