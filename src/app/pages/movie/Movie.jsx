// @flow
import * as React from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { getMovie } from 'app/api/omdb';
import {
  findMovieActors,
  findPersonId,
  runWikidataQuery,
} from 'app/api/sparql/wikidata';
import {
  extractPeopleQueryResults,
  extractQuerySingleResult,
} from 'app/api/util';
import { NOT_AVAILABLE } from 'app/constants';
import { asyncOperation } from 'app/redux/util';
import { getReviews } from 'app/http';
import { getUser } from 'app/redux/user/selectors';
import { addError } from 'app/redux/errors/actions';
import imageNotFound from 'app/images/image_not_found.png';
import PeopleSection from 'app/components/section/PeopleSection';
import MovieRatingStar from 'app/pages/movie/MovieRatingStar';
import WatchlistButton from 'app/pages/movie/WatchlistButton';
import Reviews from 'app/pages/movie/reviews/Reviews';
import type { User } from 'app/redux/user/flow';
import type { AddErrorAction, ApiError } from 'app/redux/errors/flow';
import type { MovieDetailsResponse } from 'app/api/omdb/flow';
import type { Person, SparqlResponse } from 'app/api/sparql/flow';

const MoviePoster = styled.img`
  height: 400px;
`;

type Props = {
  user: User,
  location: Object,
  addError: ApiError => AddErrorAction,
};

const Movie = ({ user, location }: Props): React.Node => {
  const [movie, setMovie] = React.useState<?MovieDetailsResponse>();
  const [directors, setDirectors] = React.useState([]);
  const [cast, setCast] = React.useState([]);
  const [reviews, setReviews] = React.useState([]);
  const [fetchingFinished, setFetchingFinished] = React.useState(false);

  React.useEffect(() => {
    asyncOperation(() =>
      getMovie(location.search)
        .then((response: MovieDetailsResponse) => {
          const { Director, imdbID, Response, Error } = response;

          if (Response === 'True') {
            setMovie(response);

            const promise = Director.split(', ').reduce(
              (promise, name) =>
                promise.then(() =>
                  runWikidataQuery(findPersonId(name)).then(
                    (response: SparqlResponse) => {
                      const id = extractQuerySingleResult(response);
                      setDirectors(prevState => [...prevState, { id, name }]);
                    },
                  ),
                ),
              Promise.resolve(),
            );

            return promise.then(() => imdbID);
          }

          return Promise.reject(Error);
        })
        .then(imdbID => {
          const actorsPromise = runWikidataQuery(findMovieActors(imdbID))
            .then(response => setCast(extractPeopleQueryResults(response)))
            .catch(console.log);

          const reviewsPromise = getReviews(imdbID)
            .then(setReviews)
            .catch(addError);

          return Promise.all([actorsPromise, reviewsPromise]);
        })
        .catch(console.log)
        .then(() => setFetchingFinished(true)),
    );

    return () => {
      setDirectors([]);
      setFetchingFinished(false);
    };
  }, [location.search]);

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
        <div className="d-flex">
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
  addError,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withRouter,
)(Movie);
