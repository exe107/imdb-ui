// @flow
import type { Person } from 'app/api/sparql/flow';

// removes non alphabetic characters from name for easier matching between cast and stars
export const formatActorName = (name: string) =>
  [...name.toLowerCase()]
    .map(character => (character >= 'a' && character <= 'z' ? character : ''))
    .join('');

export const createActorsMap = (cast: Person[]) =>
  cast.reduce((map: Object, { resource, name, id }: Person) => {
    const actorKey = formatActorName(name);

    return {
      ...map,
      [actorKey]: { resource, id },
    };
  }, {});
