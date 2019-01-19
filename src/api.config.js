const API_KEY = 'c480223c4eb38128bb4061a1cd75fcbc'
const POPULAR_MOVIES = 'https://api.themoviedb.org/3/movie/popular?api_key={api_key}&language={language}&page={page}'
const MOVIE_DETAIL = 'https://api.themoviedb.org/3/movie/{movie_id}?api_key={api_key}&language={language}'
const BASE_IMG = 'https://image.tmdb.org/t/p/original/'

const GENRES = genre => {
  console.log(genre)
  return genre.map(g => g.name).join('/')
}

export {
  API_KEY,
  BASE_IMG,
  GENRES,
  POPULAR_MOVIES,
  MOVIE_DETAIL
}
