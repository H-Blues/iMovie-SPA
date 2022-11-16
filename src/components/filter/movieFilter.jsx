import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { getMovieGenres } from '../../api/tmdbApi';
import { useQuery } from 'react-query';
import Spinner from '../spinner';

const formControl = {
  margin: 1,
  minWidth: 220,
  backgroundColor: 'rgb(255, 255, 255)',
};

export default function FilterMoviesCard(props) {
  const { data, error, isLoading, isError } = useQuery('moviesGenres', getMovieGenres);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  const genres = data.genres;
  if (genres[0].name !== 'All') {
    genres.unshift({ id: '0', name: 'All' });
  }

  const handleChange = (e, type, value) => {
    e.preventDefault();
    props.onUserInput(type, value);
  };

  const handleTextChange = (e, props) => {
    handleChange(e, 'name', e.target.value);
  };

  const handleGenreChange = (e) => {
    handleChange(e, 'genre', e.target.value);
  };

  const handleSortChange = (e) => {
    handleChange(e, 'sort', e.target.value);
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        backgroundColor: 'rgb(204, 204, 0)',
      }}
      variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h1">
          <SearchIcon fontSize="large" />
          Filter the movies.
        </Typography>
        <TextField
          sx={{ ...formControl }}
          id="filled-search"
          label="Search field"
          type="search"
          variant="filled"
          value={props.titleFilter}
          onChange={handleTextChange}
        />
        <FormControl sx={{ ...formControl }}>
          <InputLabel id="genre-label">Genre</InputLabel>
          <Select
            labelId="genre-label"
            id="genre-select"
            defaultValue=""
            value={props.genreFilter}
            onChange={handleGenreChange}>
            {genres.map((genre) => {
              return (
                <MenuItem key={genre.id} value={genre.id}>
                  {genre.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl sx={{ ...formControl }}>
          <InputLabel id="sort-label">Sort</InputLabel>
          <Select
            labelId="sort-label"
            id="sort-select"
            defaultValue="No Sort"
            value={props.sortFilter}
            onChange={handleSortChange}>
            <MenuItem value="0">Not Sort</MenuItem>
            <MenuItem value="1">Sort By Name</MenuItem>
            <MenuItem value="2">Sort By Time</MenuItem>
          </Select>
        </FormControl>
      </CardContent>
    </Card>
  );
}
