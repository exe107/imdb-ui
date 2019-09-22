import * as React from "react";
import { connect } from "react-redux";
import {
  findMoviesByYearAndGenre,
  runWikidataQuery
} from "../../sparql/wikidata";
import { extractMultipleColumnsQueryResults } from "../../util";
import { showSpinner, hideSpinner } from "../../redux/spinner/actions";
import MoviesSearchResults from "./MoviesSearchResults";
import { StyledInput } from "../../common";

const MoviesSearch = props => {
  const { showSpinner, hideSpinner } = props;
  const [genre, setGenre] = React.useState();
  const [yearFrom, setYearFrom] = React.useState();
  const [yearTo, setYearTo] = React.useState();
  const [movies, setMovies] = React.useState();
  const [sortKey, setSortKey] = React.useState("year");
  const [sortOrder, setSortOrder] = React.useState("DESC");

  const comparator = React.useCallback(
    (first, second) => {
      const orderSign = sortOrder === "DESC" ? -1 : 1;
      let sign;

      if (first[sortKey] < second[sortKey]) {
        sign = -1;
      } else if (first[sortKey] > second[sortKey]) {
        sign = 1;
      } else {
        sign = 0;
      }

      return orderSign * sign;
    },
    [sortOrder, sortKey]
  );

  const sortedMovies = React.useMemo(() => {
    if (!movies) {
      return null;
    }

    return movies.sort(comparator);
  }, [movies, comparator]);

  const MOVIE_GENRES = React.useMemo(
    () => [
      { name: "Comedy", keyword: "comedy" },
      { name: "Science Fiction", keyword: "science fiction" },
      { name: "Horror", keyword: "horror" },
      { name: "Romance", keyword: "roman" },
      { name: "Action", keyword: "action" },
      { name: "Thriller", keyword: "thriller" },
      { name: "Drama", keyword: "drama" },
      { name: "Mystery", keyword: "mystery" },
      { name: "Crime", keyword: "crime" },
      { name: "Animation", keyword: "animat" },
      { name: "Adventure", keyword: "adventure" },
      { name: "Fantasy", keyword: "fantasy" },
      { name: "Superhero", keyword: "superhero" }
    ],
    []
  );

  const SORT_KEYS = React.useMemo(() => ["year", "name"], []);
  const SORT_ORDERS = React.useMemo(() => ["ASC", "DESC"], []);

  const onSortKeyClick = React.useCallback(
    event => setSortKey(event.target.value),
    []
  );

  const onSortOrderClick = React.useCallback(
    event => setSortOrder(event.target.value),
    []
  );

  const onSearchClick = React.useCallback(() => {
    setMovies(null);
    showSpinner();

    runWikidataQuery(findMoviesByYearAndGenre(genre, yearFrom, yearTo)).then(
      response => {
        setMovies(extractMultipleColumnsQueryResults(response));
        hideSpinner();
      }
    );
  }, [genre, yearFrom, yearTo, showSpinner, hideSpinner]);

  return (
    <React.Fragment>
      <div className="d-flex">
        <form className="form-inline mx-auto">
          <div className="form-group mr-5">
            <label htmlFor="genre">Genre:</label>
            <select
              className="form-control ml-3"
              id="genre"
              defaultValue=""
              onChange={event => setGenre(event.target.value || undefined)}
            >
              <option value="">Choose a genre</option>
              {MOVIE_GENRES.map(({ name, keyword }) => (
                <option key={keyword} value={keyword}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group mr-5">
            <label htmlFor="yearFrom">From (year):</label>
            <StyledInput
              className="form-control ml-3"
              id="yearFrom"
              type="number"
              onBlur={event => setYearFrom(event.target.value || undefined)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="yearTo">To (year):</label>
            <StyledInput
              className="form-control ml-3"
              id="yearTo"
              type="number"
              onBlur={event => setYearTo(event.target.value || undefined)}
            />
          </div>
          <button
            className="btn btn-primary ml-3"
            type="button"
            onClick={onSearchClick}
          >
            Search
          </button>
        </form>
      </div>
      {movies && (
        <React.Fragment>
          <MoviesSearchResults movies={sortedMovies}>
            <div className="d-flex align-items-baseline">
              Sort by:
              {SORT_KEYS.map(key => (
                <div className="ml-3" key={key}>
                  <input
                    className="mr-1"
                    type="radio"
                    name="sortKey"
                    id={key}
                    value={key}
                    checked={key === sortKey}
                    onChange={onSortKeyClick}
                  />
                  <label htmlFor={key} className="text-capitalize">
                    {key}
                  </label>
                </div>
              ))}
              <select
                className="ml-3"
                value={sortOrder}
                onChange={onSortOrderClick}
              >
                {SORT_ORDERS.map(order => (
                  <option key={order} value={order}>
                    {order}
                  </option>
                ))}
              </select>
            </div>
          </MoviesSearchResults>
        </React.Fragment>
      )}
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
)(MoviesSearch);
