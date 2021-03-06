// @flow
import * as React from 'react';
import _isEmpty from 'lodash/isEmpty';
import { PERSON_ROUTE } from 'app/navigation/routes';
import { constructUrl } from 'app/navigation/util';
import { PanelButton } from 'app/styles';
import type { Person } from 'app/api/sparql/flow';

type Props = {
  rdfProperty?: string,
  header: string,
  people: Person[],
};

const PeopleSection = ({ rdfProperty, header, people }: Props): React.Node => {
  const [expanded, setExpanded] = React.useState(false);

  const onPanelClick = React.useCallback(() => setExpanded(!expanded), [
    expanded,
  ]);

  const iconClassName = expanded ? 'fa-minus' : 'fa-plus';

  return (
    !_isEmpty(people) && (
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
            <span>{`(${people.length})`}</span>
          </PanelButton>
        </div>
        <ul className="collapse" id={header}>
          {people.map(({ resource, name, id }: Person) => (
            <li key={name}>
              {id ? (
                <a href={constructUrl(PERSON_ROUTE.path, [id])}>{name}</a>
              ) : (
                <span>{name}</span>
              )}
              {rdfProperty && resource && (
                <meta property={rdfProperty} resource={resource} />
              )}
              <meta about={resource} property="rdfs:label" content={name} />
            </li>
          ))}
        </ul>
      </React.Fragment>
    )
  );
};

export default PeopleSection;
