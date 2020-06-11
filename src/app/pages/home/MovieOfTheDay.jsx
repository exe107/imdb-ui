// @flow
import * as React from 'react';
import styled from 'styled-components';
import { NOT_AVAILABLE } from 'app/constants';
import { MOVIE_ROUTE } from 'app/navigation/routes';
import { constructUrl, redirect } from 'app/navigation/util';
import imageNotFound from 'app/images/image_not_found.png';
import type { MovieDetailsResponse } from 'app/api/omdb/flow';

const ImageContainer = styled.div`
  position: relative;
  cursor: pointer;
  border-width: 3px !important;
`;

const Image = styled.img`
  opacity: ${props => (props.hovered ? '0.1' : '1')};
  transition: opacity 0.25s;
`;

const MovieDetails = styled.div`
  position: absolute;
  top: 0;
  width: 90%;
  margin: 0 5%;
`;

type Props = {
  movie: MovieDetailsResponse,
};

const MovieOfTheDay = ({ movie }: Props) => {
  const [hovered, setHovered] = React.useState(false);

  const { imdbID, Poster, Title, Genre, imdbRating } = movie;
  const image = Poster !== NOT_AVAILABLE ? Poster : imageNotFound;

  const onImageMouseEnter = React.useCallback(() => setHovered(true), []);
  const onImageMouseLeave = React.useCallback(() => setHovered(false), []);

  const onMovieClick = React.useCallback(() => {
    const url = constructUrl(MOVIE_ROUTE.path, [], { id: imdbID });
    redirect(url);
  }, [imdbID]);

  const borderClassName = hovered ? 'border-primary' : 'border-secondary';

  return (
    <ImageContainer
      className={`w-25 border rounded ${borderClassName}`}
      onMouseEnter={onImageMouseEnter}
      onMouseLeave={onImageMouseLeave}
      onClick={onMovieClick}
    >
      <Image className="w-100 h-100" src={image} hovered={hovered} />
      {hovered && (
        <MovieDetails className="h-100 d-flex flex-column justify-content-center">
          <h5>{Title}</h5>
          <h5>{`Genre: ${Genre}`}</h5>
          {imdbRating !== NOT_AVAILABLE && (
            <h5>
              <span>{`Rating: ${imdbRating}`}</span>
              <i className="text-warning fa fa-star ml-1" />
            </h5>
          )}
        </MovieDetails>
      )}
    </ImageContainer>
  );
};

export default MovieOfTheDay;
