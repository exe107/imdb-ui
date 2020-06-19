// @flow
import * as React from 'react';
import _isEmpty from 'lodash/isEmpty';
import { MOVIE_ROUTE } from 'app/navigation/routes';
import { constructUrl } from 'app/navigation/util';
import { PanelButton } from 'app/styles';
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
  const [expanded, setExpanded] = React.useState(false);

  const onPanelClick = React.useCallback(() => setExpanded(!expanded), [
    expanded,
  ]);

  const iconClassName = expanded ? 'fa-minus' : 'fa-plus';

  return (
    !_isEmpty(movies) && (
      <React.Fragment>
        <div>
          <PanelButton
            className="list-group-item list-group-item-action bg-light"
            data-toggle="collapse"
            data-target={`#${header}`}
            onClick={onPanelClick}
          >
            <i className={`fa ${iconClassName} mr-2`} />
            <span className="mr-2">{header}</span>
            <span>{`(${movies.length})`}</span>
          </PanelButton>
        </div>
        <ul className="collapse" id={header}>
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
      </React.Fragment>
    )
  );
};

export default MoviesSection;
