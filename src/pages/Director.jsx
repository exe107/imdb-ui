import * as React from "react";

const Director = props => {
  const {
    match: { params }
  } = props;

  return <div>{params.name}</div>;
};

export default Director;
