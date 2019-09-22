import * as React from "react";
import { constructUrl } from "../../util";
import { MOVIE_ROUTE } from "../../navigation/routes";

const MovieResult = props => {
  const { ordinal, movie } = props;
  const { id, name, year } = movie;

  return (
    <h4>
      {`${ordinal}. `}
      <a href={constructUrl(MOVIE_ROUTE.path, [], { id })}>
        {name} ({year})
      </a>
    </h4>
  );
};

export default MovieResult;
