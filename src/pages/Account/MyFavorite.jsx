import React, { useContext } from 'react';
import { useQueries } from 'react-query';
import { MoviesContext } from '../../contexts/moviesContext';
import { getMovie } from '../../api/tmdbApi';
import Spinner from '../../components/spinner';
import MovieCard from '../../components/movieCard';
import { Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import { Scrollbar } from 'swiper';

const MyFavorite = () => {
  const { movieFavorites: movieIds } = useContext(MoviesContext);
  const favoriteMovieQueries = useQueries(
    movieIds.map((movieId) => {
      return {
        queryKey: ['movie', { id: movieId }],
        queryFn: getMovie,
      };
    })
  );

  const isLoading = favoriteMovieQueries.find((m) => m.isLoading === true);
  if (isLoading) {
    return <Spinner />;
  }
  const movies = favoriteMovieQueries.map((q) => {
    return q.data;
  });

  const styles = {
    sectionHeader: {
      marginLeft: '10%',
      width: '100%',
      height: '30vh',
      display: 'inline-block',
    },
    h2: {
      padding: '10px',
      float: 'left',
    },
  };

  return (
    <>
      <Typography gutterBottom variant="h2" component="p" sx={{ textAlign: 'center' }}>
        My Favorite
      </Typography>

      <div className="section" style={{ marginBottom: '20px' }}>
        <div className="sectionHeader" style={styles.sectionHeader}>
          {movieIds.length > 0 ? (
            <h2 style={styles.h2}>Favorite Movies</h2>
          ) : (
            <h2 style={styles.h2}>Waiting for Adding Favorite Movies</h2>
          )}
        </div>
        <Swiper
          style={{ width: '80%', marginTop: '-10%' }}
          slidesPerView={4}
          spaceBetween={2}
          scrollbar={{
            hide: true,
          }}
          loopFillGroupWithBlank={true}
          modules={[Scrollbar]}>
          {movies.map((m, i) => (
            <SwiperSlide key={i} style={{ width: '20%' }}>
              <MovieCard key={m.id} movie={m} type="movie" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* <div className="section" style={{ marginBottom: '20px' }}>
        <div className="sectionHeader" style={styles.sectionHeader}>
          {tvIds.length > 0 ? (
            <h2 style={styles.h2}>Favorite TV</h2>
          ) : (
            <h2 style={styles.h2}>Waiting for Adding Favorite TV</h2>
          )}
        </div>
        <MovieList movies={tv} type="tv" />
      </div> */}
    </>
  );
};

export default MyFavorite;
