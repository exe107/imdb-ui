// @flow

export const runSpotlightQuery = (text: string) =>
  fetch(
    `https://api.dbpedia-spotlight.org/en/annotate?text=${text}&confidence=0&types=DBpedia:Person`,
    { headers: { Accept: 'application/json' } },
  ).then(response => response.json());
