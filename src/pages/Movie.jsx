import * as React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { searchMovie } from "../omdb";
import {
  findMovieActors,
  findPersonId,
  runWikidataQuery
} from "../sparql/wikidata";
import {
  extractMultipleColumnsQueryResults,
  extractQueryResult
} from "../util";
import { showSpinner, hideSpinner } from "../redux/spinner/actions";
import imageNotFound from "../image_not_found.png";
import PeopleSection from "./section/PeopleSection";

const MoviePoster = styled.img`
  width: 100%;
  height: 500px;
`;

const Movie = props => {
  const { showSpinner, hideSpinner } = props;
  const [movie, setMovie] = React.useState(null);
  const [directors, setDirectors] = React.useState([]);
  const [cast, setCast] = React.useState(null);
  const [fetchingFinished, setFetchingFinished] = React.useState(false);

  React.useEffect(() => {
    showSpinner();

    searchMovie()
      .then(response => response.json())
      .then(response => {
        const { Director, imdbID, Response, Error } = response;

        if (Response === "True") {
          setMovie(response);

          const promise = Director.split(", ").reduce(
            (promise, name) =>
              promise.then(() =>
                runWikidataQuery(findPersonId(name)).then(response => {
                  const id = extractQueryResult(response);
                  setDirectors(prevState => [...prevState, { id, name }]);
                })
              ),
            new Promise(resolve => resolve())
          );

          return promise.then(() => imdbID);
        }

        setFetchingFinished(true);
        hideSpinner();

        return Promise.reject(Error);
      })
      .then(imdbID => {
        return runWikidataQuery(findMovieActors(imdbID));
      })
      .then(response => {
        setCast(extractMultipleColumnsQueryResults(response));
        setFetchingFinished(true);
        hideSpinner();
      })
      .catch(console.log);
  }, [showSpinner, hideSpinner]);

  const formatActorName = React.useCallback(
    name =>
      [...name.toLowerCase()]
        .map(character =>
          character >= "a" && character <= "z" ? character : ""
        )
        .join(""),
    []
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
      Actors
    } = movie;

    const actorToIdMap = {};

    cast.forEach(({ name, id }) => {
      actorToIdMap[formatActorName(name)] = id;
    });

    const stars = Actors.split(", ")
      .map(name => ({
        name,
        id: actorToIdMap[formatActorName(name)]
      }))
      .filter(actor => actor.id);

    const NOT_AVAILABLE = "N/A";

    const image = Poster !== NOT_AVAILABLE ? Poster : imageNotFound;

    return (
      <React.Fragment>
        <MoviePoster src={image} />
        <h1 className="text-center my-5">
          {Title} ({Year})
        </h1>
        {Plot !== NOT_AVAILABLE && <h5 className="my-5">{Plot}</h5>}
        <div className="d-flex">
          <div className="col">
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
          <div className="col">
            <PeopleSection header="Directors" people={directors} />
            <PeopleSection header="Stars" people={stars} />
          </div>
        </div>
      </React.Fragment>
    );
  }

  return null;
};

const mapDispatchToProps = {
  showSpinner,
  hideSpinner
};

export default connect(
  null,
  mapDispatchToProps
)(Movie);
