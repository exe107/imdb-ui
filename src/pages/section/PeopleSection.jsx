import * as React from "react";
import { constructUrl } from "../../util";
import { PERSON_ROUTE } from "../../navigation/routes";

const PeopleSection = props => {
  const { header, people } = props;

  return (
    people.length > 0 && (
      <React.Fragment>
        <h4>{header}:</h4>
        <ul>
          {people.map(({ name, id }) => (
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