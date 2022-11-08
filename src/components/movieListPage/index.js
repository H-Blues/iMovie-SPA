import React, { useState } from "react";
import Header from "../headerMovieList";
import Filter from "../filter";
import MovieCard from "../movieCard";
import Grid from "@mui/material/Grid";

function MovieListPage ({ movies, title }) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const genreId = Number(genreFilter);

  let displayedMovies = movies
    .filter((m) => {
      return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    });

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else setGenreFilter(value);
  };

  return (
    <>
      <Grid container sx={{ padding: '20px' }}>
        <Grid item xs={12}>
          <Header title={title} />
        </Grid>
        <Grid item container spacing={2}>
          <Grid key="find" item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Filter
              onUserInput={handleChange}
              titleFilter={nameFilter}
              genreFilter={genreFilter}
            />
          </Grid>
          {displayedMovies.map((m) => (
            <Grid key={m.id} item xs={6} sm={6} md={4} lg={3} xl={2}>
              <MovieCard key={m.id} movie={m} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );
}
export default MovieListPage;