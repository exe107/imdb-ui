// @flow
import * as React from 'react';
import styled from 'styled-components';
import { NOT_AVAILABLE } from 'app/constants';
import { constructUrl, redirect } from 'app/navigation/util';
import { MOVIE_ROUTE } from 'app/navigation/routes';
import imageNotFound from 'app/images/image_not_found.png';
import type { BaseMovieDetails } from 'app/api/omdb/flow';

const Image = styled.img`
  :hover {
    cursor: pointer;
  }
`;

type Props = {
  movie: BaseMovieDetails,
  isLastResult: boolean,
  ordinal: number,
};

const MovieResult = ({ movie, isLastResult, ordinal }: Props) => {
  const { imdbID, Title, Year, Poster } = movie;
  const image = Poster !== NOT_AVAILABLE ? Poster : imageNotFound;
  const movieUrl = constructUrl(MOVIE_ROUTE.path, [], { id: imdbID });
  const onImageClick = React.useCallback(() => redirect(movieUrl), [movieUrl]);

  return (
    <React.Fragment>
      <div className="d-flex">
        <Image src={image} width={100} alt="" onClick={onImageClick} />
        <div className="ml-3">
          <div className="mb-2">
            <h5 className="d-inline">{`${ordinal}.`}</h5>
            <h5 className="d-inline">
              <a className="ml-1" href={movieUrl}>
                {Title}
              </a>
            </h5>
          </div>
          <h5>{`Year: ${Year}`}</h5>
        </div>
      </div>
      {!isLastResult && <hr />}
    </React.Fragment>
  );
};

export default MovieResult;
