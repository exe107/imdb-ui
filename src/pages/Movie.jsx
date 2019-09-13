import * as React from "react";
import { connect } from "react-redux";
import { showSpinner, hideSpinner } from "../redux/spinner/actions";
import { searchByTitle } from "../omdb";
import styled from "styled-components";
import { constructUrl } from "../util";
import { ACTOR_ROUTE, DIRECTOR_ROUTE } from "../navigation/routes";

const MoviePoster = styled.img`
  width: 100%;
  height: 500px;
`;

const Movie = props => {
  const {
    match: { params },
    showSpinner,
    hideSpinner
  } = props;

  const [movie, setMovie] = React.useState(null);

  React.useEffect(() => {
    showSpinner();

    searchByTitle(params.title)
      .then(response => response.json())
      .then(response => {
        setMovie(response);
        hideSpinner();
      })
      .catch(error => console.log(error));
  }, [params.title, showSpinner, hideSpinner]);

  if (!movie) {
    return null;
  };

  const {
    Poster,
    Title,
    Year,
    Plot,
    imdbRating,
    imdbVotes,
    Genre,
    Runtime,
    Released,
    Website,
    Director,
    Actors
  } = movie;

  return (
    <React.Fragment>
      <MoviePoster src={Poster} />
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
          {Website !== "N/A" && (
            <h4>
              Website: <a href={Website}>{Website}</a>
            </h4>
          )}
        </div>
        <div className="col">
          <h4>
            <a href={constructUrl(DIRECTOR_ROUTE.path, [Director])}>
              {Director}
            </a>
          </h4>
          <h4>Stars:</h4>
          <ul>
            {Actors.split(", ").map(actor => (
              <li>
                <h4>
                  <a href={constructUrl(ACTOR_ROUTE.path, [actor])}>{actor}</a>
                </h4>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapDispatchToProps = {
  showSpinner,
  hideSpinner
};

export default connect(
  null,
  mapDispatchToProps
)(Movie);
