import * as React from "react";
import { connect } from "react-redux";
import {
  findPersonAbstract,
  runDbpediaQuery
} from "../sparql/dbpedia";
import { extractMoviesQueryResults, extractQueryResult, extractQueryResults } from "../util";
import {
  findActorAwards,
  findActorImage,
  findActorNominations, findMoviesByActor,
  runWikidataQuery
} from "../sparql/wikidata";
import { PersonImage } from "../common";
import { showSpinner, hideSpinner } from "../redux/spinner/actions";
import imageNotFound from "../image_not_found.png";
import MoviesSection from "./MoviesSection";
import AchievementsSection from "./AchievementsSection";

const Actor = props => {
  const { match, showSpinner, hideSpinner } = props;
  const { name } = match.params;

  const [abstract, setAbstract] = React.useState(null);
  const [imageUrl, setImageUrl] = React.useState(null);
  const [nominations, setNominations] = React.useState(null);
  const [awards, setAwards] = React.useState(null);
  const [moviesActedIn, setMoviesActedIn] = React.useState(null);
  const [fetchingFinished, setFetchingFinished] = React.useState(false);

  React.useEffect(() => {
    showSpinner();

    runDbpediaQuery(findPersonAbstract(name))
      .then(response => {
        setAbstract(extractQueryResult(response));
        return runWikidataQuery(findActorImage(name));
      })
      .then(response => {
        setImageUrl(extractQueryResult(response));
        return runWikidataQuery(findActorNominations(name));
      })
      .then(response => {
        setNominations(extractQueryResults(response));
        return runWikidataQuery(findActorAwards(name));
      })
      .then(response => {
        setAwards(extractQueryResults(response));
        return runWikidataQuery(findMoviesByActor(name));
      })
      .then(response => {
        setMoviesActedIn(extractMoviesQueryResults(response));
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
            <MoviesSection header="Movies" movies={moviesActedIn} />
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
)(Actor);
