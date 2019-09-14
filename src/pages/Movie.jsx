import * as React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { searchMovie } from "../omdb";
import { findMovieActors, runWikidataQuery } from "../sparql/wikidata";
import { ACTOR_ROUTE, DIRECTOR_ROUTE } from "../navigation/routes";
import { constructUrl, extractQueryResults } from "../util";
import { showSpinner, hideSpinner } from "../redux/spinner/actions";
import imageNotFound from "../image_not_found.png";

const MoviePoster = styled.img`
  width: 100%;
  height: 500px;
`;

const Movie = props => {
  const { showSpinner, hideSpinner } = props;
  const [movie, setMovie] = React.useState(null);
  const [cast, setCast] = React.useState(null);
  const [fetchingFinished, setFetchingFinished] = React.useState(false);

  React.useEffect(() => {
    showSpinner();

    searchMovie()
      .then(response => response.json())
      .then(response => {
        const { Response, Error } = response;

        if (Response === "True") {
          setMovie(response);
          return response.imdbID;
        }

        setFetchingFinished(true);
        hideSpinner();
        return Promise.reject(Error);
      })
      .then(imdbID => {
        return runWikidataQuery(findMovieActors(imdbID));
      })
      .then(response => {
        setCast(extractQueryResults(response));
        setFetchingFinished(true);
        hideSpinner();
      })
      .catch(console.log);
  }, [showSpinner, hideSpinner]);

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
      Director,
      Actors
    } = movie;

    const image = Poster !== "N/A" ? Poster : imageNotFound;

    return (
      <React.Fragment>
        <MoviePoster src={image} />
        <h1 className="text-center my-5">
          {Title} ({Year})
        </h1>
        <h5 className="my-5">{Plot}</h5>
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
            <h4>
              Website: <a href={Website}>{Website}</a>
            </h4>
            <h4>Cast:</h4>
            <ul>
              {cast.map(actor => (
                <li key={actor}>
                  <h4>
                    <a href={constructUrl(ACTOR_ROUTE.path, [actor])}>
                      {actor}
                    </a>
                  </h4>
                </li>
              ))}
            </ul>
          </div>
          <div className="col">
            <h4>
              Director:
              <a href={constructUrl(DIRECTOR_ROUTE.path, [Director])}>
                {` ${Director}`}
              </a>
            </h4>
            <h4>Stars:</h4>
            <ul>
              {Actors.split(", ").map(actor => (
                <li key={actor}>
                  <h4>
                    <a href={constructUrl(ACTOR_ROUTE.path, [actor])}>
                      {actor}
                    </a>
                  </h4>
                </li>
              ))}
            </ul>
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
