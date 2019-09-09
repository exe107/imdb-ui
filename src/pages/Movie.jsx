import * as React from "react";
import { connect } from "react-redux";
import { showSpinner, hideSpinner } from "../redux/spinner/actions";
import { searchByTitle } from "../omdb";

const Movie = props => {
  const {
    match: { params },
    showSpinner
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
  }, [params.title, showSpinner]);

  return movie && <div>{movie.title}</div>;
};

const mapDispatchToProps = {
  showSpinner,
  hideSpinner
};

export default connect(
  null,
  mapDispatchToProps
)(Movie);
