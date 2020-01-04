// @flow
import * as React from 'react';
import _isEmpty from 'lodash/isEmpty';

type Props = {
  header: string,
  achievements: string[],
};

const AchievementsSection = ({ header, achievements }: Props): React.Node =>
  !_isEmpty(achievements) && (
    <React.Fragment>
      <h4>{header}:</h4>
      <ul>
        {achievements.map(achievement => (
          <li key={achievement}>{achievement}</li>
        ))}
      </ul>
    </React.Fragment>
  );

export default AchievementsSection;
