// @flow
import * as React from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import movieTrailer from 'movie-trailer';
import { getMovie } from 'app/api/omdb';
import {
  findMovieActors,
  findMovieDirectors,
  runWikidataQuery,
} from 'app/api/sparql/wikidata';
import { extractPeopleQueryResults } from 'app/api/util';
import { NOT_AVAILABLE } from 'app/constants';
import { asyncOperation } from 'app/redux/util';
import { getReviews } from 'app/http';
import { getUser } from 'app/redux/user/selectors';
import { addErrorAction } from 'app/redux/errors/actions';
import imageNotFound from 'app/images/image_not_found.png';
import PeopleSection from 'app/components/section/PeopleSection';
import MovieRatingStar from 'app/pages/movie/MovieRatingStar';
import WatchlistButton from 'app/pages/movie/WatchlistButton';
import Reviews from 'app/pages/movie/reviews/Reviews';
import type { User } from 'app/redux/user/flow';
import type { AddErrorAction, ApiError } from 'app/redux/errors/flow';
import type { MovieDetailsResponse } from 'app/api/omdb/flow';
import type { Person } from 'app/api/sparql/flow';

const MoviePoster = styled.img`
  height: 400px;
`;

const Trailer = styled.iframe`
  width: 100%;
  height: calc(100vh - 220px);
`;

type Props = {
  user: User,
  location: Object,
  addError: ApiError => AddErrorAction,
};

const Movie = ({ user, location, addError }: Props): React.Node => {
  const [movie, setMovie] = React.useState<?MovieDetailsResponse>();
  const [directors, setDirectors] = React.useState([]);
  const [cast, setCast] = React.useState([]);
  const [reviews, setReviews] = React.useState([]);
  const [trailer, setTrailer] = React.useState();
  const [fetchingFinished, setFetchingFinished] = React.useState(false);

  React.useEffect(() => {
    asyncOperation(() =>
      getMovie(location.search)
        .then((response: MovieDetailsResponse) => {
          const { imdbID, Response, Error, Title, Year } = response;

          if (Response === 'True') {
            setMovie(response);

            const actorsPromise = runWikidataQuery(findMovieActors(imdbID))
              .then(response => setCast(extractPeopleQueryResults(response)))
              .catch(console.log);

            const directorsPromise = runWikidataQuery(
              findMovieDirectors(imdbID),
            )
              .then(response =>
                setDirectors(extractPeopleQueryResults(response)),
              )
              .catch(console.log);

            const reviewsPromise = getReviews(imdbID)
              .then(setReviews)
              .catch(addError);

            const trailerPromise = movieTrailer(Title, {
              year: Year,
            })
              .then((trailerResponse: string) =>
                setTrailer(trailerResponse.replace('watch?v=', 'embed/')),
              )
              .catch(console.log);

            return Promise.all([
              actorsPromise,
              directorsPromise,
              reviewsPromise,
              trailerPromise,
            ]);
          }

          return Promise.reject(Error);
        })
        .catch(console.log)
        .then(() => setFetchingFinished(true)),
    );

    return () => {
      setDirectors([]);
      setFetchingFinished(false);
    };
  }, [location.search, addError]);

  // removes non alphabetic characters from name for easier matching between cast and stars
  const formatActorName = React.useCallback(
    name =>
      [...name.toLowerCase()]
        .map(character =>
          character >= 'a' && character <= 'z' ? character : '',
        )
        .join(''),
    [],
  );

  if (fetchingFinished) {
    if (!movie) {
      return <h1 className="alert alert-danger">No information available</h1>;
    }

    const {
      imdbID,
      Poster,
      Title,
      Year,
      Plot,
      imdbRating,
      imdbVotes,
      Genre,
      Runtime,
      Language,
      Released,
      Website,
      Awards,
      Actors,
      Country,
      BoxOffice,
      Production,
    } = movie;

    const actorToIdMap = {};

    cast.forEach(({ name, id }: Person) => {
      actorToIdMap[formatActorName(name)] = id;
    });

    const stars = Actors.split(', ')
      .map(name => ({
        name,
        id: actorToIdMap[formatActorName(name)],
      }))
      .filter(actor => actor.id);

    const image = Poster !== NOT_AVAILABLE ? Poster : imageNotFound;
    const runtimeMinutes = Runtime.split(' ')[0];

    const userMovie = {
      id: imdbID,
      name: Title,
      year: Number(Year),
      genres: Genre.split(', '),
      imageUrl: Poster,
      rating: Number(imdbRating) || null,
      runtime: Number(runtimeMinutes) || null,
    };

    return (
      <div className="px-5">
        <div className="text-center mb-5">
          <h1 className="d-inline">
            {Title} ({Year})
          </h1>
          {user && (
            <React.Fragment>
              <MovieRatingStar user={user} movie={userMovie} />
              <WatchlistButton movie={userMovie} watchlist={user.watchlist} />
            </React.Fragment>
          )}
        </div>
        {trailer && (
          <Trailer
            src={trailer}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
        <div className="d-flex mt-5">
          <MoviePoster className="mr-5" src={image} />
          <div>
            {imdbRating !== NOT_AVAILABLE && (
              <h5>
                Rating: {imdbRating} <i className="text-warning fa fa-star" /> (
                {imdbVotes} votes)
              </h5>
            )}
            <h5>Genre: {Genre}</h5>
            {Runtime !== NOT_AVAILABLE && <h5>Runtime: {Runtime}</h5>}
            {Released !== NOT_AVAILABLE && <h5>Released: {Released}</h5>}
            <h5>Language: {Language}</h5>
            {Website !== NOT_AVAILABLE && (
              <h5 className="text-break">
                Website: <a href={Website}>{Website}</a>
              </h5>
            )}
            {Country !== NOT_AVAILABLE && <h5>Country: {Country}</h5>}
            {BoxOffice !== NOT_AVAILABLE && <h5>Box Office: {BoxOffice}</h5>}
            {Production !== NOT_AVAILABLE && <h5>Production: {Production}</h5>}
            {Awards !== NOT_AVAILABLE && <h5>{Awards}</h5>}
          </div>
        </div>
        {Plot !== NOT_AVAILABLE && (
          <h5 className="my-5 text-justify">{Plot}</h5>
        )}
        <div className="d-flex justify-content-between">
          <Reviews user={user} movie={userMovie} reviews={reviews} />
          <div className="list-group">
            <PeopleSection header="Directors" people={directors} />
            <PeopleSection header="Stars" people={stars} />
            <PeopleSection header="Cast" people={cast} />
          </div>
        </div>
      </div>
    );
  }

  return null;
};

const mapStateToProps = state => ({
  user: getUser(state),
});

const mapDispatchToProps = {
  addError: addErrorAction,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withRouter,
)(Movie);
