// @flow
import * as React from 'react';
import _isEmpty from 'lodash/isEmpty';
import { PERSON_ROUTE } from 'app/navigation/routes';
import { constructUrl } from 'app/navigation/util';
import type { Person } from 'app/flow';

type Props = {
  header: string,
  people: Person[],
};

const PeopleSection = ({ header, people }: Props): React.Node =>
  !_isEmpty(people) && (
    <React.Fragment>
      <h4>{header}:</h4>
      <ul>
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
  );

export default PeopleSection;
