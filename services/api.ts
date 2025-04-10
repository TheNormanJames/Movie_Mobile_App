console.log(process.env.EXPO_PUBLIC_MOVIE_API_KEY);

export const TMDB_CONFIG = {
  BASE_URL: 'https://api.themoviedb.org/3',
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
};

export const fetchMovies = async ({
  query,
}: {
  query: string;
}): Promise<Movie[]> => {
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

  const response = await fetch(endpoint, {
    method: 'GET',
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch movies: ${response.statusText}`);
  }

  const data = await response.json();
  return data.results;
};

// const url =
//   'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization:
//       'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NGY5MTAyZTdmZmYyZjZmMjk5YmRmZGVkNDlhYjY0NCIsIm5iZiI6MTc0NDMxOTAyOS45MTEsInN1YiI6IjY3ZjgzMjM1ZDgxNzQ4Y2NmZjk5NzNlMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.o6HWqJSKJy-rp6wRgKjo7_Nlmfw6YPE126qU77fDSN0',
//   },
// };

// fetch(url, options)
//   .then((res) => res.json())
//   .then((json) => console.log(json))
//   .catch((err) => console.error(err));
