// @flow
import * as React from 'react';
import styled from 'styled-components';
import { asyncOperation } from 'common/util';
import { searchMovie } from 'movies/omdb';
import {
  findMovieActors,
  findPersonId,
  runWikidataQuery,
} from 'movies/wikidata';
import {
  extractPeopleQueryResults,
  extractQuerySingleResult,
} from 'movies/util';
import imageNotFound from 'images/image_not_found.png';
import PeopleSection from 'common/components/PeopleSection';
import type { MovieDetails, Person, SparqlResponse } from 'flow';

const MoviePoster = styled.img`
  height: 700px;
`;

const Movie = (): React.Node => {
  const [movie, setMovie] = React.useState<?MovieDetails>();
  const [directors, setDirectors] = React.useState([]);
  const [cast, setCast] = React.useState([]);
  const [fetchingFinished, setFetchingFinished] = React.useState(false);

  React.useEffect(() => {
    asyncOperation(() =>
      searchMovie()
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
        .then(imdbID => runWikidataQuery(findMovieActors(imdbID)))
        .then(response => setCast(extractPeopleQueryResults(response)))
        .catch(console.log)
        .then(() => setFetchingFinished(true)),
    );
  }, []);

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

    return (
      <React.Fragment>
        <div className="d-flex justify-content-center">
          <MoviePoster src={image} />
        </div>
        <h1 className="text-center my-5">
          {Title} ({Year})
        </h1>
        {Plot !== NOT_AVAILABLE && (
          <h5 className="my-5 text-justify px-5">{Plot}</h5>
        )}
        <div className="d-flex justify-content-around px-5">
          <div>
            <h4>
              Rating: {imdbRating} <i className="text-warning fa fa-star" /> (
              {imdbVotes} votes)
            </h4>
            <h4>Genre: {Genre}</h4>
            <h4>Runtime: {Runtime}</h4>
            <h4>Released: {Released}</h4>
            <h4>Language: {Language}</h4>
            {Website !== NOT_AVAILABLE && (
              <h4 className="text-break">
                Website: <a href={Website}>{Website}</a>
              </h4>
            )}
            <PeopleSection header="Cast" people={cast} />
          </div>
          <div>
            <PeopleSection header="Directors" people={directors} />
            <PeopleSection header="Stars" people={stars} />
          </div>
        </div>
      </React.Fragment>
    );
  }

  return null;
};

export default Movie;