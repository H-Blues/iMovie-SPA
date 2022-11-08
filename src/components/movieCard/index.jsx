import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ffcc33',
  },
});

const styles = {
  showOnlyPC: {
    maxWidth: '70%',
    display: { xs: 'none', md: 'block' },
  },
};

const MovieCard = ({ movie }) => {
  const movieImg = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
  return (
    <>
      <div className="movie-card" style={{ width: 'fit-content' }}>
        <img
          src={movieImg}
          style={{ maxWidth: '100%', maxHeight: 'auto', borderRadius: '20px' }}
          alt="notFound"
        />
        <Typography
          gutterBottom
          variant="h6"
          component={Link}
          to={`/movies/${movie.id}`}
          sx={{ color: 'black', textDecoration: 'none' }}>
          {movie.title || movie.name}
        </Typography>
        <Typography variant="body" color="text" sx={styles.showOnlyPC}>
          {movie.release_date || movie.first_air_date}
        </Typography>
        <StyledRating
          defaultValue={movie.vote_average / 2}
          precision={0.5}
          readOnly
          icon={<ThumbUpAltIcon fontSize="inherit" />}
          emptyIcon={<ThumbUpOffAltIcon fontSize="inherit" />}
          sx={{
            margin: '0% 5%',
            float: 'right',
            maxWidth: '100%',
            display: { xs: 'none', md: 'flex' },
          }}
        />
      </div>
    </>
  );
};

export default MovieCard;
