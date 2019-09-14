import * as React from "react";

const AchievementsSection = props => {
  const { header, achievements } = props;

  return (
    achievements.length > 0 && (
      <React.Fragment>
        <h4>{header}:</h4>
        <ul>
          {achievements.map(achievement => (
            <li key={achievement}>{achievement}</li>
          ))}
        </ul>
      </React.Fragment>
    )
  );
};

export default AchievementsSection;
