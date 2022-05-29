//

export function getListMovies(size, movies) {
  const moviesList = [];

  for (let i = 0; i < size; i++) {
    moviesList.push(movies[i]);
  }

  return moviesList;
}

export function randomBanner(movie) {
  return Math.floor(Math.random() * movie.length);
}
