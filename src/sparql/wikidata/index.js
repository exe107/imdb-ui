export const findMovieActors = id =>
  `SELECT DISTINCT ?name ?id WHERE {
     ?movie wdt:P31 wd:Q11424;
            wdt:P345 "${id}";
            wdt:P161 ?actor.
     ?actor wdt:P345 ?id;
            rdfs:label ?name.
     FILTER(lang(?name) = 'en')
}`;

export const findMoviesByActor = id =>
  `SELECT ?name ?id (MIN(year(?date)) as ?year) WHERE {
    ?actor wdt:P345 "${id}".
    ?movie wdt:P31 wd:Q11424;
           wdt:P161 ?actor;
           wdt:P345 ?id;
           wdt:P577 ?date;
           rdfs:label ?name.
    FILTER(lang(?name) = 'en')
} GROUP BY ?name ?id ORDER BY DESC(?year)`;

export const findMoviesByDirector = id =>
  `SELECT ?name ?id (MIN(year(?date)) as ?year) WHERE {
    ?director wdt:P345 "${id}".
    ?movie wdt:P31 wd:Q11424;
           wdt:P57 ?director;
           wdt:P345 ?id;
           wdt:P577 ?date;
           rdfs:label ?name.
    FILTER(lang(?name) = 'en')
} GROUP BY ?name ?id ORDER BY DESC(?year)`;

export const findMoviesByWriter = id =>
  `SELECT ?name ?id (MIN(year(?date)) as ?year) WHERE {
    ?writer wdt:P345 "${id}".
    ?movie wdt:P31 wd:Q11424;
           wdt:P58 ?writer;
           wdt:P345 ?id;
           wdt:P577 ?date;
           rdfs:label ?name.
    FILTER(lang(?name) = 'en')
} GROUP BY ?name ?id ORDER BY DESC(?year)`;

export const findMoviesByYearAndGenre = (
  genre,
  yearFrom = 2000,
  yearTo = 2049
) => {
  if (!genre) {
    return findMoviesByYear(yearFrom, yearTo);
  }

  return `SELECT DISTINCT ?name ?id ?year
          WITH {
            ${findMoviesWithYear()}
          } AS %movies
          
          WITH {
            SELECT ?genre {
              ?genre wdt:P31 wd:Q201658;
                     rdfs:label ?genre_name.
              FILTER(lang(?genre_name) = 'en' && regex(?genre_name, "${genre}", "i"))  
            }
          } AS %genres
          
          WHERE {
            INCLUDE %movies.
            INCLUDE %genres.
            FILTER(?year >= ${yearFrom} && ?year <= ${yearTo})
            ?movie wdt:P136 ?genre;
                   wdt:P345 ?id;
                   rdfs:label ?name.
            FILTER(lang(?name) = 'en')
          } ORDER BY DESC(?year)`;
};

const findMoviesByYear = (yearFrom, yearTo) =>
  `SELECT DISTINCT ?name ?id ?year 
    WITH {
      ${findMoviesWithYear()}
    } AS %movies
    WHERE {
      INCLUDE %movies.
      FILTER(?year >= ${yearFrom} && ?year <= ${yearTo})
      ?movie wdt:P345 ?id;
             rdfs:label ?name.
      FILTER(lang(?name) = 'en')
    } ORDER BY DESC(?year)`;

const findMoviesWithYear = () =>
  `SELECT ?movie (MIN(year(?date)) as ?year) WHERE {
    ?movie wdt:P31 wd:Q11424;
           wdt:P577 ?date.
  } GROUP BY ?movie`;

export const findPersonId = name =>
  `SELECT ?result WHERE {
    ?person rdfs:label "${name}"@en;
            wdt:P345 ?result.
  }`;

export const findPersonName = id =>
  `SELECT ?result WHERE {
    ?person wdt:P345 "${id}";
            rdfs:label ?result.
    FILTER(lang(?result) = 'en')
  }`;

export const findPersonAwards = id =>
  `SELECT ?result WHERE {
    ?person wdt:P345 "${id}";
            wdt:P166 ?award.
    ?award rdfs:label ?result.
    FILTER(lang(?result) = 'en')
}`;

export const findPersonNominations = id =>
  `SELECT ?result WHERE {
    ?person wdt:P345 "${id}";
            wdt:P1411 ?nomination.
    ?nomination rdfs:label ?result.
    FILTER(lang(?result) = 'en')
}`;

export const findPersonImage = id =>
  `SELECT ?result WHERE {
    ?person wdt:P345 "${id}";
            wdt:P18 ?result.
}`;

export const runWikidataQuery = query =>
  fetch(
    `https://query.wikidata.org/sparql?format=json&query=${encodeURIComponent(
      query
    )}`
  ).then(response => response.json());
