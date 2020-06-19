// @flow
import * as React from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import _isEmpty from 'lodash/isEmpty';
import movieTrailer from 'movie-trailer';
import { getMovie } from 'app/api/omdb';
import {
  findMovieActors,
  findMovieDirectors,
  findResource,
  runWikidataQuery,
} from 'app/api/sparql/wikidata';
import {
  extractPeopleQueryResults,
  extractResourceQuerySingleResult,
} from 'app/api/util';
import { createActorsMap, formatActorName } from 'app/pages/movie/util';
import { NOT_AVAILABLE } from 'app/constants';
import { asyncOperation } from 'app/redux/util';
import { getReviews } from 'app/http';
import { getUser } from 'app/redux/user/selectors';
import { addErrorAction } from 'app/redux/errors/actions';
import imageNotFound from 'app/images/image_not_found.png';
import { Container } from 'app/styles';
import PeopleSection from 'app/pages/movie/PeopleSection';
import MovieRatingStar from 'app/pages/movie/MovieRatingStar';
import WatchlistButton from 'app/pages/movie/WatchlistButton';
import Reviews from 'app/pages/movie/reviews/Reviews';
import type { User } from 'app/redux/user/flow';
import type { AddErrorAction, ApiError } from 'app/redux/errors/flow';
import type { MovieDetailsResponse } from 'app/api/omdb/flow';
import type { SparqlResponse } from 'app/api/sparql/flow';

const MoviePoster = styled.img`
  height: 300px;
`;

const Trailer = styled.iframe`
  width: 100%;
  height: 70vh;
`;

type Props = {
  user: User,
  location: Object,
  addError: ApiError => AddErrorAction,
};

const Movie = ({ user, location, addError }: Props): React.Node => {
  const [movieResource, setMovieResource] = React.useState();
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

          if (Response !== 'True') {
            return Promise.reject(Error);
          }

          setMovie(response);

          const movieResourcePromise = runWikidataQuery(findResource(imdbID))
            .then((movieResourceResponse: SparqlResponse) => {
              const { resource } = extractResourceQuerySingleResult(
                movieResourceResponse,
              );

              setMovieResource(resource);
            })
            .catch(console.log);

          const actorsPromise = runWikidataQuery(findMovieActors(imdbID))
            .then(actorsResponse =>
              setCast(extractPeopleQueryResults(actorsResponse)),
            )
            .catch(console.log);

          const directorsPromise = runWikidataQuery(findMovieDirectors(imdbID))
            .then(directorsResponse =>
              setDirectors(extractPeopleQueryResults(directorsResponse)),
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
            movieResourcePromise,
            actorsPromise,
            directorsPromise,
            reviewsPromise,
            trailerPromise,
          ]);
        })
        .catch(console.log)
        .then(() => setFetchingFinished(true)),
    );
  }, [location.search, addError]);

  const actorsMap = React.useMemo(
    () => createActorsMap([...cast, ...directors]),
    [cast, directors],
  );

  if (!fetchingFinished) {
    return null;
  }

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
    Awards,
    Actors,
    Country,
    BoxOffice,
    Production,
  } = movie;

  const stars = Actors.split(', ').map(name => ({
    name,
    ...actorsMap[formatActorName(name)],
  }));

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

  const filmCrewExists =
    !_isEmpty(cast) || !_isEmpty(directors) || !_isEmpty(stars);

  return (
    <div className="px-5" about={movieResource}>
      <div className="text-center mb-5">
        <h2 className="d-inline">{`${Title} (${Year})`}</h2>
        <meta property="rdfs:label" content={Title} />
        {user && (
          <React.Fragment>
            <MovieRatingStar user={user} movie={userMovie} />
            <WatchlistButton movie={userMovie} watchlist={user.watchlist} />
          </React.Fragment>
        )}
      </div>
      {trailer && (
        <React.Fragment>
          <Trailer
            src={trailer}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <meta
            property="wdt:P1651"
            content={trailer.split('/').slice(-1)[0]}
          />
        </React.Fragment>
      )}
      <Container className="d-flex mt-5">
        <div>
          <h4>Movie details</h4>
          {imdbRating !== NOT_AVAILABLE && (
            <div property="rev:rating" content={imdbRating}>
              {`Rating: ${imdbRating}`}
              <i className="ml-2 mr-1 text-warning fa fa-star" />
              {`(${imdbVotes} votes)`}
            </div>
          )}
          <div>{`Genre: ${Genre}`}</div>
          {Runtime !== NOT_AVAILABLE && (
            <div property="wdt:P2047" content={Runtime}>
              {`Runtime: ${Runtime}`}
            </div>
          )}
          {Released !== NOT_AVAILABLE && (
            <div property="wdt:P577" content={Released}>
              {`Released: ${Released}`}
            </div>
          )}
          {Language !== NOT_AVAILABLE && (
            <React.Fragment>
              <div>{`Language: ${Language}`}</div>
              {Language.split(', ').map(language => (
                <meta key={language} property="wdt:P364" content={language} />
              ))}
            </React.Fragment>
          )}
          {Country !== NOT_AVAILABLE && (
            <React.Fragment>
              <div>{`Country: ${Country}`}</div>
              {Country.split(', ').map(country => (
                <meta key={country} property="wdt:P495" content={country} />
              ))}
            </React.Fragment>
          )}
          {BoxOffice !== NOT_AVAILABLE && (
            <div property="wdt:P2142" content={BoxOffice}>
              {`Box Office: ${BoxOffice}`}
            </div>
          )}
          {Production !== NOT_AVAILABLE && (
            <div property="wdt:P272" content={Production}>
              {`Production: ${Production}`}
            </div>
          )}
          {Awards !== NOT_AVAILABLE && <div>{Awards}</div>}
        </div>
        {image && <MoviePoster className="ml-auto" src={image} />}
      </Container>
      {Plot !== NOT_AVAILABLE && (
        <Container>
          <h4>Plot</h4>
          <div className="text-justify">{Plot}</div>
        </Container>
      )}
      {filmCrewExists && (
        <Container>
          <h4>Film crew</h4>
          <div className="list-group">
            <PeopleSection
              rdfProperty="wdt:P57"
              header="Directors"
              people={directors}
            />
            <PeopleSection header="Stars" people={stars} />
            <PeopleSection rdfProperty="wdt:P161" header="Cast" people={cast} />
          </div>
        </Container>
      )}
      <Container>
        <h4>Reviews</h4>
        <Reviews user={user} movie={userMovie} reviews={reviews} />
      </Container>
    </div>
  );
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
