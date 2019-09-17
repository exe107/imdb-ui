import * as React from "react";
import { connect } from "react-redux";
import { showSpinner, hideSpinner } from "../redux/spinner/actions";
import { findPersonAbstract, runDbpediaQuery } from "../sparql/dbpedia";
import {
  findPersonImage,
  findMoviesByDirector,
  findMoviesByWriter,
  runWikidataQuery,
  findPersonNominations,
  findPersonAwards,
  findPersonName,
  findMoviesByActor
} from "../sparql/wikidata";
import {
  extractMultipleColumnsQueryResults,
  extractQueryResult,
  extractQueryResults
} from "../util";
import { PersonImage } from "../common";
import imageNotFound from "../image_not_found.png";
import MoviesSection from "./MoviesSection";
import AchievementsSection from "./AchievementsSection";

const Person = props => {
  const { match, showSpinner, hideSpinner } = props;
  const { id } = match.params;

  const [abstract, setAbstract] = React.useState(null);
  const [imageUrl, setImageUrl] = React.useState(null);
  const [nominations, setNominations] = React.useState(null);
  const [awards, setAwards] = React.useState(null);
  const [moviesDirected, setMoviesDirected] = React.useState(null);
  const [moviesWritten, setMoviesWritten] = React.useState(null);
  const [moviesActedIn, setMoviesActedIn] = React.useState(null);
  const [fetchingFinished, setFetchingFinished] = React.useState(false);

  React.useEffect(() => {
    showSpinner();

    runWikidataQuery(findPersonName(id))
      .then(response => {
        const name = extractQueryResult(response);
        return runDbpediaQuery(findPersonAbstract(name));
      })
      .then(response => {
        setAbstract(extractQueryResult(response));
        return runWikidataQuery(findPersonImage(id));
      })
      .then(response => {
        setImageUrl(extractQueryResult(response));
        return runWikidataQuery(findPersonNominations(id));
      })
      .then(response => {
        setNominations(extractQueryResults(response));
        return runWikidataQuery(findPersonAwards(id));
      })
      .then(response => {
        setAwards(extractQueryResults(response));
        return runWikidataQuery(findMoviesByDirector(id));
      })
      .then(response => {
        setMoviesDirected(extractMultipleColumnsQueryResults(response));
        return runWikidataQuery(findMoviesByWriter(id));
      })
      .then(response => {
        setMoviesWritten(extractMultipleColumnsQueryResults(response));
        return runWikidataQuery(findMoviesByActor(id));
      })
      .then(response => {
        console.log(response.results.bindings);
        setMoviesActedIn(extractMultipleColumnsQueryResults(response));
        hideSpinner();
        setFetchingFinished(true);
      })
      .catch(console.log);
  }, [id, showSpinner, hideSpinner]);

  return (
    fetchingFinished && (
      <React.Fragment>
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
      </React.Fragment>
    )
  );
};

const mapDispatchToProps = {
  showSpinner,
  hideSpinner
};

export default connect(
  null,
  mapDispatchToProps
)(Person);
