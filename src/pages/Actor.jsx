import * as React from "react";

const Actor = props => {
  const {
    match: { params }
  } = props;

  return <div>{params.name}</div>;
};

export default Actor;
