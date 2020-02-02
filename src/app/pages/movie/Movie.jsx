// @flow
import * as React from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { searchMovie } from 'app/movies/omdb';
import {
  findMovieActors,
  findPersonId,
  runWikidataQuery,
} from 'app/movies/wikidata';
import {
  extractPeopleQueryResults,
  extractQuerySingleResult,
} from 'app/movies/util';
import { asyncOperation } from 'app/redux/util';
import { getComments } from 'app/http';
import { getUser } from 'app/redux/user/selectors';
import { addError } from 'app/redux/errors/actions';
import imageNotFound from 'app/images/image_not_found.png';
import PeopleSection from 'app/components/section/PeopleSection';
import MovieRatingStar from 'app/pages/movie/MovieRatingStar';
import WatchlistButton from 'app/pages/movie/WatchlistButton';
import Comments from 'app/pages/movie/comments/Comments';
import type { MovieDetails, Person, SparqlResponse } from 'app/flow';
import type { User } from 'app/redux/user/flow';
import type { AddErrorAction, ApiError } from 'app/redux/errors/flow';

const MoviePoster = styled.img`
  height: 700px;
`;

type Props = {
  user: User,
  location: Object,
  addError: ApiError => AddErrorAction,
};

const Movie = ({ user, location }: Props): React.Node => {
  const [movie, setMovie] = React.useState<?MovieDetails>();
  const [directors, setDirectors] = React.useState([]);
  const [cast, setCast] = React.useState([]);
  const [comments, setComments] = React.useState([]);
  const [fetchingFinished, setFetchingFinished] = React.useState(false);

  React.useEffect(() => {
    asyncOperation(() =>
      searchMovie(location.search)
        .then((response: MovieDetails) => {
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

          const commentsPromise = getComments(imdbID)
            .then(setComments)
            .catch(addError);

          return Promise.all([actorsPromise, commentsPromise]);
        }),
    ).then(() => setFetchingFinished(true));

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
      Actors,
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

    const NOT_AVAILABLE = 'N/A';
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
      <React.Fragment>
        <div className="d-flex justify-content-center">
          <MoviePoster src={image} />
        </div>
        <div className="text-center my-5">
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
        {Plot !== NOT_AVAILABLE && (
          <h5 className="my-5 text-justify px-5">{Plot}</h5>
        )}
        <div className="d-flex justify-content-between px-5">
          <div>
            {imdbRating !== NOT_AVAILABLE && (
              <h4>
                Rating: {imdbRating} <i className="text-warning fa fa-star" /> (
                {imdbVotes} votes)
              </h4>
            )}
            <h4>Genre: {Genre}</h4>
            {Runtime !== NOT_AVAILABLE && <h4>Runtime: {Runtime}</h4>}
            {Released !== NOT_AVAILABLE && <h4>Released: {Released}</h4>}
            <h4>Language: {Language}</h4>
            {Website !== NOT_AVAILABLE && (
              <h4 className="text-break">
                Website: <a href={Website}>{Website}</a>
              </h4>
            )}
            <Comments user={user} movie={userMovie} comments={comments} />
          </div>
          <div className="list-group">
            <PeopleSection header="Directors" people={directors} />
            <PeopleSection header="Stars" people={stars} />
            <PeopleSection header="Cast" people={cast} />
          </div>
        </div>
      </React.Fragment>
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
