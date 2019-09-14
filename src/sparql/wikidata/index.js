export const findMoviesByYearAndGenre = (genre, yearFrom, yearTo) =>
  `SELECT DISTINCT ?result WHERE {
    ?genre wdt:P31 wd:Q201658;
    rdfs:label ?genre_name.
    FILTER(lang(?genre_name) = 'en' && regex(?genre_name, "${genre}", "i"))
    ?result wdt:P31 wd:Q11424;
    wdt:P577 ?date;
    wdt:P136 ?genre;
    FILTER(year(?date) >= ${yearFrom} && year(?date) <= ${yearTo})
}`;

export const findActorAwards = actor =>
  `SELECT ?result WHERE {
    ?actor wdt:P106 wd:Q33999;
    rdfs:label "${actor}"@en;
    wdt:P166 ?award.
    ?award rdfs:label ?result.
    FILTER(lang(?result) = 'en')
}`;

export const findActorNominations = actor =>
  `SELECT ?result WHERE {
    ?actor wdt:P106 wd:Q33999;
    rdfs:label "${actor}"@en;
    wdt:P1411 ?nomination.
    ?nomination rdfs:label ?result.
    FILTER(lang(?result) = 'en')
}`;

export const findDirectorAwards = director =>
  `SELECT ?result WHERE {
    ?director wdt:P106 wd:Q2526255;
    rdfs:label "${director}"@en;
    wdt:P166 ?award.
    ?award rdfs:label ?result.
    FILTER(lang(?result) = 'en')
}`;

export const findDirectorNominations = director =>
  `SELECT ?result WHERE {
    ?director wdt:P106 wd:Q2526255;
    rdfs:label "${director}"@en;
    wdt:P1411 ?nomination.
    ?nomination rdfs:label ?result.
    FILTER(lang(?result) = 'en')
}`;

export const findDirectorImage = director =>
  `SELECT ?result WHERE {
  ?director wdt:P106 wd:Q2526255;
            rdfs:label "${director}"@en;
            wdt:P18 ?result.
}`;

export const findActorImage = actor =>
  `SELECT ?result WHERE {
  ?actor wdt:P106 wd:Q10800557;
         rdfs:label "${actor}"@en;
         wdt:P18 ?result.
}`;

export const runWikidataQuery = query =>
  fetch(
    `https://query.wikidata.org/sparql?format=json&query=${query}`
  ).then(response => response.json());
