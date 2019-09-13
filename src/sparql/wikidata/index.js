export const findMoviesByActor = actor =>
  `SELECT ?movie WHERE {
    ?actor wdt:P106 wd:Q10800557;
    rdfs:label "${actor}"@en.
    ?movie wdt:P31 wd:Q11424;
    wdt:P161 ?actor
}`;

export const findMoviesByYearAndGenre = (genre, yearFrom, yearTo) =>
  `SELECT DISTINCT ?movie WHERE {
    ?genre wdt:P31 wd:Q201658;
    rdfs:label ?genre_name.
    FILTER(lang(?genre_name) = 'en' && regex(?genre_name, "${genre}", "i"))
    ?movie wdt:P31 wd:Q11424;
    wdt:P577 ?date;
    wdt:P136 ?genre;
    FILTER(year(?date) >= ${yearFrom} && year(?date) <= ${yearTo})
}`;

export const findDirectorAwards = director =>
  `SELECT ?label WHERE {
    ?director wdt:P106 wd:Q2526255;
    rdfs:label "${director}"@en;
    wdt:P166 ?award.
    ?award rdfs:label ?label.
    FILTER(lang(?label) = 'en')
}`;

export const findDirectorNominations = director =>
  `SELECT ?label WHERE {
    ?director wdt:P106 wd:Q2526255;
    rdfs:label "${director}"@en;
    wdt:P1411 ?nomination.
    ?nomination rdfs:label ?label.
    FILTER(lang(?label) = 'en')
}`;
