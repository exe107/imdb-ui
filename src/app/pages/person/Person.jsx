// @flow
import * as React from 'react';
import styled from 'styled-components';
import {
  findPersonAbstract,
  findPersonAbstractBySameAs,
  runDbpediaQuery,
} from 'app/api/sparql/dbpedia';
import {
  findPersonImage,
  findMoviesByDirector,
  findMoviesByWriter,
  runWikidataQuery,
  findPersonNominations,
  findPersonAwards,
  findPersonResource,
  findMoviesByActor,
  findPersonName,
} from 'app/api/sparql/wikidata';
import { runSpotlightQuery } from 'app/api/spotlight';
import {
  extractMoviesQueryResults,
  extractQuerySingleResult,
  extractQueryMultipleResults,
  isResponseEmpty,
} from 'app/api/util';
import { asyncOperation } from 'app/redux/util';
import imageNotFound from 'app/images/image_not_found.png';
import MoviesSection from 'app/components/section/MoviesSection';
import AchievementsSection from 'app/components/section/AchievementsSection';
import type { SparqlResponse } from 'app/api/sparql/flow';
import type { SpotlightResponse } from 'app/api/spotlight/flow';

const PersonImage = styled.img`
  max-width: 500px;
  height: 500px;
  margin-bottom: 20px;
  margin-left: 20px;
  float: right;
`;

const Person = (props: Object): React.Node => {
  const { match } = props;
  const { id } = match.params;

  const [personResource, setPersonResource] = React.useState();
  const [abstract, setAbstract] = React.useState();
  const [imageUrl, setImageUrl] = React.useState();
  const [nominations, setNominations] = React.useState([]);
  const [awards, setAwards] = React.useState([]);
  const [moviesDirected, setMoviesDirected] = React.useState([]);
  const [moviesWritten, setMoviesWritten] = React.useState([]);
  const [moviesActedIn, setMoviesActedIn] = React.useState([]);
  const [fetchingFinished, setFetchingFinished] = React.useState(false);

  React.useEffect(() => {
    const abstractPromise = runWikidataQuery(findPersonResource(id))
      .then((response: SparqlResponse): Promise<SparqlResponse> => {
        const resource = extractQuerySingleResult(response);
        setPersonResource(resource); // TODO: fix incorrect person resource

        return runDbpediaQuery(findPersonAbstractBySameAs(`<${resource}>`));
      })
      .then((response: SparqlResponse) => {
        if (!isResponseEmpty(response)) {
          return response;
        }

        return runWikidataQuery(findPersonName(id))
          .then((response: SparqlResponse) => {
            const name = extractQuerySingleResult(response);

            return runSpotlightQuery(name);
          })
          .then(({ Resources }: SpotlightResponse) => {
            const resource = Resources[0]['@URI'];
            setPersonResource(resource);

            return runDbpediaQuery(findPersonAbstract(`<${resource}>`));
          });
      });

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

  if (!fetchingFinished) {
    return null;
  }

  if (!personResource) {
    return <h1 className="alert alert-danger">No information available</h1>;
  }

  return (
    <div about={personResource}>
      <PersonImage src={imageUrl || imageNotFound} />
      <div>
        <h4>About:</h4>
        <p property="dbo:abstract">{abstract}</p>
        <AchievementsSection header="Awards" achievements={awards} />
        <AchievementsSection header="Nominations" achievements={nominations} />
        <MoviesSection header="Movies directed" movies={moviesDirected} />
        <MoviesSection header="Movies written" movies={moviesWritten} />
        <MoviesSection header="Movies acted in" movies={moviesActedIn} />
      </div>
    </div>
  );
};

export default Person;
