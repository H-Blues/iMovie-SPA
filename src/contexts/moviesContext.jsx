import React, { useState } from 'react';

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState([]);
  const [myReviews, setMyReviews] = useState({});
  const [playlist, setPlaylist] = useState([]);

  const addToFavorites = (movie) => {
    let newFavorites = [];
    if (!favorites.includes(movie.id)) {
      newFavorites = [...favorites, movie.id];
    } else {
      newFavorites = [...favorites];
    }
    setFavorites(newFavorites);
  };

  const removeFromFavorites = (movie) => {
    setFavorites(favorites.filter((mId) => mId !== movie.id));
  };

  const addReview = (movie, review) => {
    setMyReviews({ ...myReviews, [movie.id]: review });
  };

  const addToPlaylist = (movie) => {
    let newToPlay = [];
    if (!playlist.includes(movie.id)) {
      newToPlay = [...playlist, movie.id];
    } else {
      newToPlay = [...playlist];
    }
    setPlaylist(newToPlay);
  };

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        playlist,
        addToFavorites,
        removeFromFavorites,
        addReview,
        addToPlaylist,
      }}>
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
