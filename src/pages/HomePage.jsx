import React, { lazy, Suspense } from 'react';
import { getPopularMovies, getTopRatedMovies, getUpcoming, getPopularTV } from '../api/tmdbApi';
import { useQueries } from 'react-query';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
const MovieBackdrop = lazy(() => import('../components/movieBackdrop'));
const MovieList = lazy(() => import('../components/movieList'));
const Spinner = lazy(() => import('../components/spinner'));

const HomePage = () => {
  const results = useQueries([
    { queryKey: ['popularMovies1', { page: 1 }], queryFn: getPopularMovies },
    { queryKey: ['topRatedMovies1', { page: 1 }], queryFn: getTopRatedMovies },
    { queryKey: ['upComingMovies1', { page: 1 }], queryFn: getUpcoming },
    { queryKey: ['popularTV1', { page: 1 }], queryFn: getPopularTV },
  ]);

  if (
    results[0].isLoading ||
    results[1].isLoading ||
    results[2].isLoading ||
    results[3].isLoading
  ) {
    return (
      <Suspense>
        <Spinner />
      </Suspense>
    );
  }

  if (results[0].isError || results[1].isError || results[2].isError || results[3].isError) {
    return <h1>Error in fetching data</h1>;
  }

  const popularMovies = results[0].data.results;
  const topRatedMovies = results[1].data.results;
  const upcoimgMovies = results[2].data.results;
  const popularTV = results[3].data.results;

  const styles = {
    sectionHeader: {
      marginLeft: '10%',
      width: '100%',
      display: 'inline-block',
    },
    h2: {
      padding: '10px',
      float: 'left',
    },
    button: {
      marginRight: '20%',
      float: 'right',
    },
  };
  return (
    <>
      <Suspense>
        <MovieBackdrop />
      </Suspense>
      <Typography gutterBottom variant="h2" component="p" sx={{ textAlign: 'center' }}>
        Find you like
      </Typography>

      <div className="section" style={{ marginBottom: '20px' }}>
        <div className="sectionHeader" style={styles.sectionHeader}>
          <h2 style={styles.h2}>Popular Movies</h2>
          <Button
            component={Link}
            to="/movie"
            variant="contained"
            color="primary"
            style={styles.button}>
            MORE
          </Button>
        </div>
        <Suspense>
          <MovieList movies={popularMovies} type="movie" />
        </Suspense>
      </div>

      <div className="section" style={{ marginBottom: '20px' }}>
        <div className="sectionHeader" style={styles.sectionHeader}>
          <h2 style={styles.h2}>Top Rated Movies</h2>
          <Button
            component={Link}
            to="/movie/top-rated"
            variant="contained"
            color="primary"
            style={styles.button}>
            MORE
          </Button>
        </div>
        <Suspense>
          <MovieList movies={topRatedMovies} type="movie" />
        </Suspense>
      </div>

      <div className="section" style={{ marginBottom: '20px' }}>
        <div className="sectionHeader" style={styles.sectionHeader}>
          <h2 style={styles.h2}>Upcoming Movies</h2>
          <Button
            component={Link}
            to="/movie/upcoming"
            variant="contained"
            color="primary"
            style={styles.button}>
            MORE
          </Button>
        </div>
        <Suspense>
          <MovieList movies={upcoimgMovies} type="movie" />
        </Suspense>
      </div>

      <div className="section" style={{ marginBottom: '20px' }}>
        <div className="sectionHeader" style={styles.sectionHeader}>
          <h2 style={styles.h2}>Popular TV</h2>
          <Button
            component={Link}
            to="/tv"
            variant="contained"
            color="primary"
            style={styles.button}>
            MORE
          </Button>
        </div>
        <Suspense>
          <MovieList movies={popularTV} type="tv" />
        </Suspense>
      </div>
    </>
  );
};

export default HomePage;
