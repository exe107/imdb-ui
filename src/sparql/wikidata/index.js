export const findMovieActors = imdbID =>
  `SELECT DISTINCT ?result WHERE {
     ?movie wdt:P31 wd:Q11424;
            wdt:P345 "${imdbID}";
            wdt:P161 ?actor.
     ?actor rdfs:label ?result.
     filter(lang(?result) = 'en')
}`;

export const findMoviesByActor = actor =>
  `SELECT ?name ?id WHERE {
    ?actor wdt:P106 wd:Q10800557;
           rdfs:label "${actor}"@en.
    ?movie wdt:P31 wd:Q11424;
           wdt:P161 ?actor;
           rdfs:label ?name;
           wdt:P345 ?id.
    filter(lang(?name) = 'en')
}`;

export const findMoviesByDirector = director =>
  `SELECT ?name ?id WHERE {
    ?director wdt:P106 wd:Q2526255;
              rdfs:label "${director}"@en.
    ?movie wdt:P31 wd:Q11424;
              wdt:P57 ?director;
              rdfs:label ?name;
              wdt:P345 ?id.
    filter(lang(?name) = 'en')
}`;

export const findMoviesByWriter = writer =>
  `SELECT ?name ?id WHERE {
    ?writer wdt:P106 wd:Q28389;
              rdfs:label "${writer}"@en.
    ?movie wdt:P31 wd:Q11424;
              wdt:P58 ?writer;
              rdfs:label ?name;
              wdt:P345 ?id.
    filter(lang(?name) = 'en')
}`;

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
  fetch(`https://query.wikidata.org/sparql?format=json&query=${query}`).then(
    response => response.json()
  );
