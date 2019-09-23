import "font-awesome/css/font-awesome.min.css";
import * as React from "react";
import { constructUrl } from "../util";
import { history } from "../redux/history";
import { MOVIE_ROUTE } from "../navigation/routes";

const Home = () => {
  const [movie, setMovie] = React.useState("");

  const onSearchClick = React.useCallback(() => {
    history.push(constructUrl(MOVIE_ROUTE.path, [], { title: movie }));
  }, [movie]);

  return (
    <div className="full-screen">
      <div className="input-group">
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
