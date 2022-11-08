import React from 'react';
import MovieBackdrop from '../components/movieBackdrop';
import MovieList from '../components/movieList';
import Spinner from '../components/spinner';
import {
  getPopularMovies,
  getTopRatedMovies,
  getUpcoming,
  getPopularTV,
} from '../api/tmdbApi';
import { useQueries } from 'react-query';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const results = useQueries([
    { queryKey: ['popularMovies', 1], queryFn: getPopularMovies },
    { queryKey: ['topRatedMovies'], queryFn: getTopRatedMovies },
    { queryKey: ['upComingMovies'], queryFn: getUpcoming },
    { queryKey: ['popularTV'], queryFn: getPopularTV },
  ]);

  if (
    results[0].isLoading ||
    results[1].isLoading ||
    results[2].isLoading ||
    results[3].isLoading
  ) {
    return <Spinner />;
  }

  if (
    results[0].isError ||
    results[1].isError ||
    results[2].isError ||
    results[3].isError
  ) {
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
      <MovieBackdrop />
      <Typography
        gutterBottom
        variant="h2"
        component="p"
        sx={{ textAlign: 'center' }}>
        Find you like
      </Typography>

      <div className="section" style={{ marginBottom: '20px' }}>
        <div className="sectionHeader" style={styles.sectionHeader}>
          <h2 style={styles.h2}>Popular Movies</h2>
          <Button
            component={Link}
            to="/movies"
            variant="contained"
            color="primary"
            style={styles.button}>
            MORE
          </Button>
        </div>
        <MovieList movies={popularMovies} />
      </div>

      <div className="section" style={{ marginBottom: '20px' }}>
        <div className="sectionHeader" style={styles.sectionHeader}>
          <h2 style={styles.h2}>Top Rated Movies</h2>
          <Button
            component={Link}
            to="/movies/top-rated"
            variant="contained"
            color="primary"
            style={styles.button}>
            MORE
          </Button>
        </div>
        <MovieList movies={topRatedMovies} />
      </div>

      <div className="section" style={{ marginBottom: '20px' }}>
        <div className="sectionHeader" style={styles.sectionHeader}>
          <h2 style={styles.h2}>Upcoming Movies</h2>
          <Button
            component={Link}
            to="/movies/top-rated"
            variant="contained"
            color="primary"
            style={styles.button}>
            MORE
          </Button>
        </div>
        <MovieList movies={upcoimgMovies} />
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
        <MovieList movies={popularTV} />
      </div>
    </>
  );
};

export default HomePage;
