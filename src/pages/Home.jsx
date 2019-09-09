import "font-awesome/css/font-awesome.min.css";
import * as React from "react";
import { history } from "../redux/history";
import { MOVIE_ROUTE } from "../navigation/routes";

const Home = () => {
  const [movie, setMovie] = React.useState("");

  const onSearchClick = React.useCallback(() => {
    history.push(
      MOVIE_ROUTE.path
        .split("/")
        .map(urlSegment => (urlSegment.startsWith(":") ? movie : urlSegment))
        .join("/")
    );
  }, [movie]);

  return (
    <div className="d-flex full-screen">
      <div className="input-group m-auto">
        <div className="input-group-prepend">
          <button className="btn btn-secondary" onClick={onSearchClick}>
            <i className="fa fa-search" />
          </button>
        </div>
        <input
          className="form-control"
          placeholder="Search for a movie"
          onBlur={event => setMovie(event.target.value)}
        />
      </div>
    </div>
  );
};

export default Home;
