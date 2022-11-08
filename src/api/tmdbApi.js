const baseUrl = 'https://api.themoviedb.org/3/';
const lang = 'en-US';

export const getMovies = async () => {
  return fetch(
    `${baseUrl}discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=${lang}include_adult=false&include_video=false&page=1`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
    .catch((error) => {
      throw error;
    });
};

export const getMovie = async (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  return fetch(
    `${baseUrl}movie/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}&language=${lang}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
    .catch((error) => {
      throw error;
    });
};

export const getMovieGenres = async () => {
  return fetch(
    `${baseUrl}genre/movie/list?api_key=${process.env.REACT_APP_TMDB_KEY}&language=${lang}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
    .catch((error) => {
      throw error;
    });
};

export const getMovieImages = async ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetch(
    `${baseUrl}movie/${id}/images?api_key=${process.env.REACT_APP_TMDB_KEY}&language=${lang}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();

  })
    .catch((error) => {
      throw error;
    });
};

export const getMovieReviews = async (id) => {
  return fetch(
    `${baseUrl}movie/${id}/reviews?api_key=${process.env.REACT_APP_TMDB_KEY}&language=${lang}`
  )
    .then((res) => res.json())
    .then((json) => {
      return json.results;
    });
};

export const getPopularMovies = async (args) => {
  const [, pagePart] = args.queryKey;
  const { page } = pagePart;
  return fetch(
    `${baseUrl}movie/popular?api_key=${process.env.REACT_APP_TMDB_KEY}&language=${lang}&page=${page}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
    .catch((error) => {
      throw error;
    });
};

export const getUpcoming = async (args) => {
  const [, pagePart] = args.queryKey;
  const { page } = pagePart;
  return fetch(
    `${baseUrl}movie/upcoming?api_key=${process.env.REACT_APP_TMDB_KEY}&language=${lang}&page=${page}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
    .catch((error) => {
      throw error;
    });
};

export const getTopRatedMovies = async (args) => {
  const [, pagePart] = args.queryKey;
  const { page } = pagePart;
  return fetch(
    `${baseUrl}movie/top_rated?api_key=${process.env.REACT_APP_TMDB_KEY}&language=${lang}&page=${page}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
    .catch((error) => {
      throw error;
    });
};


export const getTV = async (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  return fetch(
    `${baseUrl}tv/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}&language=${lang}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
    .catch((error) => {
      throw error;
    });
};

export const getPopularTV = async () => {
  return fetch(
    `${baseUrl}tv/popular?api_key=${process.env.REACT_APP_TMDB_KEY}&language=${lang}&page=1`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
    .catch((error) => {
      throw error;
    });
};

export const getPerson = async (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  return fetch(
    `${baseUrl}person/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}&language=${lang}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
    .catch((error) => {
      throw error;
    });
};