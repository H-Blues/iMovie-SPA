import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import defaultPerson from '../../assets/person-dummy.jpg';

const PersonCard = ({ person }) => {
  const personImg = `https://image.tmdb.org/t/p/w500/${person.profile_path}`;
  return (
    <>
      <div className="movie-card" style={{ width: 'fit-content' }}>
        {person.profile_path ? (
          <img
            src={personImg}
            style={{ maxWidth: '100%', maxHeight: 'auto', borderRadius: '20px' }}
            alt="notFound"
          />
        ) : (
          <img
            src={defaultPerson}
            style={{ maxWidth: '100%', maxHeight: 'auto', borderRadius: '20px' }}
            alt="notFound"
          />
        )}

        <Typography
          gutterBottom
          variant="h6"
          component={Link}
          to={`/people/${person.id}`}
          sx={{ color: 'black', textDecoration: 'none' }}>
          {person.name}
        </Typography>
      </div>
    </>
  );
};

export default PersonCard;
