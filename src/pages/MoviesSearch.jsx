import * as React from "react";
import { connect } from "react-redux";
import { findMoviesByYearAndGenre, runWikidataQuery } from "../sparql/wikidata";
import { extractMultipleColumnsQueryResults } from "../util";
import { showSpinner, hideSpinner } from "../redux/spinner/actions";
import MoviesSearchResults from "./MoviesSearchResults";
import { StyledInput } from "../common";

const MoviesSearch = props => {
  const { showSpinner, hideSpinner } = props;
  const [genre, setGenre] = React.useState();
  const [yearFrom, setYearFrom] = React.useState();
  const [yearTo, setYearTo] = React.useState();
  const [movies, setMovies] = React.useState();

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

  const onSearchClick = React.useCallback(() => {
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
              onChange={event => setGenre(event.target.value)}
            >
              <option value="" disabled>
                Choose a genre
              </option>
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
      {movies && <MoviesSearchResults movies={movies} />}
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
