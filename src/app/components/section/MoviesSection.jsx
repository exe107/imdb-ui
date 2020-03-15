// @flow
import * as React from 'react';
import _isEmpty from 'lodash/isEmpty';
import { MOVIE_ROUTE } from 'app/navigation/routes';
import { constructUrl } from 'app/navigation/util';
import type { Movie } from 'app/api/sparql/flow';

type Props = {
  rdfProperty: string,
  rdfSubject: string,
  header: string,
  movies: Movie[],
};

const MoviesSection = ({
  rdfProperty,
  rdfSubject,
  header,
  movies,
}: Props): React.Node => {
  return (
    !_isEmpty(movies) && (
      <div className="mr-5">
        <h4>{header}:</h4>
        <ul>
          {movies.map(({ resource, name, id, year }: Movie) => {
            const label = year ? `${name} (${year})` : name;

            return (
              <li key={name} about={resource}>
                {id ? (
                  <a href={constructUrl(MOVIE_ROUTE.path, [], { id })}>
                    {label}
                  </a>
                ) : (
                  <span>{label}</span>
                )}
                <meta property={rdfProperty} resource={rdfSubject} />
                <meta property="rdfs:label" content={name} />
              </li>
            );
          })}
        </ul>
      </div>
    )
  );
};

export default MoviesSection;
