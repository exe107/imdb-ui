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
  findResource,
  findMoviesByActor,
} from 'app/api/sparql/wikidata';
import { runSpotlightQuery } from 'app/api/spotlight';
import {
  extractMoviesQueryResults,
  extractQuerySingleResult,
  isResponseEmpty,
  extractResourceQueryResults,
  extractResourceQuerySingleResult,
} from 'app/api/util';
import { asyncOperation } from 'app/redux/util';
import MoviesSection from 'app/pages/person/MoviesSection';
import AchievementsSection from 'app/pages/person/AchievementsSection';
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

  const [personName, setPersonName] = React.useState('');
  const [personWikidataResource, setPersonWikidataResource] = React.useState();
  const [personDbpediaResource, setPersonDbpediaResource] = React.useState();
  const [abstract, setAbstract] = React.useState();
  const [imageUrl, setImageUrl] = React.useState();
  const [nominations, setNominations] = React.useState([]);
  const [awards, setAwards] = React.useState([]);
  const [moviesDirected, setMoviesDirected] = React.useState([]);
  const [moviesWritten, setMoviesWritten] = React.useState([]);
  const [moviesActedIn, setMoviesActedIn] = React.useState([]);
  const [fetchingFinished, setFetchingFinished] = React.useState(false);

  React.useEffect(() => {
    const resolveAbstract = async () => {
      const wikidataResourceResponse = await runWikidataQuery(findResource(id));

      const {
        name,
        resource: wikidataResource,
      } = extractResourceQuerySingleResult(wikidataResourceResponse);

      setPersonName(name);
      setPersonWikidataResource(wikidataResource);

      const dbpediaAbstractResponse = await runDbpediaQuery(
        findPersonAbstractBySameAs(`<${wikidataResource}>`),
      );

      if (isResponseEmpty(dbpediaAbstractResponse)) {
        const spotlightResponse: SpotlightResponse = await runSpotlightQuery(
          name,
        );

        const { Resources } = spotlightResponse;
        const dbpediaResource = Resources[0]['@URI'];
        setPersonDbpediaResource(dbpediaResource);

        const abstractResponse = await runDbpediaQuery(
          findPersonAbstract(`<${dbpediaResource}>`),
        );

        setAbstract(extractQuerySingleResult(abstractResponse));
      } else {
        const {
          resource: resourceBinding,
          abstract: abstractBinding,
        } = dbpediaAbstractResponse.results.bindings[0];

        setPersonDbpediaResource(resourceBinding.value);
        setAbstract(abstractBinding.value);
      }
    };

    asyncOperation(async () => {
      await resolveAbstract().catch(console.log);

      return Promise.all([
        runWikidataQuery(findPersonImage(id)),
        runWikidataQuery(findPersonNominations(id)),
        runWikidataQuery(findPersonAwards(id)),
        runWikidataQuery(findMoviesByDirector(id)),
        runWikidataQuery(findMoviesByWriter(id)),
        runWikidataQuery(findMoviesByActor(id)),
      ])
        .then(
          ([
            imageResponse,
            nominationsResponse,
            awardsResponse,
            moviesDirectedResponse,
            moviesWrittenResponse,
            moviesActedInResponse,
          ]: Array<SparqlResponse>) => {
            setImageUrl(extractQuerySingleResult(imageResponse));
            setNominations(extractResourceQueryResults(nominationsResponse));
            setAwards(extractResourceQueryResults(awardsResponse));
            setMoviesDirected(
              extractMoviesQueryResults(moviesDirectedResponse),
            );
            setMoviesWritten(extractMoviesQueryResults(moviesWrittenResponse));
            setMoviesActedIn(extractMoviesQueryResults(moviesActedInResponse));
          },
        )
        .catch(console.log)
        .then(() => setFetchingFinished(true));
    });
  }, [id]);

  if (!fetchingFinished) {
    return null;
  }

  if (!personWikidataResource) {
    return <h1 className="alert alert-danger">No information available</h1>;
  }

  return (
    <React.Fragment>
      {imageUrl && (
        <React.Fragment>
          <PersonImage src={imageUrl} />
          <meta
            about={personWikidataResource}
            property="wdt:P18"
            content={imageUrl}
          />
        </React.Fragment>
      )}
      {abstract ? (
        <React.Fragment>
          <h4>About</h4>
          <p about={personDbpediaResource} property="dbo:abstract">
            {abstract}
          </p>
        </React.Fragment>
      ) : (
        <h4 className="mb-5">{`No bio available for ${personName}`}</h4>
      )}
      <meta
        about={personDbpediaResource}
        property="owl:sameAs"
        resource={personWikidataResource}
      />
      <div about={personWikidataResource}>
        <AchievementsSection
          rdfProperty="wdt:P166"
          header="Awards"
          achievements={awards}
        />
        <AchievementsSection
          rdfProperty="wdt:P1411"
          header="Nominations"
          achievements={nominations}
        />
        <div className="d-flex">
          <MoviesSection
            rdfProperty="wdt:P161"
            rdfSubject={personWikidataResource}
            header="Movies acted in"
            movies={moviesActedIn}
          />
          <MoviesSection
            rdfProperty="wdt:P57"
            rdfSubject={personWikidataResource}
            header="Movies directed"
            movies={moviesDirected}
          />
          <MoviesSection
            rdfProperty="wdt:P58"
            rdfSubject={personWikidataResource}
            header="Movies written"
            movies={moviesWritten}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Person;
