// @flow

export const runSpotlightQuery = (text: string) =>
  fetch(
    `https://api.dbpedia-spotlight.org/en/annotate?text=${text}&confidence=0`,
    { headers: { Accept: 'application/json' } },
  ).then(response => response.json());
