// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { asyncOperation } from 'app/redux/util';
import { getMovieById } from 'app/api/omdb';
import { getMoviesOfTheDay } from 'app/redux/movies-of-the-day/selectors';
import MovieOfTheDay from 'app/pages/home/MovieOfTheDay';
import type { MovieDetailsResponse } from 'app/api/omdb/flow';

type Props = {
  moviesOfTheDay: string[],
};

const Home = ({ moviesOfTheDay }: Props) => {
  const [movies, setMovies] = React.useState();

  React.useEffect(() => {
    const promises = Promise.all(moviesOfTheDay.map(getMovieById));
    asyncOperation(() => promises.then(setMovies).catch(console.log));
  }, [moviesOfTheDay]);

  if (!movies) {
    return null;
  }

  return (
    <React.Fragment>
      <h1 className="text-center mb-5">Movies of the day</h1>
      <div className="d-flex justify-content-around">
        {movies.map((movie: MovieDetailsResponse) => (
          <MovieOfTheDay key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  moviesOfTheDay: getMoviesOfTheDay(state),
});

export default connect(mapStateToProps)(Home);
