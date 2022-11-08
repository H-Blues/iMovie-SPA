import React from 'react';
import { useParams } from 'react-router';
import { useQuery } from 'react-query';
import { getMovie, getTV, getPerson } from '../../api/tmdbApi';
import Spinner from '../../components/spinner';
import './DetailPage.css';
import Chip from '@mui/material/Chip';

const DetailPage = ({ type }) => {
  const { id } = useParams();
  var queryFunction;
  if (type === 'tv') {
    queryFunction = getTV;
  } else if (type === 'person') {
    queryFunction = getPerson;
  } else {
    queryFunction = getMovie;
  }

  const { data, isLoading } = useQuery([`${type}${id}`, { id: id }], queryFunction);
  if (isLoading) {
    return <Spinner />;
  }

  const posterUrl = 'https://image.tmdb.org/t/p/w500';
  const backdropUrl = 'https://image.tmdb.org/t/p/original';
  console.log(data);
  const MovieDetailPage = () => {
    return (
      <>
        <div className="itemDetail">
          <div
            className="backdrop"
            style={{
              backgroundImage: `linear-gradient(grey, black),url(${backdropUrl}${data.backdrop_path})`,
            }}
          />
          <div className="container">
            <img className="avt" src={posterUrl + data.poster_path} alt="notFound" />
            <div className="contentDetail">
              <div className="title">
                <h1>{data.title}</h1>
                {data.genres.map((genre) => {
                  return (
                    <Chip
                      variant="outlined"
                      key={genre.id}
                      label={genre.name}
                      sx={{ fontSize: '14px', color: 'white', margin: '3px', padding: '8px' }}
                    />
                  );
                })}
                <p className="summary">{data.overview}</p>
                <p className="cast">Cast:</p>
                <div className="image">
                  <img src="images/cast1.png" alt="" />
                  <img src="images/cast2.png" alt="" />
                  <img src="images/cast3.png" alt="" />
                  <img src="images/cast4.png" alt="" />
                  <img src="images/cast5.png" alt="" />
                  <img src="images/cast6.png" alt="" />
                  <img src="images/cast7.png" alt="" />
                  <div>5+</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  // if (type === 'tv') {
  //   return <TVDetailPage />;
  // } else if (type === 'person') {
  //   return <PersonDetailPage />;
  // } else {
  return <MovieDetailPage />;
  // }
};

export default DetailPage;
