import React, { useState } from 'react';
import Header from '../headerMovieList';
import MovieFilter from '../filter/movieFilter';
import TvFilter from '../filter/tvFilter';
import MovieCard from '../movieCard';
import Grid from '@mui/material/Grid';

function MovieListPage({ movies, title, type }) {
  const [nameFilter, setNameFilter] = useState('');
  const [genreFilter, setGenreFilter] = useState('0');
  const [sortFilter, setSortFilter] = useState('0');
  const genreId = Number(genreFilter);

  let displayedMovies = movies
    .filter((m) => {
      if (m.title) {
        return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
      } else {
        return m.name.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
      }
    })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    });

  if (sortFilter === '1')
    displayedMovies.sort((a, b) => {
      if (a.title > b.title || a.name > b.name) return 1;
      else return -1;
    });
  else if (sortFilter === '2')
    displayedMovies.sort((a, b) => {
      if (a.release_date < b.release_date || a.first_air_date < b.first_air_date) return 1;
      else return -1;
    });

  const handleChange = (type, value) => {
    if (type === 'name') setNameFilter(value);
    else if (type === 'genre') setGenreFilter(value);
    else setSortFilter(value);
  };

  return (
    <>
      <Grid container sx={{ padding: '20px' }}>
        <Grid item xs={12}>
          <Header title={title} />
        </Grid>
        <Grid item container spacing={2}>
          <Grid key="find" item xs={12} sm={6} md={4} lg={3} xl={2}>
            {type === 'movie' ? (
              <MovieFilter
                onUserInput={handleChange}
                titleFilter={nameFilter}
                genreFilter={genreFilter}
                sortFilter={sortFilter}
              />
            ) : (
              <TvFilter
                onUserInput={handleChange}
                titleFilter={nameFilter}
                genreFilter={genreFilter}
                sortFilter={sortFilter}
              />
            )}
          </Grid>
          {displayedMovies.map((m) => (
            <Grid key={m.id} item xs={6} sm={6} md={4} lg={3} xl={2}>
              <MovieCard key={m.id} movie={m} type={type} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );
}
export default MovieListPage;
