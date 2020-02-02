// @flow
import * as React from 'react';
import _isEmpty from 'lodash/isEmpty';
import { PERSON_ROUTE } from 'app/navigation/routes';
import { constructUrl } from 'app/navigation/util';
import { PanelButton } from 'app/styled';
import type { Person } from 'app/flow';

type Props = {
  header: string,
  people: Person[],
};

const PeopleSection = ({ header, people }: Props): React.Node => {
  const [expanded, setExpanded] = React.useState(false);

  const onPanelClick = React.useCallback(() => setExpanded(!expanded), [
    expanded,
  ]);

  const iconClassName = expanded ? 'fa-minus' : 'fa-plus';

  return (
    !_isEmpty(people) && (
      <React.Fragment>
        <h5>
          <PanelButton
            className="list-group-item list-group-item-action"
            data-toggle="collapse"
            data-target={`#${header}`}
            onClick={onPanelClick}
          >
            <i className={`fa ${iconClassName} mr-2`} />
            <span className="mr-2">{header}</span>
            <span>({people.length})</span>
          </PanelButton>
        </h5>
        <ul className="collapse" id={header}>
          {people.map(({ name, id }: Person) => (
            <li key={name}>
              <h5>
                {id ? (
                  <a href={constructUrl(PERSON_ROUTE.path, [id])}>{name}</a>
                ) : (
                  <span>{name}</span>
                )}
              </h5>
            </li>
          ))}
        </ul>
      </React.Fragment>
    )
  );
};

export default PeopleSection;
