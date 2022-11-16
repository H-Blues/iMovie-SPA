import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { MoviesContext } from '../../contexts/moviesContext';
import { getCredits } from '../../api/tmdbApi';
import defaultPerson from '../../assets/person-dummy.jpg';
import defaultFilm from '../../assets/film-poster-placeholder.png';
import Spinner from '../spinner';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import Chip from '@mui/material/Chip';
import './index.css';

const DetailTemplate = ({ type, item, id }) => {
  const context = useContext(MoviesContext);
  var initial;
  for (var i = 0; i < context.movieFavorites.length; i++) {
    if (context.movieFavorites[i] === Number(id)) {
      initial = true;
      break;
    } else {
      initial = false;
    }
  }
  const [isFavorite, setIsFavorite] = useState(initial);

  const { data, error, isLoading, isError } = useQuery(
    [`${type}${id}Credits`, { type: type }, { id: id }],
    getCredits
  );

  const addToFavorite = (e) => {
    e.preventDefault();
    setIsFavorite(true);
    context.addToFavorites(item, type);
  };

  const removeFromFavorite = (e) => {
    e.preventDefault();
    setIsFavorite(false);
    context.removeFromFavorites(item, type);
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const cast = data.cast;
  const castToShow = cast.length > 5 ? cast.slice(0, 5) : cast;

  const posterUrl = 'https://image.tmdb.org/t/p/w500';
  const originUrl = 'https://image.tmdb.org/t/p/original';

  return (
    <>
      <div className="itemDetail">
        <div
          className="backdrop"
          style={{
            backgroundImage: `linear-gradient(grey, black),url(${originUrl}${item.backdrop_path})`,
          }}
        />
        <div className="container">
          {item.poster_path ? (
            <img className="avt" src={posterUrl + item.poster_path} alt="notFound" />
          ) : (
            <img className="avt" src={defaultFilm} alt="noImg" />
          )}
          <div className="contentDetail">
            <div className="content">
              <h1>{item.title || item.name}</h1>
              {isFavorite ? (
                <IconButton aria-label="remove from favorites" onClick={removeFromFavorite}>
                  <FavoriteIcon color="error" fontSize="large" />
                </IconButton>
              ) : (
                <IconButton aria-label="add to favorites" onClick={addToFavorite}>
                  <FavoriteBorderOutlinedIcon color="error" fontSize="large" />
                </IconButton>
              )}
              {item.genres.map((genre) => {
                return (
                  <Chip
                    variant="outlined"
                    key={genre.id}
                    label={genre.name}
                    sx={{ fontSize: '14px', color: 'white', margin: '3px', padding: '8px' }}
                  />
                );
              })}
              <p className="summary">{item.overview}</p>
              <p className="cast">Cast:</p>
              {castToShow.map((cast) => {
                return (
                  <div key={cast.id} className="castCard">
                    {cast.profile_path ? (
                      <img
                        src={originUrl + cast.profile_path}
                        width="100%"
                        style={{ borderRadius: '8px' }}
                        alt="noThisCast"
                      />
                    ) : (
                      <img
                        src={defaultPerson}
                        width="100%"
                        style={{ borderRadius: '8px' }}
                        alt="noImg"
                      />
                    )}
                    <Link
                      to={`/people/${cast.id}`}
                      style={{ textDecoration: 'none', color: 'whitesmoke' }}>
                      {cast.name}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailTemplate;
