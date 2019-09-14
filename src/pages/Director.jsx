import * as React from "react";
import { connect } from "react-redux";
import { showSpinner, hideSpinner } from "../redux/spinner/actions";
import { findPersonAbstract, runDbpediaQuery } from "../sparql/dbpedia";
import {
  findDirectorAwards,
  findDirectorImage,
  findDirectorNominations,
  findMoviesByDirector,
  findMoviesByWriter,
  runWikidataQuery
} from "../sparql/wikidata";
import {
  extractMoviesQueryResults,
  extractQueryResult,
  extractQueryResults
} from "../util";
import { PersonImage } from "../common";
import imageNotFound from "../image_not_found.png";
import MoviesSection from "./MoviesSection";
import AchievementsSection from "./AchievementsSection";

const Director = props => {
  const { match, showSpinner, hideSpinner } = props;
  const { name } = match.params;

  const [abstract, setAbstract] = React.useState(null);
  const [imageUrl, setImageUrl] = React.useState(null);
  const [nominations, setNominations] = React.useState(null);
  const [awards, setAwards] = React.useState(null);
  const [moviesDirected, setMoviesDirected] = React.useState(null);
  const [moviesWritten, setMoviesWritten] = React.useState(null);
  const [fetchingFinished, setFetchingFinished] = React.useState(false);

  React.useEffect(() => {
    showSpinner();

    runDbpediaQuery(findPersonAbstract(name))
      .then(response => {
        setAbstract(extractQueryResult(response));
        return runWikidataQuery(findDirectorImage(name));
      })
      .then(response => {
        setImageUrl(extractQueryResult(response));
        return runWikidataQuery(findDirectorNominations(name));
      })
      .then(response => {
        setNominations(extractQueryResults(response));
        return runWikidataQuery(findDirectorAwards(name));
      })
      .then(response => {
        setAwards(extractQueryResults(response));
        return runWikidataQuery(findMoviesByDirector(name));
      })
      .then(response => {
        setMoviesDirected(extractMoviesQueryResults(response));
        return runWikidataQuery(findMoviesByWriter(name));
      })
      .then(response => {
        setMoviesWritten(extractMoviesQueryResults(response));
        hideSpinner();
        setFetchingFinished(true);
      })
      .catch(console.log);
  }, [name, showSpinner, hideSpinner]);

  return (
    fetchingFinished && (
      <React.Fragment>
        <div className="row">
          <div className="col">
            <PersonImage src={imageUrl || imageNotFound} />
            <MoviesSection header="Movies directed" movies={moviesDirected} />
            <MoviesSection header="Movies written" movies={moviesWritten} />
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
)(Director);
