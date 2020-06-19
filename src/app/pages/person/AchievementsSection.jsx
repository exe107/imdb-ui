// @flow
import * as React from 'react';
import _isEmpty from 'lodash/isEmpty';
import { Container } from 'app/styles';
import type { Resource } from 'app/api/sparql/flow';

type Props = {
  rdfProperty: string,
  header: string,
  achievements: Resource[],
};

const AchievementsSection = ({
  rdfProperty,
  header,
  achievements,
}: Props): React.Node =>
  !_isEmpty(achievements) && (
    <Container>
      <h4>{header}</h4>
      <ul>
        {achievements.map(({ resource, name }: Resource) => (
          <li key={name} property={rdfProperty} resource={resource}>
            {name}
          </li>
        ))}
      </ul>
    </Container>
  );

export default AchievementsSection;
