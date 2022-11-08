import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Spinner from '../../components/spinner';
import { getMovie } from '../../api/tmdbApi';
import { Autoplay } from 'swiper';
import 'swiper/css';
import './index.css';
import { Box, Button } from '@mui/material';
import { useQuery } from 'react-query';

const MovieBackdrop = () => {
  const movieIds = [101, 13, 157336, 680];
  var { data: mc1, isLoading: l1 } = useQuery(['mc1', { id: movieIds[0] }], getMovie);
  var { data: mc2, isLoading: l2 } = useQuery(['mc2', { id: movieIds[1] }], getMovie);
  var { data: mc3, isLoading: l3 } = useQuery(['mc3', { id: movieIds[2] }], getMovie);
  var { data: mc4, isLoading: l4 } = useQuery(['mc4', { id: movieIds[3] }], getMovie);

  if (l1 || l2 || l3 || l4) {
    return <Spinner />;
  }

  const imgUrl = 'https://www.themoviedb.org/t/p/original';

  return (
    <>
      <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
        <Swiper
          className="movieBackdrop"
          modules={[Autoplay]}
          spaceBetween={100}
          slidesPerView={1}
          autoplay={{ delay: 3000 }}>
          <SwiperSlide className="singleFilm">
            <div
              className="singleFilmBox"
              style={{
                borderRadius: '20px',
                backgroundImage: `url(${imgUrl}${mc1.backdrop_path})`,
              }}>
              <div className="glassbox">
                <img className="poster" src={imgUrl + mc1.poster_path} alt="poster" />
                <div className="description">
                  <h1>{mc1.original_title}</h1>
                  <p>{mc1.overview}</p>
                  <div className="buttonRow">
                    <Button className="btn" variant="contained" color="error" size="large">
                      Watch Now
                    </Button>
                    <Button className="btn" variant="outlined" color="error" size="large">
                      Details
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide className="singleFilm">
            <div
              className="singleFilmBox"
              style={{
                borderRadius: '20px',
                backgroundImage: `url(${imgUrl}${mc2.backdrop_path})`,
              }}>
              <div className="glassbox">
                <img className="poster" src={imgUrl + mc2.poster_path} alt="poster" />
                <div className="description">
                  <h1>{mc2.original_title}</h1>
                  <p>{mc2.overview}</p>
                  <div className="buttonRow">
                    <Button className="btn" variant="contained" color="error" size="large">
                      Watch Now
                    </Button>
                    <Button className="btn" variant="outlined" color="error" size="large">
                      Details
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide className="singleFilm">
            <div
              className="singleFilmBox"
              style={{
                borderRadius: '20px',
                backgroundImage: `url(${imgUrl}${mc3.backdrop_path})`,
              }}>
              <div className="glassbox">
                <img className="poster" src={imgUrl + mc3.poster_path} alt="poster" />
                <div className="description">
                  <h1>{mc3.original_title}</h1>
                  <p>{mc3.overview}</p>
                  <div className="buttonRow">
                    <Button className="btn" variant="contained" color="error" size="large">
                      Watch Now
                    </Button>
                    <Button className="btn" variant="outlined" color="error" size="large">
                      Details
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide className="singleFilm">
            <div
              className="singleFilmBox"
              style={{
                borderRadius: '20px',
                backgroundImage: `url(${imgUrl}${mc4.backdrop_path})`,
              }}>
              <div className="glassbox">
                <img className="poster" src={imgUrl + mc4.poster_path} alt="poster" />
                <div className="description">
                  <h1>{mc4.original_title}</h1>
                  <p>{mc4.overview}</p>
                  <div className="buttonRow">
                    <Button className="btn" variant="contained" color="error" size="large">
                      Watch Now
                    </Button>
                    <Button className="btn" variant="outlined" color="error" size="large">
                      Details
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </Box>
    </>
  );
};

export default MovieBackdrop;
