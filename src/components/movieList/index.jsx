import React from 'react';
import MovieCard from '../movieCard';
import Box from '@mui/material/Box';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import { Scrollbar } from 'swiper';

function MovieList({ movies, type }) {
  return (
    <>
      {/* for pc */}
      <Box
        component="span"
        className="movie-list"
        sx={{
          maxWidth: '80%',
          marginLeft: 'auto',
          marginRight: 'auto',
          display: { xs: 'none', md: 'flex' },
        }}>
        <Swiper
          slidesPerView={4.75}
          spaceBetween={10}
          scrollbar={{
            hide: true,
          }}
          loopFillGroupWithBlank={true}
          modules={[Scrollbar]}>
          {movies.map((m, i) => (
            <SwiperSlide key={i}>
              <MovieCard key={m.id} movie={m} type={type} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      {/* for mobile */}
      <Box className="movie-list" sx={{ display: { xs: 'flex', md: 'none' } }}>
        <Swiper
          slidesPerView={2.75}
          spaceBetween={8}
          scrollbar={{
            hide: true,
          }}
          loopFillGroupWithBlank={true}
          modules={[Scrollbar]}
          style={{ maxWidth: '90%' }}>
          {movies.map((m, i) => (
            <SwiperSlide key={i}>
              <MovieCard key={m.id} movie={m} type={type} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </>
  );
}
export default MovieList;
