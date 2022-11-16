import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getCombinedCredits } from '../../api/tmdbApi';
import defaultPerson from '../../assets/person-dummy.jpg';
import defaultFilm from '../../assets/film-poster-placeholder.png';
import Spinner from '../spinner';
import Chip from '@mui/material/Chip';
import './index.css';

const DetailTemplate = ({ person, id }) => {
  const { data, error, isLoading, isError } = useQuery(
    [`person${id}Credits`, { id: id }],
    getCombinedCredits
  );

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
      <div className="personDetail">
        <div className="container">
          {person.profile_path ? (
            <img className="avt" src={posterUrl + person.profile_path} alt="notFound" />
          ) : (
            <img className="avt" src={defaultPerson} alt="noImg" />
          )}
          <div className="contentDetail">
            <div className="content">
              <h1>{person.name}</h1>
              <Chip
                variant="outlined"
                label={person.known_for_department}
                sx={{ fontSize: '14px', color: 'white', margin: '3px', padding: '8px' }}
              />
              <p className="summary">{person.biography}</p>
              <p className="cast">Known For:</p>
              {castToShow.map((cast) => {
                return (
                  <div key={cast.id} className="castCard">
                    {cast.poster_path ? (
                      <img
                        src={originUrl + cast.poster_path}
                        width="100%"
                        style={{ borderRadius: '8px' }}
                        alt="noThisCast"
                      />
                    ) : (
                      <img
                        src={defaultFilm}
                        width="100%"
                        style={{ borderRadius: '8px' }}
                        alt="noImg"
                      />
                    )}
                    <Link
                      to={`/${cast.media_type}/${cast.id}`}
                      style={{ textDecoration: 'none', color: 'whitesmoke' }}>
                      {cast.name || cast.title}
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
