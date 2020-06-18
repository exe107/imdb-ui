// @flow
type Resource = {
  '@URI': string,
  '@surfaceForm': string,
};

export type SpotlightResponse = {
  Resources: Resource[],
};
