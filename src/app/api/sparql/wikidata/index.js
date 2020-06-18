// @flow
import moment from 'moment';
import { runQuery } from 'app/api/util';

export const findMovieActors = (id: string) =>
  `SELECT DISTINCT ?resource ?name ?id WHERE {
     ?movie wdt:P31/wdt:P279* wd:Q11424;
            wdt:P345 "${id}";
            wdt:P161 ?resource.
     ?resource wdt:P345 ?id;
               rdfs:label ?name.
     FILTER(lang(?name) = 'en')
  }`;

export const findMovieDirectors = (id: string) =>
  `SELECT DISTINCT ?resource ?name ?id WHERE {
    ?movie wdt:P31/wdt:P279* wd:Q11424;
           wdt:P345 "${id}";
           wdt:P57 ?resource.
    ?resource wdt:P345 ?id;
              rdfs:label ?name.
    FILTER(lang(?name) = 'en')
  }`;

export const findMoviesByActor = (id: string) =>
  `SELECT ?resource ?name ?id (MIN(year(?date)) as ?year) WHERE {
    ?actor wdt:P345 "${id}".
    ?resource wdt:P31/wdt:P279* wd:Q11424;
              wdt:P161 ?actor;
              wdt:P345 ?id;
              wdt:P577 ?date;
              rdfs:label ?name.
    FILTER(lang(?name) = 'en')
  } GROUP BY ?resource ?name ?id
    ORDER BY DESC(?year)`;

export const findMoviesByDirector = (id: string) =>
  `SELECT ?resource ?name ?id (MIN(year(?date)) as ?year) WHERE {
    ?director wdt:P345 "${id}".
    ?resource wdt:P31/wdt:P279* wd:Q11424;
              wdt:P57 ?director;
              wdt:P345 ?id;
              wdt:P577 ?date;
              rdfs:label ?name.
    FILTER(lang(?name) = 'en')
  } GROUP BY ?resource ?name ?id
    ORDER BY DESC(?year)`;

export const findMoviesByWriter = (id: string) =>
  `SELECT ?resource ?name ?id (MIN(year(?date)) as ?year) WHERE {
    ?writer wdt:P345 "${id}".
    ?resource wdt:P31/wdt:P279* wd:Q11424;
              wdt:P58 ?writer;
              wdt:P345 ?id;
              wdt:P577 ?date;
              rdfs:label ?name.
    FILTER(lang(?name) = 'en')
  } GROUP BY ?resource ?name ?id
    ORDER BY DESC(?year)`;

const findMoviesWithYear = () =>
  `SELECT ?movie (MIN(year(?date)) as ?year) WHERE {
    ?movie wdt:P31/wdt:P279* wd:Q11424;
           wdt:P577 ?date.
  } GROUP BY ?movie`;

const findMoviesByYear = (yearFrom: number, yearTo: number) =>
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

export const findMoviesByYearAndGenre = (
  genre: ?string,
  yearFrom: number = moment().year(),
  yearTo: number = moment().year(),
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
              ?genre wdt:P31/wdt:P279* wd:Q201658;
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

export const findResource = (id: string) =>
  `SELECT ?resource ?name WHERE {
    ?resource wdt:P345 "${id}";
              rdfs:label ?name.
    FILTER(lang(?name) = 'en')
  }`;

export const findPersonAwards = (id: string) =>
  `SELECT ?resource ?name WHERE {
    ?person wdt:P345 "${id}";
            wdt:P166 ?resource.
    ?resource rdfs:label ?name.
    FILTER(lang(?name) = 'en')
  }`;

export const findPersonNominations = (id: string) =>
  `SELECT ?resource ?name WHERE {
    ?person wdt:P345 "${id}";
            wdt:P1411 ?resource.
    ?resource rdfs:label ?name.
    FILTER(lang(?name) = 'en')
  }`;

export const findPersonImage = (id: string) =>
  `SELECT ?result WHERE {
    ?person wdt:P345 "${id}";
            wdt:P18 ?result.
  }`;

export const runWikidataQuery = (query: string) =>
  runQuery(
    `https://query.wikidata.org/sparql?format=json&query=${encodeURIComponent(
      query,
    )}`,
  );
