const URL = 'https://rickandmortyapi.com/api/character';

export function getCharacters(callback, page = URL) {
    fetch(page)
    .then((response) => response.json())
    .then((data) => callback(data.results))
    .catch((error) => console.log(error));
}

