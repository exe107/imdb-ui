// @flow
import * as React from 'react';
import styled from 'styled-components';
import _isEmpty from 'lodash/isEmpty';
import { PERSON_ROUTE } from 'app/navigation/routes';
import { constructUrl } from 'app/navigation/util';
import type { Person } from 'app/flow';

const PanelButton = styled.button`
  min-width: 200px;
`;

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
        <h4>
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
        </h4>
        <ul className="collapse" id={header}>
          {people.map(({ name, id }: Person) => (
            <li key={name}>
              <h4>
                {id ? (
                  <a href={constructUrl(PERSON_ROUTE.path, [id])}>{name}</a>
                ) : (
                  <span>{name}</span>
                )}
              </h4>
            </li>
          ))}
        </ul>
      </React.Fragment>
    )
  );
};

export default PeopleSection;
