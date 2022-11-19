import React, { lazy, Suspense } from 'react';
import { useParams } from 'react-router';
import { useQuery } from 'react-query';
import { getPerson } from '../../api/tmdbApi';
const DetailTemplate = lazy(() => import('../../components/templatePersonDetail'));
const Spinner = lazy(() => import('../../components/spinner'));

const PersonDetailPage = () => {
  const { id } = useParams();
  const { data: p, error, isLoading, isError } = useQuery([`person${id}`, { id: id }], getPerson);

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
        <DetailTemplate person={p} id={id} />
      </Suspense>
    </>
  );
};

export default PersonDetailPage;
