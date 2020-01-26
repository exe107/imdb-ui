// @flow
import * as React from 'react';
import styled from 'styled-components';
import { findPersonAbstract, runDbpediaQuery } from 'app/movies/dbpedia';
import {
  findPersonImage,
  findMoviesByDirector,
  findMoviesByWriter,
  runWikidataQuery,
  findPersonNominations,
  findPersonAwards,
  findPersonName,
  findMoviesByActor,
} from 'app/movies/wikidata';
import {
  extractMoviesQueryResults,
  extractQuerySingleResult,
  extractQueryMultipleResults,
} from 'app/movies/util';
import imageNotFound from 'app/images/image_not_found.png';
import MoviesSection from 'app/components/section/MoviesSection';
import AchievementsSection from 'app/components/section/AchievementsSection';
import type { SparqlResponse } from 'app/flow';
import { asyncOperation } from 'app/redux/util';

const PersonImage = styled.img`
  width: 100%;
  margin-bottom: 20px;
`;

const Person = (props: Object): React.Node => {
  const { match } = props;
  const { id } = match.params;

  const [abstract, setAbstract] = React.useState();
  const [imageUrl, setImageUrl] = React.useState();
  const [nominations, setNominations] = React.useState([]);
  const [awards, setAwards] = React.useState([]);
  const [moviesDirected, setMoviesDirected] = React.useState([]);
  const [moviesWritten, setMoviesWritten] = React.useState([]);
  const [moviesActedIn, setMoviesActedIn] = React.useState([]);
  const [fetchingFinished, setFetchingFinished] = React.useState(false);

  React.useEffect(() => {
    const abstractPromise = runWikidataQuery(findPersonName(id)).then(
      (response: SparqlResponse): Promise<SparqlResponse> => {
        const name = extractQuerySingleResult(response);
        return runDbpediaQuery(findPersonAbstract(name));
      },
    );

    const promises = Promise.all([
      abstractPromise,
      runWikidataQuery(findPersonImage(id)),
      runWikidataQuery(findPersonNominations(id)),
      runWikidataQuery(findPersonAwards(id)),
      runWikidataQuery(findMoviesByDirector(id)),
      runWikidataQuery(findMoviesByWriter(id)),
      runWikidataQuery(findMoviesByActor(id)),
    ]);

    asyncOperation(() =>
      promises
        .then(
          ([
            abstractResponse,
            imageResponse,
            nominationsResponse,
            awardsResponse,
            moviesDirectedResponse,
            moviesWrittenResponse,
            moviesActedInResponse,
          ]: Array<SparqlResponse>) => {
            setAbstract(extractQuerySingleResult(abstractResponse));
            setImageUrl(extractQuerySingleResult(imageResponse));
            setNominations(extractQueryMultipleResults(nominationsResponse));
            setAwards(extractQueryMultipleResults(awardsResponse));
            setMoviesDirected(
              extractMoviesQueryResults(moviesDirectedResponse),
            );
            setMoviesWritten(extractMoviesQueryResults(moviesWrittenResponse));
            setMoviesActedIn(extractMoviesQueryResults(moviesActedInResponse));
          },
        )
        .catch(console.log)
        .then(() => setFetchingFinished(true)),
    );
  }, [id]);

  return (
    fetchingFinished && (
      <div className="row">
        <div className="col">
          <PersonImage src={imageUrl || imageNotFound} />
          <MoviesSection header="Movies directed" movies={moviesDirected} />
          <MoviesSection header="Movies written" movies={moviesWritten} />
          <MoviesSection header="Movies acted in" movies={moviesActedIn} />
        </div>
        <div className="col">
          <h4>About:</h4>
          <p>{abstract}</p>
          <AchievementsSection header="Awards" achievements={awards} />
          <AchievementsSection
            header="Nominations"
            achievements={nominations}
          />
        </div>
      </div>
    )
  );
};

export default Person;
